import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { FadeIn } from "@/components/ui/fade-in";
import { customers } from "@/content/customers";

interface TestimonialsProps {
  badge?: string;
  title?: string;
  description?: string;
  limit?: number;
}

export function Testimonials({
  badge = "Customers",
  title = "Testimonials section title",
  description,
  limit = 3,
}: TestimonialsProps) {
  const items = customers.slice(0, limit);
  return (
    <section className="py-16 bg-muted/30">
      <Container>
        <FadeIn>
          <SectionHeading badge={badge} title={title} description={description} />
        </FadeIn>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c, i) => (
            <FadeIn key={c.slug} delay={i * 0.1}>
              <TestimonialCard
                quote={c.quote}
                name={c.quotee}
                role={c.quoteeRole}
                company={c.company}
              />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
