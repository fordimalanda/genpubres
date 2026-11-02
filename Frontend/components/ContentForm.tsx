"use client";

import React from "react";
import {
  FileText,
  Clock,
  Type,
  ClipboardPaste,
  Trash2,
  Flame,
  Briefcase,
  BookOpen,
  Zap,
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

  const renderToneIcon = (iconName: string) => {
    switch (iconName) {
      case "flame":
        return <Flame size={14} className="text-slate-400 group-hover:text-slate-200" />;
      case "briefcase":
        return <Briefcase size={14} className="text-slate-400 group-hover:text-slate-200" />;
      case "book":
        return <BookOpen size={14} className="text-slate-400 group-hover:text-slate-200" />;
      case "zap":
        return <Zap size={14} className="text-slate-400 group-hover:text-slate-200" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Label and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label
          htmlFor="content"
          className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2"
        >
          <FileText size={14} className="text-slate-400" />
          <span>Contenu source</span>
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePaste}
            className="text-xs px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Coller depuis le presse-papiers"
          >
            <ClipboardPaste size={13} className="text-slate-400" />
            <span>Coller</span>
          </button>

          {value.length > 0 && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-900 hover:bg-red-500/10 text-slate-400 hover:text-red-300 border border-slate-800 hover:border-red-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Effacer le contenu"
            >
              <Trash2 size={13} />
              <span>Effacer</span>
            </button>
          )}
        </div>
      </div>

      {/* Clean, professional Textarea */}
      <div className="relative">
        <textarea
          id="content"
          rows={6}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Saisissez ou collez votre texte source (article, compte-rendu, annonce, réflexion...) afin de générer les déclinaisons ciblées."
          className="w-full p-4 rounded-xl bg-slate-950/70 text-slate-100 placeholder:text-slate-500 border border-slate-800 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 focus:outline-none transition-all duration-150 resize-y min-h-[160px] text-sm leading-relaxed"
        />

        {/* Minimalist character counter pill */}
        <div className="absolute bottom-3 right-3 flex items-center gap-3 text-xs text-slate-400 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800 pointer-events-none">
          <span className="flex items-center gap-1 font-mono">
            <Type size={12} className="text-slate-400" />
            <strong className="text-slate-200 font-medium">
              {formatNumber(charCount)}
            </strong>{" "}
            caractères
          </span>
          <span className="text-slate-700">•</span>
          <span className="font-mono">{formatNumber(wordCount)} mots</span>
          {readingTimeSec > 3 && (
            <>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1 text-slate-300 font-mono">
                <Clock size={12} className="text-slate-400" /> ~{readingTimeSec}s
              </span>
            </>
          )}
        </div>
      </div>

      {/* Tone & Style Selection without emojis */}
      <div className="pt-1 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Tonalité éditoriale
          </span>
          <span className="text-xs text-slate-400">
            Ajuste le style et l'accroche
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
                className={`group px-3 py-2.5 rounded-lg text-xs font-medium border text-left transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-slate-800/90 border-slate-600 text-white shadow-sm ring-1 ring-slate-600/50"
                    : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200 hover:bg-slate-900/50"
                }`}
              >
                {renderToneIcon(t.iconName)}
                <span className="truncate">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
