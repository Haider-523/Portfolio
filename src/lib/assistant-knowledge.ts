/**
 * AI Portfolio Assistant — knowledge base.
 *
 * FAIL-CLOSED design: the model is NEVER the knowledge base. This file
 * is the only source the assistant may answer from, and it is built
 * exclusively from src/data/portfolio.ts (verified portfolio data) plus
 * resume facts already in that file. Nothing here is invented, and
 * nothing is fetched from the web. If a question has no matching chunk
 * here, the assistant must refuse — see src/lib/assistant.ts.
 */
import {
  aboutParagraphs,
  awards,
  certifications,
  competitions,
  education,
  experience,
  featuredProjects,
  githubRepos,
  journey,
  profile,
  skillCategories,
  stats,
} from "@/data/portfolio";

export type KnowledgeChunk = {
  id: string;
  topic: string;
  text: string;
  /**
   * The to-the-point answer for this chunk: 1–3 sentences, fact first,
   * no intro, no filler. This is what the assistant actually returns —
   * the long `text` is only context for the model path. Every `short`
   * is written from the verified data in this file, nothing invented.
   */
  short: string;
};

function chunk(
  id: string,
  topic: string,
  text: string,
  short: string,
): KnowledgeChunk {
  return { id, topic, text: text.replace(/\s+/g, " ").trim(), short };
}

