"use client";

import * as React from "react";
import { Button } from "../ui/Button";
import { Target, Cpu } from "@phosphor-icons/react";
import { IcpProfile } from "../../types";

interface IcpEngineTabProps {
  icps: IcpProfile[];
  isIcpGenerating: boolean;
  onGenerateIcp: () => void;
}

export function IcpEngineTab({
  icps,
  isIcpGenerating,
  onGenerateIcp,
}: IcpEngineTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-zinc-950">
            Ideal Customer Profile (ICP) Engine
          </h2>
          <p className="text-xs text-zinc-500 mt-1 font-normal tracking-tight">
            Synthesized from RAG intelligence and market evidence
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={onGenerateIcp}
          isLoading={isIcpGenerating}
          leftIcon={<Cpu className="w-3.5 h-3.5" />}
        >
          Regenerate ICP
        </Button>
      </div>

      {icps.length === 0 ? (
        <div className="p-8 rounded-md bg-white border border-zinc-200/80 text-center space-y-3 shadow-xs">
          <Target className="w-8 h-8 text-zinc-700 mx-auto" />
          <p className="text-xs text-zinc-500 font-normal tracking-tight">
            No ICP profiles generated yet. Click above to synthesize your profile using Gemini RAG.
          </p>
          <Button variant="primary" size="sm" onClick={onGenerateIcp}>
            Generate ICP Now
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {icps.map((icp) => (
            <div key={icp.id} className="p-5 rounded-md bg-white border border-zinc-200/80 shadow-xs space-y-4">
              <div>
                <span className="bg-blue-700/10 text-blue-600 rounded-[2px] border-0 py-[2px] px-2 text-[10px] font-normal tracking-tight inline-block mb-1.5">
                  ICP v1.0 Active
                </span>
                <h3 className="text-sm font-medium tracking-tight text-zinc-950">
                  {icp.title}
                </h3>
              </div>

              {/* Industries */}
              {icp.targetIndustries && (
                <div className="space-y-1.5">
                  <span className="text-[11px] text-zinc-400 block font-normal tracking-tight uppercase">
                    Target Industries
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {icp.targetIndustries.map((ind, i) => (
                      <span key={i} className="bg-zinc-700/10 text-zinc-600 rounded-[2px] border-0 py-[2px] px-2 text-[11px] font-normal tracking-tight">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Target Roles */}
              {icp.targetRoles && (
                <div className="space-y-1.5">
                  <span className="text-[11px] text-zinc-400 block font-normal tracking-tight uppercase">
                    Decision Makers
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {icp.targetRoles.map((role, i) => (
                      <span key={i} className="bg-purple-700/10 text-purple-600 rounded-[2px] border-0 py-[2px] px-2 text-[11px] font-normal tracking-tight">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Pain Points */}
              {icp.painPoints && (
                <div className="space-y-1.5">
                  <span className="text-[11px] text-zinc-400 block font-normal tracking-tight uppercase">
                    Core Pain Points
                  </span>
                  <ul className="space-y-1 text-xs text-zinc-600 leading-relaxed font-normal tracking-tight">
                    {icp.painPoints.map((pain, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-zinc-400">•</span>
                        <span>{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
