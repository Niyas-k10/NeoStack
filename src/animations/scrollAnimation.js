import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function scrollAnimation() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const heroContent = document.querySelector(".hero-content");
  const heroScene = document.querySelector(".hero-scene");

  if (heroContent) {
    gsap.to(heroContent, {
      opacity: 0.2,
      y: -48,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "80% top",
        scrub: true,
      },
    });
  }

  if (heroScene) {
    gsap.to(heroScene, {
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}
