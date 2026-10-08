"use client";

import * as React from "react";
import { Star, Quotes } from "@phosphor-icons/react";

export function TestimonialWall() {
  const testimonials = [
    {
      quote:
        "Postrichly cut our prospecting research time by 80%. The signal detection for Series A funding and SDR hiring is shockingly accurate.",
      author: "Priya Sharma",
      role: "Head of Growth, TechFlow Agency",
      metric: "3.4x more meetings",
      metricColor: "bg-green-700/10 text-green-600",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&auto=format&fit=crop&q=80",
    },
    {
      quote:
        "We went from 50 generic cold emails a week to 150 evidence-backed ones. Reply rates jumped from 1.8% to 6.2% within our first campaign.",
      author: "Alexandre Chen",
      role: "Founder, ScaleUp Dev",
      metric: "Tripled conversion rate",
      metricColor: "bg-blue-700/10 text-blue-600",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    },
    {
      quote:
        "The verifiable evidence reasoning is the biggest differentiator. Our SDR team only focuses on leads that actually have a proven need.",
      author: "Sarah Kimball",
      role: "VP Revenue, DataPulse AI",
      metric: "Zero bounced emails",
      metricColor: "bg-purple-700/10 text-purple-600",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section id="testimonials" className="w-full py-16 max-w-6xl mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-12">
        {/* Multi-color Badge: Rose Proof */}
        <div className="mb-3">
          <span className="bg-rose-700/10 text-rose-600 rounded-[2px] border-0 py-[2px] px-2 text-[11px] font-normal tracking-tight inline-flex items-center gap-1.5">
            <Quotes className="w-3.5 h-3.5" />
            Verified Field Proof
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl text-zinc-950 font-normal tracking-tight leading-tight">
          Trusted by high-conviction revenue teams.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="p-6 rounded-lg bg-white border border-zinc-200/80 hover:border-zinc-300 transition-all flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-center gap-0.5 text-amber-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} weight="fill" className="w-3.5 h-3.5" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal tracking-tight mb-6">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                {/* Real Avatar Photo */}
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-8 h-8 rounded-full object-cover border border-zinc-200/80 shadow-xs"
                />
                <div>
                  <p className="text-zinc-950 font-normal tracking-tight">{t.author}</p>
                  <p className="text-[11px] text-zinc-500 font-normal tracking-tight">{t.role}</p>
                </div>
              </div>

              {/* Multi-color Metric Badge */}
              <span className={`${t.metricColor} rounded-[2px] border-0 py-[2px] px-2 text-[10px] font-normal tracking-tight`}>
                {t.metric}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
