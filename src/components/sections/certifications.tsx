import { Award } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/motion/reveal";
import { HoverBrackets } from "@/components/motion/hover-brackets";
import { certifications } from "@/data/portfolio";

/**
 * Licenses & Certifications — all 18 items, in LinkedIn order,
 * exactly as LinkedIn shows them (signed-in re-audit 2026-11-17).
 * LinkedIn has no separate Honors & Awards section, so there is no
 * awards/certifications split here. Every item is verified.
 *
 * A grid of cards, not a one-line column list: the column list
 * (2026-11-22) read like a plain text file and Haider said it did
 * not look good (26 Nov). Each card has a badge icon, the name,
 * the issuer and a date pill, and lifts on hover. Three columns
 * on desktop keep the section shorter than the 18-row list was
 * (6 rows instead of 18), so the relevant .NET/SQL credentials
 * are not buried under a long scroll.
 */
export function Certifications() {
  return (
    <Section id="certifications" labelledBy="certifications-heading" tone="soft" compact>
      <SectionHeading
        eyebrow="Licenses & Certifications"
        num="04"
        title="Licenses & Certifications"
        size="md"
        id="certifications-heading"
        description="Licenses and certifications from LinkedIn, each with its issue date — all verified."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((item, i) => (
          <Reveal
            key={item.name}
            delay={(i % 3) * 0.04}
            className="h-full"
          >
            <article className="group relative flex h-full flex-col rounded-xl border border-border bg-surface p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent/60 hover:shadow-md hover:[transform:perspective(1000px)_rotateX(2deg)_rotateY(-2deg)]">
              <HoverBrackets />
              <div className="flex items-start justify-between gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy text-on-navy transition-colors duration-200 group-hover:bg-accent"
                >
                  <Award className="size-5" />
                </span>
                {item.date ? (
                  <span className="shrink-0 rounded-full bg-mint px-2.5 py-1 text-xs font-semibold text-navy">
                    {item.date}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-4 font-semibold leading-snug text-foreground">
                {item.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {item.issuer}
                {item.note ? ` — ${item.note}` : ""}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 text-sm leading-relaxed text-muted">
          See the full list on LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/haiderzaman-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent transition-colors hover:text-accent-hover"
          >
            linkedin.com/in/haiderzaman-dev
          </a>
          .
        </p>
      </Reveal>
    </Section>
  );
}
