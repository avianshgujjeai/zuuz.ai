import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ZUUZ — The Intelligent Enterprise Platform",
    template: "%s | ZUUZ",
  },
  description:
    "Deploy AI agents, orchestrate workflows, and search across every tool — all from one unified platform built for the enterprise.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ZUUZ",
    title: "ZUUZ — The Intelligent Enterprise Platform",
    description:
      "Deploy AI agents, orchestrate workflows, and search across every tool — all from one unified platform.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
