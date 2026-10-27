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
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 flex items-center justify-between max-w-6xl mx-auto px-4 sm:px-6 pointer-events-none ${
          isScrolled ? "top-2.5" : "top-4"
        }`}
      >
        {/* Div 1 (Left): Brand Logo & Name */}
        <div className="pointer-events-auto flex items-center px-4 py-2 rounded-full  backdrop-blur-md ">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/logo.png"
              alt="Prospail"
              width={100}
              height={100}
              className="w-7 h-7 rounded-md object-contain transition-transform group-hover:scale-105"
              priority
            />
            <span className="text-sm font-medium tracking-tight text-white group-hover:text-neutral-200 transition-colors">
              Prospail
            </span>
          </Link>
        </div>

        {/* Div 2 (Center): Navigation Links */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-neutral-900/85 backdrop-blur-md border border-neutral-800/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6)]">
          <a
            href="#demo"
            className="px-3.5 py-1.5 rounded-full text-xs font-normal text-neutral-300 hover:text-white hover:bg-neutral-800/70 transition-all tracking-tight"
          >
            Product
          </a>
          <a
            href="#features"
            className="px-3.5 py-1.5 rounded-full text-xs font-normal text-neutral-300 hover:text-white hover:bg-neutral-800/70 transition-all tracking-tight"
          >
            Capabilities
          </a>
          <a
            href="#testimonials"
            className="px-3.5 py-1.5 rounded-full text-xs font-normal text-neutral-300 hover:text-white hover:bg-neutral-800/70 transition-all tracking-tight"
          >
            Proof
          </a>
          <a
            href="#faq"
            className="px-3.5 py-1.5 rounded-full text-xs font-normal text-neutral-300 hover:text-white hover:bg-neutral-800/70 transition-all tracking-tight"
          >
            FAQ
          </a>
        </nav>

        {/* Div 3 (Right): Action Links & Controls */}
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/85 backdrop-blur-md border border-neutral-800/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6)]">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/dashboard")}
                className="btn-bevel bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white px-3 py-1.5 flex items-center gap-1.5 text-xs font-normal cursor-pointer"
              >
                <SquaresFour className="w-3.5 h-3.5 text-white" />
                <span>Dashboard</span>
              </button>
              <UserProfileDropdown />
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="btn-bevel bg-gradient-to-b from-neutral-800 to-neutral-900 hover:from-neutral-700 hover:to-neutral-800 text-white border border-neutral-600/80 font-medium px-3.5 py-1.5 flex items-center gap-1.5 text-xs tracking-tight cursor-pointer group shadow-[inset_0px_1px_1px_rgba(255,255,255,0.25),0_4px_16px_-2px_rgba(0,0,0,0.5)]"
            >
              <span className="text-white font-medium">Sign In</span>
              <ArrowRight className="w-3 h-3 text-white transition-transform group-hover:translate-x-0.5" />
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="md:hidden w-7 h-7 rounded-full border border-neutral-700 bg-neutral-800/80 flex items-center justify-center text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-3.5 h-3.5" />
            ) : (
              <List className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Dark Neutral Theme) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-4 right-4 bg-neutral-950/95 border border-neutral-800 rounded-2xl p-5 shadow-2xl backdrop-blur-xl flex flex-col gap-3 text-xs font-normal tracking-tight z-50 text-neutral-200">
          <a
            href="#demo"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5 px-3 rounded-lg hover:bg-neutral-900 text-neutral-300 hover:text-white transition-colors"
          >
            Product
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5 px-3 rounded-lg hover:bg-neutral-900 text-neutral-300 hover:text-white transition-colors"
          >
            Capabilities
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5 px-3 rounded-lg hover:bg-neutral-900 text-neutral-300 hover:text-white transition-colors"
          >
            Proof
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5 px-3 rounded-lg hover:bg-neutral-900 text-neutral-300 hover:text-white transition-colors"
          >
            FAQ
          </a>
          <div className="pt-2 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                router.push("/login");
              }}
              className="btn-bevel bg-gradient-to-b from-neutral-800 to-neutral-900 hover:from-neutral-700 hover:to-neutral-800 text-white border border-neutral-600/80 font-medium py-2 flex items-center justify-center gap-1.5 text-xs tracking-tight cursor-pointer shadow-[inset_0px_1px_1px_rgba(255,255,255,0.25),0_4px_16px_-2px_rgba(0,0,0,0.5)]"
            >
              <span className="text-white font-medium">Sign In</span>
              <ArrowRight className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
