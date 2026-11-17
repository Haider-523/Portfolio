import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Reveal, Section, SectionHeading } from "@/components/motion/reveal";
import { githubRepos, profile } from "@/data/portfolio";

export function GitHubSection() {
  return (
    <Section id="github">
      <SectionHeading
        eyebrow="GitHub"
        title="On GitHub"
        description="Public repositories — described honestly. No contribution graphs, stars or commit counts are shown, because none were verified."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {githubRepos.map((repo, i) => (
          <Reveal key={repo.name} delay={i * 0.06}>
            <article className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg ">
              <div className="flex items-start justify-between gap-4">
                <GithubIcon className="size-8 shrink-0 text-foreground transition-colors duration-200 group-hover:text-accent " />
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 shrink-0 text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent 0"
                />
              </div>
              <h3 className="mt-4 font-mono text-lg font-semibold tracking-tight text-navy">
                {repo.name}
              </h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted">
                {repo.description}
              </p>
              <p className="mt-5 border-t border-border pt-4 /80">
                <Link
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                >
                  <GithubIcon className="size-4" />
                  View repository
                </Link>
              </p>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <p className="mt-8">
          <Link
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 font-medium text-accent transition-colors hover:text-accent-hover"
          >
            github.com/Haider-523
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </p>
      </Reveal>
    </Section>
  );
}
