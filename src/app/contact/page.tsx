import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact | Haider Zaman",
  alternates: { canonical: `${siteUrl}/contact` },
  description:
    "Contact Haider Zaman — send a message through the form, or reach him by email, phone, LinkedIn and GitHub.",
};

export default function Page() {
  return <Contact />;
}
