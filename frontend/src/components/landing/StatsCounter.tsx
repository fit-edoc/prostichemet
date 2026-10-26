'use client';
import React from 'react';

interface StatItem {
  label: string;
  value: string;
  subtext: string;
}

export function StatsCounter({ items }: { items: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10">
      {items.map((it, idx) => (
        <div key={idx} className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40">
          <div className="text-3xl font-bold text-white tracking-tight">{it.value}</div>
          <div className="text-sm font-medium text-indigo-400 mt-1">{it.label}</div>
          <div className="text-xs text-zinc-500 mt-0.5">{it.subtext}</div>
        </div>
      ))}
    </div>
  );
}
