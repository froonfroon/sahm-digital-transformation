export type WorkLocale = "ar" | "en";

export type WorkCategory = "cybersecurity" | "systems" | "applications" | "commerce" | "education" | "websites";

export type WorkImage = {
  src: string;
  alt: Record<WorkLocale, string>;
};

export type WorkProject = {
  slug: string;
  category: WorkCategory;
  featured: boolean;
  ownership: "sahm" | "source";
  status?: "in-development";
  title: Record<WorkLocale, string>;
  summary: Record<WorkLocale, string>;
  images: WorkImage[];
};

export const workCategoryLabels: Record<WorkLocale, Record<WorkCategory | "all", string>> = {
  ar: {
    all: "كل الأعمال",
    cybersecurity: "الأمن السيبراني",
    systems: "الأنظمة",
    applications: "التطبيقات",
    commerce: "التجارة",
    education: "التعليم",
    websites: "المواقع والمنصات",
  },
  en: {
    all: "All work",
    cybersecurity: "Cybersecurity",
    systems: "Business systems",
    applications: "Applications",
    commerce: "Commerce",
    education: "Education",
    websites: "Websites & platforms",
  },
};

export const workProjects: WorkProject[] = [
  {
    slug: "queen-security",
    category: "cybersecurity",
    featured: true,
    ownership: "sahm",
    status: "in-development",
    title: { ar: "Queen Security | منصة الأمن السيبراني", en: "Queen Security cybersecurity platform" },
    summary: {
      ar: "مشروع خاص بسهم قيد التطوير. تعرض الواجهة لوحة تحكم لمتابعة الحوادث والتنبيهات والأصول والحالة الأمنية.",
      en: "A SAHM-owned project in development. Its dashboard interface presents incidents, alerts, assets, and an overall security status.",
    },
    images: [
      {
        src: "/work/queen-security-dashboard.png",
        alt: {
          ar: "لوحة تحكم Queen Security لمتابعة الحوادث والتنبيهات والحالة الأمنية",
          en: "Queen Security dashboard for incidents, alerts, and security status",
        },
      },
    ],
  },
  {
    slug: "solve-erp",
    category: "systems",
    featured: true,
    ownership: "source",
    title: { ar: "نظام ERP متكامل لإدارة الشركات (SOLVE ERP)", en: "SOLVE ERP business management system" },
    summary: { ar: "نظام إداري ولوحة تحكم.", en: "An administrative system and management dashboard." },
    images: [
      {
        src: "/work/erp_dashboard-CnZuapi6.png",
        alt: { ar: "لوحة تحكم نظام SOLVE ERP", en: "SOLVE ERP management dashboard" },
      },
      {
        src: "/work/Screenshot_2026-03-27_145121_aa7e3349e2998900-BivjDvnk.png",
        alt: { ar: "واجهة إضافية لنظام ERP", en: "Additional SOLVE ERP interface" },
      },
    ],
  },
  {
    slug: "nile-bank-mobile",
    category: "applications",
    featured: true,
    ownership: "source",
    title: { ar: "تطبيق مصرفي آمن للهواتف الذكية (بنك النيل)", en: "Nile Bank mobile banking app" },
    summary: { ar: "تطبيق مصرفي آمن للهواتف الذكية.", en: "A secure mobile banking application." },
    images: [
      {
        src: "/work/mobile_banking-BzQdx8Ha.png",
        alt: { ar: "واجهة التطبيق المصرفي لبنك النيل", en: "Nile Bank mobile banking interface" },
      },
      {
        src: "/work/Screenshot_2026-04-11_154012_c205ce93bb27f1c0-3pBWFsfg.png",
        alt: { ar: "شاشة إضافية من تطبيق بنك النيل", en: "Additional screen from the Nile Bank app" },
      },
    ],
  },
  {
    slug: "al-saada-plastics-erp",
    category: "systems",
    featured: true,
    ownership: "source",
    title: { ar: "نظام ERP متكامل لمصانع البلاستيك (شركة السعادة)", en: "Al-Saada plastic factory ERP system" },
    summary: { ar: "نظام ERP صناعي شامل لإدارة الإنتاج والمخزون.", en: "An industrial ERP system for production and inventory management." },
    images: [
      {
        src: "/work/2026-04-12__15__43a3d2e6a2002b03-CJNdB8Ok.png",
        alt: { ar: "واجهة نظام ERP لمصانع البلاستيك", en: "Plastic factory ERP interface" },
      },
      {
        src: "/work/2026-04-12__13__b9686bb8350c723f-CBa_jSM4.png",
        alt: { ar: "شاشة إضافية لنظام مصنع السعادة", en: "Additional screen from the Al-Saada factory system" },
      },
      {
        src: "/work/plastic_pro_dashboard-Y3CWQJ8W.png",
        alt: { ar: "لوحة تحكم نظام المصنع", en: "Factory management dashboard" },
      },
    ],
  },
  {
    slug: "cooperative-pos",
    category: "systems",
    featured: true,
    ownership: "source",
    title: { ar: "نظام الجمعية التعاونية ونقاط البيع POS", en: "Cooperative society and POS system" },
    summary: { ar: "نظام نقاط البيع وإدارة الفواتير والمخازن.", en: "A point-of-sale system for invoices and inventory." },
    images: [
      {
        src: "/work/Screenshot_2026-03-27_145032_cd22c6ae46a3ee16-BPMEyI6V.png",
        alt: { ar: "واجهة نظام الجمعية التعاونية ونقاط البيع", en: "Cooperative society point-of-sale interface" },
      },
      {
        src: "/work/Screenshot_2026-03-27_145054_206e4f5db2cbb354-Dhf7HYzh.png",
        alt: { ar: "شاشة إضافية لنظام نقاط البيع", en: "Additional point-of-sale system screen" },
      },
    ],
  },
  {
    slug: "factory-machine-dashboard",
    category: "systems",
    featured: true,
    ownership: "source",
    title: { ar: "بوابة لوحة تحكم الماكينات والموظفين للمصانع", en: "Factory machinery and workforce dashboard" },
    summary: { ar: "لوحة تحكم لإدارة كفاءة المكائن وحضور مشغلي خطوط الإنتاج.", en: "A dashboard for machinery efficiency and production-line operator attendance." },
    images: [
      {
        src: "/work/Screenshot_2026-03-27_023655_658fb26bcfe5d562-B0hON29J.png",
        alt: { ar: "لوحة تحكم الماكينات والموظفين", en: "Machinery and workforce dashboard" },
      },
      {
        src: "/work/2026-04-12__16__-_Copy_7f86898de88c8290-BSiZQYTa.png",
        alt: { ar: "واجهة إضافية لنظام متابعة المصنع", en: "Additional factory monitoring interface" },
      },
      {
        src: "/work/2026-04-12__17__13a39acf54d23b0e-D7bzc7Et.png",
        alt: { ar: "شاشة إضافية لإدارة الإنتاج", en: "Additional production management screen" },
      },
    ],
  },
  {
    slug: "al-sairafi-pos",
    category: "systems",
    featured: true,
    ownership: "source",
    title: { ar: "نظام الصيرفي للمبيعات ونقاط البيع POS", en: "Al-Sairafi sales and POS system" },
    summary: { ar: "لوحة تحكم متطورة للمبيعات والخزينة والمخزن.", en: "A dashboard for sales, cash management, and inventory." },
    images: [
      {
        src: "/work/sales_system_dashboard-B24HZU43.png",
        alt: { ar: "لوحة تحكم نظام الصيرفي للمبيعات", en: "Al-Sairafi sales system dashboard" },
      },
    ],
  },
  {
    slug: "ahl-al-bait-retail",
    category: "commerce",
    featured: false,
    ownership: "source",
    title: { ar: "نظام أهل البيت لإدارة محلات الخضار والفاكهة", en: "Ahl Al-Bait produce shop system" },
    summary: { ar: "نظام نقاط بيع للوزن والربط المباشر بميزان الكاشير الذكي.", en: "A point-of-sale system with weighing and smart checkout scale integration." },
    images: [
      {
        src: "/work/veg_system_dashboard-B6j6HKBa.png",
        alt: { ar: "لوحة تحكم نظام أهل البيت لإدارة المتجر", en: "Ahl Al-Bait shop management dashboard" },
      },
    ],
  },
  {
    slug: "sharkgroup-store",
    category: "commerce",
    featured: false,
    ownership: "source",
    title: { ar: "متجر شارك جروب الإلكتروني المتكامل (SharkGroup)", en: "SharkGroup e-commerce store" },
    summary: { ar: "متجر تجارة إلكترونية متكامل وذكي للشركات.", en: "An e-commerce storefront for businesses." },
    images: [
      {
        src: "/work/sharkgroup_site-DfkC9s7k.png",
        alt: { ar: "واجهة متجر شارك جروب الإلكتروني", en: "SharkGroup e-commerce storefront" },
      },
    ],
  },
  {
    slug: "wefaq-lms",
    category: "education",
    featured: false,
    ownership: "source",
    title: { ar: "منصة إدارة التعليم LMS (أكاديمية وفاق)", en: "Wefaq Academy learning management system" },
    summary: { ar: "نظام لإدارة التعلم وتدريب الطلاب والمعلمين.", en: "A learning management system for students and teachers." },
    images: [
      {
        src: "/work/Screenshot_2026-03-27_145656_de7d58a0e07870c1-DxrCGS8f.png",
        alt: { ar: "واجهة منصة إدارة التعليم لأكاديمية وفاق", en: "Wefaq Academy learning management interface" },
      },
    ],
  },
  {
    slug: "sales-invoice-erp",
    category: "systems",
    featured: false,
    ownership: "source",
    title: { ar: "نظام إدارة فواتير المبيعات المالي ERP", en: "Sales invoicing and financial ERP system" },
    summary: { ar: "نظام لإصدار الفواتير والتحليلات المالية للمبيعات.", en: "A system for sales invoicing and financial analytics." },
    images: [
      {
        src: "/work/Screenshot_2026-03-27_145121_aa7e3349e2998900-BivjDvnk.png",
        alt: { ar: "واجهة نظام الفواتير والتحليلات المالية", en: "Sales invoicing and financial analytics interface" },
      },
    ],
  },
  {
    slug: "abu-samra-coffee",
    category: "commerce",
    featured: false,
    ownership: "source",
    title: { ar: "موقع قهوة أبو سمراء الفاخرة", en: "Abu Samra premium coffee website" },
    summary: { ar: "موقع تعريفي وتجاري لطلب البن والقهوة.", en: "A brand and online ordering website for coffee." },
    images: [
      {
        src: "/work/Screenshot_2026-03-27_145912_3a4c2be44bd7053b-Df6TQW-a.png",
        alt: { ar: "واجهة موقع قهوة أبو سمراء", en: "Abu Samra coffee website" },
      },
    ],
  },
  {
    slug: "profsser-platform",
    category: "education",
    featured: false,
    ownership: "source",
    title: { ar: "موقع بروفيسور التعليمي المتكامل (Profsser.com)", en: "Profsser educational platform" },
    summary: { ar: "منصة تعليمية للطلاب والدروس والدورات.", en: "An educational platform for students, lessons, and courses." },
    images: [
      {
        src: "/work/profsser_site-CcIZkdwV.png",
        alt: { ar: "واجهة موقع بروفيسور التعليمي", en: "Profsser educational website" },
      },
    ],
  },
  {
    slug: "halloreisen-booking",
    category: "websites",
    featured: false,
    ownership: "source",
    title: { ar: "موقع هالو رايزن للسياحة والسفر (HalloReisen)", en: "HalloReisen travel and tourism website" },
    summary: { ar: "منصة لحجز الرحلات السياحية والفنادق.", en: "A platform for booking tours and hotels." },
    images: [
      {
        src: "/work/halloreisen_site-BhKy6_Ft.png",
        alt: { ar: "واجهة موقع هالو رايزن", en: "HalloReisen website" },
      },
    ],
  },
  {
    slug: "kayhold-agency",
    category: "websites",
    featured: false,
    ownership: "source",
    title: { ar: "موقع وكالة كيهولد للتسويق الرقمي (Kayhold)", en: "Kayhold digital marketing agency website" },
    summary: { ar: "موقع أعمال لوكالة خدمات تسويقية.", en: "A business website for a marketing services agency." },
    images: [
      {
        src: "/work/kayhold_site-ClMrdVtL.png",
        alt: { ar: "واجهة موقع وكالة كيهولد", en: "Kayhold agency website" },
      },
    ],
  },
  {
    slug: "al-shorouk-shopping-app",
    category: "applications",
    featured: false,
    ownership: "source",
    title: { ar: "تطبيق التسوق والسوبرماركت الذكي (سلاسل الشروق)", en: "Al-Shorouk supermarket shopping app" },
    summary: { ar: "تطبيق للتسوق وشراء المقاضي عبر الهاتف.", en: "A mobile application for grocery shopping." },
    images: [
      {
        src: "/work/Screenshot_2026-04-11_152645_bd8afe99d514da3e-dMvN2ON0.png",
        alt: { ar: "واجهة تطبيق التسوق والسوبرماركت", en: "Supermarket shopping app interface" },
      },
    ],
  },
];

export function getWorkProject(slug: string) {
  return workProjects.find((project) => project.slug === slug);
}

export function workProjectSlugs() {
  return workProjects.map(({ slug }) => slug);
}
