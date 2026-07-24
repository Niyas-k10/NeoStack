import { useThree } from "@react-three/fiber";
import { useMemo } from "react";
import AbstractArtScene from "./AbstractArtScene";

function ResponsiveScene() {
  const { size } = useThree();

  const config = useMemo(() => {
    const w = size.width;

    if (w < 380) {
      return { scale: 0.75, position: [0, 0, 0] };
    }
    if (w < 640) {
      return { scale: 0.85, position: [0, 0, 0] };
    }
    if (w < 1024) {
      return { scale: 0.95, position: [0, 0, 0] };
    }
    return { scale: 1.1, position: [0, 0, 0] };
  }, [size.width]);

  return (
    <group position={config.position} scale={config.scale}>
      <AbstractArtScene />
    </group>
  );
}

export default ResponsiveScene;
