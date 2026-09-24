using Banking.Domain;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddScoped<IProvideBonusesForBankAccountDeposits, TimeBasedBonusCalculator>();
builder.Services.AddScoped<IProvideTheBusinessClock, BusinessClock>();
builder.Services.AddSingleton(TimeProvider.System);
builder.Services.AddScoped<BankAccount>();
var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
