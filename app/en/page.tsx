import type { Metadata } from "next";
import { CorporateHome } from "@/components/corporate-home";

export const metadata: Metadata = {
  title: "SAHM Digital Transformation | Technology, Software & Cybersecurity",
  description:
    "Technology consulting, cybersecurity, custom systems and software, and a specialized engineering intelligence platform for oil fields.",
  alternates: {
    canonical: "/en",
    languages: {
      ar: "/",
      en: "/en",
    },
  },
  openGraph: {
    title: "SAHM Digital Transformation",
    description:
      "Technology consulting, cybersecurity, custom systems and software, and specialized engineering intelligence for oil fields.",
    locale: "en",
    type: "website",
  },
};

export default function EnglishPage() {
  return <CorporateHome locale="en" />;
}
