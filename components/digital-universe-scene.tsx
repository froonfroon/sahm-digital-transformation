"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";

export type UniverseInput = {
  progress: number;
  pointerX: number;
  pointerY: number;
  coreOpen: number;
  systems: number;
  ai: number;
  security: number;
  engineering: number;
  convergence: number;
  cameraX: number;
  cameraY: number;
  cameraZ: number;
  light: number;
  particleFlow: number;
};

function smoothStep(start: number, end: number, value: number) {
  const t = THREE.MathUtils.clamp((value - start) / (end - start), 0, 1);
  return t * t * (3 - 2 * t);
}

function makeParticlePositions(count: number) {
  const positions = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    const radius = 1.7 + Math.random() * 3.1;
    const theta = Math.random() * Math.PI * 2;
    const vertical = (Math.random() - 0.5) * 4.4;
    positions[index * 3] = Math.cos(theta) * radius;
    positions[index * 3 + 1] = vertical;
    positions[index * 3 + 2] = Math.sin(theta) * radius;
  }
  return positions;
}

function AmbientParticles({
  count,
  reducedMotion,
  input,
}: {
  count: number;
  reducedMotion: boolean;
  input: MutableRefObject<UniverseInput>;
}) {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.PointsMaterial>(null);
  const positions = useMemo(() => makeParticlePositions(count), [count]);

  useFrame(({ clock }, delta) => {
    if (!points.current || reducedMotion) return;
    const flow = input.current.particleFlow;
    points.current.rotation.y += delta * (0.004 + flow * 0.024);
    points.current.rotation.x = Math.sin(clock.elapsedTime * 0.04) * 0.018 + flow * 0.012;
    if (material.current) material.current.opacity = 0.28 + flow * 0.4;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        color="#86baff"
        size={0.018}
        transparent
        opacity={0.52}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function OrbitalCore({
  reducedMotion,
  input,
}: {
  reducedMotion: boolean;
  input: MutableRefObject<UniverseInput>;
}) {
  const core = useRef<THREE.Group>(null);
  const shellMaterial = useRef<THREE.MeshPhysicalMaterial>(null);
  const outerWire = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.92, 1)), []);

  useFrame(({ clock }, delta) => {
    if (!core.current) return;
    const { coreOpen, convergence } = input.current;
    core.current.rotation.y = THREE.MathUtils.damp(core.current.rotation.y, coreOpen * 0.42 + convergence * Math.PI * 2, 2.8, delta);
    core.current.rotation.x = THREE.MathUtils.damp(
      core.current.rotation.x,
      reducedMotion ? 0 : Math.sin(clock.elapsedTime * 0.08) * 0.035 + coreOpen * 0.12,
      2,
      delta,
    );
    core.current.scale.setScalar(THREE.MathUtils.damp(core.current.scale.x, 1 + coreOpen * 0.1, 2.4, delta));
    if (shellMaterial.current) {
      shellMaterial.current.emissiveIntensity = THREE.MathUtils.damp(
        shellMaterial.current.emissiveIntensity,
        0.36 + input.current.light * 0.32 + coreOpen * 0.22,
        2.4,
        delta,
      );
    }
  });

  return (
    <group ref={core}>
      <mesh>
        <icosahedronGeometry args={[0.86, 1]} />
        <meshPhysicalMaterial
          ref={shellMaterial}
          color="#0a1b2c"
          metalness={0.75}
          roughness={0.28}
          clearcoat={0.82}
          clearcoatRoughness={0.2}
          emissive="#0a2850"
          emissiveIntensity={0.48}
        />
      </mesh>
      <lineSegments geometry={outerWire}>
        <lineBasicMaterial color="#75b6ff" transparent opacity={0.9} />
      </lineSegments>
      <mesh rotation={[0.22, 0.36, 0.12]}>
        <dodecahedronGeometry args={[0.48, 0]} />
        <meshStandardMaterial
          color="#102c49"
          metalness={0.72}
          roughness={0.2}
          emissive="#1d6aba"
          emissiveIntensity={0.45}
          wireframe
        />
      </mesh>
      <mesh rotation={[0.7, 0.4, 0]}>
        <torusGeometry args={[1.22, 0.007, 8, 160]} />
        <meshBasicMaterial color="#8bc9ff" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[1.18, -0.32, 0.48]}>
        <torusGeometry args={[1.38, 0.004, 8, 160]} />
        <meshBasicMaterial color="#3e8be5" transparent opacity={0.38} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[0.23, 0]} />
        <meshBasicMaterial color="#d4eaff" />
      </mesh>
      <pointLight color="#4b9dff" intensity={2.2} distance={4.5} />
    </group>
  );
}

