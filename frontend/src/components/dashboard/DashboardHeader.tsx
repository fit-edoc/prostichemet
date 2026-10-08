"use client";

import * as React from "react";
import { Button } from "../ui/Button";
import { UserProfileDropdown } from "../common/UserProfileDropdown";
import { Sparkle, Cpu } from "@phosphor-icons/react";
import { DashboardTab } from "./DashboardSidebar";

interface DashboardHeaderProps {
  activeTab: DashboardTab;
  workspaceName?: string;
  onRunResearch: () => void;
  isResearching: boolean;
  onGenerateIcp: () => void;
  isIcpGenerating: boolean;
}

export function DashboardHeader({
  activeTab,
  workspaceName,
  onRunResearch,
  isResearching,
  onGenerateIcp,
  isIcpGenerating,
}: DashboardHeaderProps) {
  const getTabTitle = (tab: DashboardTab) => {
    switch (tab) {
      case "overview":
        return "GTM Overview";
      case "profile":
        return "Business Profile";
      case "icp":
        return "AI ICP Generator";
      case "pipeline":
        return "Evidence Pipeline & CRM";
      case "research":
        return "Signal Detector Agent";
      case "rag":
        return "Web Scraping & RAG";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="h-14 px-6 border-b border-zinc-200/70 bg-white/80 backdrop-blur-md flex items-center justify-between shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-2 text-xs text-zinc-500 font-normal tracking-tight">
        <span className="text-zinc-950 font-normal text-xs sm:text-sm">
          {getTabTitle(activeTab)}
        </span>
        <span className="text-zinc-300">/</span>
        <span className="text-zinc-400 text-xs truncate max-w-[150px]">
          {workspaceName || "Production"}
        </span>
      </div>

      <div className="flex items-center gap-2.5">
        {activeTab === "pipeline" && (
          <Button
            variant="primary"
            size="sm"
            onClick={onRunResearch}
            isLoading={isResearching}
            leftIcon={<Sparkle className="w-3.5 h-3.5" />}
          >
            Discover Signals
          </Button>
        )}

        {activeTab === "icp" && (
          <Button
            variant="primary"
            size="sm"
            onClick={onGenerateIcp}
            isLoading={isIcpGenerating}
            leftIcon={<Cpu className="w-3.5 h-3.5" />}
          >
            Synthesize ICP
          </Button>
        )}

        <UserProfileDropdown />
      </div>
    </header>
  );
}
