import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiArrowUpRight } from "react-icons/hi2";
import projects from "../../data/projects";

gsap.registerPlugin(ScrollTrigger);

function Portfolio() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".portfolio-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="dark-section relative overflow-hidden bg-[#0A0A0A] text-white py-20 sm:py-32 md:py-36 border-t border-white/10"
    >
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-20" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[350px] sm:h-[500px] w-[350px] sm:w-[500px] rounded-full bg-white/5 blur-[80px] sm:blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 sm:pb-12 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#777777]">
              04 / SELECTED WORKS & CASE STUDIES
            </span>
            <h2 className="mt-3 sm:mt-4 font-display text-3xl sm:text-5xl md:text-7xl font-light tracking-tight text-white max-w-3xl leading-[1.05]">
              Immersive web projects <br className="hidden sm:inline" />
              <span className="text-[#888888] italic font-serif">built without compromise.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-base font-light leading-relaxed text-[#AAAAAA]">
            A showcase of production platforms, computer vision engines, and interactive digital experiences crafted by our studio.
          </p>
        </div>

        {/* Projects Stack */}
        <div className="mt-12 sm:mt-20 space-y-10 sm:space-y-16 md:space-y-24">
          {projects.map((project) => (
            <article
              key={project.id}
              className="portfolio-card group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#121212] p-5 sm:p-8 md:p-12 lg:p-14 transition-all duration-500 hover:border-white/25 max-w-full"
            >
              {/* Ambient Glow */}
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 sm:h-80 sm:w-80 rounded-full opacity-20 sm:opacity-30 blur-[70px] sm:blur-[100px] transition-all duration-500 group-hover:opacity-40"
                style={{ background: project.accentColor }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-stretch">
                {/* Artwork Showcase Panel */}
                <div className="lg:col-span-7 min-h-[240px] sm:min-h-[320px] aspect-[16/10] rounded-xl sm:rounded-2xl border border-white/10 bg-[#0A0A0A] p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden group-hover:border-white/20 transition-all max-w-full">
                  <div className="flex justify-between items-center z-10">
                    <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#888888]">
                      {project.client}
                    </span>
                    <span className="font-mono text-[10px] sm:text-xs text-[#888888]">
                      {project.year}
                    </span>
                  </div>

                  <div className="my-auto z-10 py-4 sm:py-6">
                    <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">
                      {project.category}
                    </span>
                    <h3 className="mt-2 font-display text-2xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
                      {project.title}
                    </h3>
                  </div>

                  <div className="z-10 border-t border-white/10 pt-3 sm:pt-4 flex items-center justify-between">
                    <span className="font-mono text-[10px] sm:text-xs text-gray-300 truncate max-w-full">
                      ⚡ {project.metrics}
                    </span>
                  </div>

                  {/* Shimmer Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-40 pointer-events-none" />
                </div>

                {/* Content & Tech Stack Details */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full py-1 sm:py-2">
                  <div>
                    <span className="inline-block font-mono text-[10px] sm:text-xs tracking-widest text-[#888888] uppercase border border-white/10 rounded-full px-3 py-1 bg-white/5">
                      {project.category}
                    </span>

                    <h4 className="mt-4 sm:mt-6 font-display text-2xl sm:text-3xl lg:text-4xl font-light text-white">
                      {project.title}
                    </h4>

                    <p className="mt-3 sm:mt-4 text-xs sm:text-base font-light leading-relaxed text-[#AAAAAA]">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 sm:mt-8 border-t border-white/10 pt-5 sm:pt-6">
                    {/* Auto Wrapping Technology Tags */}
                    <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 max-w-full">
                      {project.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] sm:text-xs uppercase text-[#AAAAAA] break-words"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 min-h-[48px] text-xs font-semibold uppercase tracking-widest text-black transition-all duration-300 hover:bg-gray-200 active:scale-[0.98] w-full sm:w-auto"
                    >
                      <span>Request Case Study</span>
                      <HiArrowUpRight className="text-sm" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
