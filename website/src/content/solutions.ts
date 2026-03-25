export interface UseCase {
  title: string;
  description: string;
  icon: string;
}

export interface AgentCategory {
  category: string;
  agents: { name: string; slug: string }[];
}

export interface Metric {
  value: string;
  label: string;
  source?: string;
}

export interface SolutionData {
  slug: string;
  industry: string;
  icon: string;
  outcomeOneLiner: string;
  tags: string[];
  heroHeadline: string;
  heroDescription: string;
  useCases: UseCase[];
  agentCategories: AgentCategory[];
  contextPackChips: string[];
  metrics: Metric[];
  searchExamples: string[];
  meta: { title: string; description: string };
}

const defaultAgentCategories: AgentCategory[] = [
  { category: "Operations Copilots", agents: [
    { name: "Email Copilot", slug: "email" },
    { name: "Documents Copilot", slug: "documents" },
    { name: "Meetings Copilot", slug: "meetings" },
  ]},
  { category: "Approval Copilots", agents: [
    { name: "Procurement Copilot", slug: "procurement" },
    { name: "Legal Copilot", slug: "legal" },
  ]},
  { category: "Sales Copilots", agents: [
    { name: "Sales Copilot", slug: "sales" },
  ]},
  { category: "HR Copilots", agents: [
    { name: "HR Copilot", slug: "hr" },
  ]},
];

