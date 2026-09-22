using Marten;
using ParkingLot.Api.Items;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

// Add services to the container.
builder.AddNpgsqlDataSource("parking-lot"); // set up a connection

builder.Services.AddMarten(options =>
{
    options.RegisterDocumentType<ParkingLotEntity>();
}).UseNpgsqlDataSource().UseLightweightSessions();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.MapDefaultEndpoints();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers(); // Use Reflection - go find all the controllers and create a route table.

app.Run();
