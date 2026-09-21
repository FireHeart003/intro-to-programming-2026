using Shows.Api.Shows;
using System;
using System.Collections.Generic;
using System.Text;
using Alba;

namespace Shows.Tests;

public class GettingAShowThatDoesNotExist(ShowsApiFixture fixture) : IClassFixture<ShowsApiFixture>
{

    [Fact]
    public async Task ReturnsNotFound()
    {
        await fixture.Host.Scenario(api =>
        {
            api.Get.Url($"/shows/{Guid.NewGuid()}");
            api.StatusCodeShouldBe(404);
        });
    }
}
