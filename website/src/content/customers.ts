export interface CaseStudy {
  slug: string;
  company: string;
  industry: string;
  logo: string;
  quote: string;
  quotee: string;
  quoteeRole: string;
  meta: { title: string; description: string };
}

export const customers: CaseStudy[] = [
  { slug: "techcorp-global", company: "TechCorp Global", industry: "IT Services", logo: "TC", quote: "Testimonial quote placeholder.", quotee: "Name Placeholder", quoteeRole: "Title Placeholder", meta: { title: "TechCorp Case Study — ZUUZ", description: "Case study placeholder." } },
  { slug: "mediflow-health", company: "MediFlow Health", industry: "Healthcare", logo: "MF", quote: "Testimonial quote placeholder.", quotee: "Name Placeholder", quoteeRole: "Title Placeholder", meta: { title: "MediFlow Case Study — ZUUZ", description: "Case study placeholder." } },
  { slug: "distributex", company: "DistributeX", industry: "Distribution", logo: "DX", quote: "Testimonial quote placeholder.", quotee: "Name Placeholder", quoteeRole: "Title Placeholder", meta: { title: "DistributeX Case Study — ZUUZ", description: "Case study placeholder." } },
  { slug: "financehub", company: "FinanceHub", industry: "Financial Services", logo: "FH", quote: "Testimonial quote placeholder.", quotee: "Name Placeholder", quoteeRole: "Title Placeholder", meta: { title: "FinanceHub Case Study — ZUUZ", description: "Case study placeholder." } },
  { slug: "retailplus", company: "RetailPlus", industry: "Retail", logo: "R+", quote: "Testimonial quote placeholder.", quotee: "Name Placeholder", quoteeRole: "Title Placeholder", meta: { title: "RetailPlus Case Study — ZUUZ", description: "Case study placeholder." } },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return customers.find((c) => c.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return customers.map((c) => c.slug);
}
