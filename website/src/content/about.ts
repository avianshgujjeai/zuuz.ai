// ─── About Overview ───────────────────────────────────────────
export const aboutOverview = {
  hero: {
    badge: "About ZUUZ",
    title: "Built by operators who lived the problem.",
    description:
      "ZUUZ is the AI execution layer for the enterprise — persona-based agents that do real work across Email, Docs, Meetings, CRM, and ERP, governed workflows that enforce your policies, and unified search that proves its answers with evidence.",
  },
  cards: [
    { title: "Our Story", description: "How a repeating enterprise pain became a platform.", href: "/about/our-story", icon: "BookOpen" },
    { title: "Careers", description: "Build the operating layer for modern enterprises.", href: "/about/careers", icon: "Users" },
    { title: "Trust & Security", description: "SOC 2 Type I. On-prem option. Immutable audit trails.", href: "/about/trust-security", icon: "ShieldCheck" },
    { title: "Contact", description: "Offices in California, UAE, and India.", href: "/about/contact", icon: "Mail" },
  ],
  credibility: [
    { label: "Second-time founder", detail: "CEO with prior enterprise exits" },
    { label: "Enterprise deployments", detail: "Built from real operational pain" },
    { label: "Security-first", detail: "SOC 2 Type I certified" },
    { label: "Customer-led", detail: "18+ yrs CSM shaping the roadmap" },
  ],
  meta: { title: "About — ZUUZ", description: "Built by operators who lived the problem. Learn about ZUUZ's mission, team, and commitment to enterprise trust." },
};

// ─── Our Story ────────────────────────────────────────────────
export const ourStory = {
  hero: {
    badge: "Our Story",
    title: "The missing layer between AI hype and enterprise execution.",
    description:
      "ZUUZ was born from a pattern its CEO saw across dozens of enterprise deployments: companies adopted copilots, search tools, and workflow platforms — but outcomes still stalled.",
  },
  founderNarrative: [
    {
      heading: "The pattern that kept repeating",
      body: "After years of deploying enterprise software, our CEO noticed the same failure mode everywhere. Companies invested in unified search — but search doesn't execute. They bought workflow tools — but customization took quarters. They rolled out copilots — but copilots don't match how real teams operate across roles and personas. The result: shelfware, shadow processes, and frustrated operators.",
    },
    {
      heading: "The breakthrough: persona-based agents",
      body: "ZUUZ took a different approach. Instead of building one horizontal tool, we built purpose-built AI Agents for each business function — Sales, Procurement, HR, Legal, Logistics, and more. Each agent doesn't just find answers. It executes: updating systems of record, routing approvals, drafting communications, and closing out tasks — with human oversight and evidence trails at every step.",
    },
    {
      heading: "Starting with everyday work",
      body: "We didn't start with the hardest problem. We started with the most frequent one. Email, Documents, and Meetings — the three tools every knowledge worker touches daily. ZUUZ summarizes, routes, and actions the output of these tools, then writes results back to systems of record safely. This foundation proved the execution model before we scaled to complex workflows.",
    },
    {
      heading: "The vision: an enterprise digital brain",
      body: "As integrations deepen and context accumulates, ZUUZ evolves from a task-execution layer into a continuous intelligence layer — a digital brain for the enterprise. It learns organizational context, aligns decisions to policies, and orchestrates work across systems. Not a dashboard you check. An operating layer that runs.",
    },
  ],
  whyNow: {
    heading: "Why now",
    body: "Enterprises have data everywhere — in email, docs, meetings, CRM, ERP, HRIS, and dozens of SaaS tools. The data isn't the bottleneck. The missing layer is controlled execution: the ability to act on that data with evidence, permissions, and audit trails. That layer didn't exist. Now it does.",
  },
  timeline: [
    { year: "2022", title: "Enterprise deployments", description: "CEO observes the pattern: search doesn't execute, workflows stall, copilots don't fit real operations." },
    { year: "2023", title: "Problem validated", description: "Interviews with 50+ enterprise operators confirm the gap between AI adoption and operational outcomes." },
    { year: "2023", title: "First agents shipped", description: "Email, Document, and Meeting agents prove the execution model — summarize, route, action, write back." },
    { year: "2024", title: "Workflow execution", description: "ApprovalOps workflows go live: import existing processes, govern with policies, execute with agents." },
    { year: "2024", title: "Unified context layer", description: "Permission-safe search + Context Pack assembly gives every decision an evidence bundle." },
    { year: "2025", title: "Digital brain vision", description: "Continuous learning, cross-system orchestration, and enterprise-wide intelligence layer." },
  ],
  meta: { title: "Our Story — ZUUZ", description: "How a repeating enterprise failure mode became a platform. The story behind ZUUZ's persona-based AI agents and execution layer." },
};

