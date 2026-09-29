"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";
import { HeroSection } from "../components/landing/HeroSection";
import { LogoMarquee } from "../components/landing/LogoMarquee";
import { InfrastructurePipeline } from "../components/landing/InfrastructurePipeline";
import { SectionSkeleton } from "../components/ui/Skeleton";
import { useScrollReveal } from "../hooks/useScrollReveal";

// Dynamic imports with lazy loading for below-the-fold components
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
    <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-white selection:text-black">
      {/* ========================================================================= */}
      {/* 5% Carbon Pattern Gutters with Vertical Architectural Lines               */}
      {/* ========================================================================= */}
      
      {/* Left 5% Gutter */}
      <aside 
        aria-hidden="true" 
        className="fixed top-0 bottom-0 left-0 w-[5%] carbon-gutter border-r border-[#262626] z-30 pointer-events-none hidden md:flex flex-col justify-between items-center py-6 opacity-90"
      >
        <div className="w-[1px] h-32 carbon-strip-line" />
        <div className="rotate-90 text-[9px] font-mono tracking-[0.3em] text-zinc-600 whitespace-nowrap select-none">
          SYS.L05 // ARCH_V3
        </div>
        <div className="w-[1px] h-32 carbon-strip-line" />
      </aside>

      {/* Right 5% Gutter */}
      <aside 
        aria-hidden="true" 
        className="fixed top-0 bottom-0 right-0 w-[5%] carbon-gutter border-l border-[#262626] z-30 pointer-events-none hidden md:flex flex-col justify-between items-center py-6 opacity-90"
      >
        <div className="w-[1px] h-32 carbon-strip-line" />
        <div className="-rotate-90 text-[9px] font-mono tracking-[0.3em] text-zinc-600 whitespace-nowrap select-none">
          PIPELINE // 99.98%
        </div>
        <div className="w-[1px] h-32 carbon-strip-line" />
      </aside>

      {/* ========================================================================= */}
      {/* Main 90% Content Container Framed by the 5% Gutters                       */}
      {/* ========================================================================= */}
      <div className="w-full md:w-[90%] md:mx-auto relative z-10 flex flex-col min-h-screen border-x border-[#1a1a1a]/70 bg-[#050505]">
        {/* Dynamic Nav that shifts and shrinks on scroll into floating pill dock */}
        <Navbar />

        {/* Content Modules */}
        <main className="flex-grow flex flex-col items-center w-full">
          {/* Hero Section with Young Serif, 2px shadow buttons, SVG fill animation */}
          <HeroSection />

          {/* Marquee with Monochrome Partner Badges */}
          <LogoMarquee />

          {/* Step-by-Step "Blur to No Blur" Infrastructure Preview */}
          <InfrastructurePipeline />

          {/* Interactive Live Teaser Demo */}
          <LiveTeaserDemo />

          {/* Social Proof & Animated Counter Statistics */}
          <TrustProof />

          {/* 3 Core Architecture Pillars & Asymmetric Bento Grid */}
          <FeatureGrid />

          {/* 4-Step Visual Workflow */}
          <WorkflowSection />

          {/* Verified User Testimonials */}
          <TestimonialWall />

          {/* Expandable Technical FAQ */}
          <FAQAccordion />

          {/* Final Conversion CTA */}
          <BottomCTA />
        </main>

        {/* Footer with Halftone Effect and Giant POSTRICHMENT Watermark */}
        <Footer />
      </div>
    </div>
  );
}
