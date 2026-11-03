"use client";

import * as React from "react";
import {
  Scales,
  XCircle,
  CheckCircle,
  Database,
  Lightning,
  ShieldCheck,
} from "@phosphor-icons/react";

export function TestimonialWall() {
  const comparisons = [
    {
      title: "Prospect Intelligence",
      icon: Database,
      traditional: "Static scraped contact lists with outdated titles and 20%+ bounce rates.",
      prospail: "Real-time discovery across live hiring signals, funding filings, and verified SMTP checks.",
      badge: "Real-Time Signals",
    },
    {
      title: "Outreach Relevance",
      icon: Lightning,
      traditional: "Generic AI flattery ('Loved your recent post!') that buyers immediately flag as spam.",
      prospail: "Strictly under 85 words PAS format grounded directly in verifiable company triggers.",
      badge: "Evidence-Backed",
    },
    {
      title: "Deliverability & Safety",
      icon: ShieldCheck,
      traditional: "Uncontrolled blast sending that burns your domain reputation and lands in spam filters.",
      prospail: "Human-in-the-loop approval with warmup ramp limits and deliverability validation.",
      badge: "Human Controlled",
    },
  ];

  return (
    <section id="comparison" className="w-full py-20 max-w-6xl mx-auto px-4">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="mb-3">
          <span className="bg-neutral-900 text-neutral-300 border border-neutral-700/80 rounded-full py-[3px] px-3 text-[11px] font-normal tracking-tight inline-flex items-center gap-1.5 backdrop-blur-sm">
            <Scales className="w-3.5 h-3.5 text-neutral-200" />
            Why Research-First Outbound
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl text-white font-normal tracking-tight leading-tight">
          How Prospail compares to generic scrapers.
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-normal tracking-tight">
          We optimize for qualified meetings and research accuracy — not email blast volume.
        </p>
      </div>

      {/* Comparison Grid in shades of white */}
      <div className="grid md:grid-cols-3 gap-6">
        {comparisons.map((c, idx) => {
          const Icon = c.icon;
          return (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 hover:border-neutral-700/80 transition-all flex flex-col justify-between shadow-[inset_0px_1px_1px_rgba(255,255,255,0.08),0_8px_30px_-6px_rgba(0,0,0,0.6)] backdrop-blur-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-white">
                    <Icon className="w-4 h-4 text-neutral-100" />
                  </div>
                  <span className="bg-neutral-800/90 text-neutral-300 border border-neutral-700/80 rounded-md py-[2px] px-2 text-[10px] font-normal tracking-tight">
                    {c.badge}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-medium text-white tracking-tight mb-4">
                  {c.title}
                </h3>

                {/* Traditional Scrapers side - muted neutral */}
                <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800/80 mb-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-neutral-400 text-[11px] font-medium tracking-tight">
                    <XCircle className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                    <span>Traditional Mass Scrapers</span>
                  </div>
                  <p className="text-xs text-neutral-400 font-normal tracking-tight leading-relaxed">
                    {c.traditional}
                  </p>
                </div>

                {/* Prospail side - shades of white */}
                <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-700/80 shadow-[inset_0px_1px_1px_rgba(255,255,255,0.06)] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-white text-[11px] font-medium tracking-tight">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0 text-neutral-100" />
                    <span>Prospail Research Pipeline</span>
                  </div>
                  <p className="text-xs text-neutral-300 font-normal tracking-tight leading-relaxed">
                    {c.prospail}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-800/80 text-[11px] text-neutral-400">
                Verifiable source citations stored with every lead
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
