using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<SubmissionEntity> Submissions => Set<SubmissionEntity>();
    public DbSet<ChallengeEntity> Challenges => Set<ChallengeEntity>();
    public DbSet<CommentEntity> Comments => Set<CommentEntity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<SubmissionEntity>()
            .HasOne(s => s.Challenge)
            .WithMany()
            .HasForeignKey(s => s.ChallengeId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<CommentEntity>()
            .HasOne(c => c.Submission)
            .WithMany()
            .HasForeignKey(c => c.SubmissionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
