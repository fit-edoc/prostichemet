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
    <section id="workflow" className="w-full py-24 bg-white border-y border-zinc-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono uppercase tracking-wider text-zinc-700 mb-4 shadow-sm">
            <IconRoute className="w-3.5 h-3.5 text-zinc-900" />
            <span>End-to-End Orchestration</span>
          </div>
          <h2 className="font-inter font-bold text-3xl sm:text-5xl text-zinc-950 tracking-tight leading-tight">
            From company description to{" "}
            <span className="italic font-normal text-zinc-500">verified revenue pipeline.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-md bg-zinc-50/70 border border-zinc-200 hover:border-zinc-300 hover:bg-white transition-all flex flex-col justify-between group shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-inter font-bold text-zinc-950">
                    {step.num}
                  </span>
                  <div className="w-9 h-9 rounded-md bg-white border border-zinc-200 text-zinc-900 flex items-center justify-center group-hover:scale-105 transition-transform shadow-[0px_1px_2px_0px_rgba(0,0,0,0.06)]">
                    <step.icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-inter font-bold text-base text-zinc-950 mb-2">
                  {step.title}
                </h3>
                <p className="font-inter text-xs text-zinc-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-zinc-200 flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                <IconCheck className="w-3.5 h-3.5 text-zinc-900" />
                <span>Deterministic step</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
