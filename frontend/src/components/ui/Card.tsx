'use client';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md p-6 shadow-xl shadow-black/20 ${className}`}
    >
      {children}
    </div>
  );
}
