"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Clock,
  Hash,
  Layers,
} from "@/components/ui/Icons";
import { DeclineResult, PLATFORMS_DATA } from "@/types";
import {
  calculatePlatformScore,
  estimateReadingTimeSeconds,
  formatNumber,
} from "@/lib/utils";
import { PlatformIcon } from "./ui/SocialIcons";

interface Props {
  result: DeclineResult;
}

export default function PlatformAnalyticsChart({ result }: Props) {
  const platforms = Object.entries(result.platforms);

  const stats = useMemo(() => {
    let totalChars = 0;
    let totalHashtags = 0;
    const scores: number[] = [];
    const hashtagMap: Record<string, number> = {};

    platforms.forEach(([id, post]) => {
      totalChars += post.content.length;
      totalHashtags += post.hashtags.length;
      scores.push(calculatePlatformScore(id, post.content, post.hashtags));

      post.hashtags.forEach((tag) => {
        const clean = tag.startsWith("#") ? tag : `#${tag}`;
        hashtagMap[clean] = (hashtagMap[clean] || 0) + 1;
      });
    });

    const avgScore = scores.length
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 85;

    const sortedHashtags = Object.entries(hashtagMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    return {
      totalChars,
      totalHashtags,
      avgScore,
      sortedHashtags,
      count: platforms.length,
    };
  }, [platforms]);

  return (
    <div className="ui-card rounded-xl p-5 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
            <BarChart3 size={16} />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-slate-100 tracking-tight">
              Analyse & Calibrage des formats
            </h3>
            <p className="text-xs text-slate-400">
              Contrôle des volumes de caractères et compatibilité avec les algorithmes
            </p>
          </div>
        </div>

        {/* Global conformity badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 self-start sm:self-auto">
          <TrendingUp size={14} className="text-emerald-400" />
          <span className="text-xs text-slate-400">Indice de conformité :</span>
          <span className="text-xs font-mono font-bold text-emerald-400">
            {stats.avgScore}%
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Layers size={13} className="text-slate-400" />
            <span>Réseaux</span>
          </div>
          <p className="text-lg font-mono font-bold text-slate-100">{stats.count}</p>
        </div>

        <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Clock size={13} className="text-slate-400" />
            <span>Temps de lecture</span>
          </div>
          <p className="text-lg font-mono font-bold text-slate-100">
            ~{Math.round(estimateReadingTimeSeconds(platforms[0]?.[1]?.content || "") * 0.9)}s
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Hash size={13} className="text-slate-400" />
            <span>Hashtags</span>
          </div>
          <p className="text-lg font-mono font-bold text-slate-100">{stats.totalHashtags}</p>
        </div>

        <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <BarChart3 size={13} className="text-slate-400" />
            <span>Volume total</span>
          </div>
          <p className="text-lg font-mono font-bold text-slate-100">
            {formatNumber(stats.totalChars)} <span className="text-xs font-normal text-slate-400">car.</span>
          </p>
        </div>
      </div>

      {/* D3/SVG Quota bars */}
      <div className="space-y-2 pt-1">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Remplissage par rapport au quota maximal
          </span>
          <span className="text-xs font-mono text-slate-400">Calibrage dynamique</span>
        </div>

        <div className="space-y-2">
          {platforms.map(([id, post]) => {
            const meta = PLATFORMS_DATA[id] || {
              label: id,
              maxChars: 500,
              optimalRange: [100, 350],
              color: "#6366f1",
            };
            const len = post.content.length;
            const score = calculatePlatformScore(id, post.content, post.hashtags);
            const visualMax = Math.min(meta.maxChars, 1500);
            const percent = Math.min(100, Math.max(8, Math.round((len / visualMax) * 100)));

            return (
              <div
                key={id}
                className="p-2 rounded-lg bg-slate-950/30 hover:bg-slate-900/40 border border-slate-800/60 transition-colors flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <PlatformIcon id={id} size={14} className="text-slate-400" />
                    <span className="font-medium text-slate-200 capitalize">
                      {meta.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 font-mono">
                    <span>
                      <strong className="text-slate-200">{len}</strong>
                      <span className="text-slate-500 text-[11px]"> / {meta.maxChars}</span>
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        score >= 80
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {score}%
                    </span>
                  </div>
                </div>

                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full rounded-full bg-indigo-500"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hashtag List */}
      {stats.sortedHashtags.length > 0 && (
        <div className="pt-2 border-t border-slate-800/80">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Hashtags extraits :
          </p>
          <div className="flex flex-wrap gap-1.5">
            {stats.sortedHashtags.map(([tag, count]) => (
              <span
                key={tag}
                className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
              >
                {tag}
                {count > 1 && (
                  <span className="ml-1 text-[10px] text-slate-400">×{count}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
