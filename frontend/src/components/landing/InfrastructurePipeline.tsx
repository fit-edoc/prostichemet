"use client";

import * as React from "react";
import {
  IconRadar2,
  IconDatabase,
  IconLayersLinked,
  IconSend,
  IconPlayerPlay,
  IconPlayerPause,
  IconCheck,
  IconWorld,
  IconMail,
  IconChevronRight,
  IconCpu,
} from "@tabler/icons-react";

interface PipelineStep {
  id: string;
  stepNum: string;
  title: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  telemetry: {
    label: string;
    value: string;
    subtext: string;
  };
  samplePayload: {
    key: string;
    val: string;
  }[];
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: "discovery",
    stepNum: "01",
    title: "Autonomous Entity & Signal Crawling",
    category: "INGESTION LAYER",
    description:
      "Parallel workers crawl company career portals, SEC filings, tech stack fingerprints, and Google Maps business registries in real time.",
    icon: IconRadar2,
    telemetry: {
      label: "Crawl Throughput",
      value: "1,240 req/min",
      subtext: "100% proxy rotated & headless",
    },
    samplePayload: [
      { key: "Target Domain", val: "cloudflow.io" },
      { key: "Event Detected", val: "Posted 4x Senior SDR roles" },
      { key: "Geo Location", val: "San Francisco, CA (Verified via Maps)" },
    ],
  },
  {
    id: "grounding",
    stepNum: "02",
    title: "Vector Grounding & Anti-Hallucination",
    category: "RAG SEMANTIC GATE",
    description:
      "Target accounts are embedded into a high-dimensional vector space and matched against your exact Ideal Customer Profile rules.",
    icon: IconDatabase,
    telemetry: {
      label: "Vector Similarity",
      value: "0.94 cosine fit",
      subtext: "Strict anti-hallucination threshold passed",
    },
    samplePayload: [
      { key: "ICP Match Grade", val: "Tier 1 - High Priority" },
      { key: "Revenue Estimate", val: "$15M - $30M ARR" },
      { key: "Technology Stack", val: "PostgreSQL, React, Next.js, AWS" },
    ],
  },
  {
    id: "enrichment",
    stepNum: "03",
    title: "Decision Maker & Contact Resolution",
    category: "IDENTITY GRAPH",
    description:
      "Pinpoints exact VP/Director-level stakeholders who own the budget, cross-referencing corporate email patterns and MX deliverability records.",
    icon: IconLayersLinked,
    telemetry: {
      label: "Email Confidence",
      value: "99.4% Deliverable",
      subtext: "SMTP ping + MX record validated",
    },
    samplePayload: [
      { key: "Executive", val: "Sarah Jenkins" },
      { key: "Title", val: "Head of Revenue Operations" },
      { key: "Direct Email", val: "s.jenkins@cloudflow.io (Corporate)" },
    ],
  },
  {
    id: "synthesis",
    stepNum: "04",
    title: "PAS Synthesis & Real-Time CRM Push",
    category: "ACTIVATION ENGINE",
    description:
      "Synthesizes the real-world trigger into a hyper-personalized 3-sentence outreach draft and syncs directly into your CRM table.",
    icon: IconSend,
    telemetry: {
      label: "CRM Sync Latency",
      value: "410ms",
      subtext: "Lead status set to 'Ready for Outreach'",
    },
    samplePayload: [
      { key: "Copy Framework", val: "Problem-Agitate-Solve (PAS)" },
      { key: "Trigger Cited", val: "Recent expansion of sales development team" },
      { key: "Sync Status", val: "Persisted to CRM Leads Table" },
    ],
  },
];

