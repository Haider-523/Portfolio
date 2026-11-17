# Haider Zaman — Portfolio (Next.js, multi-page)

Recruiter-focused developer portfolio, built per the approved
MASTER PROMPT and rebuilt 2026-11-17 as a **multi-page site**:
every nav tab is its own page. Finished 2026-11-17.

Built locally only. **NOT pushed to GitHub, NOT deployed to Vercel/Netlify.**
Haider deploys it himself.

The old Template B plain-HTML build is untouched at
`../portfolio/` — this project is a separate folder and does not
replace it on disk.

## Stack

- Next.js 16.4.6 (App Router), React 19.3, TypeScript strict
- Tailwind CSS 4.3.3, shadcn/ui-style components (`src/components/ui/`),
  Lucide React, Framer Motion
- `next-themes` for the light/dark theme toggle
- No database. AI assistant: server-side Gemini (optional key) with a
  fail-closed curated knowledge base — see below.

## Run locally

```bash
npm install
npm run build   # production build — run this once
npm run start   # serve the production build: http://localhost:3000 (FAST)
npm run lint    # ESLint
npx tsc --noEmit
```

> **Use `npm run build` + `npm run start`, not `npm run dev`, to view
> the site.** `npm run dev` is the development server: it compiles
> every page on demand, so the first visit to each page takes
> 1–12 seconds by design (measured 2026-11-17: home 11.5s on first
> hit in dev). The production build serves the same pages in
> 3–5 ms. `dev` is only for editing code.

Node 24 is used on this VM.

## Performance — why pages felt slow, and what changed (2026-11-17)

Measured, not guessed (curl, localhost, this VM):

| | Before | After |
| --- | --- | --- |
| Prod TTFB, slowest page (`/`, cold) | 55 ms | 61 ms |
| Prod TTFB, warm (all pages) | 3–5 ms | 3–5 ms |
| **Dev TTFB, `/` first hit** | **11.5 s** | — (dev is dev) |
| Dev TTFB, other pages first hit | 1.3–1.9 s | — (dev is dev) |
| JS referenced on home page | ~788 KB | ~625 KB |
| Hero visible in server HTML | No — `opacity: 0` until JS + 0.5 s animation | Yes — no hidden state |

The server was never slow: production TTFB was 14–55 ms cold and
3–5 ms warm before the fix too. The real causes were (1) Haider was
running `npm run dev`, which compiles each page on first visit
(11.5 s for home), and (2) the hero and every section started at
`opacity: 0` inside Framer Motion client components, so nothing
appeared until ~625–788 KB of JavaScript downloaded, hydrated and
the 0.5 s entrance animations (delays up to 0.3 s) ran.

Fixes applied:

- **Framer Motion removed entirely** (`npm uninstall framer-motion`,
  no motion code in any shipped chunk). Reveals are now a tiny
  IntersectionObserver + CSS transition (0.3 s, delay capped at
  0.12 s). Content is visible by default in the server HTML — the
  hidden state is only applied after mount to below-the-fold
  content, so the page reads instantly even before hydration or if
  JavaScript fails.
- **Hero is a server component with no entrance animation** — in the
  HTML on first paint, no wait for JS.
- **AI assistant is lazy**: only a small launcher button ships in
  the initial bundle; the chat panel downloads the first time it is
  opened.
- **Route progress bar**: a thin emerald bar runs from nav-link click
  until the new page's pathname lands, so clicks feel instant.
- **Prefetch**: nav links are Next.js `Link`s (prefetch on, static
  pages) — in production the next page is usually already
  downloaded before the click.
- **Fonts are self-hosted** (Geist via `next/font/google`, woff2 in
  the build) — no remote font fetch. Photo is served optimised by
  `next/image` (640 px, ~100 KB at quality 70, first hit ~0.3 s to
  generate, then cached); `next-themes` is only a tiny inline
  script, not a blocker.
