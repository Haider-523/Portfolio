import Link from "next/link";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/icons";
import {
  availabilityNote,
  lastUpdated,
  navLinks,
  profile,
} from "@/data/portfolio";

/**
 * Site footer — redesigned (voice-note feedback, 23 Nov 2026: the
 * old footer "has no design at all — change the whole footer").
 * A deep forest green band, clearly separate from the page: brand +
 * the availability line, a Navigate column, and a Connect column
 * with labelled links (not bare icons). The bottom bar keeps the
 * copyright and the last-updated date. A server component — it
 * needs no interactivity, so it ships zero client JavaScript.
 * Colours use the navy/on-navy roles (the deep forest green from
 * the palette), so the band stays a distinct, readable band. The
 * lime accent marks the availability dot and the link hovers. The
 * year is computed once and cached ("use cache") because Next 16
 * forbids `new Date()` while prerendering; the site is rebuilt
 * on deploy, so the cached year stays correct.
 */
async function getYear(): Promise<number> {
  "use cache";
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await getYear();
  return (
    <footer className="bg-navy text-on-navy">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold tracking-tight">Haider Zaman</p>
          <p className="mt-1 text-sm text-on-navy/70">
            {profile.title} — {profile.location}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/5 px-3 py-1 text-xs font-medium text-on-navy">
            <span
              aria-hidden="true"
              className="inline-block size-1.5 rounded-full bg-lime"
            />
            {availabilityNote}
          </p>
          <p className="mt-4 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="font-medium text-on-navy underline decoration-on-navy/40 underline-offset-4 transition-colors hover:decoration-on-navy"
            >
              {profile.email}
            </a>
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-xs font-semibold uppercase tracking-wide text-on-navy/60">
            Navigate
          </p>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className="text-sm text-on-navy/80 transition-colors hover:text-on-navy"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/blog"
                className="text-sm text-on-navy/80 transition-colors hover:text-on-navy"
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-on-navy/60">
            Connect
          </p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-on-navy/80 transition-colors hover:text-lime"
              >
                <GithubIcon className="size-4" />
                github.com/Haider-523
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-on-navy/80 transition-colors hover:text-lime"
              >
                <LinkedinIcon className="size-4" />
                linkedin.com/in/haiderzaman-dev
              </a>
            </li>
            <li>
              <a
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-on-navy/80 transition-colors hover:text-lime"
              >
                <InstagramIcon className="size-4" />
                instagram.com/haiderzaman5123
              </a>
            </li>
            <li>
              <a
                href={`tel:${profile.phone.replace(/-/g, "")}`}
                className="text-sm text-on-navy/80 transition-colors hover:text-lime"
              >
                {profile.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-on-navy/60 sm:px-6">
          <p>© {year} Haider Zaman. All rights reserved.</p>
          <p>Last updated {lastUpdated}</p>
        </div>
      </div>
    </footer>
  );
}
