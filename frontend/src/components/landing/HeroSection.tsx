"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  IconArrowRight,
  IconSearch,
  IconShieldCheck,
  IconCpu,
  IconDatabase,
  IconRadar2,
  IconLayersLinked,
  IconCheck,
} from "@tabler/icons-react";

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative w-full pt-28 pb-16 md:pt-36 md:pb-24 flex flex-col items-center text-center overflow-hidden">
      {/* Background subtle radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.03] blur-[120px] pointer-events-none rounded-full" />

      {/* Pill Badge */}
      <div className="mb-6 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[#262626] shadow-[2px_2px_0px_rgba(255,255,255,0.15)]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-300">
          Autonomous GTM Intelligence Engine v3.2
        </span>
      </div>

      {/* Main Headline in Young Serif */}
      <h1 className="font-serif font-normal text-4xl sm:text-6xl md:text-7xl max-w-4xl mx-auto text-white tracking-tight leading-[1.08] mb-6">
        Discover verified buyers with{" "}
        <span className="font-editorial italic font-normal text-zinc-400">
          live signal evidence.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
        Postrichment automates multi-source account discovery, real-time signal classification, and RAG-grounded buyer synthesis — completely hallucination free.
      </p>

      {/* Action Buttons: rounded-xl, 2px box shadow */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
        <button
          onClick={() => router.push("/login")}
          className="btn-invert-xl px-7 py-3.5 flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer group"
        >
          <span>Start Free Research</span>
          <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        <button
          onClick={() => {
            document.getElementById("pipeline-preview")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="btn-dark-xl px-7 py-3.5 flex items-center justify-center gap-2 text-sm font-medium cursor-pointer"
        >
          <IconSearch className="w-4 h-4 text-zinc-400" />
          <span>Inspect Infrastructure</span>
        </button>
      </div>

      {/* Telemetry Preview Card with SVG Fill Animation */}
      <div className="w-full max-w-3xl mx-auto px-4">
        <div className="rounded-xl border border-[#262626] bg-[#0c0c0c] p-5 shadow-[2px_2px_0px_rgba(255,255,255,0.2)] text-left">
          {/* Card Topbar */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1E1E1E]">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              </div>
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest pl-2">
                active-cluster // agt-09
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              {/* Dynamic SVG Fill Icon */}
              <svg className="w-4 h-4" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="14" fill="#ffffff" className="svg-animated-pulse" />
                <circle cx="16" cy="16" r="5" fill="#ffffff" />
              </svg>
              <span>STREAMING SIGNALS</span>
            </div>
          </div>

          {/* Card Inner Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-3.5 rounded-lg bg-[#141414] border border-[#222222]">
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span className="font-mono">ICP FIT SCORE</span>
                <IconCheck className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="text-2xl font-serif text-white">98.4%</div>
              <div className="text-[11px] text-zinc-500 mt-1">Series B SaaS · Headcount +45%</div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#141414] border border-[#222222]">
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span className="font-mono">DETECTED SIGNAL</span>
                <IconRadar2 className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="text-sm font-semibold text-white truncate">Hiring VP Revenue</div>
              <div className="text-[11px] text-zinc-500 mt-1">Found 4 hours ago via LinkedIn</div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#141414] border border-[#222222]">
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span className="font-mono">DECISION MAKER</span>
                <IconLayersLinked className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="text-sm font-semibold text-white truncate">VP of Sales Ops</div>
              <div className="text-[11px] text-zinc-500 mt-1">Verified work email & direct CRM link</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Architectural Guarantees */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-zinc-400 pt-10 mt-8 border-t border-[#1C1C1C] max-w-xl mx-auto">
        <div className="flex items-center gap-2">
          <IconShieldCheck className="w-4 h-4 text-white" />
          <span>Zero Hallucinations</span>
        </div>
        <div className="flex items-center gap-2">
          <IconCpu className="w-4 h-4 text-white" />
          <span>RAG Vector Grounded</span>
        </div>
        <div className="flex items-center gap-2">
          <IconDatabase className="w-4 h-4 text-white" />
          <span>Evidence-Backed Scoring</span>
        </div>
      </div>
    </section>
  );
}
