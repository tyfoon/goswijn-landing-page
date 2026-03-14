import { motion } from "framer-motion";
import type { EvidenceCard } from "./evidenceData";

interface Props {
  card: EvidenceCard;
}

export const EvidenceCardMobile = ({ card }: Props) => (
  <motion.div
    key={`mobile-${card.id}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="lg:hidden mt-8"
  >
    <div className="rounded-xl border border-accent/20 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden">
      <div className="px-5 pt-5 pb-3 border-b border-accent/10">
        <h3 className="text-accent text-xs section-label tracking-[0.15em] uppercase">
          {card.title}
        </h3>
      </div>
      <div className="px-5 py-4">
        {card.layout === "simple" ? (
          <div className="space-y-3">
            {card.bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="mt-1.5 w-1 h-1 rounded-full bg-accent/60 flex-shrink-0" />
                <p className="text-foreground/90 text-xs leading-relaxed">
                  <span className="font-semibold text-foreground">{b.label}:</span> {b.detail}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-foreground/70 text-xs italic leading-relaxed">
              {card.context}
            </p>
            {card.columns.map((col, i) => (
              <div
                key={i}
                className="rounded-lg border border-border/60 bg-muted/30 p-3.5 space-y-2.5"
              >
                <h4 className="text-foreground text-xs font-semibold tracking-wide uppercase border-b border-accent/15 pb-1.5">
                  {col.heading}
                </h4>
                {col.situation && (
                  <MobileSARRow label="S" color="text-accent" text={col.situation} />
                )}
                <MobileSARRow label="A" color="text-yellow-500" text={col.action} />
                <MobileSARRow label="R" color="text-green-500" text={col.result} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

function MobileSARRow({ label, color, text }: { label: string; color: string; text: string }) {
  return (
    <div className="flex items-start gap-2">
      <span
        className={`flex-shrink-0 mt-0.5 w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold ${color} bg-muted/80 border border-border/40`}
      >
        {label}
      </span>
      <p className="text-foreground/80 text-[11px] leading-relaxed">{text}</p>
    </div>
  );
}
