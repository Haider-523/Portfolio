import type { Metadata } from "next";
import { Education } from "@/components/sections/education";

export const metadata: Metadata = {
  title: "Education | Haider Zaman",
  description:
    "Education of Haider Zaman — BS Computer Science at MNS University of Agriculture, Multan, CGPA 3.44.",
};

export default function Page() {
  return <Education />;
}
