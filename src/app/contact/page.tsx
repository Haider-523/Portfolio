import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import { Contact } from "@/components/sections/contact";
import { faqs } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Contact | Haider Zaman",
  alternates: { canonical: `${siteUrl}/contact` },
  description:
    "Contact Haider Zaman — send a message through the form, or reach him by email, phone, LinkedIn and GitHub.",
};

/** FAQ JSON-LD — same data as the accordion on the page, so the
 * two cannot drift apart. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Contact />
    </>
  );
}
