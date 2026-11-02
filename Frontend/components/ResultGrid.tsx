"use client";

import React, { useState, useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Download,
  Filter,
  FileDown,
  Layers,
} from "@/components/ui/Icons";
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
        return `----------------------------------------\n[${meta.toUpperCase()}]\n----------------------------------------\n${post.content}${tags}\n`;
      })
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedAll(true);
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
    downloadAnchor.setAttribute("download", `genpubres-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportTXT = () => {
    const textContent = entries
      .map(([platform, post]) => {
        const meta = PLATFORMS_DATA[platform]?.label || platform;
        return `=== ${meta} ===\n\n${post.content}\n\n${post.hashtags.join(" ")}\n\n`;
      })
      .join("----------------------------------------\n\n");

    const dataStr =
      "data:text/plain;charset=utf-8," + encodeURIComponent(textContent);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `genpubres-${Date.now()}.txt`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (entries.length === 0) {
    return (
      <div className="ui-card rounded-xl p-8 text-center text-slate-400">
        <Layers size={24} className="text-slate-500 mx-auto mb-2" />
        <p className="text-sm">Aucune publication à afficher.</p>
      </div>
    );
  }

  const categories = [
    { id: "all", label: `Tous (${entries.length})` },
    { id: "microblog", label: "Microblog (X, Threads)" },
    { id: "pro", label: "Pro (LinkedIn, Facebook)" },
    { id: "visual", label: "Visuel (Instagram, Snapchat)" },
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

      {/* Filter and Export Toolbar */}
      <div className="ui-card rounded-xl p-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
            <Filter size={13} className="text-slate-400" /> Filtrer :
          </span>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilterCategory(c.id)}
              className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                filterCategory === c.id
                  ? "bg-slate-800 text-white border-slate-600 shadow-sm"
                  : "bg-slate-950/40 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:border-slate-700"
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
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Exporter en fichier texte brut"
          >
            <Download size={13} className="text-slate-400" />
            <span>TXT</span>
          </button>

          <button
            type="button"
            onClick={handleExportJSON}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Exporter en JSON"
          >
            <FileDown size={13} className="text-slate-400" />
            <span>JSON</span>
          </button>

          <button
            type="button"
            onClick={handleCopyAll}
            className={`text-xs px-3.5 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              copiedAll
                ? "bg-emerald-600 text-white"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
            }`}
          >
            {copiedAll ? (
              <>
                <Check size={13} className="stroke-[2.5]" />
                <span>Copié dans le presse-papiers</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Tout copier</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div
        ref={gridRef}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-2"
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
