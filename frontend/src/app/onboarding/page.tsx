"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { createBusinessProfile } from "../../store/slices/profileSlice";
import { generateIcpWithRAG } from "../../store/slices/icpSlice";
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
} from "@phosphor-icons/react";

export default function OnboardingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  const { isLoading: isProfileLoading } = useAppSelector((state) => state.profile);

  // Form State
  const [companyName, setCompanyName] = React.useState("");
  const [industry, setIndustry] = React.useState("B2B SaaS & Tech");
  const [valueProposition, setValueProposition] = React.useState("");
  const [productDescription, setProductDescription] = React.useState("");
  const [targetAudience, setTargetAudience] = React.useState("Founders, VP Sales, Heads of Growth");
  const [typicalDealSize, setTypicalDealSize] = React.useState("$10k - $50k / yr");
  const [region, setRegion] = React.useState("North America & Global");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Protect route
  React.useEffect(() => {
    if (!token && !user) {
      router.push("/login");
    }
  }, [token, user, router]);

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
      {/* Top Header with RAW Icon */}
      <header className="w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <svg
              className="w-5 h-5 text-zinc-950 transition-transform group-hover:scale-105"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3v6" />
              <path d="m15 15-3-3-3 3" />
            </svg>
            <span className="text-sm font-normal text-zinc-950">Postrichment</span>
            <span className="bg-blue-700/10 text-blue-600 rounded-[2px] border-0 py-[2px] px-2 text-[10px] hidden sm:inline-flex">
              Company Intake
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

      {/* Main Intake Container */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 space-y-6">
        {/* Step Indicator Header with Multi-color Badge */}
        <div className="text-center space-y-1.5">
          <span className="bg-purple-700/10 text-purple-600 rounded-[2px] border-0 py-[2px] px-2 text-[11px] inline-flex items-center gap-1.5">
            <Sparkle className="w-3.5 h-3.5" />
            Step 1 of 1: Configure Your GTM Engine
          </span>
          <h1 className="text-2xl sm:text-3xl font-normal tracking-tight text-zinc-950">
            Tell us about your company
          </h1>
          <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
            Our autonomous research engine uses your value proposition to find verified buyers, extract growth triggers, and draft personalized outreach.
          </p>
        </div>

        {/* Quick Template Presets */}
        <div className="space-y-1.5">
          <p className="text-[11px] text-zinc-400 uppercase tracking-tight text-center">
            Quick 1-Click Templates
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

            {/* 4. Target Audience, Deal Size & Region */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-normal text-zinc-700 mb-1.5">
                  Target Decision-Makers
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Founders, VP Sales"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-[3px] py-1.5 pl-7 pr-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 font-normal"
                  />
                </div>
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
              </div>

              <div>
                <label className="block text-xs font-normal text-zinc-700 mb-1.5">
                  Geographic Region
                </label>
                <div className="relative">
                  <Globe className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="North America & Global"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-[3px] py-1.5 pl-7 pr-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 font-normal"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span>AI auto-generates your ICP profile & initial leads</span>
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
