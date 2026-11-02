export type PlatformPost = {
  content: string;
  hashtags: string[];
};

export type DeclineResult = {
  platforms: Record<string, PlatformPost>;
};

export type DeclineRequest = {
  content: string;
  platforms: string[];
  language: string;
};

export type PlatformMeta = {
  id: string;
  label: string;
  category: "microblog" | "pro" | "visual" | "video" | "tech";
  maxChars: number;
  optimalRange: [number, number];
  color: string;
  accentBg: string;
  description: string;
  handleExample: string;
};

export const PLATFORMS_DATA: Record<string, PlatformMeta> = {
  x: {
    id: "x",
    label: "X (Twitter)",
    category: "microblog",
    maxChars: 280,
    optimalRange: [120, 260],
    color: "#000000",
    accentBg: "rgba(0, 0, 0, 0.15)",
    description: "Format punchy, accroche percutante et thread si nécessaire.",
    handleExample: "@genpubres_creator",
  },
  linkedin: {
    id: "linkedin",
    label: "LinkedIn",
    category: "pro",
    maxChars: 3000,
    optimalRange: [300, 1200],
    color: "#0A66C2",
    accentBg: "rgba(10, 102, 194, 0.15)",
    description: "Storytelling B2B, aéré, accroche avant le 'Voir plus'.",
    handleExample: "Alexandre Martin · Fondateur",
  },
  facebook: {
    id: "facebook",
    label: "Facebook",
    category: "pro",
    maxChars: 63206,
    optimalRange: [150, 450],
    color: "#1877F2",
    accentBg: "rgba(24, 119, 242, 0.15)",
    description: "Ton communautaire, engageant, question ouverte en fin de post.",
    handleExample: "GenPubRes Communauté",
  },
  instagram: {
    id: "instagram",
    label: "Instagram",
    category: "visual",
    maxChars: 2200,
    optimalRange: [150, 600],
    color: "#E1306C",
    accentBg: "rgba(225, 48, 108, 0.15)",
    description: "Légende soignée, émojis stratégiques et 3 à 5 hashtags clés.",
    handleExample: "genpubres.studio",
  },
  threads: {
    id: "threads",
    label: "Threads",
    category: "microblog",
    maxChars: 500,
    optimalRange: [100, 450],
    color: "#101010",
    accentBg: "rgba(255, 255, 255, 0.1)",
    description: "Authentique, conversationnel et spontané.",
    handleExample: "@genpub_official",
  },
  tiktok: {
    id: "tiktok",
    label: "TikTok",
    category: "video",
    maxChars: 2200,
    optimalRange: [80, 250],
    color: "#EE1D52",
    accentBg: "rgba(238, 29, 82, 0.15)",
    description: "Script court, mots-clés de recherche SEO et tags tendance.",
    handleExample: "@tok_creators",
  },
  youtube: {
    id: "youtube",
    label: "YouTube",
    category: "video",
    maxChars: 5000,
    optimalRange: [200, 800],
    color: "#FF0000",
    accentBg: "rgba(255, 0, 0, 0.15)",
    description: "Titre percutant (Short/Vidéo) + description optimisée.",
    handleExample: "GenPub Media Channel",
  },
  snapchat: {
    id: "snapchat",
    label: "Snapchat",
    category: "visual",
    maxChars: 250,
    optimalRange: [40, 180],
    color: "#FFFC00",
    accentBg: "rgba(255, 252, 0, 0.15)",
    description: "Ultra concis, dynamique et orienté action.",
    handleExample: "genpub_snap",
  },
  devto: {
    id: "devto",
    label: "Dev.to",
    category: "tech",
    maxChars: 15000,
    optimalRange: [400, 2000],
    color: "#0A0A0A",
    accentBg: "rgba(10, 10, 10, 0.15)",
    description: "Titre technique, résumé d'article et snippets de code/liens.",
    handleExample: "dev_architect",
  },
};

export const PLATFORMS = Object.values(PLATFORMS_DATA).map((p) => ({
  id: p.id,
  label: p.label,
}));

export const LANGUAGES = [
  { id: "fr", label: "Français", flag: "🇫🇷" },
  { id: "en", label: "English", flag: "🇬🇧" },
  { id: "es", label: "Español", flag: "🇪🇸" },
  { id: "pt", label: "Português", flag: "🇵🇹" },
  { id: "de", label: "Deutsch", flag: "🇩🇪" },
  { id: "it", label: "Italiano", flag: "🇮🇹" },
] as const;

export const TONE_PRESETS = [
  { id: "viral", label: "Viral & Accrocheur", icon: "🔥", promptSnippet: "avec un ton viral, intrigant et un fort appel à l'action" },
  { id: "pro", label: "Professionnel & B2B", icon: "💼", promptSnippet: "avec un ton professionnel, structuré, orienté valeur et expertise" },
  { id: "story", label: "Storytelling Émotionnel", icon: "✨", promptSnippet: "sous forme de récit captivant, authentique et humain" },
  { id: "direct", label: "Minimaliste & Direct", icon: "⚡", promptSnippet: "avec un style épuré, direct au but, concis et efficace" },
] as const;

export const SAMPLE_TEMPLATES = [
  {
    title: "🚀 Lancement de Produit",
    preview: "Après 6 mois de dev secret, on lance enfin notre nouvelle solution...",
    content: "Après 6 mois de développement intensif en sous-marin, nous dévoilons officiellement GenPubRes ! Une solution propulsée par l'intelligence artificielle qui transforme n'importe quel texte brut en publications sur-mesure pour 9 réseaux sociaux en un seul clic. Fini la corvée de réécriture manuelle pour LinkedIn, X, Instagram ou TikTok. Essayez gratuitement dès aujourd'hui et boostez votre portée organique !",
  },
  {
    title: "💡 3 Règles d'Or Tech",
    preview: "Les 3 erreurs que 90% des créateurs font sur leurs réseaux...",
    content: "Voici les 3 erreurs critiques qui ruinent votre visibilité sur les réseaux :\n1. Copier-coller le même message mot pour mot partout (l'algorithme et l'audience détestent ça).\n2. Oublier les premières secondes ou la première ligne (l'attention moyenne est de 2,7 secondes).\n3. Négliger le format propre à chaque canal : un post LinkedIn ne se rédige pas comme un tweet ou une légende Instagram.\nOptimisez chaque canal pour son format natif !",
  },
  {
    title: "📈 Retour d'expérience",
    preview: "Comment nous avons multiplié par 5 notre engagement sans budget ads...",
    content: "Comment nous avons multiplié notre engagement par 5 sans dépenser 1 seul euro en publicité : en adaptant systématiquement le ton à chaque plateforme. Sur LinkedIn : retour d'expérience chiffres à l'appui. Sur X : thread ultra condensé. Sur Instagram : citation visuelle percutante. La cohérence du message + la spécificité du format = le combo gagnant en 2026.",
  },
];
