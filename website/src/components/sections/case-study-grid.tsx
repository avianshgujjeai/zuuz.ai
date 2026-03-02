import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { customers, type CaseStudy } from "@/content/customers";

interface CaseStudyGridProps {
  badge?: string;
  title?: string;
  description?: string;
  items?: CaseStudy[];
}

export function CaseStudyGrid({
  badge = "Case studies",
  title = "Case study grid section title",
  description,
  items = customers,
}: CaseStudyGridProps) {
  return (
    <section className="py-24">
      <Container>
        <FadeIn>
          <SectionHeading badge={badge} title={title} description={description} />
        </FadeIn>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((cs, i) => (
            <FadeIn key={cs.slug} delay={i * 0.08}>
              <Card href={`/customers/${cs.slug}`}>
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-sm font-bold text-muted-foreground">
                    {cs.logo}
                  </div>
                  <Badge variant="outline">{cs.industry}</Badge>
                </div>
                <CardTitle>{cs.company}</CardTitle>
                <CardDescription className="mt-2 line-clamp-2">{cs.quote}</CardDescription>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
