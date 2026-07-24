import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const fullParagraph =
  "At NeoStack, we help businesses establish a strong digital presence through clean design, modern technology, and reliable web solutions. We believe every business deserves a fast, beautiful, and accessible website that supports long-term growth.";

function OurVision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!isInView) return;

    let index = 0;
    // High speed typing effect: 10ms per character for fast snappy reveal
    const interval = setInterval(() => {
      if (index < fullParagraph.length) {
        setDisplayedText(fullParagraph.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section
      id="vision"
      className="dark-section relative w-full overflow-hidden bg-black text-white py-16 sm:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Immersive & Cinematic Background Image Container */}
        <div className="relative min-h-[70vh] sm:min-h-[80vh] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl flex items-center justify-center">
          {/* Crisp Background Image (NO BLUR!) occupying the entire container */}
          <img
            src="/images/frame_178.png"
            alt="NeoStack Vision Studio Visual"
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 scale-[1.01] hover:scale-[1.03]"
          />

          {/* Subtle Dark Overlay for contrast readability (NO backdrop blur) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/35" />

          {/* Overlaid Editorial Content Directly On Top of Image */}
          <div
            ref={ref}
            className="relative z-10 max-w-4xl px-6 py-16 sm:px-12 sm:py-24 text-center flex flex-col items-center"
          >
            {/* Section Tag */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-gray-300 border border-white/20 rounded-full px-4 py-1.5 bg-black/40 mb-8"
            >
              02 / OUR VISION
            </motion.span>

            {/* Large Bold Editorial White Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-bold tracking-tight text-white uppercase"
            >
              OUR VISION
            </motion.h2>

            {/* High-Speed Snappy Typing Style Paragraph Reveal */}
            <div className="mt-8 text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-gray-200 max-w-3xl min-h-[5em]">
              <span>{displayedText}</span>
              {displayedText.length < fullParagraph.length && (
                <span className="inline-block w-2 h-5 bg-white ml-1 animate-pulse align-middle" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurVision;
