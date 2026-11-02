"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { formatNumber } from "@/lib/utils";

export default function NumberTicker({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    damping: 30,
    stiffness: 100,
  });
  const displayVal = useTransform(springVal, (current) =>
    formatNumber(Math.round(current))
  );

  useEffect(() => {
    motionVal.set(value);
  }, [value, motionVal]);

  useEffect(() => {
    const unsubscribe = displayVal.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest;
      }
    });
    return () => unsubscribe();
  }, [displayVal]);

  return (
    <span ref={ref} className={className}>
      {formatNumber(value)}
    </span>
  );
}

