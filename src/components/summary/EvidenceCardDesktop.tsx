import { motion } from "framer-motion";
import type { EvidenceCard } from "./evidenceData";
import { EvidenceRow } from "./SARComponents";

interface Props {
  card: EvidenceCard;
  side: "left" | "right";
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const EvidenceCardDesktop = ({ card, onMouseEnter, onMouseLeave }: Props) => {
  const is3Col = card.layout === "sar" && card.columns.length === 3;

  return (
    <motion.div
      key={card.id}
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`z-20 hidden lg:block w-full ${is3Col ? "max-w-[860px]" : ""}`}
    >
      <div className="w-full rounded-xl border border-accent/30 bg-card/[0.97] backdrop-blur-2xl shadow-lg shadow-black/40 overflow-hidden">
        {/* Header */}
        <div className="px-7 pt-5 pb-3 border-b border-accent/10">
          <h3 className="text-accent text-xs section-label tracking-widest uppercase">
            {card.title}
          </h3>
        </div>

        {/* Body */}
        <div className="px-7 py-5">
          {card.layout === "simple" ? (
            <SimpleLayout bullets={card.bullets} />
          ) : (
            <ColumnLayout context={card.context} columns={card.columns} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

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
          <p className="text-foreground/90 leading-[20px]" style={{ fontSize: "13px" }}>
            <span className="font-semibold text-foreground">{b.label}:</span> {b.detail}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

function ColumnLayout({
  context,
  columns,
}: {
  context: string;
  columns: { heading: string; situation?: string; action: string; result: string }[];
}) {
  return (
    <div className="space-y-5">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="text-foreground/85 italic leading-[20px] mb-3"
        style={{ fontSize: "13px" }}
      >
        {context}
      </motion.p>

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
            className="rounded-lg border border-border/60 p-4 space-y-3 border-l-2 bg-sar-card/50 border-l-sar-accent/25"
          >
            <h4
              className="text-foreground font-semibold tracking-wide uppercase border-b border-accent/15 pb-2"
              style={{ fontSize: "13px" }}
            >
              {col.heading}
            </h4>

            {col.situation && (
              <EvidenceRow text={col.situation} />
            )}
            <EvidenceRow text={col.action} />
            <EvidenceRow text={col.result} variant="result" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
