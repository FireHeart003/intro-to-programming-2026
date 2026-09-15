namespace Shows.Api.Shows;

// The endpoints depend on this, not on Marten. The interface names exactly the three things
// the API needs from a data store — no more. Anything that can satisfy these three can back
// the API.
public interface IProvideShowsData
{
    Task<IReadOnlyList<ShowSummary>> GetAllShowsAsync(CancellationToken token = default);
    Task<ShowDetails?> GetShowByIdAsync(Guid id);
    Task<ShowDetails> AddShowAsync(ShowCreateRequest request);
}
