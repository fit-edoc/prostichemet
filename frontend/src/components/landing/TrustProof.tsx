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
    <section className="w-full py-16 border-y border-[var(--border-subtle)] bg-[var(--bg-surface)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Rating and Social Proof Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-6 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["P", "A", "M", "S"].map((initial, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[var(--bg-surface)] bg-[#20150F] text-[#FAF9F7] dark:bg-[#FAF9F7] dark:text-[#120D0A] flex items-center justify-center text-xs font-bold"
                >
                  {initial}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-600">
                {[...Array(5)].map((_, i) => (
                  <IconStarFilled key={i} className="w-3.5 h-3.5" />
                ))}
              </div>
              <p className="text-xs text-[var(--text-secondary)] font-medium mt-0.5">
                Rated 4.9/5 by 500+ B2B agency founders & growth teams
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
            <span>TechFlow</span>
            <span>ScaleUp.io</span>
            <span>DataPulse</span>
            <span>AgencyZero</span>
          </div>
        </div>

        {/* 4 Quantitative Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {/* Metric 1 */}
          <div
            ref={accuracyCounter.ref}
            className="p-5 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all shadow-[var(--shadow-xs)]"
          >
            <IconTarget className="w-5 h-5 mx-auto mb-2.5 text-[var(--accent-brown)]" />
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-1">
              {accuracyCounter.value}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-0.5">
              Research Accuracy
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Verified facts & signals
            </div>
          </div>

          {/* Metric 2 */}
          <div
            ref={liftCounter.ref}
            className="p-5 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all shadow-[var(--shadow-xs)]"
          >
            <IconChartBar className="w-5 h-5 mx-auto mb-2.5 text-[var(--accent-brown)]" />
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-1">
              {liftCounter.value}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-0.5">
              Reply Rate Lift
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Trigger-based relevance
            </div>
          </div>

          {/* Metric 3 */}
          <div
            ref={wordCounter.ref}
            className="p-5 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all shadow-[var(--shadow-xs)]"
          >
            <IconClockHour4 className="w-5 h-5 mx-auto mb-2.5 text-[var(--accent-brown)]" />
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-1">
              {wordCounter.value} words
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-0.5">
              Concise Copy
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              PAS framework structure
            </div>
          </div>

          {/* Metric 4 */}
          <div
            ref={zeroCounter.ref}
            className="p-5 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all shadow-[var(--shadow-xs)]"
          >
            <IconShieldLock className="w-5 h-5 mx-auto mb-2.5 text-[var(--accent-brown)]" />
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-1">
              {zeroCounter.value}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-0.5">
              Hallucinations
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Strict vector grounding
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
