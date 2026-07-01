namespace api.Models;

public record SubmissionCreateModel(
    Guid ChallengeId,
    string ImageLink,
    string GameName,
    string DocsLink,
    string ShortDescription
);

public record SubmissionResponseModel(
    Guid Id,
    Guid ChallengeId,
    string ImageLink,
    string GameName,
    string Author,
    string AuthorAvatarUrl,
    string DocsLink,
    string ShortDescription
);
