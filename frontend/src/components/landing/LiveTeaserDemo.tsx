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
        <Badge variant="vintage" size="sm">
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
                ? "bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-[var(--shadow-sm)] border border-[var(--border-subtle)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Interactive Mockup Panel */}
      <GlassCard elevated className="border-[var(--border-medium)] shadow-[var(--shadow-lg)]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400/60" />
            <span className="w-3 h-3 rounded-full bg-amber-400/60" />
            <span className="w-3 h-3 rounded-full bg-emerald-400/60" />
            <span className="text-xs font-mono text-[var(--text-muted)] ml-2">
              postrichment-agent // {activeTab}.json
            </span>
          </div>
          <Badge variant="neutral" size="sm">
            Live Demo
          </Badge>
        </div>

        {/* Tab 1: Profile View */}
        {activeTab === "profile" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)]">
              <span className="text-[var(--accent-vintage)] font-semibold">Company:</span>{" "}
              <span className="text-[var(--text-primary)]">ScaleAgent AI</span>
            </div>
            <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)]">
              <span className="text-[var(--accent-vintage)] font-semibold">Value Proposition:</span>{" "}
              <span className="text-[var(--text-secondary)]">
                Custom AI voice & SDR research agents for B2B tech companies to 3x outbound conversions.
              </span>
            </div>
            <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)]">
              <span className="text-[var(--accent-vintage)] font-semibold">Target Audience:</span>{" "}
              <span className="text-[var(--text-secondary)]">
                Series A/B SaaS startups with 20-100 employees looking to automate SDR research.
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: RAG ICP View */}
        {activeTab === "icp" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-mono">
                  Synthesized Persona Title
                </span>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  VP of Sales / Head of Revenue Operations
                </h3>
              </div>
              <Badge variant="vintage" size="sm">RAG Grounded</Badge>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-xs">
                <span className="text-[var(--text-muted)] block mb-1">Target Roles</span>
                <span className="text-[var(--text-primary)] font-medium">
                  VP of Sales, CRO, Head of Growth
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-xs">
                <span className="text-[var(--text-muted)] block mb-1">Ideal Company Size</span>
                <span className="text-[var(--text-primary)] font-medium">
                  25–100 employees ($3M–$15M ARR)
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2 text-xs">
              <span className="text-[var(--text-muted)] block font-semibold">
                Validated Pain Points
              </span>
              <p className="text-[var(--text-secondary)]">
                • SDRs spend 60%+ of time manually researching prospects on LinkedIn instead of selling.
              </p>
              <p className="text-[var(--text-secondary)]">
                • Low cold email reply rates (&lt;2%) due to generic messages lacking verifiable evidence.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Discovered Lead with Evidence */}
        {activeTab === "lead" && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    NexusFlow AI
                  </h3>
                  <span className="text-xs text-[var(--text-muted)] font-mono">
                    (35 employees • SaaS)
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  Contact: <strong className="text-[var(--text-primary)]">Olivia Hayes</strong> (Head of Sales)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-sm font-mono flex items-center gap-1.5">
                  <IconTrendingUp className="w-4 h-4" />
                  <span>92/100 FIT SCORE</span>
                </div>
              </div>
            </div>

            {/* Growth Signals */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                Detected Signals (Real-Time Triggers)
              </span>
              <div className="flex flex-wrap gap-2">
                <Badge variant="vintage" size="sm">
                  ⚡ Raised $3.5M Seed 4 mos ago
                </Badge>
                <Badge variant="neutral" size="sm">
                  ⚡ Hiring 3 SDRs on LinkedIn
                </Badge>
                <Badge variant="neutral" size="sm">
                  ⚡ Launched Enterprise Product Tier
                </Badge>
              </div>
            </div>

            {/* Verifiable Evidence Reasoning */}
            <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-1.5">
              <span className="text-[11px] font-mono text-[var(--accent-vintage)] font-semibold uppercase tracking-wider">
                Why this lead needs you (Evidence)
              </span>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                "NexusFlow is scaling their sales team post-Seed funding. Manual research for complex enterprise targets will cause new SDRs to ramp slowly, missing pipeline targets. ScaleAgent AI solves this bottleneck immediately."
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Cold Email */}
        {activeTab === "email" && (
          <div className="space-y-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] flex items-center justify-between">
              <div>
                <span className="text-[var(--text-muted)]">Subject:</span>{" "}
                <span className="text-[var(--text-primary)] font-semibold">nexusflow outbound</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                leftIcon={copied ? <IconCheck className="w-3.5 h-3.5 text-emerald-500" /> : <IconCopy className="w-3.5 h-3.5" />}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-secondary)] leading-relaxed space-y-3 font-sans text-sm">
              <p>Hi Olivia,</p>
              <p>
                Saw you recently raised $3.5M and are hiring 3 SDRs to scale NexusFlow for Enterprise.
              </p>
              <p>
                That's a big push, but manual research for enterprise accounts can really slow down new SDRs and impact pipeline.
              </p>
              <p>
                ScaleAgent AI builds custom AI research agents that discover intent signals and craft personalized outreach, helping B2B tech companies 3x outbound conversions.
              </p>
              <p>Worth a quick 5-min look at how this works?</p>
            </div>
          </div>
        )}
      </GlassCard>
    </section>
  );
}
