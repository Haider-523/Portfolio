/**
 * Centralised portfolio data — verified information only.
 *
 * Sources: Haider's resume (HZ-Resume.pdf, received 2026-11-16),
 * LinkedIn re-audit (2026-11-17, signed in), GitHub profile
 * https://github.com/Haider-523 (verified 2026-11-12), and the
 * Stylish Hair Salon workspace (~/workspace/salon/ README + docs).
 *
 * Conflicts resolved by Haider on 2026-11-17:
 * - LinkedIn is haiderzaman-dev (NOT the haider-zaman-49209637b URL
 *   printed on the resume).
 * - CGPA 3.44/4.00 and 300+ problems solved (NOT the resume's 3.38 / 100+).
 * - Contact shows both email and phone.
 * - Featured projects: Salon, SocialApp, UniGuide, MBTI Quiz, Dynamic Quiz.
 *
 * Nothing in this file is invented. Details that are not verified
 * (features, screenshots, links, live demos) are omitted, not guessed.
 * Every project carries an explicit verification note saying what is
 * and is not verified.
 */

export const profile = {
  name: "Haider Zaman",
  title: ".NET Backend Developer",
  roleLine: ".NET Backend Developer — ASP.NET Core, C#, SQL Server",
  location: "Multan, Pakistan",
  email: "haiderzaman.dev@gmail.com",
  phone: "+92370-1403149",
  linkedin: "https://www.linkedin.com/in/haiderzaman-dev",
  github: "https://github.com/Haider-523",
  /** Coding profiles — from Haider's GitHub profile README
   * (github.com/Haider-523), verified 2026-11-21. The portfolio's
   * "300+ Problems solved" and "9+ Competitions" stats link here,
   * so a recruiter can check the numbers instead of taking them
   * on trust. */
  leetcode: "https://leetcode.com/u/Haider5123/",
  codeforces: "https://codeforces.com/profile/Haider5123",
} as const;

/**
 * Home hero intro — deliberately DIFFERENT from the About page text
 * and more detailed: this is the recruiter's first read, so it names
 * the actual systems, the stack and what Haider is looking for. The
 * About page keeps the personal story (degree, teaching, contests).
 */
export const heroIntro =
  "I build tested backend systems for real clients. My salon management system passes 64/64 tests — and I am looking for junior .NET backend roles where I can ship production code.";

/** Availability line — confirmed by Haider on 2026-11-17: keep as-is. */
export const availabilityNote =
  "Seeking opportunities — junior .NET backend roles.";

/** Shown in the footer; update on every content push. */
export const lastUpdated = "22 Nov 2026";

export const stats = [
  {
    value: "300+",
    label: "Problems solved",
    href: "/about",
  },
  {
    value: "9+",
    label: "Competitions",
    href: "https://codeforces.com/profile/Haider5123",
  },
  { value: "3.44", label: "CGPA / 4.00", href: "/about" },
  {
    value: "64/64",
    label: "Tests passing — Salon system",
    href: "/projects/salon-management-system",
  },
] as const;

export const aboutParagraphs = [
  "I am a BSCS student at MNS University of Agriculture, Multan, and an ASP.NET Core developer working with C#, Entity Framework Core, SQL Server and REST APIs. I learn by building real systems — software people actually use, not tutorials.",
  "Alongside my degree I teach programming — Programming Fundamentals, OOP, Data Structures and basic Python — to 20+ students, online and in-person. Teaching is how I keep my own fundamentals honest.",
  "I also compete in programming contests. I lead a 3-member competitive programming team across national and international contests, and I solve problems on Codeforces, CodeChef and LeetCode — 300+ solved across the three platforms.",
] as const;

