import { useEffect, useRef, useCallback } from "react";

interface AnimatedDotGridProps {
  className?: string;
}

export const AnimatedDotGrid = ({ className = "" }: AnimatedDotGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const fgColorRef = useRef<string>("");

  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const t = (timestamp - startTimeRef.current) * 0.00015; // very slow time progression

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Cache foreground color on resize
      const style = getComputedStyle(canvas);
      fgColorRef.current = style.getPropertyValue("--foreground").trim();
    }

    ctx.clearRect(0, 0, w, h);

    const spacing = 32;
    const cols = Math.ceil(w / spacing) + 2;
    const rows = Math.ceil(h / spacing) + 2;
    const fg = fgColorRef.current;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const baseX = col * spacing;
        const baseY = row * spacing;

        // Two overlapping waves travelling diagonally across the grid
        // Using grid indices (not pixels) for visible spatial variation
        const wave1 = Math.sin(col * 0.4 + row * 0.3 + t * 2.0);
        const wave2 = Math.sin(col * 0.25 - row * 0.35 + t * 1.4) * 0.6;
        const wave = (wave1 + wave2) / 1.6; // range ~[-1, 1]

        // Positional displacement — dots drift slightly for a 3D ripple feel
        const dx = wave * 1.8;
        const dy = Math.cos(col * 0.3 + row * 0.4 + t * 1.6) * 1.5;

        // Opacity and size modulation
        const opacity = 0.04 + wave * 0.035;
        const radius = 0.8 + wave * 0.3;

        ctx.beginPath();
        ctx.arc(baseX + dx, baseY + dy, Math.max(0.3, radius), 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${fg} / ${Math.max(0.01, opacity)})`;
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
