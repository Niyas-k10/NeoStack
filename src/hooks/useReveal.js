import { useLayoutEffect } from "react";
import gsap from "gsap";

export default function useReveal(ref) {
  useLayoutEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current.children,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.12,
          ease: "power3.out",
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [ref]);
}
