"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState } from "react";
import type { ErrorInfo, ReactNode } from "react";
import type { UniverseInput } from "./digital-universe-scene";

const DigitalUniverseScene = dynamic(
  () => import("./digital-universe-scene").then((module) => module.DigitalUniverseScene),
  { ssr: false },
);

function SceneFallback() {
  return (
    <div className="sahm-universe-fallback" aria-hidden="true">
      <span className="sahm-universe-fallback-core" />
      <span className="sahm-universe-fallback-ring sahm-universe-fallback-ring--one" />
      <span className="sahm-universe-fallback-ring sahm-universe-fallback-ring--two" />
    </div>
  );
}

function getRouteStartProgress(pageKey: string) {
  if (pageKey.includes("cybersecurity")) return 0.64;
  if (pageKey.includes("oilfield")) return 0.79;
  if (pageKey.includes("application") || pageKey.includes("business-systems")) return 0.3;
  if (pageKey.includes("services") || pageKey.includes("projects")) return 0.16;
  if (pageKey.includes("why-sahm")) return 0.5;
  if (pageKey.includes("contact")) return 0.92;
  if (pageKey.includes("about")) return 0.08;
  return 0;
}

class SceneErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("The SAHM 3D scene failed to render; using the static visual fallback.", error, info.componentStack);
    this.props.onError();
  }

  render() {
    return this.state.hasError ? <SceneFallback /> : this.props.children;
  }
}

