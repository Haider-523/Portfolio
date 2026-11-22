"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X } from "lucide-react";
import { navLinks } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Site header — multi-page nav. The active link is the current page
 * (pathname match; /projects/[slug] counts as Projects). No scroll-spy:
 * every nav tab is its own page. Logo is Haider's photo — no "HZ"
 * initials avatar anywhere on the site.
 */
export function SiteHeader() {
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  // Route progress: a thin teal bar that runs from the moment a nav
  // link is clicked until the new page's pathname lands, so a click
  // feels instant even before the page arrives.
  const [progress, setProgress] = React.useState<"idle" | "loading" | "done">(
    "idle",
  );
  const firstRender = React.useRef(true);

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setProgress("done");
    const t = setTimeout(() => setProgress("idle"), 400);
    return () => clearTimeout(t);
  }, [pathname]);

  // Close the mobile menu on Escape, and on navigation. While the
  // menu is open the page behind it does not scroll; when it closes,
  // focus returns to the toggle button.
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const toggle = menuButtonRef.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      toggle?.focus();
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      {progress !== "idle" ? (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-0.5 overflow-hidden"
        >
          <div
            className={cn(
              "h-full bg-accent",
              progress === "loading"
                ? "route-progress-loading"
                : "route-progress-done",
            )}
          />
        </div>
      ) : null}
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          onClick={() => {
            setMenuOpen(false);
            if (pathname !== "/") setProgress("loading");
          }}
          className="group flex shrink-0 items-center gap-2.5 text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
          aria-label="Haider Zaman — home"
        >
          <Image
            src="/images/haider-zaman.jpg"
            alt="Haider Zaman"
            width={32}
            height={32}
            priority
            className="size-8 rounded-full object-cover object-top transition-transform duration-200 group-hover:-translate-y-0.5"
          />
          Haider Zaman
        </Link>

        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.id}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={() => {
                  if (!active) setProgress("loading");
                }}
                className={cn(
                  "nav-link rounded-md px-3 py-2 font-mono text-[15px] font-medium transition-colors duration-200",
                  active ? "text-accent" : "text-muted hover:text-accent",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          {/* No availability pill or social icons here (voice-note
              feedback, 23 Nov 2026): the "Seeking junior .NET roles"
              line lives in the hero, and GitHub/LinkedIn are in the
              footer, the hero and the contact page. */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="hover:text-accent"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <Sun className="hidden size-5 dark:block" />
            <Moon className="size-5 dark:hidden" />
          </Button>
          <Button
            ref={menuButtonRef}
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "border-t border-border lg:hidden",
          menuOpen ? "block" : "hidden",
        )}
      >
        <nav
          className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6"
          aria-label="Mobile"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.id}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={() => {
                  setMenuOpen(false);
                  if (!active) setProgress("loading");
                }}
                className={cn(
                  "rounded-md px-3 py-2.5 font-mono text-base font-medium transition-colors duration-200",
                  active
                    ? "text-accent"
                    : "text-muted hover:bg-background hover:text-accent",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
