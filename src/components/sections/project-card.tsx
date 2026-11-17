import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Tilt } from "@/components/motion/tilt";
import type { Project } from "@/data/portfolio";

/**
 * Typographic monogram for the card's visual half — first letters of
 * the first two words ("SH", "SA", "UG", "MQ", "DQ"). No stock image,
 * no invented screenshot: the visual half is type only.
 */
function monogram(name: string): string {
  const words = name.split(/[\s&]+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

/**
 * Shared project card — used on the home preview and /projects.
 *
 * Split layout (2026-11-17): one half is the visual panel — navy,
 * big monogram, context and name — the other half is the detail:
 * description, verified metrics, stack tags and links. The whole
 * card has a subtle 3D tilt on mouse move (see motion/tilt.tsx).
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Tilt className="h-full">
      <article className="group grid h-full overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-200 hover:border-accent/60 hover:shadow-lg md:grid-cols-2">
        <div className="flex flex-col justify-center gap-3 bg-navy px-6 py-8 text-on-navy sm:px-8">
          <span
            aria-hidden="true"
            className="flex size-14 items-center justify-center rounded-lg bg-accent text-xl font-bold tracking-tight text-on-accent"
          >
            {monogram(project.name)}
          </span>
          <p className="text-xs font-semibold uppercase tracking-wide text-on-navy/70">
            {project.context}
          </p>
          <h3 className="text-2xl font-semibold leading-tight tracking-tight">
            {project.name}
          </h3>
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 text-on-navy/60 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-on-navy"
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
          {project.stack.length > 0 ? (
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
          ) : null}
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
    </Tilt>
  );
}
