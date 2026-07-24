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
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
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
      className="dark-section relative overflow-hidden bg-[#0A0A0A] text-white py-28 sm:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-25" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-white/5 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-12 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#777777]">
              04 / SELECTED WORKS & CASE STUDIES
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white max-w-3xl">
              Immersive web projects <br />
              <span className="text-[#888888] italic font-serif">built without compromise.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base font-light leading-relaxed text-[#AAAAAA]">
            A showcase of production platforms, computer vision engines, and interactive digital experiences crafted by our studio.
          </p>
        </div>

        {/* Projects Cards List */}
        <div className="mt-16 space-y-16 sm:space-y-24">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="portfolio-card group relative overflow-hidden rounded-3xl border border-white/10 bg-[#121212] p-8 sm:p-12 md:p-16 transition-all duration-500 hover:border-white/25"
            >
              {/* Subtle Ambient Glow */}
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-[100px] transition-all duration-500 group-hover:opacity-50"
                style={{ background: project.accentColor }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Visual Artwork Showcase Panel */}
                <div className="lg:col-span-7 aspect-[16/10] rounded-2xl border border-white/10 bg-[#0A0A0A] p-8 flex flex-col justify-between relative overflow-hidden group-hover:border-white/20 transition-all">
                  <div className="flex justify-between items-center z-10">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#777777]">
                      {project.client}
                    </span>
                    <span className="font-mono text-xs text-[#777777]">
                      {project.year}
                    </span>
                  </div>

                  <div className="my-auto z-10 py-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
                      {project.category}
                    </span>
                    <h3 className="mt-2 font-display text-3xl sm:text-5xl font-light text-white tracking-tight">
                      {project.title}
                    </h3>
                  </div>

                  <div className="z-10 border-t border-white/10 pt-4 flex items-center justify-between">
                    <span className="font-mono text-xs text-gray-300">
                      {project.metrics}
                    </span>
                  </div>

                  {/* Glass Shimmer Mesh */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-40 pointer-events-none" />
                </div>

                {/* Text Content & Details Panel */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">
                  <div>
                    <span className="font-mono text-xs tracking-widest text-[#777777] uppercase border border-white/10 rounded-full px-3 py-1 bg-white/5">
                      {project.category}
                    </span>

                    <h4 className="mt-6 font-display text-3xl sm:text-4xl font-light text-white">
                      {project.title}
                    </h4>

                    <p className="mt-4 text-sm sm:text-base font-light leading-relaxed text-[#AAAAAA]">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-6">
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs uppercase text-[#888888]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3 text-xs font-semibold uppercase tracking-widest text-black transition-all duration-300 hover:bg-gray-200"
                    >
                      <span>Request Case Study</span>
                      <HiArrowUpRight />
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
