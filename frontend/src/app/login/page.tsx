"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { loginWithGoogle } from "../../store/slices/authSlice";
import { fetchProfiles } from "../../store/slices/profileSlice";
import {
  ArrowLeft,
  ShieldCheck,
  Sparkle,
  Check,
  CircleNotch,
  Lock,
  TrendUp,
  MagnifyingGlass,
  Users,
} from "@phosphor-icons/react";

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

  const routeUserAfterLogin = React.useCallback(async () => {
    setStatusMessage("Checking workspace profiles...");
    try {
      const profileAction = await dispatch(fetchProfiles());
      if (fetchProfiles.fulfilled.match(profileAction) && profileAction.payload && profileAction.payload.length > 0) {
        setStatusMessage("Profile loaded! Navigating to Dashboard...");
        router.push("/dashboard");
      } else {
        setStatusMessage("Navigating to Business Profile setup...");
        router.push("/onboarding");
      }
    } catch {
      router.push("/onboarding");
    }
  }, [dispatch, router]);

  const hasRoutedRef = React.useRef(false);
  React.useEffect(() => {
    if (token && user && !hasRoutedRef.current) {
      hasRoutedRef.current = true;
      routeUserAfterLogin();
    }
  }, [token, user, routeUserAfterLogin]);

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
            (resultAction.payload as string) || "Failed to link your workspace session."
          );
          setIsProcessing(false);
          setStatusMessage(null);
        }
      });
    }
  }, [sessionStatus, session, token, dispatch, routeUserAfterLogin]);

  const gsiInitializedRef = React.useRef(false);
  const handleCredentialResponseRef = React.useRef(handleGoogleCredentialResponse);
  handleCredentialResponseRef.current = handleGoogleCredentialResponse;

  React.useEffect(() => {
    if (typeof window === "undefined" || token) return;

    const initializeGsi = () => {
      if (window.google?.accounts?.id && GOOGLE_CLIENT_ID && !gsiInitializedRef.current) {
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: (res: { credential: string }) => {
              handleCredentialResponseRef.current(res);
            },
            auto_select: false,
            cancel_on_tap_outside: true,
            use_fedcm_for_prompt: false,
          });
          gsiInitializedRef.current = true;

          // Render official Google button into dedicated element if available
          const gsiContainer = document.getElementById("gsi-button-container");
          if (gsiContainer) {
            window.google.accounts.id.renderButton(gsiContainer, {
              type: "standard",
              shape: "rectangular",
              theme: "outline",
              text: "continue_with",
              size: "large",
              width: 320,
              logo_alignment: "left",
            });
          }
        } catch (e) {
          console.warn("GIS initialization notice:", e);
        }
      }
    };

    const scriptId = "google-gsi-client";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

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
  }, [GOOGLE_CLIENT_ID, token]);

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
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-[#FAFAFA] text-zinc-950 font-normal tracking-tight selection:bg-zinc-900 selection:text-white">
      {/* LEFT: Clean Editorial Brand Showcase */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-zinc-950 p-12 text-white border-r border-zinc-800">
        <div className="relative z-10 flex flex-col justify-between h-full space-y-12">
          {/* Top Brand Header with Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="Postrichly"
              width={26}
              height={26}
              className="w-6.5 h-6.5 rounded object-contain"
              priority
            />
            <span className="text-base font-normal tracking-tight text-white">Postrichly</span>
            <span className="bg-blue-700/10 text-blue-400 rounded-[2px] border-0 py-[2px] px-2 text-[10px] font-normal tracking-tight">
              Autonomous GTM
            </span>
          </Link>

          {/* Centerpiece Hero Statement */}
          <div className="space-y-6 max-w-lg">
            <div className="space-y-3">
              <span className="bg-green-700/10 text-green-400 rounded-[2px] border-0 py-[2px] px-2 text-[11px] font-normal tracking-tight inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Live Evidence Engine Active
              </span>
              <h1 className="text-3xl font-normal tracking-tight text-white leading-tight">
                Turn unverified domains into verified, signal-backed pipeline.
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal tracking-tight">
                Postrichly autonomously monitors real-time buyer intent, hiring surges, and tech stack shifts to deliver high-converting B2B accounts.
              </p>
            </div>

            {/* Live Signal Feed with Multi-color Badges */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-zinc-800">
                <div className="flex items-center gap-1.5">
                  <Sparkle className="w-3.5 h-3.5 text-zinc-300" />
                  <span className="text-zinc-200">Real-Time Signal Detection</span>
                </div>
                <span className="bg-green-700/10 text-green-400 rounded-[2px] border-0 py-[2px] px-2 text-[10px]">
                  Streaming
                </span>
              </div>

              {/* Feed Item 1 */}
              <div className="flex items-start gap-2.5 p-2 rounded bg-zinc-900/70 border border-zinc-800/80">
                <TrendUp className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-normal text-white truncate">Acme Systems Inc.</p>
                    <span className="text-[10px] text-zinc-500">1m ago</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate">Hired VP Sales + 6 AE roles posted</p>
                </div>
                <span className="bg-green-700/10 text-green-400 rounded-[2px] border-0 py-[2px] px-1.5 text-[10px] shrink-0">
                  98% Fit
                </span>
              </div>

              {/* Feed Item 2 */}
              <div className="flex items-start gap-2.5 p-2 rounded bg-zinc-900/70 border border-zinc-800/80">
                <MagnifyingGlass className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-normal text-white truncate">FinScale Cloud</p>
                    <span className="text-[10px] text-zinc-500">4m ago</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate">Adopting vector database for pipeline</p>
                </div>
                <span className="bg-amber-700/10 text-amber-400 rounded-[2px] border-0 py-[2px] px-1.5 text-[10px] shrink-0">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Metrics */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
            <div>
              <span className="block text-base font-normal text-white tracking-tight">3.2x</span>
              <span className="text-[11px] text-zinc-500">Pipeline Lift</span>
            </div>
            <div>
              <span className="block text-base font-normal text-white tracking-tight">99.4%</span>
              <span className="text-[11px] text-zinc-500">Deliverability</span>
            </div>
            <div>
              <span className="block text-base font-normal text-white tracking-tight">&lt; 30s</span>
              <span className="text-[11px] text-zinc-500">Evidence Grounding</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Editorial Login Section */}
      <div className="flex flex-col justify-between min-h-screen p-6 sm:p-10 lg:p-14 relative bg-[#FAFAFA]">
        {/* Top Bar Navigation */}
        <div className="flex items-center justify-between w-full">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-950 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Centered Login Card */}
        <div className="w-full max-w-sm mx-auto my-auto py-8">
          <div className="bg-white border border-zinc-200/80 rounded-md p-6 sm:p-8 shadow-xs space-y-5">
            {/* Header */}
            <div className="space-y-1.5">
              <h2 className="text-xl font-normal tracking-tight text-zinc-950">
                Welcome to <span className="bg-black text-white px-0.5">Postrichly</span>
              </h2>
              <p className="text-xs text-zinc-500 leading-relaxed font-normal tracking-tight">
                Sign in with your verified Google account to access your autonomous GTM workspace and enrichment pipeline.
              </p>
            </div>

            {/* Error Message Notice */}
            {(errorMessage || reduxError) && (
              <div className="p-3 rounded-[3px] bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                <Lock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{errorMessage || reduxError}</span>
              </div>
            )}

            {/* Status Processing Indicator */}
            {statusMessage && (
              <div className="p-3 rounded-[3px] bg-zinc-50 border border-zinc-200 text-zinc-700 text-xs flex items-center gap-2">
                <CircleNotch className="w-3.5 h-3.5 animate-spin shrink-0 text-zinc-900" />
                <span>{statusMessage}</span>
              </div>
            )}

            {/* Google Login Button */}
            <div className="pt-1">
              <button
                type="button"
                id="google-primary-login-btn"
                onClick={handleGoogleSignInClick}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-[4px] bg-white border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 active:translate-y-[0.5px] text-zinc-800 text-xs font-normal tracking-tight transition-all shadow-xs cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <CircleNotch className="w-4 h-4 animate-spin text-zinc-700" />
                    <span>Connecting to Google...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
            <div className="pt-3 border-t border-zinc-100 space-y-2 text-xs text-zinc-500 font-normal tracking-tight">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
                <span>Instant workspace access</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                <span>Enterprise OAuth token encryption</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer legal notes */}
        <div className="w-full max-w-sm mx-auto text-center text-[11px] text-zinc-400 py-2">
          By signing in, you agree to Postrichly&apos;s{" "}
          <Link href="/terms" className="underline hover:text-zinc-600">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-zinc-600">
            Privacy
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
