import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Tilt } from "@/components/motion/tilt";
import { profile, type Project } from "@/data/portfolio";

/**
 * Typographic monogram for the card's visual half when a project has
 * no image — first letters of the first two words ("SH", "SA", "UG",
 * "MQ", "DQ"). Projects with a dashboard image use the image instead;
 * generated mockups carry a "Mockup" badge so they are never mistaken
 * for real screenshots.
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
 * Split layout (2026-11-17): one half is the visual panel — the
 * project's dashboard image (an exact LinkedIn screenshot copy, or a
 * labelled mockup), with context and name overlaid — the other half
 * is the detail: description, verified metrics, stack tags and links.
 * The card tilts gently in 3D on mouse move (max 4deg, desktop
 * only — see components/motion/tilt.tsx), lifts on hover, and its
 * image zooms slightly; the tilt was removed once (23 Nov,
 * voice-note feedback: "keep it static") and is back at Haider's
 * request (26 Nov) for visible, professional 3D. Projects without
 * an image fall back to the navy panel with the monogram.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Tilt className="h-full">
      <article className="group grid h-full overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg md:grid-cols-2">
        {/* Visual half — clicking it opens the LinkedIn post for
            this project, or Haider's profile where there is no
            post. The case-study link stays in the row below. */}
        <a
          href={project.imagePostUrl ?? profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.name} on LinkedIn`}
          className="relative flex min-h-56 flex-col justify-end overflow-hidden bg-navy px-6 py-8 text-white sm:px-8 md:min-h-full"
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.imageAlt ?? `${project.name} dashboard`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <span
              aria-hidden="true"
              className="absolute left-6 top-8 flex size-14 items-center justify-center rounded-lg bg-accent text-xl font-bold tracking-tight text-on-accent sm:left-8"
            >
              {monogram(project.name)}
            </span>
          )}
          {project.imageSource === "mockup" ? (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white">
              Mockup
            </span>
          ) : null}
          {project.image ? (
            <div
              aria-hidden="true"
              // Dark enough for the white overlay text (context +
              // name) to read on light screenshots too — UniGuide's
              // light-blue image left the "PRESENTED AT SOFTEC '26"
              // label unreadable against its own headline (live
              // visual check, 26 Nov), because the old gradient was
              // only black/10 at the top.
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/35"
            />
          ) : null}
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/75">
              {project.context}
            </p>
            <h3 className="mt-1 text-2xl font-semibold leading-tight tracking-tight">
              {project.name}
            </h3>
            <ArrowUpRight
              aria-hidden="true"
              className="mt-3 size-5 text-white/70 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
            />
          </div>
        </a>
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
            <Link
              href={project.imagePostUrl ?? profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors duration-200 hover:text-accent"
            >
              <LinkedinIcon className="size-4" />
              LinkedIn
            </Link>
          </div>
        </div>
      </article>
    </Tilt>
  );
}
