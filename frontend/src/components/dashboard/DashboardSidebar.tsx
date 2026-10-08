"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SquaresFour,
  Buildings,
  Target,
  Users,
  Cpu,
  Database,
  SignOut,
} from "@phosphor-icons/react";

export type DashboardTab = "overview" | "profile" | "icp" | "pipeline" | "research" | "rag";

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  profilesCount: number;
  icpsCount: number;
  leadsCount: number;
  knowledgeDocsCount: number;
  companyName?: string;
  onLogout: () => void;
}

export function DashboardSidebar({
  activeTab,
  setActiveTab,
  profilesCount,
  icpsCount,
  leadsCount,
  knowledgeDocsCount,
  companyName,
  onLogout,
}: DashboardSidebarProps) {
  return (
    <aside className="w-full md:w-60 bg-white border-b md:border-b-0 md:border-r border-zinc-200/80 flex flex-col justify-between shrink-0 z-30">
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-zinc-200/70 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="Postrichly"
              width={24}
              height={24}
              className="w-6 h-6 rounded object-contain transition-transform group-hover:scale-105"
              priority
            />
            <div>
              <span className="text-sm font-normal tracking-tight text-zinc-950 block leading-tight">
                Postrichly
              </span>
              <span className="text-[10px] text-zinc-400 font-normal tracking-tight">
                Autonomous GTM
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="p-2 space-y-0.5 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[3px] transition-all text-left cursor-pointer ${
              activeTab === "overview"
                ? "bg-zinc-100 text-zinc-950 font-medium"
                : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
            }`}
          >
            <SquaresFour className="w-4 h-4 shrink-0 text-zinc-900" />
            <span>GTM Overview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[3px] transition-all text-left cursor-pointer ${
              activeTab === "profile"
                ? "bg-zinc-100 text-zinc-950 font-medium"
                : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
            }`}
          >
            <Buildings className="w-4 h-4 shrink-0 text-zinc-900" />
            <span>Company Profile</span>
            {profilesCount > 0 && (
              <span className="ml-auto bg-blue-700/10 text-blue-600 rounded-[2px] border-0 py-[2px] px-1.5 text-[10px] leading-none">
                {profilesCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("icp")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[3px] transition-all text-left cursor-pointer ${
              activeTab === "icp"
                ? "bg-zinc-100 text-zinc-950 font-medium"
                : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
            }`}
          >
            <Target className="w-4 h-4 shrink-0 text-zinc-900" />
            <span>AI ICP Discovery</span>
            {icpsCount > 0 && (
              <span className="ml-auto bg-purple-700/10 text-purple-600 rounded-[2px] border-0 py-[2px] px-1.5 text-[10px] leading-none">
                {icpsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("pipeline")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[3px] transition-all text-left cursor-pointer ${
              activeTab === "pipeline"
                ? "bg-zinc-100 text-zinc-950 font-medium"
                : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
            }`}
          >
            <Users className="w-4 h-4 shrink-0 text-zinc-900" />
            <span>CRM Intelligence</span>
            {leadsCount > 0 && (
              <span className="ml-auto bg-green-700/10 text-green-600 rounded-[2px] border-0 py-[2px] px-1.5 text-[10px] leading-none">
                {leadsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("research")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[3px] transition-all text-left cursor-pointer ${
              activeTab === "research"
                ? "bg-zinc-100 text-zinc-950 font-medium"
                : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
            }`}
          >
            <Cpu className="w-4 h-4 shrink-0 text-zinc-900" />
            <span>Signal Research Agent</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("rag")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[3px] transition-all text-left cursor-pointer ${
              activeTab === "rag"
                ? "bg-zinc-100 text-zinc-950 font-medium"
                : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
            }`}
          >
            <Database className="w-4 h-4 shrink-0 text-zinc-900" />
            <span>Web Scraping & RAG</span>
            {knowledgeDocsCount > 0 && (
              <span className="ml-auto bg-blue-700/10 text-blue-600 rounded-[2px] border-0 py-[2px] px-1.5 text-[10px] leading-none">
                {knowledgeDocsCount}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-zinc-200/70 space-y-2 text-xs">
        <div className="p-2.5 rounded-[4px] bg-zinc-50/70 border border-zinc-200/60 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-400 uppercase tracking-tight">RAG Vector Hub</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>
          <p className="text-xs text-zinc-950 font-normal tracking-tight truncate">
            {companyName || "Awaiting Setup"}
          </p>
        </div>

        <div className="flex items-center justify-between text-[11px] text-zinc-400 px-1">
          <span>Postrichly Core</span>
          <Link href="/onboarding" className="text-zinc-600 hover:text-zinc-950 transition-colors">
            New Intake
          </Link>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-[3px] text-xs text-zinc-600 hover:text-rose-600 bg-white hover:bg-rose-50 border border-zinc-200/70 transition-all cursor-pointer font-normal"
        >
          <SignOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
