"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import {
  Buildings,
  CaretRight,
  Globe,
  ArrowSquareOut,
  EnvelopeSimple,
  MapPin,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import { ProspectLead, BusinessProfile, IcpProfile } from "../../types";
import { getLeadAvatar } from "./dashboardUtils";

interface DashboardOverviewTabProps {
  leads: ProspectLead[];
  profiles: BusinessProfile[];
  icps: IcpProfile[];
  onOpenEmailDrawer: (lead: ProspectLead) => void;
  onNavigateToPipeline: () => void;
}

export function DashboardOverviewTab({
  leads,
  profiles,
  icps,
  onOpenEmailDrawer,
  onNavigateToPipeline,
}: DashboardOverviewTabProps) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Quick Metrics Bar with Multi-color Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-md bg-white border border-zinc-200/80 shadow-xs space-y-1">
          <span className="text-xs text-zinc-500 font-normal tracking-tight block">
            Discovered Leads
          </span>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-2xl sm:text-3xl font-normal text-zinc-950 tracking-tight">
              {leads.length}
            </span>
            <span className="bg-green-700/10 text-green-600 rounded-[2px] border-0 py-[2px] px-2 text-[10px] font-normal tracking-tight">
              Live Evidence
            </span>
          </div>
        </div>

        <div className="p-4 rounded-md bg-white border border-zinc-200/80 shadow-xs space-y-1">
          <span className="text-xs text-zinc-500 font-normal tracking-tight block">
            High Fit ICP Matches
          </span>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-2xl sm:text-3xl font-normal text-zinc-950 tracking-tight">
              {leads.filter((l) => (l.score || 0) >= 80).length}
            </span>
            <span className="bg-blue-700/10 text-blue-600 rounded-[2px] border-0 py-[2px] px-2 text-[10px] font-normal tracking-tight">
              Score ≥ 80%
            </span>
          </div>
        </div>

        <div className="p-4 rounded-md bg-white border border-zinc-200/80 shadow-xs space-y-1">
          <span className="text-xs text-zinc-500 font-normal tracking-tight block">
            Synthesized ICPs
          </span>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-2xl sm:text-3xl font-normal text-zinc-950 tracking-tight">
              {icps.length}
            </span>
            <span className="bg-purple-700/10 text-purple-600 rounded-[2px] border-0 py-[2px] px-2 text-[10px] font-normal tracking-tight">
              RAG Grounded
            </span>
          </div>
        </div>

        <div className="p-4 rounded-md bg-white border border-zinc-200/80 shadow-xs space-y-1">
          <span className="text-xs text-zinc-500 font-normal tracking-tight block">
            Avg Response Lift
          </span>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-2xl sm:text-3xl font-normal text-zinc-950 tracking-tight">
              +3.2x
            </span>
            <span className="bg-amber-700/10 text-amber-600 rounded-[2px] border-0 py-[2px] px-2 text-[10px] font-normal tracking-tight">
              PAS Framework
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action Prompt if no profiles */}
      {profiles.length === 0 ? (
        <div className="p-8 rounded-md bg-white border border-zinc-200/80 text-center space-y-4 shadow-xs">
          <Buildings className="w-8 h-8 text-zinc-700 mx-auto" />
          <div>
            <h3 className="text-base text-zinc-950 font-normal tracking-tight">
              No Company Profile Configured Yet
            </h3>
            <p className="text-xs text-zinc-500 max-w-md mx-auto mt-1 leading-relaxed font-normal tracking-tight">
              Set up your company value proposition and target customer details to activate the autonomous lead discovery engine.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push("/onboarding")}
            rightIcon={<CaretRight className="w-3.5 h-3.5" />}
          >
            Open Company Intake Form
          </Button>
        </div>
      ) : (
        /* Recent Discovered Leads Preview with Real Avatars */
        <div className="p-5 rounded-md bg-white border border-zinc-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <div>
              <h3 className="text-sm font-normal tracking-tight text-zinc-950">
                Latest High-Intent Prospects
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5 font-normal tracking-tight">
                Real-time signals matched against your {profiles[0]?.companyName} ICP
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={onNavigateToPipeline}
            >
              View All in CRM
            </Button>
          </div>

          <div className="divide-y divide-zinc-100">
            {leads.slice(0, 4).map((lead, idx) => (
              <div key={lead.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <img
                    src={getLeadAvatar(lead.id || idx)}
                    alt={lead.contactName || lead.companyName}
                    className="w-9 h-9 rounded-full object-cover border border-zinc-200/80 shadow-xs shrink-0 mt-0.5"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium text-zinc-950 tracking-tight">
                        {lead.companyName}
                      </span>
                      <span className="bg-green-700/10 text-green-600 rounded-[2px] border-0 py-[2px] px-2 text-[10px] font-normal tracking-tight">
                        {lead.score || 85}% Fit
                      </span>
                      {lead.websiteLink && (
                        <a
                          href={lead.websiteLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-950 transition-colors"
                        >
                          <Globe className="w-3 h-3 text-zinc-400" />
                          <span>{lead.websiteLink.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</span>
                          <ArrowSquareOut className="w-2.5 h-2.5 opacity-70" />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-500 flex-wrap font-normal tracking-tight">
                      <span className="text-zinc-800">
                        {lead.contactName ? `${lead.contactName} (${lead.contactTitle || "Decision-Maker"})` : lead.industry || "Target Company"}
                      </span>
                      {lead.contactEmail && (
                        <span className="inline-flex items-center gap-1 text-zinc-600">
                          <EnvelopeSimple className="w-3 h-3 text-zinc-700" />
                          <a href={`mailto:${lead.contactEmail}`} className="hover:underline hover:text-zinc-950">
                            {lead.contactEmail}
                          </a>
                        </span>
                      )}
                      {lead.location && (
                        <span className="inline-flex items-center gap-1 text-zinc-400">
                          <MapPin className="w-3 h-3 text-zinc-500" />
                          <span>{lead.location}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onOpenEmailDrawer(lead)}
                  leftIcon={<PaperPlaneTilt className="w-3.5 h-3.5" />}
                  className="shrink-0"
                >
                  Draft PAS Email
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
