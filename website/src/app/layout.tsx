import type { Metadata } from "next";
import { Montserrat, JetBrains_Mono } from "next/font/google";
import { MotionProvider } from "@/components/motion/motion-provider";
import { BUILD_ID } from "@/config/build";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const montserratDisplay = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ZUUZ — The Execution Layer for Enterprise Work",
    template: "%s | ZUUZ",
  },
  description:
    "ZUUZ connects email, documents, meetings, CRM, ERP, and ITSM. It assembles evidence, routes approvals through policy, and safely writes back to systems of record.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ZUUZ",
    title: "ZUUZ — The Execution Layer for Enterprise Work",
    description:
      "Persona Copilots, Execution Flows, and Evidence Search — one platform for enterprise operations.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${montserratDisplay.variable} ${mono.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <MotionProvider>
          <div
            style={{
              position: "fixed",
              right: 12,
              bottom: 12,
              zIndex: 999999,
              background: "#0018FF",
              color: "#fff",
              padding: "8px 12px",
              borderRadius: 12,
              fontSize: 12,
              fontWeight: 600,
              boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
            }}
          >
            BUILD: {BUILD_ID}
          </div>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
