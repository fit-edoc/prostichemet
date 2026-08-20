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
    <section id="features" className="w-full py-24 max-w-7xl mx-auto px-6">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="vintage" size="sm">
          Core Capabilities
        </Badge>
        <h2 className="text-title-1 text-[var(--text-primary)] mt-3">
          Built for quality, <span className="gradient-text-vintage">not email spam.</span>
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-3 leading-relaxed">
          Postrichment acts as your AI sales research department. We optimize for qualified opportunities, meetings, and revenue rather than blast volume.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Pillar 1 */}
        <GlassCard elevated className="flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent-vintage-light)] text-[var(--accent-vintage)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <IconBrain className="w-6 h-6" />
            </div>
            <h3 className="text-title-3 text-[var(--text-primary)] mb-3">
              RAG-Grounded ICP Engine
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              Our AI retrieves real B2B market intelligence and benchmarks from our vector knowledge base to define laser-focused target personas, company tiers, and exact pain points.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-muted)]">
            <span>✓ Embeddings + Market benchmarks</span>
          </div>
        </GlassCard>

        {/* Pillar 2 */}
        <GlassCard elevated className="flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent-vintage-light)] text-[var(--accent-vintage)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <IconRadar2 className="w-6 h-6" />
            </div>
            <h3 className="text-title-3 text-[var(--text-primary)] mb-3">
              Autonomous Signal Detection
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              Never reach out cold without a trigger. Our agents detect hiring postings (e.g. SDRs), recent funding rounds, tech stack adoption, and new product launches in real time.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-muted)]">
            <span>✓ Real-world hiring & funding triggers</span>
          </div>
        </GlassCard>

        {/* Pillar 3 */}
        <GlassCard elevated className="flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent-vintage-light)] text-[var(--accent-vintage)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <IconFileCertificate className="w-6 h-6" />
            </div>
            <h3 className="text-title-3 text-[var(--text-primary)] mb-3">
              Evidence-Backed Lead Scoring
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              For every single prospect, the system computes a 0–100 Fit Score and provides clear textual evidence and quotes explaining exactly why they need your solution.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-muted)]">
            <span>✓ Verifiable quotes & fit reasoning</span>
          </div>
        </GlassCard>
      </div>

      {/* 2-Column Deep Dive Highlight */}
      <div id="evidence" className="grid md:grid-cols-2 gap-8 items-center mt-16 p-8 md:p-12 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
        <div className="space-y-4">
          <Badge variant="neutral" size="sm">
            Evidence vs Spam
          </Badge>
          <h3 className="text-title-2 text-[var(--text-primary)]">
            Why evidence-first outreach beats 10,000 generic emails.
          </h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Standard sales databases sell stale lists with 40% bounce rates. Postrichment uses multi-agent research to inspect candidate websites, verified decision-makers, and actual business needs before writing a single word.
          </p>
          <div className="space-y-2 pt-2 text-xs font-medium text-[var(--text-primary)]">
            <div className="flex items-center gap-2">
              <IconShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Human approval required before any campaign execution</span>
            </div>
            <div className="flex items-center gap-2">
              <IconMailCheck className="w-4 h-4 text-emerald-500" />
              <span>Tailored copywriting frameworks (PAS, Observation-Insight)</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-mono text-xs space-y-3">
          <div className="text-[var(--accent-vintage)] font-bold">// Evidence Output Schema</div>
          <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
            <span className="text-[var(--text-primary)] font-semibold">"trigger":</span> "Series A funding closed ($4.2M), expanding outbound SDR team"
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
            <span className="text-[var(--text-primary)] font-semibold">"painPointMatch":</span> "Ramp time for new SDRs is 90+ days without automated research"
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
            <span className="text-[var(--text-primary)] font-semibold">"recommendedHook":</span> "Reference Series A & offer 5-min look at automated SDR research agent"
          </div>
        </div>
      </div>
    </section>
  );
}
