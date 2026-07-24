import { Float } from "@react-three/drei";
import LaptopModel from "./LaptopModel";

function DeveloperDesk() {
  return (
    <Float

speed={1.5}

rotationIntensity={0.6}

floatIntensity={1.2}

floatingRange={[-0.2,0.2]}

>
      <LaptopModel />
    </Float>
  );
}

export default DeveloperDesk;