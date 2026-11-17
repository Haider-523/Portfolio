import type { MetadataRoute } from "next";
import { featuredProjects } from "@/data/portfolio";

/**
 * NOTE: URLs are root-relative for now. When Haider deploys, set the
 * real base URL here (and in robots) — no live domain is claimed yet.
 */
const pages = [
  "/",
  "/about",
  "/projects",
  "/skills",
  "/experience",
  "/education",
  "/certifications",
  "/journey",
  "/github",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...pages.slice(1).map((url) => ({
      url,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...featuredProjects.map((project) => ({
      url: `/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
