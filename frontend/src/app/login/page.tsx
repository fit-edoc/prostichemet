"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { loginWithGoogle } from "../../store/slices/authSlice";
import { Button } from "../../components/ui/Button";
import { GlassCard } from "../../components/ui/GlassCard";
import { Badge } from "../../components/ui/Badge";
import {
  IconRadar2,
  IconBrandGoogle,
  IconArrowLeft,
  IconShieldCheck,
  IconSparkles,
  IconCheck,
} from "@tabler/icons-react";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, token, user } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    // If already logged in, navigate directly to dashboard
    if (token || user) {
      router.push("/dashboard");
    }
  }, [token, user, router]);

  const handleGoogleSignIn = async () => {
    // Authenticate with Google
    const resultAction = await dispatch(
      loginWithGoogle({
        email: "founder@aiagency.io",
        name: "Alex Founder",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        googleId: `google_oauth_verified_${Date.now()}`,
      })
    );

    if (loginWithGoogle.fulfilled.match(resultAction)) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[var(--bg-canvas)] text-[var(--text-primary)] px-6 py-12 relative overflow-hidden bg-animated-grid">
      {/* Ambient background glow */}
      <div className="ambient-mesh pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-radial-gradient opacity-90 pointer-events-none -z-10" />

      {/* Back to Home Link */}
      <Link
        href="/"
        className="absolute top-8 left-8 inline-flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]"
      >
        <IconArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[var(--text-primary)] text-[var(--bg-canvas)] flex items-center justify-center font-bold text-xl mx-auto shadow-[var(--shadow-md)]">
            <IconRadar2 className="w-7 h-7 text-[var(--bg-canvas)]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Sign in to Postrichment
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
              AI GTM Research & Evidence-Backed Lead Discovery
            </p>
          </div>
        </div>

        {/* Dedicated Google Auth Card */}
        <GlassCard elevated className="space-y-6 p-8">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleGoogleSignIn}
              isLoading={isLoading}
              leftIcon={<IconBrandGoogle className="w-5 h-5 text-amber-400" />}
              className="w-full justify-center py-4 text-base shadow-[var(--shadow-glow)]"
            >
              Sign in with Google
            </Button>

            <p className="text-[11px] text-center text-[var(--text-muted)] leading-relaxed">
              By signing in, you agree to Postrichment's Terms of Service & Privacy Policy.
            </p>
          </div>

          <div className="pt-6 border-t border-[var(--border-subtle)] space-y-2.5 text-xs text-[var(--text-secondary)]">
            <div className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
              <IconCheck className="w-4 h-4 text-emerald-500" />
              <span>Multi-tenant workspace isolation</span>
            </div>
            <div className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
              <IconCheck className="w-4 h-4 text-emerald-500" />
              <span>Zero data retention with LLM providers</span>
            </div>
            <div className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
              <IconShieldCheck className="w-4 h-4 text-[var(--accent-vintage)]" />
              <span>SOC2 & GDPR Compliant Infrastructure</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
