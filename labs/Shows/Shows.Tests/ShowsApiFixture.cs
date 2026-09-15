using Alba;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using NSubstitute;
using Shows.Api.Shows;
using Testcontainers.PostgreSql;

namespace Shows.Tests;

// Starts the real API once, pointed at a throwaway Postgres running in a container.
// Every test in a class that takes this fixture shares the one host and the one database.
public class ShowsApiFixture : IAsyncLifetime
{
    public IAlbaHost Host = null!;

    // The one place these tests use a stand-in: the watch desk. We do not want the tests
    // reaching another team's service, so we replace it with a substitute.
    // NOTE: this is exactly what stops these from being "system tests" in the strict sense —
    // there is a test double in the test. The Postgres container is fine; this is not.
    public readonly INotifyInventoryControl Notifier = Substitute.For<INotifyInventoryControl>();

    private PostgreSqlContainer _postgres = null!;

    

    async ValueTask IAsyncLifetime.InitializeAsync()
    {
        _postgres = new PostgreSqlBuilder("postgres:17")
            .Build();
        await _postgres.StartAsync();

        Host = await AlbaHost.For<Program>(builder =>
        {
            builder.UseSetting("ConnectionStrings:shows", _postgres.GetConnectionString());
            builder.ConfigureTestServices(services =>
            {
                services.AddScoped<INotifyInventoryControl>(_ => Notifier);
            });
        });
    }

    async ValueTask IAsyncDisposable.DisposeAsync()
    {
        await Host.DisposeAsync();
        await _postgres.DisposeAsync();
    }
}
