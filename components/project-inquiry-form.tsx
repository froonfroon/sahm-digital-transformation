"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type Locale = "ar" | "en";

type FormCopy = {
  title: string;
  name: string;
  company: string;
  email: string;
  service: string;
  servicePlaceholder: string;
  services: string[];
  details: string;
  detailsPlaceholder: string;
  submit: string;
  opening: string;
  note: string;
};

const formCopy = {
  ar: {
    title: "أخبرنا عن مشروعك",
    name: "الاسم",
    company: "الشركة (اختياري)",
    email: "البريد الإلكتروني",
    service: "الخدمة المطلوبة",
    servicePlaceholder: "اختر مجالًا",
    services: [
      "الاستشارات التقنية والتحول الرقمي",
      "الأمن السيبراني",
      "الأنظمة والبرمجيات",
      "ذكاء الحقول النفطية",
    ],
    details: "نبذة عن احتياجك",
    detailsPlaceholder: "ما التحدي أو الهدف الذي تريد العمل عليه؟",
    submit: "المتابعة عبر البريد الإلكتروني",
    opening: "جارٍ فتح تطبيق البريد الإلكتروني.",
    note: "لن يُرسل الطلب تلقائيًا؛ راجع الرسالة وأرسلها من تطبيق البريد. إذا لم يفتح التطبيق، راسلنا مباشرةً.",
  },
  en: {
    title: "Tell us about your project",
    name: "Name",
    company: "Company (optional)",
    email: "Work email",
    service: "Service of interest",
    servicePlaceholder: "Choose a solution area",
    services: [
      "Technology consulting & digital transformation",
      "Cybersecurity",
      "Systems & software",
      "Oil-field intelligence",
    ],
    details: "A short project brief",
    detailsPlaceholder: "What challenge or goal would you like to discuss?",
    submit: "Continue by email",
    opening: "Opening your email app.",
    note: "This does not send automatically; review and send the message from your email app. If it does not open, email us directly.",
  },
} satisfies Record<Locale, FormCopy>;

export function ProjectInquiryForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState("");
  const text = formCopy[locale];
  const isEnglish = locale === "en";
  const services = text.services;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();
    const subject = isEnglish ? "Project inquiry — SAHM" : "استفسار عن مشروع — سهم";
    const body = [
      `${isEnglish ? "Name" : "الاسم"}: ${name}`,
      `${isEnglish ? "Company" : "الشركة"}: ${company || (isEnglish ? "Not provided" : "لم يذكر")}`,
      `${isEnglish ? "Email" : "البريد الإلكتروني"}: ${email}`,
      `${isEnglish ? "Service" : "الخدمة"}: ${service}`,
      `${isEnglish ? "Project brief" : "نبذة عن المشروع"}:`,
      details,
    ].join("\n");

    setStatus(text.opening);
    window.location.href = `mailto:info@sahm.ly?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="project-inquiry-form" onSubmit={handleSubmit}>
      <h3>{text.title}</h3>
      <div className="project-inquiry-fields">
        <label>
          <span>{text.name}</span>
          <input name="name" autoComplete="name" required maxLength={100} />
        </label>
        <label>
          <span>{text.company}</span>
          <input name="company" autoComplete="organization" maxLength={120} />
        </label>
        <label>
          <span>{text.email}</span>
          <input name="email" type="email" dir="ltr" autoComplete="email" required maxLength={254} />
        </label>
        <label>
          <span>{text.service}</span>
          <select name="service" required defaultValue="">
            <option value="" disabled>{text.servicePlaceholder}</option>
            {services.map((service) => <option value={service} key={service}>{service}</option>)}
          </select>
        </label>
        <label className="project-inquiry-details">
          <span>{text.details}</span>
          <textarea name="details" rows={4} required maxLength={2000} placeholder={text.detailsPlaceholder} />
        </label>
      </div>
      <button className="sahm-button project-inquiry-submit" type="submit">
        {text.submit}
        <span aria-hidden="true">{isEnglish ? "→" : "←"}</span>
      </button>
      <p className="project-inquiry-note">{text.note}</p>
      <p className="project-inquiry-status" role="status" aria-live="polite">{status}</p>
    </form>
  );
}
