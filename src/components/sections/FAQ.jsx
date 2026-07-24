import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlus, HiMinus } from "react-icons/hi2";
import faq from "../../data/faq";

function FAQ() {
  const [active, setActive] = useState(1);

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-white text-black py-20 sm:py-32 md:py-36 border-t border-[#ECECEC]"
    >
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-40" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#ECECEC] pb-8 sm:pb-12 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#777777]">
              06 / FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="mt-3 sm:mt-4 font-display text-3xl sm:text-5xl font-light tracking-tight text-black leading-[1.05]">
              Everything you need to know <br className="hidden sm:inline" />
              <span className="italic font-serif font-light text-[#444444]">about working with NeoStack.</span>
            </h2>
          </div>
        </div>

        {/* Editorial Accordion */}
        <div className="mt-8 sm:mt-12 space-y-3 sm:space-y-4">
          {faq.map((item) => {
            const isOpen = active === item.id;

            return (
              <div
                key={item.id}
                className="group border-b border-[#ECECEC] py-5 sm:py-6 transition-colors duration-300"
              >
                <button
                  type="button"
                  onClick={() => setActive(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 text-left min-h-[48px] focus:outline-none"
                >
                  <span className="font-display text-lg sm:text-2xl font-light text-black group-hover:text-black leading-snug">
                    {item.question}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 min-touch items-center justify-center rounded-full border border-[#ECECEC] text-sm text-black transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white">
                    {isOpen ? <HiMinus /> : <HiPlus />}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 sm:mt-4 max-w-3xl text-xs sm:text-base font-light leading-relaxed text-[#555555]">
                        {item.answer}
                      </p>
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

export default FAQ;
