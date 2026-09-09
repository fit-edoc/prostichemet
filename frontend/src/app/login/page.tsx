"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { loginWithGoogle } from "../../store/slices/authSlice";
import { fetchProfiles } from "../../store/slices/profileSlice";
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
  IconLoader2,
  IconBolt,
  IconLock,
} from "@tabler/icons-react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: (notification?: any) => void;
          renderButton: (parent: HTMLElement, options: any) => void;
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

  // If already logged in in Redux / local storage
  React.useEffect(() => {
    if (token && user) {
      routeUserAfterLogin();
    }
  }, [token, user, routeUserAfterLogin]);

  // Handle Google Credential Response from Google One Tap / GIS
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

  // Load Google Identity Services (GIS) Script for One Tap & Native Button
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

          const gisContainer = document.getElementById("google-gis-btn-container");
          if (gisContainer) {
            gisContainer.innerHTML = "";
            window.google.accounts.id.renderButton(gisContainer, {
              theme: "outline",
              size: "large",
              type: "standard",
              shape: "rectangular",
              text: "continue_with",
              logo_alignment: "left",
              width: 320,
            });
          }
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

  // NextAuth OAuth Popup / Redirect Sign-in trigger
  const handleGoogleSignInClick = async () => {
    try {
      setErrorMessage(null);
      setIsProcessing(true);
      setStatusMessage("Connecting to Google Sign-In...");

      // Try NextAuth Google sign in
      const res = await signIn("google", {
        callbackUrl: "/login",
        redirect: false,
      });

      if (res?.error) {
        // If popup or direct flow fails, trigger Google GIS prompt as fallback
        if (window.google?.accounts?.id) {
          window.google.accounts.id.prompt();
        } else {
          // Standard redirect fallback
          await signIn("google", { callbackUrl: "/login" });
        }
      } else if (res?.url) {
        window.location.href = res.url;
      }
    } catch (err: any) {
      console.warn("Google OAuth trigger notice:", err?.message);
      if (window.google?.accounts?.id) {
        window.google.accounts.id.prompt();
      } else {
        await signIn("google", { callbackUrl: "/login" });
      }
    }
  };

  const isLoading = isAuthLoading || isProcessing || sessionStatus === "loading";

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[var(--bg-canvas)] text-[var(--text-primary)] px-6 py-12 relative overflow-hidden bg-subtle-grid">
      {/* Ambient background glow */}
      <div className="ambient-mesh pointer-events-none" />

      {/* Back to Home Link */}
      <Link
        href="/"
        className="absolute top-8 left-8 inline-flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[var(--shadow-xs)]"
      >
        <IconArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2.5">
          <div className="w-14 h-14 rounded-2xl bg-[#20150F] text-[#FAF9F7] dark:bg-[#FAF9F7] dark:text-[#120D0A] flex items-center justify-center font-bold text-xl mx-auto shadow-[var(--shadow-md)]">
            <IconRadar2 className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Welcome to Postrichment
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-xs mx-auto">
              AI-Powered GTM Intelligence & Real-Time Evidence Lead Enrichment
            </p>
          </div>
        </div>

        {/* Dedicated Google Auth Card */}
        <GlassCard elevated className="space-y-6 p-8">
          {(errorMessage || reduxError) && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-start gap-2.5">
              <IconLock className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage || reduxError}</span>
            </div>
          )}

          {/* Status Notification */}
          {statusMessage && (
            <div className="p-3.5 rounded-xl bg-[var(--accent-brown-light)] border border-[var(--accent-brown)]/30 text-[var(--accent-brown)] text-xs flex items-center gap-2.5">
              <IconLoader2 className="w-4 h-4 animate-spin shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Value Props Badge */}
          <div className="flex items-center justify-center">
            <Badge variant="subtle" size="sm" className="gap-1.5 py-1 px-3">
              <IconSparkles className="w-3.5 h-3.5 text-[var(--accent-brown)]" />
              <span>Google Verified Sign-In</span>
            </Badge>
          </div>

          {/* Google Single Sign-On Actions */}
          <div className="space-y-4 flex flex-col items-center">
            {/* Primary Google Login Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleGoogleSignInClick}
              disabled={isLoading}
              isLoading={isLoading}
              leftIcon={
                !isLoading && (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                )
              }
              className="w-full justify-center py-3.5 text-sm font-medium shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all cursor-pointer"
            >
              {isLoading ? "Authenticating..." : "Continue with Google"}
            </Button>

            {/* Native GIS Google Button Target Container */}
            <div id="google-gis-btn-container" className="flex justify-center w-full min-h-[40px]" />
          </div>

          {/* Compliance & Security Trust Badges */}
          <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2 text-[11px] text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <IconCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Instant redirection to your GTM Workspace</span>
            </div>
            <div className="flex items-center gap-2">
              <IconShieldCheck className="w-3.5 h-3.5 text-[var(--accent-brown)] shrink-0" />
              <span>OAuth 2.0 Secure Token Verification</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
