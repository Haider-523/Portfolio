import { Reveal, Section, SectionHeading } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { certifications, type CertificationItem } from "@/data/portfolio";

function ItemCard({ item }: { item: CertificationItem }) {
  return (
    <Tilt className="h-full">
      <article className="flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md">
        <h3 className="text-lg font-semibold tracking-tight text-navy">
          {item.name}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {item.issuer}
          {item.date ? ` · ${item.date}` : ""}
        </p>
        {item.note ? (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
            {item.note}
          </p>
        ) : null}
      </article>
    </Tilt>
  );
}

/**
 * Licenses & Certifications — all 18 items, in LinkedIn order,
 * exactly as LinkedIn shows them (signed-in re-audit 2026-11-17).
 * LinkedIn has no separate Honors & Awards section, so there is no
 * awards/certifications split here. Every item is verified.
 */
export function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeading
        eyebrow="Licenses & Certifications"
        title="Licenses & Certifications"
        description="18 items in total, in LinkedIn order, each with its LinkedIn issue date. All verified on LinkedIn."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {certifications.map((item, i) => (
          <Reveal key={item.name} delay={Math.min(i * 0.05, 0.2)}>
            <ItemCard item={item} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 text-sm leading-relaxed text-muted">
          Full list of 18 is on LinkedIn:{" "}
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
