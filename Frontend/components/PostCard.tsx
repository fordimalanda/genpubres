"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Edit3,
  Eye,
  Share2,
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  Send,
  ThumbsUp,
  VerifiedCheck,
} from "@/components/ui/Icons";
import type { PlatformPost } from "@/types";
import { PLATFORMS_DATA } from "@/types";
import {
  calculatePlatformScore,
  formatNumber,
  getRelativeTime,
} from "@/lib/utils";
import { PlatformIcon } from "./ui/SocialIcons";

interface Props {
  platform: string;
  post: PlatformPost;
  onUpdatePost?: (platform: string, newPost: PlatformPost) => void;
}

export default function PostCard({ platform, post, onUpdatePost }: Props) {
  const [mode, setMode] = useState<"preview" | "edit">("preview");
  const [copied, setCopied] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);
  const [editableContent, setEditableContent] = useState(post.content);
  const [editableHashtags, setEditableHashtags] = useState(
    post.hashtags.join(" ")
  );

  const meta = PLATFORMS_DATA[platform] || {
    id: platform,
    label: platform,
    category: "microblog",
    maxChars: 500,
    optimalRange: [100, 300],
    color: "#6366f1",
    accentBg: "rgba(99, 102, 241, 0.15)",
    description: "",
    handleExample: "@creator",
  };

  const currentContent = mode === "edit" ? editableContent : post.content;
  const currentTagsList =
    mode === "edit"
      ? editableHashtags.split(/\s+/).filter(Boolean)
      : post.hashtags;

  const fullText = `${currentContent}\n\n${currentTagsList.join(" ")}`.trim();
  const charCount = currentContent.length;
  const isOverLimit = charCount > meta.maxChars;
  const score = calculatePlatformScore(platform, currentContent, currentTagsList);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore
    }
  };

  const handleCopyTags = async () => {
    try {
      await navigator.clipboard.writeText(currentTagsList.join(" "));
      setCopiedTags(true);
      setTimeout(() => setCopiedTags(false), 2000);
    } catch {
      // Ignore
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Publication ${meta.label}`,
          text: fullText,
        });
      } catch {
        // user canceled
      }
    } else {
      handleCopy();
    }
  };

  const handleSaveEdit = () => {
    if (onUpdatePost) {
      onUpdatePost(platform, {
        content: editableContent,
        hashtags: editableHashtags.split(/\s+/).filter(Boolean),
      });
    }
    setMode("preview");
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="ui-card rounded-xl overflow-hidden flex flex-col justify-between"
    >
      {/* Top Header Card */}
      <div className="px-4 py-3 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-200">
            <PlatformIcon id={platform} size={15} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-xs text-slate-100 capitalize tracking-tight">
                {meta.label}
              </h3>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  score >= 80
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }`}
              >
                {score}% conformité
              </span>
            </div>
          </div>
        </div>

        {/* View mode toggle (Preview vs Edit) */}
        <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
              mode === "preview"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title="Aperçu visuel"
          >
            <Eye size={13} />
          </button>
          <button
            type="button"
            onClick={() => setMode("edit")}
            className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
              mode === "edit"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title="Modifier le contenu"
          >
            <Edit3 size={13} />
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 flex-1">
        <AnimatePresence mode="wait">
          {mode === "preview" ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {/* Realistic Mockup Wrapper according to platform */}
              {platform === "x" && (
                <div className="rounded-lg bg-black/50 p-3.5 border border-slate-800/80 text-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300 text-xs">
                      GP
                    </div>
                    <div>
                      <div className="flex items-center gap-1 font-semibold text-slate-100">
                        <span>Studio Publications</span>
                        <VerifiedCheck size={13} />
                        <span className="font-normal text-slate-500 text-[11px]">
                          @genpubres · 2m
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="whitespace-pre-wrap leading-relaxed text-slate-200 font-sans text-xs sm:text-[13px]">
                    {post.content}
                  </p>

                  {post.hashtags.length > 0 && (
                    <p className="text-sky-400 font-medium text-xs">
                      {post.hashtags.join(" ")}
                    </p>
                  )}

                  {/* X Action Buttons */}
                  <div className="flex items-center justify-between text-slate-500 pt-2 border-t border-slate-900 text-xs">
                    <span className="flex items-center gap-1 hover:text-slate-300">
                      <MessageCircle size={13} /> 12
                    </span>
                    <span className="flex items-center gap-1 hover:text-slate-300">
                      <Repeat2 size={13} /> 34
                    </span>
                    <span className="flex items-center gap-1 hover:text-slate-300">
                      <Heart size={13} /> 148
                    </span>
                    <span className="flex items-center gap-1 hover:text-slate-300">
                      <Bookmark size={13} /> 21
                    </span>
                  </div>
                </div>
              )}

              {platform === "linkedin" && (
                <div className="rounded-lg bg-slate-950/40 p-4 border border-slate-800/80 text-xs space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300 text-xs">
                      AM
                    </div>
                    <div>
                      <div className="font-semibold text-slate-100 flex items-center gap-1">
                        <span>Alexandre Martin</span>
                        <span className="text-slate-500 font-normal text-[11px]">• 1er</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Direction éditoriale · {getRelativeTime()}
                      </p>
                    </div>
                  </div>

                  <p className="whitespace-pre-wrap leading-relaxed text-slate-200 text-xs sm:text-[13px]">
                    {post.content}
                  </p>

                  {post.hashtags.length > 0 && (
                    <p className="text-blue-400 font-medium text-xs">
                      {post.hashtags.join(" ")}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-slate-400 pt-2 border-t border-slate-800/80 text-xs">
                    <span className="flex items-center gap-1.5 hover:text-slate-200">
                      <ThumbsUp size={13} /> J&apos;aime
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-slate-200">
                      <MessageCircle size={13} /> Commenter
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-slate-200">
                      <Repeat2 size={13} /> Partager
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-slate-200">
                      <Send size={13} /> Envoyer
                    </span>
                  </div>
                </div>
              )}

              {platform === "instagram" && (
                <div className="rounded-lg bg-black/40 p-3.5 border border-slate-800/80 text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px] text-slate-300">
                        GP
                      </div>
                      <span className="font-semibold text-slate-200 text-xs">
                        genpubres.studio
                      </span>
                    </div>
                    <span className="text-slate-600 font-mono text-xs">···</span>
                  </div>

                  <p className="whitespace-pre-wrap leading-relaxed text-slate-200 text-xs sm:text-[13px]">
                    <strong className="text-white mr-1.5">
                      genpubres.studio
                    </strong>
                    {post.content}
                  </p>

                  {post.hashtags.length > 0 && (
                    <p className="text-indigo-400 text-xs">
                      {post.hashtags.join(" ")}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-slate-400 pt-2 border-t border-slate-900">
                    <div className="flex items-center gap-3">
                      <Heart size={14} className="hover:text-rose-400" />
                      <MessageCircle size={14} className="hover:text-white" />
                      <Send size={14} className="hover:text-white" />
                    </div>
                    <Bookmark size={14} className="hover:text-white" />
                  </div>
                </div>
              )}

              {/* Standard clean card for other platforms */}
              {!["x", "linkedin", "instagram"].includes(platform) && (
                <div className="rounded-lg bg-slate-950/40 p-3.5 border border-slate-800/80 text-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-300 text-xs">
                      {meta.handleExample}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">Prêt à publier</span>
                  </div>

                  <p className="whitespace-pre-wrap leading-relaxed text-slate-200 text-xs sm:text-[13px]">
                    {post.content}
                  </p>

                  {post.hashtags.length > 0 && (
                    <p className="text-indigo-400 font-medium text-xs">
                      {post.hashtags.join(" ")}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="edit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div>
                <label className="text-[11px] font-medium uppercase tracking-wider text-slate-400 mb-1 block">
                  Texte de la publication :
                </label>
                <textarea
                  rows={6}
                  value={editableContent}
                  onChange={(e) => setEditableContent(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-950 text-slate-100 border border-slate-800 focus:border-indigo-500 focus:outline-none text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium uppercase tracking-wider text-slate-400 mb-1 block">
                  Hashtags (séparés par un espace) :
                </label>
                <input
                  type="text"
                  value={editableHashtags}
                  onChange={(e) => setEditableHashtags(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 text-indigo-300 border border-slate-800 focus:border-indigo-500 focus:outline-none text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setMode("preview")}
                  className="text-xs px-2.5 py-1.5 rounded text-slate-400 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="text-xs px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
                >
                  Enregistrer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Actions & Metadata */}
      <div className="px-4 py-2.5 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
        {/* Character count & status */}
        <div className="flex items-center gap-2">
          <span
            className={`font-mono text-xs ${
              isOverLimit ? "text-rose-400 font-semibold" : "text-slate-400"
            }`}
          >
            {formatNumber(charCount)}
            <span className="text-slate-600"> / {meta.maxChars}</span>
          </span>
          {isOverLimit && (
            <span className="text-[10px] text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
              Dépassement
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1.5">
          {post.hashtags.length > 0 && (
            <button
              type="button"
              onClick={handleCopyTags}
              className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors cursor-pointer text-xs font-mono"
              title="Copier les tags"
            >
              {copiedTags ? "Copié" : "#tags"}
            </button>
          )}

          {typeof navigator !== "undefined" && "share" in navigator && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              title="Partager"
            >
              <Share2 size={13} />
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded font-medium flex items-center gap-1.5 transition-all cursor-pointer text-xs ${
              copied
                ? "bg-emerald-600 text-white"
                : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
            }`}
          >
            {copied ? (
              <>
                <Check size={13} className="stroke-[2.5]" />
                <span>Copié</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copier</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
