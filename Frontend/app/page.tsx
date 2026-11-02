"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ArrowDown, Play, Sparkles } from "@/components/ui/Icons";
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

// Clean demonstration mock data in case backend is offline
const DEMO_RESULT: DeclineResult = {
  platforms: {
    x: {
      content:
        "Nous lançons GenPubRes : un texte source unique, 9 déclinaisons taillées au millimètre pour chaque canal.\n\nFini de passer 2h à réécrire la même annonce pour LinkedIn, X et Instagram. L'outil calibre le ton, l'accroche et les hashtags natifs.",
      hashtags: ["#SocialMedia", "#Productivity", "#ContentOps"],
    },
    linkedin: {
      content:
        "Comment multiplier par 5 son impact sur les réseaux sans dupliquer ses efforts ?\n\nAprès plusieurs mois de tests, un constat s'impose : le copié-collé d'un même message nuit directement à l'engagement organique.\n\nChaque plateforme dispose de ses propres dynamiques :\n• Sur X : concis, direct et immédiat.\n• Sur LinkedIn : du contexte métier, une réflexion structurée et de la valeur actionnable.\n• Sur Instagram : visuel, soigné et émotionnel.\n\nC'est la mission de GenPubRes : prenez une idée brute et obtenez des publications adaptées à chaque format.",
      hashtags: ["#Productivity", "#Communication", "#MarketingDigital", "#Innovation"],
    },
    instagram: {
      content:
        "Le secret d'une présence omnicanale réussie n'est pas de publier plus... mais de publier plus juste.\n\nAdaptez toujours le message à l'audience réceptrice plutôt que de forcer un format générique.",
      hashtags: ["#ContentStrategy", "#ProductivityHacks", "#SocialMediaTips"],
    },
    threads: {
      content:
        "Le plus difficile dans la communication n'est pas de trouver l'idée, mais de la reformuler sans cesse pour chaque réseau. Comment gérez-vous cette charge au quotidien ?",
      hashtags: ["#Discussion", "#Creators"],
    },
    tiktok: {
      content:
        "Comment décliner ses idées en publications pour 9 réseaux sociaux en quelques clics sans perdre en pertinence.",
      hashtags: ["#AstuceProductivité", "#ContentStrategy"],
    },
    devto: {
      content:
        "Architecting GenPubRes: Multi-Channel Content Adaptation with Next.js, C# and DeepSeek.\n\nIn this overview, we cover API rate-limiting, contextual prompt engineering, and clean UI architecture.",
      hashtags: ["#webdev", "#nextjs", "#dotnet", "#architecture"],
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

  // Keyboard shortcut: Cmd/Ctrl + Enter
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
        "Après plusieurs mois de développement, nous présentons officiellement GenPubRes. Une solution conçue pour transformer n'importe quel texte source en publications calibrées pour 9 réseaux sociaux en un seul clic."
      );
    }
  };

  return (
    <main className="relative min-h-screen pb-20 text-slate-100 selection:bg-indigo-500/20 selection:text-indigo-200">
      {/* Background */}
      <BackgroundBeams />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <Header onSelectTemplate={(tmpl) => setContent(tmpl)} />

        {/* Input Studio Card */}
        <section className="ui-card rounded-2xl p-6 sm:p-7 space-y-6">
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
              variant="primary"
              size="lg"
              loading={loading}
              disabled={!canSubmit}
              onClick={submit}
              className="w-full sm:flex-1 py-3"
            >
              <Sparkles size={16} />
              <span>
                {loading
                  ? "Génération en cours…"
                  : `Générer pour ${platforms.length} réseau${
                      platforms.length > 1 ? "x" : ""
                    }`}
              </span>
            </Button>

            <span className="hidden sm:inline-block text-xs text-slate-500 font-mono">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                Ctrl
              </kbd>{" "}
              +{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                Entrée
              </kbd>
            </span>
          </div>

          {/* Error Banner with Graceful Demo Fallback */}
          {error && (
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-300 text-xs space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-slate-200">
                    Serveur local non joignable
                  </p>
                  <p className="text-slate-400 font-mono text-[11px]">{error}</p>
                  <p className="text-slate-400">
                    Assurez-vous que l'API .NET tourne sur <code>http://localhost:5151</code> avec une clé valide.
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleUseDemo}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                >
                  <Play size={12} className="fill-current" />
                  <span>Afficher l'exemple de démonstration</span>
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 pt-4"
            >
              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
                <ArrowDown size={15} className="text-slate-400" />
                <h2 className="text-lg font-semibold text-white tracking-tight">
                  Publications prêtes à diffuser
                </h2>
              </div>

              <ResultGrid result={result} />
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
