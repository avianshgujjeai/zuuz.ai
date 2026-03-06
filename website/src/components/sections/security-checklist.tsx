import { Lock, KeyRound, Users, FileCheck, ShieldCheck, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";

const items = [
  { icon: Lock, label: "Permission-aware by design" },
  { icon: KeyRound, label: "SSO & SAML 2.0" },
  { icon: Users, label: "Role-based access control" },
  { icon: FileCheck, label: "Audit trail for every action" },
  { icon: ShieldCheck, label: "SOC 2 Type I" },
  { icon: Clock, label: "Evidence links on all outputs" },
];

export function SecurityChecklist() {
  return (
    <section className="py-10">
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <Icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
              <span className="text-[13px] font-medium text-foreground leading-snug">{label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
