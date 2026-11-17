import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/data/portfolio";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AssistantLauncher } from "@/components/assistant/assistant-launcher";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Haider Zaman Multan — ASP.NET Core Developer in Multan, Pakistan. C#, ASP.NET Core, Entity Framework Core, SQL Server and REST APIs.";

export const metadata: Metadata = {
  title: "Haider Zaman | ASP.NET Core Developer",
  description,
  openGraph: {
    title: "Haider Zaman | ASP.NET Core Developer",
    description,
    type: "website",
    images: [
      {
        url: "/images/haider-zaman.jpg",
        width: 900,
        height: 1600,
        alt: "Haider Zaman — .NET Backend Developer, Multan, Pakistan",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Haider Zaman",
  jobTitle: "ASP.NET Core Developer",
  description,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
            }}
          />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <AssistantLauncher />
        </ThemeProvider>
      </body>
    </html>
  );
}
