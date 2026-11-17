import type { Metadata } from "next";
import { Skills } from "@/components/sections/skills";

export const metadata: Metadata = {
  title: "Skills | Haider Zaman",
  description:
    "Skills of Haider Zaman — C#, .NET, ASP.NET Core, Entity Framework Core, SQL Server, SQLite and WPF.",
};

export default function Page() {
  return <Skills />;
}
