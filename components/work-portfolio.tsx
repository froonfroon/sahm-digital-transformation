"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownLeft, ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Clock3, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import {
  type WorkCategory,
  type WorkLocale,
  type WorkProject,
  workCategoryLabels,
  workProjects,
} from "@/lib/work-projects";

const categoryOrder: WorkCategory[] = ["cybersecurity", "systems", "applications", "commerce", "education", "websites"];

const portfolioCopy = {
  ar: {
    eyebrow: "معرض الأعمال",
    title: "مشاريع حقيقية. وأعمال تتطور الآن.",
    description: "تعرّف على مشاريع مختارة من مصادرها، إلى جانب Queen Security، مشروع سهم الخاص قيد التطوير.",
    sourceNote: "صور وعناوين المشاريع الأخرى معروضة بإذن من Solve Codex. مشروع Queen Security ملك لسهم وما زال قيد التطوير.",
    sourceLink: "زيارة معرض المصدر",
    sahmProject: "مشروع سهم",
    inDevelopment: "قيد التطوير",
    developmentNote: "مشروع خاص بسهم وما زال قيد التطوير؛ قد تتغير الواجهة والتفاصيل خلال فترة التطوير.",
    browse: "استكشف المشاريع",
    selected: "مشاريع مختارة",
    count: "مشروع",
    images: "صور",
    view: "عرض المشروع",
    category: "التصنيف",
    back: "العودة إلى كل الأعمال",
    gallery: "معرض الصور",
    openImage: "فتح الصورة بالحجم الأصلي",
    previousImage: "الصورة السابقة",
    nextImage: "الصورة التالية",
    close: "إغلاق المعرض",
    image: "صورة",
    previousProject: "المشروع السابق",
    nextProject: "المشروع التالي",
    noProjects: "لا توجد مشاريع ضمن هذا التصنيف.",
  },
  en: {
    eyebrow: "Selected work",
    title: "Real work. One project taking shape now.",
    description: "Explore selected projects with their sources, alongside Queen Security, SAHM’s own project currently in development.",
    sourceNote: "Other project images and titles are shown with permission from Solve Codex. Queen Security is owned by SAHM and remains in development.",
    sourceLink: "Visit the source portfolio",
    sahmProject: "SAHM project",
    inDevelopment: "In development",
    developmentNote: "A SAHM-owned project currently in development; the interface and details may change as work progresses.",
    browse: "Explore projects",
    selected: "Selected projects",
    count: "projects",
    images: "images",
    view: "View project",
    category: "Category",
    back: "Back to all work",
    gallery: "Image gallery",
    openImage: "Open the original full-size image",
    previousImage: "Previous image",
    nextImage: "Next image",
    close: "Close gallery",
    image: "Image",
    previousProject: "Previous project",
    nextProject: "Next project",
    noProjects: "There are no projects in this category.",
  },
} satisfies Record<WorkLocale, Record<string, string>>;

function PortfolioFrame({
  locale,
  currentPage,
  projectSlug,
  children,
}: {
  locale: WorkLocale;
  currentPage: "work";
  projectSlug?: string;
  children: ReactNode;
}) {
  const isEnglish = locale === "en";

  return (
    <div lang={locale} dir={isEnglish ? "ltr" : "rtl"} className={`corporate-site corporate-site--${locale}`}>
      <a className="skip-link" href="#main-content">
        {isEnglish ? "Skip to main content" : "تجاوز إلى المحتوى الرئيسي"}
      </a>
      <SiteHeader locale={locale} currentPage={currentPage} workSlug={projectSlug} />
      {children}
      <SiteFooter locale={locale} currentPage={currentPage} workSlug={projectSlug} />
    </div>
  );
}

