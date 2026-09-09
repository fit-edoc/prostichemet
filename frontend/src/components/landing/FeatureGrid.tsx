import * as React from "react";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import {
  IconBrain,
  IconRadar2,
  IconFileCertificate,
  IconTrendingUp,
  IconMailCheck,
  IconShieldCheck,
} from "@tabler/icons-react";

export function FeatureGrid() {
  return (
    <section id="features" className="w-full py-20 max-w-7xl mx-auto px-6">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <Badge variant="brown" size="sm">
          Core Capabilities
        </Badge>
        <h2 className="text-title-1 text-[var(--text-primary)] mt-3">
          Built for quality, <span className="gradient-text-brown">not spray-and-pray spam.</span>
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-3 leading-relaxed">
          Postrichment acts as your AI sales research department. We optimize for high-fit qualified opportunities, meetings, and revenue rather than blast volume.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Pillar 1 */}
        <GlassCard elevated className="flex flex-col justify-between group">
          <div>
            <div className="w-11 h-11 rounded-xl bg-[var(--accent-brown-light)] text-[var(--accent-brown)] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <IconBrain className="w-5 h-5" />
            </div>
            <h3 className="text-title-3 text-[var(--text-primary)] mb-2.5">
              RAG-Grounded ICP Engine
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              Our AI retrieves real B2B market intelligence and benchmarks from our vector knowledge base to define laser-focused target personas, company tiers, and exact pain points.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
            <span>✓ Semantic Vector Search + Frameworks</span>
          </div>
        </GlassCard>

        {/* Pillar 2 */}
        <GlassCard elevated className="flex flex-col justify-between group">
          <div>
            <div className="w-11 h-11 rounded-xl bg-[var(--accent-brown-light)] text-[var(--accent-brown)] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <IconRadar2 className="w-5 h-5" />
            </div>
            <h3 className="text-title-3 text-[var(--text-primary)] mb-2.5">
              Autonomous Signal Detection
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              Never reach out cold without a trigger. Our agents detect hiring postings (e.g. SDRs), recent funding rounds, tech stack adoption, and new product launches in real time.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
            <span>✓ Real-time hiring & funding triggers</span>
          </div>
        </GlassCard>

        {/* Pillar 3 */}
        <GlassCard elevated className="flex flex-col justify-between group">
          <div>
            <div className="w-11 h-11 rounded-xl bg-[var(--accent-brown-light)] text-[var(--accent-brown)] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <IconMailCheck className="w-5 h-5" />
            </div>
            <h3 className="text-title-3 text-[var(--text-primary)] mb-2.5">
              Evidence-Backed Copywriting
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              Generate concise, bespoke emails using PAS (Problem-Agitate-Solve) and Observation-Insight-Value frameworks that cite verifiable signals and avoid generic AI templates.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
            <span>✓ PAS + Observation-Insight Frameworks</span>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
