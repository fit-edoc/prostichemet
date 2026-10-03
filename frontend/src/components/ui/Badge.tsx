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
    sm: "text-[11px] px-2.5 py-0.5 tracking-wider font-mono",
    md: "text-xs px-3 py-1 tracking-wide font-mono",
  }[size];

  const variantClasses = {
    brown:
      "bg-zinc-100 text-zinc-900 border border-zinc-300 shadow-sm dark:bg-[#161616] dark:text-zinc-300 dark:border-[#2B2B2B]",
    vintage:
      "bg-zinc-100 text-zinc-800 border border-zinc-250 shadow-sm dark:bg-[#161616] dark:text-zinc-300 dark:border-[#2B2B2B]",
    neutral:
      "bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-[#121212] dark:text-zinc-400 dark:border-[#242424]",
    success:
      "bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
    outline:
      "bg-transparent text-zinc-600 border border-zinc-300 dark:text-zinc-400 dark:border-[#2B2B2B]",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white animate-pulse" />
      )}
      {children}
    </span>
  );
}
