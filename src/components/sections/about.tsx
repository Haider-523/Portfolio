import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/motion/reveal";
import { aboutParagraphs, profile, stats } from "@/data/portfolio";

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About"
        title="Backend developer, teacher, competitor"
      />
      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_280px]">
        <Reveal delay={0.05}>
          <div className="space-y-4 leading-relaxed text-muted">
            {aboutParagraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <p className="mt-6">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 font-medium text-accent transition-colors hover:text-accent-hover"
            >
              See the projects this produced
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Image
            src="/images/haider-zaman.jpg"
            alt="Haider Zaman"
            width={560}
            height={700}
            className="aspect-[4/5] w-full rounded-xl border border-border object-cover object-top"
          />
          <p className="mt-3 text-center text-sm text-muted">
            {profile.name} · {profile.location}
          </p>
          <div className="mt-6 rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md">
            <dl className="space-y-5">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-3xl font-bold tracking-tight text-navy">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-sm text-muted">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
