import type { Metadata } from "next";
import { LocaleDocument } from "@/components/locale-document";
import { SiteDigitalUniverse } from "@/components/site-digital-universe";
import "./globals.css";

export const metadata: Metadata = {
  title: "سهم للتحول الرقمي | الاستشارات التقنية والأنظمة والبرمجيات",
  description:
    "شركة سهم للتحول الرقمي تقدم الاستشارات التقنية والأمن السيبراني وبناء الأنظمة والبرمجيات، مع منصة ذكاء هندسي متخصصة لقطاع الحقول النفطية.",
  applicationName: "سهم للتحول الرقمي",
  keywords: [
    "سهم للتحول الرقمي",
    "التحول الرقمي",
    "تطوير البرمجيات",
    "الأمن السيبراني",
    "بناء الأنظمة والبرمجيات",
    "منصة الذكاء الهندسي للحقول النفطية",
  ],
  alternates: {
    canonical: "/",
    languages: {
      ar: "/",
      en: "/en",
    },
  },
  openGraph: {
    title: "سهم للتحول الرقمي",
    description:
      "الاستشارات التقنية والأمن السيبراني وبناء الأنظمة والبرمجيات ومنصة ذكاء هندسي متخصصة للحقول النفطية.",
    locale: "ar",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth">
      <body>
        <LocaleDocument />
        <SiteDigitalUniverse />
        {children}
      </body>
    </html>
  );
}
