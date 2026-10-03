"use client";

import * as React from "react";
import Link from "next/link";
import {
  IconRadar2,
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconCpu,
  IconArrowUpRight,
} from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="w-full relative border-t border-zinc-200 bg-zinc-50 text-zinc-800 pt-20 pb-12 overflow-hidden">
      {/* Halftone Dot Matrix Background Effect */}
      <div className="absolute inset-0 halftone-footer pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Footer Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-zinc-200">
          {/* Brand & Manifesto Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold text-sm shadow-[1px_1px_0px_rgba(0,0,0,0.2)]">
                <IconRadar2 className="w-4 h-4" />
              </div>
              <span className="font-inter font-bold text-xl tracking-tight text-zinc-950">
                Postrichment
              </span>
            </Link>

            <p className="font-inter text-xs text-zinc-600 max-w-sm leading-relaxed">
              Autonomous outbound intelligence, vector-grounded account research, and real-time signal enrichment designed for high-conviction revenue teams.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:text-black hover:border-zinc-400 shadow-sm transition-colors"
              >
                <IconBrandGithub className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:text-black hover:border-zinc-400 shadow-sm transition-colors"
              >
                <IconBrandTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:text-black hover:border-zinc-400 shadow-sm transition-colors"
              >
                <IconBrandLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Column 1: Engine */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              Platform
            </span>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li>
                <a href="#pipeline-preview" className="hover:text-zinc-950 transition-colors flex items-center gap-1">
                  <span>Infrastructure</span>
                  <IconArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-zinc-950 transition-colors flex items-center gap-1">
                  <span>Bento Grid</span>
                  <IconArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-zinc-950 transition-colors">
                  Signal Research Agent
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-zinc-950 transition-colors">
                  Telemetry Console
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Architecture */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              Architecture
            </span>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li className="hover:text-zinc-950 transition-colors cursor-default">RAG Vector Grounding</li>
              <li className="hover:text-zinc-950 transition-colors cursor-default">Autonomous Web Crawler</li>
              <li className="hover:text-zinc-950 transition-colors cursor-default">Zero-Hallucination Gate</li>
              <li className="hover:text-zinc-950 transition-colors cursor-default">CRM Two-Way Sync</li>
            </ul>
          </div>

          {/* System Telemetry Module (3 cols) */}
          <div className="md:col-span-3 space-y-3 p-4 rounded-xl bg-white border border-zinc-200 shadow-sm">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-600">
              <span className="flex items-center gap-1.5">
                <IconCpu className="w-3.5 h-3.5 text-zinc-900" />
                <span>CLUSTER STATUS</span>
              </span>
              <span className="text-zinc-950 font-bold">ONLINE</span>
            </div>
            <div className="text-xs text-zinc-600 space-y-1 font-mono">
              <div className="flex justify-between">
                <span className="text-zinc-500">Latency:</span>
                <span className="text-zinc-900 font-medium">24ms avg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Active Nodes:</span>
                <span className="text-zinc-900 font-medium">12 Agents</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Verification Rate:</span>
                <span className="text-zinc-900 font-medium">99.98%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Large Name of Product Watermark with Halftone Blend */}
        <div className="w-full text-center py-8 select-none overflow-hidden">
          <div className="text-[52px]  opacity-20  bg-clip-text text-transparent bg-linear-to-t from-white to-black sm:text-[90px] md:text-[140px] lg:text-[150px]">
            POSTRICHMENT
          </div>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>© 2026 Postrichment. Pure System Architecture.</p>
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-zinc-950 animate-pulse" />
            <span className="text-zinc-600">Telemetry Feed Synchronized</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
