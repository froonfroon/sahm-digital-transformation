"use client";

import { usePathname } from "next/navigation";
import { DigitalUniverseExperience } from "./digital-universe-experience";

export function SiteDigitalUniverse() {
  const pathname = usePathname() ?? "/";
  const locale = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ar";
  const pageKey = pathname.replace(/^\/(en\/)?/, "") || "home";

  return <DigitalUniverseExperience locale={locale} pageKey={pageKey} />;
}
