import { Suspense } from "react";
import Lights from "./Lights";
import ResponsiveScene from "./ResponsiveScene";
import Effects from "./Effects";

function Scene({ enableEffects = true }) {
  return (
    <>
      <Lights enableShadows={enableEffects} />
      <Suspense fallback={null}>
        <ResponsiveScene softShadows={enableEffects} />
      </Suspense>
      {enableEffects ? <Effects /> : null}
    </>
  );
}

export default Scene;
