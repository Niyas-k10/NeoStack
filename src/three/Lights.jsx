import { Environment } from "@react-three/drei";

function Lights({ enableShadows = true }) {
  return (
    <>
      <ambientLight intensity={0.45} color="#e2e8f0" />

      <directionalLight
        position={[4.5, 6, 4]}
        intensity={1.55}
        color="#ffffff"
        castShadow={enableShadows}
        shadow-mapSize={enableShadows ? [1024, 1024] : undefined}
      />

      <directionalLight
        position={[-3.5, 2, -2]}
        intensity={0.4}
        color="#8B5CF6"
      />

      <pointLight
        position={[0, 2.2, 2.8]}
        intensity={0.9}
        color="#3B82F6"
        distance={12}
      />

      <Environment preset="city" environmentIntensity={0.45} />
    </>
  );
}

export default Lights;
