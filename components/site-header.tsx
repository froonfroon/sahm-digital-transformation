"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { createPortal } from "react-dom";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import sahmLogo from "../WhatsApp Image 2026-10-03 at 3.17.06 PM.jpeg";

export function SiteHeader({
  locale = "ar",
  currentPage = "home",
  projectCategory,
  workSlug,
}: {
  locale?: "ar" | "en";
  currentPage?: string;
  projectCategory?: string;
  workSlug?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const desktopNavigationRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const isEnglish = locale === "en";
  const homeHref = isEnglish ? "/en" : "/";
  const projectsHref = isEnglish ? "/en/projects" : "/projects";
  const workHref = isEnglish ? "/en/work" : "/work";
  const sectionHrefs = {
    about: isEnglish ? "/en/about" : "/about",
    services: isEnglish ? "/en/services" : "/services",
    solutions: projectsHref,
    work: workHref,
    why: isEnglish ? "/en/why-sahm" : "/why-sahm",
    contact: isEnglish ? "/en/contact" : "/contact",
    home: homeHref,
  } as const;
  const currentSectionHref = sectionHrefs[currentPage as keyof typeof sectionHrefs] ?? homeHref;
  const languageHref = currentPage === "work"
    ? `${isEnglish ? "/work" : "/en/work"}${workSlug ? `/${workSlug}` : ""}`
    : isEnglish
      ? currentPage === "projects"
        ? projectCategory ? `/projects/${projectCategory}` : "/projects"
        : currentSectionHref === "/en/about"
          ? "/about"
          : currentSectionHref === "/en/services"
            ? "/services"
            : currentSectionHref === "/en/why-sahm"
              ? "/why-sahm"
              : currentSectionHref === "/en/contact"
                ? "/contact"
                : "/"
      : currentPage === "projects"
        ? projectCategory ? `/en/projects/${projectCategory}` : "/en/projects"
        : currentSectionHref === "/about"
          ? "/en/about"
          : currentSectionHref === "/services"
            ? "/en/services"
            : currentSectionHref === "/why-sahm"
              ? "/en/why-sahm"
              : currentSectionHref === "/contact"
                ? "/en/contact"
                : "/en";
  const languageLabel = isEnglish ? "العربية" : "EN";
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeButton = mobileMenuRef.current?.querySelector<HTMLElement>("[data-menu-close]");
    closeButton?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = mobileMenuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsOpen(false);
        desktopNavigationRef.current?.querySelector("a")?.focus();
      }
    };
    desktopQuery.addEventListener("change", handleDesktopChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      desktopQuery.removeEventListener("change", handleDesktopChange);
    };
  }, [isOpen]);

  function closeMobileMenu() {
    setIsOpen(false);
    menuButtonRef.current?.focus();
  }

  function handleMenuBackdrop(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) closeMobileMenu();
  }

  const navigation = isEnglish
    ? [
        { label: "About", href: "/en/about" },
        { label: "Services", href: "/en/services" },
        { label: "Solutions", href: projectsHref },
        { label: "Work", href: workHref },
        { label: "Why SAHM", href: "/en/why-sahm" },
        { label: "Contact", href: "/en/contact" },
      ]
    : [
        { label: "من نحن", href: "/about" },
        { label: "خدماتنا", href: "/services" },
        { label: "الحلول", href: projectsHref },
        { label: "الأعمال", href: workHref },
        { label: "لماذا سهم", href: "/why-sahm" },
        { label: "تواصل معنا", href: "/contact" },
      ];
  return (
    <>
      <header className="sahm-header sticky inset-x-0 top-0 z-50 border-b border-white/[0.07] backdrop-blur-lg">
      <div dir="ltr" className="container flex h-[72px] items-center justify-between gap-6">
        <Link
          href={homeHref}
          aria-label={isEnglish ? "SAHM Digital Transformation — Home" : "سهم للتحول الرقمي — الرئيسية"}
          className="shrink-0 overflow-hidden bg-white"
        >
          <Image
            src={sahmLogo}
            alt={isEnglish ? "SAHM Digital Transformation" : "سهم للتحول الرقمي"}
            priority
            className="h-[42px] w-[124px] object-contain sm:h-[46px] sm:w-[136px]"
            sizes="(max-width: 640px) 124px, 136px"
          />
        </Link>

        <nav ref={desktopNavigationRef} dir={isEnglish ? "ltr" : "rtl"} aria-label={isEnglish ? "Main navigation" : "التنقل الرئيسي"} className="hidden items-center gap-6 lg:flex lg:gap-9">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                (currentPage === "projects" && item.href === projectsHref) ||
                (currentPage === "work" && item.href === workHref)
                  ? "page"
                  : undefined
              }
              className="text-[13px] text-slate-300 transition-colors hover:text-blue-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={languageHref}
            lang={isEnglish ? "ar" : "en"}
            dir={isEnglish ? "rtl" : "ltr"}
            aria-label={isEnglish ? "Switch to Arabic" : "Switch to English"}
            className="inline-flex min-h-9 min-w-10 items-center justify-center border border-white/15 px-2.5 text-[11px] font-semibold text-slate-200 transition-colors hover:border-sahm-bright/60 hover:text-white"
          >
            {languageLabel}
          </Link>
          <Link
            href={isEnglish ? "/en/contact" : "/contact"}
            className="sahm-button hidden min-h-10 items-center gap-3 px-4 text-[11px] font-semibold text-white lg:inline-flex"
          >
            {isEnglish ? "Start a project" : "ابدأ مشروعك"}
            <span aria-hidden="true">{isEnglish ? "→" : "←"}</span>
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={isOpen ? (isEnglish ? "Close menu" : "إغلاق القائمة") : (isEnglish ? "Open menu" : "فتح القائمة")}
            aria-expanded={isOpen}
            aria-controls={isOpen ? "mobile-navigation" : undefined}
            aria-haspopup="dialog"
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center border border-white/15 text-white lg:hidden"
          >
            {isOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      </header>
      {isOpen && createPortal(
        <div className="sahm-mobile-menu" onClick={handleMenuBackdrop}>
          <nav
            ref={mobileMenuRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label={isEnglish ? "Mobile navigation" : "التنقل للجوال"}
            dir={isEnglish ? "ltr" : "rtl"}
            className="sahm-mobile-nav"
          >
            <div className="sahm-mobile-nav-heading">
              <span>{isEnglish ? "Navigate" : "التنقل"}</span>
              <button data-menu-close type="button" onClick={closeMobileMenu} aria-label={isEnglish ? "Close menu" : "إغلاق القائمة"}>
                <X size={19} />
              </button>
            </div>
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="sahm-mobile-nav-link"
              >
                {item.label}
              </Link>
            ))}
            <div className="sahm-mobile-nav-actions">
              <Link
                href={languageHref}
                onClick={() => setIsOpen(false)}
                lang={isEnglish ? "ar" : "en"}
                className="sahm-mobile-nav-language"
              >
                {languageLabel}
              </Link>
              <Link
                href={isEnglish ? "/en/contact" : "/contact"}
                onClick={() => setIsOpen(false)}
                className="sahm-button sahm-mobile-nav-cta"
              >
                {isEnglish ? "Start a project" : "ابدأ مشروعك"}
                <span aria-hidden="true">{isEnglish ? "→" : "←"}</span>
              </Link>
            </div>
          </nav>
        </div>,
        document.body,
      )}
    </>
  );
}