export const knowledgeBase: KnowledgeChunk[] = [
  chunk(
    "profile",
    "About Haider Zaman",
    `Haider Zaman is a .NET Backend Developer in ${profile.location}. ` +
      `His role line is ".NET Backend Developer — ASP.NET Core, C#, SQL Server". ` +
      `He is a BS Computer Science student at ${education.school} (${education.period}), CGPA ${education.cgpa}. ` +
      aboutParagraphs.join(" "),
    "Haider Zaman is a .NET Backend Developer in Multan, Pakistan. He builds backend systems with ASP.NET Core, C#, and SQL Server, and is a BSCS student at MNS University of Agriculture, Multan (CGPA 3.44/4.00).",
  ),
  chunk(
    "contact",
    "Contact Haider Zaman",
    `Contact Haider Zaman by email at ${profile.email} or by phone at ${profile.phone}. ` +
      `LinkedIn: ${profile.linkedin}. GitHub: ${profile.github}. ` +
      `There is also a message form on the Contact page — it sends to ${profile.email} via FormSubmit. ` +
      `His resume can be downloaded from the site as HZ-Resume.pdf.`,
    "Email: haiderzaman.dev@gmail.com. Phone: +92370-1403149. LinkedIn: linkedin.com/in/haiderzaman-dev. GitHub: github.com/Haider-523.",
  ),
  chunk(
    "availability",
    "Availability and roles",
    `Haider Zaman is seeking opportunities — junior .NET backend roles. ` +
      `His experience is: Software Programming Instructor at Maktab e Qulaab (Sep 2024 – Present), ` +
      `Junior .NET Developer Intern at CodeAlpha (Aug – Sep 2026), and team leader of the 3-member ` +
      `competitive programming team Multan Al-Khwarizmi. Do not claim any other job, title, or employer for him.`,
    "Haider is seeking opportunities — junior .NET backend roles. He is a Software Programming Instructor at Maktab e Qulaab (Sep 2024 – Present) and was a Junior .NET Developer Intern at CodeAlpha (Aug – Sep 2026).",
  ),
  chunk(
    "stats",
    "Numbers and proof",
    stats.map((s) => `${s.value} ${s.label}`).join(". ") +
      `. The Stylish Hair Salon Management System builds with 0 errors and 64/64 xUnit tests pass. ` +
      `WPF UI interaction on Windows was not verified.`,
    "300+ problems solved. 15+ competitions. CGPA 3.44/4.00. 64/64 tests passing on his salon management system.",
  ),
  chunk(
    "skills",
    "Skills and stack",
    `Haider Zaman's skills are: ${skillCategories
      .map((c) => `${c.title}: ${c.items.join(", ")}`)
      .join("; ")}. ` +
      `Languages used: C, C++, HTML, CSS. He does NOT claim React, Next.js, or TypeScript as skills — ` +
      `those are only the build stack of this website. No skill percentages are claimed.`,
    "C#, .NET, ASP.NET Core, Entity Framework Core, SQL Server, SQLite, and WPF. He also uses C, C++, HTML, and CSS.",
  ),
  chunk(
    "education",
    "Education",
    `${education.degree} at ${education.school}, ${education.period}. ${education.status}. CGPA ${education.cgpa}. ${education.note}`,
    "BS Computer Science at MNS University of Agriculture, Multan (2024–2028). CGPA 3.44/4.00.",
  ),
  chunk(
    "experience",
    "Experience",
    experience
      .map(
        (e) =>
          `${e.role} at ${e.org} (${e.period}, ${e.location}): ${e.detail}`,
      )
      .join(" "),
    "Software Programming Instructor at Maktab e Qulaab since Sep 2024, teaching Programming Fundamentals, OOP, Data Structures, and basic Python to 20+ students. Previously a Junior .NET Developer Intern at CodeAlpha (Aug – Sep 2026).",
  ),
  ...featuredProjects.map((p) =>
    chunk(
      `project-${p.slug}`,
      `Project: ${p.name}`,
      `${p.name} — ${p.context}. ${p.overview} Stack: ${p.stack.join(", ")}. ` +
        (p.features ? `Features: ${p.features.join("; ")}. ` : "") +
        (p.githubUrl ? `Public repository: ${p.githubUrl}. ` : "") +
        (p.codeNote ? `${p.codeNote} ` : "") +
        `Verification: ${p.verification}`,
      `${p.name} — ${p.shortDescription}`,
    ),
  ),
  chunk(
    "projects-overview",
    "Projects overview",
    `Haider Zaman's featured projects, in order: ${featuredProjects
      .map((p) => `${p.name} (${p.context})`)
      .join("; ")}. ` +
      `The Salon system is a real client project. SocialApp's repository is public on GitHub. ` +
      `UniGuide's repository is README-only. MBTI Quiz and Dynamic Quiz have no public repository. ` +
      `No live deployment or hosted demo is claimed for any project.`,
    "• Stylish Hair Salon Management System — salon app for a real client (C#, .NET 10, WPF).\n• SocialApp — social media platform (ASP.NET Core MVC, SQL Server).\n• UniGuide — university and career guidance platform, presented at SOFTEC '26.\n• MBTI Quiz — AI-based personality assessment, built in a 24-hour competition.\n• Dynamic Quiz & Evaluation System — interactive quiz platform for C/C++ practice.",
  ),
  chunk(
    "certifications",
    "Certifications and awards",
    `Haider Zaman has 6 awards and 12 certifications — 18 items in total, matching LinkedIn. ` +
      `Awards: ${awards.map((a) => a.name).join("; ")}. ` +
      `Certifications: ${certifications.map((c) => c.name).join("; ")}. ` +
      `Awards are not double-counted as certifications. Some items are flagged on the site as ` +
      `"Unverified — confirm before publishing" because they appear only in an earlier build; ` +
      `do not present unverified items as confirmed. Full list is on LinkedIn.`,
    "6 awards and 12 certifications. The full list is on his Certifications page.",
  ),
  chunk(
    "journey",
    "Journey and competitions",
    journey.map((j) => `${j.period}: ${j.title} — ${j.detail}`).join(" ") +
      ` Competitions named in his resume: ${competitions.join("; ")}. ` +
      `He placed 2nd in the University Programming Contest (Dec 2024).`,
    "He leads the 3-member ICPC team Multan Al-Khwarizmi and placed 2nd in the University Programming Contest (Dec 2024).",
  ),
  chunk(
    "github",
    "GitHub",
    `Haider Zaman on GitHub: ${profile.github}. Public repositories: ` +
      githubRepos
        .map((r) => `${r.name} — ${r.description} (${r.url})`)
        .join(" ") +
      ` No stars, contribution graphs, or commit counts are claimed.`,
    "GitHub: github.com/Haider-523. Public repos: SocialApp and UniGuide (README-only).",
  ),
];

/** Plain-text context block handed to the model (only retrieved chunks). */
export function contextFor(chunks: KnowledgeChunk[]): string {
  return chunks.map((c) => `[${c.topic}] ${c.text}`).join("\n\n");
}
