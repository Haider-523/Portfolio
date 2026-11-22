import type { MetadataRoute } from "next";
import { featuredProjects } from "@/data/portfolio";
import { blogPosts } from "@/data/blog";
import { LAST_MODIFIED, siteUrl } from "@/lib/site";

/**
 * Sitemap — absolute URLs (the protocol requires them; root-relative
 * URLs were rejected/ignored by Google, so the sitemap gave the
 * ranking goal nothing). lastModified is a fixed date per page, not
 * `new Date()` on every deploy, so crawlers can tell what changed.
 */
const pages = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.9 },
  { path: "/projects", priority: 0.9 },
  { path: "/experience", priority: 0.9 },
  { path: "/contact", priority: 0.9 },
  { path: "/blog", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map(({ path, priority }) => ({
      url: `${siteUrl}${path}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...featuredProjects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
