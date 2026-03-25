import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { getBlogPost, getAllBlogSlugs, blogPosts } from "@/content/resources";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { CTA } from "@/components/ui/cta";
import { FadeIn } from "@/components/ui/fade-in";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const base: Metadata = {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://www.zuuz.ai/resources/blog/${slug}` },
    openGraph: {
      type: "article",
      authors: ["ZUUZ"],
      tags: post.tags,
    },
  };
  if (slug === "agentic-ai-explained") {
    return {
      ...base,
      title: "Agentic AI Explained: What It Means for Enterprise Operations",
      openGraph: {
        ...base.openGraph,
        type: "article",
        publishedTime: "2026-02-15T00:00:00Z",
        authors: ["ZUUZ"],
        tags: ["Agentic AI", "Enterprise AI", "AI Automation"],
      },
    };
  }
  return base;
}

function readMdxBody(slug: string): string | null {
  try {
    const filePath = path.join(process.cwd(), "content", "resources", "blog", `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, "utf-8");
    const fmEnd = raw.indexOf("---", 3);
    if (fmEnd === -1) return raw;
    return raw.slice(fmEnd + 3).trim();
  } catch {
    return null;
  }
}

function markdownToHtml(md: string): string {
  let html = md;
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

  const blocks = html.split(/\n\n+/);
  html = blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<h") || trimmed.startsWith("<ul") || trimmed.startsWith("<ol")) return trimmed;
      return `<p>${trimmed}</p>`;
    })
    .join("\n");

  return html;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const body = readMdxBody(slug);
  const related = blogPosts
    .filter((p) => p.slug !== slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: { "@type": "Organization", name: "ZUUZ" },
            publisher: { "@type": "Organization", name: "ZUUZ", url: "https://www.zuuz.ai" },
            url: `https://www.zuuz.ai/resources/blog/${slug}`,
          }),
        }}
      />
      <section className="relative overflow-hidden pt-12 pb-16 bg-hero-glow">
        <div className="absolute inset-0 bg-grid opacity-[0.3]" aria-hidden="true" />
        <Container className="relative">
          <Breadcrumbs items={[
            { label: "Resources", href: "/resources" },
            { label: "Blog" },
            { label: post.title },
          ]} />
          <FadeIn>
            <Badge variant="primary" className="mb-4">Blog</Badge>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance max-w-3xl leading-[1.1]">
              {post.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {post.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
              {post.readingTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readingTime}
                </span>
              )}
              {post.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            {body ? (
              <article
                className="prose prose-slate max-w-none prose-headings:font-display prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(body) }}
              />
            ) : (
              <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
                <p className="text-sm text-muted-foreground">
                  Blog content placeholder — MDX file not found.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="py-16 bg-muted/30">
        <Container>
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/resources">
                <ArrowLeft className="h-4 w-4" />
                Back to Resources
              </Link>
            </Button>
          </div>

          {related.length > 0 && (
            <>
              <FadeIn>
                <h2 className="font-display text-2xl font-bold text-foreground mb-8">Related posts</h2>
              </FadeIn>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r, i) => (
                  <FadeIn key={r.slug} delay={i * 0.08}>
                    <Card href={`/resources/blog/${r.slug}`} className="h-full flex flex-col">
                      <Badge variant="outline" className="mb-3 self-start">Blog</Badge>
                      <CardTitle className="text-base">{r.title}</CardTitle>
                      <CardDescription className="mt-2 flex-1">{r.description}</CardDescription>
                    </Card>
                  </FadeIn>
                ))}
              </div>
            </>
          )}
        </Container>
      </section>

      <CTA />
    </>
  );
}
