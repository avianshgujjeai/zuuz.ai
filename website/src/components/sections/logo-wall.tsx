import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { customers } from "@/content/customers";

export function LogoWall() {
  return (
    <section className="py-16 border-b border-border">
      <Container>
        <FadeIn>
          <p className="text-center text-sm font-medium text-slate-400 uppercase tracking-wider mb-8">
            Trusted by innovative teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {customers.map((c) => (
              <div
                key={c.slug}
                className="flex h-12 items-center justify-center rounded-lg bg-slate-50 px-6 text-sm font-bold text-slate-400"
              >
                {c.company}
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
