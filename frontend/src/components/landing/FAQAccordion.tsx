"use client";

import * as React from "react";
import { Plus, Minus, Question, ArrowRight } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

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
      "Unlike generic LLM wrappers, Prospail grounds every prospect research task against live web crawl sources and vector knowledge bases. If a signal cannot be substantiated with verifiable public source evidence, it is strictly omitted from the briefing.",
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
      "Yes. Prospail is designed as a Human-in-the-Loop AI sales assistant. You can review all scored prospects, inspect the underlying evidence quotes, edit generated emails, and approve campaigns before any message is dispatched.",
  },
  {
    id: "deliverability",
    question: "How do you protect sender reputation and deliverability?",
    answer:
      "Every generated email avoids spam-trigger phrases, respects sender ramp limits, and validates MX and SMTP deliverability before queuing. Messages read as authentic 1-to-1 human research rather than mass automated blasts.",
  },
  {
    id: "crm",
    question: "Can I export discovered leads and evidence to CSV or CRM?",
    answer:
      "Yes. All enriched leads, verified corporate emails, LinkedIn URLs, scores, and evidence reasons can be exported to CSV or synced directly with HubSpot, Salesforce, and Webhook endpoints.",
  },
  {
    id: "keys",
    question: "Can I connect my own custom AI models or API keys?",
    answer:
      "Yes. Prospail comes with managed enterprise LLMs out of the box, but you can also configure your own OpenAI, Anthropic, or custom endpoint keys in workspace settings.",
  },
];

export function FAQAccordion() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Context, Headline & Action */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="mb-4">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full py-1 px-3 text-[11px] font-normal tracking-tight inline-flex items-center gap-1.5 backdrop-blur-sm">
              <Question className="w-3.5 h-3.5" />
              Questions & Answers
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl text-white font-normal tracking-tight leading-tight">
            Frequently asked inquiries.
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 mt-3 font-normal tracking-tight leading-relaxed max-w-md">
            Everything you need to know about our autonomous research agents, verification pipeline, and outbound safety.
          </p>

          {/* Support / Contact Card */}
          <div className="mt-8 p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 shadow-[inset_0px_1px_1px_rgba(255,255,255,0.05),0_8px_24px_-4px_rgba(0,0,0,0.5)]">
            <h3 className="text-xs sm:text-sm font-medium text-white tracking-tight">
              Have a custom workflow?
            </h3>
            <p className="text-xs text-neutral-400 mt-1 font-normal tracking-tight leading-relaxed">
              Our engineering team can configure dedicated vector store integrations and custom scoring criteria.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="mt-4 btn-bevel bg-gradient-to-b from-neutral-800 to-neutral-900 hover:from-neutral-700 hover:to-neutral-800 text-white border border-neutral-600/80 font-medium px-3.5 py-1.5 flex items-center gap-1.5 text-xs tracking-tight cursor-pointer shadow-[inset_0px_1px_1px_rgba(255,255,255,0.25),0_4px_16px_-2px_rgba(0,0,0,0.5)]"
            >
              <span className="text-white font-medium">Contact Team</span>
              <ArrowRight className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>

        {/* Right Column: Borderless Accordion with Plus/Minus Toggle */}
        <div className="lg:col-span-7 divide-y divide-neutral-800/80 border-y border-neutral-800/80">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={faq.id} className="py-2 transition-colors">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full py-4 flex items-center justify-between text-left cursor-pointer select-none group"
                >
                  <span
                    className={`text-xs sm:text-sm tracking-tight pr-6 transition-colors ${
                      isOpen
                        ? "text-white font-medium"
                        : "text-neutral-300 font-normal group-hover:text-white"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-neutral-400 group-hover:text-white transition-colors">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Plus className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="pb-5 pr-8 text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal tracking-tight animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
