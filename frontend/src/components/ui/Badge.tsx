import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "green" | "blue" | "amber" | "purple" | "rose" | "neutral";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  children,
  className = "",
  variant = "green",
  size = "sm",
  dot = false,
  ...props
}: BadgeProps) {
  const sizeClasses = {
    sm: "text-[11px] px-2 py-[2px] tracking-tight leading-none",
    md: "text-xs px-2.5 py-[2px] tracking-tight leading-none",
  }[size];

  const variantClasses = {
    green: "bg-green-700/10 text-green-600 border-0 font-normal",
    blue: "bg-blue-700/10 text-blue-600 border-0 font-normal",
    amber: "bg-amber-700/10 text-amber-600 border-0 font-normal",
    purple: "bg-purple-700/10 text-purple-600 border-0 font-normal",
    rose: "bg-rose-700/10 text-rose-600 border-0 font-normal",
    neutral: "bg-zinc-700/10 text-zinc-600 border-0 font-normal",
  }[variant];

  const dotClasses = {
    green: "bg-green-600",
    blue: "bg-blue-600",
    amber: "bg-amber-600",
    purple: "bg-purple-600",
    rose: "bg-rose-600",
    neutral: "bg-zinc-600",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[2px] ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotClasses} animate-pulse`} />
      )}
      {children}
    </span>
  );
}
