import { AlertTriangle } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/motion/reveal";
import {
  awards,
  certifications,
  type CertificationItem,
} from "@/data/portfolio";

function ItemCard({ item }: { item: CertificationItem }) {
  return (
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
      {!item.verified ? (
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
          <AlertTriangle aria-hidden="true" className="size-3.5" />
          Unverified — confirm before publishing
        </p>
      ) : null}
    </article>
  );
}

/**
 * Certifications & Awards — 6 awards + 12 certifications = 18 items,
 * matching the 18 on LinkedIn. Awards are NOT double-counted as
 * certifications. Names come from the earlier Template B build and
 * were cross-checked against the signed-in LinkedIn audit of
 * 2026-11-07 (which named only some of the 18) and the resume (which
 * lists no certifications). Dates are shown only where the audit
 * confirms them — the earlier build's dates conflict with the audit
 * (SQL May 2026 vs Aug 2025; C# May 2026 vs Jun 2025; Python May 2026
 * vs Dec 2024; Excel Jul 2025 vs Oct 2024; CS50x 2026 vs 2025), so
 * all other dates are omitted, not guessed. Items that appear only
 * in the earlier build are flagged "Unverified — confirm before
 * publishing".
 */
export function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeading
        eyebrow="Certifications & Awards"
        title="Certifications & Awards"
        description="6 awards and 12 certifications — 18 items in total, matching LinkedIn. Awards are listed once, under Awards, not repeated as separate certificates."
      />
      <Reveal delay={0.05}>
        <p className="mt-6 text-sm leading-relaxed text-muted">
          Verification: names marked verified were confirmed in the LinkedIn
          audit of 2026-11-07 or in the resume. Dates are shown only where the
          audit confirms them; other dates from the earlier build conflicted
          with the audit and are omitted. Items flagged unverified appear only
          in the earlier build — confirm them before publishing.
        </p>
      </Reveal>

      <h2 className="mt-12 text-xl font-semibold tracking-tight text-navy">
        Awards &amp; Achievements — 6
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {awards.map((item, i) => (
          <Reveal key={item.name} delay={Math.min(i * 0.05, 0.2)}>
            <ItemCard item={item} />
          </Reveal>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-semibold tracking-tight text-navy">
        Certifications — 12
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
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
