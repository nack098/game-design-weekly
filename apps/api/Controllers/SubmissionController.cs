using api.Data;
using api.Entities;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SubmissionController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    [HttpGet("challenge/{challengeId:guid}")]
    public async Task<IActionResult> GetByChallengeId(Guid challengeId)
    {
        var challengeExists = await _context.Challenges
            .AnyAsync(c => c.Id == challengeId);

        if (!challengeExists)
            return NotFound();

        var submissions = await _context.Submissions
            .Where(s => s.ChallengeId == challengeId)
            .Select(s => MapToResponse(s))
            .ToArrayAsync();

        return Ok(submissions);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var submission = await _context.Submissions
            .FirstOrDefaultAsync(s => s.Id == id);

        if (submission == null)
            return NotFound();

        return Ok(MapToResponse(submission));
    }

    [HttpPost]
    public async Task<IActionResult> Create(SubmissionCreateModel model)
    {
        var challengeExists = await _context.Challenges
            .AnyAsync(c => c.Id == model.ChallengeId);

        if (!challengeExists)
            return BadRequest("Invalid challenge");

        var entity = new SubmissionEntity
        {
            Id = Guid.NewGuid(),
            ChallengeId = model.ChallengeId,
            ImageLink = model.ImageLink,
            GameName = model.GameName,
            Author = "User",
            AuthorAvatarUrl = "",
            DocsLink = model.DocsLink,
            ShortDescription = model.ShortDescription
        };

        _context.Submissions.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(MapToResponse(entity));
    }

    private static SubmissionResponseModel MapToResponse(SubmissionEntity e)
    {
        return new SubmissionResponseModel(
            e.Id,
            e.ChallengeId,
            e.ImageLink,
            e.GameName,
            e.Author,
            e.AuthorAvatarUrl,
            e.DocsLink,
            e.ShortDescription
        );
    }
}
