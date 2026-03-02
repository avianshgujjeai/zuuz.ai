export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface Value {
  title: string;
  description: string;
  icon: string;
}

export interface AboutPage {
  slug: string;
  title: string;
  description: string;
  meta: { title: string; description: string };
}

export const values: Value[] = [
  { title: "Customer obsession", description: "Every decision starts with the customer's problem. We ship what matters.", icon: "Heart" },
  { title: "Bias for action", description: "We move fast, learn quickly, and iterate relentlessly.", icon: "Zap" },
  { title: "Radical transparency", description: "Open roadmaps, honest communication, and no surprises.", icon: "Eye" },
  { title: "Craft over hype", description: "We build things that work — reliably, securely, and at scale.", icon: "Gem" },
  { title: "Trust by default", description: "Security, privacy, and compliance are foundations, not afterthoughts.", icon: "ShieldCheck" },
  { title: "Compounding knowledge", description: "We document, share, and build on everything we learn.", icon: "BookOpen" },
];

export const team: TeamMember[] = [
  { name: "Alex Rivera", role: "Co-Founder & CEO", bio: "Previously led AI platform at a Fortune 500 tech company. MIT CS." },
  { name: "Priya Sharma", role: "Co-Founder & CTO", bio: "Former principal engineer at a leading cloud provider. Built systems serving 100M+ users." },
  { name: "Marcus Johnson", role: "VP Engineering", bio: "Scaled engineering orgs from 10 to 200. Previously at two successful enterprise SaaS exits." },
  { name: "Elena Vasquez", role: "VP Product", bio: "10 years in enterprise product. Led the team behind a category-defining workflow product." },
  { name: "David Park", role: "Head of Design", bio: "Design lead for products used by millions. Believes great enterprise software can be delightful." },
  { name: "Amara Okafor", role: "Head of Customer Success", bio: "Built CS orgs from scratch at two unicorn startups. Customer retention is her superpower." },
];

export const aboutPages: AboutPage[] = [
  {
    slug: "company",
    title: "Our Story",
    description: "We started ZUUZ because we saw enterprises drowning in tools but starving for intelligence. Our mission is to make every organization smarter by connecting AI agents, workflows, and search into a unified platform.",
    meta: { title: "Our Story — ZUUZ", description: "The story behind ZUUZ and our mission to make every organization smarter." },
  },
  {
    slug: "careers",
    title: "Careers",
    description: "We're building the operating system for intelligent enterprises. Join a team of exceptional engineers, designers, and operators tackling hard problems with real impact.",
    meta: { title: "Careers — ZUUZ", description: "Join the team building the future of intelligent enterprise automation." },
  },
  {
    slug: "trust",
    title: "Trust & Security",
    description: "Enterprise-grade security is not a feature — it's how we build. SOC 2 Type II certified, HIPAA compliant, with end-to-end encryption and granular access controls.",
    meta: { title: "Trust & Security — ZUUZ", description: "Enterprise-grade security, compliance, and privacy at ZUUZ." },
  },
  {
    slug: "contact",
    title: "Contact Us",
    description: "Have a question or want to see ZUUZ in action? Reach out and we'll connect you with the right team.",
    meta: { title: "Contact — ZUUZ", description: "Get in touch with the ZUUZ team." },
  },
];

export function getAboutPage(slug: string): AboutPage | undefined {
  return aboutPages.find((p) => p.slug === slug);
}

export function getAllAboutSlugs(): string[] {
  return aboutPages.map((p) => p.slug);
}
