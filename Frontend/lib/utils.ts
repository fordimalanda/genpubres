import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("fr-FR").format(num);
}

export function formatCompactNumber(num: number): string {
  return new Intl.NumberFormat("fr-FR", {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);
}

export function estimateReadingTimeSeconds(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  // Average reading speed ~ 200 words per minute => ~ 3.33 words per second
  return Math.max(3, Math.ceil(words / 3.33));
}

export function calculatePlatformScore(platform: string, text: string, hashtags: string[]) {
  // Return platform fit and health metric (0-100)
  const length = text.length;
  let optimalMin = 50;
  let optimalMax = 280;

  switch (platform.toLowerCase()) {
    case "x":
      optimalMin = 70;
      optimalMax = 270;
      break;
    case "linkedin":
      optimalMin = 150;
      optimalMax = 1200;
      break;
    case "instagram":
      optimalMin = 100;
      optimalMax = 600;
      break;
    case "facebook":
      optimalMin = 100;
      optimalMax = 500;
      break;
    case "tiktok":
      optimalMin = 40;
      optimalMax = 200;
      break;
    case "devto":
      optimalMin = 200;
      optimalMax = 2000;
      break;
    case "youtube":
      optimalMin = 80;
      optimalMax = 800;
      break;
    default:
      optimalMin = 60;
      optimalMax = 400;
  }

  let score = 90;
  if (length < optimalMin) {
    score -= Math.min(35, Math.round(((optimalMin - length) / optimalMin) * 35));
  } else if (length > optimalMax) {
    score -= Math.min(40, Math.round(((length - optimalMax) / optimalMax) * 40));
  }

  if (hashtags.length === 0) {
    score -= 10;
  } else if (hashtags.length > 8) {
    score -= 5;
  }

  return Math.max(45, Math.min(99, score));
}

export function getRelativeTime(): string {
  return dayjs().format("HH:mm · D MMMM YYYY");
}

