import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "../store/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Postrichment — AI GTM Research & Lead Enrichment SaaS",
  description: "Find high-value B2B buyers, extract verifiable growth signals, and generate converting cold emails with our RAG research agent.",
  keywords: ["AI sales research", "lead enrichment", "ICP generator", "B2B outbound", "cold email AI"],
  openGraph: {
    title: "Postrichment — AI GTM Research & Lead Enrichment",
    description: "Discover verified decision-makers backed by verifiable evidence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)]`}
      >
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
