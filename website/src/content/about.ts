export interface AboutPage {
  slug: string;
  title: string;
  description: string;
  meta: { title: string; description: string };
}

export const aboutPages: AboutPage[] = [
  { slug: "company", title: "Company", description: "Company story placeholder.", meta: { title: "Company — ZUUZ", description: "About page placeholder." } },
  { slug: "careers", title: "Careers", description: "Careers page placeholder.", meta: { title: "Careers — ZUUZ", description: "Careers page placeholder." } },
  { slug: "trust", title: "Trust & Security", description: "Trust page placeholder.", meta: { title: "Trust — ZUUZ", description: "Trust page placeholder." } },
  { slug: "contact", title: "Contact", description: "Contact page placeholder.", meta: { title: "Contact — ZUUZ", description: "Contact page placeholder." } },
];

export function getAboutPage(slug: string): AboutPage | undefined {
  return aboutPages.find((p) => p.slug === slug);
}

export function getAllAboutSlugs(): string[] {
  return aboutPages.map((p) => p.slug);
}
