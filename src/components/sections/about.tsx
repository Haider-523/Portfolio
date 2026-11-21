import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/motion/reveal";
import { aboutParagraphs, githubRepos, profile } from "@/data/portfolio";
import { StatsList } from "@/components/sections/stats";
import { TypewriterCode } from "@/components/motion/typewriter-code";

export function About() {
  return (
    <Section id="about" labelledBy="about-heading">
      <SectionHeading
        eyebrow="About"
        title="Backend developer, teacher, competitor"
        level="h1"
        id="about-heading"
      />
      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_280px]">
        <Reveal delay={0.05}>
          <div className="space-y-4 leading-relaxed text-muted">
            {aboutParagraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <p className="mt-6">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 font-medium text-accent transition-colors hover:text-accent-hover"
            >
              See the projects this produced
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Image
            src="/images/haider-zaman.jpg"
            alt="Haider Zaman"
            width={560}
            height={700}
            sizes="(max-width: 768px) 100vw, 280px"
            className="aspect-[4/5] w-full rounded-xl border border-border object-cover object-top"
          />
          <p className="mt-3 text-center text-sm text-muted">
            {profile.name} · {profile.location}
          </p>
          <div className="mt-6 rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md">
            <StatsList />
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.1}>
        <figure className="mt-12">
          <TypewriterCode />
          <figcaption className="mt-3 text-sm text-muted">
            Example endpoint in C# / ASP.NET Core — the shape of my
            backend work, not production code.
          </figcaption>
        </figure>
      </Reveal>
      {/* GitHub — the public repos, surfaced on the site instead of
          only in the header link. No contribution-graph image: the
          profile link below is where the graph lives, and no
          third-party chart service is added for it. */}
      <Reveal delay={0.1}>
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-navy">
            On GitHub
          </h2>
          <ul className="mt-4 space-y-3">
            {githubRepos.map((repo) => (
              <li key={repo.name}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md"
                >
                  <span className="font-medium text-foreground transition-colors group-hover:text-accent">
                    {repo.name}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">
                    {repo.description}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            Full profile, including the contribution graph:{" "}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent transition-colors hover:text-accent-hover"
            >
              github.com/Haider-523
            </a>
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
