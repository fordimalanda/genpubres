# GenPubRes

Studio d'adaptation et de déclinaison de contenu omnicanale pour réseaux sociaux.

Ce projet permet de transformer un contenu source unique (article, annonce, synthèse, notes brutes) en publications calibrées pour 9 réseaux sociaux différents, en tenant compte des contraintes de format, de quotas de caractères, de rythme éditorial et de hashtags propres à chaque plateforme.

---

## Architecture Générale

Le projet repose sur une architecture découplée frontend / backend :

```
GenPubRes/
├── Frontend/                 # Application web Next.js (Interface utilisateur)
│   ├── app/                  # App Router, Layout et styles globaux
│   ├── components/           # Composants UI, formulaires, visualisations et aperçus
│   │   └── ui/               # Primitives visuelles et icônes vectorielles SVG
│   ├── lib/                  # Client API, utilitaires et formateurs
│   └── types/                # Définitions TypeScript et métadonnées des réseaux
└── Backend/                  # API REST en ASP.NET Core (.NET 10)
    ├── Endpoints/            # Définition des routes minimal API
    ├── Models/               # Contrats de données (Request / Response)
    └── Services/             # Intégration du service d'inférence DeepSeek
```

---

## Fonctionnalités Principales

- **Déclinaison multi-plateformes** : Génération simultanée pour X (Twitter), LinkedIn, Facebook, Instagram, Threads, TikTok, YouTube, Snapchat et Dev.to.
- **Calibrage automatique des longueurs** : Respect strict des limites de caractères (ex. 280 pour X, 3 000 pour LinkedIn, 500 pour Threads).
- **Adaptation linguistique et culturelle** : Traduction contextuelle native en 6 langues (Français, Anglais, Espagnol, Portugais, Allemand, Italien).
- **Aperçus réalistes par réseau** : Visualisation du rendu final dans l'interface native de chaque réseau social (simulation du flux, badges, en-têtes et métriques d'engagement).
- **Mode édition en place** : Retouche directe du texte ou des hashtags avant exportation.
- **Analyse et conformité** : Graphique dynamique de consommation de caractères, score de conformité aux algorithmes, estimation du temps de lecture et extraction des hashtags.
- **Export polyvalent** : Copie groupée formatée pour Notion/Slack, export en fichier texte (`.txt`) ou en structure JSON (`.json`).
- **Mode démonstration hors-ligne** : Permet de tester et visualiser l'ensemble de l'interface même si le backend n'est pas encore démarré.

---

## Stack Technique

### Frontend
- **Framework** : Next.js 16 (App Router, Turbopack)
- **Langage** : TypeScript
- **Bibliothèque UI** : React 19
- **Styles** : Tailwind CSS v4, Tailwind Merge, Clsx
- **Animations** : Framer Motion, FormKit AutoAnimate
- **Formatage** : Day.js, Intl.NumberFormat
- **Icônes** : SVG vectoriels dédiés (sans dépendance externe lourde)

### Backend
- **Framework** : ASP.NET Core (Minimal API)
- **Runtime** : .NET 10.0
- **Client HTTP** : HttpClient avec Typed Service
- **Moteur d'inférence** : DeepSeek Chat API

---

## Prérequis

- Node.js (version 20 ou supérieure recommandée)
- .NET SDK (version 10.0 ou compatible)
- Clé d'API DeepSeek valide

---

## Installation et Démarrage

### 1. Configuration et lancement du Backend

1. Rendez-vous dans le répertoire du backend :
   ```bash
   cd Backend
   ```

2. Configurez votre clé d'API dans le fichier `appsettings.Development.json` :
   ```json
   {
     "AiSettings": {
       "ApiKey": "VOTRE_CLE_API_DEEPSEEK",
       "Model": "deepseek-chat"
     }
   }
   ```

3. Restaurez les dépendances et démarrez l'API :
   ```bash
   dotnet restore
   dotnet run
   ```
   L'API écoute par défaut sur `http://localhost:5151`.

---

### 2. Configuration et lancement du Frontend

1. Ouvrez un second terminal et rendez-vous dans le répertoire du frontend :
   ```bash
   cd Frontend
   ```

2. Installez les dépendances npm :
   ```bash
   npm install
   ```

3. (Optionnel) Vérifiez l'URL de l'API dans le fichier `.env.local` :
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5151
   ```

4. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

5. Accédez à l'application dans votre navigateur :
   ```
   http://localhost:3000
   ```

---

## Spécification de l'API

### Point d'entrée : `POST /api/decline`

Décline un contenu source vers les plateformes demandées.

#### Corps de la requête (JSON)

```json
{
  "content": "Texte source complet à décliner...",
  "platforms": ["x", "linkedin", "instagram"],
  "language": "fr"
}
```

| Champ | Type | Obligatoire | Description |
|---|---|---|---|
| `content` | string | Oui | Contenu brut de référence. |
| `platforms` | string[] | Oui | Liste des identifiants de plateformes ciblées. |
| `language` | string | Oui | Code de la langue cible (fr, en, es, pt, de, it). |

#### Réponse de succès (`200 OK`)

```json
{
  "platforms": {
    "x": {
      "content": "Texte optimisé pour X (max 280 car.)...",
      "hashtags": ["#Tag1", "#Tag2"]
    },
    "linkedin": {
      "content": "Post rédigé au format LinkedIn...",
      "hashtags": ["#Marketing", "#Innovation"]
    }
  }
}
```

#### Réponses d'erreur

- `400 Bad Request` : Contenu source vide ou liste de plateformes non fournie.
- `500 Internal Server Error` : Problème de communication avec l'API du modèle de langage.

---

## Commandes Utiles

### Frontend
- Lancement en développement : `npm run dev`
- Compilation de production : `npm run build`
- Démarrage du build de production : `npm run start`
- Vérification des types TypeScript : `npx tsc --noEmit`
- Analyse statique ESLint : `npm run lint`

### Backend
- Compilation du projet : `dotnet build`
- Lancement du projet : `dotnet run`
- Publication : `dotnet publish -c Release`

---

## Licence

Ce projet est sous licence privée dans le cadre d'un usage interne.

