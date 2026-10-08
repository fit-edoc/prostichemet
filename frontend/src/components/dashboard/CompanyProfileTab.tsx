"use client";

import * as React from "react";
import { Button } from "../ui/Button";
import {
  Database,
  Globe,
  Sparkle,
  Check,
  MapPin,
  User,
} from "@phosphor-icons/react";

interface CompanyProfileTabProps {
  companyName: string;
  setCompanyName: (val: string) => void;
  industry: string;
  setIndustry: (val: string) => void;
  valueProposition: string;
  setValueProposition: (val: string) => void;
  productDescription: string;
  setProductDescription: (val: string) => void;
  targetAudience: string;
  setTargetAudience: (val: string) => void;
  typicalCustomer: string;
  setTypicalCustomer: (val: string) => void;
  typicalDealSize: string;
  setTypicalDealSize: (val: string) => void;
  region: string;
  setRegion: (val: string) => void;
  companyWebsiteUrl: string;
  setCompanyWebsiteUrl: (val: string) => void;
  isScrapingProfile: boolean;
  isRagIngesting: boolean;
  scrapeProfileNotice: string | null;
  isProfileLoading: boolean;
  isIcpGenerating: boolean;
  onScrapeAndUpdateProfile: () => void;
  onSaveProfile: (e: React.FormEvent) => void;
  onSaveAndDiscoverLeads: (e: React.FormEvent) => void;
}

export function CompanyProfileTab({
  companyName,
  setCompanyName,
  industry,
  setIndustry,
  valueProposition,
  setValueProposition,
  productDescription,
  setProductDescription,
  targetAudience,
  setTargetAudience,
  typicalCustomer,
  setTypicalCustomer,
  typicalDealSize,
  setTypicalDealSize,
  region,
  setRegion,
  companyWebsiteUrl,
  setCompanyWebsiteUrl,
  isScrapingProfile,
  isRagIngesting,
  scrapeProfileNotice,
  isProfileLoading,
  isIcpGenerating,
  onScrapeAndUpdateProfile,
  onSaveProfile,
  onSaveAndDiscoverLeads,
}: CompanyProfileTabProps) {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-zinc-950">
          Company & Product Profile
        </h2>
        <p className="text-xs text-zinc-500 mt-1 font-normal tracking-tight">
          Define your company offerings, target geographic territory, and ideal decision-makers to ground the autonomous RAG discovery pipeline.
        </p>
      </div>

      {/* Scraping RAG Fast-Filler */}
      <div className="p-4 rounded-md bg-white border border-blue-200/80 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-900">
            <Database className="w-3.5 h-3.5 text-blue-600" />
            <span>Scrape Company Website into RAG</span>
          </div>
          <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
            Auto-Fill & Vector Ground
          </span>
        </div>
        <p className="text-[11px] text-zinc-500 leading-normal">
          Enter your company domain to live-scrape value propositions, offerings, and location signals, automatically populating the form and indexing vector chunks into RAG.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <div className="relative flex-1">
            <Globe className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              placeholder="https://yourcompany.com"
              value={companyWebsiteUrl}
              onChange={(e) => setCompanyWebsiteUrl(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-[3px] py-1.5 pl-8 pr-3 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 font-normal"
            />
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onScrapeAndUpdateProfile}
            isLoading={isScrapingProfile || isRagIngesting}
            leftIcon={<Sparkle className="w-3.5 h-3.5 text-blue-600" />}
          >
            Scrape & Sync RAG
          </Button>
        </div>
        {scrapeProfileNotice && (
          <div className="p-2 rounded bg-blue-50/70 border border-blue-100 text-[11px] text-blue-800 flex items-center gap-1.5">
            <Check className="w-3 h-3 text-blue-600 shrink-0" />
            <span>{scrapeProfileNotice}</span>
          </div>
        )}
      </div>

      {/* Company Profile Form */}
      <div className="p-6 rounded-md bg-white border border-zinc-200/80 shadow-xs space-y-4">
        <form onSubmit={onSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-normal tracking-tight text-zinc-700 mb-1.5">
                Company Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-[3px] p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 transition-all font-normal tracking-tight"
              />
            </div>
            <div>
              <label className="block text-xs font-normal tracking-tight text-zinc-700 mb-1.5">
                Industry / Niche
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-[3px] p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 transition-all font-normal tracking-tight"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-normal tracking-tight text-zinc-700 mb-1.5">
              Core Value Proposition & Outcome <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={valueProposition}
              onChange={(e) => setValueProposition(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-[3px] p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 transition-all font-normal tracking-tight leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-normal tracking-tight text-zinc-700 mb-1.5">
              Product / Service Description
            </label>
            <textarea
              rows={2}
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-[3px] p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 transition-all font-normal tracking-tight leading-relaxed"
            />
          </div>

          {/* Territory & Target Audience - Key RAG Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded bg-zinc-50/70 border border-zinc-200/60">
            <div>
              <label className="block text-xs font-medium tracking-tight text-zinc-800 mb-1">
                Target Location / Territory <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. London, UK or Berlin, Germany or Austin, TX or India"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-white border border-zinc-200 rounded-[3px] py-2 pl-8 pr-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 font-normal"
                />
              </div>
              <p className="text-[10px] text-zinc-500 mt-1">
                All generated leads will be strictly located in this territory.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium tracking-tight text-zinc-800 mb-1">
                Target Decision-Makers & Audience <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Founders, VP of Sales, CTOs, Agency Owners"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full bg-white border border-zinc-200 rounded-[3px] py-2 pl-8 pr-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 font-normal"
                />
              </div>
              <p className="text-[10px] text-zinc-500 mt-1">
                Contact names and job titles will strictly target this persona.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-normal tracking-tight text-zinc-700 mb-1.5">
                Typical Customer Profile
              </label>
              <input
                type="text"
                value={typicalCustomer}
                onChange={(e) => setTypicalCustomer(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-[3px] p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 transition-all font-normal tracking-tight"
              />
            </div>
            <div>
              <label className="block text-xs font-normal tracking-tight text-zinc-700 mb-1.5">
                Typical Deal Size ($)
              </label>
              <input
                type="text"
                value={typicalDealSize}
                onChange={(e) => setTypicalDealSize(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-[3px] p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 transition-all font-normal tracking-tight"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-zinc-500">
              Territory: <strong className="text-zinc-800">{region}</strong>
            </span>

            <div className="flex items-center gap-2">
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                isLoading={isProfileLoading}
              >
                Save Profile
              </Button>

              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={onSaveAndDiscoverLeads}
                isLoading={isProfileLoading || isIcpGenerating}
                rightIcon={<Sparkle className="w-3.5 h-3.5" />}
              >
                Save & Discover Territory Leads
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
