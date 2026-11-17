import { GraduationCap } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/motion/reveal";
import { education } from "@/data/portfolio";

export function Education() {
  return (
    <Section id="education">
      <SectionHeading eyebrow="Education" title="Education" />
      <Reveal delay={0.05}>
        <div className="mt-10 flex flex-col gap-6 rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md sm:flex-row sm:items-start sm:gap-8 ">
          <span
            aria-hidden="true"
            className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-navy text-on-navy"
          >
            <GraduationCap className="size-6" />
          </span>
          <div className="flex-1">
            <h3 className="text-xl font-semibold tracking-tight text-navy">
              {education.degree}
            </h3>
            <p className="mt-1 text-muted">{education.school}</p>
            <p className="mt-1 text-sm text-muted">
              {education.period} · {education.status}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {education.note}
            </p>
          </div>
          <div className="shrink-0 rounded-lg border border-border bg-background px-4 py-3 text-center transition-transform duration-200 hover:-translate-y-0.5 ">
            <p className="text-2xl font-bold tracking-tight text-navy">
              {education.cgpa}
            </p>
            <p className="mt-0.5 text-xs text-muted">CGPA</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
