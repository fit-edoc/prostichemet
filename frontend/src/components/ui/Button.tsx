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

    // Tactile 2px shadow and pure black & white variants
    const variantClasses = {
      primary:
        "bg-white text-black border border-white hover:bg-zinc-200 shadow-[2px_2px_0px_rgba(255,255,255,0.3)] active:translate-x-[1px] active:translate-y-[1px]",
      secondary:
        "bg-[#111111] text-white border border-[#2B2B2B] hover:bg-[#1A1A1A] hover:border-[#444444] shadow-[2px_2px_0px_rgba(255,255,255,0.15)] active:translate-x-[1px] active:translate-y-[1px]",
      brown:
        "bg-white text-black border border-white hover:bg-zinc-200 shadow-[2px_2px_0px_rgba(255,255,255,0.3)] active:translate-x-[1px] active:translate-y-[1px]",
      outline:
        "bg-transparent text-white border border-[#2E2E2E] hover:bg-[#141414] hover:border-zinc-400 shadow-[2px_2px_0px_rgba(255,255,255,0.15)] active:translate-x-[1px] active:translate-y-[1px]",
      ghost:
        "bg-transparent text-zinc-400 hover:text-white hover:bg-[#141414] active:translate-x-[1px] active:translate-y-[1px]",
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
