import { ShieldCheck, KeyRound, Users, Lock, FileCheck, Server } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";

const trustItems = [
  { icon: ShieldCheck, label: "Compliance badge" },
  { icon: Lock, label: "Encryption badge" },
  { icon: KeyRound, label: "SSO badge" },
  { icon: Users, label: "RBAC badge" },
  { icon: FileCheck, label: "Audit badge" },
  { icon: Server, label: "Deployment badge" },
];

export function TrustBar() {
  return (
    <section className="py-16 border-y border-border">
      <Container>
        <FadeIn>
          <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">
            Trust bar section title
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="h-4 w-4" />
                {label}
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
