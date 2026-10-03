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
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono uppercase tracking-wider text-zinc-700 mb-4 shadow-sm">
          <IconHelp className="w-3.5 h-3.5 text-zinc-900" />
          <span>Technical FAQ</span>
        </div>
        <h2 className="font-inter font-bold text-3xl sm:text-5xl text-zinc-950 tracking-tight leading-tight">
          Frequently Answered Inquiries.
        </h2>
        <p className="font-inter text-xs sm:text-sm text-zinc-600 mt-3">
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
              className={`rounded-2xl border transition-all duration-300 overflow-hidden relative ${
                isOpen
                  ? "bg-zinc-50/90 border-zinc-900 shadow-sm"
                  : "bg-white border-zinc-200 hover:border-zinc-300 shadow-sm"
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
                  <span className="text-sm sm:text-base font-inter font-semibold text-zinc-950 tracking-tight group-hover:text-black transition-colors">
                    {faq.question}
                  </span>
                </div>

                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0 ${
                    isOpen
                      ? "bg-zinc-950 text-white rotate-180 shadow-sm"
                      : "bg-zinc-100 text-zinc-600 group-hover:text-black group-hover:bg-zinc-200/70"
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
                    className={`px-6 pb-6 pt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans border-t border-zinc-200 transition-transform duration-300 ease-out ${
                      isOpen ? "translate-y-0" : "-translate-y-2"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <IconArrowRight className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" />
                      <p className="font-inter">{faq.answer}</p>
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
