"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";
import { HeroSection } from "../components/landing/HeroSection";
import { LogoMarquee } from "../components/landing/LogoMarquee";
import { SectionSkeleton } from "../components/ui/Skeleton";
import { useScrollReveal } from "../hooks/useScrollReveal";

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
    <div className="landing-page min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white flex flex-col items-center w-full overflow-x-clip">
      {/* Dynamic Nav */}
      <Navbar />

      {/* Main Container - Clean Editorial Framing without awkward side gutters */}
      <main className="w-full flex-grow flex flex-col items-center">
        {/* Hero Section */}
        <HeroSection />

        {/* Real Company Logos Marquee */}
        <LogoMarquee />

        {/* Interactive Engine Preview */}
        <LiveTeaserDemo />

        {/* Metrics & Social Proof */}
        <TrustProof />

        {/* Core Capabilities Bento */}
        <FeatureGrid />

        {/* Customer Proof */}
        <TestimonialWall />

        {/* Technical FAQ */}
        <FAQAccordion />

        {/* Final Conversion CTA */}
        <BottomCTA />
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}
