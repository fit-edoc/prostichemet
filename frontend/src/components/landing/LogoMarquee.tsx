"use client";

import * as React from "react";
import { Sparkle } from "@phosphor-icons/react";

export function LogoMarquee() {
  const companies = [
    {
      name: "Stripe",
      svg: (
        <svg className="h-5 w-auto" viewBox="0 0 60 25" fill="currentColor">
          <path d="M59.64 14.28c0-4.47-2.18-8-6.3-8-4.14 0-6.66 3.53-6.66 8 0 5.29 2.97 7.94 7.21 7.94 2.07 0 3.63-.48 4.81-1.15v-3.32c-1.18.63-2.52.95-4.14.95-1.74 0-3.27-.67-3.48-2.67h8.51c0-.28.06-1.19.06-1.75zm-8.61-1.4c0-1.85.9-2.63 2.27-2.63 1.34 0 2.22.78 2.22 2.63h-4.49zm-10.4-6.6c-1.71 0-2.83.8-3.4 1.37l-.23-1.09h-3.83v21.37l4.31-.92.01-4.78c.57.51 1.58 1.25 3.16 1.25 3.32 0 6.09-2.6 6.09-7.61 0-4.83-2.73-7.59-6.11-7.59zm-1.04 11.58c-1.39 0-2.22-.51-2.77-1.1l-.03-5.74c.59-.62 1.45-1.13 2.8-1.13 2.11 0 3.38 1.81 3.38 3.99 0 2.23-1.28 3.98-3.38 3.98zm-11.45-6.34c0-.73-.6-1.03-1.57-1.03-1.4 0-3.18.57-4.57 1.37v-3.7c1.58-.69 3.23-.97 4.59-.97 3.38 0 5.56 1.7 5.56 4.67v10.98h-4.01v-1.14c-.79.79-1.92 1.42-3.48 1.42-2.7 0-4.48-1.87-4.48-4.32 0-3.07 2.45-4.37 6.46-4.37.52 0 1.05.04 1.5.11v-2.02zm-4.01 6.08c0 1.05.82 1.77 1.95 1.77.99 0 1.62-.48 2.06-.98v-2.31c-.34-.07-.79-.11-1.35-.11-1.63 0-2.66.52-2.66 1.63zm-9.01-13.43l-4.32.92v3.71h-2.12v3.47h2.12v7.7c0 3.3 1.61 4.7 4.64 4.7 1.15 0 2.1-.19 2.66-.45v-3.35c-.43.16-3.23.99-3.23-1.89v-6.71h3.23v-3.47h-3.23l.25-4.63zm-10.22 5.11h-4.32v15.75h4.32v-15.75zm-2.16-5.83c-1.47 0-2.52 1.02-2.52 2.37 0 1.34 1.05 2.36 2.52 2.36 1.46 0 2.52-1.02 2.52-2.36 0-1.35-1.06-2.37-2.52-2.37zm-6.27 10.37c-1.07-.46-2.58-.93-3.69-.93-1.43 0-2.16.48-2.16 1.25 0 .93 1.13 1.29 2.87 1.83 2.94.9 4.8 2.21 4.8 4.73 0 3.31-2.73 5.09-6.52 5.09-2.07 0-4.01-.6-5.18-1.28v-3.79c1.25.74 3.01 1.34 4.54 1.34 1.48 0 2.54-.53 2.54-1.47 0-.96-1.1-1.37-2.92-1.94-3.03-.96-4.73-2.19-4.73-4.64 0-3.15 2.62-4.96 6.07-4.96 1.89 0 3.63.45 4.76 1.05v3.76z" />
        </svg>
      ),
    },
    {
      name: "Linear",
      svg: (
        <svg className="h-5 w-auto" viewBox="0 0 100 24" fill="currentColor">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1.1 14.8-4.7-4.7a.8.8 0 0 1 0-1.1l1.1-1.1a.8.8 0 0 1 1.1 0l3 3 6.9-6.9a.8.8 0 0 1 1.1 0l1.1 1.1a.8.8 0 0 1 0 1.1l-8.5 8.6z" />
          <text x="28" y="17" fontSize="15" fontWeight="500" letterSpacing="-0.5px">Linear</text>
        </svg>
      ),
    },
    {
      name: "Notion",
      svg: (
        <svg className="h-5 w-auto" viewBox="0 0 90 24" fill="currentColor">
          <path d="M4.17 3.52 14.8 4.3c1.07.08 1.48.55 1.48 1.49v12.44c0 .85-.45 1.4-1.39 1.4l-10.72-.78c-.94-.07-1.34-.55-1.34-1.4V4.92c0-.86.41-1.4 1.34-1.4zm2.18 2.87v10.97l7.55.55V6.94l-7.55-.55zM8.3 8.35h2.18v6.71H8.3V8.35z" />
          <text x="24" y="17" fontSize="15" fontWeight="500" letterSpacing="-0.5px">Notion</text>
        </svg>
      ),
    },
    {
      name: "Retool",
      svg: (
        <svg className="h-5 w-auto" viewBox="0 0 90 24" fill="currentColor">
          <rect x="2" y="4" width="7" height="7" rx="1.5" />
          <rect x="11" y="4" width="7" height="7" rx="1.5" />
          <rect x="2" y="13" width="7" height="7" rx="1.5" />
          <text x="24" y="17" fontSize="15" fontWeight="500" letterSpacing="-0.5px">Retool</text>
        </svg>
      ),
    },
    {
      name: "Vercel",
      svg: (
        <svg className="h-5 w-auto" viewBox="0 0 90 24" fill="currentColor">
          <path d="M9.5 4.5 18 19.5H1L9.5 4.5Z" />
          <text x="24" y="17" fontSize="15" fontWeight="500" letterSpacing="-0.5px">Vercel</text>
        </svg>
      ),
    },
    {
      name: "Supabase",
      svg: (
        <svg className="h-5 w-auto" viewBox="0 0 110 24" fill="currentColor">
          <path d="M12.6 1.7C12.1.9 11 1.2 10.9 2.1l-1.3 9.4h7.5c.9 0 1.4 1.1.7 1.7l-9.1 8.9c-.8.8-2-.1-1.6-1.1l2.4-7.8H2.1c-.9 0-1.4-1.1-.7-1.7l9.6-9.8c.4-.4 1.1-.4 1.6.0z" />
          <text x="24" y="17" fontSize="15" fontWeight="500" letterSpacing="-0.5px">Supabase</text>
        </svg>
      ),
    },
    {
      name: "Figma",
      svg: (
        <svg className="h-5 w-auto" viewBox="0 0 85 24" fill="currentColor">
          <circle cx="12" cy="12" r="3.2" />
          <path d="M8.8 5.6h3.2v3.2H8.8zm0 6.4h3.2v3.2H8.8z" />
          <text x="22" y="17" fontSize="15" fontWeight="500" letterSpacing="-0.5px">Figma</text>
        </svg>
      ),
    },
    {
      name: "OpenAI",
      svg: (
        <svg className="h-5 w-auto" viewBox="0 0 95 24" fill="currentColor">
          <path d="M10.8 2.2a4.8 4.8 0 0 0-3.5 1.7 4.9 4.9 0 0 0-4.6 3.1 4.8 4.8 0 0 0 .9 5.5 4.9 4.9 0 0 0 1.2 5.4 4.8 4.8 0 0 0 5.4 1.2 4.9 4.9 0 0 0 5.1-1.9 4.8 4.8 0 0 0 1.6-5.4 4.9 4.9 0 0 0-1.2-5.4 4.8 4.8 0 0 0-4.9-4.2zm-.3 1.8c.8 0 1.6.4 2.1 1.1l-3.3 1.9a2.3 2.3 0 0 0-2.3 0V5.7a3 3 0 0 1 3.5-1.7z" />
          <text x="24" y="17" fontSize="15" fontWeight="500" letterSpacing="-0.5px">OpenAI</text>
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full py-8 border-y border-zinc-200/80 bg-zinc-50/50 relative overflow-hidden">
      {/* Edge gradient masks for seamless fade */}
      <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-zinc-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-zinc-50 to-transparent z-10 pointer-events-none" />

      {/* Header editorial note */}
      <div className="max-w-6xl mx-auto px-4 mb-4 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs text-zinc-500 font-normal tracking-tight">
          <Sparkle className="w-3.5 h-3.5 text-zinc-700" />
          <span>Trusted by modern revenue teams & outbound leaders</span>
        </div>
      </div>

      {/* Marquee Track with authentic company logos */}
      <div className="marquee-container relative z-10">
        <div className="marquee-content py-2">
          {companies.map((co, idx) => (
            <div
              key={`c1-${idx}`}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-950 transition-colors opacity-75 hover:opacity-100 cursor-default shrink-0 px-4"
              title={co.name}
            >
              {co.svg}
            </div>
          ))}
        </div>

        <div className="marquee-content py-2" aria-hidden="true">
          {companies.map((co, idx) => (
            <div
              key={`c2-${idx}`}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-950 transition-colors opacity-75 hover:opacity-100 cursor-default shrink-0 px-4"
              title={co.name}
            >
              {co.svg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
