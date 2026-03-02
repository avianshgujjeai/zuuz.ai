import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { team } from "@/content/about";

export function TeamGrid() {
  return (
    <section className="py-24 bg-slate-50/50">
      <Container>
        <FadeIn>
          <SectionHeading
            badge="Team"
            title="The people behind ZUUZ"
            description="A small, focused team with deep experience in AI, enterprise software, and design."
          />
        </FadeIn>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <FadeIn key={m.name} delay={i * 0.06}>
              <div className="rounded-xl border border-border bg-white p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-500">
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="text-base font-semibold text-slate-900">{m.name}</h3>
                <p className="text-sm font-medium text-primary">{m.role}</p>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{m.bio}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
