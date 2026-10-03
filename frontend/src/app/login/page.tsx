"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { loginWithGoogle } from "../../store/slices/authSlice";
import { fetchProfiles } from "../../store/slices/profileSlice";
import {
  IconRadar2,
  IconArrowLeft,
  IconShieldCheck,
  IconSparkles,
  IconCheck,
  IconLoader2,
  IconLock,
  IconTrendingUp,
  IconSearch,
  IconUsers,
} from "@tabler/icons-react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: (notification?: any) => void;
        };
      };
    };
  }
}

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: session, status: sessionStatus } = useSession();
  const { isLoading: isAuthLoading, error: reduxError, token, user } = useAppSelector((state) => state.auth);

  const [isProcessing, setIsProcessing] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const hasAttemptedSessionSync = React.useRef(false);

  const GOOGLE_CLIENT_ID =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    "529660410268-901jul4s7dr715pvokkt2qbpn7ac83jl.apps.googleusercontent.com";

  // Check profiles and route to dashboard or onboarding
  const routeUserAfterLogin = React.useCallback(async () => {
    setStatusMessage("Checking workspace & business profiles...");
    try {
      const profileAction = await dispatch(fetchProfiles());
      if (fetchProfiles.fulfilled.match(profileAction) && profileAction.payload && profileAction.payload.length > 0) {
        setStatusMessage("Profile found! Navigating to Dashboard...");
        router.push("/dashboard");
      } else {
        setStatusMessage("New account detected! Navigating to Business Profile setup...");
        router.push("/onboarding");
      }
    } catch {
      router.push("/onboarding");
    }
  }, [dispatch, router]);

  // Guard redirect if already authenticated
  const hasRoutedRef = React.useRef(false);
  React.useEffect(() => {
    if (token && user && !hasRoutedRef.current) {
      hasRoutedRef.current = true;
      routeUserAfterLogin();
    }
  }, [token, user, routeUserAfterLogin]);

  // Handle Google Credential Response from Google One Tap (if available)
  const handleGoogleCredentialResponse = React.useCallback(
    async (response: { credential: string }) => {
      if (!response.credential) return;

      setIsProcessing(true);
      setErrorMessage(null);
      setStatusMessage("Authenticating with Google...");

      try {
        const resultAction = await dispatch(
          loginWithGoogle({
            idToken: response.credential,
          })
        );

        if (loginWithGoogle.fulfilled.match(resultAction)) {
          await routeUserAfterLogin();
        } else {
          setErrorMessage(
            (resultAction.payload as string) || "Google authentication failed. Please try again."
          );
          setIsProcessing(false);
          setStatusMessage(null);
        }
      } catch (err: any) {
        setErrorMessage(err?.message || "An unexpected error occurred during Google sign-in.");
        setIsProcessing(false);
        setStatusMessage(null);
      }
    },
    [dispatch, routeUserAfterLogin]
  );

  // Sync NextAuth session with Backend & Redux
  React.useEffect(() => {
    if (sessionStatus === "authenticated" && session?.user && !token && !hasAttemptedSessionSync.current) {
      hasAttemptedSessionSync.current = true;
      setIsProcessing(true);
      setStatusMessage("Syncing Google account with workspace...");

      const sessionData = session as any;
      dispatch(
        loginWithGoogle({
          idToken: sessionData.idToken,
          email: session.user.email || undefined,
          name: session.user.name || undefined,
          avatarUrl: session.user.image || undefined,
          googleId: sessionData.googleId || undefined,
        })
      ).then(async (resultAction) => {
        if (loginWithGoogle.fulfilled.match(resultAction)) {
          await routeUserAfterLogin();
        } else {
          setErrorMessage(
            (resultAction.payload as string) || "Failed to create or link your workspace session."
          );
          setIsProcessing(false);
          setStatusMessage(null);
        }
      });
    }
  }, [sessionStatus, session, token, dispatch, routeUserAfterLogin]);

  // Optional background Google One-Tap initialisation (NO redundant in-page button)
  React.useEffect(() => {
    if (typeof window === "undefined" || token) return;

    const scriptId = "google-gsi-client";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    const initializeGsi = () => {
      if (window.google?.accounts?.id && GOOGLE_CLIENT_ID) {
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });
          // Do NOT call renderButton here to ensure strictly ONLY ONE button exists
          window.google.accounts.id.prompt();
        } catch (e) {
          console.warn("GIS initialization notice:", e);
        }
      }
    };

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGsi;
      document.body.appendChild(script);
    } else {
      initializeGsi();
    }
  }, [GOOGLE_CLIENT_ID, handleGoogleCredentialResponse, token]);

  // Google sign-in trigger on the single Google Login button
  const handleGoogleSignInClick = async () => {
    try {
      setErrorMessage(null);
      setIsProcessing(true);
      setStatusMessage("Connecting to Google Sign-In...");

      await signIn("google", {
        callbackUrl: "/login",
      });
    } catch (err: any) {
      console.warn("Google sign-in error:", err?.message);
      setErrorMessage(err?.message || "Failed to connect to Google Sign-In. Please try again.");
      setIsProcessing(false);
      setStatusMessage(null);
    }
  };

  const isLoading = isAuthLoading || isProcessing || sessionStatus === "loading";

  return (
    <div
      className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-[#FAFAFA] text-[#09090B] font-inter selection:bg-zinc-900 selection:text-white"
      style={{ fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif" }}
    >
      {/* ========================================================================= */}
      {/* LEFT DIV: Dark Gradient Animation + High-Tech Brand Showcase             */}
      {/* ========================================================================= */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-[#09090B] p-12 xl:p-16 text-white border-r border-zinc-800">
        {/* Animated Dark Gradient Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#09090B] via-[#0F0D16] to-[#0A0D18] animate-dark-gradient-shift pointer-events-none" />

        {/* Floating Glowing Orbs */}
        <div className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full bg-violet-600/20 blur-[120px] pointer-events-none animate-dark-orb-1" />
        <div className="absolute bottom-10 right-0 w-[520px] h-[520px] rounded-full bg-amber-500/15 blur-[140px] pointer-events-none animate-dark-orb-2" />
        <div className="absolute top-1/2 left-1/3 w-[360px] h-[360px] rounded-full bg-indigo-500/15 blur-[100px] pointer-events-none animate-dark-orb-3" />

        {/* Subtle Architectural Dot Grid Overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Content Container (z-10 above animated gradient) */}
        <div className="relative z-10 flex flex-col justify-between h-full space-y-12">
          {/* Top Brand Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-zinc-950 flex items-center justify-center font-bold shadow-lg shadow-white/10 ring-1 ring-white/20">
              <IconRadar2 className="w-5 h-5 text-zinc-950" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white">Postrichment</span>
              <span className="ml-2.5 text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/15">
                Autonomous GTM
              </span>
            </div>
          </div>

          {/* Centerpiece Hero Statement & Animated Signal Monitor Card */}
          <div className="space-y-8 max-w-xl">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-zinc-300 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-medium">Live Evidence Engine Active</span>
              </div>
              <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Turn unverified domains into verified, signal-backed pipeline.
              </h1>
              <p className="text-sm xl:text-base text-zinc-400 leading-relaxed font-normal">
                Postrichment autonomously monitors real-time buyer intent, hiring surges, and tech stack shifts to deliver high-converting B2B accounts.
              </p>
            </div>

            {/* Simulated Live Signal Terminal Card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 shadow-2xl space-y-3.5">
              <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <IconSparkles className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-zinc-200">Real-Time Signal Detection</span>
                </div>
                <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Streaming
                </span>
              </div>

              {/* Feed Item 1 */}
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-colors">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                  <IconTrendingUp className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-white truncate">Acme Systems Inc.</p>
                    <span className="text-[10px] text-zinc-500 font-mono">1m ago</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate">Hired VP Sales + 6 AE roles posted on LinkedIn</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  98% Fit
                </span>
              </div>

              {/* Feed Item 2 */}
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-colors">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <IconSearch className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-white truncate">FinScale Cloud</p>
                    <span className="text-[10px] text-zinc-500 font-mono">4m ago</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate">Adopting vector database for outbound pipeline</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                  Intent Surge
                </span>
              </div>

              {/* Feed Item 3 */}
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-colors">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <IconUsers className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-white truncate">120 Verified Leads</p>
                    <span className="text-[10px] text-zinc-500 font-mono">Just now</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate">Enriched with verified work emails & ground evidence</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-300 border border-white/15 shrink-0">
                  Exported
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Trust & Accuracy Metrics */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
            <div>
              <span className="block text-lg font-bold text-white tracking-tight">10x</span>
              <span className="text-[11px] text-zinc-400">Pipeline Velocity</span>
            </div>
            <div className="h-7 w-[1px] bg-white/10" />
            <div>
              <span className="block text-lg font-bold text-white tracking-tight">99.4%</span>
              <span className="text-[11px] text-zinc-400">Deliverability</span>
            </div>
            <div className="h-7 w-[1px] bg-white/10" />
            <div>
              <span className="block text-lg font-bold text-white tracking-tight">&lt; 30s</span>
              <span className="text-[11px] text-zinc-400">Evidence Grounding</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT DIV: Clean Login Section (Only ONE Google Button + Inter font)       */}
      {/* ========================================================================= */}
      <div className="flex flex-col justify-between min-h-screen p-6 sm:p-10 lg:p-16 relative bg-[#FAFAFA]">
        {/* Top Bar Navigation */}
        <div className="flex items-center justify-between w-full">
          {/* Mobile brand mark (visible only on mobile) */}
          <div className="flex lg:hidden items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-bold shadow-sm">
              <IconRadar2 className="w-4 h-4" />
            </div>
            <span className="font-bold text-base tracking-tight text-zinc-950">Postrichment</span>
          </div>

          <div className="hidden lg:block" />

          {/* Back to Home Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-600 hover:text-zinc-950 transition-colors px-3 py-2 rounded-xl bg-white border border-zinc-200/80 shadow-xs hover:border-zinc-300"
          >
            <IconArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Centered Login Card */}
        <div className="w-full max-w-md mx-auto my-auto py-8">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 text-white flex items-center justify-center mx-auto shadow-md shadow-zinc-950/10 mb-3">
                <IconRadar2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
                Welcome to Postrichment
              </h2>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-xs mx-auto">
                Sign in with your verified Google account to access your autonomous GTM workspace and enrichment pipeline.
              </p>
            </div>

            {/* Error Message Notice */}
            {(errorMessage || reduxError) && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                <IconLock className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span className="leading-snug">{errorMessage || reduxError}</span>
              </div>
            )}

            {/* Status Processing Indicator */}
            {statusMessage && (
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-700 text-xs flex items-center gap-2.5">
                <IconLoader2 className="w-4 h-4 animate-spin shrink-0 text-zinc-900" />
                <span className="font-medium">{statusMessage}</span>
              </div>
            )}

            {/* =================================================================== */}
            {/* STRICTLY ONLY ONE GOOGLE LOGIN BUTTON                               */}
            {/* =================================================================== */}
            <div className="pt-2">
              <button
                type="button"
                id="google-primary-login-btn"
                onClick={handleGoogleSignInClick}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-white border border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50 active:scale-[0.99] text-zinc-800 text-sm font-semibold transition-all shadow-xs hover:shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <IconLoader2 className="w-5 h-5 animate-spin text-zinc-700" />
                    <span>Connecting to Google...</span>
                  </>
                ) : (
                  <>
                    {/* Official Google SVG Icon */}
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
            </div>

            {/* Trust and Security Highlights */}
            <div className="pt-4 border-t border-zinc-100 space-y-2.5 text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <IconCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant workspace access — no password required</span>
              </div>
              <div className="flex items-center gap-2">
                <IconShieldCheck className="w-4 h-4 text-zinc-700 shrink-0" />
                <span>Enterprise OAuth 2.0 token encryption</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer legal notes */}
        <div className="w-full max-w-md mx-auto text-center text-[11px] text-zinc-400 py-2">
          By signing in, you agree to Postrichment&apos;s{" "}
          <Link href="/terms" className="underline hover:text-zinc-600 transition-colors">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-zinc-600 transition-colors">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
