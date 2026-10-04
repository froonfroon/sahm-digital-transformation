import type { Metadata } from "next";
import { SectionDetailPage } from "@/components/section-detail-page";

export const metadata: Metadata = {
  title: "خدماتنا | سهم للتحول الرقمي",
  description: "استشارات تقنية، أمن سيبراني، أنظمة وبرمجيات، ومنصة ذكاء هندسي متخصصة للحقول النفطية.",
  alternates: { canonical: "/services", languages: { ar: "/services", en: "/en/services" } },
};

export default function ServicesPage() {
  return <SectionDetailPage locale="ar" pageKey="services" />;
}
