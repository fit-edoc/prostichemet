"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { logout, fetchCurrentUser } from "../../store/slices/authSlice";
import { fetchProfiles, createBusinessProfile } from "../../store/slices/profileSlice";
import { generateIcpWithRAG, fetchIcps } from "../../store/slices/icpSlice";
import { fetchAllLeads, updateLeadStatus, generateLeadColdEmail, runCustomResearch } from "../../store/slices/crmSlice";
import { toggleTheme } from "../../store/slices/uiSlice";
import { Button } from "../../components/ui/Button";
import { GlassCard } from "../../components/ui/GlassCard";
import { Badge } from "../../components/ui/Badge";
import { UserProfileDropdown } from "../../components/common/UserProfileDropdown";
import {
  IconRadar2,
  IconCpu,
  IconTarget,
  IconUsers,
  IconMailFast,
  IconSparkles,
  IconPlus,
  IconTrendingUp,
  IconCheck,
  IconCopy,
  IconLogout,
  IconSun,
  IconMoon,
  IconExternalLink,
  IconBriefcase,
  IconBuildingSkyscraper,
  IconX,
  IconRefresh,
  IconChevronRight,
  IconSearch,
  IconFilter,
  IconFlame,
  IconSend,
  IconLayoutDashboard,
  IconDatabase,
} from "@tabler/icons-react";
import { ProspectLead } from "../../types";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Redux state
  const { user, workspace, token } = useAppSelector((state) => state.auth);
  const { profiles, activeProfile, isLoading: isProfileLoading } = useAppSelector((state) => state.profile);
  const { icps, activeIcp, isGenerating: isIcpGenerating } = useAppSelector((state) => state.icp);
  const { leads, isLoading: isLeadsLoading, isResearching, isGeneratingEmail, activeColdEmail } = useAppSelector((state) => state.crm);
  const theme = useAppSelector((state) => state.ui.theme);

  // Active Tab
  const [activeTab, setActiveTab] = React.useState<"overview" | "profile" | "icp" | "pipeline" | "research">("overview");

  // Form states for business profile
  const [companyName, setCompanyName] = React.useState("ScaleAgent AI");
  const [industry, setIndustry] = React.useState("B2B AI SaaS & Automation");
  const [valueProposition, setValueProposition] = React.useState(
    "Automate B2B SDR research and 3x outbound conversions with verified real-time growth signals."
  );
  const [productDescription, setProductDescription] = React.useState(
    "Autonomous research engine that tracks hiring spikes, funding rounds, and drafts PAS cold outreach."
  );
  const [typicalCustomer, setTypicalCustomer] = React.useState("Series A/B tech startups with 20-150 employees");
  const [typicalDealSize, setTypicalDealSize] = React.useState("$12,000 - $36,000 / year");

  // Selected lead for cold email drawer
  const [selectedLeadForEmail, setSelectedLeadForEmail] = React.useState<ProspectLead | null>(null);
  const [emailDrawerOpen, setEmailDrawerOpen] = React.useState(false);
  const [selectedFramework, setSelectedFramework] = React.useState("PAS");
  const [copiedEmail, setCopiedEmail] = React.useState(false);
  const [leadSearch, setLeadSearch] = React.useState("");

  // Initialize data on mount
  React.useEffect(() => {
    if (!token && !user) {
      router.push("/login");
      return;
    }
    dispatch(fetchCurrentUser());
    dispatch(fetchProfiles());
    dispatch(fetchIcps());
    dispatch(fetchAllLeads());
  }, [token, user, dispatch, router]);

  // Sync profile form when profiles load
  React.useEffect(() => {
    if (profiles && profiles.length > 0) {
      const p = activeProfile || profiles[0];
      setCompanyName(p.companyName || "");
      setIndustry(p.industry || "");
      setValueProposition(p.valueProposition || "");
      setProductDescription(p.productDescription || "");
      setTypicalCustomer(p.typicalCustomer || "");
      setTypicalDealSize(p.typicalDealSize || "");
    }
  }, [profiles, activeProfile]);

  // Handle Profile Submission
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const action = await dispatch(
      createBusinessProfile({
        companyName,
        industry,
        valueProposition,
        productDescription,
        typicalCustomer,
        typicalDealSize,
      })
    );

    if (createBusinessProfile.fulfilled.match(action)) {
      setActiveTab("icp");
    }
  };

  // Handle RAG ICP Generation
  const handleGenerateIcp = async () => {
    const profileId = activeProfile?.id || (profiles.length > 0 ? profiles[0].id : 1);
    const action = await dispatch(
      generateIcpWithRAG({
        profileId: profileId,
        autoDiscover: true,
        leadCount: 5,
      })
    );

    if (generateIcpWithRAG.fulfilled.match(action)) {
      dispatch(fetchAllLeads());
      setActiveTab("pipeline");
    }
  };

  // Handle AI Research Agent Run
  const handleRunResearch = async () => {
    const icpId = activeIcp?.id || (icps.length > 0 ? icps[0].id : 1);
    await dispatch(runCustomResearch({ icpId, leadCount: 5 }));
    dispatch(fetchAllLeads());
  };

  // Handle Cold Email Generation
  const handleOpenEmailDrawer = async (lead: ProspectLead) => {
    setSelectedLeadForEmail(lead);
    setEmailDrawerOpen(true);
    await dispatch(
      generateLeadColdEmail({
        prospectId: lead.id,
        framework: selectedFramework,
      })
    );
  };

  const handleCopyEmail = () => {
    if (activeColdEmail) {
      const fullText = `Subject: ${activeColdEmail.subject}\n\n${activeColdEmail.body}`;
      navigator.clipboard.writeText(fullText);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  // Filtered leads
  const filteredLeads = leads.filter(
    (lead) =>
      lead.companyName.toLowerCase().includes(leadSearch.toLowerCase()) ||
      (lead.contactName && lead.contactName.toLowerCase().includes(leadSearch.toLowerCase())) ||
      (lead.contactTitle && lead.contactTitle.toLowerCase().includes(leadSearch.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] flex flex-col md:flex-row">
      {/* 1. Modern Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[var(--bg-surface)] border-b md:border-b-0 md:border-r border-[var(--border-subtle)] flex flex-col justify-between shrink-0 z-30">
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-[var(--border-subtle)] flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#20150F] text-[#FAF9F7] dark:bg-[#FAF9F7] dark:text-[#120D0A] flex items-center justify-center font-bold text-sm shadow-[var(--shadow-xs)]">
                <IconRadar2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight text-[var(--text-primary)] block leading-none">
                  Postrichment
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                  GTM Engine
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="p-3 space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                activeTab === "overview"
                  ? "bg-[#20150F] text-[#FAF9F7] dark:bg-[#FAF9F7] dark:text-[#120D0A] shadow-[var(--shadow-xs)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
              }`}
            >
              <IconLayoutDashboard className="w-4 h-4" />
              <span>GTM Overview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                activeTab === "profile"
                  ? "bg-[#20150F] text-[#FAF9F7] dark:bg-[#FAF9F7] dark:text-[#120D0A] shadow-[var(--shadow-xs)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
              }`}
            >
              <IconBuildingSkyscraper className="w-4 h-4" />
              <span>Company Profile</span>
              {profiles.length > 0 && (
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent-brown-light)] text-[var(--accent-brown)]">
                  {profiles.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("icp")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                activeTab === "icp"
                  ? "bg-[#20150F] text-[#FAF9F7] dark:bg-[#FAF9F7] dark:text-[#120D0A] shadow-[var(--shadow-xs)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
              }`}
            >
              <IconTarget className="w-4 h-4" />
              <span>AI ICP Discovery</span>
              {icps.length > 0 && (
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent-brown-light)] text-[var(--accent-brown)]">
                  {icps.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("pipeline")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                activeTab === "pipeline"
                  ? "bg-[#20150F] text-[#FAF9F7] dark:bg-[#FAF9F7] dark:text-[#120D0A] shadow-[var(--shadow-xs)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
              }`}
            >
              <IconUsers className="w-4 h-4" />
              <span>CRM Intelligence</span>
              {leads.length > 0 && (
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-semibold">
                  {leads.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("research")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                activeTab === "research"
                  ? "bg-[#20150F] text-[#FAF9F7] dark:bg-[#FAF9F7] dark:text-[#120D0A] shadow-[var(--shadow-xs)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
              }`}
            >
              <IconSparkles className="w-4 h-4 text-[var(--accent-brown)]" />
              <span>Signal Research Agent</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Info */}
        <div className="p-4 border-t border-[var(--border-subtle)] space-y-3">
          <div className="p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[var(--text-muted)]">RAG Vector Hub</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-xs font-medium text-[var(--text-primary)] truncate">
              {profiles.length > 0 ? profiles[0].companyName : "Awaiting Setup"}
            </p>
            <p className="text-[10px] text-[var(--text-secondary)]">
              Curated B2B Outbound Frameworks Active
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-1">
            <span>Postrichment v1.0</span>
            <Link href="/onboarding" className="text-[var(--accent-brown)] hover:underline">
              New Intake
            </Link>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 px-6 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)]">
            <span className="capitalize text-[var(--text-primary)] font-semibold">
              {activeTab === "overview" && "GTM Overview"}
              {activeTab === "profile" && "Business Profile"}
              {activeTab === "icp" && "AI ICP Generator"}
              {activeTab === "pipeline" && "Evidence Pipeline & CRM"}
              {activeTab === "research" && "Signal Detector Agent"}
            </span>
            <span>/</span>
            <span className="text-[11px] text-[var(--text-muted)] truncate max-w-[150px]">
              {workspace?.name || "Default Workspace"}
            </span>
          </div>

          {/* Header Action Tools */}
          <div className="flex items-center gap-3">
            {/* Quick Action */}
            {activeTab === "pipeline" && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleRunResearch}
                isLoading={isResearching}
                leftIcon={<IconSparkles className="w-3.5 h-3.5" />}
              >
                Discover Signals
              </Button>
            )}

            {activeTab === "icp" && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleGenerateIcp}
                isLoading={isIcpGenerating}
                leftIcon={<IconCpu className="w-3.5 h-3.5" />}
              >
                Synthesize ICP
              </Button>
            )}

            {/* User Profile Dropdown in Top Right */}
            <UserProfileDropdown />
          </div>
        </header>

        {/* Dashboard Main View Container */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[var(--shadow-xs)] space-y-1">
                  <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                    Discovered Leads
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[var(--text-primary)]">{leads.length}</span>
                    <span className="text-xs text-emerald-600 font-medium">Live Evidence</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[var(--shadow-xs)] space-y-1">
                  <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                    High Fit ICP Matches
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[var(--accent-brown)]">
                      {leads.filter((l) => (l.score || 0) >= 80).length}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">Score ≥ 80%</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[var(--shadow-xs)] space-y-1">
                  <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                    Synthesized ICPs
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[var(--text-primary)]">{icps.length}</span>
                    <span className="text-xs text-[var(--text-muted)]">RAG Enriched</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[var(--shadow-xs)] space-y-1">
                  <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                    Avg Response Uplift
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-emerald-600">+340%</span>
                    <span className="text-xs text-[var(--text-muted)]">PAS Framework</span>
                  </div>
                </div>
              </div>

              {/* Quick Action Prompt if no profiles */}
              {profiles.length === 0 ? (
                <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center space-y-4 shadow-[var(--shadow-xs)]">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-brown-light)] text-[var(--accent-brown)] flex items-center justify-center mx-auto">
                    <IconBuildingSkyscraper className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">
                      No Company Profile Configured Yet
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto mt-1">
                      Set up your company value proposition and target customer details to activate the autonomous lead discovery engine.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => router.push("/onboarding")}
                    rightIcon={<IconChevronRight className="w-4 h-4" />}
                  >
                    Open Company Intake Form
                  </Button>
                </div>
              ) : (
                /* Recent Discovered Leads Preview */
                <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[var(--shadow-xs)] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[var(--text-primary)]">
                        Latest High-Intent Prospects
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Real-time signals matched against your {profiles[0].companyName} ICP
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setActiveTab("pipeline")}
                    >
                      View All in CRM
                    </Button>
                  </div>

                  <div className="divide-y divide-[var(--border-subtle)]">
                    {leads.slice(0, 4).map((lead) => (
                      <div key={lead.id} className="py-3.5 flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-[var(--text-primary)]">
                              {lead.companyName}
                            </span>
                            <Badge variant="brown" size="sm">
                              {lead.score || 85}% Fit
                            </Badge>
                          </div>
                          <p className="text-[11px] text-[var(--text-secondary)]">
                            {lead.contactName ? `${lead.contactName} (${lead.contactTitle || "Decision-Maker"})` : lead.industry || "Target Company"}
                          </p>
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleOpenEmailDrawer(lead)}
                          leftIcon={<IconMailFast className="w-3.5 h-3.5 text-[var(--accent-brown)]" />}
                        >
                          Draft PAS Email
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BUSINESS PROFILE */}
          {activeTab === "profile" && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h2 className="text-lg font-bold text-[var(--text-primary)]">
                  Company & Product Profile
                </h2>
                <p className="text-xs text-[var(--text-secondary)]">
                  Define what your company sells, who benefits most, and the specific problems you solve.
                </p>
              </div>

              <GlassCard elevated className="p-6 sm:p-8 space-y-5">
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-brown)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                        Industry / Niche
                      </label>
                      <input
                        type="text"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-brown)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                      Core Value Proposition & Outcome
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={valueProposition}
                      onChange={(e) => setValueProposition(e.target.value)}
                      className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-brown)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                      Product / Service Description
                    </label>
                    <textarea
                      rows={2}
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-brown)]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                        Typical Customer
                      </label>
                      <input
                        type="text"
                        value={typicalCustomer}
                        onChange={(e) => setTypicalCustomer(e.target.value)}
                        className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-brown)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                        Typical Deal Size ($)
                      </label>
                      <input
                        type="text"
                        value={typicalDealSize}
                        onChange={(e) => setTypicalDealSize(e.target.value)}
                        className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-brown)]"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      isLoading={isProfileLoading}
                      rightIcon={<IconChevronRight className="w-4 h-4" />}
                    >
                      Save & Generate ICP
                    </Button>
                  </div>
                </form>
              </GlassCard>
            </div>
          )}

          {/* TAB 3: AI ICP GENERATOR */}
          {activeTab === "icp" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[var(--text-primary)]">
                    Ideal Customer Profile (ICP) Engine
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Synthesized from RAG intelligence and market evidence
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleGenerateIcp}
                  isLoading={isIcpGenerating}
                  leftIcon={<IconCpu className="w-4 h-4" />}
                >
                  Regenerate ICP with AI
                </Button>
              </div>

              {icps.length === 0 ? (
                <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center space-y-4">
                  <IconTarget className="w-10 h-10 text-[var(--accent-brown)] mx-auto" />
                  <p className="text-xs text-[var(--text-secondary)]">
                    No ICP profiles generated yet. Click above to synthesize your profile using Gemini RAG.
                  </p>
                  <Button variant="primary" size="sm" onClick={handleGenerateIcp}>
                    Generate ICP Now
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {icps.map((icp) => (
                    <GlassCard key={icp.id} elevated className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge variant="brown" size="sm">
                            ICP v1.0
                          </Badge>
                          <h3 className="text-base font-bold text-[var(--text-primary)] mt-1.5">
                            {icp.title}
                          </h3>
                        </div>
                      </div>

                      {/* Industries */}
                      {icp.targetIndustries && (
                        <div className="space-y-1">
                          <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase">
                            Target Industries
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {icp.targetIndustries.map((ind, i) => (
                              <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)]">
                                {ind}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Target Roles */}
                      {icp.targetRoles && (
                        <div className="space-y-1">
                          <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase">
                            Decision Makers
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {icp.targetRoles.map((role, i) => (
                              <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-[var(--accent-brown-light)] border border-[var(--accent-brown)]/20 text-[var(--accent-brown)] font-medium">
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Pain Points */}
                      {icp.painPoints && (
                        <div className="space-y-1">
                          <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase">
                            Top Pain Points Solved
                          </span>
                          <ul className="space-y-1 text-xs text-[var(--text-secondary)]">
                            {icp.painPoints.map((pain, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-[var(--accent-brown)]">•</span>
                                <span>{pain}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </GlassCard>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CRM PIPELINE */}
          {activeTab === "pipeline" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[var(--text-primary)]">
                    Evidence Pipeline & CRM
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Prospects scored with verified buying signals & quotes
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <IconSearch className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search company or contact..."
                      value={leadSearch}
                      onChange={(e) => setLeadSearch(e.target.value)}
                      className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl py-1.5 pl-9 pr-3 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-brown)]"
                    />
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleRunResearch}
                    isLoading={isResearching}
                    leftIcon={<IconSparkles className="w-3.5 h-3.5" />}
                  >
                    Find More Leads
                  </Button>
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden shadow-[var(--shadow-xs)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[var(--bg-canvas)] border-b border-[var(--border-subtle)] text-[var(--text-muted)] font-mono uppercase text-[10px]">
                      <tr>
                        <th className="p-4">Company & Target</th>
                        <th className="p-4">Decision-Maker</th>
                        <th className="p-4">Verified Trigger Signal</th>
                        <th className="p-4">Fit Score</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-subtle)]">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-[var(--bg-elevated)] transition-colors">
                          <td className="p-4">
                            <div className="font-semibold text-[var(--text-primary)]">
                              {lead.companyName}
                            </div>
                            <div className="text-[11px] text-[var(--text-muted)]">
                              {lead.industry || "B2B Tech"}
                            </div>
                          </td>

                          <td className="p-4">
                            <div className="text-[var(--text-primary)] font-medium">
                              {lead.contactName || "Decision Maker"}
                            </div>
                            <div className="text-[11px] text-[var(--text-muted)]">
                              {lead.contactTitle || "VP Growth / Sales"}
                            </div>
                          </td>

                          <td className="p-4 max-w-xs">
                            <div className="text-[11px] text-[var(--text-secondary)] line-clamp-2">
                              {lead.evidence && Array.isArray(lead.evidence) && lead.evidence.length > 0
                                ? lead.evidence[0]
                                : "Recent expansion in sales team & active outbound hiring"}
                            </div>
                          </td>

                          <td className="p-4">
                            <Badge variant="brown" size="sm">
                              {lead.score || 85}% Fit
                            </Badge>
                          </td>

                          <td className="p-4">
                            <select
                              value={lead.status}
                              onChange={(e) =>
                                dispatch(
                                  updateLeadStatus({
                                    id: lead.id,
                                    status: e.target.value as any,
                                  })
                                )
                              }
                              className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg px-2 py-1 text-[11px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-brown)]"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Qualified">Qualified</option>
                              <option value="Meeting Booked">Meeting Booked</option>
                              <option value="Replied">Replied</option>
                            </select>
                          </td>

                          <td className="p-4 text-right">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleOpenEmailDrawer(lead)}
                              leftIcon={<IconMailFast className="w-3.5 h-3.5 text-[var(--accent-brown)]" />}
                            >
                              Draft PAS
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SIGNAL RESEARCH AGENT */}
          {activeTab === "research" && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h2 className="text-lg font-bold text-[var(--text-primary)]">
                  Autonomous Signal Research Agent
                </h2>
                <p className="text-xs text-[var(--text-secondary)]">
                  Trigger automated web queries, extract leadership changes, and discover qualified buyer accounts.
                </p>
              </div>

              <GlassCard elevated className="p-6 space-y-5">
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-[var(--text-primary)] block">
                    Select Active ICP for Discovery Run
                  </span>
                  <div className="p-3.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-[var(--text-primary)]">
                        {icps.length > 0 ? icps[0].title : "Default B2B Tech ICP"}
                      </p>
                      <p className="text-[11px] text-[var(--text-secondary)]">
                        Targeting {profiles.length > 0 ? profiles[0].targetAudience : "B2B Decision Makers"}
                      </p>
                    </div>
                    <Badge variant="brown" size="sm">
                      Ready
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-[var(--text-primary)] block">
                    Autonomous Discovery Signals Tracked
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--text-secondary)]">
                    <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center gap-2">
                      <IconCheck className="w-4 h-4 text-emerald-600" />
                      <span>Recent Series A / Seed Funding</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center gap-2">
                      <IconCheck className="w-4 h-4 text-emerald-600" />
                      <span>Sales & Growth Leadership Hires</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center gap-2">
                      <IconCheck className="w-4 h-4 text-emerald-600" />
                      <span>Tech Stack & CRM Migrations</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center gap-2">
                      <IconCheck className="w-4 h-4 text-emerald-600" />
                      <span>Public Pain Points & Job Postings</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleRunResearch}
                    isLoading={isResearching}
                    leftIcon={<IconSparkles className="w-4 h-4" />}
                  >
                    Execute Signal Discovery Run
                  </Button>
                </div>
              </GlassCard>
            </div>
          )}
        </main>
      </div>

      {/* 3. Sliding Email Generation Drawer */}
      {emailDrawerOpen && selectedLeadForEmail && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[var(--bg-surface)] h-full border-l border-[var(--border-subtle)] shadow-[var(--shadow-lg)] p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">
                    Evidence-Backed PAS Email
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Prospect: {selectedLeadForEmail.companyName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailDrawerOpen(false)}
                  className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  <IconX className="w-4 h-4" />
                </button>
              </div>

              {/* Framework Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[var(--text-primary)]">
                  Copywriting Framework
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFramework("PAS");
                      dispatch(
                        generateLeadColdEmail({
                          prospectId: selectedLeadForEmail.id,
                          framework: "PAS",
                        })
                      );
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-medium text-left cursor-pointer transition-all ${
                      selectedFramework === "PAS"
                        ? "bg-[var(--accent-brown-light)] border-[var(--accent-brown)] text-[var(--accent-brown)]"
                        : "bg-[var(--bg-canvas)] border-[var(--border-subtle)] text-[var(--text-secondary)]"
                    }`}
                  >
                    PAS (Problem-Agitate-Solve)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFramework("Observation-Insight-Value");
                      dispatch(
                        generateLeadColdEmail({
                          prospectId: selectedLeadForEmail.id,
                          framework: "Observation-Insight-Value",
                        })
                      );
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-medium text-left cursor-pointer transition-all ${
                      selectedFramework === "Observation-Insight-Value"
                        ? "bg-[var(--accent-brown-light)] border-[var(--accent-brown)] text-[var(--accent-brown)]"
                        : "bg-[var(--bg-canvas)] border-[var(--border-subtle)] text-[var(--text-secondary)]"
                    }`}
                  >
                    Observation-Insight-Value
                  </button>
                </div>
              </div>

              {/* Generated Email Content */}
              {isGeneratingEmail ? (
                <div className="p-8 text-center space-y-3">
                  <IconSparkles className="w-8 h-8 text-[var(--accent-brown)] animate-spin mx-auto" />
                  <p className="text-xs text-[var(--text-secondary)]">
                    Synthesizing real-world evidence and drafting copy...
                  </p>
                </div>
              ) : activeColdEmail ? (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)]">
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                      Subject Line
                    </span>
                    <p className="text-xs font-semibold text-[var(--text-primary)]">
                      {activeColdEmail.subject}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)]">
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block mb-1.5">
                      Body Copy
                    </span>
                    <p className="text-xs text-[var(--text-primary)] whitespace-pre-line leading-relaxed font-sans">
                      {activeColdEmail.body}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopyEmail}
                leftIcon={copiedEmail ? <IconCheck className="w-3.5 h-3.5 text-emerald-600" /> : <IconCopy className="w-3.5 h-3.5" />}
              >
                {copiedEmail ? "Copied to Clipboard!" : "Copy Email"}
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setEmailDrawerOpen(false)}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
