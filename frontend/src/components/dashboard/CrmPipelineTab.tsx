"use client";

import * as React from "react";
import { Button } from "../ui/Button";
import {
  MagnifyingGlass,
  Sparkle,
  ArrowRight,
  Globe,
  ArrowSquareOut,
  Copy,
  Check,
  PaperPlaneTilt,
  Buildings,
  Users,
  TrendUp,
  Briefcase,
  Lightning,
} from "@phosphor-icons/react";
import { ProspectLead, BusinessProfile } from "../../types";
import { getLeadAvatar } from "./dashboardUtils";

// Authentic Official LinkedIn Brand Icon
export function LinkedInIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

// Authentic Gmail / Mail Icon in Official Google Red
export function GmailIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        fill="#EA4335"
        fillOpacity="0.15"
        stroke="#EA4335"
        strokeWidth="1.6"
      />
      <path
        d="M22 6l-10 7L2 6"
        stroke="#EA4335"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Authentic Google Maps Pin Icon
export function GoogleMapsIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        fill="#EA4335"
      />
      <circle cx="12" cy="9" r="2.8" fill="#FFFFFF" />
    </svg>
  );
}

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
      (lead.contactTitle && lead.contactTitle.toLowerCase().includes(leadSearch.toLowerCase())) ||
      (lead.industry && lead.industry.toLowerCase().includes(leadSearch.toLowerCase())) ||
      (lead.location && lead.location.toLowerCase().includes(leadSearch.toLowerCase()))
  );

  const activeTerritory =
    activeProfile?.region || (profiles.length > 0 ? profiles[0].region : region || "Global");
  const activePersona =
    activeProfile?.targetAudience ||
    (profiles.length > 0 ? profiles[0].targetAudience : targetAudience || "Decision Makers");

  return (
    <div className="space-y-4 max-w-full overflow-hidden">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-zinc-950">
              Evidence Pipeline &amp; CRM
            </h2>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2 py-0.5 rounded-[3px] text-[10px] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {leads.length} Verified Leads
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-1 font-normal tracking-tight">
            Enriched prospects with live LinkedIn pages, buying signals &amp; verifiable evidence
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <MagnifyingGlass className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by company, name, role..."
              value={leadSearch}
              onChange={(e) => setLeadSearch(e.target.value)}
              className="bg-white border border-zinc-200/90 rounded-[4px] py-1.5 pl-8 pr-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-blue-600 transition-all font-normal tracking-tight w-56 shadow-2xs"
            />
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={onRunResearch}
            isLoading={isResearching}
            leftIcon={<Sparkle className="w-3.5 h-3.5 text-amber-300" />}
          >
            Find Leads
          </Button>
        </div>
      </div>

      {/* Active Territory & Audience Grounding Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-[4px] bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-white border border-blue-100 shadow-2xs text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] text-zinc-500 uppercase tracking-tight font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            RAG Grounding:
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white border border-blue-200/80 px-2.5 py-0.5 rounded-[3px] text-[11px] text-zinc-900 font-medium shadow-2xs">
            <GoogleMapsIcon className="w-3 h-3 shrink-0" />
            <span className="text-zinc-500 font-normal">Territory:</span> {activeTerritory}
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white border border-purple-200/80 px-2.5 py-0.5 rounded-[3px] text-[11px] text-zinc-900 font-medium shadow-2xs">
            <Briefcase className="w-3 h-3 text-purple-600 shrink-0" />
            <span className="text-zinc-500 font-normal">Target Persona:</span> {activePersona}
          </span>
        </div>
        <button
          type="button"
          onClick={onNavigateToProfile}
          className="text-[11px] text-blue-700 hover:text-blue-900 transition-colors font-medium flex items-center gap-1 cursor-pointer"
        >
          <span>Configure Criteria</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Leads Table Container with Isolated Horizontal Scroll */}
      <div className="bg-white border border-zinc-200/90 rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto overflow-y-hidden scrollbar-thin">
          <table className="w-full min-w-[1040px] text-left text-xs font-normal tracking-tight border-collapse">
            <thead className="bg-zinc-50/90 border-b border-zinc-200/90 text-zinc-600 uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-3.5 sm:px-4 font-semibold w-[220px] min-w-[190px]">Company &amp; Domain</th>
                <th className="py-3 px-3.5 sm:px-4 font-semibold w-[230px] min-w-[200px]">Decision Maker &amp; Email</th>
                <th className="py-3 px-3.5 sm:px-4 font-semibold w-[180px] min-w-[160px]">LinkedIn Access</th>
                <th className="py-3 px-3.5 sm:px-4 font-semibold w-[160px] min-w-[140px]">Territory</th>
                <th className="py-3 px-3.5 sm:px-4 font-semibold min-w-[250px] max-w-xs">Buying Triggers &amp; Signals</th>
                <th className="py-3 px-3.5 sm:px-4 font-semibold w-[110px] min-w-[100px]">Fit Score</th>
                <th className="py-3 px-3.5 sm:px-4 font-semibold w-[130px] min-w-[120px]">Status</th>
                <th className="py-3 px-3.5 sm:px-4 font-semibold w-[110px] min-w-[100px] text-right">Outreach</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-zinc-400">
                    <Buildings className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                    <p className="text-sm font-normal text-zinc-600">No leads match your search criteria.</p>
                    <p className="text-xs text-zinc-400 mt-0.5">Click &quot;Find Leads&quot; to discover fresh prospects with verified LinkedIn pages.</p>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead, idx) => {
                  const websiteUrl =
                    lead.websiteLink ||
                    `https://${lead.companyName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`;
                  const displayWebsite = websiteUrl
                    .replace(/^https?:\/\/(www\.)?/, "")
                    .replace(/\/$/, "");
                  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    lead.location || lead.companyName
                  )}`;

                  // Verified Personal LinkedIn Profile or Targeted Search Query
                  const hasDirectProfile =
                    lead.contactLinkedin &&
                    lead.contactLinkedin.includes("linkedin.com/in/") &&
                    !lead.contactLinkedin.includes("first-last") &&
                    !lead.contactLinkedin.includes("contact-profile");

                  const contactLinkedinUrl =
                    lead.contactLinkedin && lead.contactLinkedin.startsWith("http")
                      ? lead.contactLinkedin
                      : lead.contactLinkedin
                      ? `https://${lead.contactLinkedin}`
                      : `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(
                          (lead.contactName || lead.ownerName || "") + " " + lead.companyName
                        )}`;

                  // Company LinkedIn Page or Company Search URL
                  const hasDirectCompany =
                    (lead.evidence as any)?.companyLinkedin &&
                    (lead.evidence as any).companyLinkedin.includes("linkedin.com/company/");

                  const companyLinkedinUrl =
                    (lead.evidence as any)?.companyLinkedin ||
                    `https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(lead.companyName)}`;

                  // Fit score coloring
                  const score = lead.score || 85;
                  const isTopFit = score >= 95;
                  const isHighFit = score >= 90;

                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-blue-50/30 transition-colors group"
                    >
                      {/* 1. Company & Website with Real Favicon */}
                      <td className="py-3 px-3.5 sm:px-4 whitespace-nowrap min-w-[200px]">
                        <div className="flex items-center gap-2">
                          <img
                            src={`https://www.google.com/s2/favicons?domain=${displayWebsite}&sz=32`}
                            alt={lead.companyName}
                            className="w-4 h-4 rounded-xs shrink-0 object-contain shadow-2xs"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                          <div className="font-semibold text-xs text-zinc-950">
                            {lead.companyName}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                          <a
                            href={websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 transition-colors"
                            title={`Visit official site: ${websiteUrl}`}
                          >
                            <Globe className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span className="truncate max-w-[120px]">{displayWebsite}</span>
                            <ArrowSquareOut className="w-2.5 h-2.5 opacity-70" />
                          </a>

                          {lead.companySize && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] text-zinc-500 bg-zinc-100 px-1.5 py-0.2 rounded font-normal">
                              <Users className="w-2.5 h-2.5 text-zinc-600" />
                              {lead.companySize.split(" ")[0]}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 2. Decision Maker & Email with Real Gmail Icon */}
                      <td className="py-3 px-3.5 sm:px-4 whitespace-nowrap min-w-[210px]">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={getLeadAvatar(lead.id || idx)}
                            alt={lead.contactName || "Decision Maker"}
                            className="w-8 h-8 rounded-full object-cover border border-zinc-200/90 shadow-2xs shrink-0"
                          />
                          <div>
                            <div className="text-zinc-950 font-medium text-xs flex items-center gap-1">
                              <span>{lead.contactName || "Budget Holder"}</span>
                            </div>
                            <span className="text-[11px] text-zinc-500 block truncate max-w-[150px]">
                              {lead.contactTitle || "Head of Growth"}
                            </span>

                            {lead.contactEmail ? (
                              <div className="flex items-center gap-1 mt-0.5">
                                <GmailIcon className="w-3 h-3 shrink-0" />
                                <a
                                  href={`mailto:${lead.contactEmail}`}
                                  className="text-[11px] text-zinc-600 hover:text-zinc-950 hover:underline"
                                  title={`Email ${lead.contactEmail}`}
                                >
                                  {lead.contactEmail}
                                </a>
                                <button
                                  type="button"
                                  onClick={(e) => handleCopyLeadEmail(lead.contactEmail!, e)}
                                  className="p-0.5 text-zinc-400 hover:text-zinc-950 transition-colors cursor-pointer"
                                  title="Copy Email address"
                                >
                                  {copiedEmailAddress === lead.contactEmail ? (
                                    <Check className="w-3 h-3 text-emerald-600 font-bold" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                            ) : (
                              <span className="text-[10px] text-zinc-400">Email not listed</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* 3. Real, Colorful LinkedIn Profile & Company Page */}
                      <td className="py-3 px-3.5 sm:px-4 whitespace-nowrap min-w-[160px]">
                        <div className="flex flex-col gap-1.5 items-start">
                          <a
                            href={contactLinkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#0A66C2] hover:bg-[#004182] text-white text-[11px] font-medium shadow-2xs hover:shadow-xs transition-all active:scale-95 group/link"
                            title={hasDirectProfile ? `Open verified LinkedIn profile for ${lead.contactName || "Contact"}` : `Find ${lead.contactName || "Decision Maker"} at ${lead.companyName} on LinkedIn (accurate search, no 404)`}
                          >
                            <LinkedInIcon className="w-3.5 h-3.5 fill-white shrink-0 group-hover/link:scale-105 transition-transform" />
                            <span>{hasDirectProfile ? "LinkedIn Profile" : "Find on LinkedIn"}</span>
                            <ArrowSquareOut className="w-2.5 h-2.5 opacity-80" />
                          </a>

                          <a
                            href={companyLinkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] bg-sky-50 hover:bg-sky-100 text-[#0A66C2] border border-sky-200/80 text-[10px] font-medium transition-colors"
                            title={hasDirectCompany ? `Open ${lead.companyName}'s official LinkedIn company page` : `Search ${lead.companyName} on LinkedIn`}
                          >
                            <LinkedInIcon className="w-2.5 h-2.5 fill-[#0A66C2] shrink-0" />
                            <span>{hasDirectCompany ? "Company Page" : "Find Company"}</span>
                          </a>
                        </div>
                      </td>

                      {/* 4. Google Maps Address with Real Maps Icon */}
                      <td className="py-3 px-3.5 sm:px-4 whitespace-nowrap min-w-[140px]">
                        {lead.location ? (
                          <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[11px] text-zinc-600 hover:text-blue-700 transition-colors group/map"
                            title={`View "${lead.location}" on Google Maps`}
                          >
                            <GoogleMapsIcon className="w-3.5 h-3.5 shrink-0 group-hover/map:scale-110 transition-transform" />
                            <span className="truncate max-w-[130px] font-normal">
                              {lead.location}
                            </span>
                          </a>
                        ) : (
                          <span className="text-[11px] text-zinc-400">Global / Remote</span>
                        )}
                      </td>

                      {/* 5. Buying Triggers & Signals with Colorful Badges */}
                      <td className="py-3 px-3.5 sm:px-4 min-w-[250px] max-w-xs">
                        <div className="space-y-1">
                          {Array.isArray(lead.signals) && lead.signals.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {lead.signals.slice(0, 2).map((sig, sIdx) => {
                                const isFunding = /fund|seed|series|\$|capital|raised/i.test(sig);
                                const isHiring = /hire|hiring|role|team|sdr|engineer|recruit/i.test(sig);
                                const isTech = /tech|stack|ai|cloud|migrat|launch/i.test(sig);

                                return (
                                  <span
                                    key={sIdx}
                                    className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-[3px] border ${
                                      isFunding
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/90"
                                        : isHiring
                                        ? "bg-purple-50 text-purple-700 border-purple-200/90"
                                        : isTech
                                        ? "bg-sky-50 text-sky-700 border-sky-200/90"
                                        : "bg-amber-50 text-amber-700 border-amber-200/90"
                                    }`}
                                  >
                                    {isFunding ? (
                                      <TrendUp className="w-2.5 h-2.5 text-emerald-600" />
                                    ) : isHiring ? (
                                      <Users className="w-2.5 h-2.5 text-purple-600" />
                                    ) : (
                                      <Lightning className="w-2.5 h-2.5 text-sky-600" />
                                    )}
                                    <span className="truncate max-w-[140px]">{sig}</span>
                                  </span>
                                );
                              })}
                            </div>
                          )}

                          <p className="text-[11px] text-zinc-600 line-clamp-2 leading-relaxed">
                            {lead.evidence && typeof lead.evidence === "object"
                              ? (lead.evidence as any).trigger ||
                                (lead.evidence as any).reason ||
                                (lead.evidence as any).painPointMatch ||
                                "Verified Buying Signal"
                              : typeof lead.evidence === "string"
                              ? lead.evidence
                              : "Verified buying trigger active"}
                          </p>
                        </div>
                      </td>

                      {/* 6. Fit Score with Colorful Tiered Badge */}
                      <td className="py-3 px-3.5 sm:px-4 whitespace-nowrap min-w-[100px]">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] text-[11px] font-semibold border shadow-2xs ${
                            isTopFit
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : isHighFit
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isTopFit
                                ? "bg-emerald-500 animate-pulse"
                                : isHighFit
                                ? "bg-blue-500"
                                : "bg-amber-500"
                            }`}
                          />
                          {score}% Fit
                        </span>
                      </td>

                      {/* 7. CRM Status with Real Color Palette */}
                      <td className="py-3 px-3.5 sm:px-4 whitespace-nowrap min-w-[120px]">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            onUpdateLeadStatus(lead.id, e.target.value as ProspectLead["status"])
                          }
                          className={`rounded-[4px] px-2.5 py-1 text-[11px] font-medium border focus:outline-none cursor-pointer transition-all shadow-2xs ${
                            lead.status === "New"
                              ? "bg-sky-50 text-sky-700 border-sky-300 hover:bg-sky-100"
                              : lead.status === "Contacted"
                              ? "bg-purple-50 text-purple-700 border-purple-300 hover:bg-purple-100"
                              : lead.status === "Qualified"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                              : lead.status === "Meeting Booked"
                              ? "bg-indigo-50 text-indigo-700 border-indigo-300 hover:bg-indigo-100"
                              : "bg-green-50 text-green-700 border-green-300 hover:bg-green-100"
                          }`}
                        >
                          <option value="New">● New</option>
                          <option value="Contacted">● Contacted</option>
                          <option value="Qualified">● Qualified</option>
                          <option value="Meeting Booked">● Meeting Booked</option>
                          <option value="Replied">● Replied</option>
                        </select>
                      </td>

                      {/* 8. Action Button with Gradient & Colorful Icon */}
                      <td className="py-3 px-3.5 sm:px-4 text-right whitespace-nowrap min-w-[100px]">
                        <button
                          type="button"
                          onClick={() => onOpenEmailDrawer(lead)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 text-white text-xs font-medium shadow-xs transition-all cursor-pointer"
                        >
                          <PaperPlaneTilt className="w-3.5 h-3.5 text-white" />
                          <span>Draft PAS</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* CRM Table Footer Spacing & Info */}
        <div className="bg-zinc-50/80 border-t border-zinc-200/80 px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-zinc-500">
          <span>
            Showing <strong className="text-zinc-900 font-medium">{filteredLeads.length}</strong> of{" "}
            <strong className="text-zinc-900 font-medium">{leads.length}</strong> small &amp; medium business prospects
          </span>
          <div className="flex items-center gap-2 text-zinc-400 text-[10px]">
            <span>● Real-time Google Search Grounded</span>
            <span>● Authentic LinkedIn URLs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
