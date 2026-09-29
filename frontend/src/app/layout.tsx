import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "../store/StoreProvider";
import { SmoothScrollProvider } from "../components/common/SmoothScrollProvider";

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
  title: "Postrichment — Autonomous GTM Intelligence & Lead Enrichment",
  description: "Discover verified B2B buyers with live signal evidence, vector grounding, and automated CRM enrichment.",
  keywords: ["AI sales research", "lead enrichment", "ICP generator", "B2B outbound", "cold email AI", "signal discovery"],
  openGraph: {
    title: "Postrichment — Autonomous GTM Intelligence",
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
    <html lang="en" data-theme="dark" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Young+Serif&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black`}
      >
        <StoreProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