export function InfrastructurePipeline() {
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);

  // Auto-cycle through steps every 4.5 seconds if playing
  React.useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % PIPELINE_STEPS.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const activeStep = PIPELINE_STEPS[activeStepIndex];

  return (
    <section id="pipeline-preview" className="w-full py-28 max-w-7xl mx-auto px-6">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-[#262626] text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4">
          <IconCpu className="w-3.5 h-3.5 text-white" />
          <span>Realtime Infrastructure Preview</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-tight leading-tight">
          Step-by-step autonomous execution,{" "}
          <span className="font-editorial italic text-zinc-400">zero manual prompts.</span>
        </h2>

        <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed max-w-2xl mx-auto">
          Observe how raw web signals evolve through our 4-stage pipeline with strict verification, identity resolution, and instant CRM persistence.
        </p>

        {/* Play/Pause Control & Step Jumpers */}
        <div className="flex items-center justify-center gap-3 pt-6">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause pipeline preview" : "Play pipeline preview"}
            className="btn-dark-xl px-4 py-2 flex items-center gap-2 text-xs font-mono cursor-pointer"
          >
            {isPlaying ? (
              <>
                <IconPlayerPause className="w-3.5 h-3.5 text-white" />
                <span>PAUSE STREAM</span>
              </>
            ) : (
              <>
                <IconPlayerPlay className="w-3.5 h-3.5 text-white" />
                <span>RESUME STREAM</span>
              </>
            )}
          </button>

          <span className="text-xs font-mono text-zinc-500">
            STAGE {activeStepIndex + 1} OF 4
          </span>
        </div>
      </div>

      {/* 4 Pipeline Step Navigation Cards (Clickable) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {PIPELINE_STEPS.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          const Icon = step.icon;

          return (
            <button
              key={step.id}
              onClick={() => {
                setActiveStepIndex(idx);
                setIsPlaying(false);
              }}
              className={`p-5 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                isActive
                  ? "bg-[#141414] border-white shadow-[2px_2px_0px_rgba(255,255,255,0.3)] transform -translate-y-1"
                  : "bg-[#0A0A0A] border-[#1F1F1F] hover:border-[#333333] opacity-60 hover:opacity-90"
              }`}
            >
              {/* Active Step Top Indicator Bar */}
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-white animate-pulse" />
              )}

              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-zinc-500 font-semibold">
                  STEP {step.stepNum}
                </span>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isActive ? "bg-white text-black" : "bg-[#161616] text-zinc-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1">
                {step.category}
              </div>
              <h4 className="font-serif text-sm font-medium text-white truncate">
                {step.title}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Main Animated Pipeline Display with Step-by-Step Blur-to-No-Blur Cards */}
      <div className="relative rounded-2xl bg-[#080808] border border-[#222222] p-6 sm:p-10 shadow-[2px_2px_0px_rgba(255,255,255,0.15)] overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 halftone-footer opacity-20 pointer-events-none" />

        {/* Top Header of the Active Stage */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#1A1A1A]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                {activeStep.category} // PIPELINE_EXEC
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white">
              {activeStep.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mt-2 leading-relaxed">
              {activeStep.description}
            </p>
          </div>

          {/* Real-time Telemetry Pill */}
          <div className="p-4 rounded-xl bg-[#111111] border border-[#262626] shrink-0 font-mono text-xs space-y-1">
            <div className="text-zinc-500 uppercase tracking-wider text-[10px]">
              {activeStep.telemetry.label}
            </div>
            <div className="text-xl font-serif text-white">
              {activeStep.telemetry.value}
            </div>
            <div className="text-[11px] text-zinc-400 flex items-center gap-1.5 pt-0.5">
              <IconCheck className="w-3.5 h-3.5 text-white" />
              <span>{activeStep.telemetry.subtext}</span>
            </div>
          </div>
        </div>

        {/* Multi-Card Step Demonstration with Blur-to-No-Blur Transitions */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 pt-8">
          {PIPELINE_STEPS.map((step, idx) => {
            const isCurrent = idx === activeStepIndex;
            const isCompleted = idx < activeStepIndex;
            const Icon = step.icon;

            return (
              <div
                key={`card-${step.id}`}
                className={`p-5 rounded-xl border transition-all duration-500 flex flex-col justify-between ${
                  isCurrent
                    ? "pipeline-step-active bg-[#121212] border-white shadow-[2px_2px_0px_rgba(255,255,255,0.25)]"
                    : isCompleted
                    ? "pipeline-step-active bg-[#0A0A0A] border-[#2B2B2B] opacity-80"
                    : "pipeline-step-blur bg-[#060606] border-[#1C1C1C]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#202020] mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-white" />
                      <span className="font-mono text-xs text-white font-medium">
                        STAGE {step.stepNum}
                      </span>
                    </div>

                    {isCurrent ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white text-black font-mono text-[10px] font-semibold">
                        <svg className="w-2.5 h-2.5" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="6" fill="#000000" className="svg-animated-pulse" />
                        </svg>
                        PROCESSING
                      </span>
                    ) : isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-zinc-400">
                        <IconCheck className="w-3.5 h-3.5 text-white" />
                        VERIFIED
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-zinc-600">
                        QUEUED
                      </span>
                    )}
                  </div>

                  {/* Payload Keys & Values */}
                  <div className="space-y-2 font-mono text-xs">
                    {step.samplePayload.map((row, rIdx) => (
                      <div
                        key={rIdx}
                        className="p-2 rounded-lg bg-[#080808] border border-[#1A1A1A] flex flex-col gap-0.5"
                      >
                        <span className="text-[10px] text-zinc-500 uppercase">
                          {row.key}
                        </span>
                        <span className="text-zinc-200 text-xs truncate">
                          {row.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1C1C1C] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>Confidence Gate:</span>
                  <span className="text-white font-bold">100% Deterministic</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Step Indicator Bar */}
        <div className="relative z-10 mt-8 pt-6 border-t border-[#1A1A1A] flex items-center justify-between text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Pipeline State:</span>
            <span className="text-white">Continuous Ingestion Loop</span>
          </div>

          <div className="flex items-center gap-2">
            {PIPELINE_STEPS.map((_, dotIdx) => (
              <span
                key={dotIdx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  dotIdx === activeStepIndex
                    ? "w-8 bg-white"
                    : dotIdx < activeStepIndex
                    ? "w-3 bg-zinc-600"
                    : "w-2 bg-zinc-800"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
