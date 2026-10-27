"use client";

import * as React from "react";
import { Star, Quotes } from "@phosphor-icons/react";

export function TestimonialWall() {
  const testimonials = [
    {
      quote:
        "Prospail cut our prospecting research time by 80%. The signal detection for Series A funding and SDR hiring is shockingly accurate.",
      author: "Priya Sharma",
      role: "Head of Growth, TechFlow Agency",
      metric: "3.4x more meetings",
      metricColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&auto=format&fit=crop&q=80",
    },
    {
      quote:
        "We went from 50 generic cold emails a week to 150 evidence-backed ones. Reply rates jumped from 1.8% to 6.2% within our first campaign.",
      author: "Alexandre Chen",
      role: "Founder, ScaleUp Dev",
      metric: "Tripled conversion rate",
      metricColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    },
    {
      quote:
        "The verifiable evidence reasoning is the biggest differentiator. Our SDR team only focuses on leads that actually have a proven need.",
      author: "Sarah Kimball",
      role: "VP Revenue, DataPulse AI",
      metric: "Zero bounced emails",
      metricColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section id="testimonials" className="w-full py-20 max-w-6xl mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-14">
        {/* Multi-color Badge: Rose Proof */}
        <div className="mb-3">
          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full py-[3px] px-3 text-[11px] font-normal tracking-tight inline-flex items-center gap-1.5 backdrop-blur-sm">
            <Quotes className="w-3.5 h-3.5" />
            Verified Field Proof
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl text-white font-normal tracking-tight leading-tight">
          Trusted by high-conviction revenue teams.
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-normal tracking-tight">
          Hear how outbound leaders scale sales pipelines with evidence-grounded research.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-7 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 hover:border-neutral-700/80 transition-all flex flex-col justify-between shadow-[inset_0px_1px_1px_rgba(255,255,255,0.08),0_8px_30px_-6px_rgba(0,0,0,0.6)] backdrop-blur-md"
          >
            <div>
              <div className="flex items-center gap-0.5 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} weight="fill" className="w-3.5 h-3.5" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal tracking-tight mb-6">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                {/* Real Avatar Photo */}
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-9 h-9 rounded-full object-cover border border-neutral-700 shadow-xs"
                />
                <div>
                  <p className="text-white font-medium tracking-tight">{t.author}</p>
                  <p className="text-[11px] text-neutral-400 font-normal tracking-tight">{t.role}</p>
                </div>
              </div>

              {/* Multi-color Metric Badge */}
              <span className={`${t.metricColor} border rounded-md py-[2px] px-2 text-[10px] font-normal tracking-tight`}>
                {t.metric}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
