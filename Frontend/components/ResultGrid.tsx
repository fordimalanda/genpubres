"use client";

import React, { useState, useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Download,
  Sparkles,
  Filter,
  FileDown,
  Layers,
} from "@/components/ui/Icons";
import confetti from "canvas-confetti";
import type { DeclineResult, PlatformPost } from "@/types";
import { PLATFORMS_DATA } from "@/types";
import PostCard from "./PostCard";
import PlatformAnalyticsChart from "./PlatformAnalyticsChart";

interface Props {
  result: DeclineResult;
}

export default function ResultGrid({ result }: Props) {
  const [copiedAll, setCopiedAll] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [localResult, setLocalResult] = useState<DeclineResult>(result);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalResult(result);
    // Trigger confetti celebration on result generation
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#6366f1", "#8b5cf6", "#ec4899", "#10b981", "#38bdf8"],
      });
    } catch {
      // Ignore if confetti fails
    }
  }, [result]);

  useEffect(() => {
    if (gridRef.current) {
      autoAnimate(gridRef.current);
    }
  }, [gridRef]);

  const handleUpdatePost = (platform: string, newPost: PlatformPost) => {
    setLocalResult((prev) => ({
      platforms: {
        ...prev.platforms,
        [platform]: newPost,
      },
    }));
  };

  const entries = Object.entries(localResult.platforms);

  const filteredEntries = entries.filter(([platform]) => {
    if (filterCategory === "all") return true;
    const cat = PLATFORMS_DATA[platform]?.category;
    return cat === filterCategory;
  });

  const handleCopyAll = async () => {
    const formatted = entries
      .map(([platform, post]) => {
        const meta = PLATFORMS_DATA[platform]?.label || platform;
        const tags = post.hashtags.length ? `\n\n${post.hashtags.join(" ")}` : "";
        return `════════════════════════════════════\n📢 ${meta.toUpperCase()}\n════════════════════════════════════\n${post.content}${tags}\n`;
      })
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedAll(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
      setTimeout(() => setCopiedAll(false), 2500);
    } catch {
      // Ignore
    }
  };

  const handleExportJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(localResult, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `genpubres-posts-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportTXT = () => {
    const textContent = entries
      .map(([platform, post]) => {
        const meta = PLATFORMS_DATA[platform]?.label || platform;
        return `### ${meta} ###\n\n${post.content}\n\n${post.hashtags.join(" ")}\n\n`;
      })
      .join("--------------------------------------\n\n");

    const dataStr =
      "data:text/plain;charset=utf-8," + encodeURIComponent(textContent);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `genpubres-posts-${Date.now()}.txt`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (entries.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-8 text-center text-slate-400 border border-slate-800">
        <Layers className="w-8 h-8 text-slate-600 mx-auto mb-2" />
        <p>Aucun post généré pour le moment.</p>
      </div>
    );
  }

  const categories = [
    { id: "all", label: `Tous (${entries.length})` },
    { id: "microblog", label: "Microblog (X, Threads)" },
    { id: "pro", label: "Pro (LinkedIn, FB)" },
    { id: "visual", label: "Visuel (Insta, Snap)" },
    { id: "video", label: "Vidéo (TikTok, YouTube)" },
    { id: "tech", label: "Tech (Dev.to)" },
  ].filter((c) => {
    if (c.id === "all") return true;
    return entries.some(
      ([platform]) => PLATFORMS_DATA[platform]?.category === c.id
    );
  });

  return (
    <div className="space-y-6">
      {/* Analytics & Metrics Visualization */}
      <PlatformAnalyticsChart result={localResult} />

      {/* Action Bar & Category Filters */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-indigo-400" /> Filtre :
          </span>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilterCategory(c.id)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                filterCategory === c.id
                  ? "bg-indigo-600 text-white border-indigo-500 shadow-sm"
                  : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Global Export Actions */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            type="button"
            onClick={handleExportTXT}
            className="text-xs px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Télécharger en document TXT"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>TXT</span>
          </button>

          <button
            type="button"
            onClick={handleExportJSON}
            className="text-xs px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Exporter en JSON structuré"
          >
            <FileDown className="w-3.5 h-3.5 text-indigo-400" />
            <span>JSON</span>
          </button>

          <button
            type="button"
            onClick={handleCopyAll}
            className={`text-xs px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              copiedAll
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
            }`}
          >
            {copiedAll ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Tous les posts copiés !</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Tout copier (Package complet)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div
        ref={gridRef}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
      >
        <AnimatePresence>
          {filteredEntries.map(([platform, post]) => (
            <PostCard
              key={platform}
              platform={platform}
              post={post}
              onUpdatePost={handleUpdatePost}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
