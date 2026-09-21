using Alba;
using WireMock.RequestBuilders;

namespace Shows.Tests;

public class NotifyingTheWatchDesk(RealSystemTestFixture fixture)
    : IClassFixture<RealSystemTestFixture>
{
    [Fact]
    public async Task AddingAShowPostsToTheWatchDesk()
    {
        await fixture.Host.Scenario(api =>
        {
            api.Post.Json(new { title = "The Bear", genre = "Comedy" }).ToUrl("/shows");
            api.StatusCodeShouldBe(201);
        });

        // Ask the fake server what it actually received.
        var calls = fixture.WatchDesk.FindLogEntries(
            Request.Create().WithPath("/notifications").UsingPost());

        Assert.NotEmpty(calls);
    }
}