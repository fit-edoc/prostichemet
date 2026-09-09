import * as React from "react";
import { Badge } from "../ui/Badge";
import {
  IconWriting,
  IconCpu,
  IconRadar,
  IconSend,
  IconCheck,
} from "@tabler/icons-react";

export function WorkflowSection() {
  const steps = [
    {
      num: "01",
      title: "Input Business Context",
      desc: "Tell the platform what you sell, your value proposition, and typical target customer deal size.",
      icon: IconWriting,
    },
    {
      num: "02",
      title: "RAG ICP Synthesis",
      desc: "Gemini retrieves market benchmarks to synthesize your ideal persona, target verticals, and core pain points.",
      icon: IconCpu,
    },
    {
      num: "03",
      title: "Autonomous Research Agent",
      desc: "Discovers candidate companies, identifies decision-makers, detects growth signals, and scores fit (0–100).",
      icon: IconRadar,
    },
    {
      num: "04",
      title: "High-Converting Outreach",
      desc: "Generates punchy, <85-word cold emails referencing the exact evidence and signals before you hit send.",
      icon: IconSend,
    },
  ];

  return (
    <section id="workflow" className="w-full py-20 bg-[var(--bg-canvas)] border-y border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="brown" size="sm">
            End-to-End Workflow
          </Badge>
          <h2 className="text-title-1 text-[var(--text-primary)] mt-3">
            From business description to <span className="gradient-text-brown">closed meetings.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all flex flex-col justify-between group shadow-[var(--shadow-xs)]"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-bold font-mono text-[var(--accent-brown)]">
                    {step.num}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-primary)] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <step.icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                <IconCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Automated step</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
