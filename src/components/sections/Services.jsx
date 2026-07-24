import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowUpRight, HiPlus } from "react-icons/hi2";
import services from "../../data/services";

function Services() {
  const [activeService, setActiveService] = useState(null);

  const toggleService = (id) => {
    setActiveService((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white text-black py-20 sm:py-32 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#ECECEC] pb-8 sm:pb-12 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#777777]">
              03 / CAPABILITIES & ARCHITECTURE
            </span>
            <h2 className="section-heading mt-3 sm:mt-4 font-display font-light tracking-tight text-black max-w-3xl md:text-7xl md:leading-[1.05]">
              Precision services built for <br className="hidden sm:inline" />
              <span className="italic font-serif font-light text-[#444444]">digital excellence.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-base font-light leading-relaxed text-[#555555]">
            Explore our specialized disciplines engineered to elevate web apps, digital identities, and computational interactions.
          </p>
        </div>

        {/* Accordion List */}
        <div className="mt-8 sm:mt-12">
          {services.map((item) => {
            const isOpen = activeService === item.id;

            return (
              <div
                key={item.id}
                onClick={() => toggleService(item.id)}
                className="group border-b border-[#ECECEC] py-6 sm:py-9 cursor-pointer select-none"
              >
                <div className="flex items-center justify-between gap-3 sm:gap-4 min-h-[48px]">
                  <div className="flex items-baseline gap-3 sm:gap-6 md:gap-8 min-w-0">
                    <span className="font-mono text-xs sm:text-base md:text-lg font-light text-[#777777] group-hover:text-black transition-colors shrink-0">
                      {item.id}
                    </span>
                    <h3 className="font-display text-lg sm:text-2xl md:text-4xl lg:text-5xl font-light tracking-tight text-black transition-transform duration-300 group-hover:translate-x-1 sm:group-hover:translate-x-2 leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-6 shrink-0">
                    <span className="hidden lg:inline-block font-mono text-xs uppercase tracking-widest text-[#777777]">
                      {item.subtitle}
                    </span>

                    {/* Plus/Minus Toggle Button */}
                    <button
                      type="button"
                      aria-label="Toggle service details"
                      className="flex h-10 w-10 min-touch items-center justify-center rounded-full border border-[#ECECEC] text-base sm:text-lg text-black transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white"
                    >
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="inline-block"
                      >
                        <HiPlus />
                      </motion.span>
                    </button>
                  </div>
                </div>

                {/* Expand / Collapse Body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 sm:pt-8 pb-3 pl-0 md:pl-16 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
                        <div className="md:col-span-6">
                          <p className="text-sm sm:text-lg font-light leading-relaxed text-[#555555]">
                            {item.description}
                          </p>

                          {/* Deliverables Pills */}
                          <div className="mt-5 sm:mt-6 flex flex-wrap gap-2">
                            {item.deliverables.map((deliv, idx) => (
                              <span
                                key={idx}
                                className="rounded-full bg-[#F4F4F5] px-3 sm:px-3.5 py-1 text-[11px] sm:text-xs font-mono text-[#444444]"
                              >
                                ✓ {deliv}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="md:col-span-6 flex flex-col md:items-end justify-between h-full gap-6">
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="rounded-full border border-[#ECECEC] px-3 py-1 font-mono text-[10px] sm:text-xs uppercase text-[#777777]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <a
                            href="#contact"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 min-h-[44px] text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-[#222222] active:scale-[0.98] w-full sm:w-auto"
                          >
                            <span>Initiate Brief</span>
                            <HiArrowUpRight />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
