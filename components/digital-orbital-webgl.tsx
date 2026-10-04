"use client";

import { useEffect, useRef } from "react";

type DigitalSceneVariant = "orbital" | "connection" | "globe";

export function DigitalOrbitalWebGL({
  onReady,
  variant = "orbital",
}: {
  onReady: (ready: boolean) => void;
  variant?: DigitalSceneVariant;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const host = canvas.parentElement;
    if (!host) return;
    const canvasElement: HTMLCanvasElement = canvas;
    const hostElement: HTMLElement = host;

    let disposed = false;
    let initializing = false;
    let visible = false;
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    let lastFrameTime = 0;
    let three: typeof import("three") | null = null;
    let renderer: import("three").WebGLRenderer | null = null;
    let scene: import("three").Scene | null = null;
    let camera: import("three").PerspectiveCamera | null = null;
    let system: import("three").Group | null = null;
    let globeSystem: import("three").Group | null = null;
    const networkNodes: import("three").Mesh[] = [];
    const networkSignals: {
      mesh: import("three").Mesh;
      from: import("three").Vector3;
      to: import("three").Vector3;
      phase: number;
    }[] = [];
    const globeNodes: import("three").Mesh[] = [];
    const globeSignals: {
      mesh: import("three").Mesh;
      points: import("three").Vector3[];
      phase: number;
    }[] = [];
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

    function renderStaticFrame() {
      if (visible && renderer && scene && camera) renderer.render(scene, camera);
    }

    function stopRendering() {
      if (!animationFrame) return;
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }

    function animate(now: number) {
      animationFrame = 0;
      if (disposed || !visible || !renderer || !scene || !camera || !system) return;
      if (now - lastFrameTime < 1000 / 30) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const delta = Math.min((now - (lastFrameTime || now)) / 1000, 0.05);
      lastFrameTime = now;
      pointer.x += (pointer.targetX - pointer.x) * 0.035;
      pointer.y += (pointer.targetY - pointer.y) * 0.035;

      if (variant === "orbital") {
        system.rotation.x = pointer.y + Math.sin(now * 0.00012) * 0.025;
        system.rotation.y = pointer.x + Math.sin(now * 0.0001) * 0.035;

        for (const orbit of system.children) {
          if (orbit.userData.rotationSpeed) {
            orbit.rotation.z += orbit.userData.rotationSpeed * delta;
          }
        }
      } else if (variant === "connection") {
        system.rotation.x = pointer.y * 0.55 + Math.sin(now * 0.0001) * 0.018;
        system.rotation.y = pointer.x * 0.55 + Math.sin(now * 0.00008) * 0.025;
        networkNodes.forEach((node, index) => {
          const pulse = 0.94 + Math.sin(now * 0.0012 + index * 1.7) * 0.08;
          node.scale.setScalar(pulse);
        });
        networkSignals.forEach(({ mesh, from, to, phase }) => {
          const progress = (now / 7800 + phase) % 1;
          mesh.position.lerpVectors(from, to, progress);
        });
      } else {
        system.rotation.x = pointer.y * 0.35 + Math.sin(now * 0.00008) * 0.012;
        system.rotation.y = pointer.x * 0.35 + Math.sin(now * 0.00006) * 0.035;
        if (globeSystem) globeSystem.rotation.y += delta * 0.12;
        for (const ring of system.children) {
          if (ring.userData.rotationSpeed) ring.rotation.z += ring.userData.rotationSpeed * delta;
        }
        globeNodes.forEach((node, index) => {
          node.scale.setScalar(0.88 + Math.sin(now * 0.0011 + index * 1.9) * 0.12);
        });
        globeSignals.forEach(({ mesh, points, phase }) => {
          const progress = (now / 6200 + phase) % 1;
          const position = progress * (points.length - 1);
          const segment = Math.min(Math.floor(position), points.length - 2);
          mesh.position.lerpVectors(points[segment], points[segment + 1], position - segment);
        });
      }

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    }

    function startRendering() {
      if (!visible || !renderer || !scene || !camera) return;
      stopRendering();
      if (reducedMotion) {
        renderStaticFrame();
        return;
      }
      lastFrameTime = 0;
      animationFrame = requestAnimationFrame(animate);
    }

    function handleResize() {
      if (!renderer || !camera) return;
      const width = Math.max(hostElement.clientWidth, 1);
      const height = Math.max(hostElement.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      if (reducedMotion) renderStaticFrame();
    }

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse" || reducedMotion) return;
      const bounds = hostElement.getBoundingClientRect();
      pointer.targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.16;
      pointer.targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.12;
    }

    function handlePointerLeave() {
      pointer.targetX = 0;
      pointer.targetY = 0;
    }

    function handleMotionPreference(event: MediaQueryListEvent) {
      reducedMotion = event.matches;
      if (reducedMotion) {
        stopRendering();
        if (system) {
          system.rotation.set(0, 0, 0);
          for (const orbit of system.children) {
            orbit.rotation.z = 0;
            orbit.scale.setScalar(1);
          }
        }
        globeSystem?.rotation.set(0, 0, 0);
        if (variant === "connection") {
          networkNodes.forEach((node) => node.scale.setScalar(1));
          networkSignals.forEach(({ mesh, from, to, phase }) => {
            mesh.position.lerpVectors(from, to, phase);
          });
        } else if (variant === "globe") {
          globeNodes.forEach((node) => node.scale.setScalar(1));
          globeSignals.forEach(({ mesh, points, phase }) => {
            mesh.position.copy(points[Math.min(Math.floor(phase * (points.length - 1)), points.length - 1)]);
          });
        }
        renderStaticFrame();
      } else {
        startRendering();
      }
    }

    function handleContextLost(event: Event) {
      event.preventDefault();
      stopRendering();
      onReadyRef.current(false);
    }

    function handleContextRestored() {
      if (!renderer) return;
      renderer.resetState();
      handleResize();
      onReadyRef.current(true);
      startRendering();
    }

    async function initializeScene() {
      if (initializing || disposed) return;
      initializing = true;

      try {
        const THREE = await import("three");
        three = THREE;
        if (disposed || !canvasElement.isConnected) return;

        const smallScreen = window.matchMedia("(max-width: 640px)").matches;
        const lowPower = smallScreen || navigator.hardwareConcurrency <= 4;
        renderer = new THREE.WebGLRenderer({
          canvas: canvasElement,
          alpha: true,
          antialias: !lowPower,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPower ? (smallScreen ? 1.15 : 1.2) : 1.5));
        renderer.setClearColor(0x000000, 0);
        canvasElement.addEventListener("webglcontextlost", handleContextLost);
        canvasElement.addEventListener("webglcontextrestored", handleContextRestored);

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
        camera.position.set(0, 0, 6.4);
        const sceneSystem = new THREE.Group();
        system = sceneSystem;
        scene.add(sceneSystem);
        scene.add(new THREE.HemisphereLight(0xb9d9ff, 0x071321, 1.35));

        const keyLight = new THREE.DirectionalLight(0xb3d5ff, 2.1);
        keyLight.position.set(-3, 4, 5);
        scene.add(keyLight);
        const rimLight = new THREE.PointLight(0x4f93ff, 11, 7, 2);
        rimLight.position.set(2, -1, 2);
        scene.add(rimLight);

        if (variant === "orbital") {
          const core = new THREE.Mesh(
            new THREE.SphereGeometry(0.48, smallScreen ? 24 : 32, smallScreen ? 16 : 24),
            new THREE.MeshStandardMaterial({
              color: 0x183554,
              emissive: 0x102d4b,
              emissiveIntensity: 0.48,
              metalness: 0.26,
              roughness: 0.38,
            }),
          );
          sceneSystem.add(core);

          const coreWire = new THREE.Mesh(
            new THREE.SphereGeometry(0.53, 20, 12),
            new THREE.MeshBasicMaterial({
              color: 0x83b9f4,
              wireframe: true,
              transparent: true,
              opacity: 0.1,
            }),
          );
          sceneSystem.add(coreWire);

          const orbitSpecs = [
            { radius: 1.2, tiltX: 0.98, tiltY: -0.25, speed: 0.12, color: 0x83b9f4, z: -0.1 },
            { radius: 1.48, tiltX: 0.68, tiltY: 0.42, speed: -0.09, color: 0x73bfc9, z: 0.12 },
            { radius: 1.72, tiltX: -0.82, tiltY: -0.35, speed: 0.065, color: 0x729ed3, z: -0.16 },
            { radius: 1.92, tiltX: 1.15, tiltY: 0.2, speed: -0.045, color: 0xa2c9f1, z: 0.08 },
          ];

          orbitSpecs.slice(0, smallScreen ? 2 : 4).forEach((spec, index) => {
            const orbit = new THREE.Group();
            orbit.rotation.set(spec.tiltX, spec.tiltY, index * 0.18);
            orbit.position.z = spec.z;
            orbit.userData.rotationSpeed = spec.speed;
            sceneSystem.add(orbit);

            orbit.add(
              new THREE.Mesh(
                new THREE.TorusGeometry(spec.radius, 0.0045, 4, lowPower ? 96 : 144),
                new THREE.MeshBasicMaterial({
                  color: spec.color,
                  transparent: true,
                  opacity: index === 0 ? 0.42 : 0.25,
                }),
              ),
            );

            const nodeMaterial = new THREE.MeshStandardMaterial({
              color: spec.color,
              emissive: spec.color,
              emissiveIntensity: 0.38,
              metalness: 0.12,
              roughness: 0.34,
            });
            const nodeGeometry = new THREE.SphereGeometry(index === 0 ? 0.045 : 0.032, 10, 8);
            const nodeCount = smallScreen ? 1 : 2;

            for (let nodeIndex = 0; nodeIndex < nodeCount; nodeIndex += 1) {
              const angle = (nodeIndex / nodeCount) * Math.PI * 2 + index * 0.61;
              const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
              node.position.set(Math.cos(angle) * spec.radius, Math.sin(angle) * spec.radius, 0);
              orbit.add(node);
            }
          });
        } else if (variant === "connection") {
          const points = [
            [-2.1, 0.88, -0.3], [-1.8, -0.28, 0.5], [-1.25, -0.92, -0.35],
            [-0.95, 0.42, 0.65], [-0.5, 1.05, -0.48], [-0.25, -0.5, 0.82],
            [0.35, 0.8, 0.22], [0.65, -0.82, -0.48], [1.1, 0.18, 0.7],
            [1.55, 0.83, -0.35], [1.72, -0.48, 0.32], [0.2, -1.08, 0.1],
          ].map(([x, y, z]) => new THREE.Vector3(x, y, z));
          const corePoint = new THREE.Vector3(0.05, 0, 0);
          const edges = [
            [0, 3], [1, 2], [1, 5], [2, 11], [3, 4], [3, 6],
            [4, 6], [5, 6], [5, 7], [6, 8], [7, 11], [7, 8],
            [8, 9], [8, 10], [9, 10],
          ];
          const edgeVectors: [import("three").Vector3, import("three").Vector3][] = edges.map(([a, b]) => [points[a], points[b]]);
          const connections: [import("three").Vector3, import("three").Vector3][] = [
            ...edgeVectors,
            ...points.map((point) => [point, corePoint] as [import("three").Vector3, import("three").Vector3]),
          ];

          const lineGeometry = new THREE.BufferGeometry().setFromPoints(
            connections.flatMap(([from, to]) => [from, to]),
          );
          sceneSystem.add(new THREE.LineSegments(
            lineGeometry,
            new THREE.LineBasicMaterial({ color: 0x6f9ccf, transparent: true, opacity: 0.19 }),
          ));

          const nodeGeometry = new THREE.SphereGeometry(0.045, 10, 8);
          const nodeMaterial = new THREE.MeshStandardMaterial({
            color: 0x87b9ef,
            emissive: 0x3768a5,
            emissiveIntensity: 0.5,
            metalness: 0.12,
            roughness: 0.38,
          });
          points.forEach((point) => {
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
            node.position.copy(point);
            networkNodes.push(node);
            sceneSystem.add(node);
          });

          const core = new THREE.Mesh(
            new THREE.SphereGeometry(0.16, 20, 14),
            new THREE.MeshStandardMaterial({
              color: 0x21466a,
              emissive: 0x3768b1,
              emissiveIntensity: 0.8,
              metalness: 0.25,
              roughness: 0.34,
            }),
          );
          core.position.copy(corePoint);
          sceneSystem.add(core);
          const coreHalo = new THREE.Mesh(
            new THREE.TorusGeometry(0.23, 0.006, 4, lowPower ? 48 : 72),
            new THREE.MeshBasicMaterial({ color: 0x8bbcff, transparent: true, opacity: 0.48 }),
          );
          coreHalo.position.copy(corePoint);
          coreHalo.rotation.x = Math.PI / 2.6;
          sceneSystem.add(coreHalo);

          const signalGeometry = new THREE.SphereGeometry(0.026, 8, 6);
          const signalMaterial = new THREE.MeshBasicMaterial({ color: 0xb8d7ff });
          connections.slice(0, smallScreen ? 8 : 17).forEach(([from, to], index) => {
            const signal = new THREE.Mesh(signalGeometry, signalMaterial);
            signal.position.copy(from);
            networkSignals.push({ mesh: signal, from, to, phase: index / Math.min(smallScreen ? 8 : 17, connections.length) });
            sceneSystem.add(signal);
          });
        } else {
          const globe = new THREE.Group();
          globeSystem = globe;
          sceneSystem.add(globe);

          const radius = 1.42;
          const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(radius, smallScreen ? 32 : 48, smallScreen ? 24 : 36),
            new THREE.MeshStandardMaterial({
              color: 0x0a2742,
              emissive: 0x06172a,
              emissiveIntensity: 0.7,
              metalness: 0.22,
              roughness: 0.58,
            }),
          );
          globe.add(sphere);

          const latitudeLongitude = new THREE.Mesh(
            new THREE.SphereGeometry(radius + 0.006, smallScreen ? 18 : 28, smallScreen ? 12 : 18),
            new THREE.MeshBasicMaterial({
              color: 0x5ca9ed,
              wireframe: true,
              transparent: true,
              opacity: 0.16,
            }),
          );
          globe.add(latitudeLongitude);

          const atmosphere = new THREE.Mesh(
            new THREE.SphereGeometry(radius * 1.045, smallScreen ? 28 : 40, smallScreen ? 18 : 28),
            new THREE.ShaderMaterial({
              vertexShader: `
                varying vec3 vNormalView;
                void main() {
                  vNormalView = normalize(normalMatrix * normal);
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
              `,
              fragmentShader: `
                varying vec3 vNormalView;
                void main() {
                  float rim = pow(1.0 - max(dot(normalize(vNormalView), vec3(0.0, 0.0, 1.0)), 0.0), 2.1);
                  gl_FragColor = vec4(0.08, 0.42, 0.88, rim * 0.46);
                }
              `,
              transparent: true,
              depthWrite: false,
              side: THREE.BackSide,
              blending: THREE.AdditiveBlending,
            }),
          );
          globe.add(atmosphere);

          function globePoint(longitude: number, latitude: number, pointRadius = radius + 0.016) {
            const lon = THREE.MathUtils.degToRad(longitude);
            const lat = THREE.MathUtils.degToRad(latitude);
            return new THREE.Vector3(
              pointRadius * Math.cos(lat) * Math.sin(lon),
              pointRadius * Math.sin(lat),
              pointRadius * Math.cos(lat) * Math.cos(lon),
            );
          }

          const circuitRoutes = [
            [[-62, 8], [-42, 8], [-42, 23], [-17, 23], [-17, 39], [7, 39], [7, 18], [30, 18], [30, -3], [54, -3]],
            [[-56, -18], [-34, -18], [-34, -35], [-8, -35], [-8, -20], [15, -20], [15, -40], [42, -40], [42, -20], [60, -20]],
            [[-48, 50], [-26, 50], [-26, 40], [-3, 40], [-3, 56], [22, 56], [22, 43], [48, 43]],
            [[-64, -46], [-45, -46], [-45, -55], [-20, -55], [-20, -44], [5, -44], [5, -58], [34, -58]],
          ];
          const globeRoutes = [-120, 0, 120].flatMap((longitudeOffset) =>
            circuitRoutes.slice(0, 2).map((route) =>
              route.map(([longitude, latitude]) => [longitude + longitudeOffset, latitude]),
            ),
          );
          const circuitMaterial = new THREE.LineBasicMaterial({
            color: 0x54b5ff,
            transparent: true,
            opacity: 0.68,
          });
          const nodeGeometry = new THREE.SphereGeometry(smallScreen ? 0.027 : 0.032, 8, 6);
          const nodeMaterial = new THREE.MeshStandardMaterial({
            color: 0x9bd8ff,
            emissive: 0x2581d8,
            emissiveIntensity: 0.72,
            metalness: 0.1,
            roughness: 0.32,
          });

          globeRoutes.slice(0, smallScreen ? 6 : globeRoutes.length).forEach((route, routeIndex) => {
            const routePoints: import("three").Vector3[] = [];
            route.slice(0, smallScreen ? 8 : route.length).forEach(([longitude, latitude], pointIndex) => {
              if (pointIndex === 0) {
                routePoints.push(globePoint(longitude, latitude));
                return;
              }
              const [previousLongitude, previousLatitude] = route[pointIndex - 1];
              for (let step = 1; step <= 5; step += 1) {
                const progress = step / 5;
                routePoints.push(globePoint(
                  previousLongitude + (longitude - previousLongitude) * progress,
                  previousLatitude + (latitude - previousLatitude) * progress,
                ));
              }
            });

            globe.add(new THREE.Line(
              new THREE.BufferGeometry().setFromPoints(routePoints),
              circuitMaterial,
            ));

            routePoints.forEach((point, pointIndex) => {
              if (pointIndex % 10 !== 0) return;
              const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
              node.position.copy(point);
              globeNodes.push(node);
              globe.add(node);
            });

            if (routePoints.length > 12) {
              const signal = new THREE.Mesh(
                new THREE.SphereGeometry(0.024, 8, 6),
                new THREE.MeshBasicMaterial({ color: 0xc3eaff }),
              );
              signal.position.copy(routePoints[0]);
              globeSignals.push({ mesh: signal, points: routePoints, phase: routeIndex / globeRoutes.length });
              globe.add(signal);
            }
          });

          const ringSpecs = [
            { rotation: [0.35, 0.15, -0.48], speed: 0.018, opacity: 0.38 },
            { rotation: [1.23, 0.48, 0.24], speed: -0.012, opacity: 0.2 },
          ] as const;
          ringSpecs.forEach((spec) => {
            const ring = new THREE.Group();
            ring.rotation.set(spec.rotation[0], spec.rotation[1], spec.rotation[2]);
            ring.userData.rotationSpeed = spec.speed;
            ring.add(new THREE.Mesh(
              new THREE.TorusGeometry(radius * 1.12, 0.0045, 3, lowPower ? 96 : 140),
              new THREE.MeshBasicMaterial({
                color: 0x62baff,
                transparent: true,
                opacity: spec.opacity,
              }),
            ));
            sceneSystem.add(ring);
          });
        }

        handleResize();
        resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(hostElement);
        hostElement.addEventListener("pointermove", handlePointerMove);
        hostElement.addEventListener("pointerleave", handlePointerLeave);
        onReadyRef.current(true);
        startRendering();
      } catch (error) {
        if (!disposed) {
          console.error("SAHM 3D hero could not initialize; using the static orbital fallback.", error);
          onReadyRef.current(false);
        }
      } finally {
        initializing = false;
      }
    }

    function handleVisibility(entries: IntersectionObserverEntry[]) {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) {
        void initializeScene();
        startRendering();
      } else {
        stopRendering();
      }
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionQuery.addEventListener("change", handleMotionPreference);
    if ("IntersectionObserver" in window) {
      intersectionObserver = new IntersectionObserver(handleVisibility, { rootMargin: "120px", threshold: 0.01 });
      intersectionObserver.observe(hostElement);
    } else {
      visible = true;
      void initializeScene();
    }

    return () => {
      disposed = true;
      stopRendering();
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      motionQuery.removeEventListener("change", handleMotionPreference);
      hostElement.removeEventListener("pointermove", handlePointerMove);
      hostElement.removeEventListener("pointerleave", handlePointerLeave);
      canvasElement.removeEventListener("webglcontextlost", handleContextLost);
      canvasElement.removeEventListener("webglcontextrestored", handleContextRestored);
      renderer?.dispose();
      renderer?.forceContextLoss();

      const THREE = three;
      if (scene && THREE) {
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
            object.geometry.dispose();
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material) => material.dispose());
          }
        });
      }

      onReadyRef.current(false);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={
        variant === "orbital"
          ? "hero-system-webgl"
          : variant === "connection"
            ? "digital-connection-webgl"
            : "digital-globe-webgl"
      }
      aria-hidden="true"
    />
  );
}
