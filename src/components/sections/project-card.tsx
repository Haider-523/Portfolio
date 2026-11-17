import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Project } from "@/data/portfolio";

/**
 * Typographic monogram for the card's visual header band — first
 * letters of the first two words ("SH", "SA", "UG", "MQ", "DQ").
 * No stock image, no invented screenshot: the band is type only.
 */
function monogram(name: string): string {
  const words = name.split(/[\s&]+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

/** Shared project card — used on the home preview and /projects. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg">
      <div className="flex items-center gap-4 border-b border-border bg-background px-6 py-5">
        <span
          aria-hidden="true"
          className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-navy text-lg font-bold tracking-tight text-on-navy transition-transform duration-200 group-hover:-translate-y-0.5"
        >
          {monogram(project.name)}
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            {project.context}
          </p>
          <h3 className="mt-1 truncate text-xl font-semibold tracking-tight text-navy">
            {project.name}
          </h3>
        </div>
        <ArrowUpRight
          aria-hidden="true"
          className="ml-auto size-5 shrink-0 text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex-1 leading-relaxed text-muted">
          {project.shortDescription}
        </p>
        {project.metrics ? (
          <ul
            className="mt-4 flex flex-wrap gap-2"
            aria-label="Verified results"
          >
            {project.metrics.map((metric) => (
              <li
                key={metric}
                className="rounded-full border border-accent/40 bg-accent/5 px-3 py-1 text-xs font-semibold text-accent"
              >
                {metric}
              </li>
            ))}
          </ul>
        ) : null}
        <ul
          className="mt-4 flex flex-wrap gap-2"
          aria-label="Technologies used"
        >
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors duration-200 hover:border-accent/60 hover:bg-accent/5 hover:text-accent"
            >
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-border pt-4">
          <Link
            href={`/projects/${project.slug}`}
            className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            View case study
            <ArrowRight className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" />
          </Link>
          {project.githubUrl ? (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors duration-200 hover:text-accent"
            >
              <GithubIcon className="size-4" />
              GitHub
            </Link>
          ) : null}
          {project.codeNote ? (
            <span className="text-xs text-muted">{project.codeNote}</span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
