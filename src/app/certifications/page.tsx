import type { Metadata } from "next";
import { Certifications } from "@/components/sections/certifications";

export const metadata: Metadata = {
  title: "Certifications & Awards | Haider Zaman",
  description:
    "Certifications and awards of Haider Zaman — ICPC, SOFTEC '26, AWS GameDay, CS50x, SQL, Python, C#.",
};

export default function Page() {
  return <Certifications />;
}
