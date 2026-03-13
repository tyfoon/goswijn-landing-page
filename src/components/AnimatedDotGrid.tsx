import { useEffect, useRef, useCallback } from "react";

interface AnimatedDotGridProps {
  className?: string;
}

export const AnimatedDotGrid = ({ className = "" }: AnimatedDotGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = (timestamp - startTimeRef.current) * 0.0003; // very slow

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, w, h);

    const spacing = 32;
    const cols = Math.ceil(w / spacing) + 1;
    const rows = Math.ceil(h / spacing) + 1;

    // Read CSS custom property for foreground color
    const style = getComputedStyle(canvas);
    const fg = style.getPropertyValue("--foreground").trim();

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * spacing;
        const y = row * spacing;

        // 3D wave: combine two sine waves at different angles for organic feel
        const wave1 = Math.sin(x * 0.008 + elapsed * 1.2) * Math.cos(y * 0.006 + elapsed * 0.8);
        const wave2 = Math.sin((x + y) * 0.005 + elapsed * 0.6) * 0.5;
        const wave = (wave1 + wave2) / 1.5; // normalise to ~[-1, 1]

        // Map wave to opacity (0.02 – 0.09) and subtle size variation
        const opacity = 0.035 + wave * 0.03;
        const radius = 0.8 + wave * 0.25;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${fg} / ${opacity})`;
        ctx.fill();
      }
    }

    animationRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationRef.current);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};
