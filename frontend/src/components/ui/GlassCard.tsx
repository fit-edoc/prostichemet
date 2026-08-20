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
      className={`spotlight-card rounded-2xl p-6 md:p-8 relative ${
        elevated ? "bg-[var(--bg-elevated)]" : "bg-[var(--bg-surface)]"
      } ${className}`}
      {...props}
    >
      {/* Content wrapper to stay above spotlight radial shine */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
