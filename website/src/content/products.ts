export interface ProductFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ProductWorkflow {
  title: string;
  description: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface Product {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  features: ProductFeature[];
  workflows: ProductWorkflow[];
  faqs: ProductFAQ[];
  meta: { title: string; description: string };
}

export const products: Product[] = [
  {
    slug: "agents",
    title: "AI Agents",
    tagline: "Autonomous intelligence for every team",
    description: "Deploy AI agents that understand context, take action, and learn from feedback — handling complex tasks end-to-end so your team can focus on high-value work.",
    icon: "Bot",
    color: "indigo",
    features: [
      { title: "Context-aware reasoning", description: "Agents understand your org's data, tools, and processes to make informed decisions.", icon: "Brain" },
      { title: "Multi-step execution", description: "Chain actions across systems — from reading email to updating CRM to sending Slack summaries.", icon: "Workflow" },
      { title: "Human-in-the-loop", description: "Set approval gates for sensitive actions. Agents escalate when confidence is low.", icon: "ShieldCheck" },
      { title: "Continuous learning", description: "Agents improve over time by learning from corrections and feedback.", icon: "TrendingUp" },
      { title: "Enterprise connectors", description: "Pre-built integrations with 200+ enterprise tools out of the box.", icon: "Plug" },
      { title: "Audit trail", description: "Every action logged and explainable for compliance and debugging.", icon: "FileText" },
    ],
    workflows: [
      { title: "IT ticket triage", description: "Classify, route, and auto-resolve common support tickets." },
      { title: "Invoice processing", description: "Extract data, validate, and push to your ERP automatically." },
      { title: "Employee onboarding", description: "Provision accounts, send welcome packets, schedule orientation." },
    ],
    faqs: [
      { question: "How do agents handle sensitive data?", answer: "All data is processed within your security boundary. Agents follow your RBAC policies and never store data outside approved systems." },
      { question: "Can I customize agent behavior?", answer: "Yes — define custom instructions, guardrails, and escalation rules per agent. No code required." },
      { question: "What happens when an agent encounters something new?", answer: "Agents surface uncertain decisions for human review and learn from the outcome for future handling." },
    ],
    meta: { title: "AI Agents — ZUUZ", description: "Autonomous AI agents that handle complex enterprise tasks end-to-end." },
  },
  {
    slug: "workflows",
    title: "Workflows",
    tagline: "Orchestrate anything, automate everything",
    description: "Build and deploy intelligent workflows that connect your tools, enforce your logic, and adapt to changing conditions — with a visual builder or code.",
    icon: "GitBranch",
    color: "violet",
    features: [
      { title: "Visual builder", description: "Drag-and-drop interface for creating workflows — no engineering degree required.", icon: "Layout" },
      { title: "Conditional logic", description: "Branch on data values, approval status, time, or any custom condition.", icon: "GitFork" },
      { title: "Parallel execution", description: "Run steps concurrently to slash processing times.", icon: "Layers" },
      { title: "Error handling", description: "Built-in retry, fallback, and dead-letter queue support.", icon: "AlertTriangle" },
      { title: "Version control", description: "Track changes, roll back, and A/B test workflow versions.", icon: "History" },
      { title: "Observability", description: "Real-time dashboards showing throughput, latency, and error rates.", icon: "BarChart3" },
    ],
    workflows: [
      { title: "Contract review pipeline", description: "Extract clauses, flag risks, route for legal review, and archive." },
      { title: "Order fulfillment", description: "Validate orders, check inventory, create shipments, and notify customers." },
      { title: "Compliance checks", description: "Continuous monitoring against regulatory requirements with automated reporting." },
    ],
    faqs: [
      { question: "Do I need to code to build workflows?", answer: "No. The visual builder covers most use cases. For advanced logic, you can drop into TypeScript or Python." },
      { question: "How do workflows handle failures?", answer: "Every step has configurable retry policies, fallback paths, and alerting. Failed runs are preserved for debugging." },
      { question: "Can workflows trigger agents?", answer: "Absolutely. Workflows can invoke agents as steps, and agents can kick off workflows. They're fully composable." },
    ],
    meta: { title: "Workflows — ZUUZ", description: "Intelligent workflow automation that connects your tools and enforces your logic." },
  },
  {
    slug: "unified-search",
    title: "Unified Search",
    tagline: "One search bar for your entire org",
    description: "Find anything across every tool, drive, and database your team uses — with AI that understands intent and surfaces the most relevant results instantly.",
    icon: "Search",
    color: "sky",
    features: [
      { title: "Cross-platform search", description: "Query Slack, Drive, Jira, Confluence, Notion, email, and 200+ more simultaneously.", icon: "Globe" },
      { title: "Semantic understanding", description: "Search by meaning, not just keywords. Ask questions in plain English.", icon: "MessageSquare" },
      { title: "Personalized ranking", description: "Results ranked by relevance to your role, projects, and recent activity.", icon: "Star" },
      { title: "Instant answers", description: "Get direct answers synthesized from multiple sources, with citations.", icon: "Zap" },
      { title: "Permission-aware", description: "Results respect source-system permissions. Users only see what they have access to.", icon: "Lock" },
      { title: "Knowledge graph", description: "Automatically maps relationships between people, projects, and information.", icon: "Network" },
    ],
    workflows: [
      { title: "Research assistant", description: "Ask a complex question and get a synthesized answer with source citations." },
      { title: "New hire ramp-up", description: "New employees find tribal knowledge across tools on day one." },
      { title: "Audit preparation", description: "Surface all relevant documents and communications for compliance reviews." },
    ],
    faqs: [
      { question: "Which data sources are supported?", answer: "200+ connectors including Google Workspace, Microsoft 365, Slack, Jira, Salesforce, and custom APIs." },
      { question: "How fresh are search results?", answer: "Most connectors sync in real-time. Batch connectors refresh every 5–15 minutes." },
      { question: "Does ZUUZ index file contents?", answer: "Yes — PDFs, docs, spreadsheets, presentations, and even images (via OCR) are fully indexed." },
    ],
    meta: { title: "Unified Search — ZUUZ", description: "Search across every tool and data source in your org with AI-powered understanding." },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
