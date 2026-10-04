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
    <section className="relative bg-gradient-to-b from-zinc-50/70 via-white to-white w-full pt-28 pb-16 md:pt-36 md:pb-24 flex flex-col items-center text-center overflow-hidden">
      {/* Interactive Dither Effect with Cursor Hover Bubble Away Physics */}
     

      {/* Background subtle radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-zinc-200/40 to-transparent blur-[100px] pointer-events-none rounded-full" />

      {/* Hero Foreground Content */}
      <div className="relative z-10 flex flex-col items-center w-full">

      {/* Pill Badge */}
      

      {/* Main Headline in Inter */}
      <h1 className="font-inter  text-3xl sm:text-5xl md:text-6xl max-w-3xl  mx-auto text-zinc-950 tracking-tight leading-[1.15] mt-12">
        Discover verified buyers with{" "}
        <span className="text-zinc-500 font-normal">
          live signal evidence.
        </span>
      </h1>

      {/* Subtitle / Paragraph in Inter */}
      <p className="font-inter text-sm sm:text-base md:text-lg text-zinc-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
        Postrichment automates multi-source account discovery, real-time signal classification, and RAG-grounded buyer synthesis — completely hallucination free.
      </p>

      {/* Action Buttons: rounded-xl, tactile shadows */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
        <button
          onClick={() => router.push("/login")}
          className="btn-invert-xl px-7 py-3.5 flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer group"
        >
          <span>Start Free Research</span>
          <IconArrowRight  className="w-4 h-4  bg-white text-black rounded-full transition-transform group-hover:translate-x-1" size={30} />
        </button>

        <button
          onClick={() => {
            document.getElementById("pipeline-preview")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="btn-dark-xl px-7 py-3.5 flex items-center justify-center gap-2 text-sm font-medium cursor-pointer"
        >
          <IconSearch className="w-4 h-4 text-zinc-600" />
          <span>Inspect Infrastructure</span>
        </button>
      </div>

      {/* Telemetry Preview Card with SVG Fill Animation */}
      <div className="w-full max-w-3xl mx-auto px-4">
        <div className="rounded-md border border-zinc-200 bg-white p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] text-left">
          {/* Card Topbar */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
              </div>
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest pl-2">
                active-cluster // agt-09
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-600">
              {/* Dynamic SVG Fill Icon */}
              <svg className="w-4 h-4" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="14" fill="#09090B" className="svg-animated-pulse" />
                <circle cx="16" cy="16" r="5" fill="#09090B" />
              </svg>
              <span>STREAMING SIGNALS</span>
            </div>
          </div>

          {/* Card Inner Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-3.5 rounded-md bg-zinc-50/70 border border-zinc-200 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                <span className="font-mono">ICP FIT SCORE</span>
                <IconCheck className="w-3.5 h-3.5 text-zinc-900" />
              </div>
              <div className="text-2xl font-inter font-bold text-zinc-950">98.4%</div>
              <div className="text-[11px] text-zinc-500 mt-1">Series B SaaS · Headcount +45%</div>
            </div>

            <div className="p-3.5 rounded-md bg-zinc-50/70 border border-zinc-200 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                <span className="font-mono">DETECTED SIGNAL</span>
                <IconRadar2 className="w-3.5 h-3.5 text-zinc-900" />
              </div>
              <div className="text-sm font-semibold text-zinc-900 truncate">Hiring VP Revenue</div>
              <div className="text-[11px] text-zinc-500 mt-1">Found 4 hours ago via LinkedIn</div>
            </div>

            <div className="p-3.5 rounded-md bg-zinc-50/70 border border-zinc-200 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                <span className="font-mono">DECISION MAKER</span>
                <IconLayersLinked className="w-3.5 h-3.5 text-zinc-900" />
              </div>
              <div className="text-sm font-semibold text-zinc-900 truncate">VP of Sales Ops</div>
              <div className="text-[11px] text-zinc-500 mt-1">Verified work email & direct CRM link</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Architectural Guarantees */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-zinc-600 pt-10 mt-8 border-t border-zinc-200 max-w-xl mx-auto">
        <div className="flex items-center gap-2">
          <IconShieldCheck className="w-4 h-4 text-zinc-900" />
          <span>Zero Hallucinations</span>
        </div>
        <div className="flex items-center gap-2">
          <IconCpu className="w-4 h-4 text-zinc-900" />
          <span>RAG Vector Grounded</span>
        </div>
        <div className="flex items-center gap-2">
          <IconDatabase className="w-4 h-4 text-zinc-900" />
          <span>Evidence-Backed Scoring</span>
        </div>
      </div>
      </div>
    </section>
  );
}
