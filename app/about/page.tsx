import type { Metadata } from "next";
import { SectionDetailPage } from "@/components/section-detail-page";

export const metadata: Metadata = {
  title: "من نحن | سهم للتحول الرقمي",
  description: "تعرف على سهم والتحول الرقمي، رؤيتها، خدماتها، وكيفية تصميم الحلول الرقمية لقطاع الأعمال والحقول النفطية.",
  alternates: { canonical: "/about", languages: { ar: "/about", en: "/en/about" } },
};

export default function AboutPage() {
  return <SectionDetailPage locale="ar" pageKey="about" />;
}
