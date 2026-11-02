"use client";

import { LANGUAGES } from "@/types";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function LanguageSelector({ value, onChange }: Props) {
  return (
    <div>
      <label htmlFor="lang" className="block font-semibold mb-2">
        Langue de sortie
      </label>
      <select
        id="lang"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 rounded-lg border border-gray-300 bg-white text-gray-900"
      >
        {LANGUAGES.map((l) => (
          <option key={l.id} value={l.id}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}