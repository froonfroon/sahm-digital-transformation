import type { Metadata } from "next";
import { SectionDetailPage } from "@/components/section-detail-page";

export const metadata: Metadata = {
  title: "Why SAHM | SAHM Digital Transformation",
  description: "Why businesses choose SAHM: we connect strategy to execution, security to operations, and clarity to digital transformation.",
  alternates: { canonical: "/en/why-sahm", languages: { ar: "/why-sahm", en: "/en/why-sahm" } },
};

export default function WhySahmPage() {
  return <SectionDetailPage locale="en" pageKey="why-sahm" />;
}
