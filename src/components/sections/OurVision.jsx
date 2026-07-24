import { motion } from "framer-motion";

const principles = [
  {
    num: "01",
    title: "Modern Design",
    description:
      "Bespoke aesthetics, fluid motion, and pixel-perfect editorial layouts crafted to make your brand instantly memorable.",
  },
  {
    num: "02",
    title: "Fast Performance",
    description:
      "Lightweight architecture, zero layout shifts, and ultra-responsive execution engineered for maximum conversion.",
  },
  {
    num: "03",
    title: "Built for Growth",
    description:
      "Modular design systems and scalable code foundations built to seamlessly expand alongside your business.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function OurVision() {
  return (
    <section
      id="vision"
      className="dark-section relative w-full overflow-hidden bg-black text-white py-24 sm:py-36 md:py-44 border-t border-white/10"
    >
      {/* Abstract Animated Visual Background: Subtle Aurora & Gradient Beams */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        {/* Soft Animated Gradient Beam 1 */}
        <motion.div
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-[140px]"
        />

        {/* Soft Animated Gradient Beam 2 */}
        <motion.div
          animate={{
            opacity: [0.1, 0.25, 0.1],
            scale: [1.1, 1, 1.1],
            y: [0, -40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 right-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-white/10 to-transparent blur-[160px]"
        />

        {/* Thin Minimal Geometry Vector Accent Lines */}
        <svg
          className="absolute inset-0 h-full w-full opacity-15 stroke-white"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M-100 200 C300 400 900 100 1300 600"
            strokeWidth="0.75"
            strokeDasharray="4 8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.path
            d="M-100 500 C400 100 800 700 1300 300"
            strokeWidth="0.5"
            strokeDasharray="2 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: 0.5, ease: "easeInOut" }}
          />
        </svg>

        {/* Noise overlay */}
        <div className="absolute inset-0 bg-noise opacity-20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col items-start max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-[#888888] border border-white/15 rounded-full px-4 py-1.5 bg-white/5 backdrop-blur-md mb-6 sm:mb-8"
          >
            02 / OUR VISION
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3.5xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] font-bold tracking-tight text-white uppercase leading-[0.95]"
          >
            OUR VISION
          </motion.h2>

          {/* Short Editorial Statement Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-10 font-serif italic text-base sm:text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-[#D4D4D8] max-w-3xl border-l-2 border-white/20 pl-4 sm:pl-6 text-balance"
          >
            We don't just build websites. We create digital experiences that are fast, beautiful, and built to grow with your business.
          </motion.p>
        </div>

        {/* Three Vision Principles Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 sm:mt-20 lg:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
        >
          {principles.map((item) => (
            <motion.div
              key={item.num}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0E0E10] p-5 sm:p-7 md:p-9 transition-all duration-500 hover:border-white/30 hover:bg-[#141417]"
            >
              {/* Subtle ambient hover glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-xs text-[#777777] uppercase tracking-widest">
                  PRINCIPLE {item.num}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-white/60 transition-transform group-hover:scale-150 group-hover:bg-white" />
              </div>

              <h3 className="mt-6 sm:mt-8 font-display text-xl sm:text-2xl lg:text-3xl font-light text-white tracking-tight">
                {item.title}
              </h3>

              <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-light leading-relaxed text-[#999999] group-hover:text-[#CCCCCC] transition-colors">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 sm:mt-24 border-t border-white/10 pt-8 sm:pt-12 text-center"
        >
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-[#777777]">
            ( Build • Scale • Evolve )
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default OurVision;
