import * as React from "react";

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] ${className}`}
    />
  );
}

export function SectionSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col items-center space-y-4 mb-12">
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-10 w-96 max-w-full" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    </div>
  );
}
