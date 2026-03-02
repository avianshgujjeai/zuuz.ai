import { ShieldCheck, KeyRound, Users, Lock, FileCheck, Server } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";

const trustItems = [
  { icon: ShieldCheck, label: "SOC 2 Type II" },
  { icon: Lock, label: "End-to-end encryption" },
  { icon: KeyRound, label: "SSO / SAML" },
  { icon: Users, label: "RBAC" },
  { icon: FileCheck, label: "HIPAA ready" },
  { icon: Server, label: "On-prem available" },
];

export function TrustBar() {
  return (
    <section className="py-16 border-y border-border">
      <Container>
        <FadeIn>
          <p className="text-center text-sm font-medium text-slate-400 uppercase tracking-wider mb-8">
            Enterprise-grade security & compliance
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-slate-500">
                <Icon className="h-4 w-4 text-slate-400" />
                {label}
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
