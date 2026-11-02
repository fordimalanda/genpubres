"use client";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function ContentForm({ value, onChange }: Props) {
  return (
    <div>
      <label htmlFor="content" className="block font-semibold mb-2">
        Contenu source
      </label>
      <textarea
        id="content"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Colle ici ton article, ton idée, ou ton texte source…"
        className="w-full h-48 p-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p className="text-sm text-gray-500 mt-1">{value.length} caractères</p>
    </div>
  );
}