- **Second round (2026-11-17, still reported slow):** client-side
  audit found exactly 5 client components — theme provider, header,
  reveal, assistant launcher, assistant panel — and nothing else.
  The footer was still a client component (dynamic year via
  `useSyncExternalStore`); it is now a server component, so the
  shared layout chunk carries no footer JS. `next.config.ts` now
  sets `optimizePackageImports: ["lucide-react"]` and router-cache
  `staleTimes: { dynamic: 30, static: 300 }`, so prefetched static
  pages stay cached 5 minutes and repeat/back navigation needs no
  new request. Hero photo reduced to 560×700 at quality 70.
  Re-measured after: home first-load JS ~209 KB gzip (framework
  floor — React + Next router, unavoidable in App Router), prod
  TTFB 6–21 ms cold, ~5 ms warm. If a page still feels slow on
  your machine, it is `npm run dev` (11.5 s first compile) or a
  cold first image generation — run `npm run build` once, then
  `npm run start`, and leave the server running.
- Median production total time per page after the fix: **3–5 ms**
  warm, slowest cold 61 ms (home, first hit).

Known quirk (unchanged): an unknown project slug returns 200 on the
very first request after a cold server start, then 404 on repeat —
Next.js 16 cacheComponents/PPR behaviour. Steady state is 404.

## Pages (10 + 5 project detail pages)

| Route | Page |
| --- | --- |
| `/` | Home — hero + featured projects preview + CTA |
| `/about` | About + photo |
| `/projects` | All 5 featured projects |
| `/projects/[slug]` | Project detail / case study (5 slugs) |
| `/skills` | Skills (his stack only) |
| `/experience` | Experience (3 verified roles) |
| `/education` | Education (BSCS, CGPA 3.44) |
| `/certifications` | Certifications & Awards (6 + 12 = 18) |
| `/journey` | Journey timeline + competitions |
| `/github` | GitHub — 2 public repos, honestly described |
| `/contact` | Contact — mailto/tel/LinkedIn/GitHub, no form |

Header nav links to real pages (pathname-based active state, mobile
menu closes on navigation / Escape). Footer on every page. No
`/#section` anchor navigation remains anywhere.

## Research findings applied

Sourced research (prior research pass) — applied, not just noted:

1. **6-second scan:** the hero must answer "can this person finish
   real work?" — name, exact target role, one-line value, proof,
   2 CTAs, first project visible fast. Mobile load matters (50%+
   recruiter clicks via LinkedIn on mobile).
2. **Hero order — offer first, name second, proof third:** eyebrow
   (target role) → headline stating the offer → credibility line →
   2 CTAs → photo. No skill percentage bars.
3. **Multi-page wins** for 5 projects + deep case studies; home stays
   scannable, depth one click away.
4. **Mature palettes:** neutrals + ONE disciplined accent, soft
   surface colour instead of pure white, high contrast from luminance
   not saturated colour, no gradients, no multi-colour blocks.
5. **AI assistant must be fail-closed:** the model is never the
   knowledge base — a curated data file is; closed-book prompt
   ("answer ONLY from the context below; never invent"); an
   empty-retrieval gate before the model runs; refusal "I don't have
   verified information on that" + contact redirect when evidence
   is missing.

