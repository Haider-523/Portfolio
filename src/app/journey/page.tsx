import type { Metadata } from "next";
import { Journey } from "@/components/sections/journey";

export const metadata: Metadata = {
  title: "Journey | Haider Zaman",
  description:
    "Journey of Haider Zaman — degree, teaching, competitions and real client work.",
};

export default function Page() {
  return <Journey />;
}
