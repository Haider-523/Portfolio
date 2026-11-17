import type { Metadata } from "next";
import { Experience } from "@/components/sections/experience";

export const metadata: Metadata = {
  title: "Experience | Haider Zaman",
  description:
    "Experience of Haider Zaman — Software Programming Instructor at Maktab e Qulaab and Junior .NET Developer Intern at CodeAlpha.",
};

export default function Page() {
  return <Experience />;
}
