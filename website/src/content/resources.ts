export interface ResourceItem {
  slug: string;
  title: string;
  description: string;
  meta: { title: string; description: string };
}

export interface ResourceType {
  slug: string;
  label: string;
  description: string;
  icon: string;
  items: ResourceItem[];
}

export const resourceTypes: ResourceType[] = [
  {
    slug: "blog",
    label: "Blog",
    description: "Blog section placeholder.",
    icon: "Newspaper",
    items: [
      { slug: "post-one", title: "Blog post title placeholder", description: "1–2 sentence summary placeholder.", meta: { title: "Blog Post — ZUUZ", description: "Blog post placeholder." } },
      { slug: "post-two", title: "Another blog post placeholder", description: "1–2 sentence summary placeholder.", meta: { title: "Blog Post — ZUUZ", description: "Blog post placeholder." } },
    ],
  },
  {
    slug: "guides",
    label: "Guides",
    description: "Guides section placeholder.",
    icon: "BookOpen",
    items: [
      { slug: "getting-started", title: "Getting started guide placeholder", description: "1–2 sentence summary placeholder.", meta: { title: "Guide — ZUUZ", description: "Guide placeholder." } },
    ],
  },
  {
    slug: "webinars",
    label: "Webinars",
    description: "Webinars section placeholder.",
    icon: "Video",
    items: [
      { slug: "webinar-one", title: "Webinar title placeholder", description: "1–2 sentence summary placeholder.", meta: { title: "Webinar — ZUUZ", description: "Webinar placeholder." } },
    ],
  },
  {
    slug: "docs",
    label: "Documentation",
    description: "Docs section placeholder.",
    icon: "Code",
    items: [
      { slug: "api-reference", title: "API reference placeholder", description: "1–2 sentence summary placeholder.", meta: { title: "API Docs — ZUUZ", description: "Docs placeholder." } },
    ],
  },
];

export function getResourceType(slug: string): ResourceType | undefined {
  return resourceTypes.find((r) => r.slug === slug);
}

export function getResourceItem(typeSlug: string, itemSlug: string): ResourceItem | undefined {
  return getResourceType(typeSlug)?.items.find((i) => i.slug === itemSlug);
}

export function getAllResourceTypeSlugs(): string[] {
  return resourceTypes.map((r) => r.slug);
}

export function getAllResourceItemParams(): { type: string; slug: string }[] {
  return resourceTypes.flatMap((r) => r.items.map((i) => ({ type: r.slug, slug: i.slug })));
}
