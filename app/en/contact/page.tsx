import type { Metadata } from "next";
import { SectionDetailPage } from "@/components/section-detail-page";

export const metadata: Metadata = {
  title: "Contact | SAHM Digital Transformation",
  description: "Contact SAHM to discuss your technology needs, transformation roadmap, custom systems, or integrated solution strategy.",
  alternates: { canonical: "/en/contact", languages: { ar: "/contact", en: "/en/contact" } },
};

export default function ContactPage() {
  return <SectionDetailPage locale="en" pageKey="contact" />;
}
