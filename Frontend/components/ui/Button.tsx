"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={disabled || loading ? {} : { scale: 1.01 }}
        whileTap={disabled || loading ? {} : { scale: 0.99 }}
        disabled={disabled || loading}
        className={cn(
          "relative inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none",
          size === "sm" && "px-2.5 py-1.5 text-xs gap-1.5",
          size === "md" && "px-3.5 py-2 text-sm gap-2",
          size === "lg" && "px-5 py-3 text-sm gap-2 font-semibold",
          variant === "primary" &&
            "bg-indigo-600 text-white hover:bg-indigo-500 border border-indigo-500/50 shadow-sm",
          variant === "secondary" &&
            "bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700 shadow-sm",
          variant === "outline" &&
            "bg-slate-900/60 text-slate-200 border border-slate-700 hover:bg-slate-800 hover:border-slate-600",
          variant === "ghost" &&
            "bg-transparent text-slate-400 hover:bg-slate-800/60 hover:text-white",
          className
        )}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Traitement en cours...</span>
          </>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
