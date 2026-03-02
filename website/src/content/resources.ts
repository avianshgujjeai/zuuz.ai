export interface ResourceItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime?: string;
  meta: { title: string; description: string };
}

export interface ResourceType {
  slug: string;
  label: string;
  description: string;
  icon: string;
  items: ResourceItem[];
}

export const resourceTypes: ResourceType[] = [
  {
    slug: "blog",
    label: "Blog",
    description: "Latest insights, product updates, and thought leadership from the ZUUZ team.",
    icon: "Newspaper",
    items: [
      { slug: "introducing-zuuz-agents", title: "Introducing ZUUZ AI Agents", description: "How autonomous agents are reshaping enterprise operations.", date: "2025-01-15", readTime: "6 min", meta: { title: "Introducing ZUUZ AI Agents — ZUUZ Blog", description: "How autonomous agents are reshaping enterprise operations." } },
      { slug: "workflow-automation-guide", title: "The Complete Guide to Workflow Automation", description: "From manual processes to intelligent orchestration in 5 steps.", date: "2025-01-08", readTime: "12 min", meta: { title: "The Complete Guide to Workflow Automation — ZUUZ Blog", description: "From manual processes to intelligent orchestration." } },
      { slug: "unified-search-future", title: "Why Unified Search Is the Future of Enterprise Knowledge", description: "Siloed data costs enterprises $12M per year. Here's how to fix it.", date: "2024-12-20", readTime: "8 min", meta: { title: "Unified Search Is the Future — ZUUZ Blog", description: "How unified search eliminates knowledge silos." } },
    ],
  },
  {
    slug: "guides",
    label: "Guides",
    description: "In-depth implementation guides and best practices for getting the most out of ZUUZ.",
    icon: "BookOpen",
    items: [
      { slug: "getting-started", title: "Getting Started with ZUUZ", description: "Set up your workspace, connect your first data sources, and deploy your first agent.", date: "2025-01-10", readTime: "15 min", meta: { title: "Getting Started with ZUUZ — Guides", description: "Set up your workspace and deploy your first agent." } },
      { slug: "agent-design-patterns", title: "Agent Design Patterns", description: "Proven patterns for building reliable, production-grade AI agents.", date: "2024-12-15", readTime: "20 min", meta: { title: "Agent Design Patterns — ZUUZ Guides", description: "Proven patterns for building reliable AI agents." } },
    ],
  },
  {
    slug: "webinars",
    label: "Webinars",
    description: "Live and on-demand sessions with product experts and industry leaders.",
    icon: "Video",
    items: [
      { slug: "ai-agents-in-action", title: "AI Agents in Action: Live Demo", description: "See ZUUZ agents handle real enterprise workflows in real-time.", date: "2025-02-01", meta: { title: "AI Agents in Action — ZUUZ Webinar", description: "Live demo of ZUUZ agents handling enterprise workflows." } },
      { slug: "future-of-work", title: "The Future of Work with AI Automation", description: "Panel discussion with CIOs on how AI automation is transforming operations.", date: "2025-01-20", meta: { title: "The Future of Work — ZUUZ Webinar", description: "CIO panel on AI automation transforming operations." } },
    ],
  },
  {
    slug: "docs",
    label: "Documentation",
    description: "API reference, SDKs, and technical documentation for developers.",
    icon: "Code",
    items: [
      { slug: "api-reference", title: "API Reference", description: "Complete REST API documentation with examples and SDKs.", date: "2025-01-12", meta: { title: "API Reference — ZUUZ Docs", description: "Complete REST API documentation with examples." } },
      { slug: "sdk-quickstart", title: "SDK Quickstart", description: "Get up and running with the ZUUZ SDK in under 10 minutes.", date: "2025-01-05", readTime: "10 min", meta: { title: "SDK Quickstart — ZUUZ Docs", description: "Get started with the ZUUZ SDK in under 10 minutes." } },
    ],
  },
];

export function getResourceType(slug: string): ResourceType | undefined {
  return resourceTypes.find((r) => r.slug === slug);
}

export function getResourceItem(typeSlug: string, itemSlug: string): ResourceItem | undefined {
  const type = getResourceType(typeSlug);
  return type?.items.find((i) => i.slug === itemSlug);
}

export function getAllResourceTypeSlugs(): string[] {
  return resourceTypes.map((r) => r.slug);
}

export function getAllResourceItemParams(): { type: string; slug: string }[] {
  return resourceTypes.flatMap((r) => r.items.map((i) => ({ type: r.slug, slug: i.slug })));
}
