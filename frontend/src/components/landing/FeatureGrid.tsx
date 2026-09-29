"use client";

import * as React from "react";
import {
  IconRadar2,
  IconCpu,
  IconDatabase,
  IconShieldCheck,
  IconMailCheck,
  IconCheck,
  IconCopy,
  IconBolt,
  IconLayersLinked,
  IconTrendingUp,
} from "@tabler/icons-react";

export function FeatureGrid() {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"pas" | "observation">("pas");

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="features" className="w-full py-24 max-w-7xl mx-auto px-6">
      {/* Section Header in Young Serif */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-[#262626] text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4">
          <IconBolt className="w-3.5 h-3.5 text-white" />
          <span>Bento Architecture Matrix</span>
        </div>
        
        <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-tight leading-tight">
          Engineered for high-conviction meetings,{" "}
          <span className="font-editorial italic text-zinc-400">not noisy spray-and-pray.</span>
        </h2>
        
        <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed max-w-2xl mx-auto">
          Postrichment replaces fragile scraping scripts with autonomous multi-agent research nodes, vector grounding, and trigger-first synthesis.
        </p>
      </div>

      {/* Asymmetric Bento Grid (4 Unique Modules) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Module 1: Autonomous Signal Radar (7 cols) */}
        <div className="md:col-span-7 bento-card p-6 md:p-8 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold shadow-[2px_2px_0px_rgba(255,255,255,0.3)]">
                <IconRadar2 className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 bg-[#161616] px-3 py-1 rounded-full border border-[#2B2B2B]">
                MODULE // 01
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-white mb-2">
              Autonomous Signal Detection Radar
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-lg mb-6">
              Never initiate outreach without a verifiable event. Our crawlers monitor hiring spikes (e.g. +3 SDRs posted), Series A/B funding, executive arrivals, and cloud infrastructure transitions.
            </p>
          </div>

          {/* Interactive Radar Telemetry Widget with SVG Fill Animation */}
          <div className="p-4 rounded-xl bg-[#080808] border border-[#222222] relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A] text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="#ffffff" className="svg-animated-pulse" />
                  <circle cx="12" cy="12" r="3" fill="#ffffff" />
                </svg>
                <span>SIGNAL FEED: LIVE CLUSTER</span>
              </span>
              <span className="text-zinc-500">24 SAMPLES / SEC</span>
            </div>

            <div className="space-y-2 pt-3 font-mono text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#111111] border border-[#1F1F1F]">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="text-white font-medium">Supabase</span>
                  <span className="text-zinc-500 text-[11px]">Hiring "Lead Solutions Architect"</span>
                </div>
                <span className="text-[10px] text-zinc-400 shrink-0">12m ago</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-[#111111] border border-[#1F1F1F]">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="text-white font-medium">Retool</span>
                  <span className="text-zinc-500 text-[11px]">Announced Enterprise Workflow v2</span>
                </div>
                <span className="text-[10px] text-zinc-400 shrink-0">34m ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Module 2: PAS Copywriting Studio (5 cols) */}
        <div className="md:col-span-5 bento-card p-6 md:p-8 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold shadow-[2px_2px_0px_rgba(255,255,255,0.3)]">
                <IconMailCheck className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 bg-[#161616] px-3 py-1 rounded-full border border-[#2B2B2B]">
                MODULE // 02
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-white mb-2">
              Framework-Grounded Copywriting
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
              Cites exact verified data points using battle-tested outreach psychology instead of robotic LLM flattery.
            </p>

            {/* Framework Switcher Tabs */}
            <div className="flex items-center gap-2 mb-4 p-1 rounded-lg bg-[#121212] border border-[#222222]">
              <button
                onClick={() => setActiveTab("pas")}
                className={`flex-1 py-1.5 text-xs font-mono rounded-md transition-all cursor-pointer ${
                  activeTab === "pas" ? "bg-white text-black font-semibold shadow-[1px_1px_0px_rgba(255,255,255,0.2)]" : "text-zinc-400 hover:text-white"
                }`}
              >
                PAS Framework
              </button>
              <button
                onClick={() => setActiveTab("observation")}
                className={`flex-1 py-1.5 text-xs font-mono rounded-md transition-all cursor-pointer ${
                  activeTab === "observation" ? "bg-white text-black font-semibold shadow-[1px_1px_0px_rgba(255,255,255,0.2)]" : "text-zinc-400 hover:text-white"
                }`}
              >
                Observation-Insight
              </button>
            </div>
          </div>

          {/* Interactive Snippet Box with Copy Microinteraction */}
          <div className="p-4 rounded-xl bg-[#080808] border border-[#222222] relative">
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-1.5 rounded-md bg-[#161616] hover:bg-[#202020] text-zinc-400 hover:text-white transition-colors cursor-pointer border border-[#2E2E2E]"
              title="Copy snippet"
            >
              {copied ? <IconCheck className="w-3.5 h-3.5 text-white" /> : <IconCopy className="w-3.5 h-3.5" />}
            </button>

            <div className="text-[11px] font-mono text-zinc-500 mb-1">
              {activeTab === "pas" ? "SUBJECT: Quick question re: SDR hiring spike" : "SUBJECT: Observed your Snowflake data migration"}
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed italic pr-6">
              {activeTab === "pas"
                ? '"Saw your team posted 3 enterprise SDR roles this week. Scaling outreach usually dilutes reply rates if data hygiene isn\'t automated..."'
                : '"Noticed your recent announcement on migrating pipelines to Snowflake. Most engineering leads struggle with pipeline latency during cutover..."'}
            </p>
          </div>
        </div>

        {/* Module 3: Vector Grounding & Anti-Hallucination (5 cols) */}
        <div className="md:col-span-5 bento-card p-6 md:p-8 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold shadow-[2px_2px_0px_rgba(255,255,255,0.3)]">
                <IconShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 bg-[#161616] px-3 py-1 rounded-full border border-[#2B2B2B]">
                MODULE // 03
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-white mb-2">
              Anti-Hallucination Strict Gate
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
              Every factual assertion, email address, and company metric is strictly cross-referenced against live public web sources before persisting to your CRM.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#080808] border border-[#222222] space-y-2.5 font-mono text-xs">
            <div className="flex justify-between items-center text-zinc-400">
              <span>Grounding Confidence:</span>
              <span className="text-white font-bold">99.98%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#1C1C1C] overflow-hidden">
              <div className="h-full bg-white w-[99.9%]" />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 pt-1">
              <IconCheck className="w-3.5 h-3.5 text-white" />
              <span>Zero fabricated records allowed</span>
            </div>
          </div>
        </div>

        {/* Module 4: Multi-Channel ICP Extraction (7 cols) */}
        <div className="md:col-span-7 bento-card p-6 md:p-8 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold shadow-[2px_2px_0px_rgba(255,255,255,0.3)]">
                <IconLayersLinked className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 bg-[#161616] px-3 py-1 rounded-full border border-[#2B2B2B]">
                MODULE // 04
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-white mb-2">
              Multi-Source Account Enrichment
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 max-w-lg">
              Postrichment crawls verified business registries, career boards, Google Maps addresses, tech stack signatures, and LinkedIn profiles in a unified ingestion stream.
            </p>
          </div>

          {/* Interactive Tag Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="p-3 rounded-lg bg-[#0F0F0F] border border-[#222222] text-center">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">TIER 1 FIT</div>
              <div className="text-xs font-semibold text-white mt-1">Series B SaaS</div>
            </div>

            <div className="p-3 rounded-lg bg-[#0F0F0F] border border-[#222222] text-center">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">HEADCOUNT</div>
              <div className="text-xs font-semibold text-white mt-1">50 - 250 Staff</div>
            </div>

            <div className="p-3 rounded-lg bg-[#0F0F0F] border border-[#222222] text-center">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">LOCATION</div>
              <div className="text-xs font-semibold text-white mt-1">US & EU Remote</div>
            </div>

            <div className="p-3 rounded-lg bg-[#0F0F0F] border border-[#222222] text-center">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">SYNC SPEED</div>
              <div className="text-xs font-semibold text-white mt-1">&lt; 1.2s Realtime</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
