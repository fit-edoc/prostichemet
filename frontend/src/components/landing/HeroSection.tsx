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

      {/* Action Buttons: rounded-md, tactile shadows */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
        <button
          onClick={() => router.push("/login")}
          className="btn-invert-xl px-7 py-3.5 flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer group shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]"
        >
          <span>Start Free Research</span>
          <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        <button
          onClick={() => {
            document.getElementById("pipeline-preview")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="btn-dark-xl px-7 py-3.5 flex items-center justify-center gap-2 text-sm font-medium cursor-pointer shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]"
        >
          <IconSearch className="w-4 h-4 text-zinc-600" />
          <span>Inspect Infrastructure</span>
        </button>
      </div>

      {/* Telemetry Preview Card with SVG Fill Animation */}
    <div className="w-full max-w-5xl mx-auto px-4">
  <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_20px_70px_-30px_rgba(0,0,0,0.25)]">

    {/* Subtle grid background */}
    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />

    <div className="relative">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 border-b border-zinc-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-4">
          {/* Status */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950">
            <div className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight text-zinc-950">
                Intelligence Cluster
              </span>

              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                AGT-09
              </span>
            </div>

            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
              Real-time prospect intelligence
            </p>
          </div>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-2 self-start rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 sm:self-auto">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-950" />
          </span>

          <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-zinc-600">
            Streaming
          </span>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr_1fr]">

        {/* ================= SCORE ================= */}
        <div className="relative border-b border-zinc-200 p-6 lg:border-b-0 lg:border-r">

          <div className="mb-8 flex items-center justify-between">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-400">
              ICP Fit
            </span>

            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200">
              <IconCheck className="h-3.5 w-3.5 text-zinc-950" />
            </div>
          </div>

          <div className="flex items-end gap-2">
            <span className="text-6xl font-semibold tracking-[-0.06em] text-zinc-950">
              98.4
            </span>

            <span className="mb-2 text-xl font-medium text-zinc-400">
              %
            </span>
          </div>

          <p className="mt-2 text-sm text-zinc-500">
            Exceptional account match
          </p>

          {/* Score bar */}
          <div className="mt-7">
            <div className="mb-2 flex justify-between font-mono text-[9px] uppercase tracking-widest text-zinc-400">
              <span>Match confidence</span>
              <span>98.4%</span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100">
              <div className="h-full w-[98.4%] rounded-full bg-zinc-950" />
            </div>
          </div>

          {/* Account info */}
          <div className="mt-8 flex items-center gap-3 border-t border-zinc-100 pt-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-white">
              <span className="text-xs font-bold">B</span>
            </div>

            <div>
              <p className="text-xs font-medium text-zinc-900">
                Series B SaaS
              </p>
              <p className="mt-0.5 text-[11px] text-zinc-400">
                Headcount +45%
              </p>
            </div>
          </div>
        </div>

        {/* ================= SIGNALS ================= */}
        <div className="border-b border-zinc-200 p-6 lg:border-b-0 lg:border-r">

          <div className="mb-7 flex items-center justify-between">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-400">
              Detected Signal
            </span>

            <IconRadar2 className="h-4 w-4 text-zinc-950" />
          </div>

          {/* Signal timeline */}
          <div className="relative">

            {/* vertical line */}
            <div className="absolute left-[5px] top-2 bottom-2 w-px bg-zinc-200" />

            <div className="relative flex gap-4">
              <div className="relative z-10 mt-1 h-3 w-3 rounded-full border-[3px] border-white bg-zinc-950 ring-1 ring-zinc-300" />

              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold tracking-tight text-zinc-950">
                    Hiring VP Revenue
                  </h3>

                  <span className="shrink-0 rounded-full bg-zinc-950 px-2 py-1 font-mono text-[9px] uppercase text-white">
                    New
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-zinc-500">
                  Strong buying signal detected from recent hiring activity.
                </p>

                <div className="mt-5 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200">
                    <span className="text-[11px] font-bold text-zinc-900">
                      in
                    </span>
                  </div>

                  <div>
                    <p className="text-[11px] font-medium text-zinc-700">
                      LinkedIn
                    </p>
                    <p className="text-[10px] text-zinc-400">
                      Detected 4 hours ago
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary signal */}
            <div className="relative mt-8 flex gap-4 opacity-50">
              <div className="relative z-10 mt-1 h-3 w-3 rounded-full border-[3px] border-white bg-zinc-400 ring-1 ring-zinc-200" />

              <div>
                <p className="text-xs font-medium text-zinc-700">
                  Growth trajectory detected
                </p>
                <p className="mt-1 text-[10px] text-zinc-400">
                  +45% headcount in current period
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= DECISION MAKER ================= */}
        <div className="p-6">

          <div className="mb-7 flex items-center justify-between">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-400">
              Decision Maker
            </span>

            <IconLayersLinked className="h-4 w-4 text-zinc-950" />
          </div>

          {/* Profile */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
              VS
            </div>

            <div>
              <h3 className="text-base font-semibold tracking-tight text-zinc-950">
                VP of Sales Ops
              </h3>

              <p className="mt-1 text-xs text-zinc-500">
                Revenue organization
              </p>
            </div>
          </div>

          {/* Verification */}
          <div className="mt-7 rounded-xl border border-zinc-200 bg-zinc-50 p-4">

            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-950">
                <IconCheck className="h-3 w-3 text-white" />
              </div>

              <span className="text-xs font-semibold text-zinc-900">
                Identity verified
              </span>
            </div>

            <p className="mt-2 text-[11px] leading-5 text-zinc-500">
              Work email and professional profile have been verified.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-5 grid grid-cols-2 gap-2">

            <button className="group flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-left transition-all hover:border-zinc-950 hover:bg-zinc-950">
              <span className="text-[11px] font-medium text-zinc-700 group-hover:text-white">
                Work email
              </span>

              <span className="text-zinc-400 group-hover:text-white">
                ↗
              </span>
            </button>

            <button className="group flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-left transition-all hover:border-zinc-950 hover:bg-zinc-950">
              <span className="text-[11px] font-medium text-zinc-700 group-hover:text-white">
                CRM profile
              </span>

              <span className="text-zinc-400 group-hover:text-white">
                ↗
              </span>
            </button>

          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex flex-col gap-3 border-t border-zinc-200 bg-zinc-50/70 px-6 py-3.5 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-950" />

          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500">
            Intelligence system operational
          </span>
        </div>

        <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-400">
          Last sync · 04:21:09
        </div>
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
