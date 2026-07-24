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

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    // Initialize Very Tiny Minute Black Dust Particles
    const initParticles = () => {
      const count = Math.min(Math.floor(canvas.width / 12), 105);
      const particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 0.55 + 0.35, // Very tiny minute size: 0.35px to 0.9px
          alpha: Math.random() * 0.45 + 0.2, // Opacity: 0.2 to 0.65
          baseVx: (Math.random() - 0.5) * 0.18, // Subtle baseline ambient drift
          baseVy: -Math.random() * 0.18 - 0.04, // Gentle upward drift
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.008,
        });
      }
      particlesRef.current = particles;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let rafId;
    const render = () => {
      // Lerp mouse velocity for weightless inertia physics in cursor direction
      mouseVelocity.current.x += (targetVelocity.current.x - mouseVelocity.current.x) * 0.08;
      mouseVelocity.current.y += (targetVelocity.current.y - mouseVelocity.current.y) * 0.08;

      // Friction decay: gradually slow down cursor impulse when mouse stops
      targetVelocity.current.x *= 0.94;
      targetVelocity.current.y *= 0.94;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulse opacity over time
        p.pulse += p.pulseSpeed;
        const currentAlpha = p.alpha * (0.75 + 0.25 * Math.sin(p.pulse));

        // Move particles along baseline drift PLUS current cursor moving direction
        p.x += p.baseVx + mouseVelocity.current.x;
        p.y += p.baseVy + mouseVelocity.current.y;

        // Wrap around canvas boundaries cleanly
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        // Draw Very Tiny Minute Black Dust Particle
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