Sources: blog.talk2luke.com, helloaihub.tech, swift.id, uixdraft.com,
website.prasadkamble.com, smartprogramming.in, dev.to (one-page
portfolios + portfolio agent that can't make things up), toolstep.top,
media.io professional/neutral palettes, convertico.com,
cesarayala.dev, blog.manjunathhk.in, adityajain.me.

## Design — palette specified exactly by Haider

Haider specified this palette himself on 2026-11-17 (updated the same
day). It supersedes the navy/teal palette and the single blue accent
before it. Rationale, in his words: use exactly these colours, no
other accent.

| Role | Light | Dark (same roles, hues lightened for dark bg) |
| --- | --- | --- |
| Background | `#FFFFFF` | `#111827` |
| Surface (alternating section bands) | `#F9FAFB` | `#1F2937` |
| Body text | `#111827` | `#F9FAFB` |
| Muted text / borders | `#4B5563` / `#E5E7EB` | `#9CA3AF` / `#374151` |
| Headings & key elements | `#1F2937` | `#F9FAFB` |
| Buttons & links | emerald `#047857` (hover `#065F46`) | emerald `#34D399` (hover `#6EE7B7`) |

Rules: the heading colour is for headings, eyebrows, stat values,
timeline markers and key elements — never buttons/links. Emerald is
ONLY for buttons, links and interactive hover states — never large
colour blocks or headings. Muted text/borders are neutral greys
derived from the body text, not extra colours. No gradients, no
multi-colour blocks. (The old CSS token names `--navy` / `--accent`
are kept as aliases — their values are the new palette above.)

**Background:** a subtle flat 2D dot grid, painted as the body
background. Light: body-text dots at 6% opacity on `#FFFFFF`;
dark: light dots at 7% on `#111827`. 24px grid, 1px dots. Static —
no animation, no parallax, no gradient wash, no glassmorphism.

Typography: Geist, strong hierarchy. Light and dark themes with a
working toggle (system default).

## Motion & hover (rebuilt 2026-11-17 — Framer Motion removed, no regression)

Restrained and professional only — no bounce, no spin, no typewriter,
no overshow:

- Hero: **no entrance animation** — content is in the server HTML
  and visible on first paint.
- Sections: `Reveal` — CSS-only fade + 12px slide-up on scroll,
  once, 0.3s, stagger capped at 0.12s, implemented with
  IntersectionObserver (`src/components/motion/reveal.tsx`). Content
  is visible by default; only below-the-fold content is briefly
  hidden after mount.
- Desktop nav underline slides in from the left on hover and for the
  active (current-page) link. A thin emerald route-progress bar runs
  while a navigation is in flight.
- Hover on everything interactive: buttons lift + deepen + shadow
  (primary/secondary) or lift slightly (ghost); project/GitHub cards
  lift + emerald border + shadow, with the arrow shifting; skill chips
  change border/background (emerald fill on hover); social icons lift +
  turn emerald; stat values lift subtly; timeline dots scale.
- All motion is disabled under `prefers-reduced-motion`: CSS forces
  near-zero durations.

## Hero decisions (recruiter-friendly, 6-second scan)

- Eyebrow first: exact role line
  ".NET Backend Developer — ASP.NET Core, C#, SQL Server".
- Name second: "Haider Zaman", then the offer as headline:
  "I build real, tested backend systems."
- Credibility line: salon system for a real client (64/64 tests
  passing), SocialApp, UniGuide — plus the stack.
- Proof strip (4 stats): 300+ problems solved, 15+ competitions,
  CGPA 3.44, 64/64 tests passing — Salon system.
- CTAs: Download Resume (primary), View Projects, Contact.
- Photo right of the hero (tight 4/5 portrait crop, `object-top`),
  location "Multan, Pakistan" visible.
- No "passionate developer" fluff, no skill bars, no invented job
  title or company.

**Availability wording — confirmed by Haider on 2026-11-17:** the hero
says "Seeking opportunities — junior .NET backend roles." Keep as-is.

## Photo

`public/images/haider-zaman.jpg` (900×1600 JPEG, full-body outdoor,
219,926 bytes) — the only photo on the site; no stock images. Used
with `next/image`: hero (4/5 crop, `object-position: top`, priority),
a smaller version on About, a 32px round crop as the header logo,
and as the Open Graph image. No "HZ" initials avatar anywhere.

## AI Portfolio Assistant (Gemini, server-side, fail-closed)

Floating "AI Assistant" widget on every page
(`src/components/assistant/assistant-widget.tsx`), backed by
`POST /api/assistant` (`src/app/api/assistant/route.ts`).

- **Knowledge base is the only source:**
  `src/lib/assistant-knowledge.ts`, built exclusively from
  `src/data/portfolio.ts` (verified portfolio data). The model is
  never the knowledge base.
- **Retrieval gate first:** the question is scored against the
  knowledge base; with no matching chunk the API refuses WITHOUT
  calling any model.
- **Closed-book prompt:** the model gets only the retrieved chunks
  and is told to answer only from them, never invent, and reply
  with exactly "I don't have verified information on that." +
  contact redirect when the context does not cover the question.
- **To-the-point answers (2026-11-17):** every knowledge chunk
  carries a pre-written `short` answer — 1–3 sentences, fact first,
  no greeting, no filler. The no-key path returns that short answer
  directly (no "From Haider's verified portfolio data…" prefix, no
  long extract). The Gemini prompt now caps answers at 60 words,
  fact first, and the server strips filler openers and truncates
  over-long model answers at a sentence boundary. Out-of-scope
  questions get one sentence: "I don't have verified information
  on that." + the contact redirect. The widget shows 6 suggested
  quick questions (CGPA, projects, stack, contact, experience,
  certifications).
- **No key, no invention:** if `GEMINI_API_KEY` is not set, the API
  returns the best-matching chunk's short answer.
- **No secret in the repo:** `.env.example` has only a commented
  placeholder. No `.env` file is committed. No key is ever sent to
  the browser. There is no Gemini connector doc/helper in
  `~/workspace/custom-connectors/` (empty) — the route calls the
  Gemini REST API (`gemini-2.5-flash`) directly with the server-side
  key when present.

**What was verified live (2026-11-17, production server):**

- "What is Haider Zaman CGPA?" → "BS Computer Science at MNS
  University of Agriculture, Multan (2024–2028). CGPA 3.44/4.00.",
  source `verified-data`.
- "What projects has Haider built?" → the 5-project bullet list,
  source `verified-data`.
- "What is his tech stack?" → "C#, .NET, ASP.NET Core, Entity
  Framework Core, SQL Server, SQLite, and WPF. He also uses C, C++,
  HTML, and CSS.", source `verified-data`.
- "How do I contact Haider?" → email + phone + LinkedIn + GitHub,
  source `verified-data`.
- "What is his experience?" → instructor + CodeAlpha intern,
  source `verified-data`.
- "Tell me a joke" → exact refusal + contact redirect, source
  `refusal`, no model call.
- Empty message → HTTP 400.
- 12-question debug run (incl. "Where did Haider study?", "Is
  Haider available for work?", "What is Haider's GitHub?", "What is
  the weather today?") — all correct; two routing bugs were found
  and fixed during it (substring scoring misrouted "projects" and
  "certifications" questions; a `\b` in the availability regex never
  matched "available"). Retrieval is now intent routing first, then
  token scoring.

**What was NOT verified live:** the Gemini model call itself.
No `GEMINI_API_KEY` is available in this sandbox (the connected
Gemini credential from 2026-11-16 lives in Muse's secure store, not
in this repo or environment), so the `gemini` code path — REST call,
closed-book prompt, response parsing — is built but untested
end-to-end. Before relying on it, set `GEMINI_API_KEY` on the
deploy host and ask one in-scope and one out-of-scope question;
if the model path fails, the API falls back to the verified-data
extractive answer, never to invention.

## Certifications & Awards — verification

Page: `/certifications` — 6 awards + 12 certifications = 18 items,
matching the 18 on LinkedIn. Awards are NOT double-counted as
certifications. Source: the old Template B build
(`../portfolio/certifications.html`) cross-checked against the
signed-in LinkedIn audit of 2026-11-07 (which named only some of
the 18) and the resume (which lists no certifications).

- **Dates shown only where the audit confirms them** (Copilot
  Oct 2026; SQL Aug 2025; Python Dec 2024; C# Jun 2025; Excel
  Oct 2024; CS50x Puzzle Day 2025). The old build's dates conflict
  with the audit in several cases (SQL May 2026 vs Aug 2025; C#
  May 2026 vs Jun 2025; Python May 2026 vs Dec 2024; Excel Jul 2025
  vs Oct 2024; CS50x 2026 vs 2025), so all other dates are omitted,
  not guessed.
- **8 items flagged "Unverified — confirm before publishing"**
  (they appear only in the old build): 1 award — Certificate of
  Appreciation, Brand Scape; 7 certifications — AI & Laptop
  Optimization Workshops; Advanced Social Media Strategy; Foundation
  of Cyber Security; Graphics Designing and UI/UX Designing Workshop;
  Certificate of Merit; Scout Camp — Rahyan-E-Karbala Wa
  Mohiban-E-Watan; Coding Competition at IOC, MNSUAM.
- The LinkedIn audit also flagged the Scout Camp, Certificate of
  Merit and Graphics workshop as irrelevant/diluting — they are kept
  but flagged, not hidden.

## Experience — verification

Page: `/experience` — 3 roles only: Software Programming Instructor,
Maktab e Qulaab (Sep 2024 – Present, 20+ students, PF/OOP/DSA/
Python); Junior .NET Developer Intern, CodeAlpha (Aug – Sep 2026);
Team Leader, 3-member ICPC team "Multan Al-Khwarizmi". No other
employment claims. **Discrepancy stated on the page:** the resume
lists the instructor role as Independent; LinkedIn lists it under
Maktab e Qulaab.

## Contact form (FormSubmit, added 2026-11-17)

Page: `/contact` — a message form (name, email, subject optional,
message) alongside the existing mailto/tel/LinkedIn/GitHub options.
It posts to FormSubmit (`https://formsubmit.co/haiderzaman.dev@gmail.com`,
no account or key) with hidden fields `_subject` "New message from
your portfolio", `_template` "table", `_captcha` "true". With
JavaScript, submission goes to FormSubmit's AJAX endpoint and the
page shows real states — sending (button disabled) → sent only
after FormSubmit returns `{"success": "true"}` → error with a
mailto fallback. A success message is never shown before the server
confirms. Without JavaScript, the form posts normally to the
standard FormSubmit URL.

**Activation — Haider must do this once:** the FIRST message
triggers an activation email to haiderzaman.dev@gmail.com. He must
click the activation link in that email; until he does, messages do
not arrive in his inbox. This is stated on the Contact page itself.

**Not verified end-to-end:** no test message was sent from this
sandbox (FormSubmit was reachable, but delivery was not tested and
no message was delivered), so activation is still pending.

## Content rules (verified data only)

- Visible name is only **"Haider Zaman"**. The exact phrase
  "Haider Zaman Multan" appears only in the meta description and the
  JSON-LD Person schema — never as visible text (verified: 0× in
  rendered visible text).
- Stats: 300+ problems solved, 15+ competitions, CGPA 3.44/4.00
  (confirmed by Haider 2026-11-17; the resume printed 3.38 / 100+).
- LinkedIn is https://www.linkedin.com/in/haiderzaman-dev
  (not the haider-zaman-49209637b URL printed on the resume —
  the resume PDF itself still prints the old URL; the site does not).
- Contact shows both email (haiderzaman.dev@gmail.com) and phone
  (+92370-1403149), as `mailto:`/`tel:` links, plus a message form
  (see "Contact form" below) — the mailto-only rule was superseded
  by Haider on 2026-11-17.
- Skills listed are Haider's stack only:
  C#, .NET, ASP.NET Core, EF Core, SQL Server, SQLite, WPF,
  plus resume-verified languages C, C++, HTML, CSS (labelled
  "languages used", not expert claims). Next.js/React/TypeScript
  are the build stack, not claimed skills (the Skills page says so
  explicitly). No percentage skill bars.
- Featured projects (in order): Stylish Hair Salon Management System,
  SocialApp, UniGuide, MBTI Quiz, Dynamic Quiz & Evaluation System.
  Salon features come only from `~/workspace/salon/` README and
  docs/01, 02, 04. Only the SocialApp and UniGuide repo links are
  shown (verified public); UniGuide's repo is README-only and says so.
  Salon code is not public and says so. No screenshots — typographic
  cards only. Every project detail page carries an explicit
  verification note stating what is and is not verified.
- Journey/competitions name only contests in the resume; no invented
  employment history.
- GitHub section shows the profile and the two public repos with
  honest descriptions — no fabricated stars, graphs or commit counts.

## Structure

```text
src/
  app/
    layout.tsx        # metadata, JSON-LD, header/footer, assistant widget
    page.tsx          # home — Hero + featured preview + CTA
    about|projects|skills|experience|education|certifications|journey|github|contact/page.tsx
    projects/[slug]/page.tsx   # project detail pages (generateStaticParams)
    api/assistant/route.ts     # AI assistant endpoint (fail-closed)
    globals.css       # Tailwind v4 theme tokens (Haider's palette), dot grid, motion rules
    robots.ts         # /robots.txt
    sitemap.ts        # /sitemap.xml (root-relative until deploy)
  components/
    layout/           # site-header.tsx (multi-page nav, photo logo), site-footer.tsx
    sections/         # hero, about, projects, project-card, skills, experience,
                      # education, certifications, journey, github-section, contact
    assistant/        # assistant-widget.tsx — floating chat
    motion/           # reveal.tsx — Reveal (scroll fade-up) + SectionHeading + Section
    ui/               # button.tsx (shadcn/ui style, cva)
    theme-provider.tsx
  data/
    portfolio.ts      # centralised verified data (profile, stats, projects,
                      # skills, journey, experience, awards, certifications)
  lib/
    utils.ts          # cn()
    assistant.ts              # retrieval gate + closed-book Gemini call + fallback
    assistant-knowledge.ts    # curated knowledge base (portfolio.ts only)
public/
  documents/HZ-Resume.pdf   # real resume — Download Resume serves this file
  images/haider-zaman.jpg   # Haider's photo (hero, About, header logo, OG image)
```

## Verification (2026-11-17, run before reporting)

- `npx tsc --noEmit` — pass. `npm run lint` — pass.
- `npm run build` — pass, 22 pages (10 pages + 5 project pages +
  robots + sitemap + API route + not-found).
- Production server (`npm run start`, port 3100), every route curled:
  `/`, `/about`, `/projects`, `/skills`, `/experience`,
  `/education`, `/certifications`, `/journey`, `/github`,
  `/contact`, all 5 `/projects/[slug]`, `/robots.txt`,
  `/sitemap.xml`, `/documents/HZ-Resume.pdf`,
  `/images/haider-zaman.jpg` — all HTTP 200.
- Unknown project slug `/projects/does-not-exist` — **HTTP 404 on
  all repeat checks**, rendering "This page could not be found".
  Quirk, observed twice: the very first request to it after a cold
  server start returns HTTP 200 with the 404 page body; the second
  request returns 404 and the 404 is then cached. This is Next 16
  `cacheComponents` / Partial Prerendering behaviour — there is no
  per-route PPR opt-out in Next 16 (`experimental_ppr` was removed).
  Steady state after deploy warm-up is 404; re-check once after deploy.
- Visible-text checks on rendered home: "Haider Zaman Multan" 0×,
  wrong LinkedIn `49209637b` 0×, no `/#` anchor hrefs anywhere,
  no "HZ" initials avatar, photo + role line + proof stats + all 3
  CTAs + location present.
- Source checks: no `#2563EB` / `#1D4ED8` / bright blue anywhere in
  `src`; compiled CSS contains the new palette (`#FFFFFF`, `#111827`,
  `#1F2937`, `#047857`) and no old navy/teal (`#2B5D7E`, `#0F766E`).
- Sitemap lists all 10 pages + 5 project pages.

## What is pending (not built / not verified)

- Contact form delivery — NOT tested end-to-end. FormSubmit's site
  is reachable from this sandbox (GET 200), but POSTs to its AJAX
  endpoint timed out here, and no test message was sent. Haider
  must click the activation link in the first activation email
  before any message arrives in his inbox. Send one real test
  message after deploy and confirm it arrives.
- AI assistant Gemini live call — untested (no key in this sandbox);
  see above. Test on the deploy host with a key set.
- Deployment — Haider's job (GitHub push + Vercel/Netlify).
- Sitemap/robots base URL and `metadataBase`: root-relative until
  Haider chooses the live domain — the build warns
  `metadataBase … is not set … using "http://localhost:3000"` for
  the Open Graph image. Set `metadataBase` to the live domain on deploy.
- 8 certification/award items flagged unverified — confirm before
  publishing (or remove them).
- Instructor role: resume says Independent, LinkedIn says Maktab e
  Qulaab — stated on the Experience page; Haider to confirm which
  is right.
- No secrets in this repo. `.env.example` lists only a commented
  placeholder for the Gemini key.
