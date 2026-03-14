import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion/motion-provider";
import { BUILD_ID } from "@/config/build";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/footer";
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
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ minHeight: "100vh", overflowX: "hidden" }}>
        <MotionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <div
            style={{
              position: "fixed",
              right: 12,
              bottom: 12,
              zIndex: 999999,
              background: "#2563EB",
              color: "#fff",
              padding: "8px 12px",
              borderRadius: 12,
              fontSize: 12,
              fontWeight: 600,
              boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            BUILD: {BUILD_ID}
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
