import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";

const keywords = [
  "Products",
  "Brands",
  "Websites",
  "Posters",
  "Businesses",
  "Resumes",
];

function HeroContent() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % keywords.length);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative z-10 flex flex-col items-start w-full max-w-full">
      {/* Studio Status Pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="inline-flex items-center gap-2.5 sm:gap-3 rounded-full border border-[#ECECEC] bg-white/80 px-3.5 sm:px-4 py-1.5 backdrop-blur-md max-w-full"
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-black" />
        </span>
        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#555555] truncate">
          BUILD • SCALE • EVOLVE
        </span>
      </motion.div>

      {/* Hero Headline */}
      <div className="mt-6 sm:mt-10 md:mt-12 w-full font-display font-light text-black tracking-[-0.04em] uppercase">
        <h1 className="text-[3.25rem] xs:text-[4rem] sm:text-[6rem] md:text-[7.5rem] lg:text-[8.5rem] xl:text-[10rem] leading-[0.92] flex flex-col items-start gap-y-1 sm:gap-y-3 font-semibold">
          <span className="font-normal text-black shrink-0">We Build</span>

          {/* Morphing Keyword Container */}
          <span className="relative inline-block overflow-hidden py-0.5 sm:py-1 w-full max-w-full min-h-[1.1em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={keywords[index]}
                initial={{ y: 45, opacity: 0, filter: "blur(8px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -45, opacity: 0, filter: "blur(8px)" }}
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block italic font-serif font-light text-[#111111] max-w-full text-balance"
              >
                {keywords[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>
      </div>

      {/* Editorial Sub-Paragraph Under Heading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 sm:mt-8 md:mt-10 max-w-2xl text-sm sm:text-base md:text-xl font-light leading-relaxed text-[#444444] text-balance"
      >
        NeoStack Studio designs and builds ultra-responsive web applications, modern static platforms, bespoke brand identities, and high-conversion digital experiences.
      </motion.p>

      {/* Action CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 sm:mt-12 md:mt-14 flex flex-col sm:flex-row items-stretch sm:items-center justify-between w-full border-t border-[#ECECEC] pt-6 sm:pt-8 gap-4"
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <a
            href="#vision"
            className="group flex items-center justify-center gap-3 rounded-full bg-black px-7 sm:px-8 py-3.5 sm:py-4 min-h-[48px] text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#222222] active:scale-[0.98] w-full sm:w-auto text-center"
          >
            <span>Explore Vision</span>
            <HiArrowUpRight className="text-sm transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
          <a
            href="#portfolio"
            className="group flex items-center justify-center gap-3 rounded-full border border-[#ECECEC] bg-white px-7 sm:px-8 py-3.5 sm:py-4 min-h-[48px] text-xs font-medium uppercase tracking-widest text-black transition-all duration-300 hover:border-black active:scale-[0.98] w-full sm:w-auto text-center"
          >
            <span>Selected Works</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default HeroContent;
