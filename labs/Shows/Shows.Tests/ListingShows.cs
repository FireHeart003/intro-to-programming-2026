using Alba;
using Shows.Api.Shows;

namespace Shows.Tests;

public class ListingShows(ShowsApiFixture fixture) : IClassFixture<ShowsApiFixture>
{
    [Fact]
    public async Task CanGetASingleShowThatExists()
    {
        // Add one, then read it back by the id we were handed.
        var created = await fixture.Host.Scenario(api =>
        {
            api.Post.Json(new { title = "Severance", genre = "Sci-Fi" }).ToUrl("/shows");
            api.StatusCodeShouldBe(201);
        });

        var added = created.ReadAsJson<ShowDetails>();
        Assert.NotNull(added);

        var fetched = await fixture.Host.Scenario(api =>
        {
            api.Get.Url($"/shows/{added.Id}");
            api.StatusCodeShouldBeOk();
        });

        var show = fetched.ReadAsJson<ShowDetails>();
        Assert.NotNull(show);
        Assert.Equal("Severance", show.Title);
        Assert.Equal("Sci-Fi", show.Genre);
    }
}
