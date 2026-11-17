import { Reveal, Section, SectionHeading } from "@/components/motion/reveal";
import { experience } from "@/data/portfolio";

/**
 * Experience page — verified roles only: instructor (2024–Present),
 * CodeAlpha junior .NET intern (Aug–Sep 2026), and ICPC team lead.
 * No other employment claims. The instructor role is listed as
 * "Independent" on Haider's resume and under Maktab e Qulaab on
 * LinkedIn — both are stated here rather than silently picking one.
 */
export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Experience"
        description="Three verified roles — teaching, a .NET internship, and leading a competitive programming team."
      />
      <ol className="relative mt-10 space-y-8 border-l-2 border-border pl-8">
        {experience.map((item, i) => (
          <li key={item.role} className="relative">
            <Reveal delay={Math.min(i * 0.05, 0.15)}>
              <span
                aria-hidden="true"
                className="absolute -left-[41px] top-1 size-3.5 rounded-full border-2 border-navy bg-background transition-transform duration-200 hover:scale-125"
              />
              <p className="text-sm font-medium text-navy">{item.period}</p>
              <h3 className="mt-1 text-lg font-semibold tracking-tight text-navy">
                {item.role} — {item.org}
              </h3>
              <p className="mt-0.5 text-sm text-muted">{item.location}</p>
              <p className="mt-1 max-w-2xl leading-relaxed text-muted">
                {item.detail}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
      <Reveal delay={0.1}>
        <p className="mt-12 text-sm leading-relaxed text-muted">
          Note: Haider&apos;s resume lists the instructor role as Independent;
          LinkedIn lists it under Maktab e Qulaab. The work described — teaching
          Programming Fundamentals, OOP, Data Structures and basic Python to 20+
          students — is the same in both.
        </p>
      </Reveal>
    </Section>
  );
}
