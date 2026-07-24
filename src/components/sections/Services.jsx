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
      className="relative overflow-hidden bg-white text-black py-32 sm:py-44"
    >
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#ECECEC] pb-12 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#777777]">
              03 / CAPABILITIES & ARCHITECTURE
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-black max-w-3xl">
              Precision services built for <br />
              <span className="italic font-serif font-light text-[#444444]">digital excellence.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base font-light leading-relaxed text-[#555555]">
            Explore our specialized disciplines engineered to elevate web apps, digital identities, and computational interactions.
          </p>
        </div>

        {/* Accordion List (Click to expand only, max 1 open at a time) */}
        <div className="mt-12">
          {services.map((item) => {
            const isOpen = activeService === item.id;

            return (
              <div
                key={item.id}
                onClick={() => toggleService(item.id)}
                className="group border-b border-[#ECECEC] py-8 sm:py-10 cursor-pointer select-none"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="font-mono text-base sm:text-lg font-light text-[#777777] group-hover:text-black transition-colors">
                      {item.id}
                    </span>
                    <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-black transition-transform duration-300 group-hover:translate-x-2">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="hidden lg:inline-block font-mono text-xs uppercase tracking-widest text-[#777777]">
                      {item.subtitle}
                    </span>
                    
                    {/* Rotating Plus/Minus Toggle Icon */}
                    <button
                      type="button"
                      aria-label="Toggle details"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ECECEC] text-lg text-black transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white"
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

                {/* Smooth Expand / Collapse Body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-8 pb-4 pl-0 md:pl-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                        <div className="md:col-span-6">
                          <p className="text-base sm:text-lg font-light leading-relaxed text-[#555555]">
                            {item.description}
                          </p>

                          {/* Deliverables Pills */}
                          <div className="mt-6 flex flex-wrap gap-2">
                            {item.deliverables.map((deliv, idx) => (
                              <span
                                key={idx}
                                className="rounded-full bg-[#F4F4F5] px-3.5 py-1 text-xs font-mono text-[#444444]"
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
                                className="rounded-full border border-[#ECECEC] px-3 py-1 font-mono text-xs uppercase text-[#777777]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <a
                            href="#contact"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-[#222222]"
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
