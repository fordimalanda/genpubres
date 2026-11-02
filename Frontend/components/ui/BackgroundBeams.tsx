"use client";

import React from "react";

export default function BackgroundBeams() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Background Dot & Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.25]" />
      
      {/* Top subtle radial gradient spotlight */}
      <div className="absolute -top-[40%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-500/20 via-violet-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

      {/* Floating Glowing Orbs */}
      <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[140px] animate-float-slow pointer-events-none" />
      <div className="absolute top-[60%] -right-[10%] w-[600px] h-[600px] rounded-full bg-fuchsia-600/15 blur-[150px] animate-float-reverse pointer-events-none" />
      <div className="absolute bottom-[5%] left-[25%] w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[130px] animate-float-slow pointer-events-none" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-[#090d16]/70 pointer-events-none" />
    </div>
  );
}

