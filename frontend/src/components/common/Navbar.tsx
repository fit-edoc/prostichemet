"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { toggleTheme } from "../../store/slices/uiSlice";
import { logout, fetchCurrentUser } from "../../store/slices/authSlice";
import {
  IconArrowRight,
  IconSun,
  IconMoon,
  IconRadar2,
  IconMenu2,
  IconX,
  IconLogout,
  IconLayoutDashboard,
} from "@tabler/icons-react";

export function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);
  const { user, workspace, token } = useAppSelector((state) => state.auth);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (token && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [token, user, dispatch]);

  const handleSignOut = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--bg-surface)]/85 backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-[var(--shadow-sm)] py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[var(--text-primary)] text-[var(--bg-canvas)] flex items-center justify-center font-bold text-base shadow-[var(--shadow-sm)] group-hover:scale-105 transition-transform">
            <IconRadar2 className="w-5 h-5 text-[var(--bg-canvas)]" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-base tracking-tight text-[var(--text-primary)] leading-none">
              Postrichment
            </span>
            <span className="text-[10px] text-[var(--text-muted)] tracking-wider font-mono uppercase mt-0.5">
              AI GTM Research
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--text-secondary)]">
          <a
            href="#features"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            How it Works
          </a>
          <a
            href="#evidence"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Evidence Engine
          </a>
          <a
            href="#workflow"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Research Pipeline
          </a>
          <a
            href="#testimonials"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Proof
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle Theme"
            className="w-9 h-9 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          >
            {theme === "dark" ? (
              <IconSun className="w-4 h-4 text-amber-400" />
            ) : (
              <IconMoon className="w-4 h-4" />
            )}
          </button>

          {/* If Authenticated: Dashboard & Logout */}
          {token || user ? (
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => router.push("/dashboard")}
                leftIcon={<IconLayoutDashboard className="w-4 h-4" />}
                className="hidden sm:inline-flex"
              >
                Dashboard
              </Button>
              <button
                onClick={handleSignOut}
                title="Sign Out"
                className="w-9 h-9 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 flex items-center justify-center text-[var(--text-secondary)] transition-all cursor-pointer"
              >
                <IconLogout className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* If Unauthenticated: Start Free Research CTA */
            <Button
              variant="primary"
              size="sm"
              onClick={() => router.push("/login")}
              rightIcon={<IconArrowRight className="w-4 h-4" />}
              className="hidden sm:inline-flex"
            >
              Start Free Research
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-primary)]"
          >
            {mobileMenuOpen ? <IconX className="w-5 h-5" /> : <IconMenu2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-4 pb-6 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] space-y-4">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            How it Works
          </a>
          <a
            href="#evidence"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            Evidence Engine
          </a>
          <a
            href="#workflow"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            Research Pipeline
          </a>

          {token || user ? (
            <div className="space-y-2 pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/dashboard");
                }}
                className="w-full"
                leftIcon={<IconLayoutDashboard className="w-4 h-4" />}
              >
                Go to Dashboard
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
                className="w-full text-red-500 border-red-500/20"
                leftIcon={<IconLogout className="w-4 h-4" />}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setMobileMenuOpen(false);
                router.push("/login");
              }}
              className="w-full"
              rightIcon={<IconArrowRight className="w-4 h-4" />}
            >
              Start Free Research
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
