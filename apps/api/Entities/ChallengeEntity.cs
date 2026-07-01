namespace api.Entities;

public class ChallengeEntity
{
    public Guid Id { get; set; }
    public required string Statement { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
