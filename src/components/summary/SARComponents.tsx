interface EvidenceRowProps {
  text: string;
  variant?: "default" | "result";
  size?: "sm" | "md";
}

export function EvidenceRow({ text, variant = "default", size = "md" }: EvidenceRowProps) {
  const dotClass = size === "sm" ? "mt-[7px] w-1 h-1" : "mt-[7px] w-1.5 h-1.5";
  const isResult = variant === "result";

  return (
    <div className="flex items-start gap-2.5">
      <div
        className={`${dotClass} rounded-full flex-shrink-0 ${
          isResult ? "bg-accent/80" : "bg-foreground/25"
        }`}
      />
      <p
        className={`leading-[20px] ${
          isResult
            ? "text-foreground font-medium"
            : "text-foreground/70"
        }`}
        style={{ fontSize: "13px" }}
      >
        {text}
      </p>
    </div>
  );
}
