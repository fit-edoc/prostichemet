"use client";

import * as React from "react";
import {
  IconBrandNextjs,
  IconBrandVercel,
  IconBrandStripe,
  IconBrandSupabase,
  IconBrandOpenai,
  IconBrandTailwind,
  IconBrandFigma,
  IconBrandGithub,
  IconLayersLinked,
} from "@tabler/icons-react";

export function LogoMarquee() {
  const logos = [
    { name: "ScaleUp.io", icon: IconBrandVercel, tag: "SERIES B" },
    { name: "TechFlow AI", icon: IconBrandNextjs, tag: "AGENCY" },
    { name: "DataPulse", icon: IconBrandOpenai, tag: "ENTERPRISE" },
    { name: "AgencyZero", icon: IconBrandStripe, tag: "REV-OPS" },
    { name: "GrowthStack", icon: IconBrandSupabase, tag: "FINTECH" },
    { name: "CloudScale", icon: IconBrandTailwind, tag: "SAAS" },
    { name: "HyperDev", icon: IconBrandFigma, tag: "PRODUCT" },
    { name: "Synthetix", icon: IconBrandGithub, tag: "AI CORE" },
  ];

  return (
    <div className="w-full py-10 border-y border-zinc-200 bg-zinc-50/70 relative overflow-hidden">
      {/* Carbon pattern line subtle overlay */}
      <div className="absolute inset-0 opacity-40 carbon-gutter pointer-events-none" />

      {/* Edge gradient masks for seamless fade */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Header telemetry text */}
      <div className="max-w-7xl mx-auto px-6 mb-5 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-zinc-200 text-[10px] font-mono tracking-widest uppercase text-zinc-700 shadow-sm">
          <IconLayersLinked className="w-3.5 h-3.5 text-zinc-900" />
          <span>CONNECTED TO 500+ OUTBOUND ENGINES & DATA PLATFORMS</span>
        </div>
      </div>

      {/* Continuous Marquee Track */}
      <div className="marquee-container relative z-10">
        {/* Track 1 */}
        <div className="marquee-content gap-4 py-1">
          {logos.map((item, idx) => (
            <div
              key={`logo-1-${idx}`}
              className="flex items-center gap-3 px-4.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-800 hover:text-black hover:border-zinc-400 hover:bg-zinc-50 transition-all cursor-default shadow-sm group shrink-0"
            >
              <item.icon className="w-4 h-4 text-zinc-900 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-inter font-medium tracking-tight text-zinc-900">
                {item.name}
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">
                {item.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Track 2 (Seamless loop) */}
        <div className="marquee-content gap-4 py-1" aria-hidden="true">
          {logos.map((item, idx) => (
            <div
              key={`logo-2-${idx}`}
              className="flex items-center gap-3 px-4.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-800 hover:text-black hover:border-zinc-400 hover:bg-zinc-50 transition-all cursor-default shadow-sm group shrink-0"
            >
              <item.icon className="w-4 h-4 text-zinc-900 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-inter font-medium tracking-tight text-zinc-900">
                {item.name}
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
