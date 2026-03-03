"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, FileText, BookOpen, Building2, Download, ArrowRight, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  getAllResources,
  type ResourceCategory,
  type UnifiedResource,
} from "@/content/resources";

const allResources = getAllResources();

const tabs = [
  { id: "all", label: "All", icon: <Search className="h-3.5 w-3.5" /> },
  { id: "blog", label: "Blog", icon: <FileText className="h-3.5 w-3.5" /> },
  { id: "manuals", label: "Manuals", icon: <BookOpen className="h-3.5 w-3.5" /> },
  { id: "industry", label: "Industry Guides", icon: <Building2 className="h-3.5 w-3.5" /> },
];

const categoryLabels: Record<ResourceCategory, string> = {
  blog: "Blog",
  manuals: "Manual",
  industry: "Industry Guide",
};

const categoryIcons: Record<ResourceCategory, typeof FileText> = {
  blog: FileText,
  manuals: BookOpen,
  industry: Building2,
};

function ResourceCard({ resource }: { resource: UnifiedResource }) {
  const Icon = categoryIcons[resource.category];
  const isPdf = resource.category !== "blog";

  return (
    <Link
      href={resource.href}
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:-translate-y-px h-full"
    >
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="outline" className="gap-1">
          <Icon className="h-3 w-3" />
          {categoryLabels[resource.category]}
        </Badge>
        {isPdf && <Download className="h-3.5 w-3.5 text-muted-foreground" />}
      </div>

      <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
        {resource.title}
      </h3>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
        {resource.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {resource.date && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(resource.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          )}
          {resource.readingTime && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {resource.readingTime}
            </span>
          )}
        </div>
        <ArrowRight className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {resource.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5 pt-3 border-t border-border">
          {resource.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

export function ResourcesHub() {
  const [query, setQuery] = useState("");

  const filteredByQuery = useMemo(() => {
    if (!query.trim()) return allResources;
    const q = query.toLowerCase();
    return allResources.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <div>
      {/* Search */}
      <div className="mb-8 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search resources by title, topic, or tag…"
          className={cn(
            "w-full h-11 rounded-xl border border-border bg-background pl-10 pr-4 text-sm",
            "placeholder:text-muted-foreground/60",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/15",
            "transition-shadow duration-150",
          )}
          aria-label="Search resources"
        />
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} defaultTab="all">
        {(activeTab) => {
          const filtered = activeTab === "all"
            ? filteredByQuery
            : filteredByQuery.filter((r) => r.category === activeTab);

          if (filtered.length === 0) {
            return (
              <div className="py-16 text-center">
                <p className="text-sm text-muted-foreground">No resources found matching your search.</p>
              </div>
            );
          }

          return (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((resource) => (
                <ResourceCard key={`${resource.category}-${resource.slug}`} resource={resource} />
              ))}
            </div>
          );
        }}
      </Tabs>
    </div>
  );
}
