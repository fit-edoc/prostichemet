"use client";

import * as React from "react";
import { useCounter } from "../../hooks/useCounter";
import {
  IconStarFilled,
  IconChartBar,
  IconClockHour4,
  IconTarget,
  IconShieldLock,
} from "@tabler/icons-react";

export function TrustProof() {
  const accuracyCounter = useCounter({ end: 94, suffix: "%" });
  const liftCounter = useCounter({ end: 3.2, decimals: 1, suffix: "x" });
  const wordCounter = useCounter({ end: 85, prefix: "< " });
  const zeroCounter = useCounter({ end: 0, suffix: "%" });

  return (
    <section className="w-full py-16 border-y border-[var(--border-subtle)] bg-[var(--bg-surface)] reveal-init">
      <div className="max-w-7xl mx-auto px-6">
        {/* Rating and Social Proof Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-8 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-[var(--bg-surface)] bg-[var(--bg-elevated)] flex items-center justify-center text-xs font-bold text-[var(--text-primary)]"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <IconStarFilled key={i} className="w-3.5 h-3.5" />
                ))}
              </div>
              <p className="text-xs text-[var(--text-secondary)] font-medium mt-0.5">
                Rated 4.9/5 by 500+ B2B agency founders & growth teams
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
            <span>TechFlow</span>
            <span>ScaleUp.io</span>
            <span>DataPulse</span>
            <span>AgencyZero</span>
          </div>
        </div>

        {/* 4 Quantitative Metric Cards with Animated Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {/* Metric 1 */}
          <div
            ref={accuracyCounter.ref}
            className="p-6 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all group"
          >
            <IconTarget className="w-5 h-5 mx-auto mb-3 text-[var(--accent-vintage)] group-hover:scale-110 transition-transform" />
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] font-mono mb-1">
              {accuracyCounter.value}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-1">
              Research Accuracy
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Verified facts & source links
            </div>
          </div>

          {/* Metric 2 */}
          <div
            ref={liftCounter.ref}
            className="p-6 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all group"
          >
            <IconChartBar className="w-5 h-5 mx-auto mb-3 text-[var(--accent-vintage)] group-hover:scale-110 transition-transform" />
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] font-mono mb-1">
              {liftCounter.value}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-1">
              Reply Rate Lift
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Driven by signal personalization
            </div>
          </div>

          {/* Metric 3 */}
          <div
            ref={wordCounter.ref}
            className="p-6 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all group"
          >
            <IconClockHour4 className="w-5 h-5 mx-auto mb-3 text-[var(--accent-vintage)] group-hover:scale-110 transition-transform" />
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] font-mono mb-1">
              {wordCounter.value} words
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-1">
              Concise Copy
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              PAS & insight copywriting
            </div>
          </div>

          {/* Metric 4 */}
          <div
            ref={zeroCounter.ref}
            className="p-6 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all group"
          >
            <IconShieldLock className="w-5 h-5 mx-auto mb-3 text-[var(--accent-vintage)] group-hover:scale-110 transition-transform" />
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] font-mono mb-1">
              {zeroCounter.value}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-1">
              Hallucinated Data
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Strict RAG knowledge grounding
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
