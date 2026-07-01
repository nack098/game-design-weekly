namespace api.Models;

public record ChallengeCreateModel(
        string Statement,
        DateTime StartDate
);

public record ChallengeResponseModel(
        Guid Id,
        string Statement,
        DateTime StartDate,
        DateTime EndDate
);
