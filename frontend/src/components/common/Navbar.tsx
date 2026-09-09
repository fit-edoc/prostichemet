"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { toggleTheme } from "../../store/slices/uiSlice";
import { fetchCurrentUser } from "../../store/slices/authSlice";
import { UserProfileDropdown } from "./UserProfileDropdown";
import {
  IconArrowRight,
  IconSun,
  IconMoon,
  IconRadar2,
  IconMenu2,
  IconX,
  IconLayoutDashboard,
} from "@tabler/icons-react";

export function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);
  const { user, token } = useAppSelector((state) => state.auth);
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-[var(--bg-surface)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] shadow-[var(--shadow-xs)] py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#20150F] text-[#FAF9F7] dark:bg-[#FAF9F7] dark:text-[#120D0A] flex items-center justify-center font-bold text-sm shadow-[var(--shadow-xs)] group-hover:scale-105 transition-transform">
            <IconRadar2 className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-[var(--text-primary)] leading-none">
              Postrichment
            </span>
            <span className="text-[10px] text-[var(--text-muted)] tracking-wider font-mono uppercase mt-0.5">
              AI GTM Research
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[var(--text-secondary)]">
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
            onClick={() => {
              dispatch(toggleTheme());
              const next = theme === "dark" ? "light" : "dark";
              document.documentElement.setAttribute("data-theme", next);
            }}
            aria-label="Toggle Theme"
            className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          >
            {theme === "dark" ? (
              <IconSun className="w-3.5 h-3.5 text-amber-500" />
            ) : (
              <IconMoon className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Authenticated State: UserProfileDropdown & Dashboard Link */}
          {token || user ? (
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => router.push("/dashboard")}
                leftIcon={<IconLayoutDashboard className="w-3.5 h-3.5" />}
                className="hidden sm:inline-flex"
              >
                Dashboard
              </Button>
              <UserProfileDropdown />
            </div>
          ) : (
            /* Unauthenticated State: Sign in button */
            <Button
              variant="primary"
              size="sm"
              onClick={() => router.push("/login")}
              rightIcon={<IconArrowRight className="w-3.5 h-3.5" />}
              className="hidden sm:inline-flex"
            >
              Sign In
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-primary)]"
          >
            {mobileMenuOpen ? <IconX className="w-4 h-4" /> : <IconMenu2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-3 pb-5 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] space-y-3">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            How it Works
          </a>
          <a
            href="#evidence"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            Evidence Engine
          </a>
          <a
            href="#workflow"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            Research Pipeline
          </a>

          {token || user ? (
            <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/dashboard");
                }}
                className="w-full"
                leftIcon={<IconLayoutDashboard className="w-3.5 h-3.5" />}
              >
                Go to Dashboard
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setMobileMenuOpen(false);
                router.push("/login");
              }}
              className="w-full"
              rightIcon={<IconArrowRight className="w-3.5 h-3.5" />}
            >
              Sign In
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