function SourceCredit({ locale, project }: { locale: WorkLocale; project?: WorkProject }) {
  const copy = portfolioCopy[locale];
  const isSahmProject = project?.ownership === "sahm";

  return (
    <div className="mt-8 flex flex-col gap-3 border-y border-white/10 py-4 text-xs leading-6 text-slate-400 sm:flex-row sm:items-center sm:justify-between">
      <p>{isSahmProject ? project.summary[locale] : copy.sourceNote}</p>
      {!isSahmProject && (
        <a
          href="https://solvecodex.com/projects"
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-2 text-slate-200 transition-colors hover:text-cyan-200 motion-reduce:transition-none"
        >
          {copy.sourceLink}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

export function WorkIndexPage({ locale }: { locale: WorkLocale }) {
  const [activeCategory, setActiveCategory] = useState<WorkCategory | "all">("all");
  const isEnglish = locale === "en";
  const copy = portfolioCopy[locale];
  const visibleProjects =
    activeCategory === "all"
      ? workProjects
      : workProjects.filter((project) => project.category === activeCategory);

  return (
    <PortfolioFrame locale={locale} currentPage="work">
      <main id="main-content" tabIndex={-1} className="relative isolate overflow-hidden pb-24 pt-16 sm:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[580px] overflow-hidden">
          <div className="absolute -top-40 start-[12%] h-[430px] w-[430px] rounded-full bg-cyan-400/[0.08] blur-[110px]" />
          <div className="absolute end-[8%] top-16 h-[340px] w-[340px] rounded-full bg-blue-600/[0.09] blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(148,163,184,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.18)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        </div>

        <section className="container">
          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.58fr)]">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 border border-cyan-200/20 bg-cyan-200/[0.06] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,.8)]" />
                {copy.eyebrow}
              </span>
              <h1 className="mt-7 text-4xl font-semibold leading-[1.12] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {copy.description}
              </p>
              <a
                href="#work-grid"
                className="mt-8 inline-flex min-h-12 items-center gap-3 border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-white transition-colors hover:border-cyan-200/40 hover:bg-white/[0.08] motion-reduce:transition-none"
              >
                {copy.browse}
                {isEnglish ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
              </a>
            </div>

            <div className="relative hidden min-h-[270px] items-center justify-center lg:flex">
              <div className="absolute h-[220px] w-[220px] rounded-full border border-cyan-100/10" />
              <div className="absolute h-[164px] w-[164px] rounded-full border border-dashed border-blue-200/20" />
              <div className="absolute h-[110px] w-[110px] rounded-full bg-cyan-300/[0.07] blur-2xl" />
              <div className="relative grid h-28 w-28 place-items-center border border-cyan-100/20 bg-slate-950/70 shadow-[0_0_90px_rgba(34,211,238,.12)]">
                <span className="text-4xl font-light tracking-tighter text-cyan-100">{String(workProjects.length).padStart(2, "0")}</span>
                <span className="absolute -bottom-8 text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  {copy.selected}
                </span>
              </div>
              <span className="absolute start-[calc(50%-122px)] top-12 h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_16px_rgba(103,232,249,.9)]" />
              <span className="absolute end-[calc(50%-120px)] bottom-12 h-1.5 w-1.5 rounded-full bg-blue-200 shadow-[0_0_14px_rgba(147,197,253,.9)]" />
            </div>
          </div>

          <SourceCredit locale={locale} />
        </section>

        <section id="work-grid" className="container scroll-mt-28 pt-16 sm:pt-20">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">{copy.category}</span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{copy.selected}</h2>
            </div>
            <p className="text-sm text-slate-400">
              <span className="font-semibold text-white">{visibleProjects.length}</span> {copy.count}
            </p>
          </div>

          <div className="mb-8 flex gap-2 overflow-x-auto pb-2" role="group" aria-label={copy.category}>
            {(["all", ...categoryOrder] as const).map((category) => {
              const selected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 border px-4 py-2.5 text-xs font-semibold transition-colors motion-reduce:transition-none ${
                    selected
                      ? "border-cyan-200/40 bg-cyan-100/[0.12] text-cyan-50"
                      : "border-white/10 bg-white/[0.025] text-slate-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {workCategoryLabels[locale][category]}
                </button>
              );
            })}
          </div>

          {visibleProjects.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((project, index) => (
                <Link
                  key={project.slug}
                  href={`${isEnglish ? "/en" : ""}/work/${project.slug}`}
                  className={`group relative overflow-hidden border border-white/[0.09] bg-[#080e1a]/80 transition-colors hover:border-cyan-100/30 motion-reduce:transition-none ${
                    index === 0 && activeCategory === "all" ? "sm:col-span-2" : ""
                  }`}
                  aria-label={`${copy.view}: ${project.title[locale]}`}
                >
                  <div className={`relative overflow-hidden bg-slate-900 ${index === 0 && activeCategory === "all" ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                    <Image
                      src={project.images[0].src}
                      alt={project.images[0].alt[locale]}
                      fill
                      sizes={index === 0 && activeCategory === "all" ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#050913] via-transparent to-black/10" />
                    <span className="absolute start-4 top-4 border border-white/15 bg-slate-950/75 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-200 backdrop-blur-sm">
                      {workCategoryLabels[locale][project.category]}
                    </span>
                    {project.ownership === "sahm" && (
                      <span className="absolute end-4 top-4 inline-flex items-center gap-1.5 border border-cyan-200/30 bg-slate-950/85 px-2.5 py-1.5 text-[10px] font-semibold text-cyan-100 backdrop-blur-sm">
                        {project.status === "in-development" && <Clock3 size={12} aria-hidden="true" />}
                        {copy.sahmProject} · {copy.inDevelopment}
                      </span>
                    )}
                    <span className="absolute bottom-4 end-4 grid h-9 w-9 translate-y-1 place-items-center border border-white/20 bg-slate-950/65 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transform-none motion-reduce:transition-none">
                      <ArrowDownLeft size={16} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="relative px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                    <div className="mb-3 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      <span>{String(workProjects.indexOf(project) + 1).padStart(2, "0")}</span>
                      <span>{project.images.length} {copy.images}</span>
                    </div>
                    <h3 className="text-lg font-semibold leading-snug text-white transition-colors group-hover:text-cyan-100 motion-reduce:transition-none sm:text-xl">
                      {project.title[locale]}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{project.summary[locale]}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-cyan-100">
                      {copy.view}
                      {isEnglish ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="border border-white/10 bg-white/[0.025] p-8 text-center text-sm text-slate-400">{copy.noProjects}</p>
          )}
        </section>
      </main>
    </PortfolioFrame>
  );
}

export function WorkProjectPage({
  locale,
  project,
  previousProject,
  nextProject,
}: {
  locale: WorkLocale;
  project: WorkProject;
  previousProject?: WorkProject;
  nextProject?: WorkProject;
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const imageTriggerRef = useRef<HTMLButtonElement>(null);
  const isEnglish = locale === "en";
  const copy = portfolioCopy[locale];
  const activeImage = project.images[activeImageIndex];
  const homeHref = isEnglish ? "/en/work" : "/work";

  useEffect(() => {
    if (!lightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    const imageTrigger = imageTriggerRef.current;
    document.body.style.overflow = "hidden";
    lightboxCloseRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      } else if (event.key === "ArrowLeft") {
        setActiveImageIndex((index) => (index + project.images.length - 1) % project.images.length);
      } else if (event.key === "ArrowRight") {
        setActiveImageIndex((index) => (index + 1) % project.images.length);
      } else if (event.key === "Tab") {
        const dialog = lightboxCloseRef.current?.closest("[role='dialog']");
        const focusable = dialog?.querySelectorAll<HTMLElement>("button, a[href]");
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
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      imageTrigger?.focus();
    };
  }, [lightboxOpen, project.images.length]);

  const moveImage = (direction: -1 | 1) => {
    setActiveImageIndex((index) => (index + project.images.length + direction) % project.images.length);
  };

  return (
    <PortfolioFrame locale={locale} currentPage="work" projectSlug={project.slug}>
      <main id="main-content" tabIndex={-1} className="relative isolate min-h-[75vh] overflow-hidden pb-24 pt-10 sm:pt-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,211,238,.10),transparent_65%)]" />
        <div className="container">
          <Link
            href={homeHref}
            className="inline-flex min-h-10 items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white motion-reduce:transition-none"
          >
            {isEnglish ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
            {copy.back}
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] lg:items-start lg:gap-14">
            <section aria-label={copy.gallery}>
              <button
                ref={imageTriggerRef}
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label={`${copy.openImage}: ${activeImage.alt[locale]}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden border border-white/10 bg-[#080e1a] text-start"
              >
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt[locale]}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 62vw"
                  className="object-contain transition-transform duration-700 group-hover:scale-[1.015] motion-reduce:transform-none motion-reduce:transition-none"
                />
                <span className="absolute bottom-4 end-4 inline-flex items-center gap-2 border border-white/20 bg-slate-950/75 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm">
                  {copy.openImage}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </button>

              {project.images.length > 1 && (
                <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4" aria-label={copy.gallery}>
                  {project.images.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      aria-label={`${copy.image} ${index + 1}: ${image.alt[locale]}`}
                      aria-pressed={activeImageIndex === index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative aspect-[4/3] overflow-hidden border bg-[#080e1a] ${
                        activeImageIndex === index ? "border-cyan-200/70" : "border-white/10 hover:border-white/35"
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 30vw, 180px"
                        className="object-cover transition-transform duration-500 hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                      />
                    </button>
                  ))}
                </div>
              )}
              <SourceCredit locale={locale} project={project} />
            </section>

            <section className="lg:sticky lg:top-28">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex border border-cyan-100/20 bg-cyan-100/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-100">
                  {workCategoryLabels[locale][project.category]}
                </span>
                {project.ownership === "sahm" && (
                  <span className="inline-flex items-center gap-1.5 border border-cyan-100/20 bg-cyan-100/[0.04] px-3 py-1.5 text-[10px] font-semibold text-cyan-50">
                    {project.status === "in-development" && <Clock3 size={12} aria-hidden="true" />}
                    {copy.sahmProject} · {copy.inDevelopment}
                  </span>
                )}
              </div>
              <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
                {project.title[locale]}
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-300">{project.summary[locale]}</p>
              <div className="mt-8 border-y border-white/10 py-5">
                <p className="text-xs leading-6 text-slate-400">
                  {project.ownership === "sahm" ? copy.developmentNote : copy.sourceNote}
                </p>
              </div>
              {project.ownership === "source" && (
                <a
                  href={activeImage.src}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 border border-white/15 px-4 text-xs font-semibold text-white transition-colors hover:border-cyan-100/40 hover:text-cyan-50 motion-reduce:transition-none"
                >
                  {copy.openImage}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}

              <div className="mt-12 grid grid-cols-2 gap-3">
                {previousProject ? (
                  <Link
                    href={`${isEnglish ? "/en" : ""}/work/${previousProject.slug}`}
                    rel="prev"
                    className="group border border-white/10 p-4 transition-colors hover:border-white/25 motion-reduce:transition-none"
                  >
                    <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-slate-500">
                      {isEnglish ? <ChevronLeft size={13} /> : <ChevronRight size={13} />}
                      {copy.previousProject}
                    </span>
                    <span className="mt-3 block text-sm font-medium leading-5 text-slate-200 group-hover:text-cyan-100">
                      {previousProject.title[locale]}
                    </span>
                  </Link>
                ) : <span />}
                {nextProject ? (
                  <Link
                    href={`${isEnglish ? "/en" : ""}/work/${nextProject.slug}`}
                    rel="next"
                    className="group border border-white/10 p-4 text-end transition-colors hover:border-white/25 motion-reduce:transition-none"
                  >
                    <span className="flex items-center justify-end gap-2 text-[10px] uppercase tracking-[0.12em] text-slate-500">
                      {copy.nextProject}
                      {isEnglish ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
                    </span>
                    <span className="mt-3 block text-sm font-medium leading-5 text-slate-200 group-hover:text-cyan-100">
                      {nextProject.title[locale]}
                    </span>
                  </Link>
                ) : <span />}
              </div>
            </section>
          </div>
        </div>
      </main>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#02050b]/95 p-3 backdrop-blur-md sm:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLightboxOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${copy.gallery}: ${project.title[locale]}`}
            className="relative flex h-[min(88vh,920px)] max-h-full w-full max-w-7xl flex-col border border-white/10 bg-[#080d18] p-3 sm:p-5"
          >
            <div className="flex items-center justify-between gap-4 pb-3">
              <p className="line-clamp-1 text-sm font-medium text-white">{project.title[locale]}</p>
              <button
                ref={lightboxCloseRef}
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label={copy.close}
                className="grid h-10 w-10 shrink-0 place-items-center border border-white/15 text-white hover:border-white/40"
              >
                <X size={17} />
              </button>
            </div>
            <div className="relative min-h-0 flex-1 overflow-hidden bg-black/30">
              <Image
                src={activeImage.src}
                alt={activeImage.alt[locale]}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-3 pt-3">
              <button
                type="button"
                onClick={() => moveImage(-1)}
                disabled={project.images.length < 2}
                aria-label={copy.previousImage}
                className="grid h-10 w-10 shrink-0 place-items-center border border-white/15 text-white transition-colors hover:border-cyan-100/40 disabled:opacity-40 motion-reduce:transition-none"
              >
                {isEnglish ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </button>
              <p className="min-w-0 flex-1 text-center text-xs text-slate-400">
                {activeImage.alt[locale]} <span className="mx-1 text-slate-600">·</span>
                {activeImageIndex + 1} / {project.images.length}
              </p>
              <button
                type="button"
                onClick={() => moveImage(1)}
                disabled={project.images.length < 2}
                aria-label={copy.nextImage}
                className="grid h-10 w-10 shrink-0 place-items-center border border-white/15 text-white transition-colors hover:border-cyan-100/40 disabled:opacity-40 motion-reduce:transition-none"
              >
                {isEnglish ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </PortfolioFrame>
  );
}
