"use client";

import * as React from "react";
import { Button } from "../ui/Button";
import {
  Globe,
  Sparkle,
  Check,
  MagnifyingGlass,
  ArrowCounterClockwise,
  Trash,
} from "@phosphor-icons/react";
import { KnowledgeDocument, BusinessProfile } from "../../types";

interface RagKnowledgeTabProps {
  knowledgeDocs: KnowledgeDocument[];
  isLoadingKnowledge: boolean;
  isRagIngesting: boolean;
  ragSuccessMessage: string | null;
  scrapeUrlInput: string;
  setScrapeUrlInput: (val: string) => void;
  ragSearchQuery: string;
  setRagSearchQuery: (val: string) => void;
  ragSearchResults: any[] | null;
  isTestingQuery: boolean;
  activeProfile: BusinessProfile | null;
  profiles: BusinessProfile[];
  region: string;
  onScrapeAndIngestUrl: (e: React.FormEvent) => void;
  onTestRagSearch: (e: React.FormEvent) => void;
  onDeleteKnowledgeDoc: (id: number) => void;
  onRefreshKnowledge: () => void;
}

export function RagKnowledgeTab({
  knowledgeDocs,
  isLoadingKnowledge,
  isRagIngesting,
  ragSuccessMessage,
  scrapeUrlInput,
  setScrapeUrlInput,
  ragSearchQuery,
  setRagSearchQuery,
  ragSearchResults,
  isTestingQuery,
  activeProfile,
  profiles,
  region,
  onScrapeAndIngestUrl,
  onTestRagSearch,
  onDeleteKnowledgeDoc,
  onRefreshKnowledge,
}: RagKnowledgeTabProps) {
  const currentTerritory =
    activeProfile?.region || (profiles.length > 0 ? profiles[0].region : region || "Global");

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-blue-700/10 text-blue-600 rounded-[2px] py-[2px] px-2 text-[10px] font-normal tracking-tight">
            Vector Intelligence Hub
          </span>
          <span className="text-xs text-zinc-400">Grounding Engine</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-zinc-950">
          Web Scraping & RAG Knowledge Engine
        </h2>
        <p className="text-xs text-zinc-500 mt-1 font-normal tracking-tight max-w-2xl leading-relaxed">
          Crawl company landing pages, competitor intelligence, and market directories. Web pages are automatically cleaned, chunked, and embedded into semantic vectors to ground autonomous prospect discovery and hyper-personalized emails.
        </p>
      </div>

      {/* 1. Live Scraping Tool Card */}
      <div className="p-5 rounded-md bg-white border border-zinc-200/80 shadow-xs space-y-4">
        <div>
          <h3 className="text-xs font-medium text-zinc-950 uppercase tracking-tight flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Scrape & Vector-Index Any Website</span>
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Enter any company, competitor, or customer website to extract core value props, location clues, offerings, and buying triggers.
          </p>
        </div>

        <form onSubmit={onScrapeAndIngestUrl} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Globe className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              required
              placeholder="https://acme-systems.io or competitor domain"
              value={scrapeUrlInput}
              onChange={(e) => setScrapeUrlInput(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-[3px] py-2 pl-8 pr-3 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 font-normal"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={isRagIngesting}
            leftIcon={<Sparkle className="w-3.5 h-3.5" />}
          >
            Scrape & Ingest to RAG
          </Button>
        </form>

        {ragSuccessMessage && (
          <div className="p-2.5 rounded bg-blue-50/70 border border-blue-100 text-xs text-blue-800 flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>{ragSuccessMessage}</span>
          </div>
        )}
      </div>

      {/* 2. RAG Metrics & Semantic Vector Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded bg-white border border-zinc-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-zinc-400 uppercase tracking-tight block">Total RAG Vectors</span>
          <p className="text-lg font-medium text-zinc-950 tracking-tight">{knowledgeDocs.length}</p>
          <span className="text-[10px] text-zinc-500">Indexed Knowledge Nodes</span>
        </div>

        <div className="p-3.5 rounded bg-white border border-zinc-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-zinc-400 uppercase tracking-tight block">Scraped Web Docs</span>
          <p className="text-lg font-medium text-blue-600 tracking-tight">
            {knowledgeDocs.filter((d) => d.category === "scraped_web").length}
          </p>
          <span className="text-[10px] text-zinc-500">Live Crawled Domains</span>
        </div>

        <div className="p-3.5 rounded bg-white border border-zinc-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-zinc-400 uppercase tracking-tight block">Sales Frameworks</span>
          <p className="text-lg font-medium text-purple-600 tracking-tight">
            {knowledgeDocs.filter((d) => d.category === "framework").length}
          </p>
          <span className="text-[10px] text-zinc-500">PAS & Observation Nodes</span>
        </div>

        <div className="p-3.5 rounded bg-white border border-zinc-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] text-zinc-400 uppercase tracking-tight block">Territory Grounding</span>
          <p className="text-xs font-medium text-green-700 tracking-tight truncate mt-1">
            {currentTerritory}
          </p>
          <span className="text-[10px] text-zinc-500">Active Territory Filter</span>
        </div>
      </div>

      {/* 3. Live RAG Semantic Search Tester */}
      <div className="p-4 rounded-md bg-white border border-zinc-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-900 tracking-tight">
            Test RAG Semantic Retrieval (Cosine Similarity)
          </span>
          <span className="text-[10px] text-zinc-400">128-dim Vector Matcher</span>
        </div>

        <form onSubmit={onTestRagSearch} className="flex gap-2">
          <div className="relative flex-1">
            <MagnifyingGlass className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. Series A hiring London or PAS framework or SaaS objections..."
              value={ragSearchQuery}
              onChange={(e) => setRagSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-[3px] py-1.5 pl-8 pr-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 font-normal"
            />
          </div>
          <Button
            type="submit"
            variant="secondary"
            size="sm"
            isLoading={isTestingQuery}
          >
            Query Vectors
          </Button>
        </form>

        {ragSearchResults && (
          <div className="p-3 rounded bg-zinc-50 border border-zinc-200/80 space-y-2 mt-2">
            <span className="text-[10px] text-zinc-400 uppercase tracking-tight block">
              Top Retrieved Context Passages ({ragSearchResults.length} matches):
            </span>
            <div className="space-y-2">
              {ragSearchResults.map((doc: any, i: number) => (
                <div key={i} className="p-2.5 rounded bg-white border border-zinc-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-zinc-900">{doc.title}</span>
                    <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-mono">
                      Similarity: {(Number(doc.similarity || 0.85) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-zinc-600 text-[11px] line-clamp-3 leading-relaxed">
                    {doc.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Active Ingested Knowledge Base Table */}
      <div className="bg-white border border-zinc-200/80 rounded-md overflow-hidden shadow-xs space-y-0">
        <div className="p-4 border-b border-zinc-200/80 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-medium text-zinc-950 tracking-tight">
              Ingested RAG Knowledge Documents ({knowledgeDocs.length})
            </h3>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Grounding corpus utilized by Research Agent and Email Copywriter
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={onRefreshKnowledge}
            isLoading={isLoadingKnowledge}
            leftIcon={<ArrowCounterClockwise className="w-3 h-3" />}
          >
            Refresh Corpus
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-normal tracking-tight border-collapse">
            <thead className="bg-zinc-50/70 border-b border-zinc-200/80 text-zinc-500 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4 font-normal">Source Document / Title</th>
                <th className="py-3 px-4 font-normal">Category</th>
                <th className="py-3 px-4 font-normal">Content Excerpt</th>
                <th className="py-3 px-4 font-normal">Ingested Date</th>
                <th className="py-3 px-4 font-normal text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {knowledgeDocs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-xs text-zinc-400">
                    No knowledge documents loaded yet. Click &quot;Refresh Corpus&quot; or scrape a website above.
                  </td>
                </tr>
              ) : (
                knowledgeDocs.map((doc) => {
                  const isScraped = doc.category === "scraped_web";
                  const isFramework = doc.category === "framework";

                  return (
                    <tr key={doc.id} className="hover:bg-zinc-50/60 transition-colors">
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-medium text-zinc-950">{doc.title}</div>
                        {doc.metadata?.url && (
                          <a
                            href={doc.metadata.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] text-blue-600 hover:underline flex items-center gap-1 mt-0.5"
                          >
                            <Globe className="w-2.5 h-2.5" />
                            <span>{doc.metadata.url.replace(/^https?:\/\//, "").split("/")[0]}</span>
                          </a>
                        )}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`rounded-[2px] border-0 py-[2px] px-2 text-[10px] font-normal tracking-tight inline-block ${
                            isScraped
                              ? "bg-blue-700/10 text-blue-600"
                              : isFramework
                              ? "bg-purple-700/10 text-purple-600"
                              : "bg-zinc-700/10 text-zinc-700"
                          }`}
                        >
                          {isScraped ? "Scraped Web" : isFramework ? "Copywriting Framework" : "Market Intelligence"}
                        </span>
                      </td>

                      <td className="py-3 px-4 max-w-sm">
                        <p className="text-zinc-600 text-[11px] line-clamp-2 leading-relaxed">
                          {doc.content}
                        </p>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap text-[11px] text-zinc-400">
                        {doc.createdAt ? new Date(doc.createdAt).toLocaleDateString() : "Built-in Core"}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap text-right">
                        {doc.workspaceId ? (
                          <button
                            type="button"
                            onClick={() => onDeleteKnowledgeDoc(doc.id)}
                            className="p-1 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Delete Document"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <span className="text-[10px] text-zinc-300">Protected</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
