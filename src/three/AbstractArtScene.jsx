import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export function AbstractArtScene() {
  const outerGroup = useRef();
  const innerMesh = useRef();
  const torusRef = useRef();
  const particlesRef = useRef();

  // Create subtle particle cloud data
  const count = 180;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 8;
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mouse = state.pointer;

    if (outerGroup.current) {
      outerGroup.current.rotation.y = THREE.MathUtils.lerp(
        outerGroup.current.rotation.y,
        mouse.x * 0.5 + time * 0.05,
        0.05
      );
      outerGroup.current.rotation.x = THREE.MathUtils.lerp(
        outerGroup.current.rotation.x,
        -mouse.y * 0.5,
        0.05
      );
    }

    if (innerMesh.current) {
      innerMesh.current.rotation.x = time * 0.2;
      innerMesh.current.rotation.z = time * 0.15;
    }

    if (torusRef.current) {
      torusRef.current.rotation.y = -time * 0.1;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <group ref={outerGroup} position={[0, 0, 0]}>
      {/* Central Floating Morphing Geometry */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh ref={innerMesh} scale={1.3}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            roughness={0.1}
            clearcoat={0.9}
            clearcoatRoughness={0.1}
            transmission={0.8}
            ior={1.2}
            chromaticAberration={0.04}
            distortion={0.2}
            distortionScale={0.2}
            temporalDistortion={0.1}
            color="#111111"
          />
        </mesh>
      </Float>

      {/* Orbiting Minimal Wireframe Torus Ring */}
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.5}>
        <mesh ref={torusRef} scale={1.8}>
          <torusGeometry args={[1.2, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#222222"
            metalness={0.8}
            roughness={0.2}
            wireframe
          />
        </mesh>
      </Float>

      {/* Interactive Particle Atmosphere */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#333333"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export default AbstractArtScene;
