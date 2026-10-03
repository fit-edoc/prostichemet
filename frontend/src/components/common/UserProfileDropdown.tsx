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
  IconRadar2,
  IconShieldCheck,
} from "@tabler/icons-react";

export function UserProfileDropdown() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, workspace, token } = useAppSelector((state) => state.auth);
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

  if (!user && !token) return null;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : "U";

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button with light/dark adaptive styling */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-white dark:bg-[#0E0E0E] border border-zinc-200 dark:border-[#262626] hover:border-zinc-400 shadow-sm active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer select-none"
        aria-expanded={isOpen}
      >
        <div className="w-7 h-7 rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-black flex items-center justify-center font-bold text-xs shadow-inner">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name || user.email || "User"}
              className="w-full h-full rounded-lg object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-inter font-semibold text-zinc-900 dark:text-white leading-tight truncate max-w-[120px]">
            {user?.name || (user?.email ? user.email.split("@")[0] : "Account")}
          </span>
          <span className="text-[9px] font-mono text-zinc-500 leading-tight truncate max-w-[120px]">
            {workspace?.name || "Workspace"}
          </span>
        </div>
        <IconChevronDown
          className={`w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-zinc-900 dark:text-white" : ""
          }`}
        />
      </button>

      {/* Floating Menu Modal / Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-64 rounded-xl bg-white dark:bg-[#0A0A0A] border border-zinc-200 dark:border-[#282828] shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-zinc-100 dark:border-[#1C1C1C]">
            <p className="text-xs font-inter font-bold text-zinc-950 dark:text-white truncate">
              {user?.name || "Verified Operator"}
            </p>
            <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
              {user?.email || "Session Active"}
            </p>
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-[#141414] border border-zinc-200 dark:border-[#2B2B2B] text-[10px] font-mono text-zinc-700 dark:text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white animate-pulse" />
              <span>{workspace?.name || "Postrichment Core"}</span>
            </div>
          </div>

          {/* Navigation Links with adaptive styling */}
          <div className="py-1 font-mono text-xs">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-[#141414] transition-colors"
            >
              <IconRadar2 className="w-4 h-4 text-zinc-900 dark:text-white" />
              <span>GTM Dashboard</span>
            </Link>

            <Link
              href="/onboarding"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-[#141414] transition-colors"
            >
              <IconBuildingSkyscraper className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              <span>Company & ICP Profile</span>
            </Link>

            {/* Theme Toggle Option */}
            <button
              type="button"
              onClick={handleThemeToggle}
              className="w-full flex items-center justify-between px-4 py-2.5 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-[#141414] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                {theme === "dark" ? (
                  <IconSun className="w-4 h-4 text-zinc-900 dark:text-white" />
                ) : (
                  <IconMoon className="w-4 h-4 text-zinc-600" />
                )}
                <span>Theme Mode</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                {theme === "dark" ? "Dark" : "Light"}
              </span>
            </button>
          </div>

          {/* Logout Action */}
          <div className="pt-1 mt-1 border-t border-zinc-100 dark:border-[#1C1C1C]">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-mono text-zinc-600 hover:text-red-600 hover:bg-red-50 dark:text-zinc-400 dark:hover:text-red-400 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              <IconLogout className="w-4 h-4" />
              <span>Sign Out / Disconnect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
