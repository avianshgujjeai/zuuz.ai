import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CommandPalette } from "@/components/command-palette";
import { NoiseOverlay } from "@/components/visual/noise-overlay";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NoiseOverlay />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CommandPalette />
    </>
  );
}
