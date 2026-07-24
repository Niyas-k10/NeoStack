import { Bloom, EffectComposer } from "@react-three/postprocessing";

function Effects() {
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom
        intensity={0.12}
        luminanceThreshold={0.9}
        luminanceSmoothing={0.45}
        mipmapBlur
      />
    </EffectComposer>
  );
}

export default Effects;
