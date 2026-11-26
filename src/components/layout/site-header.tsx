"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  // Mission-control chrome (26 Nov 2026, Agentware-inspired):
  // a lime scroll-progress bar across the top, and a shadow +
  // backdrop blur once the page is scrolled. Colours stay the
  // green + cream palette — only the chrome is new.
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setScrollProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
      setScrolled(el.scrollTop > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // No route progress bar (Haider, 26 Nov 2026): pages are static
  // and open without a loading state, so there is no loading bar to
  // show — a click goes straight to the next page.

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
    <header
      id="top"
      className={cn(
        "sticky top-0 z-40 border-b border-border bg-background",
        scrolled && "shadow-[0_1px_12px_rgb(15_61_46/0.08)] backdrop-blur-md",
      )}
    >
      {/* Scroll progress — lime bar across the very top. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] bg-transparent"
      >
        <div
          className="h-full bg-lime transition-[width] duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          onClick={() => {
            setMenuOpen(false);
          }}
          className="group flex shrink-0 items-center gap-2.5 text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
          aria-label="Haider Zaman — home"
        >
          <Image
            src="/images/haider-zaman.png"
            alt="Haider Zaman"
            width={32}
            height={32}
            priority
            className="photo-shadow-sm size-8 rounded-full object-cover object-top transition-transform duration-200 group-hover:-translate-y-0.5"
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
                className={cn(
                  "group rounded-md px-3 py-2 font-mono text-[15px] font-medium transition-colors duration-200",
                  active
                    ? "bg-mint text-accent"
                    : "text-muted hover:text-accent",
                )}
              >
                {/* Corner brackets on hover (Agentware-style) — the
                    bracket spans fade in; active page keeps them. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "text-accent transition-opacity duration-200",
                    active
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100",
                  )}
                >
                  [
                </span>
                {link.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "text-accent transition-opacity duration-200",
                    active
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100",
                  )}
                >
                  ]
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          {/* Terminal-style status pill (26 Nov 2026): the header
              was bare, so a compact availability signal returns —
              small, mono, and distinct from the old pill removed
              on 23 Nov. The full seeking line lives in the hero. */}
          <span className="mr-2 hidden items-center gap-2 rounded-full border border-border bg-background px-3 py-1 font-mono text-xs font-medium text-accent lg:inline-flex">
            <span
              aria-hidden="true"
              className="inline-block size-1.5 animate-pulse rounded-full bg-lime"
            />
            AVAILABLE
          </span>
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
