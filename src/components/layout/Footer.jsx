import { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi2";
import { getLenis } from "../../hooks/useLenis";

function Footer() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }) + " IST"
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="dark-section relative overflow-hidden bg-[#0A0A0A] text-white pt-24 pb-12 border-t border-white/10">
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 pb-16 border-b border-white/10">
          <div>
            <span className="font-display text-2xl font-semibold tracking-[0.2em] uppercase text-white">
              NEOSTACK
            </span>
            <p className="mt-4 max-w-md text-sm font-light text-[#888888] leading-relaxed">
              A modern digital development studio crafting clean web applications, responsive portfolio platforms, and brand design for growing businesses.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 sm:gap-20">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#777777]">
                LOCATION & TIME
              </span>
              <p className="mt-3 font-mono text-sm text-white">
                KERALA, INDIA
              </p>
              <p className="mt-1 font-mono text-xs text-gray-400">
                {timeString || "18:00:00 IST"}
              </p>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#777777]">
                STUDIO STATUS
              </span>
              <div className="mt-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
                <span className="font-mono text-xs text-white">AVAILABLE FOR PROJECTS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back To Top */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-[#666666]">
          <p>© {new Date().getFullYear()} NEOSTACK. ALL RIGHTS RESERVED.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white transition-all hover:bg-white hover:text-black"
          >
            <span>BACK TO TOP</span>
            <HiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
