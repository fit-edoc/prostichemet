"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GithubLogo,
  TwitterLogo,
  LinkedinLogo,
  ArrowUpRight,
} from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200/80 bg-zinc-50/60 text-zinc-700 pt-14 pb-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-zinc-200/60">
          {/* Brand Column (6 cols) */}
          <div className="md:col-span-6 space-y-3">
            {/* Brand Logo & Name */}
            <Link href="/" className="inline-flex items-center gap-2 group">
              <Image
                src="/logo.png"
                alt="Postrichly"
                width={24}
                height={24}
                className="w-6 h-6 rounded object-contain transition-transform group-hover:scale-105"
              />
              <span className="text-sm font-normal tracking-tight text-zinc-950">
                Postrichly
              </span>
            </Link>

            <p className="text-xs text-zinc-500 max-w-sm leading-relaxed font-normal tracking-tight">
              Autonomous outbound intelligence, vector-grounded account research, and real-time signal enrichment designed for modern revenue organizations.
            </p>

            {/* Raw Social Icons without black background */}
            <div className="flex items-center gap-3 pt-1 text-zinc-500">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="hover:text-zinc-950 transition-colors"
              >
                <GithubLogo className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="hover:text-zinc-950 transition-colors"
              >
                <TwitterLogo className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hover:text-zinc-950 transition-colors"
              >
                <LinkedinLogo className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Column 1: Platform */}
          <div className="md:col-span-3 space-y-2.5">
            <span className="text-xs font-normal tracking-tight text-zinc-950 block">
              Product
            </span>
            <ul className="space-y-1.5 text-xs text-zinc-500 font-normal tracking-tight">
              <li>
                <a href="#demo" className="hover:text-zinc-950 transition-colors flex items-center gap-1">
                  <span>Interactive Engine</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-zinc-950 transition-colors flex items-center gap-1">
                  <span>Capabilities</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-zinc-950 transition-colors">
                  Signal Research Console
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-zinc-950 transition-colors">
                  Sign In
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Architecture */}
          <div className="md:col-span-3 space-y-2.5">
            <span className="text-xs font-normal tracking-tight text-zinc-950 block">
              Standards
            </span>
            <ul className="space-y-1.5 text-xs text-zinc-500 font-normal tracking-tight">
              <li className="hover:text-zinc-950 transition-colors cursor-default">Vector Grounding RAG</li>
              <li className="hover:text-zinc-950 transition-colors cursor-default">Real-Time Signal Detection</li>
              <li className="hover:text-zinc-950 transition-colors cursor-default">Zero-Hallucination Threshold</li>
              <li className="hover:text-zinc-950 transition-colors cursor-default">CRM Continuous Sync</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Operational Status */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 font-normal tracking-tight">
          <p>© {new Date().getFullYear()} Postrichly Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-zinc-500">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
