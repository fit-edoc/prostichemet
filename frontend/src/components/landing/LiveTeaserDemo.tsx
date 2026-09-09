"use client";

import * as React from "react";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import {
  IconCpu,
  IconTarget,
  IconUsers,
  IconMailFast,
  IconCopy,
  IconCheck,
  IconBolt,
  IconTrendingUp,
} from "@tabler/icons-react";

export function LiveTeaserDemo() {
  const [activeTab, setActiveTab] = React.useState<"profile" | "icp" | "lead" | "email">("lead");
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="interactive-demo" className="w-full py-16 max-w-5xl mx-auto px-6">
      <div className="text-center mb-8">
        <Badge variant="brown" size="sm">
          Interactive Architecture Preview
        </Badge>
        <h2 className="text-title-2 text-[var(--text-primary)] mt-3">
          See the AI GTM Engine in action.
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2">
          Click through the 4 stages of autonomous B2B research.
        </p>
      </div>

      {/* Tab Selectors */}
      <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] max-w-xl mx-auto mb-8">
        {[
          { id: "profile", label: "1. Business Input", icon: IconCpu },
          { id: "icp", label: "2. RAG ICP", icon: IconTarget },
          { id: "lead", label: "3. Discovered Lead", icon: IconUsers },
          { id: "email", label: "4. Cold Email", icon: IconMailFast },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
              activeTab === tab.id
                ? "bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-[var(--shadow-xs)] border border-[var(--border-subtle)] font-semibold"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Interactive Mockup Panel */}
      <GlassCard elevated className="border-[var(--border-medium)] shadow-[var(--shadow-md)]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
            <span className="text-xs font-mono text-[var(--text-muted)] ml-2">
              postrichment-agent // {activeTab}.json
            </span>
          </div>

          <Badge variant="brown" size="sm" dot>
            Verified RAG Engine
          </Badge>
        </div>

        {/* Tab 1: Profile */}
        {activeTab === "profile" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)] block mb-1">Company:</span>
                <span className="text-[var(--text-primary)] font-semibold font-sans text-sm">
                  ScaleAgent AI
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)] block mb-1">Target Niche:</span>
                <span className="text-[var(--text-primary)] font-semibold font-sans text-sm">
                  B2B AI SDR Automation & Outbound
                </span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs">
              <span className="text-[var(--text-muted)] font-mono block mb-1">Value Proposition:</span>
              <p className="text-[var(--text-primary)] leading-relaxed">
                "We automate manual SDR prospect research by 70% and increase cold email reply rates from 1.8% to 6.4% using verifiable buying signals."
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: ICP */}
        {activeTab === "icp" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--accent-brown)] uppercase">
                Generated ICP Matrix (RAG Vector Embeddings)
              </span>
              <Badge variant="brown" size="sm">94.8% Fit Accuracy</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
                <span className="font-mono text-[var(--text-muted)] block">Target Personas</span>
                <p className="font-semibold text-[var(--text-primary)]">VP of Sales, CRO, Head of Growth</p>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
                <span className="font-mono text-[var(--text-muted)] block">Company Size</span>
                <p className="font-semibold text-[var(--text-primary)]">25 - 200 Employees (Series A-C)</p>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
                <span className="font-mono text-[var(--text-muted)] block">Core Trigger</span>
                <p className="font-semibold text-[var(--text-primary)]">Hiring Sales Development Reps</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Discovered Lead */}
        {activeTab === "lead" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-[var(--text-primary)]">
                    NexusFlow Technologies (nexusflow.io)
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Enterprise Workflow Automation • 85 Employees • San Francisco, CA
                  </p>
                </div>
                <Badge variant="brown" size="md">
                  96% Fit Score
                </Badge>
              </div>

              <div className="p-3.5 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-xs space-y-1">
                <span className="font-mono text-[var(--accent-brown)] text-[10px] uppercase font-bold block">
                  ⚡ Verifiable Buying Signal Detected
                </span>
                <p className="text-[var(--text-primary)]">
                  "Posted 3 new SDR job listings on LinkedIn 4 days ago + Raised $3.5M Seed round from Sequoia Scout."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Cold Email */}
        {activeTab === "email" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[var(--accent-brown)] uppercase font-semibold">
                  PAS Copywriting Framework (Problem-Agitate-Solve)
                </span>
                <Button variant="secondary" size="sm" onClick={handleCopy} leftIcon={copied ? <IconCheck className="w-3.5 h-3.5 text-emerald-600" /> : <IconCopy className="w-3.5 h-3.5" />}>
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>

              <div className="text-xs text-[var(--text-primary)] leading-relaxed space-y-2 font-sans">
                <p className="font-semibold text-sm">Subject: quick question on nexusflow sdr onboarding</p>
                <p>Hi Marcus,</p>
                <p>
                  Saw you're currently hiring 3 new SDRs after your Seed round—congrats on the growth.
                </p>
                <p>
                  Usually when expanding outbound teams this quickly, reps spend 60%+ of their week manually digging through generic contact lists rather than running qualified discovery calls.
                </p>
                <p>
                  ScaleAgent AI automatically tracks real buying signals and pre-enriches target accounts so new SDRs ramp in days, not months.
                </p>
                <p>
                  Worth a brief 5-minute chat next Tuesday?
                </p>
                <p className="text-[var(--text-muted)] font-mono text-[11px] pt-2">
                  Alex | ScaleAgent AI
                </p>
              </div>
            </div>
          </div>
        )}
      </GlassCard>
    </section>
  );
}
