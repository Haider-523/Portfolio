import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import { Projects } from "@/components/sections/projects";

export const metadata: Metadata = {
  title: "Projects | Haider Zaman",
  alternates: { canonical: `${siteUrl}/projects` },
  description:
    "Featured projects by Haider Zaman — Stylish Hair Salon Management System, SocialApp, UniGuide, MBTI Quiz and Dynamic Quiz.",
};

export default function Page() {
  return <Projects />;
}
