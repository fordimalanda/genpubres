"use client";

import React from "react";
import { Layers, FileText, Globe2, ShieldCheck } from "@/components/ui/Icons";
import { SAMPLE_TEMPLATES } from "@/types";

interface Props {
  onSelectTemplate: (content: string) => void;
}

export default function Header({ onSelectTemplate }: Props) {
  return (
    <header className="space-y-6 pt-6 pb-2 border-b border-slate-800/60 pb-8">
      {/* Top Bar Navigation / System Meta */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm ring-1 ring-white/10">
            <Layers size={18} className="stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base tracking-tight text-white">
                GenPubRes
              </span>
              <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60">
                Studio
              </span>
            </div>
          </div>
        </div>

        {/* Minimalist System Status */}
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-slate-300 font-medium">Service actif</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5">
            <Globe2 size={13} className="text-slate-400" />
            <span>Multi-langues</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-slate-400" />
            <span>Format natif</span>
          </div>
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div className="space-y-2 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Déclinaison de contenu pour réseaux sociaux
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
          Rédigez un contenu source unique. Le moteur génère automatiquement les versions
          adaptées aux contraintes de format, de longueur et de style de chaque canal.
        </p>
      </div>

      {/* Templates / Quick Starts without emojis */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-medium text-slate-400 mr-1 flex items-center gap-1.5">
          <FileText size={13} className="text-slate-400" /> Modèles de départ :
        </span>
        {SAMPLE_TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.title}
            type="button"
            onClick={() => onSelectTemplate(tmpl.content)}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800/90 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-all duration-150 cursor-pointer"
          >
            {tmpl.title}
          </button>
        ))}
      </div>
    </header>
  );
}
