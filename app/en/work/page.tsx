import type { Metadata } from "next";
import { WorkIndexPage } from "@/components/work-portfolio";

export const metadata: Metadata = {
  title: "Selected Work | SAHM Digital Transformation",
  description: "Explore selected projects shown in the Solve Codex portfolio, with their original images and published titles.",
  alternates: {
    canonical: "/en/work",
    languages: {
      ar: "/work",
      en: "/en/work",
    },
  },
  openGraph: {
    title: "Selected Work | SAHM Digital Transformation",
    description: "Selected projects with the images and titles published by their source.",
    locale: "en",
    type: "website",
  },
};

export default function WorkPage() {
  return <WorkIndexPage locale="en" />;
}
