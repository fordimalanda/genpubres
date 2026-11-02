"use client";

import type { DeclineResult } from "@/types";
import PostCard from "./PostCard";

type Props = {
  result: DeclineResult;
};

export default function ResultGrid({ result }: Props) {
  const entries = Object.entries(result.platforms);

  if (entries.length === 0) {
    return <p className="text-gray-500">Aucun post généré.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {entries.map(([platform, post]) => (
        <PostCard key={platform} platform={platform} post={post} />
      ))}
    </div>
  );
}