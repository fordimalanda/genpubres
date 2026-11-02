"use client";

import React from "react";

export default function BackgroundBeams() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Subtle geometric grid */}
      <div className="absolute inset-0 bg-subtle-grid opacity-75" />

      {/* Gentle top ambient spotlight */}
      <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-500/[0.07] blur-[120px] rounded-full" />

      {/* Subtle bottom vignette to frame the content */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b0f19] pointer-events-none" />
    </div>
  );
}