export type Project = {
  slug: string;
  name: string;
  shortDescription: string;
  stack: string[];
  /** Short context line, e.g. "Real client project · 2026". */
  context: string;
  overview: string;
  problem?: string;
  solution?: string;
  /** Features verified in the project's own docs/repo — never guessed. */
  features?: string[];
  contribution?: string;
  challenges?: string[];
  /** Honest statement of what is and is not verified. Always present. */
  verification: string;
  /** Short verified proof points, shown as a checklist at the top of
   * the case-study page (green check) and the gaps beside them
   * (grey dash) — a skimming recruiter sees the honesty in 2 seconds.
   * Each point restates the verification string above; nothing new. */
  verified?: string[];
  notVerified?: string[];
  /** Blog posts that go deeper into this project, linked from the
   * case-study page as further reading. */
  blogSlugs?: string[];
  /** Short verified proof points shown as chips, e.g. test counts. */
  metrics?: string[];
  /** Only set when the repo link is verified public. */
  githubUrl?: string;
  /** Honest note about code availability, e.g. "Code not public". */
  codeNote?: string;
  /** Dashboard / screenshot image for the project card and the
   * case-study page. `imageSource` says honestly where it came from:
   * "linkedin" is an exact copy of a screenshot Haider posted on
   * LinkedIn; "mockup" is a generated illustration of the app's
   * screens, not a real screenshot — the UI labels it as such. */
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageSource?: "linkedin" | "mockup";
  /** LinkedIn post the screenshot was copied from (exact copy). */
  imagePostUrl?: string;
  /** Extra screenshots shown on the case-study page. */
  gallery?: { src: string; alt: string; width: number; height: number; caption: string }[];
};

