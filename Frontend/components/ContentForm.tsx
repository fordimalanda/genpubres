"use client";

import React from "react";
import {
  FileText,
  Clock,
  Type,
  ClipboardPaste,
  Trash2,
  Sparkles,
} from "@/components/ui/Icons";
import { estimateReadingTimeSeconds, formatNumber } from "@/lib/utils";
import { TONE_PRESETS } from "@/types";

interface Props {
  value: string;
  onChange: (v: string) => void;
  tone: string;
  onToneChange: (t: string) => void;
}

export default function ContentForm({
  value,
  onChange,
  tone,
  onToneChange,
}: Props) {
  const charCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const readingTimeSec = estimateReadingTimeSeconds(value);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) onChange(text);
    } catch {
      // Ignore if clipboard access denied
    }
  };

  return (
    <div className="space-y-3">
      {/* Label and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label
          htmlFor="content"
          className="text-sm font-semibold text-slate-200 flex items-center gap-2"
        >
          <FileText className="w-4 h-4 text-indigo-400" />
          <span>Contenu Source</span>
          <span className="text-xs font-normal text-slate-400">
            (Article, newsletter, idée brute, annonce...)
          </span>
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePaste}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Coller depuis le presse-papiers"
          >
            <ClipboardPaste className="w-3.5 h-3.5 text-indigo-400" />
            <span>Coller</span>
          </button>

          {value.length > 0 && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-red-500/10 text-slate-400 hover:text-red-300 border border-slate-700/80 hover:border-red-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Effacer le contenu"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Effacer</span>
            </button>
          )}
        </div>
      </div>

      {/* Textarea container with glowing focus ring */}
      <div className="relative group">
        <textarea
          id="content"
          rows={6}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Collez ou écrivez ici votre contenu source : un article de blog, les notes d'une réunion, une mise à jour produit, une réflexion inspirante... L'IA s'occupe de l'adapter selon les codes de chaque réseau social !"
          className="w-full p-4 rounded-xl bg-slate-900/90 text-slate-100 placeholder:text-slate-500 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all duration-200 resize-y min-h-[160px] text-sm leading-relaxed"
        />

        {/* Floating character / word badge on bottom right */}
        <div className="absolute bottom-3 right-3 flex items-center gap-3 text-xs text-slate-400 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800/80 pointer-events-none">
          <span className="flex items-center gap-1">
            <Type className="w-3 h-3 text-indigo-400" />
            <strong className="text-slate-200">{formatNumber(charCount)}</strong>{" "}
            car.
          </span>
          <span className="text-slate-700">•</span>
          <span>{formatNumber(wordCount)} mots</span>
          {readingTimeSec > 3 && (
            <>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1 text-slate-300">
                <Clock className="w-3 h-3 text-emerald-400" /> ~{readingTimeSec}s
              </span>
            </>
          )}
        </div>
      </div>

      {/* Tone & Style Presets */}
      <div className="pt-1 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Intention & Tonalité éditoriale :
          </span>
          <span className="text-[11px] text-slate-400">
            Oriente l'accroche et le vocabulaire
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {TONE_PRESETS.map((t) => {
            const isSelected = tone === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onToneChange(t.id)}
                className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-indigo-600/20 border-indigo-500 text-white shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)] ring-1 ring-indigo-500/50"
                    : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                <span className="text-sm">{t.icon}</span>
                <span className="truncate">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
