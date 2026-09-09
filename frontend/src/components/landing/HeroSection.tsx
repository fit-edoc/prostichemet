"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import {
  IconArrowRight,
  IconCheck,
  IconShieldCheck,
  IconSearch,
  IconTargetArrow,
  IconSparkles,
} from "@tabler/icons-react";

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative w-full pt-32 pb-16 md:pt-38 md:pb-24 flex flex-col items-center text-center overflow-hidden bg-subtle-grid">
      {/* Ambient background glow */}
      <div className="ambient-mesh pointer-events-none" />

      {/* Pill Badge */}
      <div className="mb-5 inline-flex items-center animate-hero-reveal stagger-1">
        <Badge variant="brown" size="md" dot>
          AI GTM Research & Lead Enrichment SaaS
        </Badge>
      </div>

      {/* Main Headline */}
      <h1 className="text-display max-w-4xl mx-auto text-[var(--text-primary)] mb-5 font-bold tracking-tight animate-hero-reveal stagger-2">
        Find high-value B2B buyers{" "}
        <span className="gradient-text-brown block sm:inline">
          backed by verifiable evidence.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed font-normal animate-hero-reveal stagger-3">
        Describe what you sell. Our RAG Research Agent discovers ideal companies, verifies decision-makers, detects growth signals, and drafts converting outreach.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-12 animate-hero-reveal stagger-4">
        <Button
          variant="primary"
          size="lg"
          onClick={() => router.push("/login")}
          rightIcon={<IconArrowRight className="w-4 h-4" />}
          className="shadow-[var(--shadow-sm)]"
        >
          Start Free Research
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            document.getElementById("interactive-demo")?.scrollIntoView({ behavior: "smooth" });
          }}
          leftIcon={<IconSearch className="w-4 h-4 text-[var(--text-muted)]" />}
        >
          Explore Live Demo
        </Button>
      </div>

      {/* Key Guarantees */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-[var(--text-secondary)] pt-4 border-t border-[var(--border-subtle)] max-w-xl mx-auto">
        <div className="flex items-center gap-2">
          <IconShieldCheck className="w-4 h-4 text-[var(--accent-brown)]" />
          <span>Zero Hallucinations</span>
        </div>
        <div className="flex items-center gap-2">
          <IconCheck className="w-4 h-4 text-emerald-600" />
          <span>RAG Vector Grounded</span>
        </div>
        <div className="flex items-center gap-2">
          <IconTargetArrow className="w-4 h-4 text-[var(--accent-brown)]" />
          <span>Evidence-Backed Scoring</span>
        </div>
      </div>
    </section>
  );
}
