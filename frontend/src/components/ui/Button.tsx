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
    // Strictly rounded-xl on all sizes
    const sizeClasses = {
      sm: "text-xs px-3.5 py-1.5 rounded-xl gap-1.5 font-medium",
      md: "text-sm px-4.5 py-2.5 rounded-xl gap-2 font-medium",
      lg: "text-base px-6 py-3.5 rounded-xl gap-2.5 font-semibold",
    }[size];

    // Tactile shadow and high-contrast light & dark variants
    const variantClasses = {
      primary:
        "bg-zinc-950 text-white border border-zinc-950 hover:bg-zinc-800 shadow-sm active:translate-x-[1px] active:translate-y-[1px] dark:bg-white dark:text-black dark:border-white dark:hover:bg-zinc-200",
      secondary:
        "bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 shadow-sm active:translate-x-[1px] active:translate-y-[1px] dark:bg-[#111111] dark:text-white dark:border-[#2B2B2B] dark:hover:bg-[#1A1A1A]",
      brown:
        "bg-zinc-950 text-white border border-zinc-950 hover:bg-zinc-800 shadow-sm active:translate-x-[1px] active:translate-y-[1px] dark:bg-white dark:text-black dark:border-white",
      outline:
        "bg-white text-zinc-800 border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 shadow-sm active:translate-x-[1px] active:translate-y-[1px] dark:bg-transparent dark:text-white dark:border-[#2E2E2E] dark:hover:bg-[#141414]",
      ghost:
        "bg-transparent text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 active:translate-x-[1px] active:translate-y-[1px] dark:text-zinc-400 dark:hover:text-white dark:hover:bg-[#141414]",
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center cursor-pointer select-none transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${className}`}
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
