namespace Links.Api.Links;

public static class Endpoints
{
    extension(IEndpointRouteBuilder routes)
    {
        public IEndpointRouteBuilder MapLinks()
        {
            routes.MapPost("/links", (LinkCreateRequest request) =>
            {
                // ?? What needs to happen here?
                var response = new LinkResponse(Guid.NewGuid(), request.Title, request.Url);

                // ?? How about here?
                // Save it in a database or something, right?
                return Results.Ok(response);
            });
            return routes;
        }
    }
}

public record LinkCreateRequest(string Title, string Url);

public record LinkResponse(Guid Id, string Title, string Url);