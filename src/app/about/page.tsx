import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";
import { Certifications } from "@/components/sections/certifications";

export const metadata: Metadata = {
  title: "About | Haider Zaman",
  description:
    "About Haider Zaman — .NET Backend Developer, programming instructor and competitive programmer in Multan, Pakistan. Skills, education and certifications included.",
};

/**
 * About page — one page holds the whole story: About, then Skills,
 * Education and Certifications & Awards folded in as sections.
 * They lost their own nav items (2026-11-17, 5-item nav), not their
 * content — every fact is still on this page.
 */
export default function Page() {
  return (
    <>
      <About />
      <Skills />
      <Education />
      <Certifications />
    </>
  );
}
