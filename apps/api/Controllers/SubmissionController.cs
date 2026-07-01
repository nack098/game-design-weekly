using System.Security.Claims;
using api.Data;
using api.Entities;
using api.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SubmissionController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    /// <summary>
    /// Getting all submissions on latest challenge, or a specific submission by its own query Id
    /// </summary>
    [HttpGet]
    public IActionResult GetAllOrByQuery([FromQuery] Guid? id)
    {
        if (id.HasValue)
        {
            Console.WriteLine(id);
            var submission = _context.Submissions.Find(id.Value);
            if (submission == null)
            {
                return NotFound($"Submission with ID {id.Value} not found.");
            }

            return Ok(MapToResponse(submission));
        }

        var latestChallenge = _context.Challenges
            .OrderByDescending(c => c.StartDate)
            .FirstOrDefault();

        if (latestChallenge == null)
        {
            return Ok(Array.Empty<SubmissionResponseModel>());
        }

        var responses = _context.Submissions
            .Where(s => s.ChallengeId == latestChallenge.Id)
            .Select(s => MapToResponse(s))
            .ToArray();

        return Ok(responses);
    }

    /// <summary>
    /// Getting all submissions by challenge Id
    /// </summary>
    [HttpGet("challenge/{challengeId:guid}")]
    public IActionResult GetByChallengeId(Guid challengeId)
    {
        var challengeExists = _context.Challenges.Any(c => c.Id == challengeId);
        if (!challengeExists)
        {
            return NotFound($"Challenge with ID {challengeId} not found.");
        }

        var responses = _context.Submissions
            .Where(s => s.ChallengeId == challengeId)
            .Select(s => MapToResponse(s))
            .ToArray();

        return Ok(responses);
    }

    [HttpPost]
    [Authorize]
    public IActionResult Create(SubmissionCreateModel model)
    {
        var supabaseUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                             ?? User.FindFirst("sub")?.Value;

        if (string.IsNullOrEmpty(supabaseUserId))
        {
            return Unauthorized("Your token is valid, but the user ID claim is missing.");
        }

        string verifiedAuthor = $"User_{supabaseUserId[..8]}";
        string verifiedAvatarUrl = "";

        var userMetadataJson = User.FindFirst("user_metadata")?.Value;
        if (!string.IsNullOrEmpty(userMetadataJson))
        {
            try
            {
                using var doc = System.Text.Json.JsonDocument.Parse(userMetadataJson);
                if (doc.RootElement.TryGetProperty("full_name", out var userNameProperty))
                {
                    var githubHandle = userNameProperty.GetString();
                    if (!string.IsNullOrEmpty(githubHandle))
                    {
                        verifiedAuthor = githubHandle;
                    }
                }
                if (doc.RootElement.TryGetProperty("avatar_url", out var avatarUrlProperty))
                {
                    var avatarUrl = avatarUrlProperty.GetString();
                    if (!string.IsNullOrEmpty(avatarUrl)) verifiedAvatarUrl = avatarUrl;
                }
            }
            catch (System.Text.Json.JsonException ex)
            {
                Console.WriteLine($"[METADATA PARSING ERROR] Failed to parse user_metadata JSON: {ex.Message}");
            }
        }

        var challengeExists = _context.Challenges.Any(c => c.Id == model.ChallengeId);
        if (!challengeExists)
        {
            return BadRequest($"Cannot create submission. Challenge with ID {model.ChallengeId} does not exist.");
        }

        var entity = new SubmissionEntity
        {
            Id = Guid.NewGuid(),
            ChallengeId = model.ChallengeId,
            ImageLink = model.ImageLink,
            GameName = model.GameName,
            Author = verifiedAuthor,
            AuthorAvatarUrl = verifiedAvatarUrl,
            DocsLink = model.DocsLink,
            ShortDescription = model.ShortDescription
        };

        _context.Submissions.Add(entity);
        _context.SaveChanges();

        var response = MapToResponse(entity);

        return CreatedAtAction(nameof(GetAllOrByQuery), new { id = entity.Id }, response);
    }

    [HttpGet("{id:guid}")]
    public IActionResult GetById(Guid id)
    {
        var submission = _context.Submissions.Find(id);

        if (submission == null)
        {
            return NotFound($"Submission with ID {id} not found.");
        }

        return Ok(MapToResponse(submission));
    }

    private static SubmissionResponseModel MapToResponse(SubmissionEntity entity)
    {
        return new SubmissionResponseModel(
            Id: entity.Id,
            ChallengeId: entity.ChallengeId,
            ImageLink: entity.ImageLink,
            GameName: entity.GameName,
            Author: entity.Author,
            AuthorAvatarUrl: entity.AuthorAvatarUrl,
            DocsLink: entity.DocsLink,
            ShortDescription: entity.ShortDescription
        );
    }
}
