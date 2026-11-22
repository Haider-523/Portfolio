import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found | Haider Zaman",
  description: "This page does not exist on Haider Zaman's portfolio.",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold tracking-wide text-navy uppercase">
        404
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
        This page does not exist — it may have moved, or the link may be
        mistyped.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" asChild>
          <Link href="/">
            <ArrowLeft />
            Back home
          </Link>
        </Button>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/projects">View projects</Link>
        </Button>
      </div>
    </div>
  );
}
