using Backend.Models;
using Backend.Services;

namespace Backend.Endpoints;

public static class DeclineEndpoints
{
    public static void MapDeclineEndpoints(this WebApplication app)
    {
        app.MapPost("/api/decline", async (DeclineRequest req, IDeepSeekService ai) =>
        {
            if (string.IsNullOrWhiteSpace(req.Content))
                return Results.BadRequest(new { error = "Le contenu source est vide." });

            if (req.Platforms is null || req.Platforms.Count == 0)
                return Results.BadRequest(new { error = "Sélectionne au moins une plateforme." });

            try
            {
                var result = await ai.DeclineAsync(req);
                return Results.Ok(result);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        });
    }
}