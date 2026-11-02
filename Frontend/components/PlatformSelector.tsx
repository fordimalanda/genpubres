"use client";

import React, { useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import { Check, CheckCheck, RotateCcw, Share2 } from "@/components/ui/Icons";
import { PLATFORMS_DATA } from "@/types";
import { PlatformIcon } from "./ui/SocialIcons";

interface Props {
  selected: string[];
  onChange: (p: string[]) => void;
}

export default function PlatformSelector({ selected, onChange }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);

  const allPlatforms = Object.values(PLATFORMS_DATA);

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((p) => p !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  const selectAll = () => {
    onChange(allPlatforms.map((p) => p.id));
  };

  const clearAll = () => {
    onChange([]);
  };

  const selectPack = (ids: string[]) => {
    onChange(ids);
  };

  return (
    <div className="space-y-3">
      {/* Header with Quick Shortcuts */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <Share2 className="w-4 h-4 text-indigo-400" />
          <span>Plateformes ciblées</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 font-medium border border-indigo-500/30">
            {selected.length} / {allPlatforms.length} sélectionnée{selected.length > 1 ? "s" : ""}
          </span>
        </label>

        {/* Shortcuts */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={selectAll}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Tout cocher</span>
          </button>

          <button
            type="button"
            onClick={() => selectPack(["x", "linkedin", "devto"])}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
          >
            💼 Pack Pro B2B
          </button>

          <button
            type="button"
            onClick={() => selectPack(["instagram", "tiktok", "threads", "youtube"])}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
          >
            ✨ Pack Créateur
          </button>

          {selected.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-red-500/10 text-slate-400 hover:text-red-300 border border-slate-800 hover:border-red-500/30 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid of Platform Cards */}
      <div
        ref={parentRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-2.5"
      >
        {allPlatforms.map((p) => {
          const active = selected.includes(p.id);

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => toggle(p.id)}
              className={`relative p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-2 select-none cursor-pointer group ${
                active
                  ? "bg-slate-900/90 border-indigo-500 shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)] ring-1 ring-indigo-500/40"
                  : "bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70 opacity-75 hover:opacity-100"
              }`}
            >
              {/* Top row: Icon & Status Checkbox */}
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 ${
                    active ? "bg-indigo-600/20 text-indigo-300" : "bg-slate-800/60 text-slate-400"
                  }`}
                >
                  <PlatformIcon id={p.id} size={18} />
                </div>

                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                    active
                      ? "bg-indigo-600 border-indigo-500 text-white"
                      : "border-slate-700 bg-slate-950/50"
                  }`}
                >
                  {active && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>

              {/* Title & Limit */}
              <div>
                <p className="font-semibold text-xs text-slate-100 group-hover:text-white">
                  {p.label}
                </p>
                <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
                  <span className="capitalize text-slate-400">{p.category}</span>
                  <span className="text-slate-400 font-mono">
                    {p.maxChars > 10000 ? "Illimité" : `max ${p.maxChars}`}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
