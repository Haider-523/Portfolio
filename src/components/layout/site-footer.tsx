import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/portfolio";

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
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-sm font-medium text-foreground">Haider Zaman</p>
          <p className="text-sm text-muted">
            {profile.title} — {profile.location}
          </p>
        </div>
        <div className="flex items-center gap-4">
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
