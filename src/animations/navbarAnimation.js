import gsap from "gsap";

export function navbarAnimation() {
  gsap.from(".navbar", {
    y: -80,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    delay: 0.1,
  });
}
