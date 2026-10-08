"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { logout, fetchCurrentUser } from "../../store/slices/authSlice";
import { signOut } from "next-auth/react";
import { fetchProfiles, createBusinessProfile, updateBusinessProfile } from "../../store/slices/profileSlice";
import { generateIcpWithRAG, fetchIcps } from "../../store/slices/icpSlice";
import { fetchAllLeads, updateLeadStatus, generateLeadColdEmail, runCustomResearch } from "../../store/slices/crmSlice";
import { fetchKnowledge, scrapeAndIngest, deleteKnowledge } from "../../store/slices/ragSlice";
import { ragApi } from "../../services/api";
import { ProspectLead } from "../../types";
import {
  DashboardTab,
  DashboardSidebar,
  DashboardHeader,
  DashboardOverviewTab,
  CompanyProfileTab,
  IcpEngineTab,
  CrmPipelineTab,
  RagKnowledgeTab,
  SignalResearchTab,
  ColdEmailDrawer,
} from "../../components/dashboard";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Redux state
  const { workspace, token } = useAppSelector((state) => state.auth);
  const { profiles, activeProfile, isLoading: isProfileLoading } = useAppSelector((state) => state.profile);
  const { icps, activeIcp, isGenerating: isIcpGenerating } = useAppSelector((state) => state.icp);
  const { leads, isResearching, isGeneratingEmail, activeColdEmail } = useAppSelector((state) => state.crm);
  const { knowledgeDocs, isLoadingKnowledge, isIngesting: isRagIngesting, successMessage: ragSuccessMessage } = useAppSelector((state) => state.rag);

  // Active Tab
  const [activeTab, setActiveTab] = React.useState<DashboardTab>("overview");

  // Form states for business profile
  const [companyName, setCompanyName] = React.useState("ScaleAgent AI");
  const [industry, setIndustry] = React.useState("B2B AI SaaS & Automation");
  const [valueProposition, setValueProposition] = React.useState(
    "Automate B2B SDR research and 3x outbound conversions with verified real-time growth signals."
  );
  const [productDescription, setProductDescription] = React.useState(
    "Autonomous research engine that tracks hiring spikes, funding rounds, and drafts PAS cold outreach."
  );
  const [targetAudience, setTargetAudience] = React.useState("Founders, VP Sales, Heads of Growth");
  const [typicalCustomer, setTypicalCustomer] = React.useState("Series A/B tech startups with 20-150 employees");
  const [typicalDealSize, setTypicalDealSize] = React.useState("$12,000 - $36,000 / year");
  const [region, setRegion] = React.useState("North America & Global");

  // Web Scraping in Profile Form
  const [companyWebsiteUrl, setCompanyWebsiteUrl] = React.useState("");
  const [isScrapingProfile, setIsScrapingProfile] = React.useState(false);
  const [scrapeProfileNotice, setScrapeProfileNotice] = React.useState<string | null>(null);

  // Dedicated RAG Tab States
  const [scrapeUrlInput, setScrapeUrlInput] = React.useState("");
  const [ragSearchQuery, setRagSearchQuery] = React.useState("");
  const [ragSearchResults, setRagSearchResults] = React.useState<any[] | null>(null);
  const [isTestingQuery, setIsTestingQuery] = React.useState(false);

  // Selected lead for cold email drawer
  const [selectedLeadForEmail, setSelectedLeadForEmail] = React.useState<ProspectLead | null>(null);
  const [emailDrawerOpen, setEmailDrawerOpen] = React.useState(false);
  const [selectedFramework, setSelectedFramework] = React.useState("PAS");
  const [leadSearch, setLeadSearch] = React.useState("");

  // Guard data initialization on mount
  const initializedRef = React.useRef(false);

  React.useEffect(() => {
    const savedToken =
      typeof window !== "undefined"
        ? localStorage.getItem("postrichly_token") || localStorage.getItem("postrichment_token")
        : token;
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
      dispatch(fetchKnowledge());
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
      setTypicalCustomer(p.typicalCustomer || p.targetAudience || "");
      setTypicalDealSize(p.typicalDealSize || "");
      if (p.targetAudience) setTargetAudience(p.targetAudience);
      if (p.region) setRegion(p.region);
    }
  }, [profiles, activeProfile]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const existing = activeProfile || (profiles.length > 0 ? profiles[0] : null);

    if (existing && existing.id) {
      await dispatch(
        updateBusinessProfile({
          id: existing.id,
          profile: {
            companyName,
            industry,
            valueProposition,
            productDescription,
            targetAudience,
            region,
            typicalCustomer: targetAudience || typicalCustomer,
            typicalDealSize,
          },
        })
      );
    } else {
      await dispatch(
        createBusinessProfile({
          companyName,
          industry,
          valueProposition,
          productDescription,
          targetAudience,
          region,
          typicalCustomer: targetAudience || typicalCustomer,
          typicalDealSize,
        })
      );
    }

    setActiveTab("icp");
  };

  const handleSaveAndDiscoverLeads = async (e: React.FormEvent) => {
    e.preventDefault();
    const existing = activeProfile || (profiles.length > 0 ? profiles[0] : null);

    let profileId = existing?.id;
    if (existing && existing.id) {
      const updateAction = await dispatch(
        updateBusinessProfile({
          id: existing.id,
          profile: {
            companyName,
            industry,
            valueProposition,
            productDescription,
            targetAudience,
            region,
            typicalCustomer: targetAudience || typicalCustomer,
            typicalDealSize,
          },
        })
      );
      if (updateBusinessProfile.fulfilled.match(updateAction)) {
        profileId = updateAction.payload.id;
      }
    } else {
      const createAction = await dispatch(
        createBusinessProfile({
          companyName,
          industry,
          valueProposition,
          productDescription,
          targetAudience,
          region,
          typicalCustomer: targetAudience || typicalCustomer,
          typicalDealSize,
        })
      );
      if (createBusinessProfile.fulfilled.match(createAction)) {
        profileId = createAction.payload.id;
      }
    }

    if (profileId) {
      const icpAction = await dispatch(
        generateIcpWithRAG({
          profileId,
          autoDiscover: true,
          leadCount: 5,
        })
      );

      if (generateIcpWithRAG.fulfilled.match(icpAction)) {
        await dispatch(fetchAllLeads());
        setActiveTab("pipeline");
      }
    }
  };

  const handleScrapeAndUpdateProfile = async () => {
    if (!companyWebsiteUrl.trim()) return;
    setIsScrapingProfile(true);
    setScrapeProfileNotice(null);

    try {
      const resAction = await dispatch(scrapeAndIngest({ url: companyWebsiteUrl.trim(), companyName }));
      if (scrapeAndIngest.fulfilled.match(resAction)) {
        const payload = resAction.payload;
        if (payload?.extractedData) {
          const ext = payload.extractedData;
          if (ext.companyName) setCompanyName(ext.companyName);
          if (ext.industry) setIndustry(ext.industry);
          if (ext.valueProposition) setValueProposition(ext.valueProposition);
          if (ext.productDescription) setProductDescription(ext.productDescription);
          if (ext.targetAudience) setTargetAudience(ext.targetAudience);
          if (ext.region) setRegion(ext.region);
          if (ext.typicalDealSize) setTypicalDealSize(ext.typicalDealSize);
          setScrapeProfileNotice(`Scraped & ingested into RAG: ${payload.chunksIngested} vector knowledge chunks stored.`);
        }
      } else {
        setScrapeProfileNotice("Could not parse website. Please enter details manually.");
      }
    } catch {
      setScrapeProfileNotice("Scraping connection error.");
    } finally {
      setIsScrapingProfile(false);
    }
  };

  const handleScrapeAndIngestUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scrapeUrlInput.trim()) return;

    await dispatch(scrapeAndIngest({ url: scrapeUrlInput.trim() }));
    setScrapeUrlInput("");
    dispatch(fetchKnowledge());
  };

  const handleTestRagSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ragSearchQuery.trim()) return;

    setIsTestingQuery(true);
    try {
      const res = await ragApi.queryKnowledge(ragSearchQuery.trim(), 4);
      setRagSearchResults(res);
    } catch (err: any) {
      console.warn("RAG query error:", err.message);
    } finally {
      setIsTestingQuery(false);
    }
  };

  const handleDeleteKnowledgeDoc = async (id: number) => {
    await dispatch(deleteKnowledge(id));
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

  const handleLogout = async () => {
    dispatch(logout());
    try {
      await signOut({ redirect: false });
    } catch {
      // ignore
    }
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 flex flex-col md:flex-row selection:bg-zinc-900 selection:text-white font-normal tracking-tight">
      {/* 1. Sidebar Navigation */}
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profilesCount={profiles.length}
        icpsCount={icps.length}
        leadsCount={leads.length}
        knowledgeDocsCount={knowledgeDocs.length}
        companyName={profiles.length > 0 ? profiles[0].companyName : undefined}
        onLogout={handleLogout}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#FAFAFA]">
        {/* Top Header Bar */}
        <DashboardHeader
          activeTab={activeTab}
          workspaceName={workspace?.name}
          onRunResearch={handleRunResearch}
          isResearching={isResearching}
          onGenerateIcp={handleGenerateIcp}
          isIcpGenerating={isIcpGenerating}
        />

        {/* Dashboard Main View Container */}
        <main className="flex-1 p-5 md:p-8 space-y-6 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <DashboardOverviewTab
              leads={leads}
              profiles={profiles}
              icps={icps}
              onOpenEmailDrawer={handleOpenEmailDrawer}
              onNavigateToPipeline={() => setActiveTab("pipeline")}
            />
          )}

          {/* TAB 2: BUSINESS PROFILE */}
          {activeTab === "profile" && (
            <CompanyProfileTab
              companyName={companyName}
              setCompanyName={setCompanyName}
              industry={industry}
              setIndustry={setIndustry}
              valueProposition={valueProposition}
              setValueProposition={setValueProposition}
              productDescription={productDescription}
              setProductDescription={setProductDescription}
              targetAudience={targetAudience}
              setTargetAudience={setTargetAudience}
              typicalCustomer={typicalCustomer}
              setTypicalCustomer={setTypicalCustomer}
              typicalDealSize={typicalDealSize}
              setTypicalDealSize={setTypicalDealSize}
              region={region}
              setRegion={setRegion}
              companyWebsiteUrl={companyWebsiteUrl}
              setCompanyWebsiteUrl={setCompanyWebsiteUrl}
              isScrapingProfile={isScrapingProfile}
              isRagIngesting={isRagIngesting}
              scrapeProfileNotice={scrapeProfileNotice}
              isProfileLoading={isProfileLoading}
              isIcpGenerating={isIcpGenerating}
              onScrapeAndUpdateProfile={handleScrapeAndUpdateProfile}
              onSaveProfile={handleSaveProfile}
              onSaveAndDiscoverLeads={handleSaveAndDiscoverLeads}
            />
          )}

          {/* TAB 3: AI ICP GENERATOR */}
          {activeTab === "icp" && (
            <IcpEngineTab
              icps={icps}
              isIcpGenerating={isIcpGenerating}
              onGenerateIcp={handleGenerateIcp}
            />
          )}

          {/* TAB 4: CRM PIPELINE & TABLE */}
          {activeTab === "pipeline" && (
            <CrmPipelineTab
              leads={leads}
              leadSearch={leadSearch}
              setLeadSearch={setLeadSearch}
              isResearching={isResearching}
              onRunResearch={handleRunResearch}
              activeProfile={activeProfile}
              profiles={profiles}
              region={region}
              targetAudience={targetAudience}
              onNavigateToProfile={() => setActiveTab("profile")}
              onUpdateLeadStatus={(id, status) => dispatch(updateLeadStatus({ id, status }))}
              onOpenEmailDrawer={handleOpenEmailDrawer}
            />
          )}

          {/* TAB 5: SIGNAL RESEARCH AGENT */}
          {activeTab === "research" && (
            <SignalResearchTab
              icps={icps}
              profiles={profiles}
              isResearching={isResearching}
              onRunResearch={handleRunResearch}
            />
          )}

          {/* TAB 6: AUTONOMOUS WEB SCRAPING & RAG VECTOR HUB */}
          {activeTab === "rag" && (
            <RagKnowledgeTab
              knowledgeDocs={knowledgeDocs}
              isLoadingKnowledge={isLoadingKnowledge}
              isRagIngesting={isRagIngesting}
              ragSuccessMessage={ragSuccessMessage}
              scrapeUrlInput={scrapeUrlInput}
              setScrapeUrlInput={setScrapeUrlInput}
              ragSearchQuery={ragSearchQuery}
              setRagSearchQuery={setRagSearchQuery}
              ragSearchResults={ragSearchResults}
              isTestingQuery={isTestingQuery}
              activeProfile={activeProfile}
              profiles={profiles}
              region={region}
              onScrapeAndIngestUrl={handleScrapeAndIngestUrl}
              onTestRagSearch={handleTestRagSearch}
              onDeleteKnowledgeDoc={handleDeleteKnowledgeDoc}
              onRefreshKnowledge={() => dispatch(fetchKnowledge())}
            />
          )}
        </main>
      </div>

      {/* 3. Sliding Email Generation Drawer */}
      <ColdEmailDrawer
        isOpen={emailDrawerOpen}
        onClose={() => setEmailDrawerOpen(false)}
        lead={selectedLeadForEmail}
        selectedFramework={selectedFramework}
        onSelectFramework={(fw) => {
          setSelectedFramework(fw);
          if (selectedLeadForEmail) {
            dispatch(
              generateLeadColdEmail({
                prospectId: selectedLeadForEmail.id,
                framework: fw,
              })
            );
          }
        }}
        isGeneratingEmail={isGeneratingEmail}
        activeColdEmail={activeColdEmail}
      />
    </div>
  );
}
