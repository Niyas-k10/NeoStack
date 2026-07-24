import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";

const keywords = [
  "Products",
  "Brands",
  "Websites",
  "Experiences",
  "Businesses",
  "Digital Futures",
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
    <div className="relative z-10 flex flex-col items-start w-full">
      {/* Studio Status Pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="inline-flex items-center gap-3 rounded-full border border-[#ECECEC] bg-white/70 px-4 py-1.5 backdrop-blur-md"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-black" />
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-[#555555]">
          CREATIVE DIRECTION
        </span>
      </motion.div>

      {/* Large Modern Hero Headline: Constant Sentence + Morphing Keyword Under WE BUILD */}
      <div className="mt-8 sm:mt-12 w-full font-display font-light text-black tracking-[-0.05em] uppercase">
        <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem] leading-[0.92] flex flex-col items-start gap-y-2 sm:gap-y-4">
          <span className="font-normal text-black shrink-0">We Build</span>
          
          {/* Morphing Keyword Container under WE BUILD */}
          <span className="relative inline-block overflow-hidden py-1 min-w-[280px] xs:min-w-[340px] sm:min-w-[480px] md:min-w-[600px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={keywords[index]}
                initial={{ y: 50, opacity: 0, filter: "blur(12px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -50, opacity: 0, filter: "blur(12px)" }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block italic font-serif font-light text-[#222222]"
              >
                {keywords[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>
      </div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 sm:mt-16 flex items-center justify-between w-full border-t border-[#ECECEC] pt-8"
      >
        <div className="flex items-center gap-4">
          <a
            href="#vision"
            className="group flex items-center gap-3 rounded-full bg-black px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#222222] hover:scale-105"
          >
            <span>Explore Vision</span>
            <HiArrowUpRight className="text-sm transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default HeroContent;
