using api.Data;
using api.Entities;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CommentController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    // GET: api/comment (Gets absolutely all comments)
    [HttpGet]
    public IActionResult GetAll()
    {
        var comments = _context.Comments
            .Select(c => MapToResponse(c))
            .ToArray();

        return Ok(comments);
    }

    // GET: api/comment/submission/{submissionId} (Gets comments for a specific submission)
    [HttpGet("submission/{submissionId:guid}")]
    public IActionResult GetBySubmission(Guid submissionId)
    {
        var comments = _context.Comments
            .Where(c => c.SubmissionId == submissionId)
            .Select(c => MapToResponse(c))
            .ToArray();

        return Ok(comments);
    }

    // POST: api/comment
    [HttpPost]
    public IActionResult Create(CommentCreateModel model)
    {
        // Safety Check: Does the submission even exist?
        var submissionExists = _context.Submissions.Any(s => s.Id == model.SubmissionId);
        if (!submissionExists)
        {
            return NotFound($"Cannot add comment. Submission with ID {model.SubmissionId} does not exist.");
        }

        var entity = new CommentEntity
        {
            Id = Guid.NewGuid(),
            Name = string.IsNullOrWhiteSpace(model.Name) ? "Anonymous" : model.Name,
            Comment = model.Comment,
            SubmissionId = model.SubmissionId
        };

        _context.Comments.Add(entity);
        _context.SaveChanges();

        var response = MapToResponse(entity);

        // We don't have a dedicated GetCommentById endpoint, so we just return 201 with the object
        return CreatedAtAction(nameof(GetBySubmission), new { submissionId = entity.SubmissionId }, response);
    }

    private static CommentResponseModel MapToResponse(CommentEntity entity)
    {
        return new CommentResponseModel(
            Id: entity.Id,
            Name: entity.Name,
            Comment: entity.Comment,
            SubmissionId: entity.SubmissionId,
            CreatedAt: entity.CreatedAt
        );
    }
}
