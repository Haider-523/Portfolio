import { Reveal, Section, SectionHeading } from "@/components/motion/reveal";
import { competitions, journey } from "@/data/portfolio";

export function Journey() {
  return (
    <Section id="journey">
      <SectionHeading
        eyebrow="Journey"
        title="Journey"
        description="Degree, teaching, competitions and real client work — in order."
      />
      <ol className="relative mt-10 space-y-8 border-l-2 border-navy/25 pl-8">
        {journey.map((item, i) => (
          <li key={item.title} className="relative">
            <Reveal delay={Math.min(i * 0.05, 0.2)}>
              <span
                aria-hidden="true"
                className="absolute -left-10 top-1.5 size-4 rounded-full border-[3px] border-surface bg-accent shadow-sm transition-transform duration-200 hover:scale-125"
              />
              <p className="inline-block rounded-full bg-navy/10 px-3 py-1 text-xs font-semibold tracking-wide text-navy">
                {item.period}
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-navy">
                {item.title}
              </h3>
              <p className="mt-1 max-w-2xl leading-relaxed text-muted">
                {item.detail}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
      <Reveal delay={0.1}>
        <div className="mt-12 rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md ">
          <h3 className="text-lg font-semibold tracking-tight text-navy">
            Competitions
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Contests named in my resume — nothing added.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {competitions.map((name) => (
              <li
                key={name}
                className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-on-accent dark:hover:border-accent dark:hover:bg-accent dark:hover:text-on-accent"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
