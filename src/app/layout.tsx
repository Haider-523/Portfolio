import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AssistantLauncher } from "@/components/assistant/assistant-launcher";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const description =
  "Haider Zaman Multan — ASP.NET Core Developer in Multan, Pakistan. C#, ASP.NET Core, Entity Framework Core, SQL Server and REST APIs.";

// The title carries the exact ranking keyword "Haider Zaman Multan".
// It is metadata only — the visible display name stays "Haider Zaman".
const title = "Haider Zaman Multan | ASP.NET Core Developer";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: siteUrl },
  // Google Search Console ownership verification (Haider added the
  // property 23 Nov 2026 and sent the HTML-tag code). Next.js
  // renders this as <meta name="google-site-verification"> in
  // <head> on every page.
  verification: {
    google: "Y4wPHTO9awUeDIvWDMEuhwDC9PMwRfQcLiCYBIEOQ7o",
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Haider Zaman — .NET Backend Developer, Multan, Pakistan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Haider Zaman",
  jobTitle: "ASP.NET Core Developer",
  description,
  url: siteUrl,
  image: `${siteUrl}/images/haider-zaman.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Multan",
    addressCountry: "PK",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "MNS University of Agriculture, Multan",
  },
  sameAs: [profile.linkedin, profile.github],
  knowsAbout: [
    "C#",
    "ASP.NET Core",
    "Entity Framework Core",
    "SQL Server",
    "REST APIs",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
            }}
          />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-accent"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content" className="flex-1">{children}</main>
          <SiteFooter />
          <AssistantLauncher />
        </ThemeProvider>
      </body>
    </html>
  );
}
