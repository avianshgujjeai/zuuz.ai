export interface Solution {
  slug: string;
  industry: string;
  description: string;
  icon: string;
  meta: { title: string; description: string };
}

export const solutions: Solution[] = [
  { slug: "it-services", industry: "IT Services", description: "Industry solution placeholder.", icon: "Server", meta: { title: "IT Services — ZUUZ", description: "Solution page placeholder." } },
  { slug: "distribution", industry: "Distribution", description: "Industry solution placeholder.", icon: "Truck", meta: { title: "Distribution — ZUUZ", description: "Solution page placeholder." } },
  { slug: "financial-services", industry: "Financial Services", description: "Industry solution placeholder.", icon: "Landmark", meta: { title: "Financial Services — ZUUZ", description: "Solution page placeholder." } },
  { slug: "healthcare", industry: "Healthcare", description: "Industry solution placeholder.", icon: "Heart", meta: { title: "Healthcare — ZUUZ", description: "Solution page placeholder." } },
  { slug: "insurance", industry: "Insurance", description: "Industry solution placeholder.", icon: "Shield", meta: { title: "Insurance — ZUUZ", description: "Solution page placeholder." } },
  { slug: "retail", industry: "Retail", description: "Industry solution placeholder.", icon: "ShoppingBag", meta: { title: "Retail — ZUUZ", description: "Solution page placeholder." } },
  { slug: "logistics", industry: "Logistics", description: "Industry solution placeholder.", icon: "Package", meta: { title: "Logistics — ZUUZ", description: "Solution page placeholder." } },
  { slug: "manufacturing", industry: "Manufacturing", description: "Industry solution placeholder.", icon: "Factory", meta: { title: "Manufacturing — ZUUZ", description: "Solution page placeholder." } },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

export function getAllSolutionSlugs(): string[] {
  return solutions.map((s) => s.slug);
}
