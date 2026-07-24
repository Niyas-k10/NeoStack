import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

const testimonials = [
  {
    id: "01",
    quote:
      "NeoStack transformed our entire digital presence. The 3D WebGL interactions and lightning performance elevated our brand to compete globally with top Silicon Valley studios.",
    author: "Alexander Wright",
    title: "Chief Product Officer",
    company: "Voyago Global",
  },
  {
    id: "02",
    quote:
      "Working with NeoStack feels like partnering with a world-class creative technology laboratory. No corporate fluff, just pure architectural precision and breathtaking execution.",
    author: "Elena Rostova",
    title: "VP of Engineering",
    company: "Aetheria Audio",
  },
  {
    id: "03",
    quote:
      "Their mastery over GSAP animation, Three.js shaders, and custom React architecture is unparalleled. They delivered an award-winning site in record time.",
    author: "Marcus Chen",
    title: "Founder & CEO",
    company: "PrisonEye Systems",
  },
];

function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[index];

  return (
    <section
      id="testimonials"
      className="dark-section relative overflow-hidden bg-[#0A0A0A] text-white py-28 sm:py-36 border-t border-white/10"
    >
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-20" />
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-white/5 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-12 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#777777]">
              08 / TESTIMONIALS & RECOGNITION
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl font-light tracking-tight text-white">
              Endorsements from <br />
              <span className="text-[#888888] italic font-serif">visionary founders.</span>
            </h2>
          </div>
        </div>

        {/* Editorial Storytelling Quote Slider */}
        <div className="mt-16 sm:mt-24 min-h-[280px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl"
            >
              <p className="font-display text-2xl sm:text-4xl md:text-5xl font-light leading-snug text-gray-100 tracking-tight">
                “{current.quote}”
              </p>

              <div className="mt-12 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center font-mono text-sm text-white">
                  {current.id}
                </div>
                <div>
                  <h3 className="font-display text-lg font-light text-white">
                    {current.author}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-[#777777]">
                    {current.title} — {current.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-8">
            <span className="font-mono text-xs text-[#777777]">
              0{index + 1} / 0{testimonials.length}
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:bg-white hover:text-black"
                aria-label="Previous testimonial"
              >
                <HiArrowLeft />
              </button>
              <button
                type="button"
                onClick={next}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:bg-white hover:text-black"
                aria-label="Next testimonial"
              >
                <HiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
