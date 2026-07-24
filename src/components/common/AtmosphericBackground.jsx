import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AtmosphericBackground() {
  const containerRef = useRef(null);
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);
  const canvasRef = useRef(null);

  // Mouse tracking and velocity
  const prevMousePos = useRef({ x: 0, y: 0 });
  const targetVelocity = useRef({ x: 0, y: 0 });
  const mouseVelocity = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const wavePhase = useRef(0);
  const waveAngle = useRef(0);
  const particlesRef = useRef([]);
  const rafId = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalized screen offsets
      targetPos.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };

      // Mouse velocity calculation for directional push
      if (prevMousePos.current.x !== 0 || prevMousePos.current.y !== 0) {
        const dx = e.clientX - prevMousePos.current.x;
        const dy = e.clientY - prevMousePos.current.y;
        targetVelocity.current = {
          x: dx * 0.12,
          y: dy * 0.12,
        };
      }
      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Setup Canvas for Waves & Minute Black Dust Particles
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDustParticles();
    };

    // Initialize Very Tiny Minute Black Dust Particles
    const initDustParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth / 14), 95);
      const particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 0.55 + 0.35, // Ultra-fine size: 0.35px to 0.9px
          alpha: Math.random() * 0.45 + 0.15,
          baseVx: (Math.random() - 0.5) * 0.18,
          baseVy: -Math.random() * 0.18 - 0.04,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.008,
        });
      }
      particlesRef.current = particles;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Render Loop
    const renderLoop = () => {
      // Smooth position lerp
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.03;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.03;

      // Lerp velocity for directional particle push
      mouseVelocity.current.x += (targetVelocity.current.x - mouseVelocity.current.x) * 0.08;
      mouseVelocity.current.y += (targetVelocity.current.y - mouseVelocity.current.y) * 0.08;

      // Decay velocity impulse
      targetVelocity.current.x *= 0.94;
      targetVelocity.current.y *= 0.94;

      const { x, y } = currentPos.current;

      // Layer 1: Aurora Bending
      if (layer1Ref.current) {
        gsap.set(layer1Ref.current, {
          x: x * 45,
          y: y * 45,
          skewX: x * 3,
          skewY: y * 2,
        });
      }

      // Layer 2: Organic Blobs Drift
      if (layer2Ref.current) {
        gsap.set(layer2Ref.current, {
          x: -x * 65,
          y: -y * 65,
        });
      }

      // Layer 4 & Minute Black Dust Particles Canvas Render
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // --- Render Wave Canvas Layer ---
        wavePhase.current += 0.006;
        waveAngle.current += (x * 0.5 - waveAngle.current) * 0.02;

        const w = canvas.width;
        const h = canvas.height;

        // Wave 1
        ctx.beginPath();
        ctx.moveTo(0, h * 0.5);
        for (let px = 0; px <= w; px += 20) {
          const py =
            Math.sin(px * 0.002 + wavePhase.current) * 45 +
            Math.cos(px * 0.001 + wavePhase.current * 0.8) * 35 +
            h * (0.55 + waveAngle.current * 0.05);
          ctx.lineTo(px, py);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        const grad1 = ctx.createLinearGradient(0, 0, w, h);
        grad1.addColorStop(0, "rgba(224, 231, 255, 0.07)");
        grad1.addColorStop(0.5, "rgba(243, 232, 255, 0.05)");
        grad1.addColorStop(1, "rgba(255, 255, 255, 0.02)");
        ctx.fillStyle = grad1;
        ctx.fill();

        // --- Render Minute Black Dust Particles ---
        const particles = particlesRef.current;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Pulse opacity over time
          p.pulse += p.pulseSpeed;
          const currentAlpha = p.alpha * (0.75 + 0.25 * Math.sin(p.pulse));

          // Move along baseline drift PLUS mouse direction velocity
          p.x += p.baseVx + mouseVelocity.current.x;
          p.y += p.baseVy + mouseVelocity.current.y;

          // Wrap boundaries
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;

          // Draw Minute Black Dust Particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 0, 0, ${currentAlpha * 0.6})`;
          ctx.fill();
        }
      }

      rafId.current = requestAnimationFrame(renderLoop);
    };

    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Layer 1: Aurora Gradients */}
      <div
        ref={layer1Ref}
        className="absolute inset-0 will-change-transform"
      >
        <div className="absolute -top-[25%] -left-[15%] h-[75vw] w-[75vw] rounded-full bg-gradient-to-br from-white/80 via-slate-100/50 to-transparent opacity-[0.08] blur-[150px]" />
        <div className="absolute top-[30%] -right-[20%] h-[70vw] w-[70vw] rounded-full bg-gradient-to-bl from-slate-200/60 via-gray-100/40 to-transparent opacity-[0.07] blur-[160px]" />
        <div className="absolute -bottom-[20%] left-[10%] h-[65vw] w-[65vw] rounded-full bg-gradient-to-tr from-blue-100/60 via-indigo-50/40 to-transparent opacity-[0.08] blur-[140px]" />
        <div className="absolute top-[10%] left-[30%] h-[60vw] w-[60vw] rounded-full bg-gradient-to-br from-purple-100/50 via-violet-50/30 to-transparent opacity-[0.06] blur-[150px]" />
      </div>

      {/* Layer 2: Organic Blobs */}
      <div
        ref={layer2Ref}
        className="absolute inset-0 will-change-transform"
      >
        <div className="absolute top-[20%] right-[15%] h-[550px] w-[550px] rounded-full bg-slate-300/10 blur-[130px] opacity-[0.06]" />
        <div className="absolute bottom-[25%] left-[15%] h-[600px] w-[600px] rounded-full bg-indigo-200/10 blur-[150px] opacity-[0.05]" />
        <div className="absolute top-[55%] left-[40%] h-[450px] w-[450px] rounded-full bg-violet-200/10 blur-[140px] opacity-[0.05]" />
      </div>

      {/* Layer 3: Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

      {/* Layer 4: Waves & Minute Black Dust Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none opacity-90"
      />
    </div>
  );
}
