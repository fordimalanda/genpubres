"use client";

import { useState } from "react";
import ContentForm from "@/components/ContentForm";
import PlatformSelector from "@/components/PlatformSelector";
import LanguageSelector from "@/components/LanguageSelector";
import ResultGrid from "@/components/ResultGrid";
import { declineContent } from "@/lib/api";
import type { DeclineResult } from "@/types";

export default function Home() {
  const [content, setContent] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [language, setLanguage] = useState("fr");
  const [result, setResult] = useState<DeclineResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = content.trim().length > 0 && platforms.length > 0 && !loading;

  const submit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await declineContent({ content, platforms, language });
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">
            🎨 GenPubRes
          </h1>
          <p className="text-gray-600 mt-1">
            Un contenu source → des posts prêts à publier sur tous tes réseaux.
          </p>
        </header>

        <section className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <ContentForm value={content} onChange={setContent} />
          <PlatformSelector selected={platforms} onChange={setPlatforms} />
          <LanguageSelector value={language} onChange={setLanguage} />

          <button
            onClick={submit}
            disabled={!canSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Génération en cours…" : "Générer les posts"}
          </button>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
        </section>

        {result && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Résultats ({Object.keys(result.platforms).length} plateformes)
            </h2>
            <ResultGrid result={result} />
          </section>
        )}
      </div>
    </main>
  );
}