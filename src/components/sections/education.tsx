import { GraduationCap } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/motion/reveal";
import { educationHistory } from "@/data/portfolio";

/**
 * Education — all 3 LinkedIn entries (re-audited 2026-11-17):
 * BSCS at MNSUAM plus Intermediate and Pre-medical at Workers
 * Welfare Higher Secondary School, both Grade A.
 *
 * Hierarchy, not equal cards: the BSCS degree is the featured
 * card; the two school entries share one compact "Schooling"
 * block below it, with the dates stating the switch — pre-medical
 * first (2020–2022), then computer science (2022–2024).
 */
export function Education() {
  const [degree, ...schooling] = educationHistory;
  return (
    <Section id="education" labelledBy="education-heading" compact>
      <SectionHeading eyebrow="Education" title="Education" size="md" id="education-heading" />
      <div className="mt-10 space-y-6">
        <Reveal delay={0.05}>
          <div className="flex flex-col gap-6 rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md sm:flex-row sm:items-start sm:gap-8">
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-navy text-on-navy"
              >
                <GraduationCap className="size-6" />
              </span>
              <div className="flex-1">
                <h3 className="text-xl font-semibold tracking-tight text-navy">
                  {degree.degree}
                </h3>
                <p className="mt-1 text-muted">{degree.school}</p>
                <p className="mt-1 text-sm text-muted">
                  {degree.period} · {degree.status}
                </p>
                {degree.detail ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {degree.detail}
                  </p>
                ) : null}
              </div>
              {degree.cgpa ? (
                <div className="shrink-0 rounded-lg border border-border bg-background px-4 py-3 text-center transition-transform duration-200 hover:-translate-y-0.5">
                  <p className="text-2xl font-bold tracking-tight text-navy">
                    {degree.cgpa}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">CGPA</p>
                </div>
              ) : null}
            </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="text-lg font-semibold tracking-tight text-navy">
              Schooling
            </h3>
            <p className="mt-1 text-sm text-muted">{schooling[0]?.school}</p>
            <ul className="mt-4 space-y-3">
              {schooling.map((entry) => (
                <li
                  key={entry.degree}
                  className="flex flex-col gap-0.5 border-t border-border pt-3 first:border-t-0 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                >
                  <p className="font-medium text-foreground">{entry.degree}</p>
                  <p className="shrink-0 text-sm text-muted">
                    {entry.period} · {entry.status}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Pre-medical first (2020–2022), then computer science
              (2022–2024).
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
