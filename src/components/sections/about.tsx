import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/motion/reveal";
import { aboutParagraphs, githubRepos, profile } from "@/data/portfolio";
import { StatsList } from "@/components/sections/stats";

/**
 * Real code from the salon system — the filtered unique index that
 * keeps one session per chair. Verbatim from
 * StylishHairSalon.Infrastructure/Persistence/Configurations.cs
 * (ServiceSessionConfig). The 64-test suite covers it; the blog
 * post explains how it works.
 */
const salonIndexCode = `// INVARIANT (spec §35.1): an exclusive station hosts at most one active session.
// Enforced at the database level — no race window.
b.HasIndex(s => s.StationId).IsUnique()
    .HasFilter("\\"StationId\\" IS NOT NULL AND \\"Status\\" = 0 AND \\"StationIsExclusive\\" = 1");`;

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
            priority
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
      {/* Static real code, not a typing animation: the panel used
          to start half-empty and the caption undercut it ("not
          production code"). This is production code from the salon
          system, complete on first paint. */}
      <Reveal delay={0.1}>
        <figure className="mt-12">
          <div className="overflow-hidden rounded-xl border border-border bg-navy">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3">
              <span className="font-mono text-xs text-white/60">
                Configurations.cs — ServiceSessionConfig
              </span>
              <span className="shrink-0 rounded-full bg-accent/25 px-2.5 py-0.5 font-mono text-xs font-semibold text-white">
                Real code
              </span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-white/90">
              <code>{salonIndexCode}</code>
            </pre>
          </div>
          <figcaption className="mt-3 text-sm text-muted">
            Real code from the salon system — the filtered unique index
            that keeps one session per chair. Covered by the 64-test
            suite.{" "}
            <Link
              href="/blog/filtered-unique-index-chair"
              className="font-medium text-accent transition-colors hover:text-accent-hover"
            >
              Read how it works
            </Link>
          </figcaption>
        </figure>
      </Reveal>
      {/* GitHub — the public repos, surfaced on the site instead of
          only in the header link. No contribution-graph image: the
          profile link below is where the graph lives, and no
          third-party chart service is added for it. */}
      {/* GitHub — only the repo with real backend code is
          showcased as a card. The README-only UniGuide and this
          site are already covered in Projects; they are linked in
          one line below instead of taking equal cards. */}
      <Reveal delay={0.1}>
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-navy">
            On GitHub
          </h2>
          <ul className="mt-4 space-y-3">
            {githubRepos.slice(0, 1).map((repo) => (
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
            Also public:{" "}
            {githubRepos.slice(1).map((repo, i) => (
              <span key={repo.name}>
                {i > 0 ? " · " : ""}
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent transition-colors hover:text-accent-hover"
                >
                  {repo.name}
                </a>
              </span>
            ))}
            {" — "}full profile, including the contribution graph:{" "}
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
