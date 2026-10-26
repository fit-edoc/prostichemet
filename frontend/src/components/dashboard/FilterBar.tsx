'use client';
import React from 'react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedStage: string;
  onStageChange: (stage: string) => void;
}

export function FilterBar({ searchQuery, onSearchChange, selectedStage, onStageChange }: FilterBarProps) {
  const stages = ['all', 'new', 'researched', 'generated', 'contacted', 'replied'];

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between py-3">
      <input
        type="text"
        placeholder="Search prospects..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full sm:w-64 px-3.5 py-1.5 text-sm bg-zinc-900/90 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500"
      />
      <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
        {stages.map((st) => (
          <button
            key={st}
            onClick={() => onStageChange(st)}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors capitalize ${
              selectedStage === st
                ? 'bg-indigo-600 text-white'
                : 'text-zinc-400 hover:text-zinc-200 bg-zinc-800/40'
            }`}
          >
            {st}
          </button>
        ))}
      </div>
    </div>
  );
}
