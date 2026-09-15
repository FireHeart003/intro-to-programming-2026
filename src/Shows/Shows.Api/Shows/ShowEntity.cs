namespace Shows.Api.Shows;

// The shape we store in the database. This is not what callers see — the API hands back
// ShowSummary and ShowDetails. Keeping the stored shape separate from the published shape
// means the database can change without breaking anyone who talks to the API.
public class ShowEntity
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Genre { get; set; }
    public DateTimeOffset Added { get; set; }
}
