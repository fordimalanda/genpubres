# GenPubRes — API Backend (.NET 10)

Ce sous-répertoire contient l'API REST de déclinaison de contenu développée avec ASP.NET Core (Minimal API) sous .NET 10.0.

L'API assure la validation des requêtes, l'orchestration des invites système (prompt engineering contextuel) et l'intégration avec le modèle de langage DeepSeek pour produire des publications prêtes à l'emploi au format JSON.

---

## Architecture du Projet

```
Backend/
├── Endpoints/
│   └── DeclineEndpoints.cs       # Mappage des routes et validation des requêtes HTTP
├── Models/
│   ├── DeclineRequest.cs         # Contrat d'entrée (Content, Platforms, Language)
│   ├── DeclineResult.cs          # Contrat de sortie (Dictionnaire de PlatformPost)
│   └── PlatformPost.cs           # Modèle unitaire d'un post (Content, Hashtags)
├── Properties/
│   └── launchSettings.json       # Profils de lancement local (Kestrel)
├── Services/
│   ├── IDeepSeekService.cs       # Interface d'abstraction du service d'inférence
│   └── DeepSeekService.cs        # Implémentation du client HTTP DeepSeek
├── appsettings.json              # Configuration globale de l'application
├── appsettings.Development.json  # Configuration locale avec clé d'API (non versionnée)
├── Backend.csproj                # Fichier de projet .NET 10.0
└── Program.cs                    # Point d'entrée de l'application et configuration CORS
```

---

## Stack Technique

- **Framework** : ASP.NET Core (.NET 10.0)
- **Modèle d'API** : Minimal API
- **Sérialisation** : System.Text.Json (avec gestion CamelCase native)
- **Gestion HTTP** : Typed HttpClient (`IDeepSeekService`)
- **Fournisseur IA** : DeepSeek Chat (`deepseek-chat` via `https://api.deepseek.com`)

---

## Configuration

### 1. Clé d'API DeepSeek

Ajoutez votre clé d'API dans le fichier `appsettings.Development.json` :

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AiSettings": {
    "ApiKey": "VOTRE_CLE_API_DEEPSEEK",
    "Model": "deepseek-chat"
  }
}
```

> Remarque : Ne committez jamais de clés d'API secrètes dans votre gestionnaire de version. Le fichier `appsettings.Development.json` est listé dans le `.gitignore`.

### 2. Politiques CORS

Par défaut, le fichier `Program.cs` autorise les origines de développement suivantes :
- `http://localhost:3000` (Serveur Next.js de développement)
- `http://192.168.56.1:3000` (Accès réseau local éventuel)

---

## Spécification de l'API

### `POST /api/decline`

Traite un contenu source pour le transformer en publications adaptées aux réseaux sélectionnés.

#### En-têtes HTTP
- `Content-Type: application/json`

#### Corps de la requête (`DeclineRequest`)

```json
{
  "content": "Texte source complet à décliner...",
  "platforms": ["x", "linkedin", "instagram", "tiktok"],
  "language": "fr"
}
```

#### Champs du contrat d'entrée

| Propriété | Type | Obligatoire | Description |
|---|---|---|---|
| `Content` | string | Oui | Texte brut de référence (ne doit pas être vide). |
| `Platforms` | List\<string\> | Oui | Liste des identifiants (ex: `x`, `linkedin`, `facebook`, `instagram`, `threads`, `tiktok`, `youtube`, `snapchat`, `devto`). |
| `Language` | string | Oui | Code de la langue cible (`fr`, `en`, `es`, `pt`, `de`, `it`). |

#### Réponse de succès (`200 OK`)

```json
{
  "platforms": {
    "x": {
      "content": "Texte court et percutant...",
      "hashtags": ["#Tag1", "#Tag2"]
    },
    "linkedin": {
      "content": "Post professionnel aéré...",
      "hashtags": ["#B2B", "#Expertise"]
    }
  }
}
```

#### Gestion des erreurs

- `400 Bad Request` : Si `Content` est vide ou si `Platforms` est vide ou nul.
  ```json
  { "error": "Le contenu source est vide." }
  ```
  ```json
  { "error": "Sélectionne au moins une plateforme." }
  ```
- `500 Internal Server Error` : En cas d'erreur de communication réseau ou d'indisponibilité du service DeepSeek.

---

## Règles d'Adaptation par Plateforme

Le service `DeepSeekService` injecte un prompt système strict imposant les contraintes suivantes :

- **x** : Max 280 caractères, 1 à 2 hashtags. Si le sujet est dense, structure en thread numéroté.
- **linkedin** : Max 3 000 caractères, ton professionnel, 2 à 3 hashtags, accroche travaillée avant la coupure des 210 caractères.
- **facebook** : Max 63 206 caractères, ton conversationnel et communautaire, 1 à 2 hashtags.
- **instagram** : Max 2 200 caractères, 3 à 5 hashtags pertinents, accroche dès la première ligne.
- **threads** : Max 500 caractères, ton spontané et conversationnel.
- **tiktok** : Max 2 200 caractères, script court avec mots-clés et 3 à 5 hashtags tendance.
- **youtube** : Titre (max 100 car.) + description structurée (max 5 000 car.) + 3 à 5 hashtags.
- **snapchat** : Max 250 caractères, ultra concis et dynamique.
- **devto** : Titre technique explicite + résumé d'article pour développeurs.

---

## Commandes Utiles

### Restauration des dépendances
```bash
dotnet restore
```

### Compilation
```bash
dotnet build
```

### Exécution locale
```bash
dotnet run
```
L'application démarre et écoute sur `http://localhost:5151`.

### Publication en mode Release
```bash
dotnet publish -c Release -o ./publish
```

