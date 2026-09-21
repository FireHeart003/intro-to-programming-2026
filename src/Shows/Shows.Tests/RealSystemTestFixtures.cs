using Alba;
using Testcontainers.PostgreSql;
using WireMock.RequestBuilders;
using WireMock.ResponseBuilders;
using WireMock.Server;

namespace Shows.Tests;

public class RealSystemTestFixture : IAsyncLifetime
{
    public IAlbaHost Host = null!;
    public WireMockServer WatchDesk = null!;
    private PostgreSqlContainer _postgres = null!;

    public async ValueTask InitializeAsync()
    {
        _postgres = new PostgreSqlBuilder("postgres:17").Build();
        await _postgres.StartAsync();

        // Start a real HTTP server standing in for the watch desk, and tell it to
        // answer POST /notifications with a 200.
        WatchDesk = WireMockServer.Start();
        WatchDesk
            .Given(Request.Create().WithPath("/notifications").UsingPost())
            .RespondWith(Response.Create().WithStatusCode(200));

        Host = await AlbaHost.For<Program>(builder =>
        {
            builder.UseSetting("ConnectionStrings:shows", _postgres.GetConnectionString());
            // Point the API's watch-desk client at our fake server.
            builder.UseSetting("notificationApi", WatchDesk.Url!);
            // NOTE: no ConfigureTestServices, no Substitute. The real InventoryNotification
            // runs and makes a real HTTP call — there are no doubles inside this test.
        });
    }

    public async ValueTask DisposeAsync()
    {
        await Host.DisposeAsync();
        WatchDesk.Dispose();
        await _postgres.DisposeAsync();
    }
}