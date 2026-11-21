import Link from "next/link";
import { stats } from "@/data/portfolio";
import { CountUp } from "@/components/motion/count-up";

/**
 * Proof strip — the same four numbers (300+ problems, 15+
 * competitions, CGPA 3.44, 64/64 tests) appear in the hero and on
 * the About page. One component renders both layouts so the markup
 * and the numbers cannot drift apart.
 *
 * Every number links to where it can be checked: problems to the
 * LeetCode profile, competitions to Codeforces, CGPA to the
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

/** About layout: vertical list inside the photo-side card. */
export function StatsList() {
  return (
    <dl className="space-y-5">
      {stats.map((stat) => (
        <StatItem
          key={stat.label}
          value={stat.value}
          label={stat.label}
          href={stat.href}
          valueClassName="text-3xl font-bold tracking-tight text-navy"
          labelClassName="mt-1 text-sm text-muted"
        />
      ))}
    </dl>
  );
}
