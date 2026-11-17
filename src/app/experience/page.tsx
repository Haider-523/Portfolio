import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import { Experience } from "@/components/sections/experience";

export const metadata: Metadata = {
  title: "Experience | Haider Zaman",
  description:
    "Experience of Haider Zaman — Software Programming Instructor at Maktab e Qulaab, .NET Developer at CodeAlpha (Internship), and Assistant at Hussain Dental Surgery.",
  alternates: { canonical: `${siteUrl}/experience` },
};

export default function Page() {
  return <Experience />;
}
