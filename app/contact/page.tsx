import type { Metadata } from "next";
import { SectionDetailPage } from "@/components/section-detail-page";

export const metadata: Metadata = {
  title: "تواصل معنا | سهم للتحول الرقمي",
  description: "تواصل مع سهم للتحول الرقمي لبدء نقاش حول احتياجك التقني، الاستشارات، المشاريع، أو المنظومة الشاملة.",
  alternates: { canonical: "/contact", languages: { ar: "/contact", en: "/en/contact" } },
};

export default function ContactPage() {
  return <SectionDetailPage locale="ar" pageKey="contact" />;
}