const systemPositions = [
  [-2.2, 0.72, 0.1],
  [-1.38, 1.55, -0.4],
  [0.1, 1.86, 0.25],
  [1.85, 1.28, -0.3],
  [2.25, -0.62, 0.1],
  [0.08, -1.86, -0.4],
] as const;

function BusinessSystems({
  groupRef,
  input,
  reducedMotion,
}: {
  groupRef: MutableRefObject<THREE.Group | null>;
  input: MutableRefObject<UniverseInput>;
  reducedMotion: boolean;
}) {
  const connectorMaterial = useRef<THREE.LineBasicMaterial>(null);
  const connectorPositions = useMemo(() => {
    const points: number[] = [];
    for (const [x, y, z] of systemPositions) {
      points.push(0, 0, 0, x, y, z);
    }
    return new Float32Array(points);
  }, []);

  useFrame(({ clock }, delta) => {
    if (!connectorMaterial.current) return;
    const pulse = reducedMotion ? 0 : Math.sin(clock.elapsedTime * (0.6 + input.current.particleFlow)) * 0.06;
    connectorMaterial.current.opacity = THREE.MathUtils.damp(
      connectorMaterial.current.opacity,
      0.2 + input.current.systems * 0.42 + pulse,
      2,
      delta,
    );
  });

  return (
    <group ref={groupRef} scale={0}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[connectorPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial ref={connectorMaterial} color="#60b8ff" transparent opacity={0.56} />
      </lineSegments>
      {systemPositions.map(([x, y, z], index) => (
        <group key={`${x}-${y}-${z}`} position={[x, y, z]}>
          <mesh>
            <boxGeometry args={[0.32, 0.32, 0.32]} />
            <meshStandardMaterial
              color={index % 2 ? "#173451" : "#102943"}
              metalness={0.6}
              roughness={0.27}
              emissive="#18508b"
              emissiveIntensity={0.38}
            />
          </mesh>
          <mesh scale={1.08}>
            <boxGeometry args={[0.32, 0.32, 0.32]} />
            <meshBasicMaterial color="#84c4ff" wireframe transparent opacity={0.68} />
          </mesh>
          <mesh position={[0, 0, 0.18]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial color="#c6e5ff" />
          </mesh>
        </group>
      ))}
      <DataSignals input={input} reducedMotion={reducedMotion} />
    </group>
  );
}

function DataSignals({ input, reducedMotion }: { input: MutableRefObject<UniverseInput>; reducedMotion: boolean }) {
  const signals = useRef<Array<THREE.Mesh | null>>([]);
  const activeStart = [0.12, 0.3, 0.48, 0.66, 0.82, 0.94];

  useFrame(({ clock }) => {
    signals.current.forEach((signal, index) => {
      if (!signal) return;
      const flow = reducedMotion ? 0 : input.current.particleFlow;
      const pathProgress = (clock.elapsedTime * (0.025 + flow * 0.28) + index * 0.21) % 1;
      const [x, y, z] = systemPositions[index];
      signal.position.set(x * pathProgress, y * pathProgress, z * pathProgress);
      const inTimeline = smoothStep(activeStart[index], activeStart[index] + 0.08, input.current.progress);
      signal.visible = inTimeline > 0.05 && input.current.progress < 0.94;
    });
  });

  return (
    <>
      {systemPositions.map((_, index) => (
        <mesh
          key={index}
          ref={(node) => { signals.current[index] = node; }}
          scale={index % 2 ? 0.042 : 0.032}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#c2e7ff" toneMapped={false} />
        </mesh>
      ))}
    </>
  );
}

function IntelligenceNetwork({ groupRef }: { groupRef: MutableRefObject<THREE.Group | null> }) {
  const nodes = useMemo(() => {
    return Array.from({ length: 22 }, (_, index) => {
      const latitude = Math.acos(1 - (2 * (index + 0.5)) / 22);
      const longitude = Math.PI * (1 + Math.sqrt(5)) * index;
      const radius = 1.62 + (index % 3) * 0.09;
      return new THREE.Vector3(
        Math.cos(longitude) * Math.sin(latitude) * radius,
        Math.cos(latitude) * radius,
        Math.sin(longitude) * Math.sin(latitude) * radius,
      );
    });
  }, []);
  const linePositions = useMemo(() => {
    const vertices: number[] = [];
    nodes.forEach((node, index) => {
      const next = nodes[(index + 5) % nodes.length];
      vertices.push(node.x, node.y, node.z, next.x, next.y, next.z);
    });
    return new Float32Array(vertices);
  }, [nodes]);

  return (
    <group ref={groupRef} scale={0}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#55c9dd" transparent opacity={0.38} />
      </lineSegments>
      {nodes.map((node, index) => (
        <mesh key={index} position={node}>
          <sphereGeometry args={[index % 5 === 0 ? 0.045 : 0.022, 8, 8]} />
          <meshBasicMaterial color={index % 5 === 0 ? "#a6eaff" : "#57b7f1"} />
        </mesh>
      ))}
      <mesh>
        <torusGeometry args={[1.72, 0.006, 6, 120]} />
        <meshBasicMaterial color="#59cbe0" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function SecurityField({
  groupRef,
  input,
}: {
  groupRef: MutableRefObject<THREE.Group | null>;
  input: MutableRefObject<UniverseInput>;
}) {
  const fieldMaterial = useRef<THREE.MeshBasicMaterial>(null);
  useFrame((_, delta) => {
    if (!fieldMaterial.current) return;
    fieldMaterial.current.opacity = THREE.MathUtils.damp(
      fieldMaterial.current.opacity,
      0.04 + input.current.security * 0.14,
      2.2,
      delta,
    );
  });

  return (
    <group ref={groupRef} scale={0}>
      <mesh>
        <icosahedronGeometry args={[2.52, 2]} />
        <meshBasicMaterial ref={fieldMaterial} color="#62aaff" wireframe transparent opacity={0.12} />
      </mesh>
      {[2.35, 2.42, 2.49].map((radius, index) => (
        <mesh key={radius} rotation={[index * 0.8, index * 0.45, 0]}>
          <torusGeometry args={[radius, 0.006, 6, 140]} />
          <meshBasicMaterial color="#8bc8ff" transparent opacity={0.48 - index * 0.08} />
        </mesh>
      ))}
    </group>
  );
}

function OilFieldIntelligence({ groupRef }: { groupRef: MutableRefObject<THREE.Group | null> }) {
  const geometry = useMemo(() => {
    const points: number[] = [];
    for (let x = -2.3; x <= 2.3; x += 0.46) {
      for (let z = -0.9; z <= 0.9; z += 0.45) {
        points.push(x, -0.85 + Math.sin(x * 1.3) * 0.08, z);
        points.push(x + 0.46, -0.85 + Math.sin((x + 0.46) * 1.3) * 0.08, z);
      }
    }
    for (let x = -2.3; x <= 2.3; x += 0.46) {
      points.push(x, -0.85 + Math.sin(x * 1.3) * 0.08, -0.9);
      points.push(x, -0.85 + Math.sin(x * 1.3) * 0.08, 0.9);
    }
    return new Float32Array(points);
  }, []);

  return (
    <group ref={groupRef} scale={0} position={[0, -0.2, 0]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[geometry, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#5bafdf" transparent opacity={0.5} />
      </lineSegments>
      <mesh position={[0.08, 0.06, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 1.85, 8]} />
        <meshBasicMaterial color="#aedaff" />
      </mesh>
      <mesh position={[0.08, -0.86, 0]}>
        <torusGeometry args={[0.34, 0.012, 6, 48]} />
        <meshBasicMaterial color="#55c9dd" transparent opacity={0.74} />
      </mesh>
      <mesh position={[0.08, -0.86, 0]}>
        <torusGeometry args={[0.58, 0.006, 6, 48]} />
        <meshBasicMaterial color="#55c9dd" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function UniverseWorld({
  input,
  reducedMotion,
  lowPower,
  locale,
}: {
  input: MutableRefObject<UniverseInput>;
  reducedMotion: boolean;
  lowPower: boolean;
  locale: "ar" | "en";
}) {
  const camera = useThree((state) => state.camera);
  const core = useRef<THREE.Group>(null);
  const systems = useRef<THREE.Group>(null);
  const intelligence = useRef<THREE.Group>(null);
  const security = useRef<THREE.Group>(null);
  const oil = useRef<THREE.Group>(null);
  const keyLight = useRef<THREE.PointLight>(null);
  const fillLight = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    const easing = 1 - Math.exp(-Math.min(delta, 0.05) * 3.5);
    const pointerX = reducedMotion ? 0 : input.current.pointerX;
    const pointerY = reducedMotion ? 0 : input.current.pointerY;
    const initialCoreX = locale === "ar" ? -1.65 : 1.65;
    const convergence = input.current.convergence;

    if (core.current) {
      core.current.position.x = THREE.MathUtils.damp(core.current.position.x, THREE.MathUtils.lerp(initialCoreX, 0, convergence), 2.2, delta);
      core.current.position.y = THREE.MathUtils.damp(core.current.position.y, -input.current.engineering * 0.3, 2.2, delta);
      core.current.rotation.z = THREE.MathUtils.damp(core.current.rotation.z, input.current.coreOpen * 0.16, 2, delta);
    }
    if (systems.current) {
      systems.current.scale.setScalar(THREE.MathUtils.damp(systems.current.scale.x, input.current.systems * (1 - convergence * 0.48), 2.6, delta));
      systems.current.rotation.y = THREE.MathUtils.damp(systems.current.rotation.y, pointerX * 0.06 + convergence * Math.PI * 0.2, 2, delta);
    }
    if (intelligence.current) {
      intelligence.current.scale.setScalar(THREE.MathUtils.damp(intelligence.current.scale.x, input.current.ai * (1 - convergence * 0.4), 2, delta));
      intelligence.current.rotation.y = THREE.MathUtils.damp(intelligence.current.rotation.y, pointerX * 0.05 + convergence * Math.PI * 0.16, 2, delta);
    }
    if (security.current) {
      security.current.scale.setScalar(THREE.MathUtils.damp(security.current.scale.x, input.current.security * (1 - convergence * 0.36), 2, delta));
      security.current.rotation.y = THREE.MathUtils.damp(security.current.rotation.y, pointerX * 0.08 + convergence * Math.PI * 0.12, 2, delta);
    }
    if (oil.current) {
      oil.current.scale.setScalar(THREE.MathUtils.damp(oil.current.scale.x, input.current.engineering * (1 - convergence * 0.5), 2, delta));
      oil.current.position.y = THREE.MathUtils.damp(oil.current.position.y, -0.2 - input.current.engineering * 0.55, 2, delta);
    }
    if (keyLight.current) {
      keyLight.current.intensity = THREE.MathUtils.damp(keyLight.current.intensity, 1.05 + input.current.light * 0.65, 2.4, delta);
    }
    if (fillLight.current) {
      fillLight.current.intensity = THREE.MathUtils.damp(fillLight.current.intensity, 0.36 + input.current.ai * 0.35 + input.current.security * 0.18, 2.2, delta);
    }
    const targetCamera = new THREE.Vector3(
      input.current.cameraX + pointerX * 0.16,
      input.current.cameraY - pointerY * 0.1,
      input.current.cameraZ,
    );
    camera.position.lerp(targetCamera, easing);
    camera.lookAt(0, -input.current.engineering * 0.7, 0);
  });

  return (
    <>
      <ambientLight intensity={0.38} />
      <pointLight ref={keyLight} position={[3, 3, 4]} color="#3b83d8" intensity={1.4} distance={12} />
      <pointLight ref={fillLight} position={[-3, -2, -3]} color="#27698e" intensity={0.8} distance={10} />
      <Float
        speed={reducedMotion ? 0 : 0.4}
        rotationIntensity={reducedMotion ? 0 : 0.03}
        floatIntensity={reducedMotion ? 0 : 0.12}
      >
        <group ref={core} position={[locale === "ar" ? -1.65 : 1.65, 0, 0]}>
          <OrbitalCore reducedMotion={reducedMotion} input={input} />
        </group>
      </Float>
      <BusinessSystems groupRef={systems} input={input} reducedMotion={reducedMotion} />
      <IntelligenceNetwork groupRef={intelligence} />
      <SecurityField groupRef={security} input={input} />
      <OilFieldIntelligence groupRef={oil} />
      <AmbientParticles count={lowPower ? 180 : 620} reducedMotion={reducedMotion} input={input} />
    </>
  );
}

export function DigitalUniverseScene({
  input,
  reducedMotion,
  lowPower,
  locale,
  pageVisible,
}: {
  input: MutableRefObject<UniverseInput>;
  reducedMotion: boolean;
  lowPower: boolean;
  locale: "ar" | "en";
  pageVisible: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.3], fov: 36, near: 0.1, far: 100 }}
      frameloop={pageVisible ? "always" : "never"}
      dpr={lowPower ? 1 : [1, 1.5]}
      gl={{ alpha: true, antialias: !lowPower, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        gl.setClearColor("#06101d", 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
    >
      <UniverseWorld input={input} reducedMotion={reducedMotion} lowPower={lowPower} locale={locale} />
    </Canvas>
  );
}
