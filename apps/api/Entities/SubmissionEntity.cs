namespace api.Entities;

public class SubmissionEntity
{
    public Guid Id { get; set; }
    public Guid ChallengeId { get; set; }
    public ChallengeEntity Challenge { get; set; } = null!;
    public required string ImageLink { get; set; }
    public required string GameName { get; set; }
    public required string Author { get; set; }
    public required string AuthorAvatarUrl { get; set; } = string.Empty;
    public required string DocsLink { get; set; }
    public required string ShortDescription { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
