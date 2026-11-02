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
          className="text-sm font-semibold text-slate-200 flex items-center gap-2"
        >
          <Globe className="w-4 h-4 text-indigo-400" />
          <span>Langue de sortie & Adaptation culturelle</span>
        </label>
        <span className="text-xs text-slate-400">
          Traduction contextuelle native (non littérale)
        </span>
      </div>

      {/* Language Segmented Pills */}
      <div className="flex flex-wrap gap-2">
        {LANGUAGES.map((l) => {
          const isSelected = value === l.id;
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => onChange(l.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-indigo-600/20 border-indigo-500 text-white shadow-[0_0_12px_-2px_rgba(99,102,241,0.3)] ring-1 ring-indigo-500/50"
                  : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
              }`}
            >
              <span className="text-base leading-none">{l.flag}</span>
              <span>{l.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
