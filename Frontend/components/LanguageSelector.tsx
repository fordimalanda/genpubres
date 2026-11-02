"use client";

import React from "react";
import { Globe } from "@/components/ui/Icons";
import { LANGUAGES } from "@/types";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function LanguageSelector({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="lang"
          className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2"
        >
          <Globe size={14} className="text-slate-400" />
          <span>Langue de sortie</span>
        </label>
        <span className="text-xs text-slate-400">
          Adaptation idiomatique selon les usages locaux
        </span>
      </div>

      {/* Language Segmented Control without emojis */}
      <div className="flex flex-wrap gap-2">
        {LANGUAGES.map((l) => {
          const isSelected = value === l.id;
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => onChange(l.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-2 transition-all duration-150 cursor-pointer ${
                isSelected
                  ? "bg-slate-800 border-slate-600 text-white shadow-sm ring-1 ring-slate-600/50"
                  : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <span className="font-mono font-bold text-[10px] px-1 py-0.2 rounded bg-slate-900 border border-slate-700/60 text-slate-300">
                {l.code}
              </span>
              <span>{l.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
