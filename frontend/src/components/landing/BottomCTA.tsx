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
    <section className="w-full py-20 border-t border-zinc-200/80 bg-gradient-to-b from-zinc-50/50 to-white text-center">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {/* Badge */}
        <div>
          <span className="bg-green-700/10 text-green-600 rounded-[2px] border-0 py-[2px] px-2 text-[11px] font-normal tracking-tight inline-flex items-center gap-1.5">
            <Sparkle className="w-3.5 h-3.5" />
            Deploy Autonomous Outbound
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-zinc-950 tracking-tight leading-[1.15]">
          Ready to discover your next{" "}
          <span className="text-zinc-400">high-conviction customer?</span>
        </h2>

        <p className="text-xs sm:text-sm text-zinc-500 max-w-lg mx-auto leading-relaxed font-normal tracking-tight">
          Stop burning SDR hours on stale scraped databases. Deploy our multi-agent research nodes to discover verified buying triggers and push grounded outreach directly to your CRM.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => router.push("/login")}
            className="btn-invert-xl px-6 py-2.5 flex items-center justify-center gap-2 text-xs font-normal tracking-tight cursor-pointer group w-full sm:w-auto shadow-xs"
          >
            <span>Start Free Research</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>

          <button
            onClick={() => router.push("/login")}
            className="btn-dark-xl px-6 py-2.5 flex items-center justify-center gap-2 text-xs font-normal tracking-tight cursor-pointer w-full sm:w-auto shadow-xs"
          >
            <span>Sign In</span>
          </button>
        </div>

        {/* Guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-5 pt-4 text-xs text-zinc-500 font-normal tracking-tight">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-900" />
            <span>10 Free AI Lead Runs</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-zinc-900" />
            <span>Vector Grounded Facts</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-zinc-900" />
            <span>No Credit Card Required</span>
          </div>
        </div>
      </div>
    </section>
  );
}
