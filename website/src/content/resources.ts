// ─── Types ────────────────────────────────────────────────────
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
  readingTime?: string;
}

export interface PdfResource {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  pdfPath: string;
}

// ─── Blog posts (metadata — content lives in MDX files) ──────
export const blogPosts: BlogPost[] = [
  {
    slug: "top-7-reasons-businesses-choose-zuuz",
    title: "Top 7 Reasons Businesses Choose ZUUZ",
    description: "Why growing enterprises pick ZUUZ to unify their operations with AI agents, workflows, and evidence-backed search.",
    date: "2026-02-28",
    tags: ["Enterprise AI", "Product"],
    readingTime: "6 min",
  },
  {
    slug: "why-wasting-an-hour-on-data-hurts",
    title: "Why Wasting an Hour on Data Hurts More Than You Think",
    description: "The hidden cost of manual data gathering — and how permission-aware search eliminates it.",
    date: "2026-02-20",
    tags: ["Productivity", "Unified Search"],
    readingTime: "5 min",
  },
  {
    slug: "agentic-ai-explained",
    title: "Agentic AI Explained: What It Means for Enterprise Operations",
    description: "A clear breakdown of agentic AI — what it is, how it differs from copilots, why large language models make it possible now, and what enterprises should look for in an agentic AI platform.",
    date: "2026-02-15",
    tags: ["Agentic AI", "Enterprise AI"],
    readingTime: "7 min",
  },
  {
    slug: "agentic-ai-vs-ai-agents",
    title: "Agentic AI vs. AI Agents: What's the Difference?",
    description: "Clearing up the confusion between agentic AI as a concept and AI agents as a product category.",
    date: "2026-02-10",
    tags: ["Agentic AI", "AI Agents"],
    readingTime: "5 min",
  },
  {
    slug: "ai-agents-transforming-financial-services",
    title: "How AI Agents Are Transforming Financial Services",
    description: "From compliance automation to spend approvals — how AI agents are reshaping finance operations.",
    date: "2026-02-05",
    tags: ["Financial Services", "AI Agents"],
    readingTime: "8 min",
  },
  {
    slug: "top-enterprise-data-search-applications-2025",
    title: "Top Enterprise Data Search Applications in 2025",
    description: "A comparison of enterprise search tools and what makes permission-aware, evidence-backed search different.",
    date: "2026-01-28",
    tags: ["Unified Search", "Enterprise AI"],
    readingTime: "9 min",
  },
];

// ─── Manuals (agent one-pagers / product guides) ─────────────
export const manuals: PdfResource[] = [
  {
    slug: "email-ai-agent",
    title: "Email AI Agent — Manual",
    summary: "How ZUUZ automates triage, drafting, routing, and analytics for email operations.",
    tags: ["AI Agents", "Email", "Operations"],
    pdfPath: "/resources/manuals/email-ai-agent.pdf",
  },
  {
    slug: "documents-ai-agent",
    title: "Documents AI Agent — Manual",
    summary: "How ZUUZ extracts, summarizes, tracks, and routes documents with evidence and audit trails.",
    tags: ["AI Agents", "Documents", "Operations"],
    pdfPath: "/resources/manuals/documents-ai-agent.pdf",
  },
  {
    slug: "meetings-ai-agent",
    title: "Meetings AI Agent — Manual",
    summary: "How ZUUZ captures decisions, assigns actions, and drives follow-through from every meeting.",
    tags: ["AI Agents", "Meetings", "Operations"],
    pdfPath: "/resources/manuals/meetings-ai-agent.pdf",
  },
  {
    slug: "approving-customer-deal",
    title: "Why Approving One Big Customer Deal Still Takes 3–5 Days",
    summary: "The hidden friction in enterprise deal approvals and how AI-powered ApprovalOps eliminates it.",
    tags: ["ApprovalOps", "Sales", "Enterprise"],
    pdfPath: "/resources/manuals/approving-customer-deal.pdf",
  },
];

// ─── Industry solution guides ────────────────────────────────
export const industryGuides: PdfResource[] = [
  {
    slug: "healthcare-operations",
    title: "ZUUZ for Healthcare Operations",
    summary: "Vendor spend and operational approvals — fast, compliant, auditable.",
    tags: ["Healthcare", "ApprovalOps", "Workflows"],
    pdfPath: "/resources/industry/healthcare-operations.pdf",
  },
  {
    slug: "finance",
    title: "ZUUZ for Finance",
    summary: "Spend approvals, policy exceptions, and vendor onboarding with evidence at every step.",
    tags: ["Financial Services", "ApprovalOps", "Compliance"],
    pdfPath: "/resources/industry/finance.pdf",
  },
  {
    slug: "manufacturing-procurement-ops",
    title: "ZUUZ for Manufacturing Procurement & Ops",
    summary: "Supplier onboarding, MRO spend, and urgent procurement — with compliance and audit at every step.",
    tags: ["Manufacturing", "Procurement", "Operations"],
    pdfPath: "/resources/industry/manufacturing-procurement-ops.pdf",
  },
  {
    slug: "construction-real-estate",
    title: "ZUUZ for Construction & Real Estate",
    summary: "Project approvals, vendor management, and compliance workflows for construction and real estate operations.",
    tags: ["Construction", "Real Estate", "ApprovalOps"],
    pdfPath: "/resources/industry/construction-real-estate.pdf",
  },
  {
    slug: "distribution-trading",
    title: "ZUUZ for Distribution & Trading",
    summary: "PO approvals, pricing exceptions, and fulfillment operations — with full context and audit trails.",
    tags: ["Distribution", "Trading", "ApprovalOps"],
    pdfPath: "/resources/industry/distribution-trading.pdf",
  },
  {
    slug: "it-services",
    title: "ZUUZ for IT Services",
    summary: "Change requests, vendor onboarding, and operational approvals — fast, compliant, auditable.",
    tags: ["IT Services", "ApprovalOps", "Workflows"],
    pdfPath: "/resources/industry/it-services.pdf",
  },
];

// ─── Helpers ──────────────────────────────────────────────────
export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((b) => b.slug === slug);
}

export function getManual(slug: string): PdfResource | undefined {
  return manuals.find((m) => m.slug === slug);
}

export function getIndustryGuide(slug: string): PdfResource | undefined {
  return industryGuides.find((g) => g.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((b) => b.slug);
}

export function getAllManualSlugs(): string[] {
  return manuals.map((m) => m.slug);
}

export function getAllIndustryGuideSlugs(): string[] {
  return industryGuides.map((g) => g.slug);
}

export type ResourceCategory = "blog" | "manuals" | "industry";

export interface UnifiedResource {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  category: ResourceCategory;
  href: string;
  date?: string;
  readingTime?: string;
}

export function getAllResources(): UnifiedResource[] {
  const all: UnifiedResource[] = [
    ...blogPosts.map((b) => ({
      slug: b.slug,
      title: b.title,
      description: b.description,
      tags: b.tags,
      category: "blog" as const,
      href: `/resources/blog/${b.slug}`,
      date: b.date,
      readingTime: b.readingTime,
    })),
    ...manuals.map((m) => ({
      slug: m.slug,
      title: m.title,
      description: m.summary,
      tags: m.tags,
      category: "manuals" as const,
      href: `/resources/manuals/${m.slug}`,
    })),
    ...industryGuides.map((g) => ({
      slug: g.slug,
      title: g.title,
      description: g.summary,
      tags: g.tags,
      category: "industry" as const,
      href: `/resources/industry/${g.slug}`,
    })),
  ];
  return all;
}
