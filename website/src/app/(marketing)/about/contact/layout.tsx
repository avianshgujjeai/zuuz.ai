import type { Metadata } from "next";
import { contact } from "@/content/about";

export const metadata: Metadata = contact.meta;

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
