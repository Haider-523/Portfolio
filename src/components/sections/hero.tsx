import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { availabilityNote, heroIntro, profile } from "@/data/portfolio";
import { StatsGrid } from "@/components/sections/stats";
import { Button } from "@/components/ui/button";

/**
 * Hero — built for a recruiter's 6-second scan (offer first, name
 * second, proof third): eyebrow states the exact target role, the
 * headline states the offer, a credibility line follows, then 2–3
 * CTAs and the photo. Proof strip answers "can this person finish
 * real work?" — 300+ problems, 15+ competitions, CGPA 3.44, 64/64
 * tests passing on the real client system. No skill percentage bars,
 * no "passionate developer" fluff.
 *
 * Deliberately a server component with NO entrance animation: the
 * content is in the server-rendered HTML and visible on first paint,
 * with no wait for JavaScript, hydration or a motion library.
 */
export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
      <div className="grid items-start gap-10 md:grid-cols-[1fr_280px]">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold tracking-wide text-navy uppercase">
            <span aria-hidden="true" className="inline-block size-2 bg-accent" />
            {profile.roleLine}
          </p>
          <h1 className="mt-3 text-5xl font-bold leading-[1.05] tracking-tight text-navy sm:text-6xl">
            Haider Zaman
          </h1>
          <p className="mt-4 max-w-xl text-xl font-medium leading-snug text-navy sm:text-2xl">
            I build real, tested backend systems.
          </p>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">
            {heroIntro}
          </p>
          <p className="mt-4 text-sm font-medium text-muted">
            {profile.location} · {availabilityNote}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <a
                href="/documents/HZ-Resume.pdf"
                download="Haider-Zaman-Resume.pdf"
              >
                <Download />
                Download Resume
              </a>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/projects">
                View Projects
                <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a href={`mailto:${profile.email}`}>
                <Mail />
                Contact
              </a>
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              aria-label="GitHub"
              className="hover:text-accent"
            >
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="size-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              aria-label="LinkedIn"
              className="hover:text-accent"
            >
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon className="size-5" />
              </a>
            </Button>
            <a
              href={`mailto:${profile.email}`}
              className="ml-2 text-sm text-muted transition-colors hover:text-accent"
            >
              {profile.email}
            </a>
          </div>

          {/* Core stack at a glance — Daim's hero shows his stack as
              chips; this hero only named it in prose. Same chip style
              as the project cards, server-rendered, zero JavaScript. */}
          <ul
            aria-label="Core stack"
            className="mt-6 flex flex-wrap gap-2"
          >
            {[
              "C#",
              "ASP.NET Core",
              "EF Core",
              "SQL Server",
              "REST APIs",
              "SQLite",
              "WPF",
            ].map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-foreground transition-colors duration-200 hover:border-accent/60 hover:bg-accent/5 hover:text-accent"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-[280px]">
          <div className="overflow-hidden rounded-xl border-2 border-navy/20 shadow-md">
            <Image
              src="/images/haider-zaman.jpg"
              alt="Haider Zaman — .NET Backend Developer, Multan, Pakistan"
              width={560}
              height={700}
              priority
              quality={70}
              sizes="(max-width: 768px) 280px, 280px"
              className="aspect-[4/5] w-full object-cover object-top transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
          <p className="mt-3 text-center text-sm font-medium text-navy">
            {profile.roleLine} · {profile.location}
          </p>
        </div>
      </div>

      <div className="mt-14 overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <span aria-hidden="true" className="block h-1 w-full bg-accent" />
        <StatsGrid />
      </div>
    </section>
  );
}
