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
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
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
      className="relative overflow-hidden bg-white text-black py-28 sm:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#ECECEC] pb-12 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#777777]">
              05 / WORKFLOW & METHODOLOGY
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-black max-w-3xl">
              From initial discovery to <br />
              <span className="italic font-serif font-light text-[#444444]">cinematic launch.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base font-light leading-relaxed text-[#555555]">
            Our battle-tested studio process guarantees architectural rigor, visual perfection, and complete operational transparency.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative mt-16 sm:mt-24">
          {/* Animated Central Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 h-full w-[2px] bg-[#ECECEC] -translate-x-1/2 hidden sm:block">
            <div
              ref={lineRef}
              className="h-full w-full bg-black origin-top"
            />
          </div>

          <div className="space-y-12 sm:space-y-20">
            {process.map((step, index) => (
              <div
                key={step.id}
                className={`process-step relative flex flex-col md:flex-row items-start justify-between gap-8 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Step Card */}
                <div className="w-full md:w-[45%] rounded-3xl border border-[#ECECEC] bg-[#F9F9FB] p-8 sm:p-10 transition-all duration-300 hover:border-black hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center justify-between border-b border-[#ECECEC] pb-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#777777]">
                      PHASE {step.id}
                    </span>
                    <span className="font-mono text-xl font-light text-black">
                      {step.id}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl sm:text-3xl font-light text-black tracking-tight">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-sm sm:text-base font-light leading-relaxed text-[#555555]">
                    {step.description}
                  </p>
                </div>

                {/* Center Node Indicator */}
                <div className="hidden sm:flex absolute left-1/2 top-10 -translate-x-1/2 h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-white z-10">
                  <span className="h-2 w-2 rounded-full bg-black" />
                </div>

                <div className="hidden md:block w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Process;
