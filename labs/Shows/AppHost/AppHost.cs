var builder = DistributedApplication.CreateBuilder(args);

// Postgres runs in a container that Aspire starts for you. Persistent lifetime means
// the container (and your data) survives between runs, so the list of shows doesn't
// vanish every time you stop the app.
var pgServer = builder.AddPostgres("pg-server")
    .WithLifetime(ContainerLifetime.Persistent);

var showsDatabase = pgServer.AddDatabase("shows");

builder.AddProject<Projects.Shows_Api>("shows-api")
    .WithReference(showsDatabase)
    .WaitFor(showsDatabase);

builder.Build().Run();
