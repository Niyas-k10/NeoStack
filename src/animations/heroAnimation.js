import gsap from "gsap";

export default function heroAnimation(scope) {
  const root = scope || document.querySelector("#hero");
  if (!root) return null;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) return null;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      "#hero-content > *",
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }
    ).fromTo(
      "#hero-laptop",
      { opacity: 0, scale: 0.94, x: 48 },
      { opacity: 1, scale: 1, x: 0, duration: 1.1 },
      "-=0.55"
    );
  }, root);

  return ctx;
}
