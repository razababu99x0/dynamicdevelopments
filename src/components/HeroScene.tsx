import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Grid } from "@react-three/drei";
import * as THREE from "three";

/* window-level pointer (normalized -1..1) */
const pointer = { x: 0, y: 0 };
let listening = false;
function ensurePointerListener() {
  if (listening) return;
  listening = true;
  window.addEventListener("mousemove", (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });
}

/* ---------------------------------------------------------------- */
/*  Digital core — IDEA → CODE → EXPERIENCE                          */
/* ---------------------------------------------------------------- */
function DigitalCore() {
  const inner = useRef<THREE.Mesh>(null);
  const wireA = useRef<THREE.Mesh>(null);
  const wireB = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (inner.current) {
      inner.current.rotation.y += delta * 0.18;
      inner.current.rotation.x = Math.sin(t * 0.24) * 0.14;
    }
    if (wireA.current) { wireA.current.rotation.y -= delta * 0.1; wireA.current.rotation.z += delta * 0.05; }
    if (wireB.current) { wireB.current.rotation.y += delta * 0.06; wireB.current.rotation.x -= delta * 0.04; }
  });

  return (
    <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.9}>
      <group>
        <mesh ref={inner}>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial
            color="#0b1430" metalness={0.9} roughness={0.2}
            emissive="#25e3ff" emissiveIntensity={0.09} flatShading
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.42, 24, 24]} />
          <meshBasicMaterial color="#c8ff32" transparent opacity={0.92} />
        </mesh>
        <pointLight color="#c8ff32" intensity={16} distance={7} />
        <mesh ref={wireA}>
          <icosahedronGeometry args={[1.62, 1]} />
          <meshBasicMaterial color="#25e3ff" wireframe transparent opacity={0.26} />
        </mesh>
        <mesh ref={wireB}>
          <icosahedronGeometry args={[2.05, 0]} />
          <meshBasicMaterial color="#8b5cff" wireframe transparent opacity={0.15} />
        </mesh>
      </group>
    </Float>
  );
}

/* ---------------------------------------------------------------- */
/*  Pixel cubes — the logo's pixels, alive in 3D                      */
/* ---------------------------------------------------------------- */
function PixelCubes({ count = 30 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const cubesRef = useRef<THREE.Mesh[]>([]);

  const cubes = useMemo(() => {
    const palette = ["#25e3ff", "#3d8bff", "#2f5cff", "#8b5cff", "#f4f8ff", "#c8ff32", "#6fbeff"];
    return Array.from({ length: count }, (_, i) => {
      const r = 2.7 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      return {
        pos: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.72,
          r * Math.cos(phi),
        ] as [number, number, number],
        size: 0.07 + Math.random() * 0.13,
        color: palette[Math.random() < 0.1 ? 5 : Math.floor(Math.random() * (palette.length - 1))],
        speed: 0.3 + Math.random() * 0.9,
        axis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
        key: i,
      };
    });
  }, [count]);

  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.05;
    const t = state.clock.elapsedTime;
    if (spin.current) {
      spin.current.rotation.x = Math.sin(t * 0.12) * 0.2;
      spin.current.rotation.z = Math.cos(t * 0.1) * 0.12;
    }
    cubesRef.current.forEach((m, i) => {
      if (m) {
        m.rotation.x += delta * cubes[i].speed * 0.7;
        m.rotation.y += delta * cubes[i].speed;
        const pulse = 1 + Math.sin(t * 1.6 + i * 1.3) * 0.12;
        m.scale.setScalar(pulse);
      }
    });
  });

  return (
    <group ref={spin}>
      <group ref={group}>
        {cubes.map((c, i) => (
          <mesh
            key={c.key}
            ref={(m) => { if (m) cubesRef.current[i] = m; }}
            position={c.pos}
          >
            <boxGeometry args={[c.size, c.size, c.size]} />
            <meshStandardMaterial
              color={c.color}
              emissive={c.color}
              emissiveIntensity={c.color === "#c8ff32" ? 0.7 : 0.45}
              roughness={0.25}
              metalness={0.4}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ---------------------------------------------------------------- */
/*  Particle universe                                                */
/* ---------------------------------------------------------------- */
function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#25e3ff"),
      new THREE.Color("#c8ff32"),
      new THREE.Color("#3d8bff"),
      new THREE.Color("#8b5cff"),
      new THREE.Color("#f4f8ff"),
    ];
    for (let i = 0; i < count; i++) {
      const r = 2.4 + Math.random() * 3.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y += delta * 0.045;
      ref.current.rotation.x = Math.sin(t * 0.1) * 0.06;
    }
    if (group.current) {
      const targetY = pointer.x * 0.32;
      const targetX = -pointer.y * 0.18;
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.035;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.035;
    }
  });

  return (
    <group ref={group}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045} vertexColors transparent opacity={0.85}
          depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation
        />
      </points>
    </group>
  );
}

/* ---------------------------------------------------------------- */
/*  Orbital rings                                                    */
/* ---------------------------------------------------------------- */
function Rings() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (a.current) a.current.rotation.z += delta * 0.1;
    if (b.current) b.current.rotation.z -= delta * 0.07;
  });
  return (
    <group rotation={[1.15, 0.2, 0]}>
      <mesh ref={a}>
        <torusGeometry args={[2.75, 0.006, 8, 120]} />
        <meshBasicMaterial color="#c8ff32" transparent opacity={0.4} />
      </mesh>
      <mesh ref={b} rotation={[0.5, 0.3, 0]}>
        <torusGeometry args={[3.3, 0.005, 8, 120]} />
        <meshBasicMaterial color="#25e3ff" transparent opacity={0.24} />
      </mesh>
    </group>
  );
}

/* ---------------------------------------------------------------- */
/*  Scene rig                                                        */
/* ---------------------------------------------------------------- */
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!group.current) return;
    const ty = pointer.x * 0.22;
    const tx = pointer.y * 0.1;
    group.current.rotation.y += (ty - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (tx - group.current.rotation.x) * 0.04;
  });
  return <group ref={group}>{children}</group>;
}

export default function HeroScene() {
  useEffect(() => { ensurePointerListener(); }, []);
  const light = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0.5, 6.6], fov: 42 }}
        dpr={[1, light ? 1.25 : 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#060a18", 9, 19]} />
        <ambientLight intensity={0.22} />
        {/* cyan key · lime rim · violet fill · royal back */}
        <pointLight position={[-5, 2.5, 3]} color="#25e3ff" intensity={60} distance={16} decay={2} />
        <pointLight position={[5, 1.5, 2]} color="#c8ff32" intensity={42} distance={14} decay={2} />
        <pointLight position={[0, -3, -4]} color="#8b5cff" intensity={52} distance={16} decay={2} />
        <pointLight position={[3, 4, -2]} color="#2f5cff" intensity={40} distance={15} decay={2} />

        <ParallaxRig>
          <DigitalCore />
          <PixelCubes count={light ? 14 : 32} />
          <Rings />
          <Particles count={light ? 200 : 500} />
          {!light && (
            <Grid
              position={[0, -2.6, 0]}
              args={[34, 34]}
              cellSize={0.65} cellColor="#15224a" cellThickness={0.6}
              sectionSize={3.2} sectionColor="#25e3ff" sectionThickness={1}
              fadeDistance={20} fadeStrength={2.6} infiniteGrid
            />
          )}
        </ParallaxRig>
      </Canvas>
    </div>
  );
}
