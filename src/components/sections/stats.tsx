import { stats } from "@/data/portfolio";
import { CountUp } from "@/components/motion/count-up";

/**
 * Proof strip — the same four numbers (300+ problems, 15+
 * competitions, CGPA 3.44, 64/64 tests) appear in the hero and on
 * the About page. One component renders both layouts so the markup
 * and the numbers cannot drift apart.
 */
function StatItem({
  value,
  label,
  valueClassName,
  labelClassName,
}: {
  value: string;
  label: string;
  valueClassName: string;
  labelClassName: string;
}) {
  return (
    <div className="transition-transform duration-200 hover:-translate-y-0.5">
      <dt className="sr-only">{label}</dt>
      <dd className={valueClassName}>
        <CountUp value={value} />
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
          valueClassName="text-3xl font-bold tracking-tight text-navy"
          labelClassName="mt-1 text-sm text-muted"
        />
      ))}
    </dl>
  );
}
