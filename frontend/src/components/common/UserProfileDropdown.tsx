"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { logout } from "../../store/slices/authSlice";
import { toggleTheme } from "../../store/slices/uiSlice";
import {
  IconUser,
  IconBuildingSkyscraper,
  IconLogout,
  IconSun,
  IconMoon,
  IconChevronDown,
  IconSparkles,
  IconCheck,
} from "@tabler/icons-react";

export function UserProfileDropdown() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, workspace } = useAppSelector((state) => state.auth);
  const { theme } = useAppSelector((state) => state.ui);

  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    dispatch(logout());
    try {
      await signOut({ redirect: false });
    } catch {
      // ignore
    }
    router.push("/login");
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  if (!user) return null;

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : user.email.slice(0, 2).toUpperCase();

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] hover:shadow-[var(--shadow-xs)] transition-all cursor-pointer select-none"
        aria-expanded={isOpen}
      >
        <div className="w-8 h-8 rounded-full bg-[#20150F] text-[#FAF9F7] dark:bg-[#FAF9F7] dark:text-[#120D0A] flex items-center justify-center font-semibold text-xs shadow-inner">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name || user.email}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-semibold text-[var(--text-primary)] leading-tight truncate max-w-[120px]">
            {user.name || user.email.split("@")[0]}
          </span>
          <span className="text-[10px] text-[var(--text-muted)] leading-tight truncate max-w-[120px]">
            {workspace?.name || "My Workspace"}
          </span>
        </div>
        <IconChevronDown
          className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Floating Menu Card */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-medium)] shadow-[var(--shadow-lg)] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-[var(--border-subtle)]">
            <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
              {user.name || "Founder"}
            </p>
            <p className="text-[11px] text-[var(--text-secondary)] truncate">
              {user.email}
            </p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[var(--accent-brown-light)] border border-[var(--accent-brown)]/20 text-[10px] font-medium text-[var(--accent-brown)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-brown)]" />
              <span>{workspace?.name || "Postrichment Workspace"}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="py-1">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
            >
              <IconSparkles className="w-4 h-4 text-[var(--accent-brown)]" />
              <span>GTM Dashboard</span>
            </Link>

            <Link
              href="/onboarding"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
            >
              <IconBuildingSkyscraper className="w-4 h-4 text-[var(--text-secondary)]" />
              <span>Company & ICP Profile</span>
            </Link>

            {/* Theme Toggle Option */}
            <button
              type="button"
              onClick={handleThemeToggle}
              className="w-full flex items-center justify-between px-4 py-2 text-xs text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                {theme === "dark" ? (
                  <IconSun className="w-4 h-4 text-amber-500" />
                ) : (
                  <IconMoon className="w-4 h-4 text-[var(--text-secondary)]" />
                )}
                <span>Theme Mode</span>
              </div>
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                {theme === "dark" ? "Dark" : "Light"}
              </span>
            </button>
          </div>

          {/* Logout Action */}
          <div className="pt-1 border-t border-[var(--border-subtle)]">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              <IconLogout className="w-4 h-4" />
              <span>Sign Out / Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
