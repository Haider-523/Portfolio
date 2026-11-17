import type { Metadata } from "next";
import { GitHubSection } from "@/components/sections/github-section";

export const metadata: Metadata = {
  title: "GitHub | Haider Zaman",
  description:
    "Haider Zaman on GitHub — public repositories SocialApp and UniGuide.",
};

export default function Page() {
  return <GitHubSection />;
}
