import type { Metadata } from "next";
import { About } from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About | Haider Zaman",
  description:
    "About Haider Zaman — .NET Backend Developer, programming instructor and competitive programmer in Multan, Pakistan.",
};

export default function Page() {
  return <About />;
}
