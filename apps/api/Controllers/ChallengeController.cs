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

    // -----------------------------
    // GET: api/challenge
    // LIST ALL (RESTORE)
    // -----------------------------
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var challenges = await _context.Challenges
            .AsNoTracking()
            .OrderByDescending(c => c.StartDate)
            .ToListAsync();

        return Ok(challenges.Select(Map));
    }

    // -----------------------------
    // GET: api/challenge/{id}
    // -----------------------------
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var challenge = await _context.Challenges
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id);

        if (challenge == null)
            return NotFound();

        return Ok(Map(challenge));
    }

    // -----------------------------
    // GET: api/challenge/latest
    // -----------------------------
    [HttpGet("latest")]
    public async Task<IActionResult> GetLatest()
    {
        var latest = await _context.Challenges
            .AsNoTracking()
            .OrderByDescending(c => c.StartDate)
            .FirstOrDefaultAsync();

        if (latest == null)
        {
            return Ok(new ChallengeResponseModel(
                Guid.Empty,
                "",
                DateTime.MinValue,
                DateTime.MinValue
            ));
        }

        return Ok(Map(latest));
    }

    // -----------------------------
    // POST: api/challenge
    // -----------------------------
    [HttpPost]
    public async Task<IActionResult> Create(ChallengeCreateModel model)
    {
        var entity = new ChallengeEntity
        {
            Id = Guid.NewGuid(),
            Statement = model.Statement,
            StartDate = model.StartDate,
            EndDate = model.StartDate.AddDays(7)
        };

        _context.Challenges.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(Map(entity));
    }

    // -----------------------------
    // mapper
    // -----------------------------
    private static ChallengeResponseModel Map(ChallengeEntity c)
        => new(c.Id, c.Statement, c.StartDate, c.EndDate);
}
