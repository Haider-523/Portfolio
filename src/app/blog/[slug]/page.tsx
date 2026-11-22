import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts, getBlogPostBySlug, type BlogBlock } from "@/data/blog";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post not found | Haider Zaman" };
  const url = `${siteUrl}/blog/${post.slug}`;
  return {
    title: `${post.title} | Haider Zaman`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: `${post.title} | Haider Zaman`,
      description: post.excerpt,
      url,
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${post.title} — Haider Zaman`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Haider Zaman`,
      description: post.excerpt,
      images: ["/images/og-image.jpg"],
    },
  };
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-navy">
          {block.text}
        </h2>
      );
    case "code":
      return (
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-navy p-5 font-mono text-sm leading-relaxed whitespace-pre-wrap text-white/90 break-words">
          <code>{block.text}</code>
        </pre>
      );
    case "list":
      return (
        <ul className="mt-4 list-disc space-y-1.5 pl-5 leading-relaxed text-muted">
          {block.items.map((item) => (
            <li key={item.slice(0, 32)}>{item}</li>
          ))}
        </ul>
      );
    default:
      return (
        <p className="mt-4 leading-relaxed text-muted">{block.text}</p>
      );
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
      <p>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-1" />
          All posts
        </Link>
      </p>
      <h1 className="mt-8 text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl">
        {post.title}
      </h1>
      <p className="mt-4 text-sm text-muted">
        {post.date} · {post.readTime} · Haider Zaman
      </p>
      <div className="mt-2 text-lg leading-relaxed">
        {post.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
      <nav
        aria-label="More writing"
        className="mt-16 border-t border-border pt-8"
      >
        <p className="text-sm text-muted">
          More writing —{" "}
          <Link
            href="/blog"
            className="font-medium text-accent transition-colors hover:text-accent-hover"
          >
            all posts
          </Link>{" "}
          · or see the system this is about on the{" "}
          <Link
            href="/projects/salon-management-system"
            className="font-medium text-accent transition-colors hover:text-accent-hover"
          >
            salon case-study page
          </Link>
          .
        </p>
      </nav>
    </article>
  );
}
