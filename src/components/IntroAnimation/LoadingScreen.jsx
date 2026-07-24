import { motion } from "framer-motion";

export default function LoadingScreen({ progress }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black font-sans select-none"
    >
      {/* Cinematic subtle glow in background */}
      <div className="pointer-events-none absolute h-[50vh] w-[50vw] rounded-full bg-blue-500/5 blur-[120px]" />

      <div className="relative flex flex-col items-center max-w-xs w-full px-6 text-center">
        {/* Animated minimal brand indicator */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[10px] tracking-[0.5em] text-white/70 uppercase mb-8 font-semibold"
        >
          NEOSTACK SYSTEM
        </motion.span>

        {/* Big digital progress percentage */}
        <div className="overflow-hidden mb-4">
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl font-extralight tracking-tighter text-white font-display"
          >
            {progress}%
          </motion.div>
        </div>

        {/* Sleek loading bar */}
        <div className="relative w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-3">
          <motion.div
            className="absolute left-0 top-0 h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>

        {/* Loading detail text */}
        <motion.span
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-[9px] tracking-[0.2em] text-white/40 uppercase font-medium"
        >
          PRELOADING CINEMATIC EXPERIENCE
        </motion.span>
      </div>
    </motion.div>
  );
}
