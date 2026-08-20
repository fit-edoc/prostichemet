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

  // Local active tab: 'profile' | 'icp' | 'research' | 'pipeline'
  const [activeTab, setActiveTab] = React.useState<"profile" | "icp" | "research" | "pipeline">("profile");

  // Form states for business profile
  const [companyName, setCompanyName] = React.useState("ScaleAgent AI");
  const [industry, setIndustry] = React.useState("AI & Workflow Automation");
  const [valueProposition, setValueProposition] = React.useState(
    "Custom AI voice & SDR research agents for B2B tech companies to 3x outbound conversions."
  );
  const [productDescription, setProductDescription] = React.useState(
    "Autonomous multi-agent research pipeline that discovers intent signals and crafts personalized outreach at scale."
  );
  const [typicalCustomer, setTypicalCustomer] = React.useState("Series A/B startups with 20-100 employees");
  const [typicalDealSize, setTypicalDealSize] = React.useState("$15,000 / year");

  // Selected lead for cold email drawer
  const [selectedLeadForEmail, setSelectedLeadForEmail] = React.useState<ProspectLead | null>(null);
  const [emailDrawerOpen, setEmailDrawerOpen] = React.useState(false);
  const [selectedFramework, setSelectedFramework] = React.useState("PAS");
  const [copiedEmail, setCopiedEmail] = React.useState(false);

  // Initialize data on mount
  React.useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    dispatch(fetchCurrentUser());
    dispatch(fetchProfiles());
    dispatch(fetchIcps());
    dispatch(fetchAllLeads());
  }, [token, dispatch, router]);

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
    const profileToUse = activeProfile || profiles[0];
    if (!profileToUse) {
      alert("Please create a business profile first.");
      setActiveTab("profile");
      return;
    }

    const action = await dispatch(
      generateIcpWithRAG({
        profileId: profileToUse.id,
        autoDiscover: true,
        leadCount: 5,
      })
    );

    if (generateIcpWithRAG.fulfilled.match(action)) {
      dispatch(fetchAllLeads());
      setActiveTab("pipeline");
    }
  };

  // Handle On-Demand Research Run
  const handleRunResearch = async () => {
    const icpToUse = activeIcp || icps[0];
    if (!icpToUse) {
      alert("Please generate an ICP first.");
      setActiveTab("icp");
      return;
    }

    const action = await dispatch(
      runCustomResearch({
        icpId: icpToUse.id,
        leadCount: 5,
      })
    );

    if (runCustomResearch.fulfilled.match(action)) {
      dispatch(fetchAllLeads());
      setActiveTab("pipeline");
    }
  };

  // Handle Cold Email Generation for Lead
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

  // Change Framework
  const handleFrameworkChange = async (fw: string) => {
    setSelectedFramework(fw);
    if (selectedLeadForEmail) {
      await dispatch(
        generateLeadColdEmail({
          prospectId: selectedLeadForEmail.id,
          framework: fw,
        })
      );
    }
  };

  const handleCopyEmailText = () => {
    if (activeColdEmail) {
      navigator.clipboard.writeText(`Subject: ${activeColdEmail.subject}\n\n${activeColdEmail.body}`);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      {/* Top Application Header */}
      <header className="sticky top-0 z-40 w-full bg-[var(--bg-surface)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)] py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[var(--text-primary)] text-[var(--bg-canvas)] flex items-center justify-center font-bold text-sm">
                <IconRadar2 className="w-4 h-4 text-[var(--bg-canvas)]" />
              </div>
              <span className="font-bold text-base tracking-tight hidden sm:inline">
                Postrichment
              </span>
            </Link>

            <span className="text-[var(--border-subtle)] font-light">/</span>

            <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-mono">
              <IconBuildingSkyscraper className="w-3.5 h-3.5 text-[var(--accent-vintage)]" />
              <span>{workspace?.name || "My Workspace"}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-secondary)]"
            >
              {theme === "dark" ? <IconSun className="w-4 h-4 text-amber-400" /> : <IconMoon className="w-4 h-4" />}
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] pl-2 border-l border-[var(--border-subtle)]">
              <span className="hidden md:inline">{user?.email || "founder@aiagency.io"}</span>
              <button
                onClick={() => {
                  dispatch(logout());
                  router.push("/");
                }}
                className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-red-500/10 hover:text-red-500 flex items-center justify-center"
                title="Sign Out"
              >
                <IconLogout className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-6 py-8 flex-grow space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-x-auto">
          {[
            { id: "profile", label: "1. Business Profile", icon: IconBriefcase, count: profiles.length },
            { id: "icp", label: "2. RAG ICP Studio", icon: IconTarget, count: icps.length },
            { id: "research", label: "3. Research Agent", icon: IconSparkles },
            { id: "pipeline", label: "4. CRM Lead Pipeline", icon: IconUsers, count: leads.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[var(--text-primary)] text-[var(--bg-canvas)] shadow-[var(--shadow-sm)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span
                  className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                    activeTab === tab.id ? "bg-white/20 text-white" : "bg-[var(--bg-elevated)] text-[var(--text-muted)]"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab 1: Business Profile Form */}
        {activeTab === "profile" && (
          <div className="grid lg:grid-cols-3 gap-8">
            <GlassCard elevated className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                  Your Business Context
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Describe what your company sells. Our RAG system will ground your ICP in market facts.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-[var(--text-primary)] block mb-1.5">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="input-vintage w-full px-3.5 py-2.5 rounded-xl"
                      placeholder="e.g. ScaleAgent AI"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[var(--text-primary)] block mb-1.5">
                      Industry Vertical
                    </label>
                    <input
                      type="text"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="input-vintage w-full px-3.5 py-2.5 rounded-xl"
                      placeholder="e.g. AI & Workflow Automation"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[var(--text-primary)] block mb-1.5">
                    Value Proposition *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={valueProposition}
                    onChange={(e) => setValueProposition(e.target.value)}
                    className="input-vintage w-full px-3.5 py-2.5 rounded-xl leading-relaxed"
                    placeholder="e.g. We build custom AI voice & SDR research agents for B2B tech companies to 3x outbound conversions."
                  />
                </div>

                <div>
                  <label className="font-semibold text-[var(--text-primary)] block mb-1.5">
                    Product Description *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="input-vintage w-full px-3.5 py-2.5 rounded-xl leading-relaxed"
                    placeholder="Describe how the product works and what problems it solves..."
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-[var(--text-primary)] block mb-1.5">
                      Typical Target Customer
                    </label>
                    <input
                      type="text"
                      value={typicalCustomer}
                      onChange={(e) => setTypicalCustomer(e.target.value)}
                      className="input-vintage w-full px-3.5 py-2.5 rounded-xl"
                      placeholder="e.g. Series A/B startups with 20-100 employees"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[var(--text-primary)] block mb-1.5">
                      Typical Deal Size
                    </label>
                    <input
                      type="text"
                      value={typicalDealSize}
                      onChange={(e) => setTypicalDealSize(e.target.value)}
                      className="input-vintage w-full px-3.5 py-2.5 rounded-xl"
                      placeholder="e.g. $15,000 / year"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[var(--border-subtle)]">
                  <span className="text-[11px] text-[var(--text-muted)] font-mono">
                    ✓ Saved to workspace isolation
                  </span>
                  <Button variant="primary" size="md" isLoading={isProfileLoading} type="submit">
                    Save Profile & Continue
                  </Button>
                </div>
              </form>
            </GlassCard>

            {/* Saved Profiles List */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Saved Workspace Profiles ({profiles.length})
              </h3>
              {profiles.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--text-primary)]">{p.companyName}</span>
                    <Badge variant="vintage" size="sm">{p.industry || "B2B"}</Badge>
                  </div>
                  <p className="text-[var(--text-secondary)] line-clamp-2">{p.valueProposition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: RAG ICP Studio */}
        {activeTab === "icp" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                  Ideal Customer Profile Studio
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Gemini analyzes your business profile + RAG market benchmarks to produce precision persona targeting.
                </p>
              </div>

              <Button
                variant="vintage"
                size="md"
                onClick={handleGenerateIcp}
                isLoading={isIcpGenerating}
                leftIcon={<IconSparkles className="w-4 h-4" />}
              >
                Generate ICP with RAG
              </Button>
            </div>

            {icps.length === 0 && !isIcpGenerating && (
              <GlassCard elevated className="text-center py-16 space-y-4">
                <IconTarget className="w-12 h-12 text-[var(--accent-vintage)] mx-auto opacity-80" />
                <h3 className="text-base font-semibold">No ICP Generated Yet</h3>
                <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
                  Click "Generate ICP with RAG" to run Gemini 2.5 Flash against our knowledge base and synthesize your target persona.
                </p>
                <Button variant="primary" size="md" onClick={handleGenerateIcp}>
                  Generate Now
                </Button>
              </GlassCard>
            )}

            {/* Render ICP Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {icps.map((icpItem) => (
                <GlassCard key={icpItem.id} elevated className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                    <span className="text-xs font-mono text-[var(--text-muted)]">
                      ICP #{icpItem.id}
                    </span>
                    <Badge variant="vintage" size="sm">RAG Verified</Badge>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                      Target Persona Title
                    </span>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mt-1">
                      {icpItem.title}
                    </h3>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-2">
                      Target Roles & Decision Makers
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {icpItem.targetRoles?.map((r, i) => (
                        <Badge key={i} variant="neutral" size="sm">{r}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-2">
                      Target Verticals & Company Size
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {icpItem.targetIndustries?.map((ind, i) => (
                        <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-primary)]">
                          {ind}
                        </span>
                      ))}
                      {icpItem.companySize?.map((cs, i) => (
                        <span key={i} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--accent-vintage)]">
                          {cs}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2 text-xs">
                    <span className="font-semibold text-[var(--text-primary)] block">
                      Core Solved Pain Points:
                    </span>
                    {icpItem.painPoints?.map((pp, i) => (
                      <p key={i} className="text-[var(--text-secondary)] leading-relaxed">
                        • {pp}
                      </p>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setActiveTab("pipeline");
                      }}
                      className="w-full justify-center"
                    >
                      View Discovered Leads for this ICP
                    </Button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Autonomous Research Agent Runner */}
        {activeTab === "research" && (
          <GlassCard elevated className="space-y-6 max-w-3xl mx-auto">
            <div className="text-center space-y-2 pb-6 border-b border-[var(--border-subtle)]">
              <div className="w-12 h-12 rounded-2xl bg-[var(--accent-vintage-light)] text-[var(--accent-vintage)] flex items-center justify-center mx-auto">
                <IconSparkles className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                Launch Autonomous Research Agent
              </h2>
              <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
                The agent will query the RAG knowledge base, crawl company buying signals, discover decision-makers, and compute fit scores (0–100).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[var(--text-muted)]">
                <span>Active ICP:</span>
                <span className="text-[var(--text-primary)] font-semibold">
                  {activeIcp?.title || icps[0]?.title || "VP of Sales, CRO"}
                </span>
              </div>
              <div className="flex items-center justify-between text-[var(--text-muted)]">
                <span>Research Model:</span>
                <span className="text-emerald-500 font-semibold">Gemini 2.5 Flash (RAG Grounded)</span>
              </div>
              <div className="flex items-center justify-between text-[var(--text-muted)]">
                <span>Lead Batch Size:</span>
                <span className="text-[var(--accent-vintage)] font-semibold">5 Hyper-Targeted Leads</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleRunResearch}
              isLoading={isResearching}
              leftIcon={<IconRadar2 className="w-5 h-5" />}
              className="w-full justify-center py-4 text-base"
            >
              {isResearching ? "Agent Running Multi-Step Research..." : "Run Research Agent Now"}
            </Button>
          </GlassCard>
        )}

        {/* Tab 4: CRM Pipeline & Scored Leads */}
        {activeTab === "pipeline" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                  Evidence-Backed Lead Pipeline ({leads.length})
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Every prospect is scored (0–100) with verified buying signals and reasoning quotes.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => dispatch(fetchAllLeads())}
                  leftIcon={<IconRefresh className="w-4 h-4" />}
                >
                  Refresh
                </Button>
                <Button
                  variant="vintage"
                  size="sm"
                  onClick={handleRunResearch}
                  isLoading={isResearching}
                  leftIcon={<IconSparkles className="w-4 h-4" />}
                >
                  Discover More Leads
                </Button>
              </div>
            </div>

            {leads.length === 0 && !isLeadsLoading && (
              <GlassCard elevated className="text-center py-16 space-y-4">
                <IconUsers className="w-12 h-12 text-[var(--text-muted)] mx-auto" />
                <h3 className="text-base font-semibold">No Leads in Pipeline</h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Generate an ICP or click "Discover More Leads" to run the research agent.
                </p>
                <Button variant="primary" size="md" onClick={handleRunResearch}>
                  Discover Leads
                </Button>
              </GlassCard>
            )}

            {/* Leads Table */}
            <div className="space-y-4">
              {leads.map((lead) => (
                <GlassCard key={lead.id} elevated className="space-y-4 p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-base font-bold text-[var(--text-primary)]">
                          {lead.companyName}
                        </h3>
                        <span className="text-xs font-mono text-[var(--text-muted)]">
                          {lead.companySize || "10-50 employees"} • {lead.industry || "B2B"}
                        </span>
                        {lead.websiteLink && (
                          <a
                            href={lead.websiteLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                          >
                            <IconExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)] mt-1">
                        <span>
                          Contact: <strong className="text-[var(--text-primary)]">{lead.contactName}</strong> ({lead.contactTitle || "Leader"})
                        </span>
                        <span>•</span>
                        <span className="font-mono text-[var(--text-muted)]">{lead.contactEmail}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Fit Score Badge */}
                      <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm flex items-center gap-1.5">
                        <IconTrendingUp className="w-4 h-4" />
                        <span>{lead.score || 90}/100 SCORE</span>
                      </div>

                      {/* Draft Cold Email Button */}
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleOpenEmailDrawer(lead)}
                        leftIcon={<IconMailFast className="w-4 h-4" />}
                      >
                        Draft Cold Email
                      </Button>
                    </div>
                  </div>

                  {/* Growth Signals & Triggers */}
                  {lead.signals && lead.signals.length > 0 && (
                    <div>
                      <span className="text-[11px] font-mono uppercase text-[var(--text-muted)] block mb-1.5">
                        Detected Signals
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {lead.signals.map((sig, sIdx) => (
                          <Badge key={sIdx} variant="vintage" size="sm">
                            ⚡ {sig}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Verifiable Evidence */}
                  {lead.evidence && (
                    <div className="p-3.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-1">
                      <span className="text-[11px] font-mono font-semibold text-[var(--accent-vintage)] uppercase tracking-wider">
                        Why this lead matches (Evidence)
                      </span>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {lead.evidence.reason || JSON.stringify(lead.evidence)}
                      </p>
                    </div>
                  )}
                </GlassCard>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Slide-Over Cold Email Generator Drawer */}
      {emailDrawerOpen && selectedLeadForEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl bg-[var(--bg-surface)] border border-[var(--border-medium)] rounded-3xl p-6 md:p-8 shadow-[var(--shadow-lg)] space-y-6 max-h-[90vh] overflow-y-auto relative animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[var(--accent-vintage-light)] text-[var(--accent-vintage)] flex items-center justify-center font-bold text-sm">
                  <IconMailFast className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    Cold Email Studio
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Target: {selectedLeadForEmail.contactName} @ {selectedLeadForEmail.companyName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEmailDrawerOpen(false)}
                className="w-8 h-8 rounded-xl bg-[var(--bg-elevated)] hover:bg-[var(--bg-muted)] flex items-center justify-center text-[var(--text-secondary)]"
              >
                <IconX className="w-4 h-4" />
              </button>
            </div>

            {/* Framework Switcher */}
            <div>
              <label className="text-xs font-semibold text-[var(--text-primary)] block mb-2 font-mono uppercase tracking-wider">
                Select Copywriting Framework:
              </label>
              <div className="flex gap-2">
                {["PAS", "Observation-Insight-Value", "Case-Study"].map((fw) => (
                  <button
                    key={fw}
                    onClick={() => handleFrameworkChange(fw)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                      selectedFramework === fw
                        ? "bg-[var(--text-primary)] text-[var(--bg-canvas)] font-semibold shadow-[var(--shadow-sm)]"
                        : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--bg-canvas)]"
                    }`}
                  >
                    {fw}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Preview & Copy */}
            {isGeneratingEmail ? (
              <div className="py-16 text-center space-y-3 font-mono text-xs text-[var(--text-muted)] animate-pulse">
                <IconSparkles className="w-8 h-8 mx-auto text-[var(--accent-vintage)] animate-spin" />
                <p>Synthesizing signals & generating cold email...</p>
              </div>
            ) : activeColdEmail ? (
              <div className="space-y-4 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] flex items-center justify-between">
                  <div>
                    <span className="text-[var(--text-muted)]">Subject:</span>{" "}
                    <span className="text-[var(--text-primary)] font-semibold">{activeColdEmail.subject}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyEmailText}
                    leftIcon={copiedEmail ? <IconCheck className="w-3.5 h-3.5 text-emerald-500" /> : <IconCopy className="w-3.5 h-3.5" />}
                  >
                    {copiedEmail ? "Copied!" : "Copy"}
                  </Button>
                </div>

                <div className="p-5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-sans text-sm leading-relaxed whitespace-pre-line">
                  {activeColdEmail.body}
                </div>

                <div className="p-3 rounded-xl bg-[var(--accent-vintage-light)] border border-[var(--accent-vintage)]/20 text-xs text-[var(--accent-vintage)]">
                  💡 <strong>Strategy Hook:</strong> {activeColdEmail.personalizedTrigger || "Signals referenced in opening sentence"}
                </div>
              </div>
            ) : null}

            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => setEmailDrawerOpen(false)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleCopyEmailText}
                leftIcon={<IconCopy className="w-4 h-4" />}
              >
                {copiedEmail ? "Copied to Clipboard!" : "Copy Email"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
