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
    <section className="relative w-full pt-24 pb-14 md:pt-32 md:pb-20 flex flex-col items-center text-center overflow-hidden bg-[radial-gradient(ellipse_100%_80%_at_50%_-20%,rgba(65,65,70,0.55),rgba(20,20,23,0.95)_55%,rgba(9,9,11,1)_100%)] bg-zinc-950 text-white border-b border-neutral-800/80">
      {/* Background subtle radial ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-b from-neutral-600/15 via-neutral-800/30 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Floating Shapes Layer (Medium-sized, scattered across hero background) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Shape 1: Top-Left Floating Glass Pill (w-36 h-11) */}
        <div
          className="absolute top-12 left-4 md:left-10 lg:left-20 animate-float-slow hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]"
          style={{ animationDelay: "0s" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          <span className="text-[11px] font-normal tracking-tight text-neutral-200">Intent Signal · 98%</span>
        </div>

        {/* Shape 2: Top-Right Tilted Glass Diamond (w-14 h-14 / 56px) */}
        <div
          className="absolute top-14 right-4 md:right-12 lg:right-24 animate-float-medium hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl rotate-12 bg-gradient-to-br from-neutral-800/90 to-neutral-900/90 backdrop-blur-md border border-neutral-700/70 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.6)]"
          style={{ animationDelay: "-2.2s" }}
        >
          <div className="w-6 h-6 rounded-lg rotate-45 border border-blue-400/40 bg-blue-950/60 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          </div>
        </div>

        {/* Shape 3: Mid-Left Concentric Orbital Torus Ring (w-20 h-20 / 80px) */}
        <div
          className="absolute top-[34%] -left-3 md:left-6 lg:left-16 animate-float-drift hidden md:flex items-center justify-center w-20 h-20 rounded-full border border-neutral-700/60 bg-neutral-900/50 backdrop-blur-sm shadow-[0_6px_20px_-4px_rgba(0,0,0,0.5)]"
          style={{ animationDelay: "-3.8s" }}
        >
          <div className="w-12 h-12 rounded-full border border-dashed border-neutral-600/60 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-neutral-700 to-neutral-800 shadow-inner" />
          </div>
        </div>

        {/* Shape 4: Mid-Right Floating Lead Pill Card (w-44 h-12) */}
        <div
          className="absolute top-[36%] -right-4 md:right-6 lg:right-16 animate-float-pulse hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-neutral-900/85 backdrop-blur-md border border-neutral-700/70 shadow-[0_8px_28px_-6px_rgba(0,0,0,0.6)]"
          style={{ animationDelay: "-1.5s" }}
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="text-left">
            <div className="text-[11px] font-normal tracking-tight text-white">+48 Live Accounts</div>
            <div className="text-[9px] text-neutral-400 font-normal tracking-tight">SEC Form D Detected</div>
          </div>
        </div>

        {/* Shape 5: Lower-Left Frosted Rounded Glass Shield (w-16 h-16 / 64px) */}
        <div
          className="absolute bottom-28 left-4 md:left-14 lg:left-28 animate-float-medium hidden lg:flex items-center justify-center w-16 h-16 rounded-2xl -rotate-6 bg-neutral-900/80 backdrop-blur-md border border-neutral-700/60 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.5)]"
          style={{ animationDelay: "-4.6s" }}
        >
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <div className="w-2 h-2 rounded-sm bg-purple-400 rotate-45" />
          </div>
        </div>

        {/* Shape 6: Lower-Right Floating Glass Orb Sphere (w-18 h-18 / 72px) */}
        <div
          className="absolute bottom-32 right-4 md:right-14 lg:right-28 animate-float-slow hidden md:flex items-center justify-center w-18 h-18 rounded-full bg-gradient-to-b from-neutral-800/90 to-neutral-950/90 backdrop-blur-md border border-neutral-700/70 shadow-[inset_0px_2px_4px_rgba(255,255,255,0.15),0_10px_30px_-8px_rgba(0,0,0,0.7)]"
          style={{ animationDelay: "-5.2s" }}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500/20 to-amber-700/40 border border-amber-500/30 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
          </div>
        </div>

        {/* Shape 7: Upper-Center-Right Subtle Floating Geometric Cross (w-10 h-10) */}
        <div
          className="absolute top-8 right-1/4 animate-float-drift hidden xl:flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-900/60 backdrop-blur-xs border border-neutral-800 shadow-xs"
          style={{ animationDelay: "-1.2s" }}
        >
          <div className="w-3.5 h-[1.5px] bg-neutral-500 absolute" />
          <div className="h-3.5 w-[1.5px] bg-neutral-500 absolute" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto px-4">
        {/* Multi-color Badge: Blue Engine */}
        <div className="mb-6">
          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full py-[3px] px-3 text-[11px] font-normal tracking-tight inline-flex items-center gap-1.5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Autonomous GTM Intelligence Engine
          </span>
        </div>

        {/* Main Headline in Instrument Sans weight 400 tracking tight */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Discover verified buyers with{" "}
          <span className="text-neutral-400">live signal evidence.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto mt-5 mb-8 leading-relaxed font-normal tracking-tight">
          Automate multi-source account discovery, real-time trigger classification, and evidence-grounded buyer synthesis — completely hallucination free.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-12">
          <button
            onClick={() => router.push("/login")}
            className="btn-bevel bg-white !text-zinc-950 hover:bg-neutral-100 px-5 py-2.5 flex items-center justify-center gap-2 text-xs font-semibold tracking-tight cursor-pointer group shadow-lg w-full sm:w-auto"
          >
            <span className="!text-zinc-950 font-semibold">Start Free Research</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 !text-zinc-950" />
          </button>

          <button
            onClick={() => {
              document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-bevel bg-neutral-900/80 hover:bg-neutral-800 text-white border border-neutral-700/80 px-5 py-2.5 flex items-center justify-center gap-2 text-xs font-normal tracking-tight cursor-pointer shadow-md w-full sm:w-auto backdrop-blur-sm"
          >
            <MagnifyingGlass className="w-3.5 h-3.5 text-neutral-300" />
            <span>Explore Demo</span>
          </button>
        </div>

        {/* Telemetry Preview Card: Clean Editorial Design */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/90 shadow-2xl backdrop-blur-md overflow-hidden text-left">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-neutral-800 px-5 py-3 bg-neutral-950/70">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-normal tracking-tight text-white">
                  Target Account Signal
                </span>
                <span className="text-neutral-600">/</span>
                <span className="text-xs font-normal tracking-tight text-neutral-400">
                  CloudFlow Technologies
                </span>
              </div>

              {/* Multi-color Badge: Green Match */}
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-[2px] py-[2px] px-2 text-[11px] font-normal tracking-tight">
                98.4% Match
              </span>
            </div>

            {/* Content 2-column editorial layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
              {/* Left Column: Detected Buying Signal */}
              <div className="md:col-span-7 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <Buildings className="w-3.5 h-3.5 text-neutral-300" />
                    <span>Series B SaaS · 120 Employees</span>
                  </div>
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-[2px] py-[2px] px-2 text-[10px] font-normal tracking-tight">
                    Active Timing Intent
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm font-normal tracking-tight text-white">
                    Hiring 4x Senior SDRs & RevOps Director
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed font-normal tracking-tight">
                    "Expanding outbound revenue team after closing $18M Series B. Seeking outbound automation & verified prospect enrichment infrastructure."
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-3 text-xs text-neutral-400">
                  <span className="inline-flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Verified careers page source
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    SEC filing confirmed
                  </span>
                </div>
              </div>

              {/* Right Column: Real Avatar Decision Maker */}
              <div className="md:col-span-5 p-5 bg-neutral-950/40 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] text-neutral-400 font-normal tracking-tight uppercase mb-3">
                    Resolved Decision Maker
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Real Avatar */}
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
                      alt="Sarah Jenkins"
                      className="w-10 h-10 rounded-full object-cover border border-neutral-700 shadow-xs"
                    />
                    <div>
                      <div className="text-xs font-normal tracking-tight text-white">
                        Sarah Jenkins
                      </div>
                      <div className="text-[11px] text-neutral-400 font-normal tracking-tight">
                        Head of Revenue Operations
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-neutral-800">
                  <div className="flex items-center justify-between text-xs font-normal tracking-tight text-neutral-200">
                    <span className="flex items-center gap-1.5 text-neutral-400">
                      <EnvelopeSimple className="w-3.5 h-3.5 text-neutral-300" />
                      s.jenkins@cloudflow.io
                    </span>
                    <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-[2px] py-[2px] px-1.5 text-[10px]">
                      SMTP Verified
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-normal tracking-tight text-neutral-200">
                    <span className="flex items-center gap-1.5 text-neutral-400">
                      <LinkedinLogo className="w-3.5 h-3.5 text-neutral-300" />
                      linkedin.com/in/sjenkins-revops
                    </span>
                    <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-[2px] py-[2px] px-1.5 text-[10px]">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantees with RAW Phosphor Icons */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400 mt-8 font-normal tracking-tight">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>Zero Hallucinations</span>
          </div>
          <span className="text-neutral-600">·</span>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-white" />
            <span>RAG Vector Grounded</span>
          </div>
          <span className="text-neutral-600">·</span>
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-white" />
            <span>Evidence-Backed Scoring</span>
          </div>
        </div>
      </div>
    </section>
  );
}
