using api.Data;
using api.Entities;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChallengeController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    [HttpGet]
    public async Task<IActionResult> GetAllOrByQuery([FromQuery] Guid? id)
    {
        if (id.HasValue)
        {
            var challenge = await _context.Challenges
                .FirstOrDefaultAsync(c => c.Id == id.Value);

            if (challenge == null)
                return NotFound();

            return Ok(MapToResponse(challenge));
        }

        var challenges = await _context.Challenges
            .Select(s => MapToResponse(s))
            .ToArrayAsync();

        return Ok(challenges);
    }

    [HttpGet("latest")]
    public async Task<IActionResult> GetLatest()
    {
        var latestChallenge = await _context.Challenges
            .OrderByDescending(c => c.StartDate)
            .FirstOrDefaultAsync();

        if (latestChallenge == null)
        {
            return Ok(new ChallengeResponseModel(
                Guid.Empty,
                "",
                DateTime.MaxValue,
                DateTime.MaxValue
            ));
        }

        return Ok(MapToResponse(latestChallenge));
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var challenge = await _context.Challenges
            .FirstOrDefaultAsync(c => c.Id == id);

        if (challenge == null)
            return NotFound();

        return Ok(MapToResponse(challenge));
    }

    [HttpPost]
    public async Task<IActionResult> Create(ChallengeCreateModel model)
    {
        var entity = new ChallengeEntity
        {
            Id = Guid.NewGuid(),
            Statement = model.Statement,
            StartDate = model.StartDate,
            EndDate = model.StartDate.AddDays(7),
        };

        _context.Challenges.Add(entity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, MapToResponse(entity));
    }

    private static ChallengeResponseModel MapToResponse(ChallengeEntity entity)
    {
        return new ChallengeResponseModel(
            entity.Id,
            entity.Statement,
            entity.StartDate,
            entity.EndDate
        );
    }
}
