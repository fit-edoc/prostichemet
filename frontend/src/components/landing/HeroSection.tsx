"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  MagnifyingGlass,
  Check,
  ShieldCheck,
  Cpu,
  Database,
  LinkedinLogo,
  EnvelopeSimple,
  Buildings,
} from "@phosphor-icons/react";

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative w-full pt-24 pb-14 md:pt-32 md:pb-20 flex flex-col items-center text-center">
      {/* Background subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-gradient-to-b from-zinc-100/60 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto px-4">
        {/* Multi-color Badge: Blue Engine */}
        <div className="mb-6">
          <span className="bg-blue-700/10 text-blue-600 rounded-[2px] border-0 py-[2px] px-2 text-[11px] font-normal tracking-tight inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            Autonomous GTM Intelligence Engine
          </span>
        </div>

        {/* Main Headline in Instrument Sans weight 400 tracking tight */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl text-zinc-950 font-normal tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Discover verified buyers with{" "}
          <span className="text-zinc-400">live signal evidence.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto mt-5 mb-8 leading-relaxed font-normal tracking-tight">
          Automate multi-source account discovery, real-time trigger classification, and evidence-grounded buyer synthesis — completely hallucination free.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-12">
          <button
            onClick={() => router.push("/login")}
            className="btn-invert-xl px-5 py-2.5 flex items-center justify-center gap-2 text-xs font-normal tracking-tight cursor-pointer group shadow-xs w-full sm:w-auto"
          >
            <span>Start Free Research</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>

          <button
            onClick={() => {
              document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-dark-xl px-5 py-2.5 flex items-center justify-center gap-2 text-xs font-normal tracking-tight cursor-pointer shadow-xs w-full sm:w-auto"
          >
            <MagnifyingGlass className="w-3.5 h-3.5 text-zinc-600" />
            <span>Explore Demo</span>
          </button>
        </div>

        {/* Telemetry Preview Card: Clean Editorial Design */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="rounded-lg border border-zinc-200/90 bg-white shadow-sm overflow-hidden text-left">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3 bg-zinc-50/50">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs font-normal tracking-tight text-zinc-900">
                  Target Account Signal
                </span>
                <span className="text-zinc-300">/</span>
                <span className="text-xs font-normal tracking-tight text-zinc-500">
                  CloudFlow Technologies
                </span>
              </div>

              {/* Multi-color Badge: Green Match */}
              <span className="bg-green-700/10 text-green-600 rounded-[2px] border-0 py-[2px] px-2 text-[11px] font-normal tracking-tight">
                98.4% Match
              </span>
            </div>

            {/* Content 2-column editorial layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-zinc-100">
              {/* Left Column: Detected Buying Signal */}
              <div className="md:col-span-7 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Buildings className="w-3.5 h-3.5 text-zinc-700" />
                    <span>Series B SaaS · 120 Employees</span>
                  </div>
                  <span className="bg-amber-700/10 text-amber-600 rounded-[2px] border-0 py-[2px] px-2 text-[10px] font-normal tracking-tight">
                    Active Timing Intent
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm font-normal tracking-tight text-zinc-950">
                    Hiring 4x Senior SDRs & RevOps Director
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed font-normal tracking-tight">
                    "Expanding outbound revenue team after closing $18M Series B. Seeking outbound automation & verified prospect enrichment infrastructure."
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-3 text-xs text-zinc-500">
                  <span className="inline-flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    Verified careers page source
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    SEC filing confirmed
                  </span>
                </div>
              </div>

              {/* Right Column: Real Avatar Decision Maker */}
              <div className="md:col-span-5 p-5 bg-zinc-50/30 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] text-zinc-400 font-normal tracking-tight uppercase mb-3">
                    Resolved Decision Maker
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Real Avatar */}
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
                      alt="Sarah Jenkins"
                      className="w-10 h-10 rounded-full object-cover border border-zinc-200/80 shadow-xs"
                    />
                    <div>
                      <div className="text-xs font-normal tracking-tight text-zinc-950">
                        Sarah Jenkins
                      </div>
                      <div className="text-[11px] text-zinc-500 font-normal tracking-tight">
                        Head of Revenue Operations
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-zinc-100">
                  <div className="flex items-center justify-between text-xs font-normal tracking-tight text-zinc-700">
                    <span className="flex items-center gap-1.5 text-zinc-500">
                      <EnvelopeSimple className="w-3.5 h-3.5 text-zinc-700" />
                      s.jenkins@cloudflow.io
                    </span>
                    <span className="bg-purple-700/10 text-purple-600 rounded-[2px] border-0 py-[2px] px-1.5 text-[10px]">
                      SMTP Verified
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-normal tracking-tight text-zinc-700">
                    <span className="flex items-center gap-1.5 text-zinc-500">
                      <LinkedinLogo className="w-3.5 h-3.5 text-zinc-700" />
                      linkedin.com/in/sjenkins-revops
                    </span>
                    <span className="bg-blue-700/10 text-blue-600 rounded-[2px] border-0 py-[2px] px-1.5 text-[10px]">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantees with RAW Phosphor Icons */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 mt-8 font-normal tracking-tight">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-900" />
            <span>Zero Hallucinations</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-zinc-900" />
            <span>RAG Vector Grounded</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-zinc-900" />
            <span>Evidence-Backed Scoring</span>
          </div>
        </div>
      </div>
    </section>
  );
}
