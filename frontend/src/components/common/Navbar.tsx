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
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ease-out flex justify-center  px-4 ${
        isScrolled
          ? "top-3"
          : "top-0"
      }`}
    >
      <div
        className={`w-full transition-all duration-300 flex items-center justify-between ${
          isScrolled
            ? "max-w-4xl py-2.5 px-5 rounded-xl bg-white/30 backdrop-blur-md border border-zinc-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
            : "max-w-6xl py-5 px-10 bg-white/70 backdrop-blur-sm border-b border-zinc-200/80"
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold text-sm shadow-[1px_1px_0px_rgba(0,0,0,0.2)] group-hover:scale-105 transition-transform">
            <IconRadar2 className="w-4 h-4" />
          </div>
          
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-zinc-600">
          <a
            href="#pipeline-preview"
            className="hover:text-zinc-950 transition-colors"
          >
            Infrastructure
          </a>
          <a
            href="#features"
            className="hover:text-zinc-950 transition-colors"
          >
            Bento Grid
          </a>
          <a
            href="#testimonials"
            className="hover:text-zinc-950 transition-colors"
          >
            Telemetry
          </a>
          <a
            href="#faq"
            className="hover:text-zinc-950 transition-colors"
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
                <IconLayoutDashboard className="w-3.5 h-3.5 text-zinc-900" />
                <span>Dashboard</span>
              </button>
              <UserProfileDropdown />
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2.5">
              <button
                onClick={() => router.push("/login")}
                className="text-xs font-mono uppercase text-zinc-600 hover:text-zinc-950 px-3 py-2 transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push("/login")}
                className="btn-invert-xl px-4 py-2 flex items-center gap-1 text-xs font-semibold cursor-pointer group"
              >
                <span>Get Started</span>
                <IconArrowRight className="w-3.5 h-3.5  transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="md:hidden w-8 h-8 rounded-lg border border-zinc-200 bg-white flex items-center justify-center text-zinc-700 hover:text-black hover:bg-zinc-50 transition-all cursor-pointer shadow-sm"
          >
            {mobileMenuOpen ? <IconX className="w-4 h-4" /> : <IconMenu2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-2 p-5 rounded-xl bg-white border border-zinc-200 shadow-xl flex flex-col gap-4 text-xs font-mono">
          <a
            href="#pipeline-preview"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-700 hover:text-black py-1.5"
          >
            INFRASTRUCTURE
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-700 hover:text-black py-1.5"
          >
            BENTO GRID
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-700 hover:text-black py-1.5"
          >
            TELEMETRY
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-700 hover:text-black py-1.5"
          >
            FAQ
          </a>

          <div className="pt-3 border-t border-zinc-200 flex flex-col gap-2">
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
                  className="w-full py-2.5 text-center text-red-600 hover:text-red-700"
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
                  className="w-full py-2 text-zinc-600 hover:text-black"
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
