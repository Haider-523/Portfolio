import { AppWindow, Database, Server, ShieldCheck } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/motion/reveal";
import { services, workSteps } from "@/data/portfolio";

const serviceIcons = {
  server: Server,
  database: Database,
  "app-window": AppWindow,
  "shield-check": ShieldCheck,
} as const;

/**
 * Services — the offer, stated plainly. Skills (About page) say which
 * tools Haider uses; this says what a reader can hire him to do, each
 * item backed by a featured project or a verified fact. Same card
 * pattern as Skills, same palette, no new motion.
 */
export function Services() {
  return (
    <Section id="services" labelledBy="services-heading">
      <SectionHeading
        eyebrow="Services"
        title="What I build"
        id="services-heading"
        description="Backend systems, databases and desktop apps — each one backed by a project on this site, not a claim."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {services.map((service, i) => {
          const Icon =
            serviceIcons[service.icon as keyof typeof serviceIcons] ??
            Server;
          return (
            <Reveal key={service.title} delay={Math.min(i * 0.06, 0.18)}>
              <div className="h-full rounded-xl border border-border bg-surface p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md">
                <span
                  aria-hidden="true"
                  className="flex size-11 items-center justify-center rounded-lg bg-navy text-on-navy"
                >
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-navy">
                  {service.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {service.deliverables.map((item) => (
                    <li
                      key={item.slice(0, 32)}
                      className="flex items-start gap-2 text-sm leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs font-semibold text-accent">
                  {service.proof} · {service.scope}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* How I work — the process strip the top portfolios show
          (Usman's 6-step process, Shakir's FAQ/pricing): 4 steps,
          each one line, grounded in how the salon system was built. */}
      <Reveal delay={0.1}>
        <h3 className="mt-12 text-xl font-semibold tracking-tight text-navy">
          How I work
        </h3>
        <ol className="mt-6 grid gap-6 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {workSteps.map((step, i) => (
            <li key={step.step}>
              <p className="text-sm font-semibold tracking-wide text-accent uppercase">
                {String(i + 1).padStart(2, "0")} · {step.step}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