export const solutions: SolutionData[] = [
  {
    slug: "it-services",
    industry: "IT Services",
    icon: "Server",
    outcomeOneLiner: "Turn approvals into delivery velocity — change requests, exceptions, and follow-through in one system.",
    tags: ["ApprovalOps", "Workflows", "Unified Search"],
    heroHeadline: "Approvals and operations — fast, compliant, auditable.",
    heroDescription: "IT services teams juggle change requests, discount approvals, staffing decisions, and vendor onboarding across disconnected systems. ZUUZ brings every approval into one governed workflow — with context packs that include SOW clauses, SLA impact, and prior approvals so decisions happen in minutes, not days.",
    useCases: [
      { title: "Change request & scope change approvals", description: "Route scope changes with SOW context, SLA impact analysis, and delivery risk assessment attached. Approvers see everything they need — no back-and-forth.", icon: "FileText" },
      { title: "Discount & credit approvals", description: "Enforce margin guardrails automatically. Every discount request arrives with policy context, customer history, and P&L impact pre-calculated.", icon: "BadgePercent" },
      { title: "Staffing & access approvals", description: "Role-based routing for staffing requests. Access provisioning tied to project scope, clearance level, and budget authorization.", icon: "UserCheck" },
      { title: "Vendor & subcontractor onboarding", description: "Collect compliance docs, verify certifications, route approvals by spend tier — all before the first PO is issued.", icon: "Building2" },
    ],
    agentCategories: defaultAgentCategories,
    contextPackChips: ["SOW clauses", "SLA impact", "Delivery risk", "Budget authorization", "Prior approvals", "Customer comms"],
    metrics: [],
    searchExamples: ["What's the SLA impact of this scope change?", "Who approved the last staffing request for Project Atlas?", "Find the SOW amendment for Acme Corp Q3"],
    meta: { title: "AI Workflow Automation for IT Services Teams", description: "ZUUZ automates IT approvals, change requests, incident triage, and vendor onboarding — every decision context-packed, policy-enforced, and audit-logged." },
  },
  {
    slug: "distribution",
    industry: "Distribution",
    icon: "Truck",
    outcomeOneLiner: "Move faster on POs, pricing exceptions, and fulfillment issues — without losing control.",
    tags: ["ApprovalOps", "Workflows", "Unified Search"],
    heroHeadline: "Approvals and operations — fast, compliant, auditable.",
    heroDescription: "Distribution runs on speed and precision. But PO approvals stall in email, pricing exceptions get decided without margin context, and vendor onboarding takes weeks. ZUUZ assembles the evidence — inventory position, OTIF risk, customer priority — and routes every decision to the right approver with full context.",
    useCases: [
      { title: "PO & replenishment approvals", description: "Every purchase order arrives with budget impact, current stock levels, and demand forecast context. Approvers decide in minutes, not days.", icon: "Package" },
      { title: "Price override & margin exception approvals", description: "Pricing exceptions routed with margin impact, customer tier, prior exception history, and competitive context — so approvers protect margins without slowing deals.", icon: "BadgePercent" },
      { title: "New vendor onboarding approvals", description: "Vendor applications validated against compliance requirements, insurance certifications, and capacity assessments before reaching an approver.", icon: "Building2" },
      { title: "Returns & credits approvals", description: "Return requests enriched with order history, warranty status, and cost impact. Route to the right authority level based on value and reason code.", icon: "RotateCcw" },
    ],
    agentCategories: [
      { category: "Operations Copilots", agents: [
        { name: "Email Copilot", slug: "email" },
        { name: "Documents Copilot", slug: "documents" },
        { name: "Logistics Copilot", slug: "logistics" },
      ]},
      { category: "Approval Copilots", agents: [
        { name: "Procurement Copilot", slug: "procurement" },
        { name: "Legal Copilot", slug: "legal" },
      ]},
      { category: "Sales Copilots", agents: [{ name: "Sales Copilot", slug: "sales" }]},
      { category: "HR Copilots", agents: [{ name: "HR Copilot", slug: "hr" }]},
    ],
    contextPackChips: ["Inventory position", "OTIF risk", "Customer priority", "Margin impact", "Prior exceptions", "Demand forecast"],
    metrics: [],
    searchExamples: ["What's the current stock level for SKU-4521?", "Show me price exceptions approved for Tier 1 customers this quarter", "Find delayed shipments for the East region"],
    meta: { title: "AI Order Management & Logistics Workflow Automation", description: "ZUUZ automates order management, supplier approvals, and logistics ops for distribution businesses — context-aware, policy-enforced." },
  },
  {
    slug: "financial-services",
    industry: "Financial Services",
    icon: "Landmark",
    outcomeOneLiner: "Spend approvals, policy exceptions, and vendor onboarding — with evidence at every step.",
    tags: ["ApprovalOps", "Compliance", "Audit Trail"],
    heroHeadline: "Approvals and operations — fast, compliant, auditable.",
    heroDescription: "Financial services demands precision and proof. Every spend decision, policy exception, and vendor relationship requires documented evidence, threshold enforcement, and immutable audit trails. ZUUZ assembles the context pack — policy evidence, risk flags, contract terms, budget impact — and routes decisions through your approval chain with complete traceability.",
    useCases: [
      { title: "Spend approvals with threshold enforcement", description: "Every spend request arrives with budget context, policy limits, and prior approvals. Routing adjusts automatically by amount, category, and risk profile.", icon: "DollarSign" },
      { title: "Policy exception approvals", description: "Exception requests include the relevant policy text, prior exceptions for the same rule, risk assessment, and compliance officer commentary — all assembled automatically.", icon: "ShieldAlert" },
      { title: "Vendor onboarding approvals", description: "Vendor applications enriched with compliance screening results, contract terms, risk flags, and due diligence documentation before reaching an approver.", icon: "Building2" },
      { title: "Regulatory filing coordination", description: "Filing workflows that pull data from multiple systems, validate completeness, and route through compliance review with evidence attached.", icon: "FileCheck" },
    ],
    agentCategories: defaultAgentCategories,
    contextPackChips: ["Policy evidence", "Prior exceptions", "Risk flags", "Contract terms", "Budget impact", "Compliance docs"],
    metrics: [
      { value: "3×", label: "Faster decisions", source: "Based on PDF: ZUUZ For Finance" },
      { value: "60%", label: "Reduced risk exposure", source: "Based on PDF: ZUUZ For Finance" },
      { value: "100%", label: "Audit coverage", source: "Based on PDF: ZUUZ For Finance" },
    ],
    searchExamples: ["What's our current exposure to vendor X?", "Find all policy exceptions approved this quarter", "Show me the compliance review status for the Q4 filing"],
    meta: { title: "AI Compliance & Audit Workflow Automation for Financial Services", description: "ZUUZ enforces compliance workflows, automates audit trails, and routes risk decisions for financial services teams — SOC 2 Type I certified." },
  },
  {
    slug: "healthcare",
    industry: "Healthcare",
    icon: "Heart",
    outcomeOneLiner: "Medical procurement, vendor renewals, and staffing exceptions — with compliance built into every step.",
    tags: ["ApprovalOps", "Compliance", "Audit Trail"],
    heroHeadline: "Approvals and operations — fast, compliant, auditable.",
    heroDescription: "Healthcare operations can't afford delays — or compliance gaps. Medical supplies procurement, vendor contract renewals, and staffing exceptions each require evidence from multiple systems and approval chains that respect regulatory requirements. ZUUZ assembles supplier compliance, urgency context, budget match, and documentation checklists into a single context pack for every decision.",
    useCases: [
      { title: "Medical supplies procurement", description: "Purchase requests enriched with supplier compliance status, usage history, urgency indicators, and formulary/contract pricing — routed to the right authority by spend tier and category.", icon: "Pill" },
      { title: "Vendor contract & renewal approvals", description: "Renewal requests include performance scorecards, compliance documentation, pricing benchmarks, and utilization data so contract managers decide with full context.", icon: "FileSignature" },
      { title: "Staffing & shift exception approvals", description: "Shift exceptions and overtime requests routed with coverage gap analysis, budget impact, credential verification, and union rule compliance attached.", icon: "UserCheck" },
      { title: "Equipment & maintenance approvals", description: "Capital and maintenance requests include asset lifecycle data, downtime risk, regulatory compliance status, and budget availability.", icon: "Wrench" },
    ],
    agentCategories: [
      { category: "Operations Copilots", agents: [
        { name: "Email Copilot", slug: "email" },
        { name: "Documents Copilot", slug: "documents" },
        { name: "Meetings Copilot", slug: "meetings" },
      ]},
      { category: "Approval Copilots", agents: [
        { name: "Procurement Copilot", slug: "procurement" },
        { name: "Legal Copilot", slug: "legal" },
      ]},
      { category: "Sales Copilots", agents: [{ name: "Sales Copilot", slug: "sales" }]},
      { category: "HR Copilots", agents: [{ name: "HR Copilot", slug: "hr" }]},
    ],
    contextPackChips: ["Supplier compliance", "Urgency & usage history", "Budget & policy match", "Documentation checklist", "Regulatory requirements", "Prior approvals"],
    metrics: [
      { value: "65%", label: "Faster procurement cycles", source: "Based on PDF: ZUUZ for Healthcare Operations" },
      { value: "80%", label: "Fewer compliance gaps", source: "Based on PDF: ZUUZ for Healthcare Operations" },
      { value: "90%", label: "Audit-readiness improvement", source: "Based on PDF: ZUUZ for Healthcare Operations" },
    ],
    searchExamples: ["What's the compliance status for supplier MedEquip Inc?", "Find the latest contract renewal for imaging services", "Show staffing exceptions approved in the last 30 days"],
    meta: { title: "Agentic AI for Healthcare Operations & Prior Authorization", description: "ZUUZ streamlines prior auth, care coordination workflows, and regulatory compliance for healthcare teams — with full audit coverage." },
  },
  {
    slug: "insurance",
    industry: "Insurance",
    icon: "Shield",
    outcomeOneLiner: "Claims and policy exceptions — routed with evidence, resolved faster.",
    tags: ["ApprovalOps", "Claims", "Audit Trail"],
    heroHeadline: "Approvals and operations — fast, compliant, auditable.",
    heroDescription: "Insurance operations live on exception handling — claims that need escalation, policy terms that need override, vendors that need onboarding, and expenses that need authorization. ZUUZ assembles FNOL details, coverage terms, prior claims history, and adjuster notes into an evidence pack that moves decisions from weeks to hours.",
    useCases: [
      { title: "Claims exception approvals", description: "High-severity or flagged claims routed with coverage analysis, fraud indicators, prior claims history, and adjuster recommendations — all in one view.", icon: "ShieldAlert" },
      { title: "Policy exception approvals", description: "Non-standard terms and special conditions reviewed with policy context, risk assessment, underwriting guidelines, and precedent history.", icon: "FileText" },
      { title: "Vendor onboarding (adjusters, repair, services)", description: "Adjuster, repair shop, and service provider applications validated against licensing, insurance, and capacity requirements before approval.", icon: "Building2" },
      { title: "Loss adjustment expense approvals", description: "LAE spend requests routed with claim context, reserve status, and threshold enforcement by claim type and severity.", icon: "DollarSign" },
    ],
    agentCategories: defaultAgentCategories,
    contextPackChips: ["FNOL details", "Coverage terms", "Prior claims", "Risk flags", "Adjuster notes", "Supporting documents"],
    metrics: [],
    searchExamples: ["What's the reserve status for claim #CL-78234?", "Find all fraud-flagged claims in the Southwest region", "Show me the coverage terms for policy #P-991024"],
    meta: { title: "AI Claims Processing & Underwriting Automation for Insurance", description: "ZUUZ automates claims processing, underwriting support workflows, and policy operations for insurance teams — audit-logged." },
  },
  {
    slug: "retail",
    industry: "Retail",
    icon: "ShoppingBag",
    outcomeOneLiner: "Price, promotions, and vendor operations — approvals that keep stores moving.",
    tags: ["ApprovalOps", "Workflows", "Unified Search"],
    heroHeadline: "Approvals and operations — fast, compliant, auditable.",
    heroDescription: "Retail moves fast — but approvals don't have to be the bottleneck. Price changes, promotional spend, vendor invoice exceptions, and returns disputes all require context from different systems. ZUUZ pulls margin impact, stock position, promo calendars, and vendor compliance into a single view so approvers act with confidence.",
    useCases: [
      { title: "Price change & markdown approvals", description: "Every markdown request shows margin impact, competitive pricing, sell-through rate, and inventory position — so approvers protect margin without stalling sales.", icon: "BadgePercent" },
      { title: "Promotion approvals", description: "Promotional spend requests include budget impact, inventory availability, vendor co-op status, and calendar conflict analysis.", icon: "Megaphone" },
      { title: "Vendor invoice exception approvals", description: "Invoice discrepancies arrive with PO comparison, receipt history, contract terms, and prior exception patterns for the same vendor.", icon: "FileText" },
      { title: "Returns & chargeback dispute approvals", description: "Dispute cases enriched with transaction history, return reason analysis, warranty status, and cost impact assessment.", icon: "RotateCcw" },
    ],
    agentCategories: defaultAgentCategories,
    contextPackChips: ["Margin impact", "Stock on hand", "Promo calendar", "Prior markdowns", "Vendor compliance", "Competitive pricing"],
    metrics: [],
    searchExamples: ["What's the sell-through rate for summer collection SKUs?", "Show me all vendor invoice exceptions above $5K this month", "Find the promo calendar conflict for the Labor Day campaign"],
    meta: { title: "AI Inventory & Vendor Contract Automation for Retail", description: "ZUUZ automates inventory ops, vendor contracts, and returns workflows for retail operations teams." },
  },
  {
    slug: "logistics",
    industry: "Logistics",
    icon: "Package",
    outcomeOneLiner: "Exception-first operations — resolve delays, damages, and escalations with full context.",
    tags: ["ApprovalOps", "Exceptions", "Audit Trail"],
    heroHeadline: "Approvals and operations — fast, compliant, auditable.",
    heroDescription: "Logistics runs on exceptions. Shipment delays need rerouting decisions. Damage claims need evidence gathering. Carrier onboarding needs compliance verification. ZUUZ assembles ETA variance, lane history, carrier scorecards, and cost impact into context packs that turn multi-day exception resolution into same-day decisions.",
    useCases: [
      { title: "Shipment delay exception approvals", description: "Delay exceptions routed with ETA variance analysis, rerouting options, cost impact comparison, and customer priority level — so coordinators decide in minutes.", icon: "Clock" },
      { title: "Claims & damage approvals", description: "Damage claims assembled with proof of delivery, photo evidence, carrier liability analysis, and insurance coverage — ready for adjudication.", icon: "ShieldAlert" },
      { title: "Vendor & carrier onboarding", description: "Carrier applications validated against safety scores, insurance certifications, lane capabilities, and capacity commitments before approval.", icon: "Building2" },
      { title: "Accessorial charge approvals", description: "Unexpected charges reviewed against contract terms, lane benchmarks, and prior accessorial patterns for the same carrier.", icon: "DollarSign" },
    ],
    agentCategories: [
      { category: "Operations Copilots", agents: [
        { name: "Email Copilot", slug: "email" },
        { name: "Documents Copilot", slug: "documents" },
        { name: "Logistics Copilot", slug: "logistics" },
      ]},
      { category: "Approval Copilots", agents: [{ name: "Procurement Copilot", slug: "procurement" }]},
      { category: "Sales Copilots", agents: [{ name: "Sales Copilot", slug: "sales" }]},
      { category: "HR Copilots", agents: [{ name: "HR Copilot", slug: "hr" }]},
    ],
    contextPackChips: ["ETA variance", "Lane history", "Customer priority", "Cost impact", "Carrier scorecards", "Compliance docs"],
    metrics: [],
    searchExamples: ["Where is shipment #SH-90214 right now?", "Show me all delay exceptions for the Southeast region", "Find carrier compliance expiration dates for next month"],
    meta: { title: "ZUUZ for Logistics", description: "Exception-first operations. Resolve delays, damages, and escalations with full context and audit trails." },
  },
  {
    slug: "manufacturing",
    industry: "Manufacturing",
    icon: "Factory",
    outcomeOneLiner: "Supplier onboarding, MRO spend, and urgent procurement — with compliance and audit at every step.",
    tags: ["ApprovalOps", "Compliance", "Audit Trail"],
    heroHeadline: "Approvals and operations — fast, compliant, auditable.",
    heroDescription: "Manufacturing can't wait for approvals — a delayed MRO purchase can stop a production line. But speed without compliance creates risk. ZUUZ assembles supplier compliance docs, lead time and quality history, BOM impact, downtime risk, and budget analysis into a context pack that lets approvers move fast without cutting corners.",
    useCases: [
      { title: "Supplier onboarding & compliance approvals", description: "New supplier applications validated against quality certifications, capacity assessments, compliance documentation, and risk scoring — before the first order.", icon: "Building2" },
      { title: "MRO spend approvals", description: "Maintenance, repair, and operations spend routed with budget context, asset criticality, downtime risk assessment, and vendor comparison data.", icon: "Wrench" },
      { title: "Urgent procurement to avoid line stoppage", description: "Emergency purchase requests fast-tracked with production impact analysis, alternative supplier options, and expedited approval routing — with full audit trail.", icon: "AlertTriangle" },
      { title: "Capital expenditure approvals", description: "CapEx requests enriched with ROI projections, asset lifecycle data, capacity utilization, and budget availability for informed authorization.", icon: "TrendingUp" },
    ],
    agentCategories: [
      { category: "Operations Copilots", agents: [
        { name: "Email Copilot", slug: "email" },
        { name: "Documents Copilot", slug: "documents" },
        { name: "Meetings Copilot", slug: "meetings" },
      ]},
      { category: "Approval Copilots", agents: [
        { name: "Procurement Copilot", slug: "procurement" },
        { name: "Legal Copilot", slug: "legal" },
      ]},
      { category: "Sales Copilots", agents: [{ name: "Sales Copilot", slug: "sales" }]},
      { category: "HR Copilots", agents: [{ name: "HR Copilot", slug: "hr" }]},
    ],
    contextPackChips: ["Supplier compliance docs", "Lead time & quality history", "BOM impact & downtime risk", "Budget & spend analysis", "Safety certifications", "Prior approvals"],
    metrics: [
      { value: "85%", label: "Downtime prevention", source: "Based on PDF: ZUUZ for Manufacturing" },
      { value: "30%", label: "Less procurement leakage", source: "Based on PDF: ZUUZ for Manufacturing" },
      { value: "4×", label: "Faster supplier cycles", source: "Based on PDF: ZUUZ for Manufacturing" },
    ],
    searchExamples: ["What's the OEE impact if we delay the MRO order?", "Find all supplier compliance expirations in the next 60 days", "Show me emergency procurement approvals for Line 3"],
    meta: { title: "AI Quality Gates & Vendor Management for Manufacturing", description: "ZUUZ automates quality gates, production scheduling approvals, and vendor management for manufacturing operations." },
  },
];

export function getSolution(slug: string): SolutionData | undefined {
  return solutions.find((s) => s.slug === slug);
}

export function getAllSolutionSlugs(): string[] {
  return solutions.map((s) => s.slug);
}
