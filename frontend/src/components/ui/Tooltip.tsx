'use client';
import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-xs text-white bg-zinc-900 border border-zinc-700/80 rounded shadow-lg whitespace-nowrap z-50 pointer-events-none">
          {content}
        </div>
      )}
    </div>
  );
}
