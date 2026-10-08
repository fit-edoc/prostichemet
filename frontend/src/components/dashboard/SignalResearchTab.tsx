"use client";

import * as React from "react";
import { Button } from "../ui/Button";
import { Sparkle, Check } from "@phosphor-icons/react";
import { IcpProfile, BusinessProfile } from "../../types";

interface SignalResearchTabProps {
  icps: IcpProfile[];
  profiles: BusinessProfile[];
  isResearching: boolean;
  onRunResearch: () => void;
}

export function SignalResearchTab({
  icps,
  profiles,
  isResearching,
  onRunResearch,
}: SignalResearchTabProps) {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-zinc-950">
          Autonomous Signal Research Agent
        </h2>
        <p className="text-xs text-zinc-500 mt-1 font-normal tracking-tight">
          Trigger automated web queries, extract leadership changes, and discover qualified buyer accounts.
        </p>
      </div>

      <div className="p-5 rounded-md bg-white border border-zinc-200/80 shadow-xs space-y-4">
        <div className="space-y-2">
          <span className="text-xs text-zinc-400 uppercase tracking-tight block">
            Active ICP for Discovery Run
          </span>
          <div className="p-3 rounded-[3px] bg-zinc-50 border border-zinc-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-950 tracking-tight">
                {icps.length > 0 ? icps[0].title : "Default B2B Tech ICP"}
              </p>
              <p className="text-[11px] text-zinc-500 mt-0.5 font-normal tracking-tight">
                Targeting {profiles.length > 0 ? profiles[0].targetAudience : "B2B Decision Makers"}
              </p>
            </div>
            <span className="bg-green-700/10 text-green-600 rounded-[2px] border-0 py-[2px] px-2 text-[10px] font-normal tracking-tight">
              Ready
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-zinc-100">
          <span className="text-xs text-zinc-400 uppercase tracking-tight block">
            Autonomous Discovery Signals Tracked
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700 font-normal tracking-tight">
            <div className="p-2.5 rounded-[3px] bg-zinc-50 border border-zinc-100 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
              <span>Series A / B Funding Rounds</span>
            </div>
            <div className="p-2.5 rounded-[3px] bg-zinc-50 border border-zinc-100 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
              <span>Sales & RevOps Leadership Hires</span>
            </div>
            <div className="p-2.5 rounded-[3px] bg-zinc-50 border border-zinc-100 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
              <span>CRM & Outbound Migrations</span>
            </div>
            <div className="p-2.5 rounded-[3px] bg-zinc-50 border border-zinc-100 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
              <span>Hiring Expansion Listings</span>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            variant="primary"
            size="sm"
            onClick={onRunResearch}
            isLoading={isResearching}
            leftIcon={<Sparkle className="w-3.5 h-3.5" />}
          >
            Execute Signal Discovery Run
          </Button>
        </div>
      </div>
    </div>
  );
}
