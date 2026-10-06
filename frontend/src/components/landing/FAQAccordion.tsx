"use client";

import * as React from "react";
import { CaretDown, Question } from "@phosphor-icons/react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "rag",
    question: "How does the RAG Research Agent prevent hallucinations?",
    answer:
      "Unlike generic LLM wrappers, Postrichment grounds every prospect research task against live web crawl sources and vector knowledge bases. If a signal cannot be substantiated with verifiable public source evidence, it is strictly omitted.",
  },
  {
    id: "scoring",
    question: "How does the Fit & Intent Score (0–100) work?",
    answer:
      "Our scoring engine computes multi-dimensional criteria based on your ICP rules, industry vertical, company size, and urgent buying triggers (e.g. recent funding, SDR hiring, tech stack transitions). Leads scoring 85+ have verified timing intent.",
  },
  {
    id: "copywriting",
    question: "What copywriting frameworks are used for cold outreach?",
    answer:
      "We strictly adhere to proven high-converting B2B frameworks like Problem-Agitate-Solve (PAS). Emails are kept under 85 words, opening directly with the prospect's real company trigger and ending with a low-friction call to conversation.",
  },
  {
    id: "human",
    question: "Is human approval required before sending outbound?",
    answer:
      "Yes. Postrichment is designed as a Human-in-the-Loop AI sales assistant. You can review all scored prospects, inspect the underlying evidence quotes, edit generated emails, and approve campaigns before any message is sent.",
  },
  {
    id: "crm",
    question: "Can I export discovered leads and evidence to CSV or CRM?",
    answer:
      "Yes. All enriched leads, verified corporate emails, LinkedIn URLs, scores, and evidence reasons can be exported to CSV or synced directly with your CRM pipeline.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full py-20 max-w-3xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="mb-3">
          <span className="bg-green-700/10 text-green-600 rounded-[2px] border-0 py-[2px] px-2 text-[11px] font-normal tracking-tight inline-flex items-center gap-1.5">
            <Question className="w-3.5 h-3.5" />
            Questions & Answers
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl text-zinc-950 font-normal tracking-tight leading-tight">
          Frequently asked inquiries.
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 mt-2 font-normal tracking-tight">
          Clear answers on our methodology, verification standards, and outbound safety.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-2.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={faq.id}
              className={`rounded-lg border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "bg-zinc-50/70 border-zinc-300 shadow-xs"
                  : "bg-white border-zinc-200/80 hover:border-zinc-300"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer select-none group"
              >
                <span className="text-xs sm:text-sm font-normal tracking-tight text-zinc-950 pr-4">
                  {faq.question}
                </span>

                <div
                  className={`w-6 h-6 rounded flex items-center justify-center text-zinc-500 transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180 text-zinc-950" : "group-hover:text-zinc-950"
                  }`}
                >
                  <CaretDown className="w-3.5 h-3.5" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-4 pt-1 text-xs text-zinc-600 leading-relaxed font-normal tracking-tight border-t border-zinc-100">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
