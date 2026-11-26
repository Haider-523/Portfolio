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
 * real work?" — 300+ problems, 9+ competitions, CGPA 3.44, 64/64
 * tests passing on the real client system. No skill percentage bars,
 * no "passionate developer" fluff.
 *
 * Entrance animation is CSS-only (hero-enter keyframes in
 * globals.css, staggered by inline delay), so this stays a server
 * component with no JavaScript cost — the blocks rise and fade in
 * on load. Added 26 Nov at Haider's request for visible,
 * professional animation; reduced motion collapses it globally.
 */
export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
      <div className="grid items-start gap-10 md:grid-cols-[1fr_280px]">
        <div>
          {/* Availability pill — the top 3 Pakistani portfolios all
              show an availability signal in the hero; this one reuses
              the exact confirmed availability line, moved up from
              the location line below so it is seen in the first
              seconds. */}
          <p className="hero-enter inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-sm font-medium text-accent">
            <span
              aria-hidden="true"
              className="inline-block size-2 rounded-full bg-lime"
            />
            {availabilityNote}
          </p>
          <div className="hero-enter" style={{ animationDelay: "0.08s" }}>
            <p className="mt-4 flex items-center gap-2 text-sm font-semibold tracking-wide text-navy uppercase">
              <span aria-hidden="true" className="inline-block size-2 bg-lime" />
              {profile.roleLine}
            </p>
            <h1 className="mt-3 text-6xl font-extrabold leading-[1.02] tracking-tight text-navy sm:text-7xl">
              Haider Zaman
            </h1>
          </div>
          <div className="hero-enter" style={{ animationDelay: "0.16s" }}>
            <p className="mt-4 max-w-xl text-xl font-medium leading-snug text-navy sm:text-2xl">
              I build real, tested backend systems.
            </p>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">
              {heroIntro}
            </p>
            <p className="mt-4 text-sm font-medium text-muted">
              {profile.location} · Remote
            </p>
          </div>

          <div
            className="hero-enter mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "0.24s" }}
          >
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

          <div
            className="hero-enter mt-8 flex items-center gap-2"
            style={{ animationDelay: "0.32s" }}
          >
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

          {/* Core stack as two accent cards (design upgrade, 24 Nov
              2026, inspired by the coloured stack cards on Humais
              Nawazish's portfolio): the stack grouped by area, in
              the palette's own two colour blocks — mint for backend,
              navy for desktop — instead of a flat row of chips, so
              the hero has the same visual energy. Same tech, no new
              claim. */}
          <div
            className="hero-enter mt-8 grid gap-3 sm:grid-cols-2"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="rounded-xl border border-accent/30 bg-mint p-5">
              <p className="text-sm font-bold tracking-wide text-navy uppercase">
                Backend &amp; APIs
              </p>
              <ul
                aria-label="Backend stack"
                className="mt-3 flex flex-wrap gap-2"
              >
                {["C#", "ASP.NET Core", "EF Core", "SQL Server", "REST APIs"].map(
                  (tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent"
                    >
                      {tech}
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="rounded-xl bg-navy p-5">
              <p className="text-sm font-bold tracking-wide text-on-navy uppercase">
                Desktop &amp; Data
              </p>
              <ul
                aria-label="Desktop stack"
                className="mt-3 flex flex-wrap gap-2"
              >
                {["WPF", "XAML", "SQLite"].map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-on-navy/25 bg-on-navy/10 px-2.5 py-1 text-xs font-semibold text-on-navy"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          className="hero-enter mx-auto w-full max-w-[280px]"
          style={{ animationDelay: "0.16s" }}
        >
          {/* No card frame: the photo is a background-free cutout
              that floats on the cream page, lifted by a soft
              drop-shadow (photo-shadow) — no border, no box. */}
          <Image
            src="/images/haider-zaman.png"
            alt="Haider Zaman — .NET Backend Developer, Multan, Pakistan"
            width={560}
            height={700}
            priority
            quality={70}
            sizes="(max-width: 768px) 280px, 280px"
            className="photo-shadow aspect-[4/5] w-full object-cover object-top transition-transform duration-300 hover:scale-[1.02]"
          />
          <p className="mt-3 text-center text-sm font-medium text-navy">
            {profile.roleLine} · {profile.location}
          </p>
        </div>
      </div>

      <div
        className="hero-enter mt-14 overflow-hidden rounded-xl border border-border bg-mint shadow-sm"
        style={{ animationDelay: "0.48s" }}
      >
        <span aria-hidden="true" className="block h-1 w-full bg-accent" />
        <StatsGrid />
      </div>
    </section>
  );
}
