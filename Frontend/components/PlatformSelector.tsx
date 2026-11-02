"use client";

import React, { useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import {
  Check,
  CheckCheck,
  RotateCcw,
  Share2,
  Briefcase,
  Compass,
} from "@/components/ui/Icons";
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
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Share2 size={14} className="text-slate-400" />
            <span>Plateformes ciblées</span>
          </label>
          <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {selected.length} / {allPlatforms.length}
          </span>
        </div>

        {/* Clean Shortcuts without emojis */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={selectAll}
            className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <CheckCheck size={13} className="text-slate-400" />
            <span>Tout sélectionner</span>
          </button>

          <button
            type="button"
            onClick={() => selectPack(["x", "linkedin", "devto"])}
            className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Briefcase size={12} className="text-slate-400" />
            <span>Pack B2B</span>
          </button>

          <button
            type="button"
            onClick={() =>
              selectPack(["instagram", "tiktok", "threads", "youtube"])
            }
            className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Compass size={12} className="text-slate-400" />
            <span>Pack Médias</span>
          </button>

          {selected.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-red-500/10 text-slate-400 hover:text-red-300 border border-slate-800 hover:border-red-500/30 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Réinitialiser</span>
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
              className={`relative p-3 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between gap-2.5 select-none cursor-pointer group ${
                active
                  ? "bg-slate-800/80 border-slate-600 shadow-sm ring-1 ring-slate-600/40"
                  : "bg-slate-950/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60 opacity-80 hover:opacity-100"
              }`}
            >
              {/* Top row: Brand Icon & Checkbox */}
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    active
                      ? "bg-slate-900 text-white"
                      : "bg-slate-900/70 text-slate-400"
                  }`}
                >
                  <PlatformIcon id={p.id} size={15} />
                </div>

                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    active
                      ? "bg-indigo-600 border-indigo-500 text-white"
                      : "border-slate-700 bg-slate-900/50"
                  }`}
                >
                  {active && <Check size={11} className="stroke-[3]" />}
                </div>
              </div>

              {/* Title & Quota */}
              <div>
                <p className="font-medium text-xs text-slate-100 group-hover:text-white tracking-tight">
                  {p.label}
                </p>
                <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400 font-mono">
                  <span className="capitalize text-slate-400">{p.category}</span>
                  <span className="text-slate-400">
                    {p.maxChars > 10000 ? "Illimité" : `${p.maxChars}c`}
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