export const featuredProjects: Project[] = [
  {
    slug: "salon-management-system",
    name: "Stylish Hair Salon Management System",
    shortDescription:
      "Salon management application built with C# and .NET 10 — appointments, walk-in queue, stations, billing and reports for a real client.",
    stack: ["C#", ".NET 10", "WPF", "MVVM", "SQLite", "Entity Framework Core"],
    context: "Real client project · 2026",
    overview:
      "A native Windows desktop application for running a hair salon: appointments, walk-in queue, stations, active service sessions, billing, payments, discounts, inventory, purchases, expenses, financial reports, equipment, customer feedback, users, settings and backup/restore.",
    problem:
      "A salon needed one system to run the whole shop — bookings, the walk-in queue, who is sitting in which chair, billing and stock — instead of paper records and disconnected tools.",
    solution:
      "A single-computer WPF application with a layered design: domain entities and invariants, application services for each use case, EF Core with SQLite for storage, and MVVM views. One Windows computer, one active instance, salon-local time (Asia/Karachi) and PKR throughout.",
    features: [
      "Appointments with multiple services and a requested employee per service line — a requested employee is never silently changed",
      "Walk-in queue with FIFO order and manual reprioritising",
      "Live station (chair) view with exclusive occupancy — one active session per chair, enforced in the database",
      "Active service sessions that persist across restarts",
      "Billing with price snapshots, so changing a service price never rewrites old bills; payments, owner-only corrections with an audit trail, and printable receipts",
      "Discounts and offers — discounts over 50% or free services need owner authorisation and a reason",
      "Inventory ledger: every adjustment recorded with a reason; purchases increase stock exactly once",
      "Expenses and cash-basis financial reports — revenue is payments received, purchases shown as a separate cost line",
      "Users and roles with PBKDF2 password hashing, first-run owner setup and no default password",
      "Backup and restore with validation and an automatic safety backup before restore",
    ],
    contribution:
      "Designed and built the full system: 5 projects, 165 source files, 20 screens, and a 64-test xUnit suite covering business rules, security, migrations and backup.",
    challenges: [
      "Exclusive station occupancy had to hold under concurrency — solved with a filtered unique index plus serializable transactions that re-check availability inside the transaction.",
      "Bill history had to stay immutable — bill lines snapshot the service description, provider name and prices at billing time.",
      "Money had to be exact — all amounts are decimal, stored as TEXT with two decimals in SQLite; never float or double.",
    ],
    verification:
      "Verified 2026-10-15: full solution builds with 0 errors and 64/64 xUnit tests pass. Not verified: WPF UI interaction on Windows (no Windows machine was available) and no installer was produced.",
    verified: [
      "Full solution builds with 0 errors",
      "64/64 xUnit tests pass — business rules, security, migrations and backup",
    ],
    notVerified: [
      "WPF UI interaction on Windows",
      "No installer produced",
    ],
    blogSlugs: ["salon-64-tests", "filtered-unique-index-chair"],
    // Metrics restated from the contribution line above — same facts.
    metrics: ["64/64 tests passing", "20 screens", "165 source files"],
    codeNote: "Code not public — built for a real client.",
    image: "/images/projects/salon-dashboard-mockup.jpg",
    imageAlt: "Dashboard mockup of the salon management system",
    imageWidth: 1920,
    imageHeight: 1280,
    imageSource: "mockup",
  },
  {
    slug: "socialapp",
    name: "SocialApp",
    shortDescription:
      "Social media platform built with ASP.NET Core MVC, Identity and SQL Server — user authentication, posts and image uploads.",
    stack: [
      "ASP.NET Core MVC",
      ".NET 10",
      "Entity Framework Core 10",
      "SQL Server",
      "Identity",
      "ImageSharp",
    ],
    metrics: ["Auth + posts + image uploads", "Public GitHub repo"],
    context: "CodeAlpha project · 2026",
    overview:
      "A social media platform built with ASP.NET Core MVC on .NET 10, using Entity Framework Core 10 with SQL Server, ASP.NET Core Identity and ImageSharp — user authentication, posts and image uploads, database management and responsive web design.",
    problem:
      "Mainstream social platforms ship UX anti-patterns: invisible keyboard focus, cramped touch targets, uninformative errors, ambiguous timestamps, feeds that jump as images load, addictive infinite scroll, ambiguous tabs and follow states, no direct post URLs, and comment boxes buried under threads. SocialApp was built to fix eleven of these deliberately.",
    solution:
      "A server-rendered ASP.NET Core MVC application on .NET 10 with Entity Framework Core 10 and SQL Server, ASP.NET Core Identity for auth, and an ImageSharp media pipeline — chronological feeds, post permalinks, threaded comments, and a handcrafted vanilla CSS design system with no front-end framework.",
    features: [
      "Authentication with ASP.NET Core Identity, mandatory email confirmation and real-time MX-record validation of email domains",
      "Home and Explore feeds — chronological, no algorithmic ranking — with finite pagination (10 posts per page) and an explicit end indicator",
      "Posts with permalinks (/p/{id}), a composer with a 500-character counter and ImageSharp image processing (auto-orient, EXIF stripped, WebP, max 1280px)",
      "Likes and follows with database-level race protection, working with or without JavaScript",
      "Threaded comments (300 characters) with the composer above the list and owner moderation",
      "Profiles with custom display names, bios, avatars and follower/following lists; tabbed people/post search",
      "Accessibility: high-contrast focus rings, 48px touch targets, exact image dimensions for zero layout shift, reduced-motion support",
    ],
    contribution:
      "Built the full platform for the CodeAlpha internship (Task 2): MVC controllers, the EF Core data layer, Identity auth, the ImageSharp media pipeline and the vanilla CSS design system.",
    verification:
      "The repository is public on GitHub. No live deployment or hosted demo is claimed, and the application has not been run end-to-end against a live SQL Server in this workspace.",
    verified: ["Repository is public on GitHub"],
    notVerified: [
      "No live deployment or hosted demo",
      "Not run end-to-end against a live SQL Server in this workspace",
    ],
    // Repo verified public on GitHub, 2026-11-17:
    // https://github.com/Haider-523/CodeAlpha_SocialMediaPlatform
    githubUrl: "https://github.com/Haider-523/CodeAlpha_SocialMediaPlatform",
    image: "/images/projects/socialapp-1.jpg",
    imageAlt: "SocialApp home feed with posts and image uploads",
    imageWidth: 480,
    imageHeight: 789,
    imageSource: "linkedin",
    imagePostUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7503475421666193408/",
  },
  {
    slug: "uniguide",
    name: "UniGuide",
    shortDescription:
      "Smart university and career guidance platform for intermediate students, presented at SOFTEC '26.",
    stack: ["ASP.NET Core MVC", "C#", "SQL Server", "Entity Framework Core"],
    metrics: ["Presented at SOFTEC '26"],
    context: "Presented at SOFTEC '26",
    overview:
      "Smart university and career guidance platform for intermediate students, built with ASP.NET Core MVC, C#, SQL Server and Entity Framework Core. Presented at SOFTEC '26.",
    problem:
      "Intermediate students choosing a university and a career face scattered, hard-to-compare information about programmes and admissions.",
    solution:
      "A guidance platform that helps intermediate students find the right university and programme — built with ASP.NET Core MVC, C#, SQL Server and Entity Framework Core, and presented at SOFTEC '26.",
    verification:
      "Presented at SOFTEC '26. The GitHub repository contains only a README — it is not a full implementation — and no live deployment is claimed.",
    verified: ["Presented at SOFTEC '26"],
    notVerified: [
      "GitHub repository is README-only",
      "No live deployment",
    ],
    githubUrl: "https://github.com/Haider-523/NewUniGuide",
    image: "/images/projects/uniguide-1.jpg",
    imageAlt: "UniGuide landing page — Find the Right University For Your Future",
    imageWidth: 480,
    imageHeight: 309,
    imageSource: "linkedin",
    imagePostUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7441031671920893952/",
    gallery: [
      {
        src: "/images/projects/uniguide-4.jpg",
        alt: "UniGuide admin dashboard with university and program counts",
        width: 480,
        height: 208,
        caption:
          "Dashboard from the same LinkedIn post (21 Mar 2026) — an exact copy, not edited.",
      },
    ],
  },
  {
    slug: "mbti-quiz",
    name: "MBTI Quiz",
    shortDescription:
      "AI-based personality assessment built during a 24-hour AI competition in 2025.",
    stack: [],
    metrics: ["Built in a 24-hour AI competition"],
    context: "24-hour AI competition · 2025",
    overview:
      "AI-based personality assessment (MBTI Quiz) built during a 24-hour AI competition in 2025.",
    problem:
      "Personality assessments are usually long forms or paywalled tests — this one had to be quick, interactive and built inside a 24-hour AI competition.",
    solution:
      "An AI-based MBTI personality assessment — a question flow with four answer options — built during the 24-hour AI competition in 2025.",
    verification:
      "Only the facts above are verified — no repository, live demo or feature list is claimed.",
    verified: ["Built during a 24-hour AI competition in 2025"],
    notVerified: [
      "No public repository",
      "No live demo or feature list claimed",
    ],
    image: "/images/projects/mbti-quiz-mockup.jpg",
    imageAlt: "MBTI personality quiz mockup — question with four answer options",
    imageWidth: 1920,
    imageHeight: 1280,
    imageSource: "mockup",
  },
  {
    slug: "dynamic-quiz",
    name: "Dynamic Quiz & Evaluation System",
    shortDescription:
      "Interactive quiz platform for C/C++ practice with real-time evaluation.",
    stack: ["HTML", "CSS", "JavaScript"],
    metrics: ["Interactive C/C++ quiz", "Real-time evaluation"],
    context: "Quiz platform · C/C++ practice",
    overview:
      "Interactive quiz platform for C/C++ practice with real-time evaluation, built with HTML, CSS and JavaScript.",
    problem:
      "C/C++ learners need interactive practice with immediate feedback, not just static questions.",
    solution:
      "A quiz platform for C/C++ practice with real-time evaluation — code questions with a timer and a live score panel — built with HTML, CSS and JavaScript.",
    verification:
      "Only the facts above are verified — no repository, live demo or feature list is claimed.",
    verified: ["Interactive quiz platform for C/C++ practice"],
    notVerified: [
      "No public repository",
      "No live demo or feature list claimed",
    ],
    image: "/images/projects/dynamic-quiz-mockup.jpg",
    imageAlt: "C/C++ quiz mockup — code question with timer and score panel",
    imageWidth: 1920,
    imageHeight: 1280,
    imageSource: "mockup",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return featuredProjects.find((p) => p.slug === slug);
}

/**
 * Skills — Haider's stack only. Next.js / React / TypeScript /
 * JavaScript are the build stack of this site and are deliberately
 * NOT listed here as his skills. No percentages anywhere.
 */
export const skillCategories = [
  {
    title: "Backend & Frameworks",
    description:
      "C# and .NET for the salon system; ASP.NET Core for SocialApp and UniGuide — MVC, Identity auth, layered design.",
    items: ["C#", ".NET", "ASP.NET Core"],
  },
  {
    title: "Data",
    description:
      "EF Core 10 with SQL Server and SQLite — migrations, and the filtered unique index that keeps one session per salon chair.",
    items: ["Entity Framework Core", "SQL Server", "SQLite"],
  },
  {
    title: "Desktop",
    description: "WPF, MVVM and XAML for the salon system's 20 screens.",
    items: ["WPF", "MVVM", "XAML"],
  },
  {
    title: "Languages used",
    description:
      "C and C++ for competitive programming and teaching; HTML and CSS for the web.",
    items: ["C", "C++", "HTML", "CSS"],
  },
] as const;

/**
 * Services — what Haider builds for a client or employer. Every item
 * is evidenced by a featured project or a verified fact in this file;
 * nothing here is a claim without proof behind it. Added 2026-11-21
 * after the Daim Ali portfolio QA: his "Engineering Services" section
 * states the offer plainly, and this site had no equivalent — the
 * home page went straight from proof to the hire CTA without saying
 * what the reader can hire Haider to do.
 */
export const services = [
  {
    icon: "server",
    title: "Backend & REST API Development",
    description:
      "ASP.NET Core APIs in C# with EF Core — authentication, business rules and clean layered design.",
    proof: "Salon system · SocialApp",
    deliverables: [
      "Authentication and authorisation with ASP.NET Core Identity",
      "Business rules in the service layer, not in controllers",
      "Layered design — domain, application, infrastructure",
    ],
    scope: "From a single endpoint to a full API.",
  },
  {
    icon: "database",
    title: "Database Design & EF Core",
    description:
      "SQL Server and SQLite schemas, Code-First migrations and indexes — including the filtered unique index that keeps one session per salon chair.",
    proof: "SQL Server · SQLite · EF Core 10",
    deliverables: [
      "Code-First migrations that apply cleanly",
      "Indexes for the queries that actually run — including one filtered unique index",
      "Money and dates stored exactly — decimal amounts, salon-local time",
    ],
    scope: "From schema design to a tested migration.",
  },
  {
    icon: "app-window",
    title: "Desktop Applications",
    description:
      "Native Windows apps with WPF and MVVM — the salon runs its whole shop on one.",
    proof: "WPF · MVVM · 20 screens",
    deliverables: [
      "MVVM views with commands, not code-behind",
      "One active session per chair, enforced in the database",
      "Backup and restore with a safety backup first",
    ],
    scope: "From one screen to the full 20-screen system.",
  },
  {
    icon: "shield-check",
    title: "Tested, documented delivery",
    description:
      "Business rules covered by xUnit tests and written up honestly — what is verified, and what is not.",
    proof: "64/64 tests · honest verification notes",
    deliverables: [
      "xUnit tests for business rules, security, migrations and backup",
      "A verification note on every project — what is verified, and what is not",
      "No fake screenshots, no invented metrics",
    ],
    scope: "From the first test to the verification note.",
  },
] as const;

/**
 * How I work — the 4 steps behind every service above. Grounded in
 * how the salon system was actually built: scoped first, layered
 * design, tested as it grew, and handed over with documentation
 * and a verification note.
 */
export const workSteps = [
  {
    step: "Scope",
    detail: "Agree what the system must do — and what is out of scope.",
  },
  {
    step: "Build",
    detail: "Layered design, EF Core, tested as it grows.",
  },
  {
    step: "Test",
    detail: "xUnit suite plus an honest verification note.",
  },
  {
    step: "Handover",
    detail: "Documentation, backup and restore, so the next person can run it.",
  },
] as const;

export const education = {
  degree: "BS Computer Science",
  school: "MNS University of Agriculture, Multan",
  period: "2024–2028",
  status: "Currently enrolled — expected 2028",
  cgpa: "3.44 / 4.00",
  note: "BSCS '28. Competitive programming and teaching run alongside the degree.",
} as const;

/** Journey timeline — most recent first. Verified facts only. */
/** Milestones on /experience. `photo` is an exact, unedited copy of a
 * photo Haider posted on LinkedIn for that competition; `photoPostUrl`
 * links to the post as proof. Milestones without a photo have no
 * matching LinkedIn photo post — the activity feed only goes back to
 * November 2025. */
export type JourneyItem = {
  period: string;
  title: string;
  detail: string;
  photo?: string;
  photoAlt?: string;
  photoWidth?: number;
  photoHeight?: number;
  photoPostUrl?: string;
};

export const journey: JourneyItem[] = [
  {
    period: "Nov 2026",
    title: "Local Nominee — NASA Space Apps Challenge 2026",
    detail:
      "Team IGNIX's FIRENEX was one of five teams nominated at the local level in Multan.",
    photo: "/images/milestones/nasa-nominee.jpg",
    photoAlt: "FIRENEX named Local Nominee — Team IGNIX announcement poster",
    photoWidth: 800,
    photoHeight: 1000,
    photoPostUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7529954734632415232/",
  },
  {
    period: "2026",
    title: "Real client project & SOFTEC '26",
    detail:
      "Built the Stylish Hair Salon Management System for a real client, and presented UniGuide at SOFTEC '26.",
    photo: "/images/milestones/softec-26.jpg",
    photoAlt: "Haider at SOFTEC '26, FAST NUCES Lahore",
    photoWidth: 480,
    photoHeight: 853,
    photoPostUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7453969538158833664/",
  },
  {
    period: "Jul 2026",
    title: "Game Day Hackathon 2026",
    detail:
      "Participated in Game Day Hackathon 2026, organized by AWS Student Builder Group, BZU Multan.",
    photo: "/images/milestones/gameday-2026.jpg",
    photoAlt: "Haider at Game Day Hackathon 2026",
    photoWidth: 800,
    photoHeight: 619,
    photoPostUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7485222917908254722/",
  },
  {
    period: "May 2026",
    title: "BrandScape — Business Idea Competition",
    detail:
      "Attended BrandScape, a Business Idea Competition at Air University Multan Campus.",
    photo: "/images/milestones/brandscape-2026.jpg",
    photoAlt: "Haider at BrandScape, Air University Multan Campus",
    photoWidth: 480,
    photoHeight: 606,
    photoPostUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7467216875081609216/",
  },
  {
    period: "Apr 2026",
    title: "Inter Universities Programming Championship — IUPC 2026",
    detail:
      "Team CodeVisionX from MNS University of Agriculture, Multan entered IUPC 2026.",
    photo: "/images/milestones/iupc-2026.jpg",
    photoAlt: "Team CodeVisionX — IUPC 2026 announcement",
    photoWidth: 800,
    photoHeight: 974,
    photoPostUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7447616710624612352/",
  },
  {
    period: "Dec 2025 & Feb 2026",
    title: "ICPC",
    detail:
      "Competed in ICPC in December 2025 and February 2026 with team Multan Al-Khwarizmi.",
    photo: "/images/milestones/icpc-certificate.jpg",
    photoAlt:
      "ICPC Certificate of Achievement — 2025 Asia Topi Online Preliminary Round",
    photoWidth: 480,
    photoHeight: 339,
    photoPostUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7402415518848393216/",
  },
  {
    period: "2025",
    title: "24-hour AI competition",
    detail: "Built the AI-based personality assessment (MBTI Quiz).",
  },
  {
    period: "Dec 2024",
    title: "2nd Position — University Programming Contest",
    detail: "Placed 2nd in the University Programming Contest.",
  },
  {
    period: "2024 — Present",
    title: "Programming Instructor",
    detail:
      "Teaching Programming Fundamentals, OOP, Data Structures and basic Python to 20+ students, online and in-person. Team leader of a 3-member competitive programming team across 9 national and international contests.",
  },
  {
    period: "Aug 2024",
    title: "Started BSCS",
    detail:
      "Began BS Computer Science at MNS University of Agriculture, Multan (2024–2028).",
  },
];

/** Competitions named in Haider's resume — no others added. */
export const competitions = [
  "ICPC — Dec 2025 & Feb 2026",
  "MIT",
  "Calico",
  "Ignite",
  "Veiro Mind AI",
  "COMSATS",
  "PIT",
  "Maktab e Qulaab",
  "University Programming Contest — 2nd place",
] as const;

export const githubRepos = [
  {
    name: "CodeAlpha_SocialMediaPlatform",
    description:
      "SocialApp — social media platform, ASP.NET Core MVC, EF Core 10, SQL Server, Identity, ImageSharp.",
    url: "https://github.com/Haider-523/CodeAlpha_SocialMediaPlatform",
  },
  {
    name: "NewUniGuide",
    description:
      "UniGuide — smart university and career guidance platform. Repository is README-only.",
    url: "https://github.com/Haider-523/NewUniGuide",
  },
  {
    name: "Portfolio",
    description:
      "This site — Next.js, React, TypeScript, Tailwind. The code behind the portfolio itself.",
    url: "https://github.com/Haider-523/Portfolio",
  },
] as const;

/**
 * FAQ — answers only from verified facts in this file. The same
 * data drives the Contact page accordion and the FAQ JSON-LD, so
 * the two cannot drift apart. "I reply within 24 hours" is a
 * commitment Haider makes by publishing it — it is a promise,
 * not a measured fact.
 */
export const faqs = [
  {
    question: "Are you available for junior .NET backend roles?",
    answer:
      "Yes — I am looking for a junior .NET backend role. I build in C# with ASP.NET Core, Entity Framework Core and SQL Server, and I have already shipped a tested system for a real client: the salon app builds clean and all 64 of its tests pass. I am based in Multan and open to remote work.",
  },
  {
    question: "Can you work remotely or on-site?",
    answer:
      "Remote is how I work by default. I am based in Multan, where I also teach in person, so on-site work in Multan is straightforward. For anything further away, ask — I will tell you plainly whether it works.",
  },
  {
    question: "Which .NET version do you use?",
    answer:
      ".NET 10, with ASP.NET Core and Entity Framework Core 10, backed by SQL Server. Both the salon system and SocialApp are built on it — and the salon system is the one I test hardest, 64 tests, all passing.",
  },
  {
    question: "Who owns the code for client work?",
    answer:
      "The client's code stays the client's. The salon system is not public because it was built for a real client. My own projects — SocialApp and UniGuide — are public on GitHub, and I link them from their case studies.",
  },
  {
    question: "How fast do you reply?",
    answer:
      "Within 24 hours. Email me directly or use the form on this page — both go to the same inbox, and I answer every message myself.",
  },
] as const;

/** Nav — exactly 5 items (decided 2026-11-17): Home, About, Projects,
 * Experience, Contact. Skills, Education, Certifications and Journey
 * live inside the About page; GitHub is a link in the header/footer. */
export const navLinks = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/about" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "experience", label: "Experience", href: "/experience" },
  { id: "contact", label: "Contact", href: "/contact" },
] as const;

