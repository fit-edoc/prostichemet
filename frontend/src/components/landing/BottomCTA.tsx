"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  Check,
  Sparkle,
} from "@phosphor-icons/react";

export function BottomCTA() {
  const router = useRouter();

  return (
    <section className="relative w-full py-24 border-t border-neutral-800/80 bg-[radial-gradient(ellipse_100%_80%_at_50%_120%,rgba(65,65,70,0.45),rgba(20,20,23,0.95)_55%,rgba(9,9,11,1)_100%)] bg-zinc-950 text-white text-center overflow-hidden">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-t from-neutral-700/15 via-neutral-800/20 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 space-y-6">
        {/* Badge */}
        <div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full py-[3px] px-3 text-[11px] font-normal tracking-tight inline-flex items-center gap-1.5 backdrop-blur-sm">
            <Sparkle className="w-3.5 h-3.5" />
            Deploy Autonomous Outbound
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight leading-[1.15]">
          Ready to discover your next{" "}
          <span className="text-neutral-400">high-conviction customer?</span>
        </h2>

        <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed font-normal tracking-tight">
          Stop burning SDR hours on stale scraped databases. Deploy our multi-agent research nodes to discover verified buying triggers and push grounded outreach directly to your CRM.
        </p>

        {/* Buttons with crisp white text and matching bevel border/shadow */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => router.push("/login")}
            className="btn-bevel bg-gradient-to-b from-neutral-800 to-neutral-900 hover:from-neutral-700 hover:to-neutral-800 text-white border border-neutral-600/80 px-6 py-2.5 flex items-center justify-center gap-2 text-xs font-medium tracking-tight cursor-pointer group shadow-[inset_0px_1px_1px_rgba(255,255,255,0.25),0_6px_20px_-2px_rgba(0,0,0,0.6)] w-full sm:w-auto"
          >
            <span className="text-white font-medium">Start Free Research</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-white" />
          </button>

          <button
            onClick={() => router.push("/login")}
            className="btn-bevel bg-neutral-900/90 hover:bg-neutral-800 text-white border border-neutral-700/80 px-6 py-2.5 flex items-center justify-center gap-2 text-xs font-medium tracking-tight cursor-pointer shadow-[inset_0px_1px_1px_rgba(255,255,255,0.18),0_4px_16px_-2px_rgba(0,0,0,0.5)] w-full sm:w-auto backdrop-blur-sm"
          >
            <span className="text-white font-medium">Sign In</span>
          </button>
        </div>

        {/* Guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-5 pt-4 text-xs text-neutral-400 font-normal tracking-tight">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-300" />
            <span>10 Free AI Lead Runs</span>
          </div>
          <span className="text-neutral-700">·</span>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-neutral-300" />
            <span>Vector Grounded Facts</span>
          </div>
          <span className="text-neutral-700">·</span>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-neutral-300" />
            <span>No Credit Card Required</span>
          </div>
        </div>
      </div>
    </section>
  );
}
