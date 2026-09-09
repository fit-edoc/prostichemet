"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { createBusinessProfile, fetchProfiles } from "../../store/slices/profileSlice";
import { generateIcpWithRAG } from "../../store/slices/icpSlice";
import { Button } from "../../components/ui/Button";
import { GlassCard } from "../../components/ui/GlassCard";
import { Badge } from "../../components/ui/Badge";
import { UserProfileDropdown } from "../../components/common/UserProfileDropdown";
import {
  IconRadar2,
  IconBuildingSkyscraper,
  IconSparkles,
  IconTargetArrow,
  IconArrowRight,
  IconCheck,
  IconBolt,
  IconBriefcase,
  IconWorld,
  IconCoin,
  IconUser,
  IconShieldCheck,
} from "@tabler/icons-react";

export default function OnboardingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  const { isLoading: isProfileLoading, profiles } = useAppSelector((state) => state.profile);

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

  // Quick Preset Handlers
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
      // 1. Create Business Profile
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
        // 2. Automatically generate RAG ICP & sample leads
        await dispatch(
          generateIcpWithRAG({
            profileId: createdProfile.id,
            autoDiscover: true,
            leadCount: 5,
          })
        );
      }

      // 3. Smoothly navigate to Dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("Onboarding setup error:", err);
      router.push("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--bg-canvas)] text-[var(--text-primary)] relative overflow-hidden flex flex-col">
      {/* Ambient background glow */}
      <div className="ambient-mesh pointer-events-none" />

      {/* Top Header */}
      <header className="w-full border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-base tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-[#20150F] text-[#FAF9F7] dark:bg-[#FAF9F7] dark:text-[#120D0A] flex items-center justify-center">
              <IconRadar2 className="w-4 h-4" />
            </div>
            <span>Postrichment</span>
            <Badge variant="brown" size="sm" className="hidden sm:inline-flex">
              Company Intake
            </Badge>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--text-secondary)] hidden sm:inline-block">
              Welcome, <strong className="text-[var(--text-primary)]">{user?.name || "Founder"}</strong>
            </span>
            <UserProfileDropdown />
          </div>
        </div>
      </header>

      {/* Main Intake Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-10 space-y-8">
        {/* Step Indicator Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-brown-light)] border border-[var(--accent-brown)]/20 text-xs font-medium text-[var(--accent-brown)]">
            <IconSparkles className="w-3.5 h-3.5" />
            <span>Step 1 of 1: Configure Your GTM Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Tell us about your company
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-lg mx-auto">
            Our AI Research Agent uses your business profile & value proposition to find verified buyers, extract buying signals, and draft personalized cold emails.
          </p>
        </div>

        {/* Quick Template Presets */}
        <div className="space-y-2">
          <p className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider text-center">
            ⚡ Quick 1-Click Example Templates
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => handleApplyTemplate("saas")}
              className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-brown)] hover:bg-[var(--bg-elevated)] transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-brown)]">
                  B2B AI SaaS
                </span>
                <IconBolt className="w-3.5 h-3.5 text-[var(--accent-brown)]" />
              </div>
              <p className="text-[11px] text-[var(--text-muted)] line-clamp-2">
                Outbound research automation for sales leaders.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleApplyTemplate("agency")}
              className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-brown)] hover:bg-[var(--bg-elevated)] transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-brown)]">
                  Lead Gen Agency
                </span>
                <IconTargetArrow className="w-3.5 h-3.5 text-[var(--accent-brown)]" />
              </div>
              <p className="text-[11px] text-[var(--text-muted)] line-clamp-2">
                Done-for-you cold email and pipeline booking.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleApplyTemplate("devtools")}
              className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-brown)] hover:bg-[var(--bg-elevated)] transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-brown)]">
                  Cybersecurity SaaS
                </span>
                <IconShieldCheck className="w-3.5 h-3.5 text-[var(--accent-brown)]" />
              </div>
              <p className="text-[11px] text-[var(--text-muted)] line-clamp-2">
                Cloud compliance and SOC2 automation.
              </p>
            </button>
          </div>
        </div>

        {/* The Intake Form */}
        <GlassCard elevated className="p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 1. Company Name & Industry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                  Company / Agency Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <IconBuildingSkyscraper className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. ScaleAgent AI"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl py-2.5 pl-10 pr-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-brown)] focus:ring-1 focus:ring-[var(--accent-brown)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                  Industry / Market Domain
                </label>
                <div className="relative">
                  <IconBriefcase className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl py-2.5 pl-10 pr-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-brown)] transition-all"
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
              <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                Core Value Proposition & Outcome <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="e.g. We automate B2B lead research and increase cold outbound reply rates by 3x using real-time growth signals."
                value={valueProposition}
                onChange={(e) => setValueProposition(e.target.value)}
                className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-brown)] focus:ring-1 focus:ring-[var(--accent-brown)] transition-all"
              />
              <p className="text-[11px] text-[var(--text-muted)] mt-1">
                What concrete outcome or metric do you provide to your target customers?
              </p>
            </div>

            {/* 3. Product / Service Description */}
            <div>
              <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                Product & Service Summary
              </label>
              <textarea
                rows={2}
                placeholder="e.g. An AI platform that monitors hiring spikes, funding events, and drafts PAS cold emails."
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-brown)] transition-all"
              />
            </div>

            {/* 4. Target Audience, Deal Size & Region */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                  Target Decision-Makers
                </label>
                <div className="relative">
                  <IconUser className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Founders, VP Sales"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl py-2 pl-9 pr-3 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-brown)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                  Typical Deal Size ($)
                </label>
                <div className="relative">
                  <IconCoin className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="$10k - $50k / yr"
                    value={typicalDealSize}
                    onChange={(e) => setTypicalDealSize(e.target.value)}
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl py-2 pl-9 pr-3 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-brown)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                  Geographic Region
                </label>
                <div className="relative">
                  <IconWorld className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="North America & Global"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl py-2 pl-9 pr-3 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-brown)]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <IconCheck className="w-4 h-4 text-emerald-600" />
                <span>AI will auto-generate your ICP profile & initial leads</span>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting || isProfileLoading}
                rightIcon={<IconArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto px-8 shadow-[var(--shadow-sm)]"
              >
                Launch GTM Workspace
              </Button>
            </div>
          </form>
        </GlassCard>
      </main>
    </div>
  );
}
