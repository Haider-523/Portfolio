import Image from "next/image";
import { Reveal, Section, SectionHeading } from "@/components/motion/reveal";
import { TimelineLine } from "@/components/motion/timeline-line";
import { LinkedinIcon } from "@/components/icons";
import { competitions, experience, journey, profile } from "@/data/portfolio";

/**
 * Monogram for the visual half of a card with no photo — first
 * letters of the first two words, ignoring parentheticals and
 * one-letter words ("Maktab e Qulaab" → "MQ", "CodeAlpha
 * (Internship)" → "CO", "Game Day Hackathon 2026" → "GD").
 */
function monogram(text: string): string {
  const words = text
    .replace(/\([^)]*\)/g, "")
    .split(/[\s&—–-]+/)
    .filter((w) => w.length > 1);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return text.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase();
}

/**
 * Experience page — exactly LinkedIn's 3 entries (re-audited
 * 2026-11-17): instructor (2024–Present), CodeAlpha .NET Developer
 * internship (Aug–Sep 2026), and Hussain Dental Surgery assistant
 * (Jun 2024 – Feb 2025). The instructor role is listed as
 * "Independent" on Haider's resume and under Maktab e Qulaab on
 * LinkedIn — both are stated here rather than silently picking one.
 */
export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-heading">
      <SectionHeading
        eyebrow="Experience"
        title="Experience"
        level="h1"
        id="experience-heading"
        description="Three verified roles — teaching, a .NET internship, and a part-time assistant role."
      />
      {/* Scroll-driven line — this timeline and the Milestones
          timeline below. The old site-wide ScrollRail is gone;
          the fill grows and shrinks as each timeline scrolls
          through the viewport. */}
      <div className="relative mt-10">
        <TimelineLine />
        <ol className="relative space-y-8 border-l-2 border-border pl-8">
          {experience.map((item, i) => (
            <li key={item.role} className="relative">
              <Reveal delay={Math.min(i * 0.05, 0.15)}>
                <span
                  aria-hidden="true"
                  className="absolute -left-[41px] top-6 size-3.5 rounded-full border-2 border-navy bg-background transition-transform duration-200 hover:scale-125"
                />
                {/* Split card, like the project cards: half visual,
                    half description. Roles have no photos, so the
                    visual half is a navy monogram panel. */}
                <div className="grid overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-200 hover:border-accent/60 hover:shadow-md md:grid-cols-2">
                  <div className="relative flex min-h-44 flex-col justify-center gap-1 bg-navy p-6">
                    <span className="flex size-11 items-center justify-center rounded-lg bg-background font-mono text-sm font-bold text-navy">
                      {monogram(item.org)}
                    </span>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-on-navy/70">
                      {item.org}
                    </p>
                    <p className="text-sm font-medium text-on-navy/80">
                      {item.period}
                    </p>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg font-semibold tracking-tight text-navy">
                      {item.role}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted">
                      {item.location}
                    </p>
                    <p className="mt-2 leading-relaxed text-muted">
                      {item.detail}
                    </p>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                    >
                      <LinkedinIcon className="size-4" />
                      View on LinkedIn
                    </a>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
      <Reveal delay={0.1}>
        <p className="mt-12 text-sm leading-relaxed text-muted">
          Note: Haider&apos;s resume lists the instructor role as Independent;
          LinkedIn lists it under Maktab e Qulaab. The work described — teaching
          Programming Fundamentals, OOP, Data Structures and basic Python to 20+
          students — is the same in both.
        </p>
      </Reveal>

      <h2 className="mt-16 text-xl font-semibold tracking-tight text-navy">
        Milestones
      </h2>
      {/* Scroll-driven line — the Milestones timeline too, the
          same fill as the roles timeline above. */}
      <div className="relative mt-8">
        <TimelineLine />
        <ol className="relative space-y-8 border-l-2 border-navy/25 pl-8">
          {journey.map((item, i) => (
            <li key={item.title} className="relative">
              <Reveal delay={Math.min(i * 0.05, 0.2)}>
                <span
                  aria-hidden="true"
                  className="absolute -left-10 top-6 size-4 rounded-full border-[3px] border-surface bg-accent shadow-sm transition-transform duration-200 hover:scale-125"
                />
                {/* Split card, like the project cards: half visual,
                    half description. The photo itself links to the
                    LinkedIn post. Milestones WITHOUT a photo get NO
                    visual half at all — a single-column text card —
                    because the old navy monogram panel duplicated
                    the title/period and read as a missing image
                    (live QA, 25 Nov 2026). */}
                <div
                  className={`overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-200 hover:border-accent/60 hover:shadow-md ${
                    item.photo ? "grid md:grid-cols-2" : ""
                  }`}
                >
                  {item.photo && (
                    <div className="relative min-h-48 overflow-hidden bg-surface md:min-h-full">
                      <a
                        href={item.photoPostUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${item.title} — view on LinkedIn`}
                        className="absolute inset-0 block"
                      >
                        <Image
                          src={item.photo}
                          alt={
                            item.photoAlt ?? `${item.title} — photo from LinkedIn`
                          }
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-contain"
                        />
                      </a>
                    </div>
                  )}
                  <div className="p-5 sm:p-6">
                    <p className="inline-block rounded-full bg-navy/10 px-3 py-1 text-xs font-semibold tracking-wide text-navy">
                      {item.period}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-1 leading-relaxed text-muted">
                      {item.detail}
                    </p>
                    {item.photo ? (
                      <p className="mt-3 text-xs leading-relaxed text-muted">
                        Photo from Haider&apos;s{" "}
                        <a
                          href={item.photoPostUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-accent underline underline-offset-2 hover:text-accent-hover"
                        >
                          LinkedIn post
                        </a>{" "}
                        — exact copy, not edited.
                      </p>
                    ) : (
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                      >
                        <LinkedinIcon className="size-4" />
                        View on LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
      <Reveal delay={0.1}>
        <div className="mt-12 rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md">
          <h3 className="text-lg font-semibold tracking-tight text-navy">
            Competitions
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Contests named in my resume — nothing added.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {competitions.map((name) => (
              <li
                key={name}
                className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-on-accent"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
