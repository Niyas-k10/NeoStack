function HeroScene() {
  return (
    <div className="hero-scene relative flex items-center justify-center">
      {/* Glow */}

      <div className="absolute h-[520px] w-[520px] rounded-full bg-yellow-500/10 blur-[160px]" />

      {/* Outer Ring */}

      <div className="absolute h-[520px] w-[520px] rounded-full border border-white/5" />

      {/* Middle Ring */}

      <div className="absolute h-[420px] w-[420px] rounded-full border border-yellow-500/10" />

      {/* Laptop */}

      <div className="relative z-10">

        {/* Shadow */}

        <div className="absolute left-1/2 top-full h-10 w-72 -translate-x-1/2 rounded-full bg-black/50 blur-2xl" />

        {/* Screen */}

        <div className="rounded-[28px] border border-white/10 bg-[#111111] p-4 shadow-[0_0_80px_rgba(245,183,0,0.08)]">

          <div className="flex h-[250px] w-[430px] items-center justify-center rounded-2xl border border-white/10 bg-[#050505]">

            <div className="text-center">

              <h2 className="text-3xl font-bold text-white">
                NeoStack
              </h2>

              <p className="mt-3 text-gray-500">
                React
                <br />
                Three.js
                <br />
                GSAP
              </p>

            </div>

          </div>

        </div>

        {/* Keyboard */}

        <div className="mx-auto h-4 w-[470px] rounded-b-full bg-[#202020]" />

      </div>

      {/* Floating Dots */}

      <div className="floating-dot absolute left-16 top-12 h-4 w-4 rounded-full bg-yellow-400 shadow-[0_0_30px_rgba(245,183,0,.9)]" />

      <div className="absolute right-12 top-28 h-3 w-3 rounded-full bg-yellow-400 shadow-[0_0_25px_rgba(245,183,0,.9)]" />

      <div className="absolute bottom-16 left-28 h-3 w-3 rounded-full bg-yellow-500 shadow-[0_0_25px_rgba(245,183,0,.9)]" />

      <div className="absolute bottom-8 right-20 h-4 w-4 rounded-full bg-yellow-400 shadow-[0_0_30px_rgba(245,183,0,.9)]" />

    </div>
  );
}

export default HeroScene;