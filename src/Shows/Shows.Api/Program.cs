using Marten;
using Shows.Api.Shows;

var builder = WebApplication.CreateBuilder(args);

// Aspire wires this connection string in for us from the AppHost. If you run this project
// on its own without the AppHost, there is no database and this throws on the way up.
var connectionString = builder.Configuration.GetConnectionString("shows")
    ?? throw new Exception("No connection string named 'shows'. Are you running the AppHost?");

builder.AddServiceDefaults();

// Validation for minimal API request types (the [MinLength] etc. on ShowCreateRequest).
builder.Services.AddValidation();

// OpenAPI document at /openapi/v1.json in Development.
builder.Services.AddOpenApi();

// Sets up the Npgsql data source named "shows", with OpenTelemetry wired in.
builder.AddNpgsqlDataSource("shows");

// The client used to tell the watch desk (another team's service) about new shows.
builder.Services.AddHttpClient<InventoryNotification>(client =>
{
    var address = builder.Configuration.GetValue<string>("notificationApi") ?? "https://api.fake-company.com";
    client.BaseAddress = new Uri(address);
});
builder.Services.AddScoped<INotifyInventoryControl>(sp => sp.GetRequiredService<InventoryNotification>());

// Marten gives us an IDocumentSession to inject wherever we touch the database.
builder.Services.AddMarten(_ =>
{
    // Document configuration would go here as the model grows.
}).UseNpgsqlDataSource().UseLightweightSessions();

// The service that owns shows data. Anything that needs shows asks for IProvideShowsData;
// nothing else knows it is Marten underneath.
builder.Services.AddScoped<IProvideShowsData, ShowsData>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapShows();

app.MapDefaultEndpoints();

app.Run();

// Exposed so the test project can boot the real application in-process. See Shows.Tests.
public partial class Program;
