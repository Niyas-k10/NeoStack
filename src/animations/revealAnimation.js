import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function revealAnimation() {
  gsap.utils.toArray(".reveal").forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 80,
      duration: 1,

      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
    });
  });
}