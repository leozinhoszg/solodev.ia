import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { detectLowEnd } from "./detectLowEnd";

/* ─────────── Shaders ─────────── */

const starVertex = /* glsl */ `
  attribute float aSize;
  attribute float aOffset;
  attribute vec3 aColor;

  varying vec3 vColor;
  varying float vAlpha;

  uniform float uTime;

  void main() {
    vColor = aColor;

    vec3 pos = position;
    // gentle drift
    pos.y += sin(uTime * 0.25 + aOffset * 10.0) * 0.05;
    pos.x += cos(uTime * 0.18 + aOffset * 8.0) * 0.03;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    // keep stars small: multiplier 70 / depth — capped visually by aSize
    gl_PointSize = aSize * (70.0 / -mvPosition.z);

    // subtle twinkle (0.15 to 0.5)
    vAlpha = 0.15 + 0.35 * (0.5 + 0.5 * sin(uTime * 1.4 + aOffset * 16.0));
  }
`;

const starFragment = /* glsl */ `
  precision highp float;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float glow = smoothstep(0.5, 0.0, d);
    glow = pow(glow, 2.0);
    gl_FragColor = vec4(vColor, glow * vAlpha);
  }
`;

/* ─────────── Starfield ─────────── */

function StarField({ count }: { count: number }) {
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const offsets = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color("#d8b4fe"),
      new THREE.Color("#c4b5fd"),
      new THREE.Color("#a78bfa"),
      new THREE.Color("#ddd6fe"),
      new THREE.Color("#8b5cf6"),
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      // push stars further back so they read as distant — reduces apparent size
      positions[i * 3 + 2] = -Math.random() * 8 - 5;

      sizes[i] = 0.25 + Math.random() * 0.75;
      offsets[i] = Math.random();

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    g.setAttribute("aOffset", new THREE.BufferAttribute(offsets, 1));
    g.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [count]);

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
  });

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return (
    <points geometry={geometry}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={starVertex}
        fragmentShader={starFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─────────── Mouse parallax ─────────── */

function MouseParallax({ strength = 0.3 }: { strength?: number }) {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame(() => {
    camera.position.x += (target.current.x * strength - camera.position.x) * 0.04;
    camera.position.y += (-target.current.y * strength * 0.6 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ─────────── Public component ─────────── */

export default function LoginSceneBackground() {
  const [isLowEnd] = useState(() => detectLowEnd());

  if (isLowEnd) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "default",
        }}
      >
        <StarField count={180} />
        <MouseParallax strength={0.35} />
      </Canvas>
    </div>
  );
}
