"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Count-up for a stat value — the number starts at 0 and counts to
 * its verified final value when it scrolls into view (voice-note
 * feedback, 23 Nov 2026). Values are parsed, never hard-coded:
 * "300+" counts 0→300 with a "+" suffix, "3.44" counts to two
 * decimals, "64/64" counts the numerator with a "/64" suffix.
 * The server and the first paint render the verified final value;
 * the animation only runs on the client, once, when the element is
 * in view. Reduced motion keeps the final value (no animation).
 *
 * Trade-off, stated plainly: a screenshot taken mid-animation
 * catches an intermediate number — that is why the count-up was
 * removed on 21 Nov. The reviewer asked for it back, so it is back;
 * the animation is short (1.2s) and ends exactly on the verified
 * final value.
 */
function parse(value: string): {
  target: number;
  decimals: number;
  suffix: string;
} {
  const fraction = value.match(/^(\d+)\/(\d+)$/);
  if (fraction) {
    return { target: Number(fraction[1]), decimals: 0, suffix: `/${fraction[2]}` };
  }
  const plus = value.match(/^(\d+(?:\.\d+)?)\+$/);
  if (plus) {
    return {
      target: Number(plus[1]),
      decimals: (plus[1].split(".")[1] ?? "").length,
      suffix: "+",
    };
  }
  const plain = value.match(/^(\d+(?:\.\d+)?)$/);
  if (plain) {
    return {
      target: Number(plain[1]),
      decimals: (plain[1].split(".")[1] ?? "").length,
      suffix: "",
    };
  }
  return { target: 0, decimals: 0, suffix: value };
}

export function CountUp({ value }: { value: string }) {
  const { target, decimals, suffix } = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  // First paint (and no-JS) shows the verified final value.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (target === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1200;
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(`${(target * eased).toFixed(decimals)}${suffix}`);
          if (p < 1) {
            raf = requestAnimationFrame(tick);
          } else {
            setDisplay(value);
          }
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, decimals, suffix, value]);

  return <span ref={ref}>{display}</span>;
}