// ─── Careers ──────────────────────────────────────────────────
export interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  region: "India" | "USA";
  whatYoullDo: string[];
  whatWereLookingFor: string[];
  bonus: string[];
}

export const careers = {
  hero: {
    badge: "Careers",
    title: "Build the operating layer for modern enterprises.",
    description: "We're a small, focused team shipping fast. Customer-led, security-minded, and allergic to busywork.",
  },
  culture: {
    heading: "How we work",
    values: [
      { title: "Customer-led", description: "Our roadmap starts with customer pain, not product intuition. Every feature ships because an operator asked for it." },
      { title: "Shipping-focused", description: "Small teams, short cycles, real deployments. We measure progress in customer outcomes, not story points." },
      { title: "Security-minded", description: "Trust is the foundation, not a feature. Every engineer thinks about permissions, audit trails, and evidence from day one." },
    ],
  },
  jobs: [
    {
      id: "fullstack-india",
      title: "Full Stack Developer",
      location: "India (Onsite/Hybrid)",
      type: "Full-time",
      region: "India" as const,
      whatYoullDo: [
        "Build and maintain core platform features across the Next.js frontend and Node.js/Python backend",
        "Implement agent execution pipelines that read from and write to enterprise systems of record",
        "Design and build workflow orchestration UIs for complex multi-step approval processes",
        "Work directly with customers to debug integrations and ship fixes fast",
        "Own features end-to-end: from database schema to API design to production monitoring",
      ],
      whatWereLookingFor: [
        "3+ years full-stack experience with TypeScript, React/Next.js, and a backend language (Python or Node.js)",
        "Experience building and shipping SaaS products used by paying customers",
        "Comfort working across the stack — database, API, frontend, deployment",
        "Strong fundamentals in REST/GraphQL APIs, relational databases, and async processing",
        "Clear written communication — we're a distributed team that runs on docs and PRs",
      ],
      bonus: [
        "Experience with enterprise integrations (CRM, ERP, HRIS APIs)",
        "Familiarity with LLM orchestration frameworks (LangChain, LlamaIndex, or similar)",
        "Prior work at an early-stage startup (Series A or earlier)",
      ],
    },
    {
      id: "ai-engineer-india",
      title: "AI/ML Engineer",
      location: "India (Onsite/Hybrid)",
      type: "Full-time",
      region: "India" as const,
      whatYoullDo: [
        "Design and optimize agent decision pipelines — from signal ingestion to policy evaluation to action execution",
        "Build RAG systems for permission-aware enterprise search with citation and evidence grounding",
        "Develop evaluation frameworks to measure agent accuracy, hallucination rates, and execution reliability",
        "Integrate open and commercial LLMs with fine-tuning, prompt engineering, and model selection infrastructure",
        "Collaborate with product and customers to translate operational requirements into ML system designs",
      ],
      whatWereLookingFor: [
        "2+ years applied ML/NLP experience — not just notebooks, but production systems",
        "Hands-on experience with LLMs: fine-tuning, prompt engineering, RAG architectures",
        "Strong Python skills and experience with ML infrastructure (vector stores, embedding pipelines, evaluation)",
        "Understanding of information retrieval, document processing, and structured data extraction",
        "Ability to reason about trade-offs: latency vs. accuracy, cost vs. quality, autonomy vs. control",
      ],
      bonus: [
        "Experience building search or recommendation systems at scale",
        "Familiarity with enterprise data — CRM records, contracts, HRIS, ERP transactions",
        "Published research or open-source contributions in NLP/LLM space",
      ],
    },
    {
      id: "csm-usa",
      title: "Customer Success Manager",
      location: "USA (Onsite — Sunnyvale, CA)",
      type: "Full-time",
      region: "USA" as const,
      whatYoullDo: [
        "Own the post-sale relationship for enterprise accounts — from onboarding to expansion",
        "Drive adoption by mapping customer workflows to ZUUZ agent and workflow capabilities",
        "Build and deliver QBRs that demonstrate measurable time and cost impact",
        "Serve as the voice of the customer internally — influencing roadmap, prioritizing integrations",
        "Develop playbooks for common deployment patterns across industries",
      ],
      whatWereLookingFor: [
        "5+ years in Customer Success, Solutions Engineering, or Technical Account Management at a B2B SaaS company",
        "Experience managing enterprise accounts ($100K+ ARR) with multi-stakeholder relationships",
        "Ability to understand technical workflows and translate them into business outcomes",
        "Track record of driving net revenue retention through adoption and expansion",
        "Strong project management skills — you keep deployments on track without micromanaging",
      ],
      bonus: [
        "Experience with AI/ML products or workflow automation platforms",
        "Background in one of our target industries (manufacturing, healthcare, financial services)",
        "Comfort with light technical work — reading API docs, configuring workflows, debugging integrations",
      ],
    },
    {
      id: "eam-usa",
      title: "Enterprise Account Manager",
      location: "USA (Onsite — Sunnyvale, CA)",
      type: "Full-time",
      region: "USA" as const,
      whatYoullDo: [
        "Own the full sales cycle for enterprise accounts — from prospecting to close",
        "Run discovery sessions that map prospect pain to ZUUZ agent and workflow solutions",
        "Build and deliver compelling demos, proposals, and business cases for C-level buyers",
        "Collaborate with Customer Success to ensure smooth handoff and rapid time-to-value",
        "Contribute to sales process refinement, competitive intelligence, and pricing strategy",
      ],
      whatWereLookingFor: [
        "5+ years of enterprise software sales experience with $100K+ deal sizes",
        "Proven track record of quota attainment in complex, multi-stakeholder sales cycles",
        "Ability to sell to both technical buyers (IT, Engineering) and business buyers (Ops, Finance, HR)",
        "Experience selling AI, automation, or workflow products to the enterprise",
        "Strong discovery and storytelling skills — you lead with pain, not features",
      ],
      bonus: [
        "Existing relationships in manufacturing, healthcare, or financial services",
        "Experience at an early-stage company (Series A/B) where you helped build the sales motion",
        "Comfort with technical concepts — APIs, integrations, LLMs, workflow orchestration",
      ],
    },
  ] as Job[],
  meta: { title: "Careers — ZUUZ", description: "Build the operating layer for modern enterprises. Open roles in engineering, AI, sales, and customer success." },
};

