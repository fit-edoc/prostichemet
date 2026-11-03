"use client";

import * as React from "react";
import {
  ShieldCheck,
  Target,
  FileText,
  UserCheck,
  CheckCircle,
} from "@phosphor-icons/react";
import { useCounter } from "../../hooks/useCounter";

export function TrustProof() {
  const evidenceCounter = useCounter({ end: 100, suffix: "%" });
  const wordCounter = useCounter({ end: 85, prefix: "< " });
  const approvalCounter = useCounter({ end: 100, suffix: "%" });

  const standards = [
    {
      icon: ShieldCheck,
      iconColor: "text-white",
      value: evidenceCounter.value,
      ref: evidenceCounter.ref,
      title: "Evidence Grounded",
      desc: "Every claim links to a public URL, career post, or verified filing",
    },
    {
      icon: Target,
      iconColor: "text-neutral-200",
      value: "3-Tier",
      ref: undefined,
      title: "Multi-Source Scoring",
      desc: "Evaluates ICP profile match, timing trigger, and contact seniority",
    },
    {
      icon: FileText,
      iconColor: "text-neutral-200",
      value: `${wordCounter.value} words`,
      ref: wordCounter.ref,
      title: "Concise PAS Outreach",
      desc: "High-relevance outreach strictly under 85 words with zero flattery",
    },
    {
      icon: UserCheck,
      iconColor: "text-white",
      value: approvalCounter.value,
      ref: approvalCounter.ref,
      title: "Human-in-the-Loop",
      desc: "Mandatory human review and approval before any campaign dispatches",
    },
  ];

  return (
    <section id="proof" className="w-full py-20 border-y border-neutral-800/80 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4">
        {/* Verification Standards Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-neutral-800/80">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-neutral-900 text-neutral-300 border border-neutral-700/80 rounded-full py-[3px] px-3 text-[11px] font-normal tracking-tight inline-flex items-center gap-1.5 backdrop-blur-sm">
                <CheckCircle className="w-3.5 h-3.5 text-neutral-200" />
                Research Integrity Standards
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl text-white font-normal tracking-tight">
              Engineered for evidence accuracy, not mass automated spam.
            </h2>
            <p className="text-xs text-neutral-400 font-normal tracking-tight mt-1 max-w-xl">
              Traditional scrapers blast bought lists. Prospail strictly enforces verifiable evidence thresholds before any account is qualified.
            </p>
          </div>

          <span className="bg-neutral-900 text-neutral-300 border border-neutral-700/80 rounded-full py-[3px] px-3 text-[11px] font-normal tracking-tight shrink-0">
            Source-Audited Pipeline
          </span>
        </div>

        {/* 4 Quantitative Architecture Standard Cards in shades of white */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {standards.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                ref={s.ref}
                className="p-5 sm:p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 hover:border-neutral-700 shadow-[inset_0px_1px_1px_rgba(255,255,255,0.08),0_8px_24px_-4px_rgba(0,0,0,0.5)] transition-all flex flex-col items-center justify-between"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center mb-3">
                  <Icon className={`w-5 h-5 ${s.iconColor}`} />
                </div>
                <div className="text-2xl sm:text-3xl font-normal text-white tracking-tight mb-1">
                  {s.value}
                </div>
                <div className="text-xs text-white font-medium tracking-tight mb-0.5">
                  {s.title}
                </div>
                <div className="text-[11px] text-neutral-400 font-normal tracking-tight">
                  {s.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
