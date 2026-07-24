import { motion } from "framer-motion";
import {
  HiOutlineGlobeAlt,
  HiOutlineTemplate,
  HiOutlineUserCircle,
  HiOutlineColorSwatch,
  HiOutlinePhotograph,
  HiOutlineCode,
  HiOutlineCloudUpload,
  HiOutlineDocumentText,
} from "react-icons/hi";

const capabilities = [
  {
    title: "Modern Static Website Development",
    description:
      "Fast, lightweight websites built using React and modern CSS. Ideal for startups and small businesses needing a clean web presence.",
    icon: HiOutlineGlobeAlt,
  },
  {
    title: "Professional Landing Pages",
    description:
      "High-converting landing pages designed to showcase your core products, drive engagement, and communicate value clearly.",
    icon: HiOutlineTemplate,
  },
  {
    title: "Portfolio Website Design",
    description:
      "Custom portfolio websites crafted for freelancers, designers, developers, and creators to display their best work.",
    icon: HiOutlineUserCircle,
  },
  {
    title: "Business Branding & Logo Design",
    description:
      "Memorable brand identity design including clean logos, color palettes, and visual style guides for new businesses.",
    icon: HiOutlineColorSwatch,
  },
  {
    title: "Poster & Social Media Creatives",
    description:
      "Eye-catching digital posters, promotional banners, and social media graphics designed to elevate your brand marketing.",
    icon: HiOutlinePhotograph,
  },
  {
    title: "Responsive UI & Clean React Development",
    description:
      "Mobile-friendly user interfaces built with React 19, clean component hierarchy, and responsive layout standards.",
    icon: HiOutlineCode,
  },
  {
    title: "Website Deployment & Setup",
    description:
      "End-to-end web deployment on Vercel, Netlify, or custom servers with custom domain setup and HTTPS configuration.",
    icon: HiOutlineCloudUpload,
  },
  {
    title: "ATS-Friendly Resume Design",
    description:
      "Professionally formatted, ATS-compliant resume layouts designed to highlight skills and pass recruiter software screening.",
    icon: HiOutlineDocumentText,
  },
];

function WhyChoose() {
  return (
    <section
      id="why"
      className="dark-section relative overflow-hidden bg-[#0A0A0A] text-white py-28 sm:py-36 border-t border-white/10"
    >
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-20" />
      <div className="pointer-events-none absolute left-0 top-1/3 h-[500px] w-[500px] rounded-full bg-white/5 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-12 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#777777]">
              03 / CORE CAPABILITIES
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl font-light tracking-tight text-white max-w-3xl">
              What we build at <br />
              <span className="text-[#888888] italic font-serif">NeoStack Studio.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base font-light leading-relaxed text-[#AAAAAA]">
            Honest digital development and creative services built specifically to help startups, creators, and businesses launch cleanly.
          </p>
        </div>

        {/* Real Capability Cards Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212] p-6 transition-all duration-300 hover:border-white/30 hover:bg-[#161616]"
              >
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-lg text-white transition-transform group-hover:scale-110">
                  <Icon />
                </div>

                <h3 className="font-display text-xl font-light text-white tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm font-light leading-relaxed text-[#888888] group-hover:text-[#AAAAAA]">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
