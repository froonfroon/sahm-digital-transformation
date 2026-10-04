import {
  Activity,
  ArrowDownRight,
  ArrowDownLeft,
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  ArrowUpRight,
  BarChart3,
  BellRing,
  Blocks,
  Check,
  Compass,
  Database,
  Fingerprint,
  Gauge,
  Layers3,
  Mail,
  Map,
  Network,
  Phone,
  Radar,
  ShieldCheck,
  ShieldPlus,
  Waves,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { ProjectInquiryForm } from "./project-inquiry-form";
import { DigitalConnectionNetwork } from "./digital-connection-network";
import { DigitalGlobeSystem } from "./digital-globe-system";
import { Reveal } from "./reveal";

type Locale = "ar" | "en";

const content = {
  ar: {
    heroEyebrow: "شركة سهم التحول الرقمي",
    heroTitle: ["نحوّل أعمالك", "إلى أنظمة رقمية", "متكاملة."],
    heroDescription:
      "استشارات تقنية وأمن سيبراني وبناء للأنظمة والبرمجيات، مع منصة ذكاء هندسي متخصصة للحقول النفطية.",
    start: "تواصلوا معنا",
    explore: "اكتشفوا خدماتنا",
    aboutEyebrow: "من نحن",
    aboutTitle: "شريككم التقني في رحلة التحول الرقمي.",
    aboutDescription:
      "سهم للتحول الرقمي للتقنية والاتصالات والبرمجيات شركة متخصصة في تقديم حلول تقنية متكاملة، تجمع بين الاستشارات التقنية والأمن السيبراني وبناء وتطوير الأنظمة والبرمجيات.",
    missionLabel: "رسالتنا",
    mission:
      "تمكين المؤسسات من تبني التحول الرقمي بثقة، عبر حلول مصممة خصيصًا لطبيعة عملها ومتطلبات أمانها وكفاءتها التشغيلية.",
    servicesEyebrow: "خدماتنا",
    servicesTitle: "حلول تقنية متكاملة لكل مراحل التحول الرقمي.",
    servicesLead: "تجمع خدماتنا بين الاستشارات التقنية والأمن السيبراني وبناء الأنظمة والبرمجيات والذكاء الهندسي المتخصص للحقول النفطية.",
    ecosystemEyebrow: "منظومة سهم الرقمية",
    ecosystemTitle: "تقنية مترابطة، من الفكرة إلى البنية التحتية.",
    ecosystemLead: "نربط الخبرة والأنظمة والأمان والبيانات ضمن منظومة رقمية متكاملة تدعم نمو أعمالكم.",
    serviceNames: [
      "الاستشارات التقنية والتحول الرقمي",
      "الأمن السيبراني",
      "بناء وتطوير الأنظمة والبرمجيات",
      "منصة الذكاء الهندسي للحقول النفطية",
    ],
    processEyebrow: "طريقة العمل",
    processTitle: "خطوات واضحة من فهم الاحتياج إلى الحل.",
    processLead: "مسار عملي يساعد على ربط أهداف العمل بالحل التقني المناسب، مع مراعاة الأنظمة القائمة ومتطلبات الأمان.",
    processSteps: [
      { title: "فهم الاحتياج", description: "نحدد أهداف العمل والتحديات والقيود التقنية القائمة." },
      { title: "تحديد المسار", description: "نحوّل المتطلبات إلى نطاق واضح وأولويات وخطة تقنية." },
      { title: "التصميم والبناء", description: "نطوّر الحل ونراعي التكامل مع بيئة العمل الحالية." },
      { title: "المراجعة والتسليم", description: "نراجع متطلبات الوظائف والأمان قبل تسليم الحل." },
    ],
    serviceDescriptions: [
      "تقييم الواقع التقني للمؤسسة وتصميم خارطة طريق للتحول الرقمي تتناسب مع أهدافها.",
      "حماية الأنظمة والبيانات من التهديدات السيبرانية عبر ممارسات أمان مدروسة من التصميم.",
      "تصميم وتطوير أنظمة وبرمجيات مخصصة تلبي احتياجات العمل الفعلية وتتكامل مع البنية القائمة.",
      "منصة متخصصة تجمع بين هندسة المكامن وتحليل البيانات والذكاء الاصطناعي لدعم تشغيل الحقول النفطية بكفاءة وأمان أعلى.",
    ],
    servicePillars: [
      ["تقييم الواقع", "الاستراتيجية", "خارطة الطريق", "التحول"],
      ["المعمارية", "الأنظمة", "البيانات", "الثقة"],
      ["متطلبات العمل", "هندسة البرمجيات", "التكامل", "القابلية للتوسع"],
      ["هندسة المكامن", "تحليل البيانات", "الذكاء الاصطناعي", "المراقبة", "الإنذار المبكر", "دعم القرار"],
    ],
    serviceLabels: ["01 · استشارات وتحول", "02 · أمن سيبراني", "03 · أنظمة وبرمجيات", "04 · حل هندسي متخصص"],
    whyEyebrow: "لماذا نحن · مميزاتنا",
    whyTitle: "حلول مدروسة لاحتياجات تقنية معقدة.",
    strengths: [
      {
        title: "حلول تبدأ من احتياج العمل",
        description: "تُبنى الحلول حول متطلبات المؤسسة وأهدافها بدل فرض منتج جاهز لا يلائمها.",
      },
      {
        title: "الأمان حاضر منذ التصميم",
        description: "تؤخذ متطلبات حماية الأنظمة والبيانات في الحسبان عند تصميم الحل.",
      },
      {
        title: "تكامل مع الأنظمة القائمة",
        description: "تراعي الحلول البنية التقنية الحالية واحتياجات الربط مع الأنظمة ذات الصلة.",
      },
      {
        title: "بيانات تدعم القرار",
        description: "تُستخدم تحليلات البيانات والذكاء الهندسي لدعم فهم العمليات واتخاذ القرار.",
      },
    ],
    contactEyebrow: "تواصلوا معنا",
    contactTitle: "لنبدأ حوارًا حول احتياجاتكم التقنية.",
    contactLead: "نسعد بتواصلكم معنا.",
    emailLabel: "البريد الإلكتروني",
    phoneLabel: "الهاتف",
    directorLabel: "المدير التنفيذي",
    cta: "راسلونا",
    callCta: "اتصل الآن",
    visualStages: ["تقييم", "استراتيجية", "خارطة طريق", "تحول"],
    visualSecurity: ["التطبيقات", "الأنظمة", "البيانات", "الوصول"],
    visualEngineering: ["المتطلبات", "التصميم", "التطوير", "التكامل"],
    visualCaptions: ["التقييم → خارطة الطريق", "أمان من التصميم", "متطلبات · هندسة · تكامل", "هندسة المكامن · الحقول النفطية", "بيانات · ذكاء اصطناعي", "مراقبة · إنذار مبكر · دعم القرار"],
  },
  en: {
    heroEyebrow: "SAHM Digital Transformation",
    heroTitle: ["We build digital", "systems that move", "businesses forward."],
    heroDescription:
      "Technology consulting, cybersecurity, systems and software development, and a specialized engineering intelligence platform for oil fields.",
    start: "Talk to our team",
    explore: "Explore our services",
    aboutEyebrow: "About SAHM",
    aboutTitle: "Your technology partner on the digital transformation journey.",
    aboutDescription:
      "SAHM for Technology, Communications and Software specializes in integrated technology solutions, bringing together technology consulting, cybersecurity, and the development of systems and software.",
    missionLabel: "Our mission",
    mission:
      "To empower organizations to adopt digital transformation with confidence through solutions tailored to their operations, security requirements, and operational efficiency.",
    servicesEyebrow: "Our services",
    servicesTitle: "Integrated technology solutions for every stage of digital transformation.",
    servicesLead:
      "Our services bring together technology consulting, cybersecurity, systems and software, and specialized engineering intelligence for oil fields.",
    ecosystemEyebrow: "The SAHM digital ecosystem",
    ecosystemTitle: "Connected technology, from strategy to infrastructure.",
    ecosystemLead: "We bring expertise, systems, security, and data together in an integrated digital ecosystem built to support business growth.",
    serviceNames: [
      "Technology Consulting & Digital Transformation",
      "Cybersecurity",
      "Systems & Software Development",
      "Engineering Intelligence Platform for Oil Fields",
    ],
    processEyebrow: "How we work",
    processTitle: "A clear path from business need to technical solution.",
    processLead: "A practical engagement framework connecting business goals with the right technology, while accounting for existing systems and security needs.",
    processSteps: [
      { title: "Understand", description: "Clarify business goals, challenges, and current technical constraints." },
      { title: "Define the path", description: "Turn requirements into a clear scope, priorities, and technical plan." },
      { title: "Design & build", description: "Develop the solution with integration into the current environment in mind." },
      { title: "Review & hand over", description: "Review functional and security requirements before handover." },
    ],
    serviceDescriptions: [
      "Assessing an organization’s technology landscape and designing a digital transformation roadmap aligned with its objectives.",
      "Protecting systems and data from cyber threats through security practices considered from the design stage.",
      "Designing and developing custom systems and software that meet real business needs and integrate with existing infrastructure.",
      "A specialized platform combining reservoir engineering, data analytics, and artificial intelligence to support more efficient and safer oil-field operations.",
    ],
    servicePillars: [
      ["Assessment", "Strategy", "Roadmap", "Transformation"],
      ["Architecture", "Systems", "Data", "Trust"],
      ["Business needs", "Software engineering", "Integration", "Scalability"],
      ["Reservoir engineering", "Data analytics", "Artificial intelligence", "Monitoring", "Early warning", "Decision support"],
    ],
    serviceLabels: ["01 · Consulting & transformation", "02 · Cybersecurity", "03 · Systems & software", "04 · Specialized engineering"],
    whyEyebrow: "Why SAHM · Our strengths",
    whyTitle: "Considered solutions for complex technology needs.",
    strengths: [
      {
        title: "Solutions shaped around business needs",
        description: "Solutions are designed around organizational requirements and goals rather than a one-size-fits-all product.",
      },
      {
        title: "Security considered from design",
        description: "System and data protection requirements are considered while the solution is being designed.",
      },
      {
        title: "Integration with existing systems",
        description: "Solutions account for the current technology environment and relevant integration needs.",
      },
      {
        title: "Data-informed decisions",
        description: "Data analysis and engineering intelligence can support operational understanding and decision-making.",
      },
    ],
    contactEyebrow: "Contact",
    contactTitle: "Let’s discuss your technology needs.",
    contactLead: "We look forward to hearing from you.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    directorLabel: "Executive Director",
    cta: "Email our team",
    callCta: "Call now",
    visualStages: ["Assess", "Strategy", "Roadmap", "Transform"],
    visualSecurity: ["Applications", "Systems", "Data", "Access"],
    visualEngineering: ["Requirements", "Design", "Development", "Integration"],
    visualCaptions: ["Assessment → Roadmap", "Security by design", "Requirements · Engineering · Integration", "Reservoir engineering · Oil fields", "Data · Artificial intelligence", "Monitoring · Early warning · Decision support"],
  },
} satisfies Record<Locale, Record<string, unknown>>;

type PageContent = (typeof content)[Locale];

function ConsultingVisual({ labels, caption }: { labels: string[]; caption: string }) {
  const icons = [Radar, Compass, Map, ArrowUpLeft];
  return (
    <div className="service-visual consulting-visual" aria-hidden="true">
      <div className="visual-index">01 / 04</div>
      <div className="consulting-path">
        {labels.map((label, index) => {
          const Icon = icons[index];
          return (
            <div className="consulting-step" key={label}>
              <span className="consulting-node"><Icon size={17} strokeWidth={1.5} /></span>
              <span className="consulting-step-label">{label}</span>
              {index < labels.length - 1 && <span className="consulting-connector" />}
            </div>
          );
        })}
      </div>
      <div className="consulting-coordinate">{caption}</div>
    </div>
  );
}

function SecurityVisual({ labels, caption }: { labels: string[]; caption: string }) {
  const icons = [ShieldCheck, Layers3, Database, Fingerprint];
  return (
    <div className="service-visual security-visual" aria-hidden="true">
      <div className="visual-index">02 / 04</div>
      <div className="security-core">
        <ShieldPlus size={28} strokeWidth={1.25} />
        <span>{caption}</span>
      </div>
      <div className="security-orbit security-orbit-one" />
      <div className="security-orbit security-orbit-two" />
      {labels.map((label, index) => {
        const Icon = icons[index];
        return (
          <div key={label} className={`security-label security-label-${index + 1}`}>
            <Icon size={14} strokeWidth={1.5} />
            <span>{label}</span>
          </div>
        );
      })}
      <div className="security-scan" />
    </div>
  );
}

function EngineeringVisual({ labels, caption }: { labels: string[]; caption: string }) {
  const icons = [Workflow, Blocks, Network, Gauge];
  return (
    <div className="service-visual engineering-visual" aria-hidden="true">
      <div className="visual-index">03 / 04</div>
      <div className="engineering-stack">
        {labels.map((label, index) => {
          const Icon = icons[index];
          return (
            <div key={label} className={`engineering-layer engineering-layer-${index + 1}`}>
              <span className="engineering-layer-index">0{index + 1}</span>
              <Icon size={16} strokeWidth={1.5} />
              <span>{label}</span>
              {index < labels.length - 1 && <span className="engineering-link" />}
            </div>
          );
        })}
      </div>
      <div className="engineering-footnote">{caption}</div>
    </div>
  );
}

function OilFieldVisual({ labels, captions }: { labels: string[]; captions: string[] }) {
  const icons = [Waves, BarChart3, Activity, Radar, BellRing, Compass];
  return (
    <div className="service-visual oil-visual" aria-hidden="true">
      <div className="oil-visual-header">
        <span className="visual-index">04 / 04</span>
        <span className="oil-live">{captions[0]}</span>
      </div>
      <div className="oil-field-grid">
        <div className="oil-well-panel">
          <svg viewBox="0 0 300 180" fill="none" role="presentation">
            <path d="M0 54C38 47 58 64 94 57C129 50 150 34 186 40C227 47 251 73 300 63" stroke="rgba(111,166,238,.45)" strokeWidth="1" />
            <path d="M0 78C34 72 61 87 96 78C135 68 150 55 186 63C223 72 258 93 300 84" stroke="rgba(111,166,238,.27)" strokeWidth="1" />
            <path d="M0 104C37 96 61 111 96 101C133 91 153 81 188 88C222 95 257 120 300 111" stroke="rgba(111,166,238,.22)" strokeWidth="1" />
            <path d="M151 10V117C151 132 139 137 139 151V177M151 116C151 132 164 139 164 151V177" stroke="#82b8ef" strokeWidth="1.4" />
            <path d="M143 24H160M143 31H160M143 38H160" stroke="rgba(143,192,255,.65)" strokeWidth="1" />
            <circle cx="151" cy="102" r="5" fill="#64c3d5" fillOpacity=".75" />
            <circle cx="151" cy="102" r="12" stroke="#64c3d5" strokeOpacity=".27" />
            <path d="M30 157C64 144 90 164 121 150M181 153C222 139 246 160 278 146" stroke="rgba(100,195,213,.46)" strokeWidth="1" />
          </svg>
          <span className="oil-panel-caption">{captions[1]}</span>
        </div>
        <div className="oil-capabilities">
          {labels.map((label, index) => {
            const Icon = icons[index];
            return (
              <div className="oil-capability" key={label}>
                <span className="oil-capability-icon"><Icon size={14} strokeWidth={1.5} /></span>
                <span>{label}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="oil-visual-footer">
        <span>{captions[1]}</span>
        <span className="oil-footer-line" />
        <span>{captions[2]}</span>
      </div>
    </div>
  );
}

function ServiceVisual({
  index,
  labels,
  captions,
}: {
  index: number;
  labels: string[];
  captions: string[];
}) {
  if (index === 0) return <ConsultingVisual labels={labels} caption={captions[0]} />;
  if (index === 1) return <SecurityVisual labels={labels} caption={captions[1]} />;
  if (index === 2) return <EngineeringVisual labels={labels} caption={captions[2]} />;
  return <OilFieldVisual labels={labels} captions={captions.slice(3)} />;
}

function ServiceSection({
  number,
  title,
  description,
  labels,
  badge,
  locale,
  captions,
  featured = false,
  categorySlug,
}: {
  number: string;
  title: string;
  description: string;
  labels: string[];
  badge: string;
  locale: Locale;
  captions: string[];
  featured?: boolean;
  categorySlug: string;
}) {
  const isEnglish = locale === "en";
  const index = Number(number) - 1;
  return (
    <section
      id={index === 0 ? "service-consulting" : index === 1 ? "service-cybersecurity" : index === 2 ? "service-software" : "service-oilfield"}
      data-sahm-scene={index === 1 ? "05" : index === 3 ? "06" : undefined}
      className={`official-service ${featured ? "official-service--oilfield" : ""}`}
    >
      <div className="container">
        <div className={`official-service-layout ${index % 2 === 1 ? "official-service-layout--reverse" : ""}`}>
          <Reveal className="official-service-copy">
            <div className="official-service-meta">
              <span>{number} / 04</span>
              <span className="official-service-badge">{badge}</span>
            </div>
            <h3 className="official-service-title">{title}</h3>
            <p className="official-service-description">{description}</p>
            <ul className="official-service-pillars">
              {labels.map((label) => (
                <li key={label}><span />{label}</li>
              ))}
            </ul>
            {index === 3 && (
              <p className="oilfield-official-note">
                {isEnglish
                  ? "A specialized engineering intelligence platform for oil-field operations."
                  : "منصة ذكاء هندسي متخصصة لدعم تشغيل الحقول النفطية."}
              </p>
            )}
            <Link
              className="official-service-project-link"
              href={`${isEnglish ? "/en" : ""}/projects/${categorySlug}`}
            >
              {isEnglish ? "Explore this capability" : "استكشف مجال الحل"}
              {isEnglish ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
            </Link>
          </Reveal>
          <Reveal className="official-service-art" delay={0.08}>
            <ServiceVisual index={index} labels={labels} captions={captions} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactDetails({ locale, text }: { locale: Locale; text: PageContent }) {
  const isEnglish = locale === "en";
  return (
    <div className="contact-details">
      <a className="contact-detail" href="mailto:info@sahm.ly">
        <span className="contact-detail-icon"><Mail size={17} /></span>
        <span className="contact-detail-text"><small>{text.emailLabel}</small><strong>info@sahm.ly</strong></span>
        {isEnglish ? <ArrowUpRight size={15} /> : <ArrowUpLeft size={15} />}
      </a>
      <a className="contact-detail" href="tel:0914778779" dir="ltr">
        <span className="contact-detail-icon"><Phone size={17} /></span>
        <span className="contact-detail-text" dir={isEnglish ? "ltr" : "rtl"}><small>{text.phoneLabel}</small><strong>0914778779</strong></span>
        {isEnglish ? <ArrowUpRight size={15} /> : <ArrowUpLeft size={15} />}
      </a>
      <div className="contact-detail contact-detail--director">
        <span className="contact-detail-icon"><Fingerprint size={17} /></span>
        <span className="contact-detail-text"><small>{text.directorLabel}</small><strong dir="rtl">ولاء الافرك</strong></span>
      </div>
    </div>
  );
}

export function CorporateHome({ locale }: { locale: Locale }) {
  const text = content[locale] as PageContent;
  const isEnglish = locale === "en";
  const serviceNames = text.serviceNames as string[];
  const serviceDescriptions = text.serviceDescriptions as string[];
  const servicePillars = text.servicePillars as string[][];
  const serviceLabels = text.serviceLabels as string[];
  const strengths = text.strengths as { title: string; description: string }[];
  const visualCaptions = text.visualCaptions as string[];
  const processSteps = text.processSteps as { title: string; description: string }[];

  return (
    <div lang={locale} dir={isEnglish ? "ltr" : "rtl"} className={`corporate-site ${isEnglish ? "corporate-site--en" : "corporate-site--ar"}`}>
      <a className="skip-link" href="#main-content">
        {isEnglish ? "Skip to main content" : "تجاوز إلى المحتوى الرئيسي"}
      </a>
      <SiteHeader locale={locale} />
      <main id="main-content" tabIndex={-1} data-sahm-story>
        <section id="home" className="corporate-hero" data-sahm-scene="01">
          <div className="grid-texture corporate-hero-grid" />
          <div className="container corporate-hero-layout">
            <Reveal className="corporate-hero-copy">
              <span className="corporate-kicker"><i />{text.heroEyebrow}</span>
              <h1 className="corporate-hero-title">
                {(text.heroTitle as string[]).map((line, index) => (
                  <span key={line} className={index === 2 ? "corporate-hero-title-accent" : ""}>{line}</span>
                ))}
              </h1>
              <p className="corporate-hero-description">{text.heroDescription as string}</p>
              <div className="corporate-hero-actions">
                <Link href="#contact" className="sahm-button corporate-primary-button">
                  {text.start as string}
                  {isEnglish ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
                </Link>
                <Link href="#services" className="corporate-text-button">
                  {text.explore as string}
                  {isEnglish ? <ArrowDownRight size={15} /> : <ArrowDownLeft size={15} />}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="about" className="corporate-about section-space" data-sahm-scene="02">
          <div className="container corporate-about-layout">
            <Reveal className="corporate-about-heading">
              <span className="eyebrow">{text.aboutEyebrow as string}</span>
              <h2>{text.aboutTitle as string}</h2>
            </Reveal>
            <Reveal className="corporate-about-copy" delay={0.08}>
              <p>{text.aboutDescription as string}</p>
              <div className="corporate-mission">
                <span className="mission-label"><i />{text.missionLabel as string}</span>
                <p>{text.mission as string}</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="services" className="official-services">
          <div className="service-ecosystem" data-sahm-scene="03">
            <div className="container">
              <Reveal className="service-ecosystem-heading">
                <span className="eyebrow">{text.ecosystemEyebrow as string}</span>
                <h2>{text.ecosystemTitle as string}</h2>
                <p>{text.ecosystemLead as string}</p>
              </Reveal>
              <div className="service-ecosystem-layout">
                <Reveal className="service-ecosystem-visual">
                  <DigitalGlobeSystem />
                </Reveal>
                <ol className="service-ecosystem-list" aria-label={isEnglish ? "SAHM services" : "خدمات سهم"}>
                  {serviceNames.map((title, index) => (
                    <li key={title} className="service-ecosystem-item" style={{ animationDelay: `${index * 90}ms` }}>
                      <span className="service-ecosystem-number" aria-hidden="true">{index + 1}</span>
                      <a className="service-ecosystem-card" href={`#service-${["consulting", "cybersecurity", "software", "oilfield"][index]}`}>
                        <span className="service-ecosystem-card-label">{serviceLabels[index].replace(/^\d+\s*[·.]\s*/, "")}</span>
                        <strong>{title}</strong>
                        <span className="service-ecosystem-card-description">{serviceDescriptions[index]}</span>
                        {isEnglish ? <ArrowUpRight size={16} aria-hidden="true" /> : <ArrowUpLeft size={16} aria-hidden="true" />}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          <div className="container official-services-heading" data-sahm-scene="04">
            <Reveal>
              <span className="eyebrow">{text.servicesEyebrow as string}</span>
              <h2>{text.servicesTitle as string}</h2>
              <p>{text.servicesLead as string}</p>
            </Reveal>
          </div>
          {serviceNames.map((title, index) => (
            <ServiceSection
              key={title}
              number={`0${index + 1}`}
              title={title}
              description={serviceDescriptions[index]}
              labels={servicePillars[index]}
              badge={serviceLabels[index]}
              locale={locale}
              captions={visualCaptions}
              featured={index === 3}
              categorySlug={["digital-transformation", "cybersecurity", "business-systems", "oilfield-intelligence"][index]}
            />
          ))}
        </section>

        <section id="how-we-work" className="corporate-process section-space">
          <div className="container">
            <Reveal className="corporate-process-heading">
              <span className="eyebrow">{text.processEyebrow as string}</span>
              <h2>{text.processTitle as string}</h2>
              <p>{text.processLead as string}</p>
            </Reveal>
            <ol className="corporate-process-steps">
              {processSteps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.04}>
                  <li className="corporate-process-step">
                    <span className="corporate-process-index">0{index + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section id="why-sahm" className="corporate-why section-space" data-sahm-scene="07">
          <div className="container">
            <Reveal className="corporate-why-heading">
              <span className="eyebrow">{text.whyEyebrow as string}</span>
              <h2>{text.whyTitle as string}</h2>
            </Reveal>
            <div className="strength-grid">
              {strengths.map((strength, index) => (
                <Reveal key={strength.title} delay={index * 0.045}>
                  <article className="strength-item">
                    <span className="strength-index">0{index + 1}</span>
                    <span className="strength-mark"><Check size={15} /></span>
                    <h3>{strength.title}</h3>
                    <p>{strength.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="corporate-contact section-space" data-sahm-scene="08">
          <DigitalConnectionNetwork />
          <div className="container corporate-contact-layout">
            <Reveal className="corporate-contact-copy">
              <span className="eyebrow">{text.contactEyebrow as string}</span>
              <h2>{text.contactTitle as string}</h2>
              <p>{text.contactLead as string}</p>
              <div className="corporate-contact-actions">
                <a className="sahm-button corporate-contact-cta" href="mailto:info@sahm.ly">
                  {text.cta as string}
                  {isEnglish ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
                </a>
                <a className="corporate-contact-call" href="tel:0914778779">
                  <Phone size={15} />
                  {text.callCta as string}
                </a>
              </div>
            </Reveal>
            <div className="corporate-contact-form-column">
              <Reveal delay={0.08}>
                <ProjectInquiryForm locale={locale} />
              </Reveal>
              <Reveal delay={0.12}>
                <ContactDetails locale={locale} text={text} />
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
