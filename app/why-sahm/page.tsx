import type { Metadata } from "next";
import { SectionDetailPage } from "@/components/section-detail-page";

export const metadata: Metadata = {
  title: "لماذا سهم | سهم للتحول الرقمي",
  description: "لماذا تعطي المؤسسات قيمة أكبر عندما تعمل مع سهم؟ لأننا نربط الاستراتيجية بالتنفيذ، والأمن بالحلول العملية.",
  alternates: { canonical: "/why-sahm", languages: { ar: "/why-sahm", en: "/en/why-sahm" } },
};

export default function WhySahmPage() {
  return <SectionDetailPage locale="ar" pageKey="why-sahm" />;
}
