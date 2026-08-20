"use client";

import * as React from "react";
import { IconLoader2 } from "@tabler/icons-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "vintage";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  enableRollingText?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      enableRollingText = true,
      disabled,
      ...props
    },
    ref
  ) => {
    // Sizes
    const sizeClasses = {
      sm: "text-xs px-3.5 py-1.5 rounded-lg gap-1.5 font-medium",
      md: "text-sm px-5 py-2.5 rounded-xl gap-2 font-medium",
      lg: "text-base px-7 py-3.5 rounded-2xl gap-2.5 font-semibold",
    }[size];

    // Variants (Vintage white & warm charcoal with inset bevels)
    const variantClasses = {
      primary:
        "bg-[var(--text-primary)] text-[var(--bg-canvas)] border border-transparent hover:bg-[var(--text-secondary)] shadow-[var(--shadow-sm)]",
      secondary:
        "bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] hover:bg-[var(--bg-elevated)] shadow-[var(--shadow-sm)]",
      vintage:
        "bg-[var(--accent-vintage)] text-white border border-[var(--accent-vintage)] hover:brightness-110 shadow-[var(--shadow-glow)]",
      outline:
        "bg-transparent text-[var(--text-primary)] border border-[var(--border-medium)] hover:bg-[var(--bg-surface)] hover:border-[var(--text-primary)]",
      ghost:
        "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]",
    }[variant];

    const isSimpleString = typeof children === "string";

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`btn-rolling inline-flex items-center justify-center cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {isLoading ? (
          <IconLoader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}

        {/* Rolling Text Transition */}
        {enableRollingText && isSimpleString && !isLoading ? (
          <span className="btn-rolling-track">
            <span className="btn-rolling-inner">
              <span className="btn-rolling-slot">{children}</span>
              <span className="btn-rolling-slot">{children}</span>
            </span>
          </span>
        ) : (
          <span>{children}</span>
        )}

        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
