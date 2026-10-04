"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  IconArrowRight,
  IconShieldCheck,
  IconCpu,
  IconRadar2,
  IconCheck,
} from "@tabler/icons-react";

export function BottomCTA() {
  const router = useRouter();

  return (
    <section className="w-full py-28 border-t border-zinc-200 bg-gradient-to-b from-zinc-50 via-white to-white relative overflow-hidden text-center">
      {/* Halftone and ambient texture */}
      <div className="absolute inset-0 halftone-footer opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-zinc-200/40 to-transparent blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-6 space-y-7 relative z-10">
        {/* Telemetry pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-zinc-100 border border-zinc-200 text-xs font-mono text-zinc-700 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.06)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-900 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-900"></span>
          </span>
          <span className="uppercase tracking-wider">DEPLOY AUTONOMOUS ICP CLUSTER</span>
        </div>

        {/* Headline in Inter */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-inter font-bold text-zinc-950 tracking-tight leading-[1.15] max-w-3xl mx-auto">
          Ready to discover your next{" "}
          <span className="italic text-zinc-500 font-normal">
            high-conviction customer?
          </span>
        </h2>

        <p className="font-inter text-sm sm:text-base text-zinc-600 max-w-xl mx-auto leading-relaxed">
          Stop burning SDR hours on stale scraped databases. Deploy our multi-agent research nodes to discover verified buying signals and push grounded outreach directly to your CRM.
        </p>

        {/* Action Buttons: rounded-md, tactile box shadow */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
          <button
            onClick={() => router.push("/login")}
            className="btn-invert-xl px-8 py-4 flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer group w-full sm:w-auto shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]"
          >
            <span>Start Free Research</span>
            <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => router.push("/login")}
            className="btn-dark-xl px-8 py-4 flex items-center justify-center gap-2 text-sm font-medium cursor-pointer w-full sm:w-auto shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]"
          >
            <IconRadar2 className="w-4 h-4 text-zinc-700" />
            <span>Sign In with Email</span>
          </button>
        </div>

        {/* Feature Guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-zinc-600 font-mono">
          <div className="flex items-center gap-1.5">
            <IconShieldCheck className="w-4 h-4 text-zinc-900" />
            <span>10 Free AI Lead Runs Included</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <IconCpu className="w-4 h-4 text-zinc-900" />
            <span>Vector Grounded (Zero Fake Data)</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <IconCheck className="w-4 h-4 text-zinc-900" />
            <span>No Credit Card Required</span>
          </div>
        </div>
      </div>
    </section>
  );
}
