import { motion } from "framer-motion";
import type { EvidenceCard } from "./evidenceData";
import { EvidenceRow } from "./SARComponents";

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
    className="lg:hidden"
  >
    <div className="rounded-xl border border-accent/30 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden">
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
                <p className="text-foreground/90 leading-[20px]" style={{ fontSize: "13px" }}>
                  <span className="font-semibold text-foreground">{b.label}:</span> {b.detail}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-foreground/85 italic leading-[20px] mb-3" style={{ fontSize: "13px" }}>
              {card.context}
            </p>
            {card.columns.map((col, i) => (
              <div
                key={i}
                className="rounded-lg border border-border/60 p-3.5 space-y-3 border-l-2 bg-sar-card/50 border-l-sar-accent/25"
              >
                <h4
                  className="text-foreground font-semibold tracking-wide uppercase border-b border-accent/15 pb-1.5"
                  style={{ fontSize: "13px" }}
                >
                  {col.heading}
                </h4>
                {col.situation && (
                  <EvidenceRow text={col.situation} size="sm" />
                )}
                <EvidenceRow text={col.action} size="sm" />
                <EvidenceRow text={col.result} variant="result" size="sm" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </motion.div>
);
