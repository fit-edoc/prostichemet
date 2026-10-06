"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { logout } from "../../store/slices/authSlice";
import { toggleTheme } from "../../store/slices/uiSlice";
import {
  User,
  Buildings,
  SignOut,
  Sun,
  Moon,
  CaretDown,
  ShieldCheck,
} from "@phosphor-icons/react";

export function UserProfileDropdown() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, workspace, token } = useAppSelector((state) => state.auth);
  const { theme } = useAppSelector((state) => state.ui);

  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted || (!user && !token)) return null;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pr-2.5 rounded-md bg-white border border-zinc-200/80 hover:border-zinc-300 shadow-xs transition-all cursor-pointer select-none"
        aria-expanded={isOpen}
      >
        <img
          src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"}
          alt={user?.name || "User"}
          className="w-6 h-6 rounded-full object-cover"
        />
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-normal tracking-tight text-zinc-950 leading-tight truncate max-w-[120px]">
            {user?.name || (user?.email ? user.email.split("@")[0] : "Account")}
          </span>
        </div>
        <CaretDown
          className={`w-3 h-3 text-zinc-500 transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md bg-white border border-zinc-200 shadow-md py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 text-xs font-normal tracking-tight">
          <div className="px-3.5 py-2 border-b border-zinc-100">
            <p className="text-zinc-950 font-normal tracking-tight truncate">
              {user?.name || "Active Session"}
            </p>
            <p className="text-[11px] text-zinc-500 truncate mt-0.5">
              {user?.email || "Signed in"}
            </p>
            <div className="mt-2">
              <span className="bg-green-700/10 text-green-600 rounded-[2px] border-0 py-[2px] px-2 text-[10px] font-normal tracking-tight inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>{workspace?.name || "Enterprise Cluster"}</span>
              </span>
            </div>
          </div>

          <div className="py-1">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 transition-colors"
            >
              <User className="w-3.5 h-3.5 text-zinc-500" />
              <span>Signal Research Console</span>
            </Link>

            <button
              type="button"
              onClick={handleThemeToggle}
              className="w-full flex items-center justify-between px-3.5 py-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                {theme === "dark" ? (
                  <Sun className="w-3.5 h-3.5 text-zinc-500" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-zinc-500" />
                )}
                <span>Interface Theme</span>
              </div>
              <span className="text-[10px] text-zinc-400 capitalize">{theme}</span>
            </button>
          </div>

          <div className="border-t border-zinc-100 pt-1">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
            >
              <SignOut className="w-3.5 h-3.5 text-rose-500" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
