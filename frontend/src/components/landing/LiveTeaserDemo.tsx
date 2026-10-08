"use client";

import * as React from "react";
import {
  Buildings,
  Target,
  UserCheck,
  EnvelopeSimple,
  Copy,
  Check,
  Sparkle,
} from "@phosphor-icons/react";

export function LiveTeaserDemo() {
  const [activeTab, setActiveTab] = React.useState<"profile" | "signal" | "contact" | "email">("signal");
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="demo" className="w-full py-16 max-w-4xl mx-auto px-4">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="mb-3">
          <span className="bg-purple-700/10 text-purple-600 rounded-[2px] border-0 py-[2px] px-2 text-[11px] font-normal tracking-tight inline-flex items-center gap-1.5">
            <Sparkle className="w-3.5 h-3.5" />
            Interactive Engine Preview
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl text-zinc-950 font-normal tracking-tight leading-tight">
          How Postrichly works in practice.
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 mt-2 font-normal tracking-tight max-w-lg mx-auto">
          Explore the four stages of autonomous account discovery and trigger-based synthesis.
        </p>
      </div>

      {/* Tabs with RAW Phosphor Icons */}
      <div className="flex items-center justify-center gap-1 p-1 rounded-md bg-zinc-100/80 border border-zinc-200/80 max-w-xl mx-auto mb-6">
        {[
          { id: "profile", label: "1. Business Context", icon: Buildings },
          { id: "signal", label: "2. Live Signal", icon: Target },
          { id: "contact", label: "3. Decision Maker", icon: UserCheck },
          { id: "email", label: "4. Grounded Email", icon: EnvelopeSimple },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-[3px] text-xs font-normal tracking-tight transition-all cursor-pointer ${
                isActive
                  ? "bg-white text-zinc-950 shadow-xs border border-zinc-200/60 font-medium"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Display Panel */}
      <div className="rounded-lg border border-zinc-200/90 bg-white p-5 sm:p-6 shadow-sm">
        {activeTab === "profile" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 text-xs">
              <span className="text-zinc-500 font-normal tracking-tight">Input Parameters</span>
              <span className="bg-blue-700/10 text-blue-600 rounded-[2px] border-0 py-[2px] px-2 text-[11px] font-normal tracking-tight">
                Context Loaded
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-md bg-zinc-50 border border-zinc-100 space-y-1">
                <span className="text-zinc-400 block text-[11px]">Product & Service</span>
                <span className="text-zinc-900 font-normal tracking-tight block">
                  AI Sales Engineering & Automated CRM Enrichment
                </span>
              </div>
              <div className="p-3.5 rounded-md bg-zinc-50 border border-zinc-100 space-y-1">
                <span className="text-zinc-400 block text-[11px]">Target Audience</span>
                <span className="text-zinc-900 font-normal tracking-tight block">
                  B2B SaaS companies (50–500 employees), Series A–C
                </span>
              </div>
            </div>
            <div className="p-3.5 rounded-md bg-zinc-50 border border-zinc-100 space-y-1 text-xs">
              <span className="text-zinc-400 block text-[11px]">Core Value Proposition</span>
              <p className="text-zinc-700 font-normal tracking-tight leading-relaxed">
                Replaces cold generic spam with evidence-grounded messages referencing recent funding, tech stack updates, and hiring triggers to boost reply rates by 3.2x.
              </p>
            </div>
          </div>
        )}

        {activeTab === "signal" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 text-xs">
              <span className="text-zinc-500 font-normal tracking-tight">Autonomous Signal Detection</span>
              <span className="bg-green-700/10 text-green-600 rounded-[2px] border-0 py-[2px] px-2 text-[11px] font-normal tracking-tight">
                98.4% Match Intent
              </span>
            </div>
            <div className="p-4 rounded-md bg-zinc-50 border border-zinc-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-normal tracking-tight text-zinc-950">
                  Target: CloudFlow Technologies (Series B)
                </span>
                <span className="text-zinc-400 text-[11px]">Verified 2h ago</span>
              </div>
              <p className="text-zinc-700 font-normal tracking-tight leading-relaxed">
                "Detected 4 recent SDR role listings on career site following an $18M Series B round led by Bessemer. Public stated objective: build out scalable outbound pipeline."
              </p>
              <div className="pt-2 flex items-center gap-2 text-[11px]">
                <span className="bg-amber-700/10 text-amber-600 rounded-[2px] border-0 py-[2px] px-2 font-normal">
                  Hiring Spike
                </span>
                <span className="bg-purple-700/10 text-purple-600 rounded-[2px] border-0 py-[2px] px-2 font-normal">
                  Series B Funding
                </span>
                <span className="bg-blue-700/10 text-blue-600 rounded-[2px] border-0 py-[2px] px-2 font-normal">
                  Outbound Expansion
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 text-xs">
              <span className="text-zinc-500 font-normal tracking-tight">Resolved Budget Holder</span>
              <span className="bg-green-700/10 text-green-600 rounded-[2px] border-0 py-[2px] px-2 text-[11px] font-normal tracking-tight">
                Deliverable
              </span>
            </div>
            <div className="p-4 rounded-md bg-zinc-50 border border-zinc-100 space-y-3 text-xs">
              <div className="flex items-center gap-3">
                {/* Real Avatar */}
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
                  alt="Sarah Jenkins"
                  className="w-10 h-10 rounded-full object-cover border border-zinc-200/80 shadow-xs"
                />
                <div>
                  <h4 className="text-xs font-normal tracking-tight text-zinc-950">
                    Sarah Jenkins
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-normal tracking-tight">
                    Head of Revenue Operations · CloudFlow Technologies
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 pt-2 border-t border-zinc-200/60 text-xs font-normal tracking-tight">
                <div className="flex items-center justify-between p-2 rounded bg-white border border-zinc-200/60">
                  <span className="text-zinc-500">Email:</span>
                  <span className="text-zinc-900">s.jenkins@cloudflow.io</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-white border border-zinc-200/60">
                  <span className="text-zinc-500">Verification:</span>
                  <span className="bg-purple-700/10 text-purple-600 rounded-[2px] border-0 py-[2px] px-1.5 text-[10px]">
                    SMTP Ping & MX Valid
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "email" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 font-normal tracking-tight">Outreach Draft</span>
                <span className="bg-blue-700/10 text-blue-600 rounded-[2px] border-0 py-[2px] px-2 text-[10px] font-normal tracking-tight">
                  68 Words PAS
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-[11px] text-zinc-600 hover:text-zinc-950 cursor-pointer font-normal tracking-tight"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-zinc-600" />}
                <span>{copied ? "Copied" : "Copy Draft"}</span>
              </button>
            </div>
            <div className="p-4 rounded-md bg-zinc-50 border border-zinc-100 text-xs leading-relaxed space-y-3 font-normal tracking-tight text-zinc-800">
              <div className="text-zinc-500 text-[11px]">
                Subject: Scaling the SDR team at CloudFlow
              </div>
              <p>Hi Sarah,</p>
              <p>
                Noticed CloudFlow is hiring 4 Senior SDRs following your Series B. Ramping new reps on manual prospect research often slows down time-to-first-meeting by weeks.
              </p>
              <p>
                We built Postrichly to feed your reps live-verified buyer signals with pre-grounded context directly into your CRM so they only reach out with real timing evidence.
              </p>
              <p>
                Worth a quick look before the new cohort begins?
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
