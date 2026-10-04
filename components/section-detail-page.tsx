"use client";

import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  ArrowUpRight,
  Check,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ProjectInquiryForm } from "./project-inquiry-form";
import { Reveal } from "./reveal";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type Locale = "ar" | "en";
type PageKey = "about" | "services" | "why-sahm" | "contact";
type SectionCopy = {
  eyebrow: string;
  title: string;
  description: string;
  badge: string;
  stats: { value: string; label: string }[];
  features: { title: string; description: string }[];
  cta: string;
  secondary: string;
  secondaryHref: string;
};

const content = {
  ar: {
    about: {
      eyebrow: "من نحن",
      title: "شريكك التقني في كل مرحلة من رحلة التحول الرقمي.",
      description:
        "نقود المؤسسة من الفكرة إلى التنفيذ عبر استشارات تقنية، بنية رقمية، أمان سيبراني، وأنظمة مخصصة تدعم نمو الأعمال بكفاءة وثقة.",
      badge: "خبرة تطبيقية + رؤية استراتيجية",
      stats: [
        { value: "360°", label: "منظومة شاملة" },
        { value: "04", label: "مجموعات خدمات رئيسية" },
        { value: "24/7", label: "إدارة واستجابة" },
      ],
      features: [
        {
          title: "حلول تركز على الأعمال",
          description: "نبدأ من احتياج المؤسسة، ثم نُصمم الحلول بما يراعي أهدافها، مجالاتها التشغيلية، وأثرها على الأداء.",
        },
        {
          title: "استراتيجية + تنفيذ",
          description: "نوزّع العمل بين التخطيط الفعلي والتطبيقات التشغيلية، بحيث يتحول التحول الرقمي إلى برنامج قابل للتنفيذ.",
        },
        {
          title: "أمان مُدمج منذ البداية",
          description: "نخطط للمنظومة بشكل يحمي البيانات والأنظمة من أول مرحلة، مع مراعاة المتطلبات التنظيمية والعملية.",
        },
      ],
      cta: "تواصل معنا",
      secondary: "استكشف خدماتنا",
      secondaryHref: "/services",
    },
    services: {
      eyebrow: "خدماتنا",
      title: "حلول تقنية متكاملة لكل مرحلة من مسار التحول الرقمي.",
      description:
        "نقدّم خدمات متكاملة تجمع بين الاستشارات التقنية، الأمن السيبراني، بناء الأنظمة والبرمجيات، وذكاء هندسي متخصص للحقول النفطية.",
      badge: "من الاستشارة إلى التنفيذ",
      stats: [
        { value: "01", label: "استشارات وتخطيط" },
        { value: "02", label: "أمن سيبراني" },
        { value: "03", label: "أنظمة وبرامج" },
      ],
      features: [
        {
          title: "الاستشارات التقنية والتحول الرقمي",
          description: "تقييم الواقع التقني، رسم خارطة الطريق، وتحديد أولويات التحول بما يحقق النتيجة التي تنطلق من احتياج المؤسسة.",
        },
        {
          title: "الأمن السيبراني",
          description: "حماية البنية والبيانات عبر سياسات أمنية، تصميم ذكي، وسلامة العمليات عند الربط أو التشغيل.",
        },
        {
          title: "الأنظمة والبرمجيات",
          description: "تطوير تطبيقات ومنصات وأنظمة أعمال مخصصة، مع مراعاة التكامل والتوسع وقابلية الصيانة.",
        },
        {
          title: "ذكاء الحقول النفطية",
          description: "منصة متخصصة تجمع بين تحليل البيانات والهندسة والذكاء الاصطناعي لدعم القرار، المراقبة، والتحكم في الأداء.",
        },
      ],
      cta: "ابدأ مشروعك",
      secondary: "استكشف الحلول",
      secondaryHref: "/projects",
    },
    "why-sahm": {
      eyebrow: "لماذا سهم",
      title: "نحوّل التعقيد إلى أنظمة قابلة للتنفيذ وفعالة.",
      description:
        "الميزة الأساسية في سهم هي قدرتها على ربط الفهم الاستراتيجي بالخبرة التنفيذية، بحيث يخرج الحل عمليًا ويُدار بوضوح وتوازن بين الأداء والأمان.",
      badge: "قيمة نضيفها لكل عميل",
      stats: [
        { value: "90%", label: "تركيز على الاحتياج" },
        { value: "100%", label: "اهتمام بالأمان" },
        { value: "360°", label: "رؤية متكاملة" },
      ],
      features: [
        {
          title: "منظور عملي لا نظري",
          description: "نحلّق بعيدًا عن المنتجات الجاهزة، ونصمم ما يناسب بيئة المؤسسة الفعلية واحتياجاتها التشغيلية.",
        },
        {
          title: "توازن بين السرعة والثبات",
          description: "نوازن بين تحقيق النتائج سريعًا والاعتماد على بنية موثوقة، لا مجرد واجهات أو أدوات سريعة الزوال.",
        },
        {
          title: "استمرارية مستقبليّة",
          description: "تُبنى الأنظمة لتدعم النمو والمرونة، مع إمكانات للربط والتوسع لاحقًا دون إعادة البناء الكاملة.",
        },
      ],
      cta: "قابل فريقنا",
      secondary: "اقرأ عن خدماتنا",
      secondaryHref: "/services",
    },
    contact: {
      eyebrow: "تواصل معنا",
      title: "لنبدأ حوارًا واضحًا حول رسالتك الرقمية.",
      description:
        "أخبرنا عن تحديك أو هدفك، وسنساعدك في وضع خارطة مناسبة للخطوة التالية، سواء كان ذلك استشارات، تصميم، تطوير، أو منظومة متكاملة.",
      badge: "نساعدك في اتخاذ الخطوة الصحيحة",
      stats: [
        { value: "<24h", label: "رد أولي" },
        { value: "4", label: "مجالات رئيسية" },
        { value: "1", label: "حوار هدفه التنفيذ" },
      ],
      features: [
        {
          title: "استفسار سريع",
          description: "أرسل تفاصيل المشروع أو الاحتياج وستصلك الإجابة من فريقنا برؤية أولية مناسبة.",
        },
        {
          title: "مقترح موجه",
          description: "نقترح المسار الأنسب: استشارة، نظام، تطبيق، تدقيق أمان، أو منصة ذكية متخصصة.",
        },
        {
          title: "التنسيق الفعلي",
          description: "نربطك بالخبرة المناسبة ونحدد الخطوات التالية بطريقة عملية ومباشرة.",
        },
      ],
      cta: "راسل فريقنا",
      secondary: "اتصل بنا الآن",
      secondaryHref: "tel:0914778779",
    },
  },
  en: {
    about: {
      eyebrow: "About",
      title: "Your technology partner through every stage of digital transformation.",
      description:
        "We guide organizations from idea to execution through technology consulting, digital infrastructure, cybersecurity, and tailored systems that support efficient, confident growth.",
      badge: "Strategy + execution",
      stats: [
        { value: "360°", label: "Complete ecosystem" },
        { value: "04", label: "Core service tracks" },
        { value: "24/7", label: "Operations support" },
      ],
      features: [
        {
          title: "Business-first solutions",
          description: "We start from the organization’s real needs and design solutions that match operating priorities and performance goals.",
        },
        {
          title: "Strategy with delivery",
          description: "We connect planning and execution so digital transformation becomes a practical, measurable program.",
        },
        {
          title: "Security embedded from day one",
          description: "We design systems with protection and governance in mind from the earliest architecture decisions.",
        },
      ],
      cta: "Contact us",
      secondary: "Explore services",
      secondaryHref: "/en/services",
    },
    services: {
      eyebrow: "Our services",
      title: "Integrated technology solutions for every stage of your transformation journey.",
      description:
        "We deliver end-to-end capabilities spanning technology consulting, cybersecurity, systems and software development, and specialized engineering intelligence for oil fields.",
      badge: "From strategy to execution",
      stats: [
        { value: "01", label: "Consulting" },
        { value: "02", label: "Cybersecurity" },
        { value: "03", label: "Systems & software" },
      ],
      features: [
        {
          title: "Technology consulting & transformation",
          description: "Technology assessment, roadmap design, and strategic prioritization shaped around business needs.",
        },
        {
          title: "Cybersecurity",
          description: "Protective design for systems, platforms, and data across critical operational environments.",
        },
        {
          title: "Systems & software development",
          description: "Custom applications and business systems designed for integration, scale, and long-term maintainability.",
        },
        {
          title: "Oil-field intelligence",
          description: "A data-driven engineering platform linking analysis, monitoring, and decision support for asset performance.",
        },
      ],
      cta: "Start your project",
      secondary: "Explore solutions",
      secondaryHref: "/en/projects",
    },
    "why-sahm": {
      eyebrow: "Why SAHM",
      title: "Turning complexity into practical, resilient systems.",
      description:
        "Our strength is in connecting strategic understanding with executional expertise, so every solution is usable, secure, and aligned with real-world operations.",
      badge: "Value we bring to each client",
      stats: [
        { value: "90%", label: "Need-driven focus" },
        { value: "100%", label: "Security mindset" },
        { value: "360°", label: "Integrated view" },
      ],
      features: [
        {
          title: "Practical over theoretical",
          description: "We avoid generic solutions and design around the actual context, environment, and operational realities of the client.",
        },
        {
          title: "A balance of speed and stability",
          description: "We deliver momentum without compromising the robustness of architecture, governance, and long-term maintainability.",
        },
        {
          title: "Future-ready continuity",
          description: "Our systems are designed to scale and adapt as operations and digital requirements evolve over time.",
        },
      ],
      cta: "Meet the team",
      secondary: "View our services",
      secondaryHref: "/en/services",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let’s shape the next step in your digital journey.",
      description:
        "Share your challenge or objective, and we’ll help map the right next move—whether it’s consulting, design, development, or a full integrated platform.",
      badge: "We help you choose the right path",
      stats: [
        { value: "<24h", label: "Initial response" },
        { value: "4", label: "Core focus areas" },
        { value: "1", label: "Execution-focused conversation" },
      ],
      features: [
        {
          title: "Fast inquiry",
          description: "Send your project brief and we’ll respond with a practical first recommendation.",
        },
        {
          title: "Tailored proposal",
          description: "We identify the most relevant route: consulting, software delivery, security review, or specialized platform design.",
        },
        {
          title: "Clear next steps",
          description: "We align on scope, expectations, and the sequence of actions needed to move forward confidently.",
        },
      ],
      cta: "Email our team",
      secondary: "Call now",
      secondaryHref: "tel:0914778779",
    },
  },
} satisfies Record<Locale, Record<PageKey, SectionCopy>>;

