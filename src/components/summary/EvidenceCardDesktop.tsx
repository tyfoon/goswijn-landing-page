import { motion } from "framer-motion";
import type { EvidenceCard } from "./evidenceData";

interface Props {
  card: EvidenceCard;
  side: "left" | "right";
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const EvidenceCardDesktop = ({ card, onMouseEnter, onMouseLeave }: Props) => (
  <motion.div
    key={card.id}
    initial={{ opacity: 0, y: 24, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -12, scale: 0.97 }}
    transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="mt-10 z-20 hidden lg:block w-full"
  >
    <div className="w-full rounded-xl border border-accent/20 bg-card/[0.97] backdrop-blur-2xl shadow-[0_8px_60px_-12px_hsl(210,70%,45%,0.15)] overflow-hidden">
      {/* Header */}
      <div className="px-7 pt-5 pb-3 border-b border-accent/10">
        <h3 className="text-accent text-sm font-mono tracking-[0.15em] uppercase">
          {card.title}
        </h3>
      </div>

      {/* Body */}
      <div className="px-7 py-5">
        {card.layout === "simple" ? (
          <SimpleLayout bullets={card.bullets} />
        ) : (
          <SARLayout context={card.context} columns={card.columns} />
        )}
      </div>
    </div>
  </motion.div>
);

// --- Simple bullet list (Trigger 1) ---
function SimpleLayout({ bullets }: { bullets: { label: string; detail: string }[] }) {
  return (
    <div className="space-y-2.5">
      {bullets.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 + i * 0.05 }}
          className="flex items-start gap-3"
        >
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" />
          <p className="text-foreground/90 text-xs leading-relaxed">
            <span className="font-semibold text-foreground">{b.label}:</span> {b.detail}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// --- S-A-R executive dashboard layout ---
function SARLayout({
  context,
  columns,
}: {
  context: string;
  columns: { heading: string; situation?: string; action: string; result: string }[];
}) {
  return (
    <div className="space-y-5">
      {/* Context */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="text-foreground/70 text-xs italic leading-relaxed"
      >
        {context}
      </motion.p>

      {/* Column grid */}
      <div
        className={`grid gap-4 ${
          columns.length === 3 ? "grid-cols-3" : "grid-cols-2"
        }`}
      >
        {columns.map((col, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="rounded-lg border border-border/60 bg-muted/30 p-4 space-y-3"
          >
            {/* Column heading */}
            <h4 className="text-foreground text-xs font-semibold tracking-wide uppercase border-b border-accent/15 pb-2">
              {col.heading}
            </h4>

            {/* S-A-R rows */}
            {col.situation && (
              <SARRow label="S" color="text-accent" text={col.situation} />
            )}
            <SARRow label="A" color="text-yellow-500" text={col.action} />
            <SARRow label="R" color="text-green-500" text={col.result} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SARRow({ label, color, text }: { label: string; color: string; text: string }) {
  return (
    <div className="flex items-start gap-2">
      <span
        className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${color} bg-muted/80 border border-border/40`}
      >
        {label}
      </span>
      <p className="text-foreground/80 text-[11px] leading-relaxed">{text}</p>
    </div>
  );
}
