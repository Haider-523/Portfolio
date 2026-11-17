import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { navLinks, profile } from "@/data/portfolio";

/**
 * Site footer — a server component: it needs no interactivity, so it
 * ships zero client JavaScript. The year is computed once and cached
 * ("use cache") because Next 16 forbids `new Date()` while
 * prerendering; the site is rebuilt on deploy, so the cached year
 * stays correct.
 */
async function getYear(): Promise<number> {
  "use cache";
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await getYear();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Haider Zaman</p>
          <p className="mt-1 text-sm text-muted">
            {profile.title} — {profile.location}
          </p>
          <p className="mt-3 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="text-accent transition-colors hover:text-accent-hover"
            >
              {profile.email}
            </a>
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-start gap-4">
          <Link
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-accent"
          >
            <span className="sr-only">GitHub</span>
            <GithubIcon className="size-5" />
          </Link>
          <Link
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-accent"
          >
            <span className="sr-only">LinkedIn</span>
            <LinkedinIcon className="size-5" />
          </Link>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-5xl px-4 py-4 text-xs text-muted sm:px-6">
          © {year} Haider Zaman. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
