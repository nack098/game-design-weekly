namespace api.Entities;

public class CommentEntity
{
    public Guid Id { get; set; }
    public Guid SubmissionId { get; set; }
    public SubmissionEntity Submission { get; set; } = null!;
    public required string Name { get; set; }
    public required string Comment { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
