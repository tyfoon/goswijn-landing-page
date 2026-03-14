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
        <h3 className="text-accent text-xs font-mono tracking-[0.15em] uppercase">
          {card.title}
        </h3>
      </div>
      <div className="px-5 py-4 space-y-3">
        {card.bullets.map((bullet, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className="mt-1.5 w-1 h-1 rounded-full bg-accent/60 flex-shrink-0" />
            <p className="text-foreground/90 text-xs leading-relaxed">
              <span className="font-semibold text-foreground">{bullet.label}:</span>{" "}
              {bullet.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);
