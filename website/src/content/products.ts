export interface PillarBullet {
  text: string;
}

export interface Pillar {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  bullets: PillarBullet[];
  meta: { title: string; description: string };
}

export const pillars: Pillar[] = [
  {
    slug: "ai-agents",
    title: "AI Agents",
    icon: "Bot",
    summary: "Purpose-built agents that do complete jobs—reading signals from your tools, making policy-aware decisions, and taking action across systems with human oversight at every step.",
    bullets: [
      { text: "End-to-end task execution across CRM, ERP, email, and docs" },
      { text: "Policy-aware decision making with configurable approval gates" },
      { text: "Continuous learning from corrections and feedback loops" },
    ],
    meta: { title: "AI Agents — ZUUZ", description: "Purpose-built AI agents that handle complete jobs across your enterprise tools with human oversight at every step." },
  },
  {
    slug: "workflows",
    title: "Workflows",
    icon: "GitBranch",
    summary: "Import your existing processes—don't rebuild them. ZUUZ maps your current workflows, identifies automation opportunities, and runs them with agents and human approvals.",
    bullets: [
      { text: "Import workflows from existing systems, not from scratch" },
      { text: "Visual mapping of steps, decision points, and owners" },
      { text: "Governed execution with policies, SLAs, and audit trails" },
    ],
    meta: { title: "Workflows — ZUUZ", description: "Turn your existing business processes into executable, governed workflows without rebuilding anything." },
  },
  {
    slug: "unified-search",
    title: "Unified Search",
    icon: "Search",
    summary: "One search across emails, documents, chats, tickets, and business records—with permission-aware results, source citations, and the ability to act directly from answers.",
    bullets: [
      { text: "Cross-platform search with permission-aware result filtering" },
      { text: "Answers with evidence: every response cites its sources" },
      { text: "Search-to-action: launch workflows or trigger agents from results" },
    ],
    meta: { title: "Unified Search — ZUUZ", description: "Find anything across your enterprise tools. Get answers with citations. Act directly from search results." },
  },
];

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug);
}

export function getAllPillarSlugs(): string[] {
  return pillars.map((p) => p.slug);
}
