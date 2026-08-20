import * as React from "react";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import { IconStarFilled } from "@tabler/icons-react";

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
        <Badge variant="vintage" size="sm">
          Verified Reviews
        </Badge>
        <h2 className="text-title-1 text-[var(--text-primary)] mt-3">
          Loved by agency founders & sales leaders.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <GlassCard key={idx} elevated className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <IconStarFilled key={i} className="w-3.5 h-3.5" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed italic mb-6">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[var(--text-primary)]">{t.author}</p>
                <p className="text-[11px] text-[var(--text-muted)]">{t.role}</p>
              </div>
              <span className="text-[10px] font-mono font-medium px-2 py-1 rounded-lg bg-[var(--accent-vintage-light)] text-[var(--accent-vintage)]">
                {t.metric}
              </span>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
