"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { createBusinessProfile } from "../../store/slices/profileSlice";
import { generateIcpWithRAG } from "../../store/slices/icpSlice";
import { scrapeAndIngest } from "../../store/slices/ragSlice";
import { Button } from "../../components/ui/Button";
import { UserProfileDropdown } from "../../components/common/UserProfileDropdown";
import {
  Buildings,
  Sparkle,
  Target,
  ArrowRight,
  Check,
  Lightning,
  Briefcase,
  Globe,
  Coins,
  User,
  ShieldCheck,
  MagnifyingGlass,
  Database,
  MapPin,
} from "@phosphor-icons/react";

export default function OnboardingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  const { isLoading: isProfileLoading } = useAppSelector((state) => state.profile);
  const { isIngesting: isScrapingIngesting, successMessage: ragSuccessMessage } = useAppSelector((state) => state.rag);

  // Form State
  const [companyName, setCompanyName] = React.useState("");
  const [industry, setIndustry] = React.useState("B2B SaaS & Tech");
  const [valueProposition, setValueProposition] = React.useState("");
  const [productDescription, setProductDescription] = React.useState("");
  const [targetAudience, setTargetAudience] = React.useState("Founders, VP Sales, Heads of Growth");
  const [typicalDealSize, setTypicalDealSize] = React.useState("$10k - $50k / yr");
  const [region, setRegion] = React.useState("North America & Global");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Scraping RAG state
  const [websiteUrl, setWebsiteUrl] = React.useState("");
  const [scrapeNotice, setScrapeNotice] = React.useState<string | null>(null);

  // Protect route
  React.useEffect(() => {
    if (!token && !user) {
      router.push("/login");
    }
  }, [token, user, router]);

  const handleScrapeAndFill = async () => {
    if (!websiteUrl.trim()) return;
    setScrapeNotice(null);
    try {
      const resultAction = await dispatch(scrapeAndIngest({ url: websiteUrl.trim() }));
      if (scrapeAndIngest.fulfilled.match(resultAction)) {
        const data = resultAction.payload;
        if (data && data.extractedData) {
          const profile = data.extractedData;
          if (profile.companyName) setCompanyName(profile.companyName);
          if (profile.industry) setIndustry(profile.industry);
          if (profile.valueProposition) setValueProposition(profile.valueProposition);
          if (profile.productDescription) setProductDescription(profile.productDescription);
          if (profile.targetAudience) setTargetAudience(profile.targetAudience);
          if (profile.region) setRegion(profile.region);
          if (profile.typicalDealSize) setTypicalDealSize(profile.typicalDealSize);
          setScrapeNotice(`Scraped ${data.url} & ingested ${data.chunksIngested} vector knowledge chunks into RAG!`);
        }
      } else {
        setScrapeNotice("Could not parse website. You can still fill out the form manually.");
      }
    } catch {
      setScrapeNotice("Scraping connection error. You can continue manually.");
    }
  };

  const handleApplyTemplate = (type: "agency" | "saas" | "devtools") => {
    if (type === "agency") {
      setCompanyName("Nexus Growth Media");
      setIndustry("AI Outbound & Sales Development Agency");
      setValueProposition("Book 15-25 qualified enterprise sales meetings per month on a pure pay-per-meeting basis.");
      setProductDescription("Done-for-you AI prospect research, real-time trigger tracking, and automated multichannel cold email deliverability.");
      setTargetAudience("Founders, VP of Sales, CROs at Seed & Series A B2B Startups");
      setTypicalDealSize("$3,000 - $8,000 / mo");
      setRegion("North America & UK");
    } else if (type === "saas") {
      setCompanyName("ScaleAgent AI");
      setIndustry("B2B Enterprise SaaS & Agentic Automation");
      setValueProposition("Automate manual account research by 70% and increase cold email reply rates from 1.8% to 6.4%.");
      setProductDescription("Autonomous AI SDR agents that continuously monitor buying signals (funding rounds, hiring spikes) and draft personalized outreach.");
      setTargetAudience("VP Sales, Heads of Demand Gen, SDR Team Leads");
      setTypicalDealSize("$12,000 - $48,000 / yr");
      setRegion("Global");
    } else {
      setCompanyName("CloudGuard Pro");
      setIndustry("Cybersecurity & Cloud Infrastructure");
      setValueProposition("Zero-friction compliance automation and vulnerability remediation for modern cloud stacks.");
      setProductDescription("Continuous cloud security posture management with automated SOC2 & ISO 27001 audit workflows.");
      setTargetAudience("CTOs, CISOs, Heads of DevOps");
      setTypicalDealSize("$25,000 - $100,000 / yr");
      setRegion("North America & EMEA");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !valueProposition.trim()) return;

    setIsSubmitting(true);
    try {
      const resultAction = await dispatch(
        createBusinessProfile({
          companyName: companyName.trim(),
          industry,
          valueProposition: valueProposition.trim(),
          productDescription: productDescription.trim() || valueProposition.trim(),
          targetAudience,
          typicalCustomer: targetAudience,
          typicalDealSize,
          region,
        })
      );

      if (createBusinessProfile.fulfilled.match(resultAction)) {
        const createdProfile = resultAction.payload;
        await dispatch(
          generateIcpWithRAG({
            profileId: createdProfile.id,
            autoDiscover: true,
            leadCount: 5,
          })
        );
      }

      router.push("/dashboard");
    } catch (err) {
      console.error("Onboarding setup error:", err);
      router.push("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] text-zinc-950 flex flex-col font-normal tracking-tight selection:bg-zinc-900 selection:text-white">
      {/* Top Header */}
      <header className="w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="Postrichly"
              width={24}
              height={24}
              className="w-6 h-6 rounded object-contain transition-transform group-hover:scale-105"
              priority
            />
            <span className="text-sm font-normal text-zinc-950">Postrichly</span>
            <span className="bg-blue-700/10 text-blue-600 rounded-[2px] border-0 py-[2px] px-2 text-[10px] hidden sm:inline-flex">
              Company Intake & RAG Pipeline
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500 hidden sm:inline-block">
              Welcome, <strong className="text-zinc-900">{user?.name || "Founder"}</strong>
            </span>
            <UserProfileDropdown />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl w-full mx-auto px-6 py-8 flex-1 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-zinc-900 text-white rounded-[2px] px-1.5 py-0.5 text-[10px] uppercase font-mono">
              Step 1 of 2
            </span>
            <span className="text-xs text-zinc-400">GTM Grounding Setup</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-normal tracking-tight text-zinc-950">
            Tell us about your company & target territory
          </h1>
          <p className="text-xs text-zinc-500 mt-1 max-w-xl font-normal leading-relaxed">
            Our multi-agent RAG pipeline retrieves localized market signals and grounds prospect leads strictly within your entered geographic region and target decision-makers.
          </p>
        </div>

        {/* 1. NEW: Scraping RAG Bar */}
        <div className="p-4 rounded-md bg-white border border-blue-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-900">
              <Database className="w-3.5 h-3.5 text-blue-600" />
              <span>Live Web Scraping RAG Engine</span>
            </div>
            <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
              Auto-Extract & Vector Grounding
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 leading-normal">
            Paste your company URL (or target company website). Our autonomous scraper extracts your product offerings, target territory, and value proposition, then indexes it directly into your RAG vector base.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <div className="relative flex-1">
              <Globe className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                placeholder="https://yourcompany.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-[3px] py-1.5 pl-8 pr-3 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 font-normal"
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleScrapeAndFill}
              isLoading={isScrapingIngesting}
              leftIcon={<Sparkle className="w-3.5 h-3.5 text-blue-600" />}
            >
              Scrape & Auto-Fill Form
            </Button>
          </div>
          {scrapeNotice && (
            <div className="p-2 rounded bg-blue-50/70 border border-blue-100 text-[11px] text-blue-800 flex items-center gap-1.5">
              <Check className="w-3 h-3 text-blue-600 shrink-0" />
              <span>{scrapeNotice}</span>
            </div>
          )}
        </div>

        {/* Quick Template Presets */}
        <div className="space-y-1.5">
          <p className="text-[11px] text-zinc-400 uppercase tracking-tight text-center">
            Or choose a pre-configured B2B preset
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleApplyTemplate("saas")}
              className="p-3 rounded-md bg-white border border-zinc-200/80 hover:border-zinc-400 transition-all text-left cursor-pointer shadow-xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-zinc-950">
                  B2B AI SaaS
                </span>
                <Lightning className="w-3.5 h-3.5 text-zinc-700" />
              </div>
              <p className="text-[11px] text-zinc-500 line-clamp-2">
                Outbound research automation for sales leaders.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleApplyTemplate("agency")}
              className="p-3 rounded-md bg-white border border-zinc-200/80 hover:border-zinc-400 transition-all text-left cursor-pointer shadow-xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-zinc-950">
                  Outbound Agency
                </span>
                <Target className="w-3.5 h-3.5 text-zinc-700" />
              </div>
              <p className="text-[11px] text-zinc-500 line-clamp-2">
                Done-for-you pipeline & meeting booking.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleApplyTemplate("devtools")}
              className="p-3 rounded-md bg-white border border-zinc-200/80 hover:border-zinc-400 transition-all text-left cursor-pointer shadow-xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-zinc-950">
                  Cybersecurity
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
              </div>
              <p className="text-[11px] text-zinc-500 line-clamp-2">
                Cloud compliance and SOC2 automation.
              </p>
            </button>
          </div>
        </div>

        {/* The Intake Form */}
        <div className="p-6 rounded-md bg-white border border-zinc-200/80 shadow-xs space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 1. Company Name & Industry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-normal text-zinc-700 mb-1.5">
                  Company / Agency Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Buildings className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="ScaleAgent AI"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-[3px] py-2 pl-8 pr-3 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 transition-all font-normal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-normal text-zinc-700 mb-1.5">
                  Industry / Market Domain
                </label>
                <div className="relative">
                  <Briefcase className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-[3px] py-2 pl-8 pr-3 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 transition-all font-normal cursor-pointer"
                  >
                    <option value="B2B SaaS & Tech">B2B SaaS & Tech Startups</option>
                    <option value="AI Outbound & Sales Agency">AI Outbound & Sales Agency</option>
                    <option value="FinTech & Payments">FinTech & Financial Services</option>
                    <option value="Cybersecurity & Cloud">Cybersecurity & Cloud Security</option>
                    <option value="Healthcare & BioTech">Healthcare & Life Sciences Tech</option>
                    <option value="DevTools & Infrastructure">Developer Tools & Infrastructure</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Value Proposition */}
            <div>
              <label className="block text-xs font-normal text-zinc-700 mb-1.5">
                Core Value Proposition & Outcome <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="We automate B2B lead research and increase cold reply rates by 3x using live growth signals."
                value={valueProposition}
                onChange={(e) => setValueProposition(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-[3px] p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 transition-all font-normal leading-relaxed"
              />
            </div>

            {/* 3. Product / Service Description */}
            <div>
              <label className="block text-xs font-normal text-zinc-700 mb-1.5">
                Product & Service Summary
              </label>
              <textarea
                rows={2}
                placeholder="Autonomous AI platform that monitors hiring spikes and drafts evidence-grounded cold emails."
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-[3px] p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 transition-all font-normal leading-relaxed"
              />
            </div>

            {/* 4. Target Audience, Deal Size & Territory */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-normal text-zinc-700 mb-1.5">
                  Target Decision-Makers <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Founders, VP Sales, CTOs"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-[3px] py-1.5 pl-7 pr-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 font-normal"
                  />
                </div>
                <p className="text-[10px] text-zinc-400 mt-1">Leads will strictly target these roles</p>
              </div>

              <div>
                <label className="block text-xs font-normal text-zinc-700 mb-1.5">
                  Target Location / Territory <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. London, UK or Berlin, Germany or Austin, TX"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-[3px] py-1.5 pl-7 pr-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 font-normal"
                  />
                </div>
                <p className="text-[10px] text-zinc-400 mt-1">Leads will strictly be in this location</p>
              </div>

              <div>
                <label className="block text-xs font-normal text-zinc-700 mb-1.5">
                  Typical Deal Size ($)
                </label>
                <div className="relative">
                  <Coins className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="$10k - $50k / yr"
                    value={typicalDealSize}
                    onChange={(e) => setTypicalDealSize(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-[3px] py-1.5 pl-7 pr-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 font-normal"
                  />
                </div>
                <p className="text-[10px] text-zinc-400 mt-1">Expected annual contract value</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span>RAG pipeline grounds ICP & leads to your territory</span>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting || isProfileLoading}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Launch GTM Workspace
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
