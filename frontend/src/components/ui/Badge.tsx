import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "vintage" | "neutral" | "success" | "outline";
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
    sm: "text-[11px] px-2.5 py-0.5 tracking-wider",
    md: "text-xs px-3.5 py-1 tracking-wide",
  }[size];

  const variantClasses = {
    vintage:
      "bg-[var(--accent-vintage-light)] text-[var(--accent-vintage)] border border-[var(--accent-vintage)]/20 font-medium",
    neutral:
      "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)] font-normal",
    success:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium",
    outline:
      "bg-transparent text-[var(--text-secondary)] border border-[var(--border-subtle)]",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full uppercase font-medium ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      )}
      {children}
    </span>
  );
}
