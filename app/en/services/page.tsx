import type { Metadata } from "next";
import { SectionDetailPage } from "@/components/section-detail-page";

export const metadata: Metadata = {
  title: "Services | SAHM Digital Transformation",
  description: "Technology consulting, cybersecurity, custom systems, and specialized engineering intelligence for oil field operations.",
  alternates: { canonical: "/en/services", languages: { ar: "/services", en: "/en/services" } },
};

export default function ServicesPage() {
  return <SectionDetailPage locale="en" pageKey="services" />;
}
