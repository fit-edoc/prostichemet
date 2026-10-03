"use client";

import * as React from "react";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  spotlight?: boolean;
}

export function GlassCard({
  children,
  className = "",
  elevated = false,
  spotlight = true,
  onMouseMove,
  ...props
}: GlassCardProps) {
  const cardRef = React.useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (spotlight && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty("--mouse-x", `${x}px`);
      cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    }
    if (onMouseMove) {
      onMouseMove(e);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`rounded-2xl p-6 md:p-8 relative border border-zinc-200 dark:border-[#262626] transition-all duration-200 ${
        elevated
          ? "bg-white dark:bg-[#111111] shadow-md dark:shadow-[2px_2px_0px_rgba(255,255,255,0.2)]"
          : "bg-white dark:bg-[#0c0c0c] shadow-sm dark:shadow-[2px_2px_0px_rgba(0,0,0,0.8)]"
      } ${className}`}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
