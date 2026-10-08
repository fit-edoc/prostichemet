"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { fetchCurrentUser, logout } from "../../store/slices/authSlice";
import { signOut } from "next-auth/react";
import { UserProfileDropdown } from "./UserProfileDropdown";
import {
  ArrowRight,
  List,
  X,
  SquaresFour,
} from "@phosphor-icons/react";

export function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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
      setIsScrolled(window.scrollY > 20);
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

  const isAuthenticated = mounted && Boolean(token || user);

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-200 flex justify-center px-4 ${
        isScrolled ? "top-2.5" : "top-0"
      }`}
    >
      <div
        className={`w-full transition-all duration-200 flex items-center justify-between ${
          isScrolled
            ? "max-w-4xl py-2 px-4 rounded-md bg-white/95 backdrop-blur-md border border-zinc-200/80 shadow-xs"
            : "max-w-6xl py-3.5 px-4 bg-white/80 backdrop-blur-sm border-b border-zinc-200/60"
        }`}
      >
        {/* Brand Logo & Name in Instrument Sans */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt="Postrichly"
            width={100}
            height={100}
            className="w-8 h-8 rounded object-contain transition-transform group-hover:scale-105"
            priority
          />
          <span className="text-sm font-normal tracking-tight text-zinc-950">
            Postrichly
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-normal tracking-tight text-zinc-600">
          <a
            href="#demo"
            className="hover:text-zinc-950 transition-colors"
          >
            Product
          </a>
          <a
            href="#features"
            className="hover:text-zinc-950 transition-colors"
          >
            Capabilities
          </a>
          <a
            href="#testimonials"
            className="hover:text-zinc-950 transition-colors"
          >
            Proof
          </a>
          <a
            href="#faq"
            className="hover:text-zinc-950 transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/dashboard")}
                className="btn-dark-xl px-3 py-1.5 flex items-center gap-1.5 text-xs font-normal cursor-pointer"
              >
                <SquaresFour className="w-3.5 h-3.5 text-zinc-900" />
                <span>Dashboard</span>
              </button>
              <UserProfileDropdown />
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => router.push("/login")}
                className="text-xs font-normal tracking-tight text-zinc-600 hover:text-zinc-950 px-2.5 py-1.5 transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push("/login")}
                className="btn-invert-xl px-3 py-1.5 flex items-center gap-1 text-xs font-normal tracking-tight cursor-pointer group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="md:hidden w-7 h-7 rounded-[3px] border border-zinc-200 bg-white flex items-center justify-center text-zinc-700 hover:text-zinc-950 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-3.5 h-3.5" />
            ) : (
              <List className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-14 left-4 right-4 bg-white border border-zinc-200 rounded-md p-4 shadow-md flex flex-col gap-3 text-xs font-normal tracking-tight">
          <a
            href="#demo"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 text-zinc-700 hover:text-zinc-950"
          >
            Product
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 text-zinc-700 hover:text-zinc-950"
          >
            Capabilities
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 text-zinc-700 hover:text-zinc-950"
          >
            Proof
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 text-zinc-700 hover:text-zinc-950"
          >
            FAQ
          </a>
          <div className="pt-2 border-t border-zinc-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                router.push("/login");
              }}
              className="btn-invert-xl py-2 text-center text-xs"
            >
              Start Free Research
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
