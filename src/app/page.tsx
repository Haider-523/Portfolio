import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { FeaturedProjectsPreview } from "@/components/sections/projects";
import { Reveal, Section } from "@/components/motion/reveal";
import { profile } from "@/data/portfolio";
import { Button } from "@/components/ui/button";

/**
 * Home page — multi-page model. Hero + featured projects preview +
 * CTA only. About, Skills, Education, Journey, GitHub, Contact,
 * Experience and Certifications each have their own page; nothing
 * here is an anchor section.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjectsPreview />
      <Section id="hire" tone="soft">
        <Reveal>
          <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md">
            <span aria-hidden="true" className="block h-1 w-full bg-accent" />
            <div className="p-8 text-center sm:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Need a backend developer who finishes real work?
            </h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted">
              A real client system, a social platform and a university guide —
              built, tested and documented. Read the resume or get in touch
              directly.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild>
                <a
                  href="/documents/HZ-Resume.pdf"
                  download="Haider-Zaman-Resume.pdf"
                >
                  <Download />
                  Download Resume
                </a>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <a href={`mailto:${profile.email}`}>
                  <Mail />
                  Contact Haider
                </a>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/projects">
                  View Projects
                  <ArrowRight />
                </Link>
              </Button>
            </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
