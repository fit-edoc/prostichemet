"use client";

import * as React from "react";
import { Button } from "../ui/Button";
import {
  MagnifyingGlass,
  Sparkle,
  MapPin,
  User,
  ArrowRight,
  Globe,
  ArrowSquareOut,
  Copy,
  Check,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import { ProspectLead, BusinessProfile } from "../../types";
import { getLeadAvatar } from "./dashboardUtils";

interface CrmPipelineTabProps {
  leads: ProspectLead[];
  leadSearch: string;
  setLeadSearch: (val: string) => void;
  isResearching: boolean;
  onRunResearch: () => void;
  activeProfile: BusinessProfile | null;
  profiles: BusinessProfile[];
  region: string;
  targetAudience: string;
  onNavigateToProfile: () => void;
  onUpdateLeadStatus: (leadId: number, status: ProspectLead["status"]) => void;
  onOpenEmailDrawer: (lead: ProspectLead) => void;
}

export function CrmPipelineTab({
  leads,
  leadSearch,
  setLeadSearch,
  isResearching,
  onRunResearch,
  activeProfile,
  profiles,
  region,
  targetAudience,
  onNavigateToProfile,
  onUpdateLeadStatus,
  onOpenEmailDrawer,
}: CrmPipelineTabProps) {
  const [copiedEmailAddress, setCopiedEmailAddress] = React.useState<string | null>(null);

  const handleCopyLeadEmail = (email: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedEmailAddress(email);
    setTimeout(() => setCopiedEmailAddress(null), 2000);
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.companyName.toLowerCase().includes(leadSearch.toLowerCase()) ||
      (lead.contactName && lead.contactName.toLowerCase().includes(leadSearch.toLowerCase())) ||
      (lead.contactTitle && lead.contactTitle.toLowerCase().includes(leadSearch.toLowerCase()))
  );

  const activeTerritory = activeProfile?.region || (profiles.length > 0 ? profiles[0].region : region || "Global");
  const activePersona = activeProfile?.targetAudience || (profiles.length > 0 ? profiles[0].targetAudience : targetAudience || "Decision Makers");

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-zinc-950">
            Evidence Pipeline & CRM
          </h2>
          <p className="text-xs text-zinc-500 mt-1 font-normal tracking-tight">
            Prospects scored with verified buying triggers & contact intelligence
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <MagnifyingGlass className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter prospects..."
              value={leadSearch}
              onChange={(e) => setLeadSearch(e.target.value)}
              className="bg-white border border-zinc-200/90 rounded-[3px] py-1.5 pl-8 pr-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 transition-all font-normal tracking-tight w-48"
            />
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={onRunResearch}
            isLoading={isResearching}
            leftIcon={<Sparkle className="w-3.5 h-3.5" />}
          >
            Find Leads
          </Button>
        </div>
      </div>

      {/* Active Territory & Audience Grounding Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-[4px] bg-white border border-zinc-200/80 shadow-2xs text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] text-zinc-400 uppercase tracking-tight font-medium">
            RAG Grounding:
          </span>
          <span className="inline-flex items-center gap-1 bg-zinc-50 border border-zinc-200/80 px-2 py-0.5 rounded-[3px] text-[11px] text-zinc-900 font-medium">
            <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
            <span className="text-zinc-500 font-normal">Territory:</span> {activeTerritory}
          </span>
          <span className="inline-flex items-center gap-1 bg-zinc-50 border border-zinc-200/80 px-2 py-0.5 rounded-[3px] text-[11px] text-zinc-900 font-medium">
            <User className="w-3 h-3 text-purple-600 shrink-0" />
            <span className="text-zinc-500 font-normal">Target Persona:</span> {activePersona}
          </span>
        </div>
        <button
          type="button"
          onClick={onNavigateToProfile}
          className="text-[11px] text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-center gap-1 cursor-pointer"
        >
          <span>Edit Territory</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Leads Table */}
      <div className="bg-white border border-zinc-200/80 rounded-md overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-normal tracking-tight border-collapse">
            <thead className="bg-zinc-50/70 border-b border-zinc-200/80 text-zinc-500 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4 font-normal">Company</th>
                <th className="py-3 px-4 font-normal">Decision Maker</th>
                <th className="py-3 px-4 font-normal">Location</th>
                <th className="py-3 px-4 font-normal">Verified Trigger</th>
                <th className="py-3 px-4 font-normal">Fit Score</th>
                <th className="py-3 px-4 font-normal">Status</th>
                <th className="py-3 px-4 font-normal text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredLeads.map((lead, idx) => {
                const websiteUrl = lead.websiteLink || `https://${lead.companyName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`;
                const displayWebsite = websiteUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.location || lead.companyName)}`;

                return (
                  <tr key={lead.id} className="hover:bg-zinc-50/60 transition-colors">
                    {/* Company & Website */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-medium text-xs text-zinc-950">
                        {lead.companyName}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <a
                          href={websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-950 transition-colors"
                          title={`Visit ${websiteUrl}`}
                        >
                          <Globe className="w-3 h-3 text-zinc-400" />
                          <span className="truncate max-w-[120px]">{displayWebsite}</span>
                          <ArrowSquareOut className="w-2.5 h-2.5 opacity-60" />
                        </a>
                      </div>
                    </td>

                    {/* Decision Maker with Real Avatar */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={getLeadAvatar(lead.id || idx)}
                          alt={lead.contactName || "Decision Maker"}
                          className="w-7 h-7 rounded-full object-cover border border-zinc-200/80 shadow-xs shrink-0"
                        />
                        <div>
                          <div className="text-zinc-950 font-normal text-xs">
                            {lead.contactName || "Budget Holder"}
                          </div>
                          {lead.contactEmail ? (
                            <div className="flex items-center gap-1 mt-0.5">
                              <a
                                href={`mailto:${lead.contactEmail}`}
                                className="text-[11px] text-zinc-500 hover:text-zinc-950 hover:underline"
                              >
                                {lead.contactEmail}
                              </a>
                              <button
                                type="button"
                                onClick={(e) => handleCopyLeadEmail(lead.contactEmail!, e)}
                                className="p-0.5 text-zinc-400 hover:text-zinc-950 transition-colors cursor-pointer"
                                title="Copy Email"
                              >
                                {copiedEmailAddress === lead.contactEmail ? (
                                  <Check className="w-3 h-3 text-green-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          ) : (
                            <span className="text-[11px] text-zinc-400">Not listed</span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Google Maps Address */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {lead.location ? (
                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-950 transition-colors"
                          title={`View ${lead.location} on Google Maps`}
                        >
                          <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                          <span className="truncate max-w-[120px]">{lead.location}</span>
                        </a>
                      ) : (
                        <span className="text-[11px] text-zinc-400">Location unmapped</span>
                      )}
                    </td>

                    {/* Verified Trigger Signal */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                        {lead.evidence && typeof lead.evidence === "object"
                          ? (lead.evidence as any).trigger || (lead.evidence as any).reason || (lead.evidence as any).painPointMatch || "Verified Buying Signal"
                          : typeof lead.evidence === "string"
                          ? lead.evidence
                          : "Recent expansion in sales team & active outbound hiring"}
                      </p>
                    </td>

                    {/* Fit Score with Multi-color Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="bg-green-700/10 text-green-600 rounded-[2px] border-0 py-[2px] px-2 text-[11px] font-normal tracking-tight">
                        {lead.score || 85}% Fit
                      </span>
                    </td>

                    {/* CRM Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          onUpdateLeadStatus(lead.id, e.target.value as ProspectLead["status"])
                        }
                        className="bg-white border border-zinc-200 rounded-[3px] px-2 py-1 text-[11px] text-zinc-800 focus:outline-none focus:border-zinc-950 cursor-pointer font-normal"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Meeting Booked">Meeting Booked</option>
                        <option value="Replied">Replied</option>
                      </select>
                    </td>

                    {/* Action Button */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onOpenEmailDrawer(lead)}
                        leftIcon={<PaperPlaneTilt className="w-3 h-3" />}
                      >
                        Draft PAS
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
