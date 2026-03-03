"use client";

import { useState } from "react";
import { MapPin, Clock, ChevronDown, CheckCircle2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Job } from "@/content/about";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button
        className="flex w-full items-center justify-between gap-4 p-6 text-left hover:bg-muted/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div>
          <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{job.type}</span>
            <Badge variant={job.region === "USA" ? "primary" : "accent"}>{job.region}</Badge>
          </div>
        </div>
        <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="border-t border-border p-6 space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">What you&apos;ll do</h4>
            <ul className="space-y-2">
              {job.whatYoullDo.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">What we&apos;re looking for</h4>
            <ul className="space-y-2">
              {job.whatWereLookingFor.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Bonus</h4>
            <ul className="space-y-2">
              {job.bonus.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Button asChild>
            <a href={`mailto:careers@zuuz.ai?subject=Application: ${job.title}`}>
              Apply for this role
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
