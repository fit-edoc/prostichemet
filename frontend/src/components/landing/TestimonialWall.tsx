"use client";

import * as React from "react";
import { IconStarFilled, IconQuote } from "@tabler/icons-react";

export function TestimonialWall() {
  const testimonials = [
    {
      quote:
        "Postrichment cut our prospecting research time by 80%. The signal detection for Series A funding and SDR hiring is shockingly accurate.",
      author: "Priya Sharma",
      role: "Head of Growth, TechFlow Agency",
      metric: "3.4x more meetings booked",
    },
    {
      quote:
        "We went from 50 generic cold emails a week to 150 evidence-backed ones. Reply rates jumped from 1.8% to 6.2% within our first campaign.",
      author: "Alexandre Chen",
      role: "Founder, ScaleUp Dev",
      metric: "Tripled conversion rate",
    },
    {
      quote:
        "The verifiable evidence reasoning is the biggest differentiator. Our SDR team only focuses on leads that actually have a proven need.",
      author: "Sarah Kimball",
      role: "VP Revenue, DataPulse AI",
      metric: "Zero bounced emails",
    },
  ];

  return (
    <section id="testimonials" className="w-full py-24 max-w-7xl mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono uppercase tracking-wider text-zinc-700 mb-4 shadow-sm">
          <IconQuote className="w-3.5 h-3.5 text-zinc-900" />
          <span>Verified Field Proof</span>
        </div>
        <h2 className="font-inter font-bold text-3xl sm:text-5xl text-zinc-950 tracking-tight leading-tight">
          Loved by agency founders &{" "}
          <span className="italic font-normal text-zinc-500">enterprise revenue leaders.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="p-7 rounded-md bg-white border border-zinc-200 hover:border-zinc-300 transition-all flex flex-col justify-between shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] group"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-5">
                {[...Array(5)].map((_, i) => (
                  <IconStarFilled key={i} className="w-3.5 h-3.5" />
                ))}
              </div>
              <p className="font-inter text-xs sm:text-sm text-zinc-700 leading-relaxed italic mb-6">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-5 border-t border-zinc-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-inter font-bold text-zinc-950">{t.author}</p>
                <p className="text-[11px] font-mono text-zinc-500">{t.role}</p>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-zinc-950 text-white font-semibold shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]">
                {t.metric}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
