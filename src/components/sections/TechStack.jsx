import { motion } from "framer-motion";

const technologies = [
  { name: "React 19", category: "Core UI", spec: "Virtual DOM & Concurrent Engine" },
  { name: "Three.js", category: "Graphics", spec: "WebGL Shader Pipelines" },
  { name: "React Three Fiber", category: "3D", spec: "Declarative 3D Canvas" },
  { name: "GSAP & ScrollTrigger", category: "Motion", spec: "High Precision Physics & Pinning" },
  { name: "Framer Motion", category: "Animation", spec: "Micro-interaction & Layout Interpolation" },
  { name: "Tailwind CSS", category: "Design Tokens", spec: "Utility First Token Architecture" },
  { name: "Lenis", category: "Scroll", spec: "Smooth Wheel & Touch Physics" },
  { name: "JavaScript / ESNext", category: "Language", spec: "Modern Asynchronous Modules" },
  { name: "Vite", category: "Tooling", spec: "Sub-millisecond HMR Module Bundling" },
  { name: "Python & OpenCV", category: "AI / Vision", spec: "Realtime Image & Stream Ingestion" },
  { name: "Django REST", category: "Backend", spec: "Secure Scalable Microservices" },
  { name: "MySQL & PostgreSQL", category: "Data", spec: "ACID Relational Storage" },
];

function TechStack() {
  return (
    <section
      id="tech"
      className="relative overflow-hidden bg-white text-black py-28 sm:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#ECECEC] pb-12 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#777777]">
              06 / TECHNOLOGY ECOSYSTEM
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-black max-w-3xl">
              Engineered with world-class <br />
              <span className="italic font-serif font-light text-[#444444]">open technologies.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base font-light leading-relaxed text-[#555555]">
            We build exclusively with zero-compromise modern web tools that give us complete control over performance, 60fps rendering, and custom aesthetics.
          </p>
        </div>

        {/* Minimal Editorial Tech Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {technologies.map((tech, idx) => (
            <motion.div
              key={tech.name}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl border border-[#ECECEC] bg-[#F9F9FB] p-6 transition-all duration-300 hover:border-black hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#777777] border border-[#ECECEC] rounded-full px-2.5 py-0.5 group-hover:border-black group-hover:text-black">
                  {tech.category}
                </span>
                <span className="font-mono text-xs text-[#AAAAAA]">
                  0{idx + 1}
                </span>
              </div>

              <h3 className="mt-6 font-display text-xl font-light text-black tracking-tight group-hover:text-black">
                {tech.name}
              </h3>

              <p className="mt-2 text-xs font-mono text-[#666666]">
                {tech.spec}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStack;