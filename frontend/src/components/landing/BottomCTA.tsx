"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { useMagnetic } from "../../hooks/useMagnetic";
import { IconArrowRight, IconBrandGoogle, IconShieldCheck } from "@tabler/icons-react";

export function BottomCTA() {
  const router = useRouter();
  const magneticRef = useMagnetic(0.2);

  return (
    <section className="w-full py-28 border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] relative overflow-hidden text-center reveal-init">
      {/* Ambient background glow & mesh */}
      <div className="ambient-mesh pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient opacity-75 pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto px-6 space-y-6">
        <Badge variant="vintage" size="sm">
          Get Started in 60 Seconds
        </Badge>

        <h2 className="text-title-1 text-[var(--text-primary)]">
          Ready to find your next{" "}
          <span className="gradient-text-vintage">best customer?</span>
        </h2>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
          Stop wasting hours on manual prospecting lists. Let our AI Research Agent discover verified decision-makers and generate evidence-backed outreach today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <div ref={magneticRef as any}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push("/login")}
              leftIcon={<IconBrandGoogle className="w-5 h-5" />}
              rightIcon={<IconArrowRight className="w-4 h-4" />}
            >
              Continue with Google
            </Button>
          </div>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => router.push("/login")}
          >
            Sign In with Email
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6 pt-6 text-xs text-[var(--text-muted)] font-mono">
          <div className="flex items-center gap-1.5">
            <IconShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Free 10 AI Research Leads</span>
          </div>
          <span>•</span>
          <span>No Credit Card Required</span>
        </div>
      </div>
    </section>
  );
}
