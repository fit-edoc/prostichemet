"use client";

import * as React from "react";
import { CircleNotch } from "@phosphor-icons/react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
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
    const glassBevelShadow =
      "shadow-[inset_0px_1px_1px_rgba(255,255,255,0.2),inset_0px_2px_2px_rgba(255,255,255,0.15),inset_0px_4px_4px_rgba(255,255,255,0.1),inset_0px_8px_8px_rgba(255,255,255,0.05),inset_0px_16px_16px_rgba(255,255,255,0.05),0px_-1px_1px_rgba(0,0,0,0.02),0px_-2px_2px_rgba(0,0,0,0.03),0px_-4px_4px_rgba(0,0,0,0.05),0px_-8px_8px_rgba(0,0,0,0.06),0px_-16px_16px_rgba(0,0,0,0.08)]";

    const sizeClasses = {
      sm: "text-xs px-3.5 py-1.5 rounded-[24px] gap-1.5 font-normal tracking-tight",
      md: "text-xs sm:text-sm px-4.5 py-2 rounded-[24px] gap-2 font-normal tracking-tight",
      lg: "text-sm sm:text-base px-6 py-2.5 rounded-[24px] gap-2.5 font-normal tracking-tight",
    }[size];

    const variantClasses = {
      primary:
        `bg-gradient-to-b from-neutral-800 to-neutral-900 text-white border border-neutral-700/80 hover:border-neutral-600 ${glassBevelShadow} active:translate-y-[0.5px] duration-300 font-medium`,
      secondary:
        `bg-neutral-900/90 text-white border border-neutral-700/80 hover:bg-neutral-800 hover:border-neutral-600 ${glassBevelShadow} active:translate-y-[0.5px] duration-300 font-medium`,
      outline:
        `bg-transparent text-white border border-neutral-700/80 hover:bg-neutral-800/60 hover:border-neutral-600 shadow-sm active:translate-y-[0.5px]`,
      ghost:
        "bg-transparent text-neutral-300 hover:text-white hover:bg-neutral-800/60 active:translate-y-[0.5px]",
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center cursor-pointer select-none transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {isLoading ? (
          <CircleNotch className="w-3.5 h-3.5 animate-spin text-current" />
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
