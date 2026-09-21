using Alba;
using NSubstitute;
using Shows.Api.Shows;
using WireMock.RequestBuilders;

namespace Shows.Tests;

public class AddingShows(RealSystemTestFixture fixture)
    : IClassFixture<RealSystemTestFixture>
{
    [Fact]
    public async Task AddedShowShowsUpInTheList()
    {
        var newShow = new { title = "Twin Peaks: The Return", genre = "Drama" };

        await fixture.Host.Scenario(api =>
        {
            api.Post.Json(newShow).ToUrl("/shows");
            api.StatusCodeShouldBe(201);
        });

        var response = await fixture.Host.Scenario(api =>
        {
            api.Get.Url("/shows");
            api.StatusCodeShouldBeOk();
        });

        var shows = response.ReadAsJson<IReadOnlyList<ShowSummary>>();
        Assert.NotNull(shows);
        Assert.Contains(shows, s => s.Title == "Twin Peaks: The Return");
    }

    [Fact]
    public async Task AddingAShowNotifiesTheWatchDesk()
    {
        var newShow = new { title = "The Leftovers", genre = "Drama" };

        await fixture.Host.Scenario(api =>
        {
            api.Post.Json(newShow).ToUrl("/shows");
            api.StatusCodeShouldBe(201);
        });

        var calls = fixture.WatchDesk.FindLogEntries(
            Request.Create().WithPath("/notifications").UsingPost());

        Assert.NotEmpty(calls);
        //await fixture.Notifier.Received().NotifyNewShowAsync(Arg.Is<ShowSummary>(s => s!.Title == "The Leftovers"));
    }
}
