"use client";

import * as React from "react";
import { Button } from "../ui/Button";
import {
  X,
  CircleNotch,
  Check,
  Copy,
} from "@phosphor-icons/react";
import { ProspectLead } from "../../types";
import { getLeadAvatar } from "./dashboardUtils";

interface ColdEmailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lead: ProspectLead | null;
  selectedFramework: string;
  onSelectFramework: (framework: string) => void;
  isGeneratingEmail: boolean;
  activeColdEmail: { subject: string; body: string } | null;
}

export function ColdEmailDrawer({
  isOpen,
  onClose,
  lead,
  selectedFramework,
  onSelectFramework,
  isGeneratingEmail,
  activeColdEmail,
}: ColdEmailDrawerProps) {
  const [copiedEmail, setCopiedEmail] = React.useState(false);

  if (!isOpen || !lead) return null;

  const handleCopyEmail = () => {
    if (activeColdEmail) {
      const fullText = `Subject: ${activeColdEmail.subject}\n\n${activeColdEmail.body}`;
      navigator.clipboard.writeText(fullText);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white h-full border-l border-zinc-200 shadow-xl p-5 flex flex-col justify-between overflow-y-auto text-zinc-900 font-normal tracking-tight">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <div>
              <h3 className="text-sm font-medium tracking-tight text-zinc-950">
                Grounded Outreach Synthesis
              </h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Prospect: {lead.companyName}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-[3px] border border-zinc-200 bg-white hover:bg-zinc-50 flex items-center justify-center text-zinc-500 hover:text-zinc-950 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Dossier Card with Real Avatar & Multi-color Badges */}
          <div className="p-3.5 rounded-md bg-zinc-50/80 border border-zinc-200/80 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={getLeadAvatar(lead.id || 0)}
                  alt={lead.contactName || lead.companyName}
                  className="w-8 h-8 rounded-full object-cover border border-zinc-200/80 shadow-xs"
                />
                <div>
                  <h4 className="text-xs font-medium text-zinc-950 tracking-tight">
                    {lead.contactName || "Decision Maker"}
                  </h4>
                  <p className="text-[11px] text-zinc-500">
                    {lead.contactTitle || "Head of Revenue"} · {lead.companyName}
                  </p>
                </div>
              </div>
              <span className="bg-green-700/10 text-green-600 rounded-[2px] border-0 py-[2px] px-2 text-[10px] font-normal tracking-tight">
                {lead.score || 85}% Fit
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-zinc-200/60">
              <div>
                <span className="text-[10px] text-zinc-400 block mb-0.5 uppercase">
                  Email
                </span>
                {lead.contactEmail ? (
                  <span className="text-xs text-zinc-800 truncate block">
                    {lead.contactEmail}
                  </span>
                ) : (
                  <span className="text-xs text-zinc-400 italic">Unlisted</span>
                )}
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block mb-0.5 uppercase">
                  Verification
                </span>
                <span className="bg-purple-700/10 text-purple-600 rounded-[2px] border-0 py-[2px] px-1.5 text-[10px]">
                  SMTP Verified
                </span>
              </div>
            </div>
          </div>

          {/* Framework Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs text-zinc-500 uppercase tracking-tight">
              Outreach Framework
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onSelectFramework("PAS")}
                className={`py-2 px-3 rounded-[3px] border text-xs text-left cursor-pointer transition-all ${
                  selectedFramework === "PAS"
                    ? "bg-zinc-950 text-white font-normal border-zinc-950"
                    : "bg-white border-zinc-200 text-zinc-700 hover:text-zinc-950"
                }`}
              >
                PAS (Problem-Agitate-Solve)
              </button>

              <button
                type="button"
                onClick={() => onSelectFramework("Observation-Insight-Value")}
                className={`py-2 px-3 rounded-[3px] border text-xs text-left cursor-pointer transition-all ${
                  selectedFramework === "Observation-Insight-Value"
                    ? "bg-zinc-950 text-white font-normal border-zinc-950"
                    : "bg-white border-zinc-200 text-zinc-700 hover:text-zinc-950"
                }`}
              >
                Observation-Insight-Value
              </button>
            </div>
          </div>

          {/* Generated Email Content */}
          {isGeneratingEmail ? (
            <div className="p-8 text-center space-y-2">
              <CircleNotch className="w-6 h-6 text-zinc-950 animate-spin mx-auto" />
              <p className="text-xs text-zinc-500">
                Grounding evidence quotes and drafting copy...
              </p>
            </div>
          ) : activeColdEmail ? (
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-md bg-zinc-50 border border-zinc-200/70">
                <span className="text-[10px] text-zinc-400 uppercase block mb-1">
                  Subject
                </span>
                <p className="text-xs font-medium text-zinc-950">
                  {activeColdEmail.subject}
                </p>
              </div>

              <div className="p-3.5 rounded-md bg-zinc-50 border border-zinc-200/70">
                <span className="text-[10px] text-zinc-400 uppercase block mb-1">
                  Draft Body
                </span>
                <p className="text-xs text-zinc-800 whitespace-pre-line leading-relaxed">
                  {activeColdEmail.body}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopyEmail}
            leftIcon={copiedEmail ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
          >
            {copiedEmail ? "Copied!" : "Copy Email"}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onClose}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
