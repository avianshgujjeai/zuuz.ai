export interface CaseStudy {
  slug: string;
  company: string;
  industry: string;
  logo: string;
  quote: string;
  quotee: string;
  quoteeRole: string;
  problem: string;
  solution: string;
  results: { metric: string; value: string }[];
  meta: { title: string; description: string };
}

export const customers: CaseStudy[] = [
  {
    slug: "techcorp-global",
    company: "TechCorp Global",
    industry: "IT Services",
    logo: "TC",
    quote: "ZUUZ cut our average ticket resolution time by 60%. Our support team finally has time to focus on complex issues.",
    quotee: "Sarah Chen",
    quoteeRole: "VP of IT Operations",
    problem: "TechCorp's IT team was drowning in 2,000+ tickets per week. Tier-1 agents spent 70% of their time on repetitive issues that could be resolved from existing runbooks.",
    solution: "Deployed ZUUZ AI Agents for tier-1 triage and auto-resolution, paired with Unified Search so agents could instantly surface relevant documentation.",
    results: [
      { metric: "Resolution time", value: "−60%" },
      { metric: "Auto-resolved tickets", value: "45%" },
      { metric: "Agent satisfaction", value: "+35pts NPS" },
    ],
    meta: { title: "TechCorp Global Case Study — ZUUZ", description: "How TechCorp reduced ticket resolution time by 60% with ZUUZ AI Agents." },
  },
  {
    slug: "mediflow-health",
    company: "MediFlow Health",
    industry: "Healthcare",
    logo: "MF",
    quote: "Prior authorizations used to take 3 days. With ZUUZ, we complete 80% of them within the hour.",
    quotee: "Dr. James Ortiz",
    quoteeRole: "Chief Medical Information Officer",
    problem: "Prior authorization delays were causing treatment bottlenecks. Clinical staff spent hours compiling data from multiple EHR systems for each request.",
    solution: "ZUUZ Workflows automated clinical data collection and submission, while AI Agents handled follow-ups and appeals.",
    results: [
      { metric: "Prior auth turnaround", value: "3 days → 1 hour" },
      { metric: "Staff hours saved/week", value: "120 hrs" },
      { metric: "Approval rate", value: "+22%" },
    ],
    meta: { title: "MediFlow Health Case Study — ZUUZ", description: "How MediFlow accelerated prior authorizations from 3 days to 1 hour." },
  },
  {
    slug: "distributex",
    company: "DistributeX",
    industry: "Distribution",
    logo: "DX",
    quote: "Order errors dropped to near zero and our processing throughput tripled. ZUUZ paid for itself in the first month.",
    quotee: "Maria Gonzalez",
    quoteeRole: "COO",
    problem: "Manual order entry across phone, fax, and email channels led to a 4% error rate. Processing bottlenecks during peak season caused delivery delays.",
    solution: "AI Agents extracted and validated order data from any channel. Workflows handled routing, inventory checks, and fulfillment coordination.",
    results: [
      { metric: "Order errors", value: "4% → 0.3%" },
      { metric: "Processing speed", value: "3× faster" },
      { metric: "Peak season overtime", value: "−80%" },
    ],
    meta: { title: "DistributeX Case Study — ZUUZ", description: "How DistributeX tripled order processing speed with ZUUZ automation." },
  },
  {
    slug: "financehub",
    company: "FinanceHub",
    industry: "Financial Services",
    logo: "FH",
    quote: "Our compliance team went from firefighting to proactive monitoring. We haven't missed a filing deadline since deploying ZUUZ.",
    quotee: "Robert Kim",
    quoteeRole: "Chief Compliance Officer",
    problem: "Regulatory filings required data from 12 different systems. Compiling reports was manual, error-prone, and consumed 40% of the compliance team's bandwidth.",
    solution: "ZUUZ Unified Search aggregated data across systems. Workflows automated report compilation, validation, and submission.",
    results: [
      { metric: "Filing preparation time", value: "−75%" },
      { metric: "Data errors in filings", value: "0" },
      { metric: "Compliance team capacity", value: "+40%" },
    ],
    meta: { title: "FinanceHub Case Study — ZUUZ", description: "How FinanceHub eliminated filing errors and reclaimed 40% team capacity." },
  },
  {
    slug: "retailplus",
    company: "RetailPlus",
    industry: "Retail",
    logo: "R+",
    quote: "AI-powered customer service handles 60% of inquiries with higher satisfaction scores than our previous human-only model.",
    quotee: "Lisa Park",
    quoteeRole: "Head of Customer Experience",
    problem: "Customer service response times averaged 4 hours during peak periods. Inconsistent answers across channels hurt brand trust.",
    solution: "ZUUZ AI Agents provided instant, consistent responses across chat, email, and social. Unified Search ensured agents always had the latest product and policy info.",
    results: [
      { metric: "Response time", value: "4 hrs → 30 sec" },
      { metric: "CSAT score", value: "+18pts" },
      { metric: "Support cost per ticket", value: "−55%" },
    ],
    meta: { title: "RetailPlus Case Study — ZUUZ", description: "How RetailPlus achieved instant customer service with 18-point CSAT improvement." },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return customers.find((c) => c.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return customers.map((c) => c.slug);
}
