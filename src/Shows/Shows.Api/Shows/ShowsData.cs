using Marten;

namespace Shows.Api.Shows;

// The Marten-backed implementation of IProvideShowsData. This is the only file in the
// project that knows the data lives in Postgres.
public class ShowsData(IDocumentSession session) : IProvideShowsData
{
    public async Task<IReadOnlyList<ShowSummary>> GetAllShowsAsync(CancellationToken token = default)
    {
        return await session.Query<ShowEntity>()
            .OrderByDescending(s => s.Added)
            .Select(s => new ShowSummary(s.Id, s.Title))
            .ToListAsync(token);
    }

    public async Task<ShowDetails?> GetShowByIdAsync(Guid id)
    {
        return await session.Query<ShowEntity>()
            .Where(s => s.Id == id)
            .Select(s => new ShowDetails(s.Id, s.Title, s.Genre, s.Added))
            .FirstAsync();
    }

    public async Task<ShowDetails> AddShowAsync(ShowCreateRequest request)
    {
        var entity = new ShowEntity
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Genre = request.Genre,
            Added = DateTimeOffset.UtcNow
        };

        session.Store(entity);
        await session.SaveChangesAsync();

        return new ShowDetails(entity.Id, entity.Title, entity.Genre, entity.Added);
    }
}
