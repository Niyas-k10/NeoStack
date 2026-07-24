import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function reveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return { revert: () => {} };
  }

  const ctx = gsap.context(() => {
    gsap.utils.toArray(".reveal").forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 56 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    gsap.fromTo(
      ".service-card",
      { opacity: 0, y: 52 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#services",
          start: "top 72%",
        },
      }
    );

    gsap.fromTo(
      ".footer-section",
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer-section",
          start: "top 90%",
        },
      }
    );
  });

  return ctx;
}
