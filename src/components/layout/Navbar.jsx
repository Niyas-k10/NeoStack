import { useState, useEffect } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { getLenis } from "../../hooks/useLenis";

const navLinks = [
  { name: "Overview", href: "#hero", id: "hero" },
  { name: "Vision", href: "#vision", id: "vision" },
  { name: "Story", href: "#why", id: "why" },
  { name: "Capabilities", href: "#services", id: "services" },
  { name: "Showcase", href: "#portfolio", id: "portfolio" },
  { name: "Process", href: "#process", id: "process" },
  { name: "FAQ", href: "#faq", id: "faq" },
  { name: "Contact", href: "#contact", id: "contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("hero");

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    setActiveId(id);
    setMenuOpen(false);

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

  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 z-[100] w-full transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`mx-auto flex h-14 items-center justify-between rounded-full px-6 transition-all duration-300 ${
            scrolled
              ? "bg-white/80 backdrop-blur-xl border border-[#ECECEC] shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
              : "bg-white/50 backdrop-blur-md border border-[#ECECEC]/60"
          }`}
        >
          {/* Logo / Studio Name */}
          <button
            type="button"
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 group"
          >
            <div className="h-2.5 w-2.5 rounded-full bg-black transition-transform duration-300 group-hover:scale-150" />
            <span className="font-display text-sm font-semibold tracking-[0.18em] uppercase text-black">
              NEOSTACK
            </span>
            <span className="hidden md:inline-block rounded-full bg-[#F4F4F5] px-2.5 py-0.5 text-[10px] font-mono tracking-widest text-[#555555]">
              STUDIO
            </span>
          </button>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium uppercase tracking-widest transition-all duration-200 ${
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

          {/* Direct CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="rounded-full bg-black px-5 py-2 text-xs font-medium tracking-wider uppercase text-white transition-all duration-300 hover:bg-[#222222] hover:shadow-lg"
            >
              Get In Touch
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F4F5] text-lg text-black transition hover:bg-[#E4E4E7] lg:hidden"
          >
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 top-[72px] z-50 bg-white/95 backdrop-blur-2xl transition-all duration-300 lg:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col justify-between h-full px-6 py-8">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full py-3 text-left font-display text-2xl font-light tracking-tight text-black border-b border-[#ECECEC]"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="pb-12">
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="w-full rounded-full bg-black py-4 font-display text-sm uppercase tracking-widest text-white font-medium"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
