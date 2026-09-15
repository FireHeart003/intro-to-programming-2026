using System.ComponentModel.DataAnnotations;

namespace Shows.Api.Shows;

// These three types are the contract: they are what callers of the API send and receive.
// A change here is a change other people can see.

// What the list endpoint returns for each show. Deliberately small.
public record ShowSummary(Guid Id, string Title);

// What the "single show" endpoint returns. Fuller than the summary.
public record ShowDetails(Guid Id, string Title, string? Genre, DateTimeOffset Added);

// What a caller sends to add a show. The attributes are the promise about what "valid" means.
public record ShowCreateRequest
{
    [Required, MinLength(2), MaxLength(100)]
    public required string Title { get; init; }

    [MaxLength(40)]
    public string? Genre { get; init; }
}
