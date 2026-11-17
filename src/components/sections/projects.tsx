import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/motion/reveal";
import { featuredProjects } from "@/data/portfolio";
import { ProjectCard } from "@/components/sections/project-card";

/** Full projects listing (used by the /projects page). */
export function Projects() {
  return (
    <Section id="projects" labelledBy="projects-heading">
      <SectionHeading
        eyebrow="Projects"
        title="Featured projects"
        level="h1"
        id="projects-heading"
        description="Five projects, in the order that matters — real client work first. Each card opens a detail page with what was built, the stack, and an honest note on what is and is not verified."
      />
      <div className="mt-10 grid gap-6">
        {featuredProjects.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={Math.min(i * 0.06, 0.24)}
            className="h-full"
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/** Home-page preview: first three projects + link to the full list. */
export function FeaturedProjectsPreview() {
  const preview = featuredProjects.slice(0, 3);
  return (
    <Section id="featured-projects" labelledBy="featured-projects-heading">
      <SectionHeading
        eyebrow="Projects"
        title="Featured projects"
        id="featured-projects-heading"
        description="Real client work first. Each project opens a detail page with what was built, the stack, and an honest note on what is and is not verified."
      />
      <div className="mt-10 grid gap-6">
        {preview.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={Math.min(i * 0.06, 0.18)}
            className="h-full"
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <p className="mt-8">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 font-medium text-accent transition-colors hover:text-accent-hover"
          >
            View all 5 projects
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </p>
      </Reveal>
    </Section>
  );
}
