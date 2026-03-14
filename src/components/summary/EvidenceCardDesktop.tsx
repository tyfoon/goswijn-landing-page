import { motion } from "framer-motion";
import type { EvidenceCard } from "./evidenceData";

interface Props {
  card: EvidenceCard;
  side: "left" | "right";
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const EvidenceCardDesktop = ({ card, side, onMouseEnter, onMouseLeave }: Props) => (
  <motion.div
    key={card.id}
    initial={{ opacity: 0, y: 24, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -12, scale: 0.97 }}
    transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="mt-10 z-20 hidden lg:block w-full max-w-3xl"
  >
    <div className="w-full rounded-xl border border-accent/20 bg-card/[0.97] backdrop-blur-2xl shadow-[0_8px_60px_-12px_hsl(210,70%,45%,0.15)] overflow-hidden">
      <div className="px-7 pt-5 pb-3 border-b border-accent/10">
        <h3 className="text-accent text-sm font-mono tracking-[0.15em] uppercase">
          {card.title}
        </h3>
      </div>
      <div className="px-7 py-5 space-y-3">
        {card.bullets.map((bullet, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.05 }}
            className="flex items-start gap-3"
          >
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" />
            <p className="text-foreground/90 text-xs leading-relaxed">
              <span className="font-semibold text-foreground">{bullet.label}:</span>{" "}
              {bullet.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);
