using Scalar.Aspire;

var builder = DistributedApplication.CreateBuilder(args);

var pgServer = builder.AddPostgres("pg-server")
    .WithLifetime(ContainerLifetime.Persistent);

var parkingLotDatabase = pgServer.AddDatabase("parking-lot");

var scalar = builder.AddScalarApiReference(options =>
{
    options.PreferHttpsEndpoint = true;
    options.AllowSelfSignedCertificates = true;
});

var api = builder.AddProject<Projects.ParkingLot_Api>("parkinglot-api")
    .WaitFor(parkingLotDatabase)
    .WithReference(parkingLotDatabase);

var frontend = builder.AddViteApp("frontend", "../../../frontend", "start")
    .WithExternalHttpEndpoints();
    
    

scalar.WithApiReference(api);

builder.AddProject<Projects.Gateway>("gateway")
    .WithReference(api)
    .WithReference(frontend)
    .WaitFor(api)
    .WaitFor(frontend)
    .WithExternalHttpEndpoints();

builder.Build().Run();
