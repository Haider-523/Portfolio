import { GraduationCap } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { educationHistory } from "@/data/portfolio";

/**
 * Education — all 3 LinkedIn entries (re-audited 2026-11-17):
 * BSCS at MNSUAM plus Intermediate and Pre-medical at Workers
 * Welfare Higher Secondary School, both Grade A.
 */
export function Education() {
  return (
    <Section id="education" labelledBy="education-heading">
      <SectionHeading eyebrow="Education" title="Education" id="education-heading" />
      <div className="mt-10 space-y-6">
        {educationHistory.map((entry, i) => (
          <Reveal key={entry.degree} delay={Math.min(i * 0.05, 0.15)}>
            <Tilt>
              <div className="flex flex-col gap-6 rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md sm:flex-row sm:items-start sm:gap-8">
                <span
                  aria-hidden="true"
                  className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-navy text-on-navy"
                >
                  <GraduationCap className="size-6" />
                </span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold tracking-tight text-navy">
                    {entry.degree}
                  </h3>
                  <p className="mt-1 text-muted">{entry.school}</p>
                  <p className="mt-1 text-sm text-muted">
                    {entry.period} · {entry.status}
                  </p>
                  {entry.detail ? (
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {entry.detail}
                    </p>
                  ) : null}
                </div>
                {entry.cgpa ? (
                  <div className="shrink-0 rounded-lg border border-border bg-background px-4 py-3 text-center transition-transform duration-200 hover:-translate-y-0.5">
                    <p className="text-2xl font-bold tracking-tight text-navy">
                      {entry.cgpa}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">CGPA</p>
                  </div>
                ) : null}
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
