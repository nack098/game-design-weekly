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

    [HttpGet("submission/{submissionId:guid}")]
    public async Task<IActionResult> GetBySubmission(Guid submissionId)
    {
        var comments = await _context.Comments
            .AsNoTracking()
            .Where(c => c.SubmissionId == submissionId)
            .ToArrayAsync();

        return Ok(comments.Select(Map));
    }

    [HttpPost]
    public async Task<IActionResult> Create(CommentCreateModel model)
    {
        var exists = await _context.Submissions
            .AnyAsync(s => s.Id == model.SubmissionId);

        if (!exists)
            return NotFound();

        var entity = new CommentEntity
        {
            Id = Guid.NewGuid(),
            Name = string.IsNullOrWhiteSpace(model.Name) ? "Anonymous" : model.Name,
            Comment = model.Comment,
            SubmissionId = model.SubmissionId
        };

        _context.Comments.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(Map(entity));
    }

    private static CommentResponseModel Map(CommentEntity c)
        => new(
            c.Id,
            c.Name,
            c.Comment,
            c.SubmissionId,
            c.CreatedAt
        );
}
