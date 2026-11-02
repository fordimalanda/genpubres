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
  Sparkles,
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
          title: `Post ${meta.label}`,
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
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between shadow-lg shadow-black/20"
    >
      {/* Top Header Card */}
      <div className="p-4 bg-slate-900/80 border-b border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-800/90 border border-slate-700/70 flex items-center justify-center text-slate-200">
            <PlatformIcon id={platform} size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm text-slate-100 capitalize">
                {meta.label}
              </h3>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  score >= 80
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                }`}
              >
                {score}% fit
              </span>
            </div>
            <p className="text-[11px] text-slate-400">{meta.description}</p>
          </div>
        </div>

        {/* View mode toggle (Preview vs Edit) */}
        <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
              mode === "preview"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title="Aperçu Réaliste Réseau"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setMode("edit")}
            className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
              mode === "edit"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title="Mode Édition"
          >
            <Edit3 className="w-3.5 h-3.5" />
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
              className="space-y-4"
            >
              {/* Realistic Mockup Wrapper according to platform */}
              {platform === "x" && (
                <div className="rounded-xl bg-black/70 p-3.5 border border-slate-800 text-slate-100 font-sans text-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center font-bold text-white text-xs">
                      GP
                    </div>
                    <div>
                      <div className="flex items-center gap-1 font-bold">
                        <span>GenPub Studio</span>
                        <span className="text-sky-400 text-xs">☑</span>
                        <span className="font-normal text-slate-500">
                          @genpubres • 2m
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="whitespace-pre-wrap leading-relaxed text-slate-200">
                    {post.content}
                  </p>

                  {post.hashtags.length > 0 && (
                    <p className="text-sky-400 font-medium">
                      {post.hashtags.join(" ")}
                    </p>
                  )}

                  {/* X Fake Action Buttons */}
                  <div className="flex items-center justify-between text-slate-500 pt-2 border-t border-slate-900 text-xs">
                    <span className="flex items-center gap-1 hover:text-sky-400">
                      <MessageCircle className="w-3.5 h-3.5" /> 12
                    </span>
                    <span className="flex items-center gap-1 hover:text-emerald-400">
                      <Repeat2 className="w-3.5 h-3.5" /> 34
                    </span>
                    <span className="flex items-center gap-1 hover:text-pink-400">
                      <Heart className="w-3.5 h-3.5" /> 148
                    </span>
                    <span className="flex items-center gap-1 hover:text-sky-400">
                      <Bookmark className="w-3.5 h-3.5" /> 21
                    </span>
                  </div>
                </div>
              )}

              {platform === "linkedin" && (
                <div className="rounded-xl bg-slate-900/90 p-4 border border-slate-800 text-xs space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                      AM
                    </div>
                    <div>
                      <div className="font-bold text-slate-100 flex items-center gap-1">
                        <span>Alexandre Martin</span>
                        <span className="text-slate-400 font-normal">• 1er</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Fondateur & Growth Lead · {getRelativeTime()}
                      </p>
                    </div>
                  </div>

                  <p className="whitespace-pre-wrap leading-relaxed text-slate-200">
                    {post.content}
                  </p>

                  {post.hashtags.length > 0 && (
                    <p className="text-blue-400 font-medium">
                      {post.hashtags.join(" ")}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-slate-400 pt-2 border-t border-slate-800/80 text-xs">
                    <span className="flex items-center gap-1.5 hover:text-blue-400">
                      <ThumbsUp className="w-3.5 h-3.5 text-blue-400" /> J&apos;aime
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-blue-400">
                      <MessageCircle className="w-3.5 h-3.5" /> Commenter
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-blue-400">
                      <Repeat2 className="w-3.5 h-3.5" /> Diffuser
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-blue-400">
                      <Send className="w-3.5 h-3.5" /> Envoyer
                    </span>
                  </div>
                </div>
              )}

              {platform === "instagram" && (
                <div className="rounded-xl bg-slate-950/90 p-3.5 border border-slate-800 text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
                        <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center font-bold text-[10px] text-white">
                          GP
                        </div>
                      </div>
                      <span className="font-semibold text-slate-200">
                        genpubres.studio
                      </span>
                    </div>
                    <span className="text-slate-500">•••</span>
                  </div>

                  <p className="whitespace-pre-wrap leading-relaxed text-slate-200">
                    <strong className="text-white mr-1.5">
                      genpubres.studio
                    </strong>
                    {post.content}
                  </p>

                  {post.hashtags.length > 0 && (
                    <p className="text-indigo-400">
                      {post.hashtags.join(" ")}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-slate-400 pt-2 border-t border-slate-900">
                    <div className="flex items-center gap-3">
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                      <MessageCircle className="w-4 h-4 hover:text-white" />
                      <Send className="w-4 h-4 hover:text-white" />
                    </div>
                    <Bookmark className="w-4 h-4 hover:text-white" />
                  </div>
                </div>
              )}

              {/* Standard card for other platforms (Threads, TikTok, DevTo, Facebook, Snapchat, YouTube) */}
              {!["x", "linkedin", "instagram"].includes(platform) && (
                <div className="rounded-xl bg-slate-900/60 p-4 border border-slate-800/80 text-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-200">
                      {meta.handleExample}
                    </span>
                    <span className="text-slate-500">• Prêt à poster</span>
                  </div>

                  <p className="whitespace-pre-wrap leading-relaxed text-slate-200">
                    {post.content}
                  </p>

                  {post.hashtags.length > 0 && (
                    <p className="text-indigo-400 font-medium">
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
                <label className="text-[11px] font-medium text-slate-400 mb-1 block">
                  Texte du post :
                </label>
                <textarea
                  rows={6}
                  value={editableContent}
                  onChange={(e) => setEditableContent(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 text-slate-100 border border-slate-800 focus:border-indigo-500 focus:outline-none text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-400 mb-1 block">
                  Hashtags (séparés par un espace) :
                </label>
                <input
                  type="text"
                  value={editableHashtags}
                  onChange={(e) => setEditableHashtags(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-950 text-indigo-300 border border-slate-800 focus:border-indigo-500 focus:outline-none text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setMode("preview")}
                  className="text-xs px-3 py-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
                >
                  Valider les modifications
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Actions & Metadata */}
      <div className="p-3 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
        {/* Character count & status */}
        <div className="flex items-center gap-2">
          <span
            className={`font-mono text-xs ${
              isOverLimit ? "text-rose-400 font-bold" : "text-slate-400"
            }`}
          >
            {formatNumber(charCount)}
            <span className="text-slate-600"> / {meta.maxChars}</span>
          </span>
          {isOverLimit && (
            <span className="text-[10px] text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded">
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
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-indigo-300 border border-slate-800 transition-colors cursor-pointer"
              title="Copier uniquement les hashtags"
            >
              {copiedTags ? "Tags ✓" : "#Tags"}
            </button>
          )}

          {typeof navigator !== "undefined" && "share" in navigator && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              title="Partager directement"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              copied
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                : "bg-indigo-600/90 hover:bg-indigo-500 text-white shadow-sm"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Copié !</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copier</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
