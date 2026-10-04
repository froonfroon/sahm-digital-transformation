import type { Metadata } from "next";
import { SectionDetailPage } from "@/components/section-detail-page";

export const metadata: Metadata = {
  title: "About | SAHM Digital Transformation",
  description: "Learn about SAHM Digital Transformation, its vision, services, and how it builds digital solutions for business and oil field operations.",
  alternates: { canonical: "/en/about", languages: { ar: "/about", en: "/en/about" } },
};

export default function AboutPage() {
  return <SectionDetailPage locale="en" pageKey="about" />;
}
