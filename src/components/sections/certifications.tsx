import { Reveal, Section, SectionHeading } from "@/components/motion/reveal";
import { certifications } from "@/data/portfolio";

/**
 * Licenses & Certifications — all 18 items, in LinkedIn order,
 * exactly as LinkedIn shows them (signed-in re-audit 2026-11-17).
 * LinkedIn has no separate Honors & Awards section, so there is no
 * awards/certifications split here. Every item is verified.
 *
 * Compact list, not 18 cards: a recruiter scans a certification
 * list the way a CV lists one — one line per item, name, issuer
 * and date. The old 18-card wall buried the relevant .NET/SQL
 * credentials under school, scout and Excel certificates and made
 * the page very long.
 */
export function Certifications() {
  return (
    <Section id="certifications" labelledBy="certifications-heading" tone="soft" compact>
      <SectionHeading
        eyebrow="Licenses & Certifications"
        title="Licenses & Certifications"
        size="md"
        id="certifications-heading"
        description="Licenses and certifications from LinkedIn, each with its issue date — all verified."
      />

      <Reveal delay={0.1}>
        <ul className="mt-10 divide-y divide-border rounded-xl border border-border bg-surface">
          {certifications.map((item) => (
            <li
              key={item.name}
              className="flex flex-col gap-0.5 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div>
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-sm leading-relaxed text-muted">
                  {item.issuer}
                  {item.note ? ` — ${item.note}` : ""}
                </p>
              </div>
              {item.date ? (
                <p className="shrink-0 text-sm text-muted">{item.date}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </Reveal>

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
