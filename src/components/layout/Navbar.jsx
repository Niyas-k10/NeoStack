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
  { name: "Selected Works", id: "portfolio" },
  { name: "Process", id: "process" },
  { name: "FAQ", id: "faq" },
  { name: "Contact", id: "contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("hero");

  // Perform smooth scroll to target section ID
  const scrollToSection = (id) => {
    // 1. Immediately unlock scrolling and reactivate Lenis engine
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    const lenis = getLenis();
    lenis?.start();

    // 2. Close mobile menu modal and update active link state
    setMenuOpen(false);
    setActiveId(id);

    // 3. Trigger smooth scroll to target DOM element
    requestAnimationFrame(() => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (!el) return;

        const offset = -70;
        if (lenis) {
          lenis.scrollTo(el, { offset, duration: 1.2 });
        } else {
          const top = el.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 60);
    });
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

  // Sync scroll lock when mobile drawer opens/closes
  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.body.classList.add("menu-open");
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.classList.remove("menu-open");
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.classList.remove("menu-open");
      getLenis()?.start();
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 z-[100] w-full transition-all duration-300 py-3 sm:py-4"
        style={{
          paddingLeft: "max(0.75rem, env(safe-area-inset-left))",
          paddingRight: "max(0.75rem, env(safe-area-inset-right))",
          paddingTop: scrolled ? "0.5rem" : "max(0.75rem, env(safe-area-inset-top))",
        }}
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div
            className={`mx-auto flex h-[72px] sm:h-[76px] items-center justify-between rounded-full px-5 sm:px-6 transition-all duration-300 ${
              scrolled
                ? "bg-white/90 backdrop-blur-xl border border-[#ECECEC] shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                : "bg-white/70 backdrop-blur-md border border-[#ECECEC]/80"
            }`}
          >
            {/* Logo / Studio Name - Perfectly Aligned Left */}
            <button
              type="button"
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-3 group focus:outline-none rounded-full h-full my-auto shrink-0"
            >
              <div className="h-2.5 w-2.5 rounded-full bg-black transition-transform duration-300 group-hover:scale-150 shrink-0" />
              <span className="font-display text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-black">
                NEOSTACK
              </span>
              <span className="hidden sm:inline-block rounded-full bg-[#F4F4F5] px-2 py-0.5 text-[9px] sm:text-[10px] font-mono tracking-widest text-[#555555]">
                STUDIO
              </span>
            </button>

            {/* Desktop & Tablet Links */}
            <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 h-full">
              {navLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className={`relative rounded-full px-3 lg:px-4 py-2 min-h-[40px] text-[11px] lg:text-xs font-medium uppercase tracking-wider transition-all duration-200 focus:outline-none ${
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
            <div className="hidden md:flex items-center gap-3 h-full">
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="rounded-full bg-black px-5 lg:px-6 py-2.5 text-[11px] lg:text-xs font-medium tracking-wider uppercase text-white transition-all duration-300 hover:bg-[#222222] hover:shadow-lg min-h-[44px] flex items-center justify-center"
              >
                Get In Touch
              </button>
            </div>

            {/* Mobile Hamburger Toggle Button - 48x48px Touch Target, Perfectly Centered Right */}
            <button
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-12 w-12 shrink-0 min-touch items-center justify-center rounded-full bg-[#F4F4F5] text-xl text-black transition-all hover:bg-[#E4E4E7] active:scale-95 md:hidden focus:outline-none border border-[#ECECEC]/60 my-auto"
            >
              {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
            </button>
          </div>
        </div>
      </header>

      {/* Refined Mobile Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] bg-white/98 text-black flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-2xl md:hidden h-dvh max-h-dvh"
            style={{
              paddingTop: "max(1rem, env(safe-area-inset-top))",
              paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
              paddingLeft: "max(1.25rem, env(safe-area-inset-left))",
              paddingRight: "max(1.25rem, env(safe-area-inset-right))",
            }}
          >
            {/* Top Bar inside Overlay */}
            <div className="flex h-[72px] items-center justify-between px-1 py-3 border-b border-[#ECECEC] shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-black shrink-0" />
                <span className="font-display text-xs font-semibold tracking-[0.18em] uppercase text-black">
                  NEOSTACK
                </span>
                <span className="rounded-full bg-[#F4F4F5] px-2 py-0.5 text-[9px] font-mono text-[#555555]">
                  MENU
                </span>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="flex h-12 w-12 min-touch items-center justify-center rounded-full bg-[#F4F4F5] text-xl text-black transition active:scale-95 border border-[#ECECEC]/60"
              >
                <HiOutlineX />
              </button>
            </div>

            {/* Independent Scrollable Body Area with Hidden Scrollbar & Fluid Momentum Scroll */}
            <div className="flex-1 overflow-y-auto overscroll-contain mobile-nav-scrollbar-hide py-4 flex flex-col justify-between">
              <nav className="my-auto">
                <ul className="flex flex-col gap-1.5">
                  {navLinks.map((link, idx) => {
                    const isActive = activeId === link.id;
                    return (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.25,
                          delay: 0.04 * idx,
                          ease: "easeOut",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => scrollToSection(link.id)}
                          className={`flex w-full items-center justify-between px-4 py-3 rounded-xl text-left font-display text-base font-medium transition-all duration-200 min-h-[48px] ${
                            isActive
                              ? "bg-black text-white shadow-sm"
                              : "text-black hover:bg-[#F4F4F5] active:bg-[#E4E4E7]"
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <span
                              className={`font-mono text-xs ${
                                isActive ? "text-gray-300" : "text-[#888888]"
                              }`}
                            >
                              0{idx + 1}
                            </span>
                            <span>{link.name}</span>
                          </div>
                          <HiArrowUpRight
                            className={`text-sm transition-transform ${
                              isActive
                                ? "text-white"
                                : "text-[#888888] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            }`}
                          />
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Bottom CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                className="pt-3 mt-4 border-t border-[#ECECEC] shrink-0"
              >
                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className="flex items-center justify-center gap-2.5 w-full rounded-full bg-black py-3.5 min-h-[48px] font-display text-xs uppercase tracking-widest text-white font-medium shadow-md transition-all active:scale-[0.98]"
                >
                  <span>Get In Touch</span>
                  <HiArrowUpRight className="text-sm" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
