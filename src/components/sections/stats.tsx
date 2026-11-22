import Link from "next/link";
import { stats } from "@/data/portfolio";
import { CountUp } from "@/components/motion/count-up";

/**
 * Proof strip — the same four numbers (300+ problems, 9+
 * competitions, CGPA 3.44, 64/64 tests), rendered only in the hero.
 * The About page used to repeat them in a side box; that duplicated
 * the first page, so it was removed (voice-note feedback, 23 Nov
 * 2026).
 *
 * Each number counts up from 0 to its verified final value when it
 * scrolls into view (same feedback). A screenshot mid-animation can
 * catch an intermediate number — that is why the count-up was
 * removed on 21 Nov — but the reviewer asked for it back, so it is
 * back; the animation is short (1.2s), respects reduced motion, and
 * ends exactly on the verified final value. First paint and no-JS
 * still show the final values.
 *
 * Every number links to where it can be checked: problems to the
 * About page (which states the combined 300+ across Codeforces,
 * CodeChef and LeetCode), competitions to Codeforces, CGPA to the
 * education section on About, tests to the salon case study. A
 * number a recruiter cannot verify is a claim; a linked one is
 * proof.
 */
function StatItem({
  value,
  label,
  href,
  valueClassName,
  labelClassName,
}: {
  value: string;
  label: string;
  href?: string;
  valueClassName: string;
  labelClassName: string;
}) {
  const isExternal = href?.startsWith("http");
  const valueNode = <CountUp value={value} />;
  return (
    <div className="transition-transform duration-200 hover:-translate-y-0.5">
      <dt className="sr-only">{label}</dt>
      <dd className={valueClassName}>
        {href ? (
          isExternal ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {valueNode}
            </a>
          ) : (
            <Link
              href={href}
              className="underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {valueNode}
            </Link>
          )
        ) : (
          valueNode
        )}
      </dd>
      <dd className={labelClassName}>{label}</dd>
    </div>
  );
}

/** Hero layout: 2-column grid on mobile, 4 across on desktop. */
export function StatsGrid() {
  return (
    <dl className="grid grid-cols-2 gap-6 px-6 py-7 sm:grid-cols-4 sm:px-8">
      {stats.map((stat) => (
        <StatItem
          key={stat.label}
          value={stat.value}
          label={stat.label}
          href={stat.href}
          valueClassName="text-3xl font-bold tracking-tight text-navy sm:text-4xl"
          labelClassName="mt-1 text-sm font-medium text-muted"
        />
      ))}
    </dl>
  );
}
