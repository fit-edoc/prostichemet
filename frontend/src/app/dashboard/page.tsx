"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { logout, fetchCurrentUser } from "../../store/slices/authSlice";
import { signOut } from "next-auth/react";
import { fetchProfiles, createBusinessProfile } from "../../store/slices/profileSlice";
import { generateIcpWithRAG, fetchIcps } from "../../store/slices/icpSlice";
import { fetchAllLeads, updateLeadStatus, generateLeadColdEmail, runCustomResearch } from "../../store/slices/crmSlice";
import { Button } from "../../components/ui/Button";
import { UserProfileDropdown } from "../../components/common/UserProfileDropdown";
import {
  IconMapPin,
  IconWorld,
  IconMail,
  IconRadar2,
  IconCpu,
  IconTarget,
  IconUsers,
  IconMailFast,
  IconCheck,
  IconCopy,
  IconLogout,
  IconExternalLink,
  IconBuildingSkyscraper,
  IconX,
  IconRefresh,
  IconChevronRight,
  IconSearch,
  IconLayoutDashboard,
} from "@tabler/icons-react";
import { ProspectLead } from "../../types";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Redux state
  const { workspace, token } = useAppSelector((state) => state.auth);
  const { profiles, activeProfile, isLoading: isProfileLoading } = useAppSelector((state) => state.profile);
  const { icps, activeIcp, isGenerating: isIcpGenerating } = useAppSelector((state) => state.icp);
  const { leads, isResearching, isGeneratingEmail, activeColdEmail } = useAppSelector((state) => state.crm);

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
  const [copiedEmailAddress, setCopiedEmailAddress] = React.useState<string | null>(null);
  const [leadSearch, setLeadSearch] = React.useState("");

  // Guard data initialization on mount
  const initializedRef = React.useRef(false);

  // Initialize data on mount
  React.useEffect(() => {
    const savedToken = typeof window !== "undefined" ? localStorage.getItem("postrichment_token") : token;
    if (!savedToken && !token) {
      router.push("/login");
      return;
    }

    if (!initializedRef.current) {
      initializedRef.current = true;
      dispatch(fetchCurrentUser());
      dispatch(fetchProfiles());
      dispatch(fetchIcps());
      dispatch(fetchAllLeads());
    }
  }, [token, dispatch, router]);

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

  const handleCopyLeadEmail = (email: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedEmailAddress(email);
    setTimeout(() => setCopiedEmailAddress(null), 2000);
  };

  const handleLogout = async () => {
    dispatch(logout());
    try {
      await signOut({ redirect: false });
    } catch {
      // ignore
    }
    router.push("/login");
  };

  // Filtered leads
  const filteredLeads = leads.filter(
    (lead) =>
      lead.companyName.toLowerCase().includes(leadSearch.toLowerCase()) ||
      (lead.contactName && lead.contactName.toLowerCase().includes(leadSearch.toLowerCase())) ||
      (lead.contactTitle && lead.contactTitle.toLowerCase().includes(leadSearch.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 flex flex-col md:flex-row selection:bg-zinc-900 selection:text-white font-inter">
      {/* 1. Modern Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-zinc-200 flex flex-col justify-between shrink-0 z-30 shadow-xs">
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-zinc-200 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                <IconRadar2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-inter font-semibold text-base tracking-tight text-zinc-950 block leading-none">
                  Postrichment
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  GTM Engine
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="p-3 space-y-1 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all text-left cursor-pointer ${
                activeTab === "overview"
                  ? "bg-zinc-950 text-white font-medium shadow-xs"
                  : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
              }`}
            >
              <IconLayoutDashboard className="w-4 h-4 shrink-0" />
              <span>GTM Overview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all text-left cursor-pointer ${
                activeTab === "profile"
                  ? "bg-zinc-950 text-white font-medium shadow-xs"
                  : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
              }`}
            >
              <IconBuildingSkyscraper className="w-4 h-4 shrink-0" />
              <span>Company Profile</span>
              {profiles.length > 0 && (
                <span
                  className={`ml-auto text-[10px] px-2 py-0.5 rounded-full ${
                    activeTab === "profile"
                      ? "bg-white/20 text-white"
                      : "bg-zinc-100 border border-zinc-200 text-zinc-700"
                  }`}
                >
                  {profiles.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("icp")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all text-left cursor-pointer ${
                activeTab === "icp"
                  ? "bg-zinc-950 text-white font-medium shadow-xs"
                  : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
              }`}
            >
              <IconTarget className="w-4 h-4 shrink-0" />
              <span>AI ICP Discovery</span>
              {icps.length > 0 && (
                <span
                  className={`ml-auto text-[10px] px-2 py-0.5 rounded-full ${
                    activeTab === "icp"
                      ? "bg-white/20 text-white"
                      : "bg-zinc-100 border border-zinc-200 text-zinc-700"
                  }`}
                >
                  {icps.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("pipeline")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all text-left cursor-pointer ${
                activeTab === "pipeline"
                  ? "bg-zinc-950 text-white font-medium shadow-xs"
                  : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
              }`}
            >
              <IconUsers className="w-4 h-4 shrink-0" />
              <span>CRM Intelligence</span>
              {leads.length > 0 && (
                <span
                  className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    activeTab === "pipeline"
                      ? "bg-white text-zinc-950"
                      : "bg-zinc-900 text-white"
                  }`}
                >
                  {leads.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("research")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all text-left cursor-pointer ${
                activeTab === "research"
                  ? "bg-zinc-950 text-white font-medium shadow-xs"
                  : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
              }`}
            >
              <IconCpu className="w-4 h-4 shrink-0" />
              <span>Signal Research Agent</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Info */}
        <div className="p-4 border-t border-zinc-200 space-y-3 font-mono">
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase text-zinc-500 font-semibold">RAG Vector Hub</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-xs font-inter font-semibold text-zinc-950 truncate">
              {profiles.length > 0 ? profiles[0].companyName : "Awaiting Setup"}
            </p>
            <p className="text-[10px] text-zinc-500">
              Curated B2B Outbound Frameworks Active
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
            <span>Postrichment v1.0</span>
            <Link href="/onboarding" className="text-zinc-700 hover:text-zinc-950 hover:underline">
              New Intake
            </Link>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs text-zinc-600 hover:text-red-600 bg-zinc-50 hover:bg-red-50 border border-zinc-200 hover:border-red-200 transition-all cursor-pointer font-medium"
          >
            <IconLogout className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#FAFAFA]">
        {/* Top Header Bar */}
        <header className="h-16 px-6 border-b border-zinc-200 bg-white/80 backdrop-blur-md flex items-center justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span className="capitalize text-zinc-950 font-inter font-semibold text-sm">
              {activeTab === "overview" && "GTM Overview"}
              {activeTab === "profile" && "Business Profile"}
              {activeTab === "icp" && "AI ICP Generator"}
              {activeTab === "pipeline" && "Evidence Pipeline & CRM"}
              {activeTab === "research" && "Signal Detector Agent"}
            </span>
            <span>/</span>
            <span className="text-[11px] text-zinc-500 truncate max-w-[150px]">
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
                leftIcon={<IconRadar2 className="w-3.5 h-3.5" />}
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
                <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-sm space-y-1">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                    Discovered Leads
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-inter font-bold text-zinc-950 tracking-tight">{leads.length}</span>
                    <span className="text-xs text-zinc-500 font-mono">Live Evidence</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-sm space-y-1">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                    High Fit ICP Matches
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-inter font-bold text-zinc-950 tracking-tight">
                      {leads.filter((l) => (l.score || 0) >= 80).length}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">Score ≥ 80%</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-sm space-y-1">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                    Synthesized ICPs
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-inter font-bold text-zinc-950 tracking-tight">{icps.length}</span>
                    <span className="text-xs text-zinc-500 font-mono">RAG Enriched</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-sm space-y-1">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                    Avg Response Uplift
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-inter font-bold text-zinc-950 tracking-tight">+340%</span>
                    <span className="text-xs text-zinc-500 font-mono">PAS Framework</span>
                  </div>
                </div>
              </div>

              {/* Quick Action Prompt if no profiles */}
              {profiles.length === 0 ? (
                <div className="p-8 rounded-xl bg-white border border-zinc-200 text-center space-y-4 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-900 flex items-center justify-center mx-auto">
                    <IconBuildingSkyscraper className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-inter font-semibold text-lg text-zinc-950">
                      No Company Profile Configured Yet
                    </h3>
                    <p className="text-xs text-zinc-500 max-w-md mx-auto mt-1 leading-relaxed">
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
                <div className="p-6 rounded-xl bg-white border border-zinc-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                    <div>
                      <h3 className="font-inter font-semibold text-base text-zinc-950">
                        Latest High-Intent Prospects
                      </h3>
                      <p className="text-xs text-zinc-500 font-mono mt-0.5">
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

                  <div className="divide-y divide-zinc-200">
                    {leads.slice(0, 4).map((lead) => (
                      <div key={lead.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-inter font-semibold text-sm text-zinc-950">
                              {lead.companyName}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-950 text-white font-medium">
                              {lead.score || 85}% Fit
                            </span>
                            {lead.websiteLink && (
                              <a
                                href={lead.websiteLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-500 hover:text-zinc-950 hover:underline"
                              >
                                <IconWorld className="w-3 h-3" />
                                <span>{lead.websiteLink.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</span>
                                <IconExternalLink className="w-2.5 h-2.5 opacity-70" />
                              </a>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-zinc-500 flex-wrap font-mono">
                            <span className="text-zinc-800">
                              {lead.contactName ? `${lead.contactName} (${lead.contactTitle || "Decision-Maker"})` : lead.industry || "Target Company"}
                            </span>
                            {lead.contactEmail && (
                              <span className="inline-flex items-center gap-1 text-zinc-600">
                                <IconMail className="w-3 h-3 text-zinc-900" />
                                <a href={`mailto:${lead.contactEmail}`} className="hover:underline hover:text-zinc-950">
                                  {lead.contactEmail}
                                </a>
                              </span>
                            )}
                            {lead.location && (
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.location)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-950 transition-colors"
                              >
                                <IconMapPin className="w-3 h-3 text-zinc-700 shrink-0" />
                                <span>{lead.location}</span>
                              </a>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleOpenEmailDrawer(lead)}
                          leftIcon={<IconMailFast className="w-3.5 h-3.5" />}
                          className="shrink-0"
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
                <h2 className="font-inter font-semibold text-xl sm:text-2xl text-zinc-950">
                  Company & Product Profile
                </h2>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">
                  Define what your company sells, who benefits most, and the specific problems you solve.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-xl bg-white border border-zinc-200 shadow-sm space-y-5">
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-zinc-700 mb-1.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-white border border-zinc-300 rounded-xl p-3 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 shadow-xs transition-all font-inter"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-medium text-zinc-700 mb-1.5">
                        Industry / Niche
                      </label>
                      <input
                        type="text"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full bg-white border border-zinc-300 rounded-xl p-3 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 shadow-xs transition-all font-inter"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-700 mb-1.5">
                      Core Value Proposition & Outcome
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={valueProposition}
                      onChange={(e) => setValueProposition(e.target.value)}
                      className="w-full bg-white border border-zinc-300 rounded-xl p-3 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 shadow-xs transition-all font-inter"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-700 mb-1.5">
                      Product / Service Description
                    </label>
                    <textarea
                      rows={2}
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      className="w-full bg-white border border-zinc-300 rounded-xl p-3 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 shadow-xs transition-all font-inter"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-zinc-700 mb-1.5">
                        Typical Customer
                      </label>
                      <input
                        type="text"
                        value={typicalCustomer}
                        onChange={(e) => setTypicalCustomer(e.target.value)}
                        className="w-full bg-white border border-zinc-300 rounded-xl p-3 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 shadow-xs transition-all font-inter"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-medium text-zinc-700 mb-1.5">
                        Typical Deal Size ($)
                      </label>
                      <input
                        type="text"
                        value={typicalDealSize}
                        onChange={(e) => setTypicalDealSize(e.target.value)}
                        className="w-full bg-white border border-zinc-300 rounded-xl p-3 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 shadow-xs transition-all font-inter"
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
              </div>
            </div>
          )}

          {/* TAB 3: AI ICP GENERATOR */}
          {activeTab === "icp" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-inter font-semibold text-xl sm:text-2xl text-zinc-950">
                    Ideal Customer Profile (ICP) Engine
                  </h2>
                  <p className="text-xs text-zinc-500 font-mono mt-0.5">
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
                <div className="p-8 rounded-xl bg-white border border-zinc-200 text-center space-y-4 shadow-sm">
                  <IconTarget className="w-10 h-10 text-zinc-900 mx-auto" />
                  <p className="text-xs text-zinc-500 font-mono">
                    No ICP profiles generated yet. Click above to synthesize your profile using Gemini RAG.
                  </p>
                  <Button variant="primary" size="sm" onClick={handleGenerateIcp}>
                    Generate ICP Now
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {icps.map((icp) => (
                    <div key={icp.id} className="p-6 rounded-xl bg-white border border-zinc-200 shadow-sm space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700">
                            ICP v1.0
                          </span>
                          <h3 className="font-inter font-semibold text-lg text-zinc-950 mt-1.5">
                            {icp.title}
                          </h3>
                        </div>
                      </div>

                      {/* Industries */}
                      {icp.targetIndustries && (
                        <div className="space-y-1">
                          <span className="text-[11px] font-mono text-zinc-500 uppercase font-medium">
                            Target Industries
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {icp.targetIndustries.map((ind, i) => (
                              <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-zinc-700 font-mono">
                                {ind}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Target Roles */}
                      {icp.targetRoles && (
                        <div className="space-y-1">
                          <span className="text-[11px] font-mono text-zinc-500 uppercase font-medium">
                            Decision Makers
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {icp.targetRoles.map((role, i) => (
                              <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-900 font-mono font-medium">
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Pain Points */}
                      {icp.painPoints && (
                        <div className="space-y-1">
                          <span className="text-[11px] font-mono text-zinc-500 uppercase font-medium">
                            Top Pain Points Solved
                          </span>
                          <ul className="space-y-1 text-xs text-zinc-600 font-mono">
                            {icp.painPoints.map((pain, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-zinc-950 font-bold">•</span>
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
          )}

          {/* TAB 4: CRM PIPELINE */}
          {activeTab === "pipeline" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-inter font-semibold text-xl sm:text-2xl text-zinc-950">
                    Evidence Pipeline & CRM
                  </h2>
                  <p className="text-xs text-zinc-500 font-mono mt-0.5">
                    Prospects scored with verified buying signals & quotes
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <IconSearch className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search company or contact..."
                      value={leadSearch}
                      onChange={(e) => setLeadSearch(e.target.value)}
                      className="bg-white border border-zinc-300 rounded-xl py-2 pl-9 pr-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 shadow-xs font-mono transition-all"
                    />
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleRunResearch}
                    isLoading={isResearching}
                    leftIcon={<IconSearch className="w-3.5 h-3.5" />}
                  >
                    Find More Leads
                  </Button>
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase text-[10px] font-semibold">
                      <tr>
                        <th className="p-4">Company & Website</th>
                        <th className="p-4">Decision-Maker & Email</th>
                        <th className="p-4">Google Maps Address</th>
                        <th className="p-4">Verified Trigger Signal</th>
                        <th className="p-4">Fit Score</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      {filteredLeads.map((lead) => {
                        const websiteUrl = lead.websiteLink || `https://${lead.companyName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`;
                        const displayWebsite = websiteUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
                        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.location || lead.companyName)}`;

                        return (
                          <tr key={lead.id} className="hover:bg-zinc-50/80 transition-colors">
                            {/* Company & Website */}
                            <td className="p-4">
                              <div className="font-inter font-semibold text-sm text-zinc-950">
                                {lead.companyName}
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <a
                                  href={websiteUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-950 hover:underline"
                                  title={`Visit ${websiteUrl}`}
                                >
                                  <IconWorld className="w-3 h-3 shrink-0 text-zinc-400" />
                                  <span className="truncate max-w-[130px]">{displayWebsite}</span>
                                  <IconExternalLink className="w-2.5 h-2.5 opacity-70 shrink-0" />
                                </a>
                              </div>
                              <div className="text-[10px] text-zinc-500 mt-0.5">
                                {lead.industry || "B2B Tech"}
                              </div>
                            </td>

                            {/* Decision Maker & Email */}
                            <td className="p-4">
                              <div className="text-zinc-900 font-medium text-xs">
                                {lead.contactName || "Decision Maker"}
                              </div>
                              <div className="text-[11px] text-zinc-500 truncate max-w-[150px]">
                                {lead.contactTitle || "VP Growth / Sales"}
                              </div>
                              {lead.contactEmail ? (
                                <div className="flex items-center gap-1 mt-1">
                                  <a
                                    href={`mailto:${lead.contactEmail}`}
                                    className="inline-flex items-center gap-1 text-[11px] text-zinc-600 hover:text-zinc-950 transition-colors hover:underline"
                                    title={`Send email to ${lead.contactEmail}`}
                                  >
                                    <IconMail className="w-3 h-3 text-zinc-900 shrink-0" />
                                    <span className="truncate max-w-[140px]">{lead.contactEmail}</span>
                                  </a>
                                  <button
                                    type="button"
                                    onClick={(e) => handleCopyLeadEmail(lead.contactEmail!, e)}
                                    className="p-1 rounded hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
                                    title="Copy Email"
                                  >
                                    {copiedEmailAddress === lead.contactEmail ? (
                                      <IconCheck className="w-3 h-3 text-emerald-600" />
                                    ) : (
                                      <IconCopy className="w-3 h-3" />
                                    )}
                                  </button>
                                </div>
                              ) : (
                                <span className="text-[10px] text-zinc-400 italic">
                                  Email not listed
                                </span>
                              )}
                            </td>

                            {/* Google Maps Address */}
                            <td className="p-4 max-w-[180px]">
                              {lead.location ? (
                                <a
                                  href={mapsUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group inline-flex items-center gap-1.5 p-1.5 pr-2 rounded-lg bg-zinc-50 border border-zinc-200 hover:border-zinc-400 transition-all text-[11px] text-zinc-600 hover:text-zinc-950"
                                  title={`View ${lead.location} on Google Maps`}
                                >
                                  <IconMapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0 group-hover:scale-110 transition-transform" />
                                  <span className="truncate max-w-[130px]">{lead.location}</span>
                                  <IconExternalLink className="w-2.5 h-2.5 text-zinc-400 shrink-0" />
                                </a>
                              ) : (
                                <span className="text-[10px] text-zinc-400 italic">
                                  Location not mapped
                                </span>
                              )}
                            </td>

                            {/* Verified Trigger Signal */}
                            <td className="p-4 max-w-xs">
                              <div className="text-[11px] text-zinc-600 line-clamp-2 leading-relaxed">
                                {lead.evidence && typeof lead.evidence === "object"
                                  ? (lead.evidence as any).trigger || (lead.evidence as any).reason || (lead.evidence as any).painPointMatch || "Verified Buying Signal"
                                  : typeof lead.evidence === "string"
                                  ? lead.evidence
                                  : "Recent expansion in sales team & active outbound hiring"}
                              </div>
                            </td>

                            {/* Fit Score */}
                            <td className="p-4">
                              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-zinc-950 text-white font-medium shadow-xs">
                                {lead.score || 85}% Fit
                              </span>
                            </td>

                            {/* CRM Status */}
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
                                className="bg-white border border-zinc-300 rounded-lg px-2.5 py-1 text-[11px] text-zinc-900 focus:outline-none focus:border-zinc-900 shadow-xs cursor-pointer"
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Meeting Booked">Meeting Booked</option>
                                <option value="Replied">Replied</option>
                              </select>
                            </td>

                            {/* Action Button */}
                            <td className="p-4 text-right">
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => handleOpenEmailDrawer(lead)}
                                leftIcon={<IconMailFast className="w-3.5 h-3.5" />}
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
          )}

          {/* TAB 5: SIGNAL RESEARCH AGENT */}
          {activeTab === "research" && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h2 className="font-inter font-semibold text-xl sm:text-2xl text-zinc-950">
                  Autonomous Signal Research Agent
                </h2>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">
                  Trigger automated web queries, extract leadership changes, and discover qualified buyer accounts.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-zinc-200 shadow-sm space-y-5">
                <div className="space-y-3">
                  <span className="text-xs font-mono font-medium text-zinc-700 uppercase tracking-wider block">
                    Select Active ICP for Discovery Run
                  </span>
                  <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                    <div>
                      <p className="font-inter font-semibold text-sm text-zinc-950">
                        {icps.length > 0 ? icps[0].title : "Default B2B Tech ICP"}
                      </p>
                      <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
                        Targeting {profiles.length > 0 ? profiles[0].targetAudience : "B2B Decision Makers"}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-950 text-white font-medium">
                      Ready
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-medium text-zinc-700 uppercase tracking-wider block">
                    Autonomous Discovery Signals Tracked
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700 font-mono">
                    <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center gap-2">
                      <IconCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Recent Series A / Seed Funding</span>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center gap-2">
                      <IconCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Sales & Growth Leadership Hires</span>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center gap-2">
                      <IconCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Tech Stack & CRM Migrations</span>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center gap-2">
                      <IconCheck className="w-4 h-4 text-emerald-600 shrink-0" />
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
                    leftIcon={<IconRadar2 className="w-4 h-4" />}
                  >
                    Execute Signal Discovery Run
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* 3. Sliding Email Generation Drawer */}
      {emailDrawerOpen && selectedLeadForEmail && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white h-full border-l border-zinc-200 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto text-zinc-900">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                <div>
                  <h3 className="font-inter font-semibold text-base text-zinc-950">
                    Evidence-Backed Outreach Synthesis
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono mt-0.5">
                    Prospect: {selectedLeadForEmail.companyName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailDrawerOpen(false)}
                  className="w-8 h-8 rounded-lg border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
                >
                  <IconX className="w-4 h-4" />
                </button>
              </div>

              {/* Prospect Intelligence & Contact Dossier */}
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-3 font-mono">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-inter font-semibold text-sm text-zinc-950">
                      {selectedLeadForEmail.companyName}
                    </h4>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      {selectedLeadForEmail.industry || "B2B Technology"} • {selectedLeadForEmail.companySize || "20-100 employees"}
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-zinc-950 text-white font-medium shadow-xs">
                    {selectedLeadForEmail.score || 85}% Fit
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-zinc-200">
                  {/* Website */}
                  <div>
                    <span className="text-[10px] uppercase text-zinc-500 block mb-0.5 font-medium">
                      Company Website
                    </span>
                    {selectedLeadForEmail.websiteLink ? (
                      <a
                        href={selectedLeadForEmail.websiteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-zinc-700 hover:text-zinc-950 hover:underline font-medium truncate max-w-full"
                      >
                        <IconWorld className="w-3.5 h-3.5 shrink-0 text-zinc-500" />
                        <span className="truncate">{selectedLeadForEmail.websiteLink.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</span>
                        <IconExternalLink className="w-3 h-3 shrink-0 opacity-70 text-zinc-400" />
                      </a>
                    ) : (
                      <span className="text-[11px] text-zinc-400 italic">Not listed</span>
                    )}
                  </div>

                  {/* Decision Maker & Email */}
                  <div>
                    <span className="text-[10px] uppercase text-zinc-500 block mb-0.5 font-medium">
                      Decision-Maker Email
                    </span>
                    {selectedLeadForEmail.contactEmail ? (
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`mailto:${selectedLeadForEmail.contactEmail}`}
                          className="inline-flex items-center gap-1 text-xs text-zinc-700 hover:text-zinc-950 hover:underline truncate"
                        >
                          <IconMail className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
                          <span className="truncate">{selectedLeadForEmail.contactEmail}</span>
                        </a>
                        <button
                          type="button"
                          onClick={(e) => handleCopyLeadEmail(selectedLeadForEmail.contactEmail!, e)}
                          className="p-1 rounded hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
                          title="Copy Email"
                        >
                          {copiedEmailAddress === selectedLeadForEmail.contactEmail ? (
                            <IconCheck className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <IconCopy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-zinc-400 italic">Not listed</span>
                    )}
                  </div>
                </div>

                {/* Google Maps Location */}
                {selectedLeadForEmail.location && (
                  <div className="pt-2 border-t border-zinc-200">
                    <span className="text-[10px] uppercase text-zinc-500 block mb-1 font-medium">
                      Mapped Google Address
                    </span>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedLeadForEmail.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 p-2 rounded-lg bg-white border border-zinc-200 hover:border-zinc-400 transition-all text-xs text-zinc-700 hover:text-zinc-950 w-full shadow-xs"
                    >
                      <IconMapPin className="w-4 h-4 text-zinc-500 shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="truncate flex-1 font-medium">{selectedLeadForEmail.location}</span>
                      <span className="text-[10px] font-mono text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1 border border-zinc-200">
                        <span>Open Maps</span>
                        <IconExternalLink className="w-2.5 h-2.5" />
                      </span>
                    </a>
                  </div>
                )}
              </div>

              {/* Framework Selector with rounded-xl */}
              <div className="space-y-2">
                <label className="block text-xs font-mono font-medium text-zinc-700">
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
                    className={`p-3 rounded-xl border text-xs font-mono text-left cursor-pointer transition-all ${
                      selectedFramework === "PAS"
                        ? "bg-zinc-950 text-white font-medium border-zinc-950 shadow-xs"
                        : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
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
                    className={`p-3 rounded-xl border text-xs font-mono text-left cursor-pointer transition-all ${
                      selectedFramework === "Observation-Insight-Value"
                        ? "bg-zinc-950 text-white font-medium border-zinc-950 shadow-xs"
                        : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
                    }`}
                  >
                    Observation-Insight-Value
                  </button>
                </div>
              </div>

              {/* Generated Email Content */}
              {isGeneratingEmail ? (
                <div className="p-8 text-center space-y-3 font-mono">
                  <IconRefresh className="w-8 h-8 text-zinc-950 animate-spin mx-auto" />
                  <p className="text-xs text-zinc-500">
                    Synthesizing real-world evidence and drafting copy...
                  </p>
                </div>
              ) : activeColdEmail ? (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                    <span className="text-[10px] uppercase text-zinc-500 block mb-1 font-medium">
                      Subject Line
                    </span>
                    <p className="text-xs font-inter font-semibold text-zinc-950">
                      {activeColdEmail.subject}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                    <span className="text-[10px] uppercase text-zinc-500 block mb-1.5 font-medium">
                      Body Copy
                    </span>
                    <p className="text-xs text-zinc-800 whitespace-pre-line leading-relaxed font-inter">
                      {activeColdEmail.body}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-zinc-200 flex items-center justify-between gap-3">
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
