"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { IconArrowRight, IconBrandGoogle, IconShieldCheck } from "@tabler/icons-react";

export function BottomCTA() {
  const router = useRouter();

  return (
    <section className="w-full py-24 border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] relative overflow-hidden text-center">
      {/* Ambient background glow & mesh */}
      <div className="ambient-mesh pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 space-y-5">
        <Badge variant="brown" size="sm">
          Get Started in 60 Seconds
        </Badge>

        <h2 className="text-title-1 text-[var(--text-primary)]">
          Ready to find your next{" "}
          <span className="gradient-text-brown">best customer?</span>
        </h2>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
          Stop wasting hours on manual prospecting lists. Let our AI Research Agent discover verified decision-makers and generate evidence-backed outreach today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
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
            onClick={() => router.push("/login")}
          >
            Sign In with Email
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6 pt-4 text-xs text-[var(--text-muted)] font-mono">
          <div className="flex items-center gap-1.5">
            <IconShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Free 10 AI Research Leads</span>
          </div>
          <span>•</span>
          <span>No Credit Card Required</span>
        </div>
      </div>
    </section>
  );
}
