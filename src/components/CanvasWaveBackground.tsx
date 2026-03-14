import { useEffect, useRef } from "react";

export const CanvasWaveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = 60;
    const rows = 30;
    const perspective = 600;
    const cameraY = -120;
    const tiltX = 0.55;

    const cosT = Math.cos(tiltX);
    const sinT = Math.sin(tiltX);

    const draw = (time: number) => {
      if (!isVisibleRef.current) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      const t = time * 0.0003;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const spacingX = (w / (cols - 1)) * 1.4;
      const spacingZ = 28;
      const offsetX = w / 2;
      const offsetZ = -rows * spacingZ * 0.35;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x3d = (col - cols / 2) * spacingX;
          const z3d = row * spacingZ + offsetZ;

          const wave =
            Math.sin(col * 0.25 + t * 1.8) * 22 +
            Math.cos(row * 0.3 + t * 1.2) * 15 +
            Math.sin((col + row) * 0.15 + t * 0.9) * 10;

          const y3d = wave;

          const ry = (y3d - cameraY) * cosT - z3d * sinT;
          const rz = (y3d - cameraY) * sinT + z3d * cosT;

          const depth = perspective + rz;
          if (depth <= 0) continue;

          const scale = perspective / depth;
          const sx = x3d * scale + offsetX;
          const sy = ry * scale + h * 0.55;

          const depthNorm = Math.max(0, Math.min(1, (depth - 50) / (rows * spacingZ)));
          const alpha = 0.04 + (1 - depthNorm) * 0.14;
          const radius = Math.max(0.3, 0.9 * scale);

          ctx.beginPath();
          ctx.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(210, 20%, 65%, ${alpha})`;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    // Pause animation when canvas is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};
