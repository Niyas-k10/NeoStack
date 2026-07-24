import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState } from "react";
import Scene from "./Scene";

function ResponsiveCamera() {
  const { camera, size } = useThree();

  const cameraZ = useMemo(() => {
    const w = size.width;
    if (w < 380) return 8.4;
    if (w < 640) return 7.9;
    if (w < 1024) return 7.5;
    return 7.1;
  }, [size.width]);

  useEffect(() => {
    camera.position.z = cameraZ;
    camera.updateProjectionMatrix();
  }, [camera, cameraZ]);

  return null;
}

function HeroCanvas() {
  const [dpr, setDpr] = useState(1.25);
  const [enableEffects, setEnableEffects] = useState(true);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      setEnableEffects(
        width >= 768 &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );

      if (width < 480) setDpr(Math.min(window.devicePixelRatio, 1.15));
      else if (width < 1024) setDpr(Math.min(window.devicePixelRatio, 1.35));
      else setDpr(Math.min(window.devicePixelRatio, 1.6));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      className="relative h-[240px] w-full xs:h-[280px] sm:h-[340px] md:h-[400px] lg:h-[480px] xl:h-[520px]"
      aria-hidden="true"
    >
      <Canvas
        dpr={dpr}
        shadows={enableEffects}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0.15, 7.4], fov: 30, near: 0.1, far: 100 }}
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <ResponsiveCamera />
        <Suspense fallback={null}>
          <Scene enableEffects={enableEffects} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default HeroCanvas;
