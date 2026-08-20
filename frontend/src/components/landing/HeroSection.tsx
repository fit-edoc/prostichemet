"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { useMagnetic } from "../../hooks/useMagnetic";
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
  const magneticButtonRef = useMagnetic(0.2);

  return (
    <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 flex flex-col items-center text-center overflow-hidden bg-animated-grid">
      {/* Ambient background mesh & radial glow */}
      <div className="ambient-mesh pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-radial-gradient pointer-events-none -z-10" />

      {/* Pill Badge (Stagger 1) */}
      <div className="mb-6 inline-flex items-center animate-hero-reveal stagger-1">
        <Badge variant="vintage" size="md" dot>
          AI GTM Research & Lead Enrichment SaaS
        </Badge>
      </div>

      {/* Main Headline (Text Mask Reveal + Stagger 2) */}
      <h1 className="text-display max-w-4xl mx-auto text-[var(--text-primary)] mb-6 font-semibold tracking-tight animate-hero-reveal stagger-2">
        Find high-value B2B buyers{" "}
        <span className="gradient-text-vintage block sm:inline">
          backed by verifiable evidence.
        </span>
      </h1>

      {/* Subtitle (Stagger 3) */}
      <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed font-normal animate-hero-reveal stagger-3">
        Describe what you sell. Our RAG Research Agent discovers ideal companies, verifies decision-makers, detects growth signals, and drafts converting outreach.
      </p>

      {/* Interactive Action Buttons with Magnetic Pull (Stagger 4) */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-14 animate-hero-reveal stagger-4">
        <div ref={magneticButtonRef as any}>
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push("/login")}
            rightIcon={<IconArrowRight className="w-5 h-5" />}
          >
            Start Free Research
          </Button>
        </div>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            document.getElementById("interactive-demo")?.scrollIntoView({ behavior: "smooth" });
          }}
          leftIcon={<IconSearch className="w-4 h-4 text-[var(--text-muted)]" />}
        >
          See Live Demo
        </Button>
      </div>

      {/* Key Guarantees (Stagger 5) */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-[var(--text-secondary)] pt-4 border-t border-[var(--border-subtle)] max-w-2xl mx-auto animate-hero-reveal stagger-5">
        <div className="flex items-center gap-2">
          <IconShieldCheck className="w-4 h-4 text-[var(--accent-vintage)]" />
          <span>Zero Hallucinations</span>
        </div>
        <div className="flex items-center gap-2">
          <IconCheck className="w-4 h-4 text-emerald-500" />
          <span>RAG Vector Grounded</span>
        </div>
        <div className="flex items-center gap-2">
          <IconTargetArrow className="w-4 h-4 text-[var(--accent-vintage)]" />
          <span>Evidence-Backed Scoring</span>
        </div>
      </div>
    </section>
  );
}
