import * as React from "react";
import Link from "next/link";
import { IconRadar2, IconBrandGithub, IconBrandTwitter, IconBrandLinkedin } from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 space-y-3.5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#20150F] text-[#FAF9F7] dark:bg-[#FAF9F7] dark:text-[#120D0A] flex items-center justify-center font-bold text-xs">
                <IconRadar2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-base tracking-tight text-[var(--text-primary)]">
                Postrichment
              </span>
            </Link>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-sm">
              The AI GTM Research and Outbound SaaS designed for modern software agencies, AI consultancies, and high-growth B2B startups.
            </p>
            <div className="flex items-center gap-3 pt-1 text-[var(--text-muted)]">
              <a href="#" className="hover:text-[var(--text-primary)] transition-colors">
                <IconBrandTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-[var(--text-primary)] transition-colors">
                <IconBrandLinkedin className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-[var(--text-primary)] transition-colors">
                <IconBrandGithub className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              <li><a href="#features" className="hover:text-[var(--text-primary)] transition-colors">ICP Generator</a></li>
              <li><a href="#evidence" className="hover:text-[var(--text-primary)] transition-colors">Signal Detector</a></li>
              <li><a href="#workflow" className="hover:text-[var(--text-primary)] transition-colors">Evidence Engine</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors">Cold Email Studio</a></li>
            </ul>
          </div>

          {/* Architecture & Guidelines */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              Methodology
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors">RAG Intelligence</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors">Zero-Hallucination Policy</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors">Evidence vs Spam</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors">Lead Scoring Formula</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors">Security Overview</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)] font-mono">
          <p>© 2026 Postrichment Inc. Built with RAG & Multi-Agent Intelligence.</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
