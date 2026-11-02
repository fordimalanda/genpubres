# GenPubRes — Interface Utilisateur (Frontend)

Ce sous-répertoire contient l'application cliente développée avec Next.js 16 (App Router) et React 19.

---

## Caractéristiques Techniques

- **Next.js 16 & Turbopack** : Architecture de composants serveur et client optimisée pour des temps de compilation rapides.
- **Tailwind CSS v4** : Système de conception épuré respectant les standards UI/UX actuels (typographie soignée, palette sombre neutre, contrastes calibrés).
- **Framer Motion & AutoAnimate** : Transitions fluides pour le réagencement des plateformes et le basculement entre les vues Aperçu et Édition.
- **Visualisations SVG natives** : Suivi des volumes de caractères et des quotas de chaque réseau social via des échelles calculées dynamiquement.
- **Icônes vectorielles SVG intégrées** : Ensemble d'icônes légères sans dépendances tierces superflues.

---

## Démarrage Rapide

### Installation des dépendances

```bash
npm install
```

### Lancement du serveur de développement

```bash
npm run dev
```

L'application est accessible sur `http://localhost:3000`.

### Variables d'environnement

Créer un fichier `.env.local` à la racine de `Frontend/` si nécessaire :

```env
NEXT_PUBLIC_API_URL=http://localhost:5151
```

---

## Structure des Fichiers

- `app/` : Routes Next.js, mise en page principale (`layout.tsx`), page d'accueil (`page.tsx`) et styles (`globals.css`).
- `components/` :
  - `Header.tsx` : En-tête sobre avec statut de service et modèles pré-remplis.
  - `ContentForm.tsx` : Saisie du contenu source, sélection de style et compteurs.
  - `PlatformSelector.tsx` : Sélection unitaire et packs groupés par catégorie.
  - `LanguageSelector.tsx` : Choix de la langue de déclinaison avec badges ISO.
  - `PostCard.tsx` : Carte de publication avec aperçu réaliste par réseau et mode édition.
  - `ResultGrid.tsx` : Grille filtrable et barre d'actions d'export groupé.
  - `PlatformAnalyticsChart.tsx` : Graphique d'analyse et jauges de remplissage des quotas.
  - `ui/` : Primitives d'interface réutilisables (Boutons, Badges, Icônes, Arrière-plan).
- `lib/` :
  - `api.ts` : Fonctions d'appel HTTP vers le backend .NET.
  - `utils.ts` : Utilitaires de classes conditionnelles (`cn`), estimations et formatage Day.js.
- `types/` : Types TypeScript et métadonnées exhaustives des réseaux sociaux ciblés.

---

## Scripts Disponibles

- `npm run dev` : Démarre le serveur local de développement.
- `npm run build` : Génère le build de production optimisé.
- `npm run start` : Démarre l'application compilée en mode production.
- `npm run lint` : Exécute l'analyseur de code ESLint.
- `npx tsc --noEmit` : Vérifie la validité des types TypeScript.
