import type { Metadata } from "next";
import "@fontsource/instrument-sans/400.css";
import "@fontsource/instrument-sans/500.css";
import "@fontsource/instrument-sans/600.css";
import "@fontsource/instrument-sans/700.css";
import "./globals.css";
import { StoreProvider } from "../store/StoreProvider";
import { SmoothScrollProvider } from "../components/common/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Postrichly — Autonomous GTM Intelligence & Lead Enrichment",
  description: "Discover verified B2B buyers with live signal evidence, vector grounding, and automated CRM enrichment.",
  keywords: ["AI sales research", "lead enrichment", "ICP generator", "B2B outbound", "cold email AI", "signal discovery"],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Postrichly — Autonomous GTM Intelligence",
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
    <html lang="en" data-theme="light" className="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white"
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
