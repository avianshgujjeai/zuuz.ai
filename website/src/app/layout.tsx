import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/footer";
import { AmbientBg } from "@/components/marketing/AmbientBg";
import { RevealInit } from "@/components/ui/RevealInit";
import "./globals.css";

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
      </body>
    </html>
  );
}
