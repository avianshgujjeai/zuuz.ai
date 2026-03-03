export interface AgentWorkflow {
  trigger: string;
  steps: string[];
  output: string;
}

export interface Agent {
  slug: string;
  title: string;
  headline: string;
  oneLiner: string;
  timeSaved: string;
  pain: string;
  fix: string;
  result: string;
  automations: string[];
  workflows: AgentWorkflow[];
  inputs: string[];
  outputs: string[];
  controls: string[];
  meta: { title: string; description: string };
}

export const agents: Agent[] = [
  {
    slug: "sales",
    title: "Sales AI Agent",
    headline: "A Sales AI Agent that closes gaps in your pipeline—before reps even notice them",
    oneLiner: "Keeps your pipeline honest, your follow-ups timely, and your forecasts grounded in real activity.",
    timeSaved: "4–8 hrs/week per rep",
    pain: "Reps spend more time updating CRM fields and chasing stale deals than actually selling. Managers fly blind until QBR prep reveals the damage.",
    fix: "ZUUZ listens to meetings, emails, and CRM changes, then auto-updates deal records, flags risk signals, and drafts next-best-action recommendations.",
    result: "Pipeline hygiene improves without manual effort. Forecasts reflect reality. Reps reclaim hours every week for actual selling.",
    automations: [
      "Post-meeting CRM field updates (stage, next steps, close date)",
      "Stale deal detection and automated nudge to owners",
      "Deal risk scoring based on engagement velocity and stakeholder activity",
      "Follow-up email drafts triggered by meeting outcomes",
      "Next-best-action recommendations per opportunity",
      "Automated weekly pipeline digest for managers",
      "QBR draft generation from live deal and activity data",
      "Contact role mapping from email and calendar signals",
    ],
    workflows: [
      { trigger: "Meeting ends with a prospect", steps: ["Transcribe key points", "Update CRM deal fields", "Draft follow-up email", "Schedule next step"], output: "CRM updated, follow-up sent, next meeting proposed" },
      { trigger: "Deal inactive for 7+ days", steps: ["Check last email/meeting activity", "Score engagement velocity", "Notify rep with context", "Suggest re-engagement action"], output: "Rep alerted with specific re-engagement playbook" },
      { trigger: "QBR due in 5 days", steps: ["Pull pipeline snapshot", "Aggregate win/loss signals", "Generate narrative summary", "Attach supporting evidence"], output: "Draft QBR deck with data-backed insights" },
    ],
    inputs: ["CRM (Salesforce, HubSpot)", "Email (Gmail, Outlook)", "Calendar", "Meeting transcripts", "Slack/Teams messages"],
    outputs: ["Updated deal records", "Follow-up drafts", "Risk alerts", "Pipeline reports", "QBR decks"],
    controls: ["Manager approval for stage changes", "Editable drafts before send", "Full audit trail per deal", "Role-based CRM field access"],
    meta: { title: "Sales AI Agent — ZUUZ", description: "Automate pipeline hygiene, follow-ups, and CRM updates. Keep your forecast grounded in real activity." },
  },
  {
    slug: "procurement",
    title: "Procurement AI Agent",
    headline: "A Procurement AI Agent that moves requests from intake to PO—without the bottleneck",
    oneLiner: "Validates requests, compares vendors, routes approvals, and generates POs so procurement runs at the speed of the business.",
    timeSaved: "5–10 hrs/week per buyer",
    pain: "Purchase requests arrive incomplete, vendor comparisons live in spreadsheets, approvals stall in email threads, and PO creation is a manual copy-paste exercise.",
    fix: "ZUUZ takes intake forms, validates completeness, runs vendor comparisons against contracted rates, routes for approval based on spend thresholds, and generates POs automatically.",
    result: "Procurement cycle time drops from days to hours. Compliance is built in. Buyers focus on strategic sourcing instead of chasing signatures.",
    automations: [
      "Intake form validation and completeness checks",
      "Vendor comparison against contracted rates and scorecards",
      "Approval routing by spend threshold and category",
      "Automated PO generation from approved requests",
      "SLA tracking and follow-up on pending approvals",
      "Budget impact analysis before approval",
      "Duplicate request detection",
      "Supplier performance tracking and flag surfacing",
    ],
    workflows: [
      { trigger: "New purchase request submitted", steps: ["Validate required fields", "Match to existing contracts", "Compare vendor options", "Route to approver by spend tier"], output: "Approved request ready for PO generation" },
      { trigger: "Approval pending for 48+ hours", steps: ["Check approver availability", "Send escalation with context", "Offer delegate approval option"], output: "Approval unblocked or escalated to backup" },
      { trigger: "PO approved", steps: ["Generate PO document", "Attach terms and conditions", "Send to vendor", "Update budget tracker"], output: "PO issued, vendor notified, budget updated" },
    ],
    inputs: ["ERP (SAP, Oracle, NetSuite)", "Intake forms", "Vendor databases", "Contract repositories", "Email"],
    outputs: ["Validated requests", "Vendor comparisons", "Purchase orders", "Budget reports", "SLA dashboards"],
    controls: ["Spend-tier approval gates", "Contract compliance checks", "Audit trail per purchase", "Role-based spending limits"],
    meta: { title: "Procurement AI Agent — ZUUZ", description: "Automate procurement from intake to PO. Validate, compare, route, and generate—without the bottleneck." },
  },
  {
    slug: "email",
    title: "Email AI Agent",
    headline: "An Email AI Agent that triages, drafts, and acts—so your inbox runs itself",
    oneLiner: "Classifies inbound email, summarizes long threads, drafts replies, and routes actionable items to the right systems.",
    timeSaved: "3–6 hrs/week per user",
    pain: "Knowledge workers spend 28% of their week on email. Critical requests get buried. Follow-ups slip. Context gets lost between threads and tools.",
    fix: "ZUUZ reads incoming email, classifies intent, summarizes threads, drafts contextual replies, creates tickets or leads in downstream systems, and routes items to the right owner.",
    result: "Response times shrink. Nothing falls through the cracks. Your inbox becomes an orchestration layer, not a time sink.",
    automations: [
      "Inbound email classification by intent (request, FYI, approval, complaint)",
      "Thread summarization for long multi-party conversations",
      "Contextual reply drafting based on tone and history",
      "Auto-creation of tickets in Jira/ServiceNow from email requests",
      "Lead capture from inbound emails to CRM",
      "Routing to correct owner based on topic and urgency",
      "Weekly email digest with unresolved items",
      "Follow-up reminders for sent emails without replies",
    ],
    workflows: [
      { trigger: "New email matches support request pattern", steps: ["Extract request details", "Check for existing ticket", "Create or update ticket", "Draft acknowledgment reply"], output: "Ticket created, sender acknowledged, owner notified" },
      { trigger: "Thread exceeds 10 messages", steps: ["Summarize key points and decisions", "Identify open action items", "Surface to thread participants"], output: "Summary delivered with clear next steps" },
      { trigger: "Sent email unanswered for 3+ days", steps: ["Check recipient activity signals", "Draft polite follow-up", "Queue for review or auto-send"], output: "Follow-up sent or queued for approval" },
    ],
    inputs: ["Email (Gmail, Outlook)", "CRM", "Ticketing systems", "Calendar", "Contacts database"],
    outputs: ["Drafted replies", "Tickets/leads", "Thread summaries", "Routing decisions", "Follow-up reminders"],
    controls: ["Draft review before send", "Classification confidence thresholds", "Per-user routing rules", "Audit log of all actions"],
    meta: { title: "Email AI Agent — ZUUZ", description: "Automate email triage, drafting, and routing. Turn your inbox into an orchestration layer." },
  },
  {
    slug: "documents",
    title: "Document AI Agent",
    headline: "A Document AI Agent that reads, extracts, and tracks—so nothing gets missed in the fine print",
    oneLiner: "Extracts key clauses, surfaces risks, tracks versions, and routes documents for approval without manual review bottlenecks.",
    timeSaved: "6–12 hrs/week per analyst",
    pain: "Teams manually review contracts, policies, and SOWs for key terms. Version tracking lives in filenames. Redline suggestions require hours of side-by-side comparison.",
    fix: "ZUUZ reads documents, extracts structured data from clauses, compares against standard terms, suggests redlines, tracks version history, and routes for signature.",
    result: "Review cycles compress from days to hours. Standard terms get enforced automatically. Analysts focus on judgment calls, not data extraction.",
    automations: [
      "Clause extraction from contracts and policies",
      "Key term and obligation identification",
      "Redline suggestions against standard playbook",
      "Version comparison and change tracking",
      "Approval routing by document type and value",
      "Expiration and renewal date tracking",
      "Obligation deadline alerts",
      "Structured data export to CLM/ERP systems",
    ],
    workflows: [
      { trigger: "New contract uploaded for review", steps: ["Extract key clauses", "Compare against playbook", "Flag deviations", "Generate redline suggestions"], output: "Annotated contract with flagged risks and suggested edits" },
      { trigger: "Contract approaching renewal date", steps: ["Pull current terms and performance data", "Compare to market benchmarks", "Draft renewal brief", "Route to owner"], output: "Renewal brief with recommendation delivered to owner" },
      { trigger: "Policy document updated", steps: ["Diff against previous version", "Highlight material changes", "Notify affected teams", "Update compliance tracker"], output: "Change summary distributed, compliance log updated" },
    ],
    inputs: ["Document repositories (SharePoint, Drive, Box)", "CLM systems", "Email attachments", "ERP/finance systems"],
    outputs: ["Extracted clause data", "Redline suggestions", "Version diffs", "Approval workflows", "Deadline alerts"],
    controls: ["Playbook compliance enforcement", "Reviewer approval gates", "Version lock on finalized docs", "Complete audit trail"],
    meta: { title: "Document AI Agent — ZUUZ", description: "Automate contract review, clause extraction, and document tracking. Nothing gets missed in the fine print." },
  },
  {
    slug: "meetings",
    title: "Meeting AI Agent",
    headline: "A Meeting AI Agent that captures decisions and drives follow-through—not just notes",
    oneLiner: "Turns every meeting into structured outcomes: decisions logged, action items assigned, systems updated, follow-ups tracked.",
    timeSaved: "3–5 hrs/week per manager",
    pain: "Meetings generate decisions and commitments that vanish into memory. Action items live in personal notes. Systems don't get updated until someone remembers—or doesn't.",
    fix: "ZUUZ joins meetings, captures agenda items, logs decisions, assigns action items to owners, updates project tools, and sends follow-through reminders until tasks close.",
    result: "Every meeting produces a clear record. Nothing agreed upon gets lost. Downstream systems stay current without manual updates.",
    automations: [
      "Real-time agenda tracking and topic detection",
      "Decision capture with attribution",
      "Action item extraction and owner assignment",
      "Auto-update of project tools (Jira, Asana, Monday)",
      "Follow-through reminders until items are resolved",
      "Meeting summary generation with key outcomes",
      "Recurring meeting trend analysis",
      "Attendee participation and sentiment signals",
    ],
    workflows: [
      { trigger: "Scheduled meeting begins", steps: ["Join and listen", "Track agenda topics", "Log decisions and owners", "Extract action items"], output: "Structured meeting record with assigned action items" },
      { trigger: "Meeting ends", steps: ["Generate summary", "Create tasks in project tools", "Send recap to attendees", "Schedule follow-up check"], output: "Summary sent, tasks created, follow-up scheduled" },
      { trigger: "Action item overdue by 2+ days", steps: ["Check task status", "Ping owner with context", "Escalate if still unresolved"], output: "Owner reminded or manager notified" },
    ],
    inputs: ["Calendar (Google, Outlook)", "Meeting platforms (Zoom, Teams, Meet)", "Project tools (Jira, Asana)", "Slack/Teams"],
    outputs: ["Meeting summaries", "Action items", "Task updates", "Follow-up reminders", "Trend reports"],
    controls: ["Opt-in recording consent", "Editable summaries before distribution", "Role-based access to transcripts", "Retention policies"],
    meta: { title: "Meeting AI Agent — ZUUZ", description: "Turn meetings into structured outcomes. Decisions logged, actions assigned, follow-through tracked." },
  },
  {
    slug: "hr",
    title: "HR AI Agent",
    headline: "An HR AI Agent that handles the repetitive work—so People teams can focus on people",
    oneLiner: "Automates onboarding checklists, policy Q&A, leave workflows, and benefits routing so HR scales without scaling headcount.",
    timeSaved: "8–15 hrs/week per HR generalist",
    pain: "HR teams drown in repetitive requests: onboarding checklists, policy lookups, leave approvals, and benefits questions. Every new hire means the same manual workflow.",
    fix: "ZUUZ automates the entire employee lifecycle—from onboarding task orchestration to policy Q&A, leave routing, and offboarding checklists—using your existing HRIS and policies.",
    result: "New hires are productive faster. Common questions get instant answers. HR generalists reclaim hours for strategic work like retention and culture.",
    automations: [
      "Onboarding checklist orchestration across IT, Facilities, and Manager",
      "Offboarding task automation (access revocation, equipment return, exit survey)",
      "Policy Q&A from HR knowledge base with source citations",
      "Leave request routing by type, tenure, and manager",
      "Benefits enrollment guidance and deadline reminders",
      "Payroll query routing to correct specialist",
      "Employee data change requests (address, banking, emergency contacts)",
      "Compliance training tracking and nudges",
      "New hire 30/60/90 check-in scheduling",
    ],
    workflows: [
      { trigger: "New hire start date confirmed", steps: ["Generate onboarding checklist", "Assign IT provisioning tasks", "Schedule orientation meetings", "Send welcome packet", "Trigger 30-day check-in"], output: "New hire fully onboarded with all systems provisioned" },
      { trigger: "Employee submits leave request", steps: ["Validate accrual balance", "Check team coverage", "Route to manager", "Update calendar on approval"], output: "Leave approved/denied with calendar updated" },
      { trigger: "Employee asks a policy question", steps: ["Search HR knowledge base", "Generate answer with source citation", "Escalate if confidence is low"], output: "Instant answer or routed to HR specialist" },
    ],
    inputs: ["HRIS (Workday, BambooHR, ADP)", "IT ticketing", "Email", "Slack/Teams", "Knowledge base"],
    outputs: ["Onboarding/offboarding checklists", "Policy answers", "Leave approvals", "Benefits guidance", "Compliance reports"],
    controls: ["Manager approval chains", "Policy version enforcement", "Sensitive data access controls", "Full audit trail for compliance"],
    meta: { title: "HR AI Agent — ZUUZ", description: "Automate onboarding, policy Q&A, leave workflows, and more. Scale HR without scaling headcount." },
  },
  {
    slug: "legal",
    title: "Legal AI Agent",
    headline: "A Legal AI Agent that accelerates review cycles—without cutting corners on risk",
    oneLiner: "Handles intake, runs contracts against your playbook, flags deviations, and routes for approval so legal keeps pace with the business.",
    timeSaved: "5–10 hrs/week per counsel",
    pain: "Legal teams are the bottleneck they don't want to be. Contracts arrive without context, reviews are manual and sequential, and playbook compliance is checked by memory, not automation.",
    fix: "ZUUZ automates legal intake, runs contracts against your approved playbook, flags risk terms, and routes through your approval chain—with full evidence trails for every decision.",
    result: "Review cycles shrink from weeks to days. Playbook compliance is enforced systematically. Legal becomes an accelerator, not a bottleneck.",
    automations: [
      "Legal request intake and prioritization",
      "Contract comparison against approved playbook",
      "Risk term identification and severity scoring",
      "Deviation flagging with suggested alternative language",
      "Approval routing by contract type and value",
      "E-signature handoff preparation",
      "Contract status tracking and stakeholder updates",
      "Clause library search and insertion",
      "Obligation tracking and deadline management",
    ],
    workflows: [
      { trigger: "New contract submitted for review", steps: ["Classify contract type", "Run against playbook", "Flag deviations with risk scores", "Route to assigned counsel"], output: "Pre-reviewed contract with flagged issues and risk assessment" },
      { trigger: "Contract approved", steps: ["Prepare for e-signature", "Route to signatories", "Track completion", "Archive with metadata"], output: "Contract executed, archived, and obligations tracked" },
      { trigger: "Obligation deadline approaching", steps: ["Alert responsible party", "Surface contract context", "Track acknowledgment"], output: "Obligation addressed before deadline" },
    ],
    inputs: ["Contract repositories", "Playbook/clause library", "Email", "CLM systems", "E-signature platforms (DocuSign, Adobe Sign)"],
    outputs: ["Risk assessments", "Deviation reports", "Approval workflows", "Signature-ready documents", "Obligation trackers"],
    controls: ["Playbook-first enforcement", "Counsel approval gates", "Privileged information handling", "Immutable audit trail"],
    meta: { title: "Legal AI Agent — ZUUZ", description: "Accelerate contract review cycles. Automate intake, playbook compliance, and approval routing." },
  },
  {
    slug: "logistics",
    title: "Logistics AI Agent",
    headline: "A Logistics AI Agent that tracks, flags, and resolves—before exceptions become emergencies",
    oneLiner: "Monitors shipments in real time, flags exceptions before they escalate, automates ETA communications, and coordinates inventory adjustments.",
    timeSaved: "4–8 hrs/week per coordinator",
    pain: "Logistics coordinators spend their days checking carrier portals, emailing ETAs, handling exception reports, and manually coordinating inventory adjustments when shipments go off track.",
    fix: "ZUUZ monitors shipments across carriers, detects exceptions in real time, auto-communicates ETAs to stakeholders, and triggers inventory coordination workflows when disruptions occur.",
    result: "Exceptions are caught early. Stakeholders get proactive updates. Coordinators focus on strategic logistics, not status checks.",
    automations: [
      "Multi-carrier shipment status monitoring",
      "Exception detection (delays, damage, holds) with severity scoring",
      "Automated ETA communication to internal and external stakeholders",
      "Inventory reallocation triggers on shipment disruptions",
      "Claims workflow initiation for damaged or lost shipments",
      "Carrier performance scorecarding",
      "Customs documentation status tracking",
      "Delivery confirmation and proof-of-delivery capture",
      "Cost variance flagging against quoted rates",
    ],
    workflows: [
      { trigger: "Shipment delay detected", steps: ["Assess delay severity and impact", "Notify affected stakeholders", "Calculate revised ETA", "Trigger inventory adjustment if critical"], output: "Stakeholders informed, inventory plan updated, exception logged" },
      { trigger: "Delivery confirmed", steps: ["Capture proof of delivery", "Update inventory system", "Close shipment record", "Flag any discrepancies"], output: "Shipment closed, inventory current, discrepancies flagged" },
      { trigger: "Damage report filed", steps: ["Initiate claims workflow", "Gather supporting documentation", "Notify carrier and insurance", "Track resolution"], output: "Claim filed with evidence, resolution tracked to closure" },
    ],
    inputs: ["TMS/WMS systems", "Carrier APIs and portals", "ERP/inventory systems", "Email", "IoT sensors (if available)"],
    outputs: ["Shipment status dashboards", "Exception alerts", "ETA notifications", "Claims documents", "Performance reports"],
    controls: ["Escalation thresholds by severity", "Stakeholder notification rules", "Claims approval workflow", "Full shipment audit trail"],
    meta: { title: "Logistics AI Agent — ZUUZ", description: "Monitor shipments, flag exceptions, automate ETAs, and coordinate inventory adjustments in real time." },
  },
];

export function getAgent(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

export function getAllAgentSlugs(): string[] {
  return agents.map((a) => a.slug);
}
