"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Clock,
  Hash,
  Sparkles,
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
      .slice(0, 10);

    return {
      totalChars,
      totalHashtags,
      avgScore,
      sortedHashtags,
      count: platforms.length,
    };
  }, [platforms]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100 flex items-center gap-2">
              Analyse & Métriques de Diffusion
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Optimisé IA
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Calibrage automatique des longueurs, du rythme de lecture et des hashtags
            </p>
          </div>
        </div>

        {/* Global virality badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-slate-400">Score de conformité :</span>
          <span className="text-sm font-bold text-emerald-400">
            {stats.avgScore}%
          </span>
        </div>
      </div>

      {/* Quick KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Réseaux ciblés</p>
            <p className="text-base font-bold text-slate-100">{stats.count}</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Lecture moy.</p>
            <p className="text-base font-bold text-slate-100">
              ~{Math.round(estimateReadingTimeSeconds(platforms[0]?.[1]?.content || "") * 0.9)} sec
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
            <Hash className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Hashtags générés</p>
            <p className="text-base font-bold text-slate-100">{stats.totalHashtags}</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Volume total</p>
            <p className="text-base font-bold text-slate-100">
              {formatNumber(stats.totalChars)} car.
            </p>
          </div>
        </div>
      </div>

      {/* D3 / Motion Animated SVG Bar Chart: Character distribution & Limits */}
      <div className="space-y-3 pt-2">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span>Jauge de calibrage par plateforme (caractères vs quota optimal)</span>
          <span className="text-[11px] text-indigo-400">Calcul dynamique SVG</span>
        </div>

        <div className="space-y-2.5">
          {platforms.map(([id, post]) => {
            const meta = PLATFORMS_DATA[id] || {
              label: id,
              maxChars: 500,
              optimalRange: [100, 350],
              color: "#6366f1",
            };
            const len = post.content.length;
            const score = calculatePlatformScore(id, post.content, post.hashtags);
            // Cap visual percentage for chart so huge limits (like 63k Facebook) don't distort the bar
            const visualMax = Math.min(meta.maxChars, 1500);
            const percent = Math.min(100, Math.max(8, Math.round((len / visualMax) * 100)));

            return (
              <div
                key={id}
                className="group p-2 rounded-xl bg-slate-900/30 hover:bg-slate-900/70 border border-slate-800/50 hover:border-slate-700/80 transition-all flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <PlatformIcon id={id} size={15} className="text-slate-300" />
                    <span className="font-medium text-slate-200 capitalize">
                      {meta.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <span>
                      <strong className="text-slate-200 font-medium">{len}</strong>
                      <span className="text-slate-500 text-[11px]"> / {meta.maxChars} car.</span>
                    </span>
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded ${
                        score >= 80
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {score}% fit
                    </span>
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hashtag Cloud */}
      {stats.sortedHashtags.length > 0 && (
        <div className="pt-2 border-t border-slate-800/80">
          <p className="text-xs text-slate-400 mb-2.5 flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-indigo-400" />
            Top Hashtags générés automatiquement :
          </p>
          <div className="flex flex-wrap gap-1.5">
            {stats.sortedHashtags.map(([tag, count]) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/60 text-indigo-300 border border-slate-700/50 hover:border-indigo-500/40 transition-colors"
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
    </motion.div>
  );
}

