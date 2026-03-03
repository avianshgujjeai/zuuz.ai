import { FadeIn } from "@/components/ui/fade-in";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border sm:left-1/2 sm:-translate-x-px" aria-hidden="true" />

      <div className="space-y-12">
        {items.map((item, i) => {
          const isLeft = i % 2 === 0;
          return (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="relative flex items-start gap-6 sm:gap-0">
                {/* Dot */}
                <div className="absolute left-4 top-1 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background sm:left-1/2" />

                {/* Content */}
                <div className={`ml-10 sm:ml-0 sm:w-1/2 ${isLeft ? "sm:pr-12 sm:text-right" : "sm:pl-12 sm:ml-auto"}`}>
                  <span className="text-xs font-bold text-primary tracking-wider">{item.year}</span>
                  <h3 className="mt-1 text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
