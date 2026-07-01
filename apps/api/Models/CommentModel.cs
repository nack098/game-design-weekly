namespace api.Models;

public record CommentCreateModel(
    string Name,
    string Comment,
    Guid SubmissionId
);

public record CommentResponseModel(
    Guid Id,
    string Name,
    string Comment,
    Guid SubmissionId,
    DateTime CreatedAt
);
