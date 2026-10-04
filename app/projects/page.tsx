import type { Metadata } from "next";
import { ProjectsIndexPage } from "@/components/projects-page";

export const metadata: Metadata = {
  title: "مجالات الحلول | سهم للتحول الرقمي",
  description:
    "استكشف مجالات الحلول التقنية لدى سهم للتحول الرقمي: المواقع والمنصات، التطبيقات، الأمن السيبراني، الأنظمة والبرمجيات، والاستشارات والذكاء الهندسي للحقول النفطية.",
  alternates: {
    canonical: "/projects",
    languages: {
      ar: "/projects",
      en: "/en/projects",
    },
  },
  openGraph: {
    title: "مجالات الحلول | سهم للتحول الرقمي",
    description:
      "مجالات الحلول التقنية لدى سهم: الاستشارات والتحول الرقمي، الأمن السيبراني، الأنظمة والبرمجيات، وذكاء الحقول النفطية.",
    locale: "ar",
    type: "website",
  },
};

export default function ProjectsPage() {
  return <ProjectsIndexPage locale="ar" />;
}