// ─── Trust & Security ─────────────────────────────────────────
export const trustSecurity = {
  hero: {
    badge: "Trust & Security",
    title: "Trust isn't a feature. It's the foundation.",
    description: "Every action ZUUZ takes is identity-verified, permission-checked, policy-gated, and audit-logged. We built security into the architecture, not bolted it on after.",
  },
  leadership: [
    {
      role: "CTO",
      credential: "17 years of product development experience",
      detail: "Led engineering organizations building enterprise-grade platforms. Brings deep technical judgment on security architecture, data handling, and system reliability.",
    },
    {
      role: "CEO",
      credential: "Second-time founder with deep enterprise relationships",
      detail: "Built ZUUZ from firsthand pain — years of sales, presales, and deployment work showed the gap between AI adoption and operational execution. Leads with customer outcomes, not technology hype.",
    },
    {
      role: "Customer Success",
      credential: "18+ years of enterprise customer experience",
      detail: "Involved from day one. Our CSM function shapes the product roadmap, ensuring every feature is validated against real customer workflows before it ships.",
    },
  ],
  securityPosture: [
    { title: "SOC 2 Type I Certified", description: "Independent audit confirming our security controls meet the Trust Services Criteria for security, availability, and confidentiality.", icon: "ShieldCheck" },
    { title: "On-premise deployment", description: "For regulated environments that require data to stay within their infrastructure. Full feature parity with our cloud offering.", icon: "Server" },
    { title: "Open model support", description: "Customers control model choice. Support for customer-managed and open models — no vendor lock-in on the intelligence layer.", icon: "Cpu" },
    { title: "Identity & access controls", description: "SSO, SAML 2.0, MFA, role-based access control, and least-privilege enforcement across all platform operations.", icon: "KeyRound" },
  ],
  howWeBuildTrust: [
    "Security by design — threat modeling and security review are part of every feature cycle",
    "Least-privilege access — agents and users only access what they need, nothing more",
    "Evidence-based answers — every search result and agent action cites its sources",
    "Human-in-the-loop approvals — sensitive actions require explicit human authorization",
    "Transparent roadmaps — customers see what's coming and influence what gets built",
    "Immutable audit trails — every action timestamped, attributed, and preserved",
  ],
  faq: [
    { id: "on-prem", question: "Do you support on-premise deployments?", answer: "Yes. ZUUZ offers an on-premise deployment option for organizations with strict data residency or regulatory requirements. The on-prem version has full feature parity with our cloud offering. Deployment is supported by our team with dedicated infrastructure planning." },
    { id: "permissions", question: "How do you handle permissions?", answer: "ZUUZ enforces permissions at query time and action time. Search results are filtered through source-system permissions — if a user doesn't have access in the source tool, they won't see it in ZUUZ. Agent actions are gated by role-based access controls and policy rules configured by your admin team." },
    { id: "soc2", question: "What does SOC 2 Type I cover?", answer: "SOC 2 Type I is an independent audit that confirms our security controls are designed to meet the Trust Services Criteria for security, availability, and confidentiality at a specific point in time. It covers our infrastructure, data handling, access controls, and operational procedures." },
    { id: "open-models", question: "Can we use customer-managed or open models?", answer: "Yes. ZUUZ supports customer-managed model deployments and open models. You control which models power your agents and search — there's no vendor lock-in on the intelligence layer. This is particularly relevant for organizations with data sovereignty or model governance requirements." },
    { id: "audit-trail", question: "Do you keep an audit trail of all actions?", answer: "Every action taken by ZUUZ — searches, agent executions, approvals, write-backs — is logged with a timestamp, the identity of who triggered it, what evidence was used, and what changed in downstream systems. Audit logs are immutable and available for compliance review." },
  ],
  meta: { title: "Trust & Security — ZUUZ", description: "SOC 2 Type I certified. On-prem option. Open model support. Immutable audit trails. Trust built into the architecture." },
};

