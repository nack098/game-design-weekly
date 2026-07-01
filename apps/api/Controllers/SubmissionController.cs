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
        var exists = await _context.Challenges
            .AnyAsync(c => c.Id == challengeId);

        if (!exists)
            return NotFound();

        var result = await _context.Submissions
            .AsNoTracking()
            .Where(s => s.ChallengeId == challengeId)
            .ToArrayAsync();

        return Ok(result.Select(Map));
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var submission = await _context.Submissions
            .AsNoTracking()
            .FirstOrDefaultAsync(s => s.Id == id);

        if (submission == null)
            return NotFound();

        return Ok(Map(submission));
    }

    [HttpPost]
    public async Task<IActionResult> Create(SubmissionCreateModel model)
    {
        var exists = await _context.Challenges
            .AnyAsync(c => c.Id == model.ChallengeId);

        if (!exists)
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

        return Ok(Map(entity));
    }

    private static SubmissionResponseModel Map(SubmissionEntity e)
        => new(
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
