var builder = DistributedApplication.CreateBuilder(args);

var postgresServer = builder.AddPostgres("postgres");

var linksDb = postgresServer.AddDatabase("links");

var links_API = builder.AddProject<Projects.Links_API>("links-api")
    .WithReference(linksDb)
    .WaitFor(linksDb);

builder.Build().Run();