/**
 * Experience — exactly LinkedIn's 3 entries (re-audited live
 * 2026-11-17). The ICPC team lead role is not a LinkedIn entry; it
 * stays in About and Journey, not here. Note: Haider's resume lists
 * the instructor role as "Independent"; LinkedIn lists it under
 * Maktab e Qulaab — the page states both so the discrepancy is
 * visible.
 */
export const experience = [
  {
    role: "Software Programming Instructor",
    org: "Maktab e Qulaab",
    period: "Sep 2024 – Present",
    location: "Multan, Pakistan",
    detail:
      "Instructed over 20 students in programming fundamentals, OOP and data structures through online and in-person sessions; structured lesson plans in C, C++ and Python with introductory machine learning; mentorship in competitive programming, GitHub portfolio building and real-world project development.",
  },
  {
    role: ".NET Developer",
    org: "CodeAlpha (Internship)",
    period: "Aug – Sep 2026",
    location: "Remote · Multan, Pakistan",
    detail:
      "Built a social media platform with ASP.NET Core MVC and C# — user authentication, posts and image uploads; database management and responsive web design.",
  },
  {
    role: "Assistant",
    org: "Hussain Dental Surgery (Part-time)",
    period: "Jun 2024 – Feb 2025",
    location: "Multan, Pakistan",
    detail:
      "Managed day-to-day clinic operations: patient data handling and scheduling, digital patient records in Excel and a local database, appointments and patient flow.",
  },
] as const;

