import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/footer";
import { AmbientBg } from "@/components/marketing/AmbientBg";
import { RevealInit } from "@/components/ui/RevealInit";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { ChatBot } from "@/components/marketing/ChatBot";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zuuz.ai"),
  title: {
    default: "ZUUZ | Agentic AI Platform for Enterprise Workflow Automation",
    template: "%s | ZUUZ",
  },
  description:
    "ZUUZ is the enterprise agentic AI execution layer — connecting 200+ systems, routing decisions through policy, and automating workflows for Sales, HR, IT, Finance, Legal, and Ops teams. SOC 2 Type I certified.",
  keywords: [
    "agentic AI platform",
    "enterprise AI automation",
    "AI workflow automation",
    "enterprise copilot",
    "AI agents for business",
    "enterprise process automation",
    "agentic AI execution layer",
    "audit trail AI",
    "policy-aware AI",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "ZUUZ",
    title: "ZUUZ | Agentic AI Platform for Enterprise Workflow Automation",
    description:
      "Enterprise AI that gets work done — AI agents, execution flows, and evidence search for every operational team.",
    url: "https://www.zuuz.ai",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ZUUZ — Agentic AI Execution Layer for Enterprise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@zuuz_ai",
    title: "ZUUZ | Agentic AI for Enterprise",
    description:
      "Agentic AI execution layer — 200+ connectors, policy-enforced workflows, full audit trail.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "https://www.zuuz.ai",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ minHeight: "100vh", overflowX: "hidden" }}>
        <AmbientBg />
        <MotionProvider>
          <RevealInit />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
        <ChatBot />
        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
