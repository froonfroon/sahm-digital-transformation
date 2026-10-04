import Link from "next/link";

type Locale = "ar" | "en";

const footerLinks = {
  ar: {
    about: "من نحن",
    process: "طريقة العمل",
    services: "خدماتنا",
    consulting: "الاستشارات والتحول الرقمي",
    cybersecurity: "الأمن السيبراني",
    software: "الأنظمة والبرمجيات",
    oilfield: "ذكاء الحقول النفطية",
    solutions: "جميع الحلول",
    work: "معرض الأعمال",
    contact: "تواصل معنا",
    language: "English",
    copyright: "جميع الحقوق محفوظة.",
  },
  en: {
    about: "About",
    process: "How we work",
    services: "Services",
    consulting: "Technology consulting",
    cybersecurity: "Cybersecurity",
    software: "Systems & software",
    oilfield: "Oil-field intelligence",
    solutions: "All solutions",
    work: "Selected work",
    contact: "Contact",
    language: "العربية",
    copyright: "All rights reserved.",
  },
} satisfies Record<Locale, Record<string, string>>;

export function SiteFooter({
  locale,
  currentPage = "home",
  projectCategory,
  workSlug,
}: {
  locale: Locale;
  currentPage?: string;
  projectCategory?: string;
  workSlug?: string;
}) {
  const isEnglish = locale === "en";
  const homeHref = isEnglish ? "/en" : "/";
  const solutionsHref = isEnglish ? "/en/projects" : "/projects";
  const workHref = isEnglish ? "/en/work" : "/work";
  const pagePaths = {
    home: homeHref,
    about: isEnglish ? "/en/about" : "/about",
    services: isEnglish ? "/en/services" : "/services",
    solutions: solutionsHref,
    work: workHref,
    "why-sahm": isEnglish ? "/en/why-sahm" : "/why-sahm",
    contact: isEnglish ? "/en/contact" : "/contact",
  } as const;
  const activePagePath = pagePaths[currentPage as keyof typeof pagePaths] ?? homeHref;
  const languageHref = currentPage === "work"
    ? `${isEnglish ? "/work" : "/en/work"}${workSlug ? `/${workSlug}` : ""}`
    : isEnglish
      ? currentPage === "projects"
        ? projectCategory ? `/projects/${projectCategory}` : "/projects"
        : activePagePath === "/en/about"
          ? "/about"
          : activePagePath === "/en/services"
            ? "/services"
            : activePagePath === "/en/why-sahm"
              ? "/why-sahm"
              : activePagePath === "/en/contact"
                ? "/contact"
                : "/"
      : currentPage === "projects"
        ? projectCategory ? `/en/projects/${projectCategory}` : "/en/projects"
        : activePagePath === "/about"
          ? "/en/about"
          : activePagePath === "/services"
            ? "/en/services"
            : activePagePath === "/why-sahm"
              ? "/en/why-sahm"
              : activePagePath === "/contact"
                ? "/en/contact"
                : "/en";

  return (
    <footer className="sahm-site-footer">
      <div className="container sahm-site-footer-main">
        <div className="sahm-site-footer-brand">
          <Link href={homeHref}>{isEnglish ? "SAHM Digital Transformation" : "سهم للتحول الرقمي"}</Link>
          <p>
            {isEnglish
              ? "Technology consulting, cybersecurity, custom systems and software, and engineering intelligence for oil-field operations."
              : "استشارات تقنية وأمن سيبراني وأنظمة وبرمجيات مخصصة، وذكاء هندسي لدعم تشغيل الحقول النفطية."}
          </p>
        </div>

        <nav aria-label={isEnglish ? "Company links" : "روابط الشركة"} className="sahm-site-footer-nav">
          <strong>{footerLinks[locale].about}</strong>
          <Link href={isEnglish ? "/en/about" : "/about"}>{footerLinks[locale].about}</Link>
          <Link href={isEnglish ? "/en/services" : "/services"}>{footerLinks[locale].services}</Link>
          <Link href={isEnglish ? "/en/why-sahm" : "/why-sahm"}>{isEnglish ? "Why SAHM" : "لماذا سهم"}</Link>
          <Link href={workHref}>{footerLinks[locale].work}</Link>
          <Link href={isEnglish ? "/en/contact" : "/contact"}>{footerLinks[locale].contact}</Link>
        </nav>

        <nav aria-label={footerLinks[locale].services} className="sahm-site-footer-nav">
          <strong>{footerLinks[locale].services}</strong>
          <Link href={isEnglish ? "/en/services" : "/services"}>{footerLinks[locale].consulting}</Link>
          <Link href={isEnglish ? "/en/services" : "/services"}>{footerLinks[locale].cybersecurity}</Link>
          <Link href={isEnglish ? "/en/services" : "/services"}>{footerLinks[locale].software}</Link>
          <Link href={isEnglish ? "/en/services" : "/services"}>{footerLinks[locale].oilfield}</Link>
          <Link href={solutionsHref}>{footerLinks[locale].solutions}</Link>
        </nav>

        <div className="sahm-site-footer-contact">
          <strong>{footerLinks[locale].contact}</strong>
          <a href="mailto:info@sahm.ly">info@sahm.ly</a>
          <Link href={languageHref} lang={isEnglish ? "ar" : "en"}>
            {footerLinks[locale].language}
          </Link>
        </div>
      </div>
      <div className="container sahm-site-footer-bottom">
        <span>© {new Date().getFullYear()} {isEnglish ? "SAHM Digital Transformation" : "سهم للتحول الرقمي"} — {footerLinks[locale].copyright}</span>
      </div>
    </footer>
  );
}
