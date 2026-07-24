import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { HiArrowUpRight } from "react-icons/hi2";
import { getLenis } from "../../hooks/useLenis";

const navLinks = [
  { name: "Overview", id: "hero" },
  { name: "Vision", id: "vision" },
  { name: "Story", id: "why" },
  { name: "Capabilities", id: "services" },
  { name: "Works", id: "portfolio" },
  { name: "Process", id: "process" },
  { name: "FAQ", id: "faq" },
  { name: "Contact", id: "contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("hero");

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    setMenuOpen(false);
    if (!el) return;

    setActiveId(id);

    const lenis = getLenis();
    const offset = -60;

    if (lenis) {
      lenis.scrollTo(el, { offset, duration: 1.2 });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.1, 0.3, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock background scroll when mobile menu is active
  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      getLenis()?.start();
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-[100] w-full transition-all duration-300 ${
          scrolled ? "py-2 sm:py-3" : "py-4 sm:py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div
            className={`mx-auto flex h-12 sm:h-14 items-center justify-between rounded-full px-4 sm:px-6 transition-all duration-300 ${
              scrolled
                ? "bg-white/85 backdrop-blur-xl border border-[#ECECEC] shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                : "bg-white/60 backdrop-blur-md border border-[#ECECEC]/70"
            }`}
          >
            {/* Logo / Studio Name */}
            <button
              type="button"
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-full"
            >
              <div className="h-2.5 w-2.5 rounded-full bg-black transition-transform duration-300 group-hover:scale-150" />
              <span className="font-display text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-black">
                NEOSTACK
              </span>
              <span className="hidden sm:inline-block rounded-full bg-[#F4F4F5] px-2 py-0.5 text-[9px] sm:text-[10px] font-mono tracking-widest text-[#555555]">
                STUDIO
              </span>
            </button>

            {/* Navigation: Tablet & Desktop Horizontal Links */}
            <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
              {navLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className={`relative rounded-full px-2.5 lg:px-3.5 py-1.5 text-[11px] lg:text-xs font-medium uppercase tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${
                      isActive
                        ? "text-black font-semibold"
                        : "text-[#555555] hover:text-black"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-black" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Direct CTA (Desktop & Tablet) */}
            <div className="hidden md:flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="rounded-full bg-black px-4 lg:px-5 py-2 text-[11px] lg:text-xs font-medium tracking-wider uppercase text-white transition-all duration-300 hover:bg-[#222222] hover:shadow-lg min-h-[38px] flex items-center"
              >
                Get In Touch
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 min-touch items-center justify-center rounded-full bg-[#F4F4F5] text-xl text-black transition-all hover:bg-[#E4E4E7] active:scale-95 md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] bg-white text-black flex flex-col justify-between overflow-y-auto pt-safe pb-safe px-6 md:hidden"
            style={{
              paddingTop: "max(1.25rem, env(safe-area-inset-top))",
              paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
            }}
          >
            {/* Overlay Header Bar */}
            <div className="flex items-center justify-between py-3 border-b border-[#ECECEC]">
              <div className="flex items-center gap-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-black" />
                <span className="font-display text-sm font-semibold tracking-[0.18em] uppercase text-black">
                  NEOSTACK
                </span>
                <span className="rounded-full bg-[#F4F4F5] px-2 py-0.5 text-[9px] font-mono tracking-widest text-[#555555]">
                  NAVIGATION
                </span>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 min-touch items-center justify-center rounded-full bg-[#F4F4F5] text-xl text-black transition active:scale-95"
              >
                <HiOutlineX />
              </button>
            </div>

            {/* Editorial Large Navigation Rows */}
            <nav className="my-auto py-8">
              <ul className="flex flex-col gap-3 sm:gap-4">
                {navLinks.map((link, idx) => {
                  const isActive = activeId === link.id;
                  return (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.08 * idx,
                        ease: "easeOut",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => scrollToSection(link.id)}
                        className="group flex w-full items-center justify-between py-2.5 text-left border-b border-[#ECECEC]/60 focus:outline-none min-h-[48px]"
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-xs text-[#888888] font-light">
                            0{idx + 1}
                          </span>
                          <span
                            className={`font-display text-3xl xs:text-4xl font-light tracking-tight transition-all duration-300 group-hover:translate-x-2 ${
                              isActive
                                ? "text-black font-normal italic font-serif"
                                : "text-black"
                            }`}
                          >
                            {link.name}
                          </span>
                        </div>
                        <HiArrowUpRight className="text-xl text-[#999999] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Bottom CTA & Safe-Area Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="pt-4 border-t border-[#ECECEC]"
            >
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="flex items-center justify-center gap-3 w-full rounded-full bg-black py-4 min-h-[52px] font-display text-xs uppercase tracking-widest text-white font-medium shadow-md transition-all active:scale-[0.98]"
              >
                <span>Get In Touch</span>
                <HiArrowUpRight className="text-base" />
              </button>
              <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-[#777777] uppercase tracking-widest">
                <span>NeoStack Digital Studio</span>
                <span>Kerala, India</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
