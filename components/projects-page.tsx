import {
  ArrowLeft,
  ArrowRight,
  Blocks,
  Code2,
  Compass,
  Database,
  Globe2,
  Layers3,
  Network,
  ShieldCheck,
  Smartphone,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { ProjectInquiryForm } from "./project-inquiry-form";
import { DigitalConnectionNetwork } from "./digital-connection-network";
import { Reveal } from "./reveal";

type Locale = "ar" | "en";

type ProjectCategory = {
  slug: string;
  icon: LucideIcon;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  capabilities: Record<Locale, string[]>;
  label: Record<Locale, string>;
};

const categories: ProjectCategory[] = [
  {
    slug: "web-platforms",
    icon: Globe2,
    label: { ar: "المواقع والمنصات", en: "Websites & platforms" },
    title: { ar: "المواقع والمنصات الرقمية", en: "Websites & digital platforms" },
    summary: {
      ar: "تصميم وبناء تجارب ومواقع ومنصات رقمية تنطلق من احتياجات العمل الفعلية، وتتكامل مع الأنظمة والبنية القائمة.",
      en: "Designing and building digital experiences, websites, and platforms around real business needs, with room to integrate into existing systems and infrastructure.",
    },
    capabilities: {
      ar: ["مواقع الأعمال", "المنصات الرقمية", "تكامل الأنظمة", "تصميم مخصص للاحتياج"],
      en: ["Business websites", "Digital platforms", "System integration", "Purpose-built design"],
    },
  },
  {
    slug: "applications",
    icon: Smartphone,
    label: { ar: "التطبيقات", en: "Applications" },
    title: { ar: "تطبيقات الويب والجوال", en: "Web & mobile applications" },
    summary: {
      ar: "تطوير تطبيقات وبرمجيات مخصصة تدعم احتياجات العمل، وتربط الوظائف الرقمية بالأنظمة والبيانات ذات الصلة.",
      en: "Custom application and software development that supports business needs and connects digital workflows with relevant systems and data.",
    },
    capabilities: {
      ar: ["تطبيقات الويب", "تطبيقات الجوال", "هندسة البرمجيات", "الربط مع الأنظمة القائمة"],
      en: ["Web applications", "Mobile applications", "Software engineering", "Integration with existing systems"],
    },
  },
  {
    slug: "cybersecurity",
    icon: ShieldCheck,
    label: { ar: "الأمن السيبراني", en: "Cybersecurity" },
    title: { ar: "الأمن السيبراني", en: "Cybersecurity" },
    summary: {
      ar: "حماية الأنظمة والبيانات من التهديدات السيبرانية عبر ممارسات أمان مدروسة من التصميم.",
      en: "Protecting systems and data from cyber threats through security practices considered from the design stage.",
    },
    capabilities: {
      ar: ["حماية الأنظمة", "حماية البيانات", "الأمان من التصميم", "ممارسات أمنية مدروسة"],
      en: ["System protection", "Data protection", "Security by design", "Thoughtful security practices"],
    },
  },
  {
    slug: "business-systems",
    icon: Blocks,
    label: { ar: "الأنظمة والبرمجيات", en: "Systems & software" },
    title: { ar: "أنظمة وبرمجيات الأعمال", en: "Business systems & software" },
    summary: {
      ar: "تصميم وتطوير أنظمة وبرمجيات مخصصة تلبي احتياجات العمل الفعلية وتتكامل مع البنية القائمة.",
      en: "Designing and developing custom systems and software for real business needs, integrated with existing infrastructure.",
    },
    capabilities: {
      ar: ["تحليل احتياجات العمل", "أنظمة مخصصة", "التكامل", "القابلية للتوسع"],
      en: ["Business requirements", "Custom systems", "Integration", "Scalable foundations"],
    },
  },
  {
    slug: "digital-transformation",
    icon: Compass,
    label: { ar: "الاستشارات والتحول", en: "Consulting & transformation" },
    title: { ar: "الاستشارات التقنية والتحول الرقمي", en: "Technology consulting & digital transformation" },
    summary: {
      ar: "تقييم الواقع التقني للمؤسسة وتصميم خارطة طريق للتحول الرقمي تتناسب مع أهدافها.",
      en: "Assessing an organization’s technology landscape and shaping a digital transformation roadmap around its goals.",
    },
    capabilities: {
      ar: ["تقييم الواقع التقني", "مواءمة الحلول مع الأهداف", "تصميم الاستراتيجية", "خارطة طريق للتحول"],
      en: ["Technology assessment", "Solutions aligned to goals", "Strategy design", "Transformation roadmap"],
    },
  },
  {
    slug: "oilfield-intelligence",
    icon: Database,
    label: { ar: "ذكاء الحقول النفطية", en: "Oil-field intelligence" },
    title: { ar: "منصة الذكاء الهندسي للحقول النفطية", en: "Engineering intelligence for oil fields" },
    summary: {
      ar: "منصة متخصصة تجمع بين هندسة المكامن وتحليل البيانات والذكاء الاصطناعي لدعم تشغيل الحقول النفطية بكفاءة وأمان أعلى.",
      en: "A specialized platform combining reservoir engineering, data analysis, and artificial intelligence to support more efficient and safer oil-field operations.",
    },
    capabilities: {
      ar: ["هندسة المكامن", "تحليل البيانات", "الذكاء الاصطناعي", "المراقبة", "الإنذار المبكر", "دعم القرار"],
      en: ["Reservoir engineering", "Data analytics", "Artificial intelligence", "Monitoring", "Early warning", "Decision support"],
    },
  },
];

const pageCopy = {
  ar: {
    eyebrow: "مجالات الحلول",
    title: "حلول تقنية تنطلق من تحديات الأعمال.",
    description:
      "استكشف المجالات التي تغطيها حلول سهم في الاستشارات التقنية، الأمن السيبراني، بناء الأنظمة والبرمجيات، ومنصة الذكاء الهندسي للحقول النفطية.",
    transparency:
      "تعرّف هذه الصفحات بمجالات الحلول والقدرات التقنية، ولا تمثل سجلًا لمشاريع منفذة أو دراسات حالة.",
    explore: "استكشف الحل",
    back: "جميع مجالات الحلول",
    focus: "مجال الحل",
    capabilities: "قدرات ضمن هذا المجال",
    contact: "ناقش احتياجك التقني",
    contactLead: "تواصل مع سهم لبدء حوار حول احتياجات مؤسستك.",
    notFound: "المجال المطلوب غير موجود.",
  },
  en: {
    eyebrow: "Solution areas",
    title: "Technology solutions shaped around business challenges.",
    description:
      "Explore the domains covered by SAHM’s technology consulting, cybersecurity, systems and software development, and engineering intelligence platform for oil fields.",
    transparency:
      "These pages describe solution areas and technical capabilities. They are not a record of completed projects or case studies.",
    explore: "Explore this solution",
    back: "All solution areas",
    focus: "Solution domain",
    capabilities: "Capabilities in this domain",
    contact: "Discuss your technology needs",
    contactLead: "Contact SAHM to start a conversation about your organization’s needs.",
    notFound: "The requested domain was not found.",
  },
} satisfies Record<Locale, Record<string, string>>;

function CategoryArtwork({ category, locale }: { category: ProjectCategory; locale: Locale }) {
  const Icon = category.icon;
  const isEnglish = locale === "en";
  return (
    <div className="domain-art" aria-hidden="true">
      <div className="domain-art-grid" />
      <div className="domain-art-orbit domain-art-orbit--outer" />
      <div className="domain-art-orbit domain-art-orbit--inner" />
      <div className="domain-art-core"><Icon size={31} strokeWidth={1.3} /></div>
      <span className="domain-art-label domain-art-label--top">
        <i />{isEnglish ? "SAHM CAPABILITY" : "قدرات سهم"}
      </span>
      <span className="domain-art-label domain-art-label--bottom">
        {category.label[locale]}
      </span>
      <Network className="domain-art-network" size={20} strokeWidth={1.2} />
    </div>
  );
}

export function ProjectsIndexPage({ locale }: { locale: Locale }) {
  const isEnglish = locale === "en";
  const text = pageCopy[locale];
  return (
    <div lang={locale} dir={isEnglish ? "ltr" : "rtl"} className={`corporate-site corporate-site--${locale}`}>
      <a className="skip-link" href="#main-content">
        {isEnglish ? "Skip to main content" : "تجاوز إلى المحتوى الرئيسي"}
      </a>
      <SiteHeader locale={locale} currentPage="projects" />
      <main id="main-content" tabIndex={-1} className="projects-page">
        <section className="projects-hero">
          <div className="grid-texture projects-hero-grid" />
          <div className="container projects-hero-layout">
            <Reveal className="projects-hero-copy">
              <span className="eyebrow">{text.eyebrow}</span>
              <h1>{text.title}</h1>
              <p>{text.description}</p>
              <div className="projects-transparency">
                <span className="projects-transparency-mark"><Workflow size={17} /></span>
                <p>{text.transparency}</p>
              </div>
            </Reveal>
            <Reveal className="projects-hero-art" delay={0.1}>
              <div className="projects-hero-ring projects-hero-ring--outer" />
              <div className="projects-hero-ring projects-hero-ring--inner" />
              <div className="projects-hero-center"><Layers3 size={34} strokeWidth={1.2} /></div>
              {[Code2, ShieldCheck, Smartphone, Database].map((Icon, index) => (
                <span key={index} className={`projects-hero-node projects-hero-node-${index + 1}`}>
                  <Icon size={16} strokeWidth={1.5} />
                </span>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="domain-index-section">
          <div className="container">
            <Reveal className="domain-index-heading">
              <span className="eyebrow">{isEnglish ? "Explore solutions" : "تعرّف على الحلول"}</span>
              <span className="domain-index-rule" />
            </Reveal>
            <div className="domain-index-grid">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Reveal key={category.slug} delay={index * 0.045}>
                    <Link
                      href={`${isEnglish ? "/en" : ""}/projects/${category.slug}`}
                      className="domain-card"
                    >
                      <span className="domain-card-index">0{index + 1}</span>
                      <span className="domain-card-icon"><Icon size={19} strokeWidth={1.5} /></span>
                      <h2>{category.title[locale]}</h2>
                      <p>{category.summary[locale]}</p>
                      <span className="domain-card-link">
                        {text.explore}
                        {isEnglish ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} currentPage="solutions" />
    </div>
  );
}

export function ProjectDomainPage({ locale, slug }: { locale: Locale; slug: string }) {
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const isEnglish = locale === "en";
  const text = pageCopy[locale];
  const Icon = category.icon;

  return (
    <div lang={locale} dir={isEnglish ? "ltr" : "rtl"} className={`corporate-site corporate-site--${locale}`}>
      <a className="skip-link" href="#main-content">
        {isEnglish ? "Skip to main content" : "تجاوز إلى المحتوى الرئيسي"}
      </a>
      <SiteHeader locale={locale} currentPage="projects" projectCategory={slug} />
      <main id="main-content" tabIndex={-1} className="domain-page">
        <section className="domain-detail-hero">
          <div className="grid-texture projects-hero-grid" />
          <div className="container domain-detail-layout">
            <Reveal className="domain-detail-copy">
              <Link className="domain-back-link" href={isEnglish ? "/en/projects" : "/projects"}>
                {isEnglish ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
                {text.back}
              </Link>
              <span className="eyebrow">{category.label[locale]}</span>
              <h1>{category.title[locale]}</h1>
              <p>{category.summary[locale]}</p>
              <span className="domain-detail-disclaimer">{text.transparency}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <CategoryArtwork category={category} locale={locale} />
            </Reveal>
          </div>
        </section>

        <section className="domain-capabilities-section">
          <div className="container domain-capabilities-layout">
            <Reveal className="domain-capabilities-heading">
              <span className="eyebrow">{text.focus}</span>
              <h2>{text.capabilities}</h2>
            </Reveal>
            <Reveal className="domain-capability-list" delay={0.08}>
              {category.capabilities[locale].map((capability, index) => (
                <div className="domain-capability-row" key={capability}>
                  <span>0{index + 1}</span>
                  <strong>{capability}</strong>
                  <Icon size={17} strokeWidth={1.4} />
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="domain-contact-section">
          <DigitalConnectionNetwork />
          <div className="container domain-contact-inner">
            <Reveal>
              <span className="eyebrow">{isEnglish ? "Start a conversation" : "تواصل مع سهم"}</span>
              <h2>{text.contact}</h2>
              <p>{text.contactLead}</p>
              <a href="mailto:info@sahm.ly" className="domain-contact-email">
                info@sahm.ly
              </a>
            </Reveal>
            <Reveal delay={0.08}>
              <ProjectInquiryForm locale={locale} />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} currentPage="solutions" projectCategory={slug} />
    </div>
  );
}

export function projectCategorySlugs() {
  return categories.map((category) => category.slug);
}

export function projectCategoryMetadata(locale: Locale, slug: string) {
  const category = categories.find((item) => item.slug === slug);
  if (!category) return { title: pageCopy[locale].notFound };
  return {
    title: `${category.title[locale]} | ${locale === "en" ? "SAHM Digital Transformation" : "سهم للتحول الرقمي"}`,
    description: category.summary[locale],
    alternates: {
      canonical: `${locale === "en" ? "/en" : ""}/projects/${slug}`,
      languages: {
        ar: `/projects/${slug}`,
        en: `/en/projects/${slug}`,
      },
    },
    openGraph: {
      title: category.title[locale],
      description: category.summary[locale],
      locale: locale === "en" ? "en" : "ar",
      type: "website",
    },
  };
}
