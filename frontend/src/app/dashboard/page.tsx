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
  MapPin,
  Globe,
  EnvelopeSimple,
  Cpu,
  Target,
  Users,
  PaperPlaneTilt,
  Check,
  Copy,
  SignOut,
  ArrowSquareOut,
  Buildings,
  X,
  CircleNotch,
  CaretRight,
  MagnifyingGlass,
  SquaresFour,
  Sparkle,
} from "@phosphor-icons/react";
import { ProspectLead } from "../../types";

const AVATAR_LIST = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
];

const getLeadAvatar = (id: number | string) => {
  const num = typeof id === "number" ? id : (id ? id.toString().charCodeAt(0) : 0);
  return AVATAR_LIST[Math.abs(num) % AVATAR_LIST.length];
};

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

  const handleRunResearch = async () => {
    const icpId = activeIcp?.id || (icps.length > 0 ? icps[0].id : 1);
    await dispatch(runCustomResearch({ icpId, leadCount: 5 }));
    dispatch(fetchAllLeads());
  };

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

  const filteredLeads = leads.filter(
    (lead) =>
      lead.companyName.toLowerCase().includes(leadSearch.toLowerCase()) ||
      (lead.contactName && lead.contactName.toLowerCase().includes(leadSearch.toLowerCase())) ||
      (lead.contactTitle && lead.contactTitle.toLowerCase().includes(leadSearch.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 flex flex-col md:flex-row selection:bg-zinc-900 selection:text-white font-normal tracking-tight">
      {/* 1. Sidebar Navigation */}
      <aside className="w-full md:w-60 bg-white border-b md:border-b-0 md:border-r border-zinc-200/80 flex flex-col justify-between shrink-0 z-30">
        <div>
          {/* Brand Header with RAW Icon without BG Black */}
          <div className="p-4 border-b border-zinc-200/70 flex items-center justify-between">
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
              <div>
                <span className="text-sm font-normal tracking-tight text-zinc-950 block leading-tight">
                  Postrichment
                </span>
                <span className="text-[10px] text-zinc-400 font-normal tracking-tight">
                  Autonomous GTM
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Menu with RAW Icons & Multi-color Badges */}
          <nav className="p-2 space-y-0.5 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[3px] transition-all text-left cursor-pointer ${
                activeTab === "overview"
                  ? "bg-zinc-100 text-zinc-950 font-medium"
                  : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
              }`}
            >
              <SquaresFour className="w-4 h-4 shrink-0 text-zinc-900" />
              <span>GTM Overview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[3px] transition-all text-left cursor-pointer ${
                activeTab === "profile"
                  ? "bg-zinc-100 text-zinc-950 font-medium"
                  : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
              }`}
            >
              <Buildings className="w-4 h-4 shrink-0 text-zinc-900" />
              <span>Company Profile</span>
              {profiles.length > 0 && (
                <span className="ml-auto bg-blue-700/10 text-blue-600 rounded-[2px] border-0 py-[2px] px-1.5 text-[10px] leading-none">
                  {profiles.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("icp")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[3px] transition-all text-left cursor-pointer ${
                activeTab === "icp"
                  ? "bg-zinc-100 text-zinc-950 font-medium"
                  : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
              }`}
            >
              <Target className="w-4 h-4 shrink-0 text-zinc-900" />
              <span>AI ICP Discovery</span>
              {icps.length > 0 && (
                <span className="ml-auto bg-purple-700/10 text-purple-600 rounded-[2px] border-0 py-[2px] px-1.5 text-[10px] leading-none">
                  {icps.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("pipeline")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[3px] transition-all text-left cursor-pointer ${
                activeTab === "pipeline"
                  ? "bg-zinc-100 text-zinc-950 font-medium"
                  : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
              }`}
            >
              <Users className="w-4 h-4 shrink-0 text-zinc-900" />
              <span>CRM Intelligence</span>
              {leads.length > 0 && (
                <span className="ml-auto bg-green-700/10 text-green-600 rounded-[2px] border-0 py-[2px] px-1.5 text-[10px] leading-none">
                  {leads.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("research")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[3px] transition-all text-left cursor-pointer ${
                activeTab === "research"
                  ? "bg-zinc-100 text-zinc-950 font-medium"
                  : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
              }`}
            >
              <Cpu className="w-4 h-4 shrink-0 text-zinc-900" />
              <span>Signal Research Agent</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-zinc-200/70 space-y-2 text-xs">
          <div className="p-2.5 rounded-[4px] bg-zinc-50/70 border border-zinc-200/60 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-zinc-400 uppercase tracking-tight">RAG Vector Hub</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            </div>
            <p className="text-xs text-zinc-950 font-normal tracking-tight truncate">
              {profiles.length > 0 ? profiles[0].companyName : "Awaiting Setup"}
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-zinc-400 px-1">
            <span>Postrichment Core</span>
            <Link href="/onboarding" className="text-zinc-600 hover:text-zinc-950 transition-colors">
              New Intake
            </Link>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-[3px] text-xs text-zinc-600 hover:text-rose-600 bg-white hover:bg-rose-50 border border-zinc-200/70 transition-all cursor-pointer font-normal"
          >
            <SignOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#FAFAFA]">
        {/* Top Header Bar */}
        <header className="h-14 px-6 border-b border-zinc-200/70 bg-white/80 backdrop-blur-md flex items-center justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-normal tracking-tight">
            <span className="text-zinc-950 font-normal text-xs sm:text-sm">
              {activeTab === "overview" && "GTM Overview"}
              {activeTab === "profile" && "Business Profile"}
              {activeTab === "icp" && "AI ICP Generator"}
              {activeTab === "pipeline" && "Evidence Pipeline & CRM"}
              {activeTab === "research" && "Signal Detector Agent"}
            </span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-400 text-xs truncate max-w-[150px]">
              {workspace?.name || "Production"}
            </span>
          </div>

          {/* Header Action Tools */}
          <div className="flex items-center gap-2.5">
            {activeTab === "pipeline" && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleRunResearch}
                isLoading={isResearching}
                leftIcon={<Sparkle className="w-3.5 h-3.5" />}
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
                leftIcon={<Cpu className="w-3.5 h-3.5" />}
              >
                Synthesize ICP
              </Button>
            )}

            <UserProfileDropdown />
          </div>
        </header>

        {/* Dashboard Main View Container */}
        <main className="flex-1 p-5 md:p-8 space-y-6 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Quick Metrics Bar with Multi-color Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-md bg-white border border-zinc-200/80 shadow-xs space-y-1">
                  <span className="text-xs text-zinc-500 font-normal tracking-tight block">
                    Discovered Leads
                  </span>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-2xl sm:text-3xl font-normal text-zinc-950 tracking-tight">
                      {leads.length}
                    </span>
                    <span className="bg-green-700/10 text-green-600 rounded-[2px] border-0 py-[2px] px-2 text-[10px] font-normal tracking-tight">
                      Live Evidence
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-md bg-white border border-zinc-200/80 shadow-xs space-y-1">
                  <span className="text-xs text-zinc-500 font-normal tracking-tight block">
                    High Fit ICP Matches
                  </span>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-2xl sm:text-3xl font-normal text-zinc-950 tracking-tight">
                      {leads.filter((l) => (l.score || 0) >= 80).length}
                    </span>
                    <span className="bg-blue-700/10 text-blue-600 rounded-[2px] border-0 py-[2px] px-2 text-[10px] font-normal tracking-tight">
                      Score ≥ 80%
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-md bg-white border border-zinc-200/80 shadow-xs space-y-1">
                  <span className="text-xs text-zinc-500 font-normal tracking-tight block">
                    Synthesized ICPs
                  </span>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-2xl sm:text-3xl font-normal text-zinc-950 tracking-tight">
                      {icps.length}
                    </span>
                    <span className="bg-purple-700/10 text-purple-600 rounded-[2px] border-0 py-[2px] px-2 text-[10px] font-normal tracking-tight">
                      RAG Grounded
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-md bg-white border border-zinc-200/80 shadow-xs space-y-1">
                  <span className="text-xs text-zinc-500 font-normal tracking-tight block">
                    Avg Response Lift
                  </span>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-2xl sm:text-3xl font-normal text-zinc-950 tracking-tight">
                      +3.2x
                    </span>
                    <span className="bg-amber-700/10 text-amber-600 rounded-[2px] border-0 py-[2px] px-2 text-[10px] font-normal tracking-tight">
                      PAS Framework
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Action Prompt if no profiles */}
              {profiles.length === 0 ? (
                <div className="p-8 rounded-md bg-white border border-zinc-200/80 text-center space-y-4 shadow-xs">
                  <Buildings className="w-8 h-8 text-zinc-700 mx-auto" />
                  <div>
                    <h3 className="text-base text-zinc-950 font-normal tracking-tight">
                      No Company Profile Configured Yet
                    </h3>
                    <p className="text-xs text-zinc-500 max-w-md mx-auto mt-1 leading-relaxed font-normal tracking-tight">
                      Set up your company value proposition and target customer details to activate the autonomous lead discovery engine.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => router.push("/onboarding")}
                    rightIcon={<CaretRight className="w-3.5 h-3.5" />}
                  >
                    Open Company Intake Form
                  </Button>
                </div>
              ) : (
                /* Recent Discovered Leads Preview with Real Avatars */
                <div className="p-5 rounded-md bg-white border border-zinc-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                    <div>
                      <h3 className="text-sm font-normal tracking-tight text-zinc-950">
                        Latest High-Intent Prospects
                      </h3>
                      <p className="text-xs text-zinc-500 mt-0.5 font-normal tracking-tight">
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

                  <div className="divide-y divide-zinc-100">
                    {leads.slice(0, 4).map((lead, idx) => (
                      <div key={lead.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3">
                          {/* Real Avatar */}
                          <img
                            src={getLeadAvatar(lead.id || idx)}
                            alt={lead.contactName || lead.companyName}
                            className="w-9 h-9 rounded-full object-cover border border-zinc-200/80 shadow-xs shrink-0 mt-0.5"
                          />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-medium text-zinc-950 tracking-tight">
                                {lead.companyName}
                              </span>
                              <span className="bg-green-700/10 text-green-600 rounded-[2px] border-0 py-[2px] px-2 text-[10px] font-normal tracking-tight">
                                {lead.score || 85}% Fit
                              </span>
                              {lead.websiteLink && (
                                <a
                                  href={lead.websiteLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-950 transition-colors"
                                >
                                  <Globe className="w-3 h-3 text-zinc-400" />
                                  <span>{lead.websiteLink.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</span>
                                  <ArrowSquareOut className="w-2.5 h-2.5 opacity-70" />
                                </a>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-zinc-500 flex-wrap font-normal tracking-tight">
                              <span className="text-zinc-800">
                                {lead.contactName ? `${lead.contactName} (${lead.contactTitle || "Decision-Maker"})` : lead.industry || "Target Company"}
                              </span>
                              {lead.contactEmail && (
                                <span className="inline-flex items-center gap-1 text-zinc-600">
                                  <EnvelopeSimple className="w-3 h-3 text-zinc-700" />
                                  <a href={`mailto:${lead.contactEmail}`} className="hover:underline hover:text-zinc-950">
                                    {lead.contactEmail}
                                  </a>
                                </span>
                              )}
                              {lead.location && (
                                <span className="inline-flex items-center gap-1 text-zinc-400">
                                  <MapPin className="w-3 h-3 text-zinc-500" />
                                  <span>{lead.location}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleOpenEmailDrawer(lead)}
                          leftIcon={<PaperPlaneTilt className="w-3.5 h-3.5" />}
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
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-zinc-950">
                  Company & Product Profile
                </h2>
                <p className="text-xs text-zinc-500 mt-1 font-normal tracking-tight">
                  Define what your company sells, who benefits most, and the specific problems you solve.
                </p>
              </div>

              <div className="p-6 rounded-md bg-white border border-zinc-200/80 shadow-xs space-y-4">
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-normal tracking-tight text-zinc-700 mb-1.5">
                        Company Name
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
                      Core Value Proposition & Outcome
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-normal tracking-tight text-zinc-700 mb-1.5">
                        Typical Customer
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

                  <div className="pt-2 flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      isLoading={isProfileLoading}
                      rightIcon={<CaretRight className="w-3.5 h-3.5" />}
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
                  onClick={handleGenerateIcp}
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
                  <Button variant="primary" size="sm" onClick={handleGenerateIcp}>
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
          )}

          {/* TAB 4: CRM PIPELINE & TABLE - Overflow Fixed, Clean Editorial Layout */}
          {activeTab === "pipeline" && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-zinc-950">
                    Evidence Pipeline & CRM
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1 font-normal tracking-tight">
                    Prospects scored with verified buying triggers & contact intelligence
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <MagnifyingGlass className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Filter prospects..."
                      value={leadSearch}
                      onChange={(e) => setLeadSearch(e.target.value)}
                      className="bg-white border border-zinc-200/90 rounded-[3px] py-1.5 pl-8 pr-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 transition-all font-normal tracking-tight w-48"
                    />
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleRunResearch}
                    isLoading={isResearching}
                    leftIcon={<Sparkle className="w-3.5 h-3.5" />}
                  >
                    Find Leads
                  </Button>
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-white border border-zinc-200/80 rounded-md overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-normal tracking-tight border-collapse">
                    <thead className="bg-zinc-50/70 border-b border-zinc-200/80 text-zinc-500 uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-4 font-normal">Company</th>
                        <th className="py-3 px-4 font-normal">Decision Maker</th>
                        <th className="py-3 px-4 font-normal">Location</th>
                        <th className="py-3 px-4 font-normal">Verified Trigger</th>
                        <th className="py-3 px-4 font-normal">Fit Score</th>
                        <th className="py-3 px-4 font-normal">Status</th>
                        <th className="py-3 px-4 font-normal text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {filteredLeads.map((lead, idx) => {
                        const websiteUrl = lead.websiteLink || `https://${lead.companyName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`;
                        const displayWebsite = websiteUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
                        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.location || lead.companyName)}`;

                        return (
                          <tr key={lead.id} className="hover:bg-zinc-50/60 transition-colors">
                            {/* Company & Website */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="font-medium text-xs text-zinc-950">
                                {lead.companyName}
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <a
                                  href={websiteUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-950 transition-colors"
                                  title={`Visit ${websiteUrl}`}
                                >
                                  <Globe className="w-3 h-3 text-zinc-400" />
                                  <span className="truncate max-w-[120px]">{displayWebsite}</span>
                                  <ArrowSquareOut className="w-2.5 h-2.5 opacity-60" />
                                </a>
                              </div>
                            </td>

                            {/* Decision Maker with Real Avatar */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={getLeadAvatar(lead.id || idx)}
                                  alt={lead.contactName || "Decision Maker"}
                                  className="w-7 h-7 rounded-full object-cover border border-zinc-200/80 shadow-xs shrink-0"
                                />
                                <div>
                                  <div className="text-zinc-950 font-normal text-xs">
                                    {lead.contactName || "Budget Holder"}
                                  </div>
                                  {lead.contactEmail ? (
                                    <div className="flex items-center gap-1 mt-0.5">
                                      <a
                                        href={`mailto:${lead.contactEmail}`}
                                        className="text-[11px] text-zinc-500 hover:text-zinc-950 hover:underline"
                                      >
                                        {lead.contactEmail}
                                      </a>
                                      <button
                                        type="button"
                                        onClick={(e) => handleCopyLeadEmail(lead.contactEmail!, e)}
                                        className="p-0.5 text-zinc-400 hover:text-zinc-950 transition-colors cursor-pointer"
                                        title="Copy Email"
                                      >
                                        {copiedEmailAddress === lead.contactEmail ? (
                                          <Check className="w-3 h-3 text-green-600" />
                                        ) : (
                                          <Copy className="w-3 h-3" />
                                        )}
                                      </button>
                                    </div>
                                  ) : (
                                    <span className="text-[11px] text-zinc-400">Not listed</span>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Google Maps Address */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              {lead.location ? (
                                <a
                                  href={mapsUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-950 transition-colors"
                                  title={`View ${lead.location} on Google Maps`}
                                >
                                  <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                                  <span className="truncate max-w-[120px]">{lead.location}</span>
                                </a>
                              ) : (
                                <span className="text-[11px] text-zinc-400">Location unmapped</span>
                              )}
                            </td>

                            {/* Verified Trigger Signal */}
                            <td className="py-3.5 px-4 max-w-xs">
                              <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                                {lead.evidence && typeof lead.evidence === "object"
                                  ? (lead.evidence as any).trigger || (lead.evidence as any).reason || (lead.evidence as any).painPointMatch || "Verified Buying Signal"
                                  : typeof lead.evidence === "string"
                                  ? lead.evidence
                                  : "Recent expansion in sales team & active outbound hiring"}
                              </p>
                            </td>

                            {/* Fit Score with Multi-color Badge */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="bg-green-700/10 text-green-600 rounded-[2px] border-0 py-[2px] px-2 text-[11px] font-normal tracking-tight">
                                {lead.score || 85}% Fit
                              </span>
                            </td>

                            {/* CRM Status */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
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
                                className="bg-white border border-zinc-200 rounded-[3px] px-2 py-1 text-[11px] text-zinc-800 focus:outline-none focus:border-zinc-950 cursor-pointer font-normal"
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Meeting Booked">Meeting Booked</option>
                                <option value="Replied">Replied</option>
                              </select>
                            </td>

                            {/* Action Button */}
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => handleOpenEmailDrawer(lead)}
                                leftIcon={<PaperPlaneTilt className="w-3 h-3" />}
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
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-zinc-950">
                  Autonomous Signal Research Agent
                </h2>
                <p className="text-xs text-zinc-500 mt-1 font-normal tracking-tight">
                  Trigger automated web queries, extract leadership changes, and discover qualified buyer accounts.
                </p>
              </div>

              <div className="p-5 rounded-md bg-white border border-zinc-200/80 shadow-xs space-y-4">
                <div className="space-y-2">
                  <span className="text-xs text-zinc-400 uppercase tracking-tight block">
                    Active ICP for Discovery Run
                  </span>
                  <div className="p-3 rounded-[3px] bg-zinc-50 border border-zinc-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-zinc-950 tracking-tight">
                        {icps.length > 0 ? icps[0].title : "Default B2B Tech ICP"}
                      </p>
                      <p className="text-[11px] text-zinc-500 mt-0.5 font-normal tracking-tight">
                        Targeting {profiles.length > 0 ? profiles[0].targetAudience : "B2B Decision Makers"}
                      </p>
                    </div>
                    <span className="bg-green-700/10 text-green-600 rounded-[2px] border-0 py-[2px] px-2 text-[10px] font-normal tracking-tight">
                      Ready
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-zinc-100">
                  <span className="text-xs text-zinc-400 uppercase tracking-tight block">
                    Autonomous Discovery Signals Tracked
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700 font-normal tracking-tight">
                    <div className="p-2.5 rounded-[3px] bg-zinc-50 border border-zinc-100 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
                      <span>Series A / B Funding Rounds</span>
                    </div>
                    <div className="p-2.5 rounded-[3px] bg-zinc-50 border border-zinc-100 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
                      <span>Sales & RevOps Leadership Hires</span>
                    </div>
                    <div className="p-2.5 rounded-[3px] bg-zinc-50 border border-zinc-100 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
                      <span>CRM & Outbound Migrations</span>
                    </div>
                    <div className="p-2.5 rounded-[3px] bg-zinc-50 border border-zinc-100 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
                      <span>Hiring Expansion Listings</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleRunResearch}
                    isLoading={isResearching}
                    leftIcon={<Sparkle className="w-3.5 h-3.5" />}
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
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white h-full border-l border-zinc-200 shadow-xl p-5 flex flex-col justify-between overflow-y-auto text-zinc-900 font-normal tracking-tight">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <div>
                  <h3 className="text-sm font-medium tracking-tight text-zinc-950">
                    Grounded Outreach Synthesis
                  </h3>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Prospect: {selectedLeadForEmail.companyName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailDrawerOpen(false)}
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
                      src={getLeadAvatar(selectedLeadForEmail.id || 0)}
                      alt={selectedLeadForEmail.contactName || selectedLeadForEmail.companyName}
                      className="w-8 h-8 rounded-full object-cover border border-zinc-200/80 shadow-xs"
                    />
                    <div>
                      <h4 className="text-xs font-medium text-zinc-950 tracking-tight">
                        {selectedLeadForEmail.contactName || "Decision Maker"}
                      </h4>
                      <p className="text-[11px] text-zinc-500">
                        {selectedLeadForEmail.contactTitle || "Head of Revenue"} · {selectedLeadForEmail.companyName}
                      </p>
                    </div>
                  </div>
                  <span className="bg-green-700/10 text-green-600 rounded-[2px] border-0 py-[2px] px-2 text-[10px] font-normal tracking-tight">
                    {selectedLeadForEmail.score || 85}% Fit
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-zinc-200/60">
                  <div>
                    <span className="text-[10px] text-zinc-400 block mb-0.5 uppercase">
                      Email
                    </span>
                    {selectedLeadForEmail.contactEmail ? (
                      <span className="text-xs text-zinc-800 truncate block">
                        {selectedLeadForEmail.contactEmail}
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
                    onClick={() => {
                      setSelectedFramework("PAS");
                      dispatch(
                        generateLeadColdEmail({
                          prospectId: selectedLeadForEmail.id,
                          framework: "PAS",
                        })
                      );
                    }}
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
                    onClick={() => {
                      setSelectedFramework("Observation-Insight-Value");
                      dispatch(
                        generateLeadColdEmail({
                          prospectId: selectedLeadForEmail.id,
                          framework: "Observation-Insight-Value",
                        })
                      );
                    }}
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