export function DigitalUniverseExperience({
  locale,
  pageKey = "home",
}: {
  locale: "ar" | "en";
  pageKey?: string;
}) {
  const inputRef = useRef<UniverseInput>({
    progress: 0,
    pointerX: 0,
    pointerY: 0,
    coreOpen: 0,
    systems: 0,
    ai: 0,
    security: 0,
    engineering: 0,
    convergence: 0,
    cameraX: 0,
    cameraY: 0,
    cameraZ: 7.4,
    light: 0.75,
    particleFlow: 0.12,
  });
  const [supportsWebGL, setSupportsWebGL] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lowPower, setLowPower] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [sceneFailed, setSceneFailed] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);

    const mobile = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const updatePower = () => {
      setLowPower(mobile.matches || (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4));
    };
    updatePower();
    mobile.addEventListener("change", updatePower);
    const updateVisibility = () => setPageVisible(document.visibilityState === "visible");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);

    const probe = document.createElement("canvas");
    const context = probe.getContext("webgl2", { failIfMajorPerformanceCaveat: true });
    if (context) context.getExtension("WEBGL_lose_context")?.loseContext();
    const supportFrame = window.requestAnimationFrame(() => setSupportsWebGL(Boolean(context)));

    return () => {
      window.cancelAnimationFrame(supportFrame);
      media.removeEventListener("change", updateMotion);
      mobile.removeEventListener("change", updatePower);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (supportsWebGL !== true) return;
    const routeStartProgress = getRouteStartProgress(pageKey);
    const controls = inputRef.current;
    controls.progress = routeStartProgress;

    let disposed = false;
    let cleanupScrollExperience: (() => void) | undefined;

    async function setupScrollExperience() {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);
      const lenis = reducedMotion ? undefined : new Lenis({ autoRaf: false, smoothWheel: true, lerp: 0.085 });
      const ticker = (time: number) => lenis?.raf(time * 1000);
      const main = document.querySelector<HTMLElement>("[data-sahm-story], main");

      if (lenis) {
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(ticker);
      }

      const timeline = main ? gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: main,
          start: "top top",
          end: "bottom bottom",
          scrub: reducedMotion ? true : 1.15,
          invalidateOnRefresh: true,
        },
      }) : undefined;
      const stage = document.querySelector<HTMLElement>(".sahm-digital-universe");
      if (timeline && main) {
        const scenes = [
          { id: "enter-sahm", progress: 0.02, coreOpen: 0, systems: 0, ai: 0, security: 0, engineering: 0, convergence: 0, cameraX: 0, cameraY: 0, cameraZ: 7.4, light: 0.75, particleFlow: 0.12 },
          { id: "digital-transformation", progress: 0.16, coreOpen: 0.16, systems: 0.28, ai: 0, security: 0, engineering: 0, convergence: 0, cameraX: -0.2, cameraY: 0.04, cameraZ: 7.05, light: 0.9, particleFlow: 0.25 },
          { id: "business-systems", progress: 0.31, coreOpen: 0.62, systems: 1, ai: 0.08, security: 0, engineering: 0, convergence: 0, cameraX: 0.28, cameraY: 0.08, cameraZ: 6.7, light: 1, particleFlow: 0.48 },
          { id: "artificial-intelligence", progress: 0.46, coreOpen: 0.72, systems: 0.82, ai: 1, security: 0.08, engineering: 0, convergence: 0, cameraX: 0.12, cameraY: -0.06, cameraZ: 6.35, light: 1.16, particleFlow: 1 },
          { id: "cybersecurity", progress: 0.61, coreOpen: 0.74, systems: 0.76, ai: 0.82, security: 1, engineering: 0, convergence: 0, cameraX: -0.18, cameraY: 0.02, cameraZ: 6.2, light: 1.05, particleFlow: 0.62 },
          { id: "engineering-intelligence", progress: 0.77, coreOpen: 0.8, systems: 0.7, ai: 0.82, security: 0.82, engineering: 1, convergence: 0, cameraX: 0.05, cameraY: -0.5, cameraZ: 6.45, light: 1.14, particleFlow: 0.84 },
          { id: "convergence", progress: 0.91, coreOpen: 0.34, systems: 0.38, ai: 0.38, security: 0.38, engineering: 0.38, convergence: 0.82, cameraX: 0, cameraY: 0.08, cameraZ: 6.1, light: 1.24, particleFlow: 0.72 },
          { id: "call-to-action", progress: 1, coreOpen: 0, systems: 0, ai: 0, security: 0, engineering: 0, convergence: 1, cameraX: 0, cameraY: 0, cameraZ: 5.9, light: 1.35, particleFlow: 0.35 },
        ];
        const routeScenes = pageKey === "home"
          ? scenes
          : scenes.filter((scene) => scene.progress >= routeStartProgress);
        const sceneAnchors = pageKey === "home"
          ? Array.from(main.querySelectorAll<HTMLElement>("[data-sahm-scene]"))
          : [];
        const scrollableDistance = Math.max(main.scrollHeight - window.innerHeight, 1);
        const anchorRatios = routeScenes.map((_, index) => {
          if (index === 0) return 0;
          const anchor = sceneAnchors.length === scenes.length ? sceneAnchors[index] : undefined;
          if (!anchor) return index / (routeScenes.length - 1);
          const absoluteTop = anchor.getBoundingClientRect().top + window.scrollY;
          const mainTop = main.getBoundingClientRect().top + window.scrollY;
          return gsap.utils.clamp(0, 1, (absoluteTop - mainTop) / scrollableDistance);
        });

        const { id: firstScene, ...initialState } = routeScenes[0];
        timeline.set(controls, initialState, 0);
        timeline.addLabel(firstScene, 0);
        if (stage) stage.dataset.scene = firstScene;
        for (let index = 0; index < routeScenes.length - 1; index += 1) {
          const start = anchorRatios[index];
          const end = Math.max(anchorRatios[index + 1], start + 0.001);
          const { id: nextScene, ...sceneState } = routeScenes[index + 1];
          timeline.addLabel(nextScene, end);
          timeline.to(controls, {
            ...sceneState,
            duration: end - start,
          }, start);
        }
        timeline.eventCallback("onUpdate", () => {
          if (!stage) return;
          const currentProgress = timeline.progress();
          let sceneIndex = 0;
          while (sceneIndex < anchorRatios.length - 1 && currentProgress >= anchorRatios[sceneIndex + 1]) {
            sceneIndex += 1;
          }
          stage.dataset.scene = routeScenes[sceneIndex].id;
          stage.style.setProperty("--sahm-background-energy", String(controls.light));
        });

        if (!reducedMotion) {
          main.querySelectorAll<HTMLElement>("h1, h2").forEach((heading) => {
            const bounds = heading.getBoundingClientRect();
            if (bounds.top < window.innerHeight && bounds.bottom > 0) return;
            const absoluteTop = bounds.top + window.scrollY;
            const mainTop = main.getBoundingClientRect().top + window.scrollY;
            const position = gsap.utils.clamp(0, 0.98, (absoluteTop - mainTop - window.innerHeight * 0.62) / scrollableDistance);
            const fromInset = locale === "ar" ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";
            timeline.fromTo(heading, {
              clipPath: fromInset,
              y: 22,
              filter: "blur(7px)",
            }, {
              clipPath: "inset(0 0 0 0)",
              y: 0,
              filter: "blur(0px)",
              duration: Math.min(0.09, 1 - position),
              ease: "none",
              immediateRender: false,
            }, position);
          });
        }
      }

      cleanupScrollExperience = () => {
        timeline?.scrollTrigger?.kill();
        timeline?.kill();
        gsap.ticker.remove(ticker);
        lenis?.destroy();
      };
      ScrollTrigger.refresh();
    }

    void setupScrollExperience();
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reducedMotion) return;
      inputRef.current.pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      inputRef.current.pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const resetPointer = () => {
      inputRef.current.pointerX = 0;
      inputRef.current.pointerY = 0;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", resetPointer);

    return () => {
      disposed = true;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", resetPointer);
      cleanupScrollExperience?.();
    };
  }, [supportsWebGL, reducedMotion, pageKey, locale]);

  if (supportsWebGL === false || sceneFailed) {
    return <div className="sahm-digital-universe" aria-hidden="true"><SceneFallback /></div>;
  }

  if (supportsWebGL === null) {
    return <div className="sahm-digital-universe" aria-hidden="true"><SceneFallback /></div>;
  }

  return (
    <div className="sahm-digital-universe" aria-hidden="true" data-page={pageKey}>
      <SceneErrorBoundary onError={() => setSceneFailed(true)}>
        <DigitalUniverseScene
          input={inputRef}
          reducedMotion={reducedMotion}
          lowPower={lowPower}
          locale={locale}
          pageVisible={pageVisible}
        />
      </SceneErrorBoundary>
      <div className="sahm-universe-vignette" />
    </div>
  );
}
