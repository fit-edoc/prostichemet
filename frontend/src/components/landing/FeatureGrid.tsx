"use client";

import * as React from "react";
import {
  Lightning,
  EnvelopeSimple,
  ShieldCheck,
  Target,
} from "@phosphor-icons/react";

export function FeatureGrid() {
  return (
    <section id="features" className="w-full py-20 max-w-6xl mx-auto px-4">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        {/* Multi-color Badge: Blue Capabilities */}
        <div className="mb-3">
          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full py-[3px] px-3 text-[11px] font-normal tracking-tight inline-flex items-center gap-1.5 backdrop-blur-sm">
            <Lightning className="w-3.5 h-3.5" />
            Core Capabilities
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl text-white font-normal tracking-tight leading-tight">
          Engineered for high-conviction meetings.
        </h2>

        <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-normal tracking-tight leading-relaxed">
          Prospail replaces static scraping with real-time signal classification, vector grounding, and trigger-first synthesis.
        </p>
      </div>

      {/* Editorial Bento Grid (3 balanced modules with RAW icons) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Module 1: Autonomous Signal Radar */}
        <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800/90 p-7 flex flex-col justify-between shadow-[inset_0px_1px_1px_rgba(255,255,255,0.08),0_8px_30px_-6px_rgba(0,0,0,0.6)] hover:border-neutral-700/80 transition-all backdrop-blur-md">
          <div>
            {/* Raw Icon */}
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
              <Target className="w-5 h-5" />
            </div>

            <h3 className="text-base text-white font-medium tracking-tight mb-2">
              Autonomous Signal Radar
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-normal tracking-tight mb-5">
              Continuously crawls company career portals, funding announcements, and executive transitions to detect active buying windows before competitors.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/80 text-xs space-y-2">
            <div className="flex items-center justify-between text-neutral-400 text-[11px]">
              <span>Recent Signal</span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md py-[2px] px-2 text-[10px]">
                Active Intent
              </span>
            </div>
            <div className="text-white font-medium tracking-tight">
              Supabase posted 3x Solutions Architect roles
            </div>
          </div>
        </div>

        {/* Module 2: Grounded Copywriting */}
        <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800/90 p-7 flex flex-col justify-between shadow-[inset_0px_1px_1px_rgba(255,255,255,0.08),0_8px_30px_-6px_rgba(0,0,0,0.6)] hover:border-neutral-700/80 transition-all backdrop-blur-md">
          <div>
            {/* Raw Icon */}
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
              <EnvelopeSimple className="w-5 h-5" />
            </div>

            <h3 className="text-base text-white font-medium tracking-tight mb-2">
              Framework-Grounded Copywriting
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-normal tracking-tight mb-5">
              Applies proven Problem-Agitate-Solve structures kept strictly under 85 words, leading directly with the prospect's real company trigger.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/80 text-xs space-y-2">
            <div className="flex items-center justify-between text-neutral-400 text-[11px]">
              <span>Outreach Format</span>
              <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md py-[2px] px-2 text-[10px]">
                68 Words PAS
              </span>
            </div>
            <div className="text-white font-medium tracking-tight">
              Evidence-based draft with zero filler flattery
            </div>
          </div>
        </div>

        {/* Module 3: Anti-Hallucination Gate */}
        <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800/90 p-7 flex flex-col justify-between shadow-[inset_0px_1px_1px_rgba(255,255,255,0.08),0_8px_30px_-6px_rgba(0,0,0,0.6)] hover:border-neutral-700/80 transition-all backdrop-blur-md">
          <div>
            {/* Raw Icon */}
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>

            <h3 className="text-base text-white font-medium tracking-tight mb-2">
              Anti-Hallucination Gate
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-normal tracking-tight mb-5">
              Target accounts are vector-matched against your ICP rules. Claims lacking verifiable public source documentation are strictly rejected.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/80 text-xs space-y-2">
            <div className="flex items-center justify-between text-neutral-400 text-[11px]">
              <span>Vector Grounding</span>
              <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md py-[2px] px-2 text-[10px]">
                0% Hallucinations
              </span>
            </div>
            <div className="text-white font-medium tracking-tight">
              Strict multi-point verification threshold
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
