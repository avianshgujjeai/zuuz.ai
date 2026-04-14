import type { Metadata } from "next";
import Script from "next/script";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/footer";
import { AmbientBg } from "@/components/marketing/AmbientBg";
import { RevealInit } from "@/components/ui/RevealInit";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { ChatBot } from "@/components/marketing/ChatBot";
import { TrialPopup } from "@/components/marketing/TrialPopup";
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
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.zuuz.ai/#organization",
                  "name": "ZUUZ",
                  "url": "https://www.zuuz.ai",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.zuuz.ai/logo.png",
                    "width": 200,
                    "height": 60
                  },
                  "description": "ZUUZ is the enterprise agentic AI execution layer — connecting to 200+ systems, assembling full context, routing decisions through policy, and executing every action with identity verification and immutable audit trails.",
                  "foundingDate": "2023",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "440 N Wolfe Rd",
                    "addressLocality": "Sunnyvale",
                    "addressRegion": "CA",
                    "postalCode": "94085",
                    "addressCountry": "US"
                  },
                  "sameAs": [
                    "https://linkedin.com/company/zuuz-ai",
                    "https://twitter.com/zuuz_ai"
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "sales",
                    "url": "https://www.zuuz.ai/about/contact"
                  }
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://www.zuuz.ai/#product",
                  "name": "ZUUZ",
                  "applicationCategory": "BusinessApplication",
                  "operatingSystem": "Web",
                  "url": "https://www.zuuz.ai",
                  "publisher": { "@id": "https://www.zuuz.ai/#organization" },
                  "description": "Agentic AI execution layer for enterprise workflow automation. ZUUZ connects to 200+ enterprise systems, assembles context packs, routes decisions through approval policy, and executes actions with full audit trail coverage. SOC 2 Type I certified.",
                  "featureList": [
                    "Persona Copilots for Sales, HR, IT, Finance, Legal, Procurement, Support, Analytics",
                    "Execution Flows — policy-enforced multi-step workflow automation",
                    "Evidence Search — permission-safe cross-system enterprise search",
                    "Context Pack assembly from 200+ connected systems",
                    "Intelligent approval routing with configurable policy gates",
                    "Immutable audit trail on every decision and action",
                    "SOC 2 Type I certified",
                    "SAML 2.0 / SSO enterprise identity federation",
                    "Safe Write Back with identity-verified execution"
                  ],
                  "offers": {
                    "@type": "Offer",
                    "url": "https://www.zuuz.ai/about/contact"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.zuuz.ai/#website",
                  "url": "https://www.zuuz.ai",
                  "name": "ZUUZ",
                  "description": "Agentic AI Platform for Enterprise Workflow Automation",
                  "publisher": { "@id": "https://www.zuuz.ai/#organization" },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://www.zuuz.ai/resources?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            })
          }}
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
        <TrialPopup />
        <GoogleAnalytics />
        <Analytics />
        {/* Microsoft Clarity */}
        <Script
          id="clarity-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","wbikcd8hx5");`,
          }}
        />
        {/* Contentsquare */}
        <Script
          id="contentsquare"
          src="https://t.contentsquare.net/uxa/c0b6676b98fe6.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
