using api.Data;
using api.Entities;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChallengeController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    [HttpGet]
    public IActionResult GetAllOrByQuery([FromQuery] Guid? id)
    {
        if (id.HasValue)
        {
            var challenge = _context.Challenges.Find(id.Value);
            if (challenge == null)
            {
                return NotFound($"Challenge with ID {id.Value} not found.");
            }
            return Ok(MapToResponse(challenge));
        }

        var challenges = _context.Challenges.Select(s => MapToResponse(s));
        return Ok(challenges);
    }

    [HttpGet("latest")]
    public IActionResult GetLatest()
    {
        var latestChallenge = _context.Challenges
            .OrderByDescending(c => c.StartDate)
            .FirstOrDefault();

        if (latestChallenge == null)
        {
            return Ok(new ChallengeResponseModel(
                        Id: Guid.Empty,
                        Statement: "",
                        StartDate: DateTime.MaxValue,
                        EndDate: DateTime.MaxValue
            ));
        }

        return Ok(MapToResponse(latestChallenge));
    }

    [HttpGet("{id:guid}")]
    public IActionResult GetById(Guid id)
    {
        var challenge = _context.Challenges.Find(id);

        if (challenge == null)
        {
            return NotFound($"Challenge with ID {id} not found.");
        }

        return Ok(MapToResponse(challenge));
    }

    [HttpPost]
    public IActionResult Create(ChallengeCreateModel model)
    {
        var entity = new ChallengeEntity
        {
            Id = Guid.NewGuid(),
            Statement = model.Statement,
            StartDate = model.StartDate,
            EndDate = model.StartDate.AddDays(7),
        };

        _context.Challenges.Add(entity);
        _context.SaveChanges();

        var response = MapToResponse(entity);
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, response);
    }

    private static ChallengeResponseModel MapToResponse(ChallengeEntity entity)
    {
        return new ChallengeResponseModel(
                Id: entity.Id,
                Statement: entity.Statement,
                StartDate: entity.StartDate,
                EndDate: entity.EndDate
        );
    }
}
