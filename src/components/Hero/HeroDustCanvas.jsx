import { useEffect, useRef } from "react";

export default function HeroDustCanvas() {
  const canvasRef = useRef(null);
  const prevMousePos = useRef({ x: 0, y: 0 });
  const mouseVelocity = useRef({ x: 0, y: 0 });
  const targetVelocity = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const handleMouseMove = (e) => {
      if (prevMousePos.current.x !== 0 || prevMousePos.current.y !== 0) {
        // Compute cursor movement direction vector
        const dx = e.clientX - prevMousePos.current.x;
        const dy = e.clientY - prevMousePos.current.y;

        // Update velocity target (scaled for gentle particle drift in cursor direction)
        targetVelocity.current = {
          x: dx * 0.14,
          y: dy * 0.14,
        };
      }
      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        if (prevMousePos.current.x !== 0 || prevMousePos.current.y !== 0) {
          const dx = touch.clientX - prevMousePos.current.x;
          const dy = touch.clientY - prevMousePos.current.y;
          targetVelocity.current = {
            x: dx * 0.18,
            y: dy * 0.18,
          };
        }
        prevMousePos.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    // Initialize Atmospheric Black Dust Particles (Optimized per viewport)
    const initParticles = () => {
      const isMobile = canvas.width < 768;
      const count = isMobile
        ? Math.max(55, Math.min(Math.floor(canvas.width / 6), 85))
        : Math.min(Math.floor(canvas.width / 12), 110);

      const particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: isMobile
            ? Math.random() * 0.75 + 0.45
            : Math.random() * 0.55 + 0.35,
          alpha: isMobile
            ? Math.random() * 0.55 + 0.35
            : Math.random() * 0.45 + 0.2,
          baseVx: (Math.random() - 0.5) * (isMobile ? 0.22 : 0.18),
          baseVy: -Math.random() * (isMobile ? 0.22 : 0.18) - 0.05,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.025 + 0.01,
        });
      }
      particlesRef.current = particles;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let rafId;
    const render = () => {
      // Lerp mouse/touch velocity for weightless inertia physics
      mouseVelocity.current.x +=
        (targetVelocity.current.x - mouseVelocity.current.x) * 0.08;
      mouseVelocity.current.y +=
        (targetVelocity.current.y - mouseVelocity.current.y) * 0.08;

      // Friction decay
      targetVelocity.current.x *= 0.94;
      targetVelocity.current.y *= 0.94;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulse opacity over time
        p.pulse += p.pulseSpeed;
        const currentAlpha = p.alpha * (0.75 + 0.25 * Math.sin(p.pulse));

        // Move particles along baseline drift + inertia velocity
        p.x += p.baseVx + mouseVelocity.current.x;
        p.y += p.baseVy + mouseVelocity.current.y;

        // Wrap around canvas boundaries cleanly
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        // Draw Tiny Black Dust Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${currentAlpha})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none z-0 opacity-90 select-none"
    />
  );
}
