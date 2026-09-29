"use client";

import * as React from "react";
import { IconChevronDown, IconHelp, IconArrowRight } from "@tabler/icons-react";

interface FAQItem {
  id: string;
  num: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "rag",
    num: "01",
    question: "How does the RAG Research Agent prevent hallucinations?",
    answer:
      "Unlike generic chatbots, Postrichment grounds every research task in our vector knowledge base and verified market data. If a signal cannot be substantiated with verifiable evidence or public source information, the system explicitly marks it as unverified or omits it.",
  },
  {
    id: "scoring",
    num: "02",
    question: "How does the Fit & Intent Score (0–100) work?",
    answer:
      "Our scoring engine computes multi-dimensional criteria based on company size match, budget tier, industry vertical, and urgent buying signals (e.g. recent funding, SDR hiring, tech stack transitions). Leads scoring 85+ have both high ICP alignment and strong timing triggers.",
  },
  {
    id: "copywriting",
    num: "03",
    question: "What copywriting frameworks are used for cold emails?",
    answer:
      "We strictly adhere to proven high-converting B2B frameworks like Problem-Agitate-Solve (PAS) and Observation-Insight-Value. Emails are kept under 85 words, opening directly with the prospect's real signals and ending with a low-friction CTA.",
  },
  {
    id: "human",
    num: "04",
    question: "Is human approval required before sending outbound?",
    answer:
      "Yes. Postrichment is designed as a Human-in-the-Loop AI sales assistant. You can review all scored prospects, inspect the evidence quotes, edit generated cold emails, and approve campaigns before any messages are sent.",
  },
  {
    id: "crm",
    num: "05",
    question: "Can I export discovered leads and evidence to CSV or CRM?",
    answer:
      "Yes. All enriched leads, contact titles, verified emails, LinkedIn links, scores, and evidence reasons can be exported to CSV or synced directly with your CRM pipeline.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full py-24 max-w-4xl mx-auto px-6">
      {/* Header in Young Serif */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-[#262626] text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4">
          <IconHelp className="w-3.5 h-3.5 text-white" />
          <span>Technical FAQ</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-tight leading-tight">
          Frequently Answered Inquiries.
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-3 font-mono">
          Deterministic answers on our methodology, RAG research, and outbound safety.
        </p>
      </div>

      {/* Accordion with Smooth CSS Grid Height Reveal & Rotation Transition */}
      <div className="space-y-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={faq.id}
              className={`rounded-xl border transition-all duration-300 overflow-hidden relative ${
                isOpen
                  ? "bg-[#111111] border-white shadow-[2px_2px_0px_rgba(255,255,255,0.25)]"
                  : "bg-[#0A0A0A] border-[#222222] hover:border-[#383838] shadow-[2px_2px_0px_rgba(0,0,0,0.6)]"
              }`}
            >
              {/* Accordion Trigger Button */}
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer select-none group"
              >
                <div className="flex items-center gap-3.5 pr-4">
                  <span className="text-xs font-mono text-zinc-500 font-semibold shrink-0">
                    {faq.num}
                  </span>
                  <span className="text-sm sm:text-base font-serif text-white tracking-tight group-hover:text-zinc-200 transition-colors">
                    {faq.question}
                  </span>
                </div>

                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0 ${
                    isOpen
                      ? "bg-white text-black rotate-180 shadow-[1px_1px_0px_rgba(255,255,255,0.3)]"
                      : "bg-[#141414] text-zinc-400 group-hover:text-white group-hover:bg-[#1A1A1A]"
                  }`}
                >
                  <IconChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Smooth Dynamic Reveal Container (CSS Grid Fr Expansion) */}
              <div
                className={`grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <div
                    className={`px-6 pb-6 pt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-mono border-t border-[#1C1C1C] transition-transform duration-300 ease-out ${
                      isOpen ? "translate-y-0" : "-translate-y-2"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <IconArrowRight className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