export type CertificationItem = {
  name: string;
  issuer: string;
  /** Issue date exactly as LinkedIn shows it (re-audited 2026-11-17). */
  date?: string;
  note?: string;
};

/**
 * Licenses & Certifications — all 18, in LinkedIn order, exactly as
 * LinkedIn shows them on 2026-11-17 (signed-in re-audit). LinkedIn
 * has NO separate Honors & Awards section — the ICPC items, the
 * Certificate of Merit and the Brand Scape appreciation all sit
 * under Licenses & Certifications there, so the old 6-awards +
 * 12-certifications split is dropped. Every item is verified and
 * carries its LinkedIn issue date. The 5 items the 7 Nov audit had
 * flagged unverified are all present on LinkedIn now (AI & Laptop
 * Optimization Sep 2026, Advanced Social Media Strategy Nov 2024,
 * Foundation of Cyber Security Jan 2025, Brand Scape May 2026,
 * Coding Competition at IOC Dec 2024). Dates corrected from the
 * 7 Nov audit where LinkedIn now shows otherwise: SQL May 2026
 * (was Aug 2025), Python May 2026 (was Dec 2024), C# May 2026
 * (was Jun 2025), Excel Jul 2025 (was Oct 2024), CS50x Puzzle Day
 * 2026 (was 2025). "Coding Competition at IOC, MNSUAM" is its own
 * Dec 2024 LinkedIn entry — it is NOT the same as any 2k19 contest.
 * LinkedIn spells the AWS event "Hakathon"; the correct spelling
 * "Hackathon" is used here.
 */
