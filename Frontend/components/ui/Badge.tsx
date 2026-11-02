import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "glow" | "success";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-200",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-xs",
        variant === "default" &&
          "bg-indigo-500/10 text-indigo-300 border border-indigo-500/30",
        variant === "secondary" &&
          "bg-slate-800/80 text-slate-300 border border-slate-700/60",
        variant === "outline" &&
          "bg-transparent text-slate-400 border border-slate-700 hover:border-slate-500",
        variant === "glow" &&
          "bg-indigo-600/20 text-indigo-200 border border-indigo-400/40 shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)]",
        variant === "success" &&
          "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

