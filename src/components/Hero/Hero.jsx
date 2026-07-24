import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroContent from "./HeroContent";
import HeroDustCanvas from "./HeroDustCanvas";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const lineRef1 = useRef(null);
  const lineRef2 = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle scroll-driven geometric line reaction
      if (lineRef1.current) {
        gsap.to(lineRef1.current, {
          strokeDashoffset: -200,
          rotate: 15,
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (lineRef2.current) {
        gsap.to(lineRef2.current, {
          scaleX: 1.4,
          opacity: 0.6,
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (circleRef.current) {
        gsap.to(circleRef.current, {
          y: -60,
          scale: 1.15,
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] sm:min-h-[92vh] overflow-hidden bg-transparent text-black pt-24 sm:pt-28 pb-12 sm:pb-20 flex flex-col justify-between"
    >
      {/* Floating Ambient Dust Particle System */}
      <HeroDustCanvas />

      {/* Floating Geometric Accents (Hidden on Mobile for performance) */}
      <div className="absolute right-12 top-1/3 w-[300px] h-[300px] pointer-events-none z-0 hidden lg:block opacity-30 select-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <line
            ref={lineRef1}
            x1="20"
            y1="20"
            x2="180"
            y2="180"
            stroke="#000000"
            strokeWidth="0.75"
            strokeDasharray="4 4"
          />
          <circle
            ref={circleRef}
            cx="140"
            cy="60"
            r="35"
            stroke="#000000"
            strokeWidth="0.5"
            fill="none"
          />
          <line
            ref={lineRef2}
            x1="0"
            y1="100"
            x2="200"
            y2="100"
            stroke="#888888"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 my-auto">
        <HeroContent />
      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 flex justify-between items-center text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#777777] border-t border-[#ECECEC] pt-4">
        <span>01 / OVERVIEW</span>
        <div className="hidden xs:flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
          <span>SCROLL TO DISCOVER</span>
        </div>
        <span>KERALA, INDIA</span>
      </div>
    </section>
  );
}

export default Hero;
