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
          <span className="bg-blue-700/10 text-blue-600 rounded-[2px] border-0 py-[2px] px-2 text-[11px] font-normal tracking-tight inline-flex items-center gap-1.5">
            <Lightning className="w-3.5 h-3.5" />
            Core Capabilities
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl text-zinc-950 font-normal tracking-tight leading-tight">
          Engineered for high-conviction meetings.
        </h2>

        <p className="text-xs sm:text-sm text-zinc-500 mt-2 font-normal tracking-tight leading-relaxed">
          Postrichment replaces static scraping with real-time signal classification, vector grounding, and trigger-first synthesis.
        </p>
      </div>

      {/* Editorial Bento Grid (3 balanced modules with RAW icons) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Module 1: Autonomous Signal Radar */}
        <div className="rounded-lg bg-white border border-zinc-200/80 p-6 flex flex-col justify-between shadow-xs hover:border-zinc-300 transition-all">
          <div>
            {/* Raw Icon */}
            <Target className="w-6 h-6 text-zinc-950 mb-4" />

            <h3 className="text-base text-zinc-950 font-normal tracking-tight mb-2">
              Autonomous Signal Radar
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal tracking-tight mb-5">
              Continuously crawls company career portals, funding announcements, and executive transitions to detect active buying windows before competitors.
            </p>
          </div>

          <div className="p-3.5 rounded-md bg-zinc-50 border border-zinc-100 text-xs space-y-2">
            <div className="flex items-center justify-between text-zinc-500 text-[11px]">
              <span>Recent Signal</span>
              <span className="bg-green-700/10 text-green-600 rounded-[2px] border-0 py-[2px] px-1.5 text-[10px]">
                Active Intent
              </span>
            </div>
            <div className="text-zinc-900 font-normal tracking-tight">
              Supabase posted 3x Solutions Architect roles
            </div>
          </div>
        </div>

        {/* Module 2: Grounded Copywriting */}
        <div className="rounded-lg bg-white border border-zinc-200/80 p-6 flex flex-col justify-between shadow-xs hover:border-zinc-300 transition-all">
          <div>
            {/* Raw Icon */}
            <EnvelopeSimple className="w-6 h-6 text-zinc-950 mb-4" />

            <h3 className="text-base text-zinc-950 font-normal tracking-tight mb-2">
              Framework-Grounded Copywriting
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal tracking-tight mb-5">
              Applies proven Problem-Agitate-Solve structures kept strictly under 85 words, leading directly with the prospect's real company trigger.
            </p>
          </div>

          <div className="p-3.5 rounded-md bg-zinc-50 border border-zinc-100 text-xs space-y-2">
            <div className="flex items-center justify-between text-zinc-500 text-[11px]">
              <span>Outreach Format</span>
              <span className="bg-blue-700/10 text-blue-600 rounded-[2px] border-0 py-[2px] px-1.5 text-[10px]">
                68 Words PAS
              </span>
            </div>
            <div className="text-zinc-900 font-normal tracking-tight">
              Evidence-based draft with zero filler flattery
            </div>
          </div>
        </div>

        {/* Module 3: Anti-Hallucination Gate */}
        <div className="rounded-lg bg-white border border-zinc-200/80 p-6 flex flex-col justify-between shadow-xs hover:border-zinc-300 transition-all">
          <div>
            {/* Raw Icon */}
            <ShieldCheck className="w-6 h-6 text-zinc-950 mb-4" />

            <h3 className="text-base text-zinc-950 font-normal tracking-tight mb-2">
              Anti-Hallucination Gate
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal tracking-tight mb-5">
              Target accounts are vector-matched against your ICP rules. Claims lacking verifiable public source documentation are strictly rejected.
            </p>
          </div>

          <div className="p-3.5 rounded-md bg-zinc-50 border border-zinc-100 text-xs space-y-2">
            <div className="flex items-center justify-between text-zinc-500 text-[11px]">
              <span>Vector Grounding</span>
              <span className="bg-purple-700/10 text-purple-600 rounded-[2px] border-0 py-[2px] px-1.5 text-[10px]">
                0% Hallucinations
              </span>
            </div>
            <div className="text-zinc-900 font-normal tracking-tight">
              Strict multi-point verification threshold
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
