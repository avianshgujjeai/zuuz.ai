export interface IndustryManual {
  slug: string;
  title: string;
  summary: string;
  pdfPath: string;
  meta: { title: string; description: string };
}

export const industryManuals: IndustryManual[] = [
  { slug: "healthcare-operations", title: "ZUUZ for Healthcare Operations", summary: "Vendor spend and operational approvals — fast, compliant, auditable.", pdfPath: "/manuals/industries/healthcare-operations.pdf", meta: { title: "Healthcare Operations Manual — ZUUZ", description: "Healthcare operations manual." } },
  { slug: "finance", title: "ZUUZ for Finance", summary: "Spend approvals, policy exceptions, and vendor onboarding with evidence at every step.", pdfPath: "/manuals/industries/finance.pdf", meta: { title: "Finance Manual — ZUUZ", description: "Finance operations manual." } },
  { slug: "manufacturing-procurement-ops", title: "ZUUZ for Manufacturing Procurement & Ops", summary: "Supplier onboarding, MRO spend, and urgent procurement — with compliance and audit.", pdfPath: "/manuals/industries/manufacturing-procurement-ops.pdf", meta: { title: "Manufacturing Manual — ZUUZ", description: "Manufacturing procurement manual." } },
  { slug: "construction-real-estate", title: "ZUUZ for Construction & Real Estate", summary: "Project approvals, vendor management, and compliance workflows.", pdfPath: "/manuals/industries/construction-real-estate.pdf", meta: { title: "Construction & Real Estate Manual — ZUUZ", description: "Construction operations manual." } },
  { slug: "distribution-trading", title: "ZUUZ for Distribution & Trading", summary: "PO approvals, pricing exceptions, and fulfillment operations.", pdfPath: "/manuals/industries/distribution-trading.pdf", meta: { title: "Distribution Manual — ZUUZ", description: "Distribution operations manual." } },
  { slug: "it-services", title: "ZUUZ for IT Services", summary: "Change requests, vendor onboarding, and operational approvals.", pdfPath: "/manuals/industries/it-services.pdf", meta: { title: "IT Services Manual — ZUUZ", description: "IT services operations manual." } },
];

export function getIndustryManual(slug: string): IndustryManual | undefined {
  return industryManuals.find((m) => m.slug === slug);
}

export function getAllIndustryManualSlugs(): string[] {
  return industryManuals.map((m) => m.slug);
}
