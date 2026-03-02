import Link from "next/link";
import { ArrowRight, Bot, GitBranch, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Bot: <Bot className="h-6 w-6" />,
  GitBranch: <GitBranch className="h-6 w-6" />,
  Search: <Search className="h-6 w-6" />,
};

interface BentoItem {
  title: string;
  description: string;
  icon: string;
  href: string;
  span?: "wide" | "normal";
}

interface BentoGridProps {
  badge?: string;
  title?: string;
  description?: string;
  items?: BentoItem[];
}

const defaultItems: BentoItem[] = [
  {
    title: "AI Agents",
    description: "Autonomous agents that understand context, take action across your tools, and learn from feedback to handle complex tasks end-to-end.",
    icon: "Bot",
    href: "/products/agents",
    span: "wide",
  },
  {
    title: "Workflows",
    description: "Visual workflow builder with conditional logic, parallel execution, and intelligent error handling.",
    icon: "GitBranch",
    href: "/products/workflows",
  },
  {
    title: "Unified Search",
    description: "One search bar for your entire org — semantically understands intent across 200+ connected tools.",
    icon: "Search",
    href: "/products/unified-search",
  },
];

export function BentoGrid({
  badge = "Platform",
  title = "Three pillars. One platform.",
  description = "Everything you need to make your organization intelligent — from autonomous agents to enterprise-wide search.",
  items = defaultItems,
}: BentoGridProps) {
  return (
    <section className="py-24">
      <Container>
        <FadeIn>
          <SectionHeading badge={badge} title={title} description={description} />
        </FadeIn>
        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.1}>
              <Link
                href={item.href}
                className={cn(
                  "group relative flex flex-col rounded-2xl border border-border bg-white p-8 transition-all duration-200",
                  "hover:shadow-lg hover:border-primary/20",
                  item.span === "wide" && "sm:col-span-2",
                )}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {iconMap[item.icon] ?? <Bot className="h-6 w-6" />}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-lg">
                  {item.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
