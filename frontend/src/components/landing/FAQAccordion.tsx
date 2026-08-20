"use client";

import * as React from "react";
import { Badge } from "../ui/Badge";
import { IconChevronDown } from "@tabler/icons-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does the RAG Research Agent prevent hallucinations?",
    answer:
      "Unlike generic chatbots, Postrichment grounds every research task in our vector knowledge base and verified market data. If a signal cannot be substantiated with verifiable evidence or public source information, the system explicitly marks it as unverified or omits it.",
  },
  {
    question: "How does the Fit & Intent Score (0–100) work?",
    answer:
      "Our scoring engine computes multi-dimensional criteria based on company size match, budget tier, industry vertical, and urgent buying signals (e.g. recent funding, SDR hiring, tech stack transitions). Leads scoring 85+ have both high ICP alignment and strong timing triggers.",
  },
  {
    question: "What copywriting frameworks are used for cold emails?",
    answer:
      "We strictly adhere to proven high-converting B2B frameworks like Problem-Agitate-Solve (PAS) and Observation-Insight-Value. Emails are kept under 85 words, opening directly with the prospect's real signals and ending with a low-friction CTA.",
  },
  {
    question: "Is human approval required before sending outbound?",
    answer:
      "Yes. Postrichment is designed as a Human-in-the-Loop AI sales assistant. You can review all scored prospects, inspect the evidence quotes, edit generated cold emails, and approve campaigns before any messages are sent.",
  },
  {
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
    <section className="w-full py-24 max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <Badge variant="vintage" size="sm">
          Frequently Asked Questions
        </Badge>
        <h2 className="text-title-1 text-[var(--text-primary)] mt-3">
          Everything you need to know.
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2">
          Clear answers on our methodology, RAG research, and outbound safety.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl transition-all duration-300 border ${
                isOpen
                  ? "bg-[var(--bg-surface)] border-[var(--border-medium)] shadow-[var(--shadow-md)]"
                  : "bg-[var(--bg-canvas)] border-[var(--border-subtle)] hover:border-[var(--border-medium)]"
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <span className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                  {faq.question}
                </span>
                <span
                  className={`w-8 h-8 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-primary)] flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? "rotate-180 bg-[var(--accent-vintage-light)] text-[var(--accent-vintage)]" : ""
                  }`}
                >
                  <IconChevronDown className="w-4 h-4" />
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] mt-2 pt-4">
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
