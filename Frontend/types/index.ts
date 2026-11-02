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
    description: "Format concis avec accroche percutante et thread numéroté.",
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
    description: "Post professionnel, structure aérée et accroche optimisée.",
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
    description: "Ton conversationnel orienté échange communautaire.",
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
    description: "Légende soignée et sélection ciblée de 3 à 5 hashtags.",
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
    description: "Style naturel, authentique et propice aux réponses.",
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
    description: "Script court pour vidéo, mots-clés de recherche et tags.",
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
    description: "Titre percutant et description structurée avec mots-clés.",
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
    description: "Texte ultra court et dynamique.",
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
    description: "Titre technique et introduction claire pour développeurs.",
    handleExample: "dev_architect",
  },
};

export const PLATFORMS = Object.values(PLATFORMS_DATA).map((p) => ({
  id: p.id,
  label: p.label,
}));

export const LANGUAGES = [
  { id: "fr", label: "Français", code: "FR" },
  { id: "en", label: "English", code: "EN" },
  { id: "es", label: "Español", code: "ES" },
  { id: "pt", label: "Português", code: "PT" },
  { id: "de", label: "Deutsch", code: "DE" },
  { id: "it", label: "Italiano", code: "IT" },
] as const;

export const TONE_PRESETS = [
  {
    id: "viral",
    label: "Engageant & Percutant",
    iconName: "flame",
    promptSnippet: "avec un ton dynamique, engageant et un appel à l'action clair",
  },
  {
    id: "pro",
    label: "Professionnel & B2B",
    iconName: "briefcase",
    promptSnippet: "avec un ton sobre, professionnel, structuré et orienté expertise",
  },
  {
    id: "story",
    label: "Narratif & Expérientiel",
    iconName: "book",
    promptSnippet: "sous forme de récit structuré, captivant et authentique",
  },
  {
    id: "direct",
    label: "Concis & Direct",
    iconName: "zap",
    promptSnippet: "avec un style épuré, factuel, concis et sans fioritures",
  },
] as const;

export const SAMPLE_TEMPLATES = [
  {
    title: "Lancement de produit",
    preview: "Après plusieurs mois de conception, découvrez notre nouveau studio de publication...",
    content: "Après plusieurs mois de développement, nous présentons officiellement GenPubRes. Une solution conçue pour transformer n'importe quel texte source en publications calibrées pour 9 réseaux sociaux en un seul clic. Fini la réécriture manuelle répétitive pour LinkedIn, X, Instagram ou Threads. Découvrez l'outil et gagnez un temps précieux dans votre communication.",
  },
  {
    title: "Guide de bonnes pratiques",
    preview: "3 principes essentiels pour maintenir une communication cohérente...",
    content: "Trois principes essentiels pour maximiser l'impact de vos publications :\n1. Ne jamais dupliquer le même message textuellement (chaque canal requiert son rythme et son format propre).\n2. Soigner les 150 premiers caractères (la décision de poursuivre la lecture se prend instantanément).\n3. Respecter les formats natifs de chaque réseau plutôt que d'imposer un gabarit unique.",
  },
  {
    title: "Étude de cas & résultats",
    preview: "Comment adapter votre contenu démultiplie la portée organique...",
    content: "Comment optimiser sa visibilité sans multiplier les efforts : en déclinant chaque prise de parole selon l'audience de destination. Sur LinkedIn : un retour d'expérience structuré et orienté métier. Sur X : une synthèse directe et incisive. Sur Instagram : un angle visuel et mémorable. La cohérence du fond alliée à la rigueur de la forme.",
  },
];
