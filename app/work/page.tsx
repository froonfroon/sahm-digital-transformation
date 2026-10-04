import type { Metadata } from "next";
import { WorkIndexPage } from "@/components/work-portfolio";

export const metadata: Metadata = {
  title: "معرض الأعمال | سهم للتحول الرقمي",
  description: "استكشف مجموعة منتقاة من المشاريع المعروضة في معرض Solve Codex، مع صورها الأصلية وعناوينها المنشورة.",
  alternates: {
    canonical: "/work",
    languages: {
      ar: "/work",
      en: "/en/work",
    },
  },
  openGraph: {
    title: "معرض الأعمال | سهم للتحول الرقمي",
    description: "مجموعة من المشاريع مع الصور والعناوين المنشورة في مصدرها.",
    locale: "ar",
    type: "website",
  },
};

export default function WorkPage() {
  return <WorkIndexPage locale="ar" />;
}
