import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import process from "../../data/process";

gsap.registerPlugin(ScrollTrigger);

function Process() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 70%",
              scrub: true,
            },
          }
        );
      }

      gsap.utils.toArray(".process-step").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative overflow-hidden bg-white text-black py-20 sm:py-32 md:py-36 border-t border-[#ECECEC]"
    >
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#ECECEC] pb-8 sm:pb-12 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#777777]">
              05 / WORKFLOW & METHODOLOGY
            </span>
            <h2 className="section-heading mt-3 sm:mt-4 font-display font-light tracking-tight text-black max-w-3xl md:text-6xl lg:text-7xl md:leading-[1.05]">
              From initial discovery to <br className="hidden sm:inline" />
              <span className="italic font-serif font-light text-[#444444]">cinematic launch.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-base font-light leading-relaxed text-[#555555] text-balance">
            Our battle-tested studio process guarantees architectural rigor, visual perfection, and complete operational transparency.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative mt-10 sm:mt-16 md:mt-24">
          {/* Central Vertical Line (Hidden on small mobile) */}
          <div className="absolute left-6 md:left-1/2 top-0 h-full w-[2px] bg-[#ECECEC] -translate-x-1/2 hidden sm:block">
            <div
              ref={lineRef}
              className="h-full w-full bg-black origin-top"
            />
          </div>

          <div className="space-y-6 sm:space-y-14 md:space-y-20">
            {process.map((step, index) => (
              <div
                key={step.id}
                className={`process-step relative flex flex-col md:flex-row items-start justify-between gap-5 md:gap-8 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Step Card */}
                <div className="w-full md:w-[46%] rounded-2xl sm:rounded-3xl border border-[#ECECEC] bg-[#F9F9FB] p-5 sm:p-7 md:p-9 transition-all duration-300 hover:border-black hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center justify-between border-b border-[#ECECEC] pb-3 sm:pb-4">
                    <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#777777]">
                      PHASE {step.id}
                    </span>
                    <span className="font-mono text-base sm:text-lg md:text-xl font-light text-black">
                      {step.id}
                    </span>
                  </div>

                  <h3 className="mt-4 sm:mt-6 font-display text-lg sm:text-2xl md:text-3xl font-light text-black tracking-tight">
                    {step.title}
                  </h3>

                  <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base font-light leading-relaxed text-[#555555]">
                    {step.description}
                  </p>
                </div>

                {/* Center Node Indicator */}
                <div className="hidden sm:flex absolute left-1/2 top-10 -translate-x-1/2 h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-white z-10">
                  <span className="h-2 w-2 rounded-full bg-black" />
                </div>

                <div className="hidden md:block w-[46%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Process;
