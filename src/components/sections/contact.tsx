import { Calendar, Download, Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Reveal, Section, SectionHeading } from "@/components/motion/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { profile } from "@/data/portfolio";
import { Button } from "@/components/ui/button";

const contactMethods = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/-/g, "")}`,
    icon: Phone,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/haiderzaman-dev",
    href: profile.linkedin,
    icon: LinkedinIcon,
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/Haider-523",
    href: profile.github,
    icon: GithubIcon,
    external: true,
  },
] as const;

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-heading">
      <SectionHeading
        eyebrow="Contact"
        title="Get in touch"
        level="h1"
        id="contact-heading"
        description="Send a message through the form — it goes straight to Haider's email. He replies within 24 hours. Or reach him directly by email, phone, LinkedIn or GitHub."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {contactMethods.map((method, i) => (
          <Reveal key={method.label} delay={Math.min(i * 0.06, 0.18)}>
            <a
              href={method.href}
              {...(method.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex h-full items-start gap-4 rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md "
            >
              <span
                aria-hidden="true"
                className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent "
              >
                <method.icon className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-medium text-muted">
                  {method.label}
                </span>
                <span className="mt-0.5 block font-medium text-foreground transition-colors duration-200 group-hover:text-accent dark:group-hover:text-accent">
                  {method.value}
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <div className="mt-10">
          <ContactForm />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" asChild>
            <a
              href="/documents/HZ-Resume.pdf"
              download="Haider-Zaman-Resume.pdf"
            >
              <Download />
              Download Resume
            </a>
          </Button>
          {/* Request a call — the top portfolios convert interest into
              a meeting (Asad: Cal.com, Shakir: 15-min call). No
              Cal.com account exists yet, so this is a plain mailto
              with a prefilled subject until one is set up, and the
              label says Request, not Book. */}
          <Button size="lg" variant="secondary" asChild>
            <a
              href={`mailto:${profile.email}?subject=Intro%20call%20with%20Haider%20Zaman`}
            >
              <Calendar />
              Request a 20-minute intro call
            </a>
          </Button>
        </div>
      </Reveal>

      {/* FAQ — the top portfolios answer objections before contact
          (Asad, Ramzan). Controlled accordion: exactly one answer
          open at a time — opening one closes the one before it.
          The same data drives the FAQ JSON-LD. */}
      <Reveal delay={0.1}>
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-navy">
            Frequently asked questions
          </h2>
          <FaqAccordion />
        </div>
      </Reveal>
    </Section>
  );
}
