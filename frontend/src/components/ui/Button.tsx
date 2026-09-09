"use client";

import * as React from "react";
import { IconLoader2 } from "@tabler/icons-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "brown";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
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
      disabled,
      ...props
    },
    ref
  ) => {
    // Sizes
    const sizeClasses = {
      sm: "text-xs px-3 py-1.5 rounded-lg gap-1.5 font-medium",
      md: "text-sm px-4 py-2.2 rounded-xl gap-2 font-medium",
      lg: "text-base px-6 py-3 rounded-xl gap-2.5 font-semibold",
    }[size];

    // Variants (White & Dark Brown clean SaaS theme)
    const variantClasses = {
      primary:
        "bg-[#20150F] text-[#FAF9F7] border border-[#20150F] hover:bg-[#34241B] shadow-[var(--shadow-sm)] dark:bg-[#FAF9F7] dark:text-[#120D0A] dark:border-[#FAF9F7] dark:hover:bg-[#E8E0D5]",
      secondary:
        "bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] hover:bg-[var(--bg-elevated)] shadow-[var(--shadow-xs)]",
      brown:
        "bg-[var(--accent-brown)] text-white border border-[var(--accent-brown)] hover:opacity-90 shadow-[var(--shadow-sm)]",
      outline:
        "bg-transparent text-[var(--text-primary)] border border-[var(--border-medium)] hover:bg-[var(--bg-elevated)]",
      ghost:
        "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]",
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`btn-clean inline-flex items-center justify-center cursor-pointer select-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {isLoading ? (
          <IconLoader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
