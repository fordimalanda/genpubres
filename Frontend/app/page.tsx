"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, AlertCircle, ArrowDown, Play } from "@/components/ui/Icons";
import Header from "@/components/Header";
import ContentForm from "@/components/ContentForm";
import PlatformSelector from "@/components/PlatformSelector";
import LanguageSelector from "@/components/LanguageSelector";
import ResultGrid from "@/components/ResultGrid";
import BackgroundBeams from "@/components/ui/BackgroundBeams";
import { Button } from "@/components/ui/Button";
import { declineContent } from "@/lib/api";
import type { DeclineResult } from "@/types";
import { TONE_PRESETS } from "@/types";

// Demonstration mock data in case backend is offline or for instant preview
const DEMO_RESULT: DeclineResult = {
  platforms: {
    x: {
      content:
        "🚀 Nous venons de lancer GenPubRes !\n\nUn seul texte source → 9 déclinaisons taillées au millimètre pour chaque algo de réseau social.\n\nFini de passer 2h à réécrire la même annonce pour LinkedIn, X et Instagram. L'IA optimise le ton, l'accroche et les hashtags.",
      hashtags: ["#SocialMedia", "#BuildInPublic", "#IA"],
    },
    linkedin: {
      content:
        "Comment multiplier par 5 son impact sur les réseaux sans recruter une agence ? 📈\n\nAprès 6 mois de tests intensifs, un constat s'impose : le copié-collé d'un même message détruit l'engagement organique.\n\nChaque réseau a ses propres codes :\n• Sur X : concis, percutant, immédiat.\n• Sur LinkedIn : du storytelling, du contexte métier, de la valeur actionnable.\n• Sur Instagram : visuel, esthétique, émotionnel.\n\nC'est précisément la promesse de GenPubRes : prenez une idée brute, et laissez l'IA générer des publications calibrées au mot près pour votre audience cible.\n\nQuel canal vous apporte le plus de ROI aujourd'hui ? Échangeons en commentaire !",
      hashtags: ["#Productivity", "#GrowthHacking", "#MarketingDigital", "#Innovation"],
    },
    instagram: {
      content:
        "Le secret d'une présence omnicanale réussie en 2026 n'est pas de publier plus... mais de publier MIEUX. ✨\n\nArrêtez de gaspiller des heures à reformuler vos contenus. Adoptez l'approche 'Créer une fois, diffuser partout'.\n\n👉 Enregistre ce post pour tes prochaines sessions de création de contenu !",
      hashtags: ["#ContentCreator", "#ProductivityHacks", "#InstaTips", "#SocialMediaTips"],
    },
    threads: {
      content:
        "Honnêtement, le plus dur dans la création de contenu n'est pas d'avoir des idées, c'est de les décliner sur tous les formats sans y passer ses nuits. Qui d'autre ressent cette fatigue du multi-plateforme ?",
      hashtags: ["#Threads", "#Creators"],
    },
    tiktok: {
      content:
        "POV : Tu viens de découvrir comment générer tes posts pour 9 réseaux en 1 clic grâce à l'IA 🤯 Plus d'excuse pour ne pas être régulier !",
      hashtags: ["#AIHacks", "#TechTok", "#AstuceProductivité"],
    },
    devto: {
      content:
        "Building GenPubRes: How We Architected an AI-Powered Social Multi-Publisher with Next.js, C# and DeepSeek.\n\nIn this article, we break down how to handle context-aware text transformations, rate limits, and ultra-fast UI updates.",
      hashtags: ["#webdev", "#nextjs", "#ai", "#dotnet"],
    },
  },
};

export default function Home() {
  const [content, setContent] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([
    "x",
    "linkedin",
    "instagram",
    "threads",
  ]);
  const [language, setLanguage] = useState("fr");
  const [tone, setTone] = useState<string>("viral");
  const [result, setResult] = useState<DeclineResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    content.trim().length > 0 && platforms.length > 0 && !loading;

  // Keyboard shortcut: Cmd/Ctrl + Enter to trigger generate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        if (canSubmit) {
          submit();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canSubmit, content, platforms, language, tone]);

  const submit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);

    // Optional tone augmentation in the content payload
    const toneInfo = TONE_PRESETS.find((t) => t.id === tone);
    const enrichedContent = toneInfo
      ? `${content}\n\n[Instruction de style : Rédiger ${toneInfo.promptSnippet}]`
      : content;

    try {
      const data = await declineContent({
        content: enrichedContent,
        platforms,
        language,
      });
      setResult(data);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Erreur de connexion au serveur backend."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUseDemo = () => {
    setError(null);
    setResult(DEMO_RESULT);
    if (!content) {
      setContent(
        "Après 6 mois de développement intensif en sous-marin, nous dévoilons officiellement GenPubRes ! Une solution propulsée par l'intelligence artificielle qui transforme n'importe quel texte brut en publications sur-mesure pour 9 réseaux sociaux en un seul clic."
      );
    }
  };

  return (
    <main className="relative min-h-screen pb-24 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Animated Beams and Glow */}
      <BackgroundBeams />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Hero Section */}
        <Header onSelectTemplate={(tmpl) => setContent(tmpl)} />

        {/* Studio Form Card */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-panel-glow rounded-3xl p-6 sm:p-8 space-y-8 relative overflow-hidden"
        >
          {/* Form Controls */}
          <ContentForm
            value={content}
            onChange={setContent}
            tone={tone}
            onToneChange={setTone}
          />

          <div className="h-px w-full bg-slate-800/80" />

          <PlatformSelector selected={platforms} onChange={setPlatforms} />

          <div className="h-px w-full bg-slate-800/80" />

          <LanguageSelector value={language} onChange={setLanguage} />

          {/* Submit Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <Button
              type="button"
              variant="gradient"
              size="lg"
              loading={loading}
              disabled={!canSubmit}
              onClick={submit}
              className="w-full sm:flex-1 py-4 text-base"
            >
              <Sparkles className="w-5 h-5" />
              <span>
                {loading
                  ? "Génération & adaptation IA en cours…"
                  : `Générer pour ${platforms.length} plateforme${
                      platforms.length > 1 ? "s" : ""
                    }`}
              </span>
            </Button>

            <span className="hidden sm:inline-block text-xs text-slate-500 font-mono">
              <kbd className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
                Ctrl
              </kbd>{" "}
              +{" "}
              <kbd className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
                Enter
              </kbd>
            </span>
          </div>

          {/* Error Banner with Graceful Demo Fallback */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-sm space-y-3"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-rose-100">
                    Impossible de contacter l&apos;API Backend
                  </p>
                  <p className="text-xs text-rose-300/90">{error}</p>
                  <p className="text-xs text-slate-400 pt-1">
                    (Vérifiez que votre backend C# .NET tourne sur{" "}
                    <code>http://localhost:5151</code> avec votre clé DeepSeek).
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleUseDemo}
                  className="text-xs px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Charger les résultats de démonstration (Mode Démo)</span>
                </button>
              </div>
            </motion.div>
          )}
        </motion.section>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 pt-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                    <ArrowDown className="w-4 h-4 animate-bounce" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                      Publications Générées
                    </h2>
                    <p className="text-xs text-slate-400">
                      Prêtes à être copiées, modifiées ou planifiées
                    </p>
                  </div>
                </div>
              </div>

              <ResultGrid result={result} />
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
