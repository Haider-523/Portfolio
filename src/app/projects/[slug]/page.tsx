import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { featuredProjects, getProjectBySlug } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { siteUrl } from "@/lib/site";

/**
 * Project detail pages — one static route per featured project.
 * Next 16: `params` is a Promise; await it (see
 * node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.md).
 */
export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found | Haider Zaman" };
  const url = `${siteUrl}/projects/${project.slug}`;
  return {
    title: `${project.name} | Haider Zaman`,
    description: project.shortDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.name} | Haider Zaman`,
      description: project.shortDescription,
      url,
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${project.name} — Haider Zaman`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Haider Zaman`,
      description: project.shortDescription,
      images: ["/images/og-image.jpg"],
    },
  };
}

function DetailBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-navy">
        {title}
      </h2>
      <div className="mt-3 leading-relaxed text-muted">{children}</div>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const index = featuredProjects.findIndex((p) => p.slug === slug);
  const next = featuredProjects[(index + 1) % featuredProjects.length];

  return (
    <article className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <p>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-1" />
          All projects
        </Link>
      </p>

      <p className="mt-8 flex items-center gap-2 text-sm font-medium text-navy">
        <span aria-hidden="true" className="inline-block size-2 bg-navy" />
        {project.context}
      </p>
      <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl">
        {project.name}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
        {project.overview}
      </p>

      {project.stack.length > 0 ? (
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/60 hover:bg-accent/5 hover:text-accent "
          >
            {tech}
          </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {project.githubUrl ? (
          <Button asChild>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="size-4" />
              View on GitHub
            </a>
          </Button>
        ) : null}
        {project.codeNote ? (
          <span className="text-sm text-muted">{project.codeNote}</span>
        ) : null}
      </div>

      {project.problem ? (
        <DetailBlock title="The problem">{project.problem}</DetailBlock>
      ) : null}
      {project.solution ? (
        <DetailBlock title="The solution">{project.solution}</DetailBlock>
      ) : null}

      {project.features ? (
        <DetailBlock title="What it does">
          <ul className="list-disc space-y-2 pl-5">
            {project.features.map((feature) => (
              <li key={feature.slice(0, 32)}>{feature}</li>
            ))}
          </ul>
        </DetailBlock>
      ) : null}

      {project.contribution ? (
        <DetailBlock title="My contribution">
          {project.contribution}
        </DetailBlock>
      ) : null}

      {project.challenges ? (
        <DetailBlock title="Design decisions & challenges">
          <ul className="list-disc space-y-2 pl-5">
            {project.challenges.map((challenge) => (
              <li key={challenge.slice(0, 32)}>{challenge}</li>
            ))}
          </ul>
        </DetailBlock>
      ) : null}

      <div className="mt-12 flex gap-3 rounded-xl border border-border border-l-4 border-l-navy bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-l-accent ">
        <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-navy" />
        <div>
          <h2 className="font-semibold text-navy">Verification note</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {project.verification}
          </p>
        </div>
      </div>

      <nav
        aria-label="Next project"
        className="mt-16 border-t border-border pt-8 "
      >
        <p className="text-sm text-muted">Next project</p>
        <Link
          href={`/projects/${next.slug}`}
          className="group mt-1 inline-flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
        >
          {next.name}
          <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </nav>
    </article>
  );
}