// ─── Contact ──────────────────────────────────────────────────
export interface OfficeLocation {
  label: string;
  address: string[];
  mapsUrl?: string;
  isTodo?: boolean;
}

export const contact = {
  hero: {
    badge: "Contact",
    title: "Let's talk.",
    description: "Whether you're exploring ZUUZ for your team or have a specific question, we'd like to hear from you.",
  },
  locations: [
    {
      label: "USA HQ (California)",
      address: ["Plug and Play Tech Center", "440 N Wolfe Rd", "Sunnyvale, CA 94085"],
      mapsUrl: "https://www.google.com/maps?q=Plug+and+Play+Tech+Center,+440+N+Wolfe+Rd,+Sunnyvale,+CA+94085",
    },
    {
      label: "UAE Office",
      address: ["TODO: Pull address from zuuz.ai"],
      isTodo: true,
    },
    {
      label: "India Office",
      address: ["TODO: Pull address from zuuz.ai"],
      isTodo: true,
    },
  ] as OfficeLocation[],
  meta: { title: "Contact — ZUUZ", description: "Get in touch with the ZUUZ team. Offices in Sunnyvale CA, UAE, and India." },
};

// ─── Helpers ──────────────────────────────────────────────────
export interface AboutPageEntry {
  slug: string;
  title: string;
  description: string;
  meta: { title: string; description: string };
}

export const aboutPages: AboutPageEntry[] = [
  { slug: "our-story", title: "Our Story", description: ourStory.hero.description, meta: ourStory.meta },
  { slug: "careers", title: "Careers", description: careers.hero.description, meta: careers.meta },
  { slug: "trust-security", title: "Trust & Security", description: trustSecurity.hero.description, meta: trustSecurity.meta },
  { slug: "contact", title: "Contact", description: contact.hero.description, meta: contact.meta },
];

export function getAboutPage(slug: string): AboutPageEntry | undefined {
  return aboutPages.find((p) => p.slug === slug);
}

export function getAllAboutSlugs(): string[] {
  return aboutPages.map((p) => p.slug);
}
