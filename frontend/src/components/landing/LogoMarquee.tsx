"use client";

import * as React from "react";
import {
  FileText,
  Briefcase,
  Buildings,
  EnvelopeSimple,
  Cpu,
  Users,
  Newspaper,
  Database,
  Sparkle,
} from "@phosphor-icons/react";

export function LogoMarquee() {
  const signalSources = [
    {
      name: "SEC Filings",
      detail: "Form D & Funding Triggers",
      icon: FileText,
    },
    {
      name: "Career & ATS Portals",
      detail: "Hiring Surges & Roles",
      icon: Briefcase,
    },
    {
      name: "Corporate Registries",
      detail: "Company & Domain Records",
      icon: Buildings,
    },
    {
      name: "DNS & MX Protocol",
      detail: "SMTP Handshake Validation",
      icon: EnvelopeSimple,
    },
    {
      name: "Tech Stack Radar",
      detail: "Infrastructure Changes",
      icon: Cpu,
    },
    {
      name: "Executive Signals",
      detail: "Decision Maker Transitions",
      icon: Users,
    },
    {
      name: "Public Press & News",
      detail: "Expansion Announcements",
      icon: Newspaper,
    },
    {
      name: "RAG Vector Index",
      detail: "Deterministic Grounding",
      icon: Database,
    },
  ];

  return (
    <div className="w-full py-7 border-y border-neutral-800/80 bg-zinc-950/80 relative overflow-hidden">
      {/* Edge gradient masks for seamless fade */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

      {/* Header editorial note */}
      <div className="max-w-6xl mx-auto px-4 mb-3.5 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs text-neutral-400 font-normal tracking-tight">
          <Sparkle className="w-3.5 h-3.5 text-neutral-300" />
          <span>Multi-source public intelligence & signal verification channels</span>
        </div>
      </div>

      {/* Marquee Track with authentic signal channels */}
      <div className="marquee-container relative z-10">
        <div className="marquee-content py-1.5 flex items-center">
          {signalSources.map((source, idx) => {
            const Icon = source.icon;
            return (
              <div
                key={`s1-${idx}`}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 mx-2 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-neutral-300 hover:text-white hover:border-neutral-700/80 transition-colors shrink-0 cursor-default"
              >
                <div className="w-5 h-5 rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-neutral-300">
                  <Icon className="w-3 h-3 text-neutral-200" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-medium tracking-tight text-white leading-tight">
                    {source.name}
                  </span>
                  <span className="text-[10px] text-neutral-400 tracking-tight leading-tight">
                    {source.detail}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="marquee-content py-1.5 flex items-center" aria-hidden="true">
          {signalSources.map((source, idx) => {
            const Icon = source.icon;
            return (
              <div
                key={`s2-${idx}`}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 mx-2 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-neutral-300 hover:text-white hover:border-neutral-700/80 transition-colors shrink-0 cursor-default"
              >
                <div className="w-5 h-5 rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-neutral-300">
                  <Icon className="w-3 h-3 text-neutral-200" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-medium tracking-tight text-white leading-tight">
                    {source.name}
                  </span>
                  <span className="text-[10px] text-neutral-400 tracking-tight leading-tight">
                    {source.detail}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
