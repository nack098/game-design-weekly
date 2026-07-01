using api.Data;
using api.Entities;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CommentController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    // GET: api/comment
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var comments = await _context.Comments
            .Select(c => MapToResponse(c))
            .ToArrayAsync();

        return Ok(comments);
    }

    // GET: api/comment/submission/{submissionId}
    [HttpGet("submission/{submissionId:guid}")]
    public async Task<IActionResult> GetBySubmission(Guid submissionId)
    {
        var comments = await _context.Comments
            .Where(c => c.SubmissionId == submissionId)
            .Select(c => MapToResponse(c))
            .ToArrayAsync();

        return Ok(comments);
    }

    // POST: api/comment
    [HttpPost]
    public async Task<IActionResult> Create(CommentCreateModel model)
    {
        // IMPORTANT: async DB check (prevents blocking pooler connection)
        var submissionExists = await _context.Submissions
            .AnyAsync(s => s.Id == model.SubmissionId);

        if (!submissionExists)
        {
            return NotFound($"Submission {model.SubmissionId} not found.");
        }

        var entity = new CommentEntity
        {
            Id = Guid.NewGuid(),
            Name = string.IsNullOrWhiteSpace(model.Name)
                ? "Anonymous"
                : model.Name,
            Comment = model.Comment,
            SubmissionId = model.SubmissionId
        };

        _context.Comments.Add(entity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetBySubmission),
            new { submissionId = entity.SubmissionId },
            MapToResponse(entity)
        );
    }

    private static CommentResponseModel MapToResponse(CommentEntity entity)
    {
        return new CommentResponseModel(
            entity.Id,
            entity.Name,
            entity.Comment,
            entity.SubmissionId,
            entity.CreatedAt
        );
    }
}
