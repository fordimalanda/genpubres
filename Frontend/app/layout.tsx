import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GenPubRes — AI Content Multiplier | Déclinaison Réseaux Sociaux",
  description:
    "Transformez un contenu source unique en publications optimisées et engageantes pour 9 réseaux sociaux (X, LinkedIn, Instagram, TikTok...) avec l'IA.",
  keywords: [
    "IA",
    "Réseaux sociaux",
    "Générateur de post",
    "Multi-plateforme",
    "DeepSeek",
    "Social Media Automation",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased selection:bg-indigo-500/30 selection:text-indigo-200`}
    >
      <body className="min-h-full flex flex-col bg-[#090d16] text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
