"use client";

import * as React from "react";
import {
  IconCpu,
  IconTarget,
  IconUsers,
  IconMailFast,
  IconCopy,
  IconCheck,
  IconLayersLinked,
  IconExternalLink,
} from "@tabler/icons-react";

export function LiveTeaserDemo() {
  const [activeTab, setActiveTab] = React.useState<"profile" | "icp" | "lead" | "email">("lead");
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="interactive-demo" className="w-full py-24 max-w-5xl mx-auto px-6">
      {/* Section Header in Young Serif */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-[#262626] text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4">
          <IconLayersLinked className="w-3.5 h-3.5 text-white" />
          <span>Interactive Execution Telemetry</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-tight leading-tight">
          See the AI GTM Engine in action.
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-3 font-mono">
          Click through the 4 stages of autonomous B2B research.
        </p>
      </div>

      {/* Tab Selectors with rounded-xl and 2px box shadow */}
      <div className="flex items-center justify-center gap-2 p-1.5 rounded-xl bg-[#0D0D0D] border border-[#242424] max-w-2xl mx-auto mb-8 shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
        {[
          { id: "profile", label: "1. Business Input", icon: IconCpu },
          { id: "icp", label: "2. RAG ICP", icon: IconTarget },
          { id: "lead", label: "3. Discovered Lead", icon: IconUsers },
          { id: "email", label: "4. Cold Email", icon: IconMailFast },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-mono transition-all duration-150 cursor-pointer ${
              activeTab === tab.id
                ? "bg-white text-black font-semibold shadow-[2px_2px_0px_rgba(255,255,255,0.3)] transform -translate-y-0.5"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Interactive Mockup Panel with strict monochrome styling */}
      <div className="rounded-xl border border-[#262626] bg-[#0A0A0A] p-6 sm:p-8 shadow-[2px_2px_0px_rgba(255,255,255,0.2)]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-[#1E1E1E] pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <span className="text-xs font-mono text-zinc-400 ml-2">
              postrichment-agent // {activeTab}.json
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#2B2B2B] text-[11px] font-mono text-zinc-300">
            <svg className="w-3 h-3" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="6" fill="#ffffff" className="svg-animated-pulse" />
              <circle cx="8" cy="8" r="2" fill="#ffffff" />
            </svg>
            <span>VERIFIED RAG ENGINE</span>
          </div>
        </div>

        {/* Tab 1: Profile */}
        {activeTab === "profile" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#111111] border border-[#202020]">
                <span className="text-zinc-500 block mb-1">Company:</span>
                <span className="text-white font-serif text-base">
                  ScaleAgent AI
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#111111] border border-[#202020]">
                <span className="text-zinc-500 block mb-1">Target Niche:</span>
                <span className="text-white font-serif text-base">
                  B2B AI SDR Automation & Outbound
                </span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#111111] border border-[#202020]">
              <span className="text-zinc-500 block mb-1">Value Proposition:</span>
              <p className="text-zinc-300 leading-relaxed">
                "We replace manual prospecting lists with autonomous AI research agents that discover buying signals and draft hyper-personalized cold emails."
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {["Target ACV: $24k - $60k", "ICP Persona: VP Revenue / Head of Sales", "Target Geo: US & Europe"].map((pill, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-[#181818] border border-[#2C2C2C] text-zinc-300 text-[11px]">
                  {pill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: ICP */}
        {activeTab === "icp" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-[#111111] border border-[#202020] flex items-center justify-between">
              <div>
                <span className="text-zinc-500 block mb-1">Ideal Customer Profile:</span>
                <span className="text-white font-serif text-lg">
                  Mid-Market B2B SaaS (50–500 Employees)
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-white text-black font-semibold text-xs shadow-[1px_1px_0px_rgba(255,255,255,0.3)]">
                FIT SCORE: 98%
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[#111111] border border-[#202020]">
                <span className="text-zinc-500 block mb-1">Target Titles</span>
                <span className="text-zinc-200">VP Sales, CRO, Head of Outbound</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#111111] border border-[#202020]">
                <span className="text-zinc-500 block mb-1">Funding Signal</span>
                <span className="text-zinc-200">Series A or B closed &lt; 90 days</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#111111] border border-[#202020]">
                <span className="text-zinc-500 block mb-1">Hiring Trigger</span>
                <span className="text-zinc-200">Active job posts for SDR/BDRs</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Lead */}
        {activeTab === "lead" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-[#111111] border border-[#202020] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-serif text-lg">Acme Cloud Solutions</span>
                  <span className="px-2 py-0.5 rounded-full bg-white text-black text-[10px] font-bold">
                    VERIFIED MATCH
                  </span>
                </div>
                <span className="text-zinc-400">cloudsolutions.io · San Francisco, CA · 120 employees</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-serif text-white block">94/100</span>
                <span className="text-[10px] text-zinc-500 uppercase">Intent Score</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#080808] border border-[#202020] space-y-2">
              <span className="text-zinc-500 block">EVIDENCE & BUYING SIGNALS EXTRACTED:</span>
              <div className="space-y-1.5 text-zinc-300">
                <div className="flex items-start gap-2">
                  <IconCheck className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                  <span>"Posted 4 new Enterprise SDR roles on Greenhouse (June 2026)"</span>
                </div>
                <div className="flex items-start gap-2">
                  <IconCheck className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                  <span>"Raised $18M Series B led by Benchmark Capital"</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#111111] border border-[#202020] flex items-center justify-between">
              <div>
                <span className="text-zinc-500 text-[11px] block">DECISION MAKER IDENTIFIED</span>
                <span className="text-white font-medium">Elena Rostova — VP of Revenue Operations</span>
              </div>
              <span className="text-zinc-400 text-[11px]">elena@cloudsolutions.io</span>
            </div>
          </div>
        )}

        {/* Tab 4: Email */}
        {activeTab === "email" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-[#111111] border border-[#202020] space-y-3 relative">
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 rounded-lg bg-[#1C1C1C] hover:bg-[#282828] text-zinc-300 hover:text-white transition-colors cursor-pointer border border-[#2E2E2E]"
                title="Copy cold email"
              >
                {copied ? <IconCheck className="w-4 h-4 text-white" /> : <IconCopy className="w-4 h-4" />}
              </button>

              <div>
                <span className="text-zinc-500 block text-[10px]">SUBJECT:</span>
                <span className="text-white font-medium">Quick question re: your 4 SDR postings</span>
              </div>

              <div className="pt-2 border-t border-[#1F1F1F] text-zinc-300 leading-relaxed space-y-2.5 font-sans text-sm">
                <p>Hi Elena,</p>
                <p>
                  Noticed Acme Cloud just posted 4 new Enterprise SDR roles following your Series B. Typically, ramping a larger outbound team dilutes pipeline quality if account research is still handled manually.
                </p>
                <p>
                  We built Postrichment to uncover real-time buying signals and deliver verified evidence to SDRs automatically—without scraping stale directories.
                </p>
                <p>Worth a 7-minute intro this Thursday at 2pm PT?</p>
                <p className="text-zinc-400 text-xs">— Alex, Founder @ ScaleAgent AI</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-zinc-500 px-1 font-mono">
              <span>Framework: Problem-Agitate-Solve (PAS)</span>
              <span>Length: 74 words (Optimal conversion)</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
