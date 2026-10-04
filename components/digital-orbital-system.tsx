"use client";

import { useCallback, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { DigitalOrbitalWebGL } from "./digital-orbital-webgl";

const serviceLabels = {
  ar: ["الاستشارات", "الأمن", "الأنظمة", "الحقول النفطية"],
  en: ["Consulting", "Security", "Systems", "Oil fields"],
} as const;

export function DigitalOrbitalSystem({ locale }: { locale: "ar" | "en" }) {
  const visualRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);
  const [webglReady, setWebglReady] = useState(false);
  const handleWebGLReady = useCallback((ready: boolean) => setWebglReady(ready), []);

  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      boundsRef.current = null;
      return;
    }
    boundsRef.current = event.currentTarget.getBoundingClientRect();
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const bounds = boundsRef.current;
    if (!bounds || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 7;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 7;
    visualRef.current?.style.setProperty("--pointer-x", `${(x * 0.35).toFixed(2)}px`);
    visualRef.current?.style.setProperty("--pointer-y", `${(y * 0.35).toFixed(2)}px`);
    visualRef.current?.style.setProperty("--pointer-rotate-x", `${(y * -0.32).toFixed(2)}deg`);
    visualRef.current?.style.setProperty("--pointer-rotate-y", `${(x * 0.32).toFixed(2)}deg`);
  }

  function handlePointerLeave() {
    boundsRef.current = null;
    visualRef.current?.style.setProperty("--pointer-x", "0px");
    visualRef.current?.style.setProperty("--pointer-y", "0px");
    visualRef.current?.style.setProperty("--pointer-rotate-x", "0deg");
    visualRef.current?.style.setProperty("--pointer-rotate-y", "0deg");
  }

  return (
    <div
      ref={visualRef}
      className={`hero-system-visual${webglReady ? " hero-system-visual--webgl-ready" : ""}`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-hidden="true"
    >
      <div className="hero-system-depth">
        <div className="hero-orbit-plane hero-orbit-plane--one">
          <span className="hero-orbit-satellite hero-orbit-satellite--large" />
        </div>
        <div className="hero-orbit-plane hero-orbit-plane--two">
          <span className="hero-orbit-satellite hero-orbit-satellite--small" />
        </div>
        <div className="hero-orbit-plane hero-orbit-plane--three">
          <span className="hero-orbit-satellite hero-orbit-satellite--medium" />
        </div>
        <div className="hero-orbit-plane hero-orbit-plane--four">
          <span className="hero-orbit-satellite hero-orbit-satellite--tiny" />
        </div>
        <span className="hero-orbit-connection hero-orbit-connection--one" />
        <span className="hero-orbit-connection hero-orbit-connection--two" />
        <span className="hero-system-core">
          <span>س</span>
          <small>SAHM</small>
        </span>
        {serviceLabels[locale].map((label, index) => (
          <span key={label} className={`hero-system-node hero-system-node-${index + 1}`}>
            <i />
            {label}
          </span>
        ))}
        <span className="hero-system-caption">
          {locale === "en" ? "CONNECTED TECHNOLOGY" : "تقنية مترابطة"}
        </span>
      </div>
      <DigitalOrbitalWebGL onReady={handleWebGLReady} />
    </div>
  );
}
