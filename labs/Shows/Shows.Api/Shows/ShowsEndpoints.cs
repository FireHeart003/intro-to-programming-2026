namespace Shows.Api.Shows;

public static class ShowsEndpoints
{
    public static IEndpointRouteBuilder MapShows(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/shows");

        // GET /shows
        group.MapGet("", (IProvideShowsData data, CancellationToken token) =>
            data.GetAllShowsAsync(token));

        // GET /shows/{id}
        group.MapGet("/{id:guid}", async (Guid id, IProvideShowsData data) =>
        {
            var show = await data.GetShowByIdAsync(id);
            return show is null ? Results.NotFound() : Results.Ok(show);
        });

        // POST /shows
        group.MapPost("", async (
            ShowCreateRequest request,
            IProvideShowsData data,
            INotifyInventoryControl notifier,
            ILoggerFactory loggerFactory) =>
        {
            var created = await data.AddShowAsync(request);

            try
            {
                await notifier.NotifyNewShowAsync(new ShowSummary(created.Id, created.Title));
            }
            catch (Exception ex)
            {
                // Notifying the watch desk is best-effort: a show is still added if the desk
                // is unreachable. See venues/http.md.
                loggerFactory.CreateLogger("Shows")
                    .LogWarning(ex, "Could not notify the watch desk that {Title} was added.", created.Title);
            }

            return Results.Created($"/shows/{created.Id}", created);
        });

        return routes;
    }
}
