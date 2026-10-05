"use client";

import * as React from "react";
import { useCounter } from "../../hooks/useCounter";
import {
  Star,
  Target,
  TrendUp,
  Clock,
  ShieldCheck,
} from "@phosphor-icons/react";

export function TrustProof() {
  const accuracyCounter = useCounter({ end: 94, suffix: "%" });
  const liftCounter = useCounter({ end: 3.2, decimals: 1, suffix: "x" });
  const wordCounter = useCounter({ end: 85, prefix: "< " });
  const zeroCounter = useCounter({ end: 0, suffix: "%" });

  const realAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
  ];

  return (
    <section id="proof" className="w-full py-16 border-y border-zinc-200/80 bg-zinc-50/50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Rating and Social Proof Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-200/70">
          <div className="flex items-center gap-3">
            {/* Real Executive Avatars */}
            <div className="flex -space-x-2">
              {realAvatars.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Verified executive ${i + 1}`}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} weight="fill" className="w-3.5 h-3.5" />
                ))}
              </div>
              <p className="text-xs text-zinc-600 font-normal tracking-tight mt-0.5">
                Rated 4.9/5 by 500+ revenue leaders & outbound teams
              </p>
            </div>
          </div>

          {/* Multi-color Badge: Amber Field Proof */}
          <span className="bg-amber-700/10 text-amber-600 rounded-[2px] border-0 py-[2px] px-2 text-[11px] font-normal tracking-tight">
            Verified Production Metrics
          </span>
        </div>

        {/* 4 Quantitative Metric Cards with RAW Phosphor Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {/* Metric 1 */}
          <div
            ref={accuracyCounter.ref}
            className="p-5 rounded-md bg-white border border-zinc-200/80 hover:border-zinc-300 transition-all shadow-xs"
          >
            <Target className="w-5 h-5 text-zinc-900 mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl font-normal text-zinc-950 tracking-tight mb-1">
              {accuracyCounter.value}
            </div>
            <div className="text-xs text-zinc-900 font-normal tracking-tight mb-0.5">
              Research Accuracy
            </div>
            <div className="text-[11px] text-zinc-500 font-normal tracking-tight">
              Verified facts & signals
            </div>
          </div>

          {/* Metric 2 */}
          <div
            ref={liftCounter.ref}
            className="p-5 rounded-md bg-white border border-zinc-200/80 hover:border-zinc-300 transition-all shadow-xs"
          >
            <TrendUp className="w-5 h-5 text-zinc-900 mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl font-normal text-zinc-950 tracking-tight mb-1">
              {liftCounter.value}
            </div>
            <div className="text-xs text-zinc-900 font-normal tracking-tight mb-0.5">
              Reply Rate Lift
            </div>
            <div className="text-[11px] text-zinc-500 font-normal tracking-tight">
              Timing-based relevance
            </div>
          </div>

          {/* Metric 3 */}
          <div
            ref={wordCounter.ref}
            className="p-5 rounded-md bg-white border border-zinc-200/80 hover:border-zinc-300 transition-all shadow-xs"
          >
            <Clock className="w-5 h-5 text-zinc-900 mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl font-normal text-zinc-950 tracking-tight mb-1">
              {wordCounter.value} words
            </div>
            <div className="text-xs text-zinc-900 font-normal tracking-tight mb-0.5">
              Concise Outreach
            </div>
            <div className="text-[11px] text-zinc-500 font-normal tracking-tight">
              High mobile conversion
            </div>
          </div>

          {/* Metric 4 */}
          <div
            ref={zeroCounter.ref}
            className="p-5 rounded-md bg-white border border-zinc-200/80 hover:border-zinc-300 transition-all shadow-xs"
          >
            <ShieldCheck className="w-5 h-5 text-zinc-900 mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl font-normal text-zinc-950 tracking-tight mb-1">
              {zeroCounter.value}
            </div>
            <div className="text-xs text-zinc-900 font-normal tracking-tight mb-0.5">
              Hallucinations
            </div>
            <div className="text-[11px] text-zinc-500 font-normal tracking-tight">
              Vector grounded sources
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
