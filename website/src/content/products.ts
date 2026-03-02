export interface Product {
  slug: string;
  title: string;
  description: string;
  icon: string;
  meta: { title: string; description: string };
}

export const products: Product[] = [
  {
    slug: "agents",
    title: "AI Agents",
    description: "1–2 sentence product description placeholder.",
    icon: "Bot",
    meta: { title: "AI Agents — ZUUZ", description: "Product page description placeholder." },
  },
  {
    slug: "workflows",
    title: "Workflows",
    description: "1–2 sentence product description placeholder.",
    icon: "GitBranch",
    meta: { title: "Workflows — ZUUZ", description: "Product page description placeholder." },
  },
  {
    slug: "unified-search",
    title: "Unified Search",
    description: "1–2 sentence product description placeholder.",
    icon: "Search",
    meta: { title: "Unified Search — ZUUZ", description: "Product page description placeholder." },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
