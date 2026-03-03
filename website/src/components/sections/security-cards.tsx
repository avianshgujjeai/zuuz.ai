import { Fingerprint, ShieldCheck, ScrollText } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const cards = [
  {
    icon: Fingerprint,
    title: "Identity verification",
    description: "Every action requires verified identity. SSO, SAML 2.0, and MFA enforced before any write-back to connected systems.",
  },
  {
    icon: ShieldCheck,
    title: "Permission-safe & policy gating",
    description: "Results and actions respect source-system permissions. Approval routing enforces your policies — spend tiers, role limits, and compliance rules.",
  },
  {
    icon: ScrollText,
    title: "Complete audit trail",
    description: "Every decision, approval, and write-back is timestamped and immutable. Who requested, who approved, what evidence was used, what changed.",
  },
];

export function SecurityCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {cards.map((card, i) => (
        <FadeIn key={card.title} delay={i * 0.1}>
          <div className="rounded-xl border border-border bg-card p-6 h-full">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <card.icon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-foreground">{card.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{card.description}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
