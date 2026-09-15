namespace Shows.Api.Shows;

// Started when someone thought shows might move to SQL Server. It never happened, and this
// has never been wired up in Program.cs. Left here because the interface makes swapping the
// store a real possibility — this is the empty seat that possibility leaves behind.
public class SqlServerDataProvider : IProvideShowsData
{
    public Task<IReadOnlyList<ShowSummary>> GetAllShowsAsync(CancellationToken token = default)
    {
        throw new NotImplementedException();
    }

    public Task<ShowDetails?> GetShowByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<ShowDetails> AddShowAsync(ShowCreateRequest request)
    {
        throw new NotImplementedException();
    }
}
