/**
 * Corner brackets — the Agentware hover language, in the portfolio's
 * own green. Four L-shaped brackets fade in at the card's corners
 * on hover. The parent card must be `relative` and carry `group`;
 * the brackets are aria-hidden and pointer-events-none, so they
 * never interfere with the card's content or links.
 */
export function HoverBrackets() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-2 top-2 z-10 size-3 border-l-2 border-t-2 border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-2 top-2 z-10 size-3 border-r-2 border-t-2 border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 left-2 z-10 size-3 border-b-2 border-l-2 border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 right-2 z-10 size-3 border-b-2 border-r-2 border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
    </>
  );
}
