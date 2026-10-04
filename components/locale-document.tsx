"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function LocaleDocument() {
  const pathname = usePathname();

  useEffect(() => {
    const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
    document.documentElement.lang = isEnglish ? "en" : "ar";
    document.documentElement.dir = isEnglish ? "ltr" : "rtl";
  }, [pathname]);

  return null;
}
