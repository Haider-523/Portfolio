import { AppWindow, Code2, Database, Languages } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/motion/reveal";
import { skillCategories } from "@/data/portfolio";

const categoryIcons = {
  "Backend & Frameworks": Code2,
  Data: Database,
  Desktop: AppWindow,
  "Languages used": Languages,
} as const;

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="What I work with"
        description="Only the stack I actually use. No percentages, no expert claims — the evidence is the projects."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {skillCategories.map((category, i) => {
          const Icon =
            categoryIcons[category.title as keyof typeof categoryIcons] ??
            Code2;
          return (
            <Reveal key={category.title} delay={Math.min(i * 0.06, 0.18)}>
              <div className="h-full rounded-xl border border-border bg-surface p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md">
                <span
                  aria-hidden="true"
                  className="flex size-11 items-center justify-center rounded-lg bg-navy text-on-navy"
                >
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-navy">
                  {category.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {category.description}
                </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-on-accent dark:hover:border-accent dark:hover:bg-accent dark:hover:text-on-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={0.1}>
        <p className="mt-8 text-sm leading-relaxed text-muted">
          Note: this site itself is built with Next.js, React and TypeScript —
          that is the build stack, not a claimed skill.
        </p>
      </Reveal>
    </Section>
  );
}
