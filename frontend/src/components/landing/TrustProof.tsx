"use client";

import * as React from "react";
import { useCounter } from "../../hooks/useCounter";
import {
  IconStarFilled,
  IconChartBar,
  IconClockHour4,
  IconTarget,
  IconShieldLock,
  IconCpu,
} from "@tabler/icons-react";

export function TrustProof() {
  const accuracyCounter = useCounter({ end: 94, suffix: "%" });
  const liftCounter = useCounter({ end: 3.2, decimals: 1, suffix: "x" });
  const wordCounter = useCounter({ end: 85, prefix: "< " });
  const zeroCounter = useCounter({ end: 0, suffix: "%" });

  return (
    <section className="w-full py-20 border-y border-[#1F1F1F] bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Rating and Social Proof Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-8 border-b border-[#1A1A1A]">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["P", "A", "M", "S"].map((initial, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#080808] bg-white text-black flex items-center justify-center text-xs font-bold shadow-[1px_1px_0px_rgba(255,255,255,0.2)]"
                >
                  {initial}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-white">
                {[...Array(5)].map((_, i) => (
                  <IconStarFilled key={i} className="w-3.5 h-3.5" />
                ))}
              </div>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Rated 4.9/5 by 500+ B2B agency founders & revenue teams
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <span className="hover:text-white transition-colors cursor-default">TechFlow</span>
            <span className="hover:text-white transition-colors cursor-default">ScaleUp.io</span>
            <span className="hover:text-white transition-colors cursor-default">DataPulse</span>
            <span className="hover:text-white transition-colors cursor-default">AgencyZero</span>
          </div>
        </div>

        {/* 4 Quantitative Metric Cards in Young Serif with 2px tactile box shadow */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {/* Metric 1 */}
          <div
            ref={accuracyCounter.ref}
            className="p-6 rounded-xl bg-[#0D0D0D] border border-[#222222] hover:border-zinc-500 transition-all shadow-[2px_2px_0px_rgba(255,255,255,0.15)] group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center mx-auto mb-3 text-white group-hover:scale-105 transition-transform">
              <IconTarget className="w-4 h-4" />
            </div>
            <div className="text-3xl sm:text-4xl font-serif text-white mb-1">
              {accuracyCounter.value}
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
              Research Accuracy
            </div>
            <div className="text-[11px] text-zinc-500 font-mono">
              Verified facts & signals
            </div>
          </div>

          {/* Metric 2 */}
          <div
            ref={liftCounter.ref}
            className="p-6 rounded-xl bg-[#0D0D0D] border border-[#222222] hover:border-zinc-500 transition-all shadow-[2px_2px_0px_rgba(255,255,255,0.15)] group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center mx-auto mb-3 text-white group-hover:scale-105 transition-transform">
              <IconChartBar className="w-4 h-4" />
            </div>
            <div className="text-3xl sm:text-4xl font-serif text-white mb-1">
              {liftCounter.value}
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
              Reply Rate Lift
            </div>
            <div className="text-[11px] text-zinc-500 font-mono">
              Trigger-based relevance
            </div>
          </div>

          {/* Metric 3 */}
          <div
            ref={wordCounter.ref}
            className="p-6 rounded-xl bg-[#0D0D0D] border border-[#222222] hover:border-zinc-500 transition-all shadow-[2px_2px_0px_rgba(255,255,255,0.15)] group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center mx-auto mb-3 text-white group-hover:scale-105 transition-transform">
              <IconClockHour4 className="w-4 h-4" />
            </div>
            <div className="text-3xl sm:text-4xl font-serif text-white mb-1">
              {wordCounter.value} words
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
              Concise Outreach
            </div>
            <div className="text-[11px] text-zinc-500 font-mono">
              High mobile open rate
            </div>
          </div>

          {/* Metric 4 */}
          <div
            ref={zeroCounter.ref}
            className="p-6 rounded-xl bg-[#0D0D0D] border border-[#222222] hover:border-zinc-500 transition-all shadow-[2px_2px_0px_rgba(255,255,255,0.15)] group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center mx-auto mb-3 text-white group-hover:scale-105 transition-transform">
              <IconShieldLock className="w-4 h-4" />
            </div>
            <div className="text-3xl sm:text-4xl font-serif text-white mb-1">
              {zeroCounter.value}
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
              Hallucinations
            </div>
            <div className="text-[11px] text-zinc-500 font-mono">
              Vector grounded facts
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
