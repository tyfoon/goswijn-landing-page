interface SARRowProps {
  label: string;
  color: string;
  text: string;
  size?: "sm" | "md";
}

export function SARRow({ label, color, text, size = "md" }: SARRowProps) {
  const iconClass =
    size === "sm" ? "w-4 h-4 text-[9px]" : "w-5 h-5 text-[10px]";
  return (
    <div className="flex items-start gap-2">
      <span
        className={`flex-shrink-0 mt-0.5 ${iconClass} rounded flex items-center justify-center font-bold ${color} bg-muted/80 border border-border/40`}
      >
        {label}
      </span>
      <p className="text-foreground/80 leading-[20px]" style={{ fontSize: "13px" }}>
        {text}
      </p>
    </div>
  );
}

export function LegendItem({ label, color, text, size = "md" }: SARRowProps) {
  const iconClass =
    size === "sm" ? "w-4 h-4 text-[9px]" : "w-5 h-5 text-[10px]";
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`flex-shrink-0 ${iconClass} rounded flex items-center justify-center font-bold ${color} bg-muted/80 border border-border/40`}
      >
        {label}
      </span>
      <span className="text-[10px] text-foreground/40 font-normal font-sans">
        {text}
      </span>
    </div>
  );
}
