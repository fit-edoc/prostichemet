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
      "bg-[#161616] text-zinc-300 border border-[#2B2B2B] shadow-[1px_1px_0px_rgba(255,255,255,0.15)]",
    vintage:
      "bg-[#161616] text-zinc-300 border border-[#2B2B2B] shadow-[1px_1px_0px_rgba(255,255,255,0.15)]",
    neutral:
      "bg-[#121212] text-zinc-400 border border-[#242424]",
    success:
      "bg-white/10 text-white border border-white/20 font-medium",
    outline:
      "bg-transparent text-zinc-400 border border-[#2B2B2B]",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      )}
      {children}
    </span>
  );
}
