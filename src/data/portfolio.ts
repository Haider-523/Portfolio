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
} as const;

/**
 * Home hero intro — deliberately DIFFERENT from the About page text
 * and more detailed: this is the recruiter's first read, so it names
 * the actual systems, the stack and what Haider is looking for. The
 * About page keeps the personal story (degree, teaching, contests).
 */
export const heroIntro =
  "ASP.NET Core backend developer from Multan, building real systems end to end: a salon management system for a real client — appointments, billing, inventory and reports, with 64/64 tests passing; a social platform with Identity and SQL Server; and a university guidance platform presented at SOFTEC '26. I work in C#, ASP.NET Core, Entity Framework Core and SQL Server, and I am looking for junior .NET backend roles where I can ship production code.";

/** Availability line — confirmed by Haider on 2026-11-17: keep as-is. */
export const availabilityNote =
  "Seeking opportunities — junior .NET backend roles.";

export const stats = [
  { value: "300+", label: "Problems solved" },
  { value: "15+", label: "Competitions" },
  { value: "3.44", label: "CGPA / 4.00" },
  { value: "64/64", label: "Tests passing — Salon system" },
] as const;

export const aboutParagraphs = [
  "I am a BSCS student at MNS University of Agriculture, Multan, and an ASP.NET Core developer working with C#, Entity Framework Core, SQL Server and REST APIs. I learn by building real systems — software people actually use, not tutorials.",
  "Alongside my degree I teach programming — Programming Fundamentals, OOP, Data Structures and basic Python — to 20+ students, online and in-person. Teaching is how I keep my own fundamentals honest.",
  "I also compete in programming contests. I lead a 3-member competitive programming team across national and international contests, and I solve problems on Codeforces, CodeChef and LeetCode.",
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
  /** Short verified proof points shown as chips, e.g. test counts. */
  metrics?: string[];
  /** Only set when the repo link is verified public. */
  githubUrl?: string;
  /** Honest note about code availability, e.g. "Code not public". */
  codeNote?: string;
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
    // Metrics restated from the contribution line above — same facts.
    metrics: ["64/64 tests passing", "20 screens", "165 source files"],
    codeNote: "Code not public — built for a real client.",
  },
  {
    slug: "socialapp",
    name: "SocialApp",
    shortDescription:
      "Social media platform built with ASP.NET Core MVC, Identity and SQL Server.",
    stack: [
      "ASP.NET Core MVC",
      ".NET 10",
      "Entity Framework Core 10",
      "SQL Server",
      "Identity",
      "ImageSharp",
    ],
    context: "CodeAlpha project · 2026",
    overview:
      "A social media platform built with ASP.NET Core MVC on .NET 10, using Entity Framework Core 10 with SQL Server, ASP.NET Core Identity and ImageSharp.",
    verification:
      "The repository is public on GitHub. No live deployment or hosted demo is claimed, and the application has not been run end-to-end against a live SQL Server in this workspace.",
    // Repo verified public on GitHub, 2026-11-17:
    // https://github.com/Haider-523/CodeAlpha_SocialMediaPlatform
    githubUrl: "https://github.com/Haider-523/CodeAlpha_SocialMediaPlatform",
  },
  {
    slug: "uniguide",
    name: "UniGuide",
    shortDescription:
      "Smart university and career guidance platform for intermediate students, presented at SOFTEC '26.",
    stack: ["ASP.NET Core MVC", "C#", "SQL Server", "Entity Framework Core"],
    context: "Presented at SOFTEC '26",
    overview:
      "Smart university and career guidance platform for intermediate students, built with ASP.NET Core MVC, C#, SQL Server and Entity Framework Core. Presented at SOFTEC '26.",
    verification:
      "Presented at SOFTEC '26. The GitHub repository contains only a README — it is not a full implementation — and no live deployment is claimed.",
    githubUrl: "https://github.com/Haider-523/NewUniGuide",
    codeNote: "GitHub repository is README-only.",
  },
  {
    slug: "mbti-quiz",
    name: "MBTI Quiz",
    shortDescription:
      "AI-based personality assessment built during a 24-hour AI competition in 2025.",
    stack: [],
    context: "24-hour AI competition · 2025",
    overview:
      "AI-based personality assessment (MBTI Quiz) built during a 24-hour AI competition in 2025.",
    verification:
      "Only the facts above are verified — no repository, live demo or feature list is claimed.",
    codeNote: "No public repository.",
  },
  {
    slug: "dynamic-quiz",
    name: "Dynamic Quiz & Evaluation System",
    shortDescription:
      "Interactive quiz platform for C/C++ practice with real-time evaluation.",
    stack: ["HTML", "CSS", "JavaScript"],
    context: "Quiz platform · C/C++ practice",
    overview:
      "Interactive quiz platform for C/C++ practice with real-time evaluation, built with HTML, CSS and JavaScript.",
    verification:
      "Only the facts above are verified — no repository, live demo or feature list is claimed.",
    codeNote: "No public repository.",
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
    description: "The stack used across the featured projects.",
    items: ["C#", ".NET", "ASP.NET Core"],
  },
  {
    title: "Data",
    description: "Relational data access in every project.",
    items: ["Entity Framework Core", "SQL Server", "SQLite"],
  },
  {
    title: "Desktop",
    description: "Native Windows UI for the salon system.",
    items: ["WPF", "MVVM"],
  },
  {
    title: "Languages used",
    description:
      "Languages used in projects and coursework — listed as used, not as expert claims.",
    items: ["C", "C++", "HTML", "CSS"],
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
export const journey = [
  {
    period: "2026",
    title: "Real client project & SOFTEC '26",
    detail:
      "Built the Stylish Hair Salon Management System for a real client, and presented UniGuide at SOFTEC '26.",
  },
  {
    period: "Dec 2025 & Feb 2026",
    title: "ICPC",
    detail:
      "Competed in ICPC in December 2025 and February 2026 with team Multan Al-Khwarizmi.",
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
] as const;

/** Competitions named in Haider's resume — no others added. */
export const competitions = [
  "ICPC — Dec 2025 & Feb 2026",
  "MIT",
  "Calico",
  "Ignite",
  "Veiro Mind AI",
  "COMSATS",
  "PIT",
  "Maktab-e-Gulaab",
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
    status: "Currently enrolled — expected 2028",
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
