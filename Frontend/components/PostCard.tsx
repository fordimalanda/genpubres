"use client";

import { useState } from "react";
import type { PlatformPost } from "@/types";

type Props = {
  platform: string;
  post: PlatformPost;
};

export default function PostCard({ platform, post }: Props) {
  const [copied, setCopied] = useState(false);

  const fullText = `${post.content}\n\n${post.hashtags.join(" ")}`;

  const copy = async () => {
    await navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold capitalize text-gray-900">{platform}</h3>
        <button
          onClick={copy}
          className="text-sm text-blue-600 hover:underline"
        >
          {copied ? "✓ Copié" : "📋 Copier"}
        </button>
      </div>

      <p className="whitespace-pre-wrap text-gray-800">{post.content}</p>

      {post.hashtags?.length > 0 && (
        <p className="mt-3 text-blue-600">{post.hashtags.join(" ")}</p>
      )}

      <p className="mt-2 text-xs text-gray-400">
        {post.content.length} caractères
      </p>
    </div>
  );
}