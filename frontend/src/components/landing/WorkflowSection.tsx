"use client";

import * as React from "react";
import {
  IconWriting,
  IconCpu,
  IconRadar2,
  IconSend,
  IconCheck,
  IconRoute,
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
      icon: IconRadar2,
    },
    {
      num: "04",
      title: "High-Converting Outreach",
      desc: "Generates punchy, <85-word cold emails referencing the exact evidence and signals before you hit send.",
      icon: IconSend,
    },
  ];

  return (
    <section id="workflow" className="w-full py-24 bg-[#050505] border-y border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-[#262626] text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4">
            <IconRoute className="w-3.5 h-3.5 text-white" />
            <span>End-to-End Orchestration</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            From company description to{" "}
            <span className="font-editorial italic text-zinc-400">verified revenue pipeline.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-[#0C0C0C] border border-[#222222] hover:border-zinc-500 transition-all flex flex-col justify-between group shadow-[2px_2px_0px_rgba(255,255,255,0.15)] hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-serif text-white">
                    {step.num}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#141414] border border-[#2A2A2A] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <step.icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-serif text-base text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#1C1C1C] flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                <IconCheck className="w-3.5 h-3.5 text-white" />
                <span>Deterministic step</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
