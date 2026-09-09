import * as React from "react";
import {
  IconBrandNextjs,
  IconBrandVercel,
  IconBrandStripe,
  IconBrandSupabase,
  IconBrandOpenai,
  IconBrandTailwind,
  IconBrandFigma,
} from "@tabler/icons-react";

export function LogoMarquee() {
  const logos = [
    { name: "ScaleUp.io", icon: IconBrandVercel },
    { name: "TechFlow AI", icon: IconBrandNextjs },
    { name: "DataPulse", icon: IconBrandOpenai },
    { name: "AgencyZero", icon: IconBrandStripe },
    { name: "GrowthStack", icon: IconBrandSupabase },
    { name: "CloudScale", icon: IconBrandTailwind },
    { name: "HyperDev", icon: IconBrandFigma },
  ];

  return (
    <div className="w-full py-8 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-4 text-center">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
          Powering outbound growth for 500+ B2B agencies & revenue teams
        </span>
      </div>

      <div className="marquee-container">
        {/* Track 1 */}
        <div className="marquee-content">
          {logos.map((item, idx) => (
            <div
              key={`logo-1-${idx}`}
              className="flex items-center gap-2.5 px-5 py-2 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-medium)] transition-colors cursor-default shadow-[var(--shadow-xs)]"
            >
              <item.icon className="w-4 h-4 text-[var(--accent-brown)]" />
              <span className="text-xs font-semibold tracking-tight">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Track 2 (Duplicate for seamless infinite scroll) */}
        <div className="marquee-content" aria-hidden="true">
          {logos.map((item, idx) => (
            <div
              key={`logo-2-${idx}`}
              className="flex items-center gap-2.5 px-5 py-2 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-medium)] transition-colors cursor-default shadow-[var(--shadow-xs)]"
            >
              <item.icon className="w-4 h-4 text-[var(--accent-brown)]" />
              <span className="text-xs font-semibold tracking-tight">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
