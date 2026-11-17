import type { Metadata } from "next";
import { Experience } from "@/components/sections/experience";

export const metadata: Metadata = {
  title: "Experience | Haider Zaman",
  description:
    "Experience of Haider Zaman — Software Programming Instructor at Maktab e Qulaab and .NET Developer at CodeAlpha (Internship).",
};

export default function Page() {
  return <Experience />;
}
