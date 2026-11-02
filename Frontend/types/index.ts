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

export const PLATFORMS = [
  { id: "x", label: "X (Twitter)" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "facebook", label: "Facebook" },
  { id: "instagram", label: "Instagram" },
  { id: "threads", label: "Threads" },
  { id: "tiktok", label: "TikTok" },
  { id: "youtube", label: "YouTube" },
  { id: "snapchat", label: "Snapchat" },
  { id: "devto", label: "Dev.to" },
] as const;

export const LANGUAGES = [
  { id: "fr", label: "Français" },
  { id: "en", label: "English" },
  { id: "es", label: "Español" },
  { id: "pt", label: "Português" },
] as const;