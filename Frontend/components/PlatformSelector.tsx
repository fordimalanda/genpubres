"use client";

import { PLATFORMS } from "@/types";

type Props = {
  selected: string[];
  onChange: (p: string[]) => void;
};

export default function PlatformSelector({ selected, onChange }: Props) {
  const toggle = (id: string) => {
    onChange(
      selected.includes(id) ? selected.filter((p) => p !== id) : [...selected, id]
    );
  };

  return (
    <div>
      <label className="block font-semibold mb-2">Plateformes ciblées</label>
      <div className="flex flex-wrap gap-2">
        {PLATFORMS.map((p) => {
          const active = selected.includes(p.id);
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => toggle(p.id)}
              className={`px-3 py-1.5 rounded-full border text-sm transition ${
                active
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}