export interface CustomerResult {
  metric: string;
  label: string;
  desc: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  company: string; // kept for legacy compat
  industry: string;
  logo: string; // path to logo image
  stack: string;
  location: string;
  heroSub: string;
  challenge: string;
  solution: string;
  results: CustomerResult[];
  quote: string;
  quoteName: string;
  quotee: string; // legacy compat alias
  quoteeRole: string;
  quoteCompany: string;
  agents: string[];
  connectors: string[];
  meta: { title: string; description: string };
}

export const customers: CaseStudy[] = [
  {
    slug: "western-international",
    name: "Western International Group",
    company: "Western International Group",
    industry: "Distribution & Trading",
    logo: "/logos/western-international.png",
    stack: "SAP + Microsoft 365",
    location: "UAE",
    heroSub:
      "How Western International unified SAP and Microsoft 365 to cut procurement cycle times by 70%.",
    challenge:
      "Western International's operations team managed vendor approvals, purchase orders, and procurement decisions across SAP ERP and Microsoft 365 — but the two systems never talked. Approvals lived in email threads. Context was lost between meetings. Decisions that should take hours were taking days.",
    solution:
      "ZUUZ connected SAP and Microsoft 365 into a single execution workspace. Procurement requests now arrive with a fully assembled Context Pack — SAP inventory data, vendor history, outstanding invoices, and approval thresholds — all in one screen. Approvers act in minutes. Decisions write back to SAP automatically.",
    results: [
      { metric: "70%",  label: "Faster procurement cycles", desc: "Approval time dropped from 3–5 days to under 4 hours" },
      { metric: "100%", label: "Audit coverage",            desc: "Every decision logged with full evidence trail" },
      { metric: "3×",   label: "Faster vendor decisions",   desc: "Context Packs eliminate back-and-forth" },
      { metric: "Zero", label: "Manual re-keying",          desc: "SAP updated automatically on every approved action" },
    ],
    quote:
      "ZUUZ gave us one place to see everything — our SAP data, our emails, our approvals — and act on it without switching systems. Procurement that used to take days now happens before lunch.",
    quoteName: "Senior Operations Director",
    quotee: "Senior Operations Director",
    quoteeRole: "Senior Operations Director",
    quoteCompany: "Western International Group",
    agents: ["Procurement AI Agent", "Document AI Agent", "Evidence Search"],
    connectors: ["SAP", "Microsoft 365", "Outlook", "SharePoint", "Teams"],
    meta: {
      title: "Western International Group Case Study — ZUUZ",
      description:
        "How Western International unified SAP and Microsoft 365 to cut procurement cycle times by 70% with ZUUZ.",
    },
  },
  {
    slug: "nesto-group",
    name: "Nesto Group",
    company: "Nesto Group",
    industry: "Retail & Distribution",
    logo: "/logos/nesto-group.png",
    stack: "SAP + Microsoft 365",
    location: "UAE",
    heroSub:
      "How Nesto Group automated vendor approvals and achieved full compliance coverage across SAP and Microsoft 365.",
    challenge:
      "Nesto's procurement team ran approvals across SAP and Outlook separately — no unified context, no policy enforcement, no audit trail. Compliance reviews were manual. Vendor onboarding took weeks. Leadership had no visibility into where decisions stood.",
    solution:
      "ZUUZ unified Nesto's SAP retail ERP and Microsoft 365 stack. Vendor approvals now route automatically based on spend thresholds, with Context Packs containing budget position, vendor scorecards, prior purchase history, and compliance requirements. Every approved decision writes back to SAP with a complete audit log.",
    results: [
      { metric: "65%",  label: "Reduction in approval time",  desc: "End-to-end procurement cycle cut dramatically" },
      { metric: "100%", label: "Compliance step coverage",    desc: "Zero missed policy checks on any transaction" },
      { metric: "4×",   label: "Faster vendor onboarding",    desc: "Compliance docs assembled automatically" },
      { metric: "Zero", label: "Blind approvals",             desc: "Every decision backed by full evidence" },
    ],
    quote:
      "Before ZUUZ, our procurement team was chasing approvals across SAP and Outlook separately. Now every decision arrives with full context — budget, vendor history, policy flags — all in one screen. It changed how we operate.",
    quoteName: "Head of Procurement",
    quotee: "Head of Procurement",
    quoteeRole: "Head of Procurement",
    quoteCompany: "Nesto Group",
    agents: ["Procurement AI Agent", "Email AI Agent", "Evidence Search"],
    connectors: ["SAP", "Microsoft 365", "Outlook", "Teams", "SharePoint"],
    meta: {
      title: "Nesto Group Case Study — ZUUZ",
      description:
        "How Nesto Group automated vendor approvals and achieved 100% compliance coverage with ZUUZ.",
    },
  },
  {
    slug: "ra-technologies",
    name: "RA Technologies LLC",
    company: "RA Technologies LLC",
    industry: "IT Services",
    logo: "/logos/ra-technologies.png",
    stack: "Zoho CRM + Microsoft 365",
    location: "USA",
    heroSub:
      "How RA Technologies unified Zoho CRM and Microsoft 365 to eliminate manual CRM updates and accelerate deal velocity.",
    challenge:
      "RA Technologies' sales team spent hours every week manually updating Zoho CRM after calls, chasing approvals over email, and losing deal context between systems. Reps were doing admin, not selling. Forecasts were guesswork.",
    solution:
      "ZUUZ connected Zoho CRM with Microsoft 365 — Outlook, Teams, and SharePoint. The Meeting AI Agent now auto-captures every client commitment and syncs it to Zoho. The Email Agent drafts follow-ups and routes approval requests. Sales reps see full deal context without switching tools.",
    results: [
      { metric: "4–6 hrs", label: "Saved per rep per week",  desc: "Zero manual CRM updates after meetings" },
      { metric: "40%",     label: "Faster deal progression", desc: "Follow-ups drafted and sent automatically" },
      { metric: "100%",    label: "Meeting capture rate",    desc: "Every commitment logged and actioned" },
      { metric: "3×",      label: "Pipeline visibility",     desc: "Managers see live deal status in Zoho" },
    ],
    quote:
      "Our reps were spending hours every week updating Zoho after calls and chasing approvals on email. ZUUZ made that invisible. The CRM updates itself, approvals route automatically, and our team just sells.",
    quoteName: "CEO",
    quotee: "CEO",
    quoteeRole: "CEO",
    quoteCompany: "RA Technologies LLC",
    agents: ["Sales AI Agent", "Meeting AI Agent", "Email AI Agent"],
    connectors: ["Zoho CRM", "Microsoft 365", "Outlook", "Teams"],
    meta: {
      title: "RA Technologies LLC Case Study — ZUUZ",
      description:
        "How RA Technologies eliminated manual CRM work and accelerated deal velocity with ZUUZ.",
    },
  },
  {
    slug: "cloud-box",
    name: "Cloud Box Technologies",
    company: "Cloud Box Technologies",
    industry: "IT Services & Cloud",
    logo: "/logos/cloud-box.png",
    stack: "Zoho CRM + Microsoft 365",
    location: "UAE",
    heroSub:
      "How Cloud Box Technologies used ZUUZ to automate document review, meeting follow-ups, and client approval workflows.",
    challenge:
      "Cloud Box consultants were drowning in document review, manual proposal tracking, and missed client follow-ups. Proposals sat unreviewed. SOW risks went unnoticed. Meetings ended without clear action items. The team needed AI that worked with their existing Zoho + Microsoft stack.",
    solution:
      "ZUUZ integrated Zoho CRM and Microsoft 365 into a unified AI workspace. The Document AI Agent reviews proposals and flags contract risks. The Meeting Agent captures every client commitment and routes follow-ups. Vendor and client approval workflows run through ZUUZ with full audit trails.",
    results: [
      { metric: "60%",    label: "Less document review time", desc: "AI flags risks before humans need to read" },
      { metric: "5+ hrs", label: "Saved per consultant/week", desc: "Proposals, contracts, and follow-ups automated" },
      { metric: "100%",   label: "Commitments tracked",       desc: "Every meeting generates structured action items" },
      { metric: "Zero",   label: "Missed contract risks",     desc: "Document Agent reviews every SOW automatically" },
    ],
    quote:
      "ZUUZ connected our Zoho and Microsoft world in ways we didn't think were possible this fast. Proposals get reviewed, contracts get flagged, meetings turn into actions — all without anyone having to remember to do it.",
    quoteName: "Managing Director",
    quotee: "Managing Director",
    quoteeRole: "Managing Director",
    quoteCompany: "Cloud Box Technologies",
    agents: ["Document AI Agent", "Meeting AI Agent", "Email AI Agent", "Procurement AI Agent"],
    connectors: ["Zoho CRM", "Microsoft 365", "Outlook", "Teams", "SharePoint"],
    meta: {
      title: "Cloud Box Technologies Case Study — ZUUZ",
      description:
        "How Cloud Box Technologies automated document review, meeting follow-ups, and approvals with ZUUZ.",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return customers.find((c) => c.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return customers.map((c) => c.slug);
}