export function SectionDetailPage({ locale, pageKey }: { locale: Locale; pageKey: PageKey }) {
  const isEnglish = locale === "en";
  const copy = content[locale][pageKey];
  const isContact = pageKey === "contact";
  const reduceMotion = useReducedMotion();
  const deliverySteps = isEnglish
    ? [
        { index: "01", title: "Discovery", text: "We define business objectives, constraints, and operational context before shaping the solution." },
        { index: "02", title: "Execution", text: "We move from design to delivery with secure architecture, systems integration, and measured milestones." },
        { index: "03", title: "Scale", text: "We build for continuity, performance, and future expansion without rework or operational drift." },
      ]
    : [
        { index: "01", title: "الاكتشاف", text: "نحدد أهداف العمل والقيود والسياق التشغيلي قبل تصميم الحل." },
        { index: "02", title: "التنفيذ", text: "ننتقل من التصميم إلى التنفيذ عبر هندسة آمنة، تكامل أنظمة، ومراحل قابلة للقياس." },
        { index: "03", title: "التوسع", text: "نبني الأنظمة للاستمرارية والأداء والتوسع المستقبلي دون إعادة بناء أو تشتت في العمليات." },
      ];

  return (
    <div dir={isEnglish ? "ltr" : "rtl"} className="sahm-detail-site min-h-screen text-white">
      <SiteHeader locale={locale} currentPage={pageKey} />

      <main className="relative overflow-hidden" data-sahm-story>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            aria-hidden="true"
            className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-[#2d6cc3]/20 blur-3xl"
            animate={reduceMotion ? undefined : { x: [0, 22, -8, 0], y: [0, -16, 12, 0], opacity: [0.55, 0.8, 0.65, 0.55] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#45c5d7]/12 blur-3xl"
            animate={reduceMotion ? undefined : { x: [0, -18, 10, 0], y: [0, 20, -14, 0], opacity: [0.35, 0.7, 0.45, 0.35] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute -right-20 top-20 h-[420px] w-[420px] rounded-full border border-[#7aa8ff]/18"
            animate={reduceMotion ? undefined : { rotate: 360, scale: [1, 1.07, 1] }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute right-[12%] top-[18%] h-[300px] w-[300px] rounded-full border border-[#84d9eb]/15"
            animate={reduceMotion ? undefined : { rotate: -360, scale: [1.08, 1, 1.08] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          />
          <div className="section-grid" aria-hidden="true" />
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 mx-auto h-px w-[80%] bg-gradient-to-r from-transparent via-[#8ac0ff]/70 to-transparent"
            animate={reduceMotion ? undefined : { opacity: [0.25, 1, 0.3], scaleX: [0.82, 1, 0.88] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <section className="relative border-b border-white/10 bg-[#06101d]/80 py-16 md:py-24" data-sahm-scene="01">
          <div className="container grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal className="relative z-10">
              <motion.span
                className="inline-flex items-center gap-2 rounded-full border border-[#7ca9e8]/30 bg-[#0d233d]/80 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-[#b9d7ff] uppercase"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.7 }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                {copy.eyebrow}
              </motion.span>
              <motion.h1
                className="mt-6 max-w-xl text-4xl font-black leading-[1.1] text-white md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.08 }}
              >
                {copy.title}
              </motion.h1>
              <motion.p
                className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.14 }}
              >
                {copy.description}
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.22 }}
              >
                <Link href={isContact ? "mailto:info@sahm.ly" : isEnglish ? "/en/contact" : "/contact"} className="sahm-button inline-flex items-center gap-3 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(61,129,210,0.3)]">
                  {copy.cta}
                  {isEnglish ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
                </Link>

                <Link
                  href={copy.secondaryHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/3 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-[#8eb9ff]/60 hover:text-white"
                >
                  {copy.secondary}
                  {isEnglish ? <ArrowUpRight size={15} /> : <ArrowUpLeft size={15} />}
                </Link>
              </motion.div>
            </Reveal>

            <Reveal className="relative z-10" delay={0.08}>
              <motion.div
                className="soft-card premium-panel relative overflow-hidden rounded-[28px] border border-[#7aa3da]/20 p-6 shadow-[0_20px_80px_rgba(4,15,26,0.72)]"
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.16 }}
                whileHover={reduceMotion ? undefined : { y: -10, scale: 1.02, rotateX: 3, rotateY: -3 }}
                style={{ transformPerspective: 1400 }}
              >
                <motion.div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(112,164,255,0.18),transparent_35%)]"
                  animate={reduceMotion ? undefined : { opacity: [0.35, 0.7, 0.45] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute inset-3 rounded-[22px] border border-white/10" />
                <div className="relative z-10">
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-[#6fa3e6]/35 bg-[#122b48]/80 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-[#d8ebff] uppercase">
                      {copy.badge}
                    </span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#89b9ff]/30 bg-[#0c1d31]/80 text-[10px] font-bold text-[#dfeeff]">SA</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    {copy.stats.map((stat: { value: string; label: string }, index: number) => (
                      <motion.div
                        key={stat.label}
                        className="rounded-2xl border border-white/10 bg-[#0c1d31]/90 p-4"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.5, delay: 0.2 + index * 0.1 }}
                        whileHover={reduceMotion ? undefined : { y: -6, scale: 1.04 }}
                      >
                        <div className="text-xl font-black text-[#b9d7ff] md:text-2xl">{stat.value}</div>
                        <div className="mt-2 text-[11px] leading-6 text-slate-300">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="mt-6 rounded-2xl border border-[#74a7eb]/25 bg-gradient-to-r from-[#173253] to-[#0b1d2d] p-4"
                    animate={reduceMotion ? undefined : { boxShadow: ["0 0 0 rgba(94,176,255,0.15)", "0 0 28px rgba(94,176,255,0.24)", "0 0 0 rgba(94,176,255,0.15)"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="flex items-center justify-between text-sm text-slate-200">
                      <span>{isEnglish ? "Operational readiness" : "جاهزية التشغيل"}</span>
                      <span className="font-semibold text-[#a9d0ff]">92%</span>
                    </div>
                    <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#76aef9] via-[#4fd3ff] to-[#7fe0bd]" style={{ width: "92%" }} />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </section>

        <section className="relative py-16 md:py-20" data-sahm-scene="03">
          <div className="container">
            <Reveal className="mb-10 max-w-2xl">
              <span className="eyebrow">{isEnglish ? "What we bring" : "ما نقدمه"}</span>
              <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">
                {isEnglish ? "Built around clarity, capability, and trust." : "مبني على الوضوح والقدرة والثقة."}
              </h2>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {copy.features.map((feature: { title: string; description: string }, index: number) => (
                <Reveal key={feature.title} delay={index * 0.05}>
                  <motion.article
                    className="soft-card group relative h-full overflow-hidden rounded-[26px] border border-white/10 p-6 transition duration-300 hover:border-[#86b7ff]/40"
                    whileHover={reduceMotion ? undefined : { y: -10, rotateX: 2, rotateY: -2 }}
                    style={{ transformPerspective: 1200 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#7db7ff]/8 via-transparent to-[#78e0d1]/5"
                      animate={reduceMotion ? undefined : { opacity: [0.3, 0.8, 0.35] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                    />
                    <motion.div
                      className="relative z-10 mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#11263e] text-[#b6d6ff] ring-1 ring-white/10"
                      animate={reduceMotion ? undefined : { rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
                      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
                    >
                      <Check size={18} />
                    </motion.div>
                    <h3 className="relative z-10 text-xl font-bold text-white">{feature.title}</h3>
                    <p className="relative z-10 mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>
                  </motion.article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative pb-10 md:pb-16">
          <div className="container">
            <motion.div
              className="premium-panel relative overflow-hidden rounded-[30px] p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduceMotion ? 0 : 0.7 }}
            >
              <motion.div
                aria-hidden="true"
                className="absolute -right-16 top-8 h-64 w-64 rounded-full bg-[#63a8ff]/12 blur-3xl"
                animate={reduceMotion ? undefined : { x: [0, 18, -10, 0], y: [0, -12, 8, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative z-10 grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <span className="eyebrow">{isEnglish ? "Delivery model" : "نموذج التنفيذ"}</span>
                  <h3 className="mt-4 max-w-md text-2xl font-black text-white md:text-3xl">
                    {isEnglish ? "International standards, local execution, measurable results." : "معايير عالمية، تنفيذ محلي، نتائج قابلة للقياس."}
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {deliverySteps.map((step) => (
                    <motion.div
                      key={step.index}
                      className="rounded-[22px] border border-white/10 bg-[#0d1d2d]/90 p-4"
                      whileHover={reduceMotion ? undefined : { y: -6 }}
                    >
                      <div className="text-xs font-bold tracking-[0.22em] text-[#8ec4ff]">{step.index}</div>
                      <div className="mt-3 text-base font-bold text-white">{step.title}</div>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{step.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {isContact ? (
          <section className="relative pb-20" data-sahm-scene="08">
            <div className="container">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <Reveal className="soft-card rounded-[28px] border border-[#7aa3da]/20 p-7">
                  <span className="eyebrow">{copy.eyebrow}</span>
                  <h3 className="mt-4 text-2xl font-black text-white md:text-3xl">{isEnglish ? "Direct communication" : "تواصل مباشر"}</h3>
                  <div className="mt-7 space-y-4">
                    <a href="mailto:info@sahm.ly" className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0d1b2c]/80 p-4 text-left text-slate-200 transition hover:border-[#8bb8ff]/45">
                      <span className="flex items-center gap-3"> <Mail size={17} /> <span>{isEnglish ? "Email" : "البريد الإلكتروني"}</span> </span>
                      <span className="text-sm font-medium text-[#bfe3ff]">info@sahm.ly</span>
                    </a>
                    <a href="tel:0914778779" className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0d1b2c]/80 p-4 text-left text-slate-200 transition hover:border-[#8bb8ff]/45" dir="ltr">
                      <span className="flex items-center gap-3"> <Phone size={17} /> <span>{isEnglish ? "Phone" : "الهاتف"}</span> </span>
                      <span className="text-sm font-medium text-[#bfe3ff]">0914778779</span>
                    </a>
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <ProjectInquiryForm locale={locale} />
                </Reveal>
              </div>
            </div>
          </section>
        ) : (
          <section className="relative pb-20" data-sahm-scene="08">
            <div className="container">
              <motion.div
                className="soft-card relative overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-r from-[#0d233d] via-[#101d31] to-[#0c1727] p-7 md:p-10"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reduceMotion ? 0 : 0.7 }}
                whileHover={reduceMotion ? undefined : { y: -6, scale: 1.01 }}
              >
                <motion.div
                  className="absolute left-10 top-5 h-28 w-28 rounded-full bg-[#5aa2ff]/14 blur-2xl"
                  animate={reduceMotion ? undefined : { x: [0, 16, -12, 0], y: [0, -10, 14, 0], opacity: [0.2, 0.7, 0.35] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <span className="eyebrow">{isEnglish ? "Next step" : "الخطوة التالية"}</span>
                    <h3 className="mt-3 text-2xl font-black text-white md:text-3xl">
                      {isEnglish ? "Need a solution designed around your business?" : "هل تحتاج إلى حل مصمم خصيصًا لعملك؟"}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link href={isEnglish ? "/en/contact" : "/contact"} className="sahm-button inline-flex items-center gap-3 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(61,129,210,0.26)]">
                      {copy.cta}
                      {isEnglish ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
                    </Link>
                    <Link href={copy.secondaryHref} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/3 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-[#8eb9ff]/60 hover:text-white">
                      {copy.secondary}
                      {isEnglish ? <ArrowDownLeft size={15} /> : <ArrowDownLeft size={15} />}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter locale={locale} currentPage={pageKey} />
    </div>
  );
}
