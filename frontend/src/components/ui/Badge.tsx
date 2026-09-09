import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "brown" | "vintage" | "neutral" | "success" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  children,
  className = "",
  variant = "neutral",
  size = "sm",
  dot = false,
  ...props
}: BadgeProps) {
  const sizeClasses = {
    sm: "text-[11px] px-2.5 py-0.5 tracking-wider font-medium",
    md: "text-xs px-3 py-1 tracking-wide font-medium",
  }[size];

  const variantClasses = {
    brown:
      "bg-[var(--accent-brown-light)] text-[var(--accent-brown)] border border-[var(--accent-brown)]/20 font-medium",
    vintage:
      "bg-[var(--accent-brown-light)] text-[var(--accent-brown)] border border-[var(--accent-brown)]/20 font-medium",
    neutral:
      "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)] font-normal",
    success:
      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-medium",
    outline:
      "bg-transparent text-[var(--text-secondary)] border border-[var(--border-subtle)]",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      )}
      {children}
    </span>
  );
}
