"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";
import { HeroSection } from "../components/landing/HeroSection";
import { LogoMarquee } from "../components/landing/LogoMarquee";
import { SectionSkeleton } from "../components/ui/Skeleton";
import { useScrollReveal } from "../hooks/useScrollReveal";

// Dynamic imports with lazy loading for below-the-fold components (LCP & Core Web Vitals optimization)
const LiveTeaserDemo = dynamic(
  () => import("../components/landing/LiveTeaserDemo").then((mod) => mod.LiveTeaserDemo),
  { loading: () => <SectionSkeleton />, ssr: true }
);

const TrustProof = dynamic(
  () => import("../components/landing/TrustProof").then((mod) => mod.TrustProof),
  { loading: () => <SectionSkeleton />, ssr: true }
);

const FeatureGrid = dynamic(
  () => import("../components/landing/FeatureGrid").then((mod) => mod.FeatureGrid),
  { loading: () => <SectionSkeleton />, ssr: true }
);

const WorkflowSection = dynamic(
  () => import("../components/landing/WorkflowSection").then((mod) => mod.WorkflowSection),
  { loading: () => <SectionSkeleton />, ssr: true }
);

const TestimonialWall = dynamic(
  () => import("../components/landing/TestimonialWall").then((mod) => mod.TestimonialWall),
  { loading: () => <SectionSkeleton />, ssr: true }
);

const FAQAccordion = dynamic(
  () => import("../components/landing/FAQAccordion").then((mod) => mod.FAQAccordion),
  { loading: () => <SectionSkeleton />, ssr: true }
);

const BottomCTA = dynamic(
  () => import("../components/landing/BottomCTA").then((mod) => mod.BottomCTA),
  { loading: () => <SectionSkeleton />, ssr: true }
);

export default function LandingPage() {
  useScrollReveal();

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] relative">
      {/* Frosted Navigation Bar with Scroll Blur */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center w-full">
        {/* Above-the-fold Hero rendered immediately for optimal LCP */}
        <HeroSection />

        {/* 10. Infinite Logo & Agency Marquee */}
        <LogoMarquee />

        {/* Interactive Demo Teaser with Cursor Spotlight */}
        <LiveTeaserDemo />

        {/* Social Proof & Animated Counter Statistics */}
        <TrustProof />

        {/* 3 Core Architecture Pillars & Evidence Deep Dive */}
        <FeatureGrid />

        {/* 4-Step Visual Workflow */}
        <WorkflowSection />

        {/* Verified User Testimonials */}
        <TestimonialWall />

        {/* 12. Expandable FAQ Accordion */}
        <FAQAccordion />

        {/* Final Conversion CTA with Magnetic Button */}
        <BottomCTA />
      </main>

      {/* Global Minimalist Vintage Footer */}
      <Footer />
    </div>
  );
}
