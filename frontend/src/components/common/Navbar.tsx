"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { fetchCurrentUser, logout } from "../../store/slices/authSlice";
import { signOut } from "next-auth/react";
import { UserProfileDropdown } from "./UserProfileDropdown";
import {
  IconArrowRight,
  IconRadar2,
  IconMenu2,
  IconX,
  IconLayoutDashboard,
} from "@tabler/icons-react";

export function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    setMobileMenuOpen(false);
    dispatch(logout());
    try {
      await signOut({ redirect: false });
    } catch {
      // ignore
    }
    router.push("/login");
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hasFetchedUserRef = React.useRef(false);

  React.useEffect(() => {
    if (token && !user && !hasFetchedUserRef.current) {
      hasFetchedUserRef.current = true;
      dispatch(fetchCurrentUser());
    }
  }, [token, user, dispatch]);

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ease-out flex justify-center px-4 ${
        isScrolled
          ? "top-3"
          : "top-0"
      }`}
    >
      <div
        className={`w-full transition-all duration-300 flex items-center justify-between ${
          isScrolled
            ? "max-w-4xl py-2.5 px-5 rounded-xl bg-[#0c0c0c]/90 backdrop-blur-md border border-[#262626] shadow-[2px_2px_0px_rgba(255,255,255,0.2)]"
            : "max-w-7xl py-5 px-6 bg-transparent border-b border-white/[0.06]"
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-sm shadow-[2px_2px_0px_rgba(255,255,255,0.3)] group-hover:scale-105 transition-transform">
            <IconRadar2 className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base tracking-tight text-white leading-none">
              Postrichment
            </span>
            <span className="text-[9px] text-zinc-500 tracking-wider font-mono uppercase mt-0.5">
              GTM Research
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-zinc-400">
          <a
            href="#pipeline-preview"
            className="hover:text-white transition-colors"
          >
            Infrastructure
          </a>
          <a
            href="#features"
            className="hover:text-white transition-colors"
          >
            Bento Grid
          </a>
          <a
            href="#testimonials"
            className="hover:text-white transition-colors"
          >
            Telemetry
          </a>
          <a
            href="#faq"
            className="hover:text-white transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Authenticated State: UserProfileDropdown & Dashboard Link */}
          {token || user ? (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => router.push("/dashboard")}
                className="btn-dark-xl px-4 py-2 flex items-center gap-1.5 text-xs font-medium cursor-pointer"
              >
                <IconLayoutDashboard className="w-3.5 h-3.5 text-white" />
                <span>Dashboard</span>
              </button>
              <UserProfileDropdown />
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2.5">
              <button
                onClick={() => router.push("/login")}
                className="text-xs font-mono uppercase text-zinc-400 hover:text-white px-3 py-2 transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push("/login")}
                className="btn-invert-xl px-4 py-2 flex items-center gap-1 text-xs font-semibold cursor-pointer group"
              >
                <span>Get Started</span>
                <IconArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="md:hidden w-8 h-8 rounded-lg border border-[#2B2B2B] bg-[#141414] flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <IconX className="w-4 h-4" /> : <IconMenu2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-2 p-5 rounded-xl bg-[#0E0E0E] border border-[#2B2B2B] shadow-[2px_2px_0px_rgba(255,255,255,0.2)] flex flex-col gap-4 text-xs font-mono">
          <a
            href="#pipeline-preview"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-white py-1.5"
          >
            INFRASTRUCTURE
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-white py-1.5"
          >
            BENTO GRID
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-white py-1.5"
          >
            TELEMETRY
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-white py-1.5"
          >
            FAQ
          </a>

          <div className="pt-3 border-t border-[#222222] flex flex-col gap-2">
            {token || user ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.push("/dashboard");
                  }}
                  className="btn-dark-xl w-full py-2.5 text-center font-medium"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 text-center text-red-400 hover:text-red-300"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.push("/login");
                  }}
                  className="w-full py-2 text-zinc-400 hover:text-white"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.push("/login");
                  }}
                  className="btn-invert-xl w-full py-2.5 text-center font-semibold"
                >
                  Get Started Free
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
