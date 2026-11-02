"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Globe2, ShieldCheck, Cpu } from "@/components/ui/Icons";
import { SAMPLE_TEMPLATES } from "@/types";

interface Props {
  onSelectTemplate: (content: string) => void;
}

export default function Header({ onSelectTemplate }: Props) {
  return (
    <header className="relative space-y-6 pt-4 pb-2">
      {/* Top Banner Status */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-xs text-slate-300 shadow-sm backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-slate-400 font-normal">Moteur IA :</span>
          <span className="font-semibold text-indigo-300 flex items-center gap-1">
            <Cpu className="w-3 h-3 text-indigo-400" /> DeepSeek V3 Neural
          </span>
        </motion.div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>6 Langues</span>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>9 Formats Réseaux</span>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Lock-in</span>
          </div>
        </div>
      </div>

      {/* Main Title Hero */}
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3.5"
        >
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/25">
            <div className="w-full h-full bg-[#090d16] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              GenPubRes
              <span className="ml-2 text-sm font-semibold tracking-normal px-2.5 py-0.5 rounded-md bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30">
                Studio AI
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-400 mt-1">
              Un contenu source unique{" "}
              <span className="text-slate-200 font-medium">→</span> 9 publications taillées sur-mesure pour chaque algorithme.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Quick Templates Bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="flex flex-wrap items-center gap-2 pt-1"
      >
        <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" /> Exemples rapides :
        </span>
        {SAMPLE_TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.title}
            type="button"
            onClick={() => onSelectTemplate(tmpl.content)}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-indigo-500/50 transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
            title={tmpl.preview}
          >
            {tmpl.title}
          </button>
        ))}
      </motion.div>
    </header>
  );
}

