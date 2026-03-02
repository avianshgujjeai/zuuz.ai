export interface SolutionHighlight {
  title: string;
  description: string;
}

export interface Solution {
  slug: string;
  industry: string;
  tagline: string;
  description: string;
  icon: string;
  agents: SolutionHighlight[];
  workflows: SolutionHighlight[];
  searchExamples: string[];
  meta: { title: string; description: string };
}

export const solutions: Solution[] = [
  {
    slug: "it-services",
    industry: "IT Services",
    tagline: "Resolve faster, scale smarter",
    description: "Automate ticket triage, accelerate incident response, and give every engineer an AI co-pilot.",
    icon: "Server",
    agents: [
      { title: "Tier-1 support agent", description: "Auto-resolve common tickets using knowledge base and runbooks." },
      { title: "Incident commander", description: "Coordinate response across PagerDuty, Slack, and Jira automatically." },
    ],
    workflows: [
      { title: "Change management pipeline", description: "Enforce approval gates, impact analysis, and rollback procedures." },
      { title: "SLA monitoring", description: "Track response times and escalate before breaches occur." },
    ],
    searchExamples: ["Find the runbook for database failover", "What was the RCA for last Friday's outage?"],
    meta: { title: "IT Services Solutions — ZUUZ", description: "AI-powered IT service management and automation." },
  },
  {
    slug: "distribution",
    industry: "Distribution",
    tagline: "Move goods faster with AI-powered logistics",
    description: "Optimize order processing, inventory management, and last-mile delivery with intelligent automation.",
    icon: "Truck",
    agents: [
      { title: "Order processing agent", description: "Validate, route, and confirm orders across channels in seconds." },
      { title: "Inventory optimizer", description: "Predict demand and trigger replenishment before stockouts." },
    ],
    workflows: [
      { title: "Returns processing", description: "Automate RMA creation, inspection routing, and credit issuance." },
      { title: "Supplier onboarding", description: "Collect documents, verify compliance, and provision portal access." },
    ],
    searchExamples: ["What's the current stock level for SKU-4521?", "Show me delayed shipments for the East region"],
    meta: { title: "Distribution Solutions — ZUUZ", description: "Intelligent automation for distribution and logistics operations." },
  },
  {
    slug: "financial-services",
    industry: "Financial Services",
    tagline: "Compliance-first automation for finance",
    description: "Streamline KYC, automate reporting, and reduce operational risk with AI that understands regulations.",
    icon: "Landmark",
    agents: [
      { title: "KYC verification agent", description: "Screen applicants against sanctions lists and verify identity documents." },
      { title: "Regulatory filing agent", description: "Compile and format filings from disparate data sources automatically." },
    ],
    workflows: [
      { title: "Loan origination pipeline", description: "Collect documents, run credit checks, and route for underwriting." },
      { title: "Transaction monitoring", description: "Flag suspicious activity and generate SARs with supporting evidence." },
    ],
    searchExamples: ["Find all wire transfers over $10k this quarter", "What's our current exposure to sector X?"],
    meta: { title: "Financial Services Solutions — ZUUZ", description: "Compliance-first AI automation for financial institutions." },
  },
  {
    slug: "healthcare",
    industry: "Healthcare",
    tagline: "Better care through intelligent automation",
    description: "Reduce administrative burden, speed up prior authorizations, and keep care teams focused on patients.",
    icon: "Heart",
    agents: [
      { title: "Prior auth agent", description: "Compile clinical data and submit prior authorization requests in minutes." },
      { title: "Patient intake assistant", description: "Collect history, verify insurance, and prep charts before appointments." },
    ],
    workflows: [
      { title: "Claims processing", description: "Validate codes, check eligibility, and submit claims with minimal manual input." },
      { title: "Clinical trial matching", description: "Match patients to eligible trials based on EHR data and inclusion criteria." },
    ],
    searchExamples: ["Find protocol for drug X dosing adjustments", "What's the formulary status of medication Y?"],
    meta: { title: "Healthcare Solutions — ZUUZ", description: "AI automation that reduces admin burden and improves patient care." },
  },
  {
    slug: "insurance",
    industry: "Insurance",
    tagline: "Underwrite faster, settle smarter",
    description: "Accelerate claims processing, automate underwriting workflows, and improve policyholder experience.",
    icon: "Shield",
    agents: [
      { title: "Claims adjuster agent", description: "Review claims, assess damages from photos, and recommend settlements." },
      { title: "Underwriting assistant", description: "Gather risk data, run models, and prepare quotes in minutes." },
    ],
    workflows: [
      { title: "Policy renewal pipeline", description: "Flag expiring policies, compile loss history, and generate renewal offers." },
      { title: "Fraud detection", description: "Cross-reference claims data, flag anomalies, and route for investigation." },
    ],
    searchExamples: ["What's the loss ratio for commercial auto this year?", "Find all open claims for policyholder ABC"],
    meta: { title: "Insurance Solutions — ZUUZ", description: "Intelligent automation for insurance underwriting and claims." },
  },
  {
    slug: "retail",
    industry: "Retail",
    tagline: "Personalize every touchpoint at scale",
    description: "Automate merchandising, optimize pricing, and deliver personalized customer experiences with AI.",
    icon: "ShoppingBag",
    agents: [
      { title: "Customer service agent", description: "Handle returns, track orders, and resolve issues across channels." },
      { title: "Merchandising assistant", description: "Analyze trends, recommend assortments, and optimize planograms." },
    ],
    workflows: [
      { title: "Dynamic pricing", description: "Adjust prices in real-time based on demand, competition, and inventory." },
      { title: "Campaign orchestration", description: "Segment audiences, personalize offers, and measure lift automatically." },
    ],
    searchExamples: ["What's our best-selling category this month?", "Show me customer feedback for product Z"],
    meta: { title: "Retail Solutions — ZUUZ", description: "AI-powered retail automation for merchandising and customer experience." },
  },
  {
    slug: "logistics",
    industry: "Logistics",
    tagline: "Optimize every mile, every load",
    description: "Route planning, fleet management, and supply chain visibility — powered by intelligent automation.",
    icon: "Package",
    agents: [
      { title: "Route optimization agent", description: "Plan optimal routes considering traffic, weather, and delivery windows." },
      { title: "Fleet compliance agent", description: "Track inspections, certifications, and HOS compliance automatically." },
    ],
    workflows: [
      { title: "Shipment tracking pipeline", description: "Consolidate tracking data from carriers and proactively alert on delays." },
      { title: "Warehouse slotting", description: "Optimize pick paths and slot assignments based on order patterns." },
    ],
    searchExamples: ["Where is shipment #12345 right now?", "Which lanes had the highest damage rate last quarter?"],
    meta: { title: "Logistics Solutions — ZUUZ", description: "Intelligent automation for logistics and supply chain operations." },
  },
  {
    slug: "manufacturing",
    industry: "Manufacturing",
    tagline: "Smarter factories, faster throughput",
    description: "Predict maintenance, optimize production schedules, and reduce quality defects with AI-driven automation.",
    icon: "Factory",
    agents: [
      { title: "Predictive maintenance agent", description: "Analyze sensor data to predict equipment failures before they happen." },
      { title: "Quality inspection agent", description: "Visual inspection of parts using computer vision with real-time defect flagging." },
    ],
    workflows: [
      { title: "Production scheduling", description: "Optimize run sequences based on demand, changeover times, and material availability." },
      { title: "Supplier quality management", description: "Track supplier scorecards, flag issues, and automate corrective actions." },
    ],
    searchExamples: ["What's the OEE for Line 3 this week?", "Find the SOP for changeover on Machine A"],
    meta: { title: "Manufacturing Solutions — ZUUZ", description: "AI automation for smart manufacturing and quality management." },
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

export function getAllSolutionSlugs(): string[] {
  return solutions.map((s) => s.slug);
}