export const certifications: CertificationItem[] = [
  {
    name: "AI & Laptop Optimization Workshops",
    issuer: "Muhammad Nawaz Shareef University of Agriculture, Multan",
    date: "Sep 2026",
    note: "Credential ID CBS-LSW-2026-019, CBS-NBW-2026-019.",
  },
  {
    name: "Build and Deploy with GitHub Copilot",
    issuer: "Microsoft Learn Student Ambassadors",
    date: "Oct 2026",
  },
  {
    name: "AWS GameDay Hackathon 2026",
    issuer: "AWS Student Builder Group, BZU Multan",
    date: "Jul 2026",
  },
  {
    name: "SQL Course Certificate",
    issuer: "University of California, Davis",
    date: "May 2026",
  },
  {
    name: "Complete Python Developer: From Zero to Mastery",
    issuer: "Udemy",
    date: "May 2026",
  },
  {
    name: "SOFTEC '26 Programming Competition Participation Certificate",
    issuer: "SOFTEC",
    date: "Apr 2026",
  },
  {
    name: "CS50x Puzzle Day 2026 Participation Certificate",
    issuer: "CS50",
    date: "Apr 2026",
  },
  {
    name: "C# for .NET Developers",
    issuer: "Board Infinity",
    date: "May 2026",
  },
  {
    name: "Advanced Social Media Strategy Training and Certification",
    issuer: "HP LIFE",
    date: "Nov 2024",
  },
  {
    name: "Certificate of Appreciation — Brand Scape",
    issuer: "Air Business Circle",
    date: "May 2026",
  },
  {
    name: "Certificate of Merit",
    issuer: "Workers Welfare School (Boys)",
    date: "Dec 2022",
    note: "1st position, 1st Year (I.C.S Group) Mid-Term Examination.",
  },
  {
    name: "Rahyan-E-Karbala Wa Mohiban-E-Watan Scout Camp",
    issuer: "Pakistan Boy Scouts Association",
    date: "Sep 2020",
  },
  {
    name: "ICPC Asia Topi Regionals 2026",
    issuer: "ICPC",
    date: "Jan 2026",
    note: "On-site regional contest. Team Multan Al-Khwarizmi.",
  },
  {
    name: "ICPC Asia Topi Achievement",
    issuer: "ICPC",
    date: "Nov 2025",
    note: "Certificate of Achievement, online preliminary programming contest.",
  },
  {
    name: "Microsoft Office Specialist: Excel Certification",
    issuer: "Coursera",
    date: "Jul 2025",
  },
  {
    name: "Foundation of Cyber Security",
    issuer: "Cyber Security Club MNSUAM",
    date: "Jan 2025",
  },
  {
    name: "Graphics Designing and UI/UX Designing Workshop",
    issuer: "Rotary Club MNSUAM",
    date: "Dec 2024",
  },
  {
    name: "Coding Competition at IOC, MNSUAM",
    issuer: "MNS University of Agriculture, Multan",
    date: "Dec 2024",
  },
];

/**
 * Education history — all 3 LinkedIn entries (re-audited 2026-11-17).
 * `education` above stays as the BSCS summary used elsewhere.
 */
export const educationHistory = [
  {
    degree: "BS Computer Science",
    school: "MNS University of Agriculture, Multan",
    period: "Aug 2024 – Aug 2028",
    status: "Currently enrolled",
    detail:
      "BSCS '28. Competitive programming and teaching run alongside the degree.",
    cgpa: "3.44 / 4.00",
  },
  {
    degree: "Intermediate in Computer Sciences",
    school: "Workers Welfare Higher Secondary School For Boys, Multan",
    period: "Jun 2022 – 2024",
    status: "Grade: A",
    detail: "",
    cgpa: "",
  },
  {
    degree: "Pre-medical Studies",
    school: "Workers Welfare Higher Secondary School For Boys, Multan",
    period: "Apr 2020 – Aug 2022",
    status: "Grade: A",
    detail: "",
    cgpa: "",
  },
] as const;
