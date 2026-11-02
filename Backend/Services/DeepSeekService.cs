using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using Backend.Models;

namespace Backend.Services;

public class DeepSeekService : IDeepSeekService
{
    private readonly HttpClient _http;
    private readonly string _model;

    public DeepSeekService(HttpClient http, IConfiguration config)
    {
        _http = http;
        _model = config["AiSettings:Model"] ?? "deepseek-chat";

        var key = config["AiSettings:ApiKey"]
            ?? throw new InvalidOperationException(
                "Clé API DeepSeek manquante. Ajoute AiSettings:ApiKey dans appsettings.Development.json");

        _http.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", key);
        _http.BaseAddress = new Uri("https://api.deepseek.com");
    }

    public async Task<DeclineResult> DeclineAsync(DeclineRequest req)
    {
        var systemPrompt = """
        Tu es un agent expert en déclinaison de contenu pour réseaux sociaux.
        L'utilisateur te donne un contenu source, une liste de plateformes et une langue.
        Tu génères pour chaque plateforme un post prêt à publier dans la langue demandée.

        Règles par plateforme :
        - x : max 280 caractères, 1-2 hashtags. Si trop long, propose un thread numéroté.
        - linkedin : max 3000 car., ton pro, 2-3 hashtags, soigne les 210 premiers car.
        - facebook : max 63206 car., 1-2 hashtags, accroche dans les 477 premiers car.
        - instagram : max 2200 car., 3-5 hashtags, accroche dès la 1ère ligne.
        - threads : max 500 car., ton conversationnel.
        - tiktok : max 2200 car., 3-5 hashtags tendance.
        - youtube : titre (max 100 car.) + description (max 5000 car.) + 3-5 hashtags.
        - snapchat : max 250 car., très court.
        - devto : titre + introduction d'article.

        Traduis et adapte à la culture cible, ne fais jamais une traduction littérale.
        Les hashtags doivent être dans la langue de sortie, sauf termes techniques.

        Réponds UNIQUEMENT en JSON valide avec cette structure exacte :
        {"platforms": {"x": {"content": "...", "hashtags": ["..."]}, ...}}
        """;

        var userPrompt = $"""
        Contenu source :
        {req.Content}

        Plateformes ciblées : {string.Join(", ", req.Platforms)}
        Langue de sortie : {req.Language}

        Retourne le JSON.
        """;

        var body = new
        {
            model = _model,
            messages = new object[]
            {
                new { role = "system", content = systemPrompt },
                new { role = "user", content = userPrompt }
            },
            response_format = new { type = "json_object" },
            temperature = 0.7
        };

        var response = await _http.PostAsJsonAsync("/chat/completions", body);
        var raw = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
            throw new Exception($"DeepSeek a renvoyé {(int)response.StatusCode} : {raw}");

        using var doc = JsonDocument.Parse(raw);
        var content = doc.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString() ?? throw new Exception("Réponse vide de DeepSeek");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        return JsonSerializer.Deserialize<DeclineResult>(content, options)
            ?? throw new Exception("JSON invalide renvoyé par l'IA");
    }
}