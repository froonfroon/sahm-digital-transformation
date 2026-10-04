import type { Metadata } from "next";
import { ProjectsIndexPage } from "@/components/projects-page";

export const metadata: Metadata = {
  title: "Solutions | SAHM Digital Transformation",
  description:
    "Explore SAHM’s solution domains: websites and platforms, applications, cybersecurity, business systems and software, digital transformation, and engineering intelligence for oil fields.",
  alternates: {
    canonical: "/en/projects",
    languages: {
      ar: "/projects",
      en: "/en/projects",
    },
  },
  openGraph: {
    title: "Solutions | SAHM Digital Transformation",
    description:
      "Explore SAHM’s technology consulting, cybersecurity, systems and software, and oil-field engineering intelligence capabilities.",
    locale: "en",
    type: "website",
  },
};

export default function ProjectsPage() {
  return <ProjectsIndexPage locale="en" />;
}
