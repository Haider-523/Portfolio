import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/motion/reveal";
import { blogPosts } from "@/data/blog";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog | Haider Zaman",
  alternates: { canonical: `${siteUrl}/blog` },
  description:
    "Short technical writing by Haider Zaman — how the salon system was tested to 64/64, and the filtered unique index behind its chairs.",
};

/**
 * Blog index — not a nav item (nav stays exactly 5). Linked from
 * the salon case-study page and the footer. Two posts to start,
 * both about the salon system, both built on verified facts.
 */
export default function Page() {
  return (
    <Section id="blog" labelledBy="blog-heading" tone="soft">
      <SectionHeading
        eyebrow="Blog"
        num="01"
        title="Writing"
        level="h1"
        id="blog-heading"
        description="Short posts about real systems I built — the testing, the database decisions, and what was not verified."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {blogPosts.map((post, i) => (
          <Reveal key={post.slug} delay={Math.min(i * 0.06, 0.18)}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md"
            >
              <p className="text-sm text-muted">
                {post.date} · {post.readTime}
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-navy transition-colors group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {post.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                Read
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
