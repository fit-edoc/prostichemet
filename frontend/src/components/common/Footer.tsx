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
    <footer className="w-full border-t border-neutral-800/80 bg-zinc-950 text-neutral-400 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-neutral-800/80">
          {/* Brand Column (6 cols) */}
          <div className="md:col-span-6 space-y-3">
            {/* Brand Logo & Name */}
            <Link href="/" className="inline-flex items-center gap-2 group">
              <Image
                src="/logo.png"
                alt="Prospail"
                width={24}
                height={24}
                className="w-6 h-6 rounded object-contain transition-transform group-hover:scale-105"
              />
              <span className="text-sm font-medium tracking-tight text-white">
                Prospail
              </span>
            </Link>

            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed font-normal tracking-tight">
              Autonomous outbound intelligence, vector-grounded account research, and real-time signal enrichment designed for modern revenue organizations.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2 text-neutral-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="hover:text-white transition-colors"
              >
                <GithubLogo className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="hover:text-white transition-colors"
              >
                <TwitterLogo className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hover:text-white transition-colors"
              >
                <LinkedinLogo className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Column 1: Platform */}
          <div className="md:col-span-3 space-y-2.5">
            <span className="text-xs font-medium tracking-tight text-white block">
              Product
            </span>
            <ul className="space-y-2 text-xs text-neutral-400 font-normal tracking-tight">
              <li>
                <a href="#demo" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Interactive Engine</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Capabilities</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-white transition-colors">
                  Signal Research Console
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-white transition-colors">
                  Sign In
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Architecture */}
          <div className="md:col-span-3 space-y-2.5">
            <span className="text-xs font-medium tracking-tight text-white block">
              Standards
            </span>
            <ul className="space-y-2 text-xs text-neutral-400 font-normal tracking-tight">
              <li className="hover:text-white transition-colors cursor-default">Vector Grounding RAG</li>
              <li className="hover:text-white transition-colors cursor-default">Real-Time Signal Detection</li>
              <li className="hover:text-white transition-colors cursor-default">Zero-Hallucination Threshold</li>
              <li className="hover:text-white transition-colors cursor-default">CRM Continuous Sync</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Operational Status */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 font-normal tracking-tight">
          <p>© {new Date().getFullYear()} Prospail Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-neutral-400">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
