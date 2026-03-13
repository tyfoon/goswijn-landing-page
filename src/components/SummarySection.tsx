import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface EvidenceCard {
  id: string;
  title: string;
  context: string;
  achievements: {
    situation: string;
    action: string;
    result: string;
  }[];
}

const evidenceData: Record<string, EvidenceCard> = {
  "hyper-growth": {
    id: "hyper-growth",
    title: "High-Velocity Scale-Up & Big Tech Multi-Geo",
    context: "10+ years driving sustainable, multi-geo hyper-growth across VC-backed startups and Big Tech platforms.",
    achievements: [
      {
        situation: "An unknown VC-backed startup navigating the dot-com crash.",
        action: "Built global marketing from scratch, scaling the team from 10 to 150+ FTEs.",
        result: "Scaled revenue from $0 to $30M, established market leadership, and secured a successful acquisition.",
      },
      {
        situation: "Tasked with scaling the Corporate Accounts organization across EMEA at Microsoft.",
        action: "Led enterprise sales, marketing, and partner teams across multiple geographies.",
        result: "Accelerated YoY revenue growth to >25%, reaching $150M ARR.",
      },
    ],
  },
  "operational-rigor": {
    id: "operational-rigor",
    title: "P&L Owner: Corporate Rigor & Situational Grit",
    context: "Heavy P&L ownership and turnaround leadership across PE-backed and Fortune 500 environments.",
    achievements: [
      {
        situation: "A $30M+ PE/Founder-backed business (350M users) at Eyeo needing preparation for IPO/Exit.",
        action: "Restructured a fragmented 80+ FTE organization, making tough calls to align Product, Engineering, and Sales.",
        result: "Currently driving 20% ARR growth and 20% EBITDA optimization.",
      },
      {
        situation: "Thrown into the deep end at ExxonMobil via forced job rotation with full P&L responsibility for 30 retail sites ($200M+ revenue).",
        action: "Applied relentless operational rigor to optimize the network and negotiate $100M+ in investments.",
        result: "Increased overall network profitability by 82% over 3 years.",
      },
    ],
  },
  "complex-tech": {
    id: "complex-tech",
    title: "Commercial Technologist",
    context: "Bridging deep technology platforms with Enterprise Sales at Microsoft and Google Cloud.",
    achievements: [
      {
        situation: "Programmatic advertising was a highly complex, emerging technology needing market adoption at Google DoubleClick.",
        action: "Built the programmatic business in the Benelux from absolute zero, bridging deep tech with a scalable GTM partner strategy.",
        result: "Scaled revenue 200x (from $1M to >$200M), building EMEA's fastest-growing unit.",
      },
      {
        situation: "A fragmented GTM approach across DACH, Nordics, and CEE at Google Cloud.",
        action: "Spearheaded Martech/AI initiatives, shifting strategic focus purely to high-yield, complex differentiators (Security, Data, AI).",
        result: "Translated complex tech into commercial reality, generating >$750M in annual enterprise pipeline.",
      },
    ],
  },
  "gtm-engines": {
    id: "gtm-engines",
    title: "Data-Driven GTM Engines",
    context: "Executive matrix leadership under extreme constraints at Google Cloud and Eyeo.",
    achievements: [
      {
        situation: "Mandated to double the business under extreme constraints: a flat $15M budget and zero headcount growth.",
        action: "Built a unified GTM engine by implementing shared OKRs across BDRs, Sales, and Customer Success to break down silos.",
        result: "Achieved #1 global productivity, delivering 95% YoY growth in revenue-generating outcomes.",
      },
      {
        situation: "The business at Eyeo needed a transition from unpredictable startup motions to a mature SaaS model.",
        action: "Architected a data-driven GTM engine connecting the entire funnel.",
        result: "Delivered highly predictable, sustainable margin growth (20% ARR) without breaking the organizational culture.",
      },
    ],
  },
};

// Cards on left or right side of viewport
const cardSide: Record<string, "left" | "right"> = {
  "hyper-growth": "right",
  "operational-rigor": "left",
  "complex-tech": "right",
  "gtm-engines": "left",
};

const SummarySection = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [lineCoords, setLineCoords] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const isMobile = useIsMobile();

  const handleHover = useCallback((id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveCard(id);
  }, []);

  const handleLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveCard(null);
    }, 200);
  }, []);

  const handleCardEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const handleCardLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveCard(null);
    }, 200);
  }, []);

  const handleTap = useCallback((id: string) => {
    setActiveCard((prev) => (prev === id ? null : id));
  }, []);

  // Calculate connecting line coordinates
  useEffect(() => {
    if (!activeCard || isMobile || !sectionRef.current) {
      setLineCoords(null);
      return;
    }

    const updateLine = () => {
      const triggerEl = triggerRefs.current[activeCard];
      const cardEl = cardRef.current;
      const sectionEl = sectionRef.current;

      if (!triggerEl || !cardEl || !sectionEl) {
        setLineCoords(null);
        return;
      }

      const sectionRect = sectionEl.getBoundingClientRect();
      const triggerRect = triggerEl.getBoundingClientRect();
      const cardRect = cardEl.getBoundingClientRect();

      const side = cardSide[activeCard];

      const x1 = side === "right"
        ? triggerRect.right - sectionRect.left
        : triggerRect.left - sectionRect.left;
      const y1 = triggerRect.top + triggerRect.height / 2 - sectionRect.top;

      const x2 = side === "right"
        ? cardRect.left - sectionRect.left
        : cardRect.right - sectionRect.left;
      const y2 = cardRect.top + Math.min(60, cardRect.height / 2) - sectionRect.top;

      setLineCoords({ x1, y1, x2, y2 });
    };

    const timer = setTimeout(updateLine, 80);
    return () => clearTimeout(timer);
  }, [activeCard, isMobile]);

  // Clear line immediately when card closes
  useEffect(() => {
    if (!activeCard) {
      setLineCoords(null);
    }
  }, [activeCard]);

  const InteractivePhrase = ({
    id,
    children,
  }: {
    id: string;
    children: React.ReactNode;
  }) => (
    <span
      ref={(el) => { triggerRefs.current[id] = el; }}
      onMouseEnter={!isMobile ? () => handleHover(id) : undefined}
      onMouseLeave={!isMobile ? handleLeave : undefined}
      onClick={isMobile ? () => handleTap(id) : undefined}
      className={`
        relative cursor-pointer transition-all duration-300
        border-b-2 border-dashed
        ${
          activeCard === id
            ? "border-accent text-accent"
            : "border-accent/40 text-foreground/90 hover:text-accent hover:border-accent"
        }
      `}
    >
      {children}
    </span>
  );

  const currentCard = activeCard ? evidenceData[activeCard] : null;
  const currentSide = activeCard ? cardSide[activeCard] : null;

  return (
    <section
      id="summary"
      ref={sectionRef}
      className="relative min-h-screen overflow-visible"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px]" />
      </div>

      {/* Connecting line SVG */}
      <AnimatePresence>
        {lineCoords && activeCard && !isMobile && (
          <motion.svg
            key="connector-line"
            className="absolute inset-0 w-full h-full pointer-events-none z-15"
            style={{ overflow: "visible" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.path
              d={`M ${lineCoords.x1} ${lineCoords.y1} C ${(lineCoords.x1 + lineCoords.x2) / 2} ${lineCoords.y1}, ${(lineCoords.x1 + lineCoords.x2) / 2} ${lineCoords.y2}, ${lineCoords.x2} ${lineCoords.y2}`}
              stroke="hsl(var(--accent) / 0.25)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            <motion.circle
              cx={lineCoords.x1}
              cy={lineCoords.y1}
              r="3"
              fill="hsl(var(--accent) / 0.5)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
          </motion.svg>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div>
            <span className="text-accent/60 text-xs md:text-sm font-mono tracking-[0.2em] uppercase">
              Track Record
            </span>
            <div className="mt-2 w-12 h-[2px] bg-accent/30" />
          </div>
        </motion.div>

        {/* Main content area */}
        <div className="relative">
          {/* Summary text - centered, narrower, smaller */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <p className="text-base md:text-lg lg:text-xl leading-relaxed md:leading-relaxed lg:leading-[1.9] text-foreground/85 font-light max-w-3xl text-center">
              <InteractivePhrase id="hyper-growth">
                Driving sustainable, multi-geo hyper-growth
              </InteractivePhrase>{" "}
              across Big Tech and high-velocity scale-ups. As a P&L owner, I{" "}
              <InteractivePhrase id="operational-rigor">
                combine corporate operational rigor with situational grit
              </InteractivePhrase>
              . As a 'Commercial Technologist', I{" "}
              <InteractivePhrase id="complex-tech">
                bridge complex tech (AI, Data, Cloud, AdTech) with commercial
                scaling
              </InteractivePhrase>
              ,{" "}
              <InteractivePhrase id="gtm-engines">
                building data-driven GTM engines that capture market share and
                deliver predictable ARR and profitability without breaking
              </InteractivePhrase>
              .
            </p>

            <p className="mt-6 text-xs text-muted-foreground">
              {isMobile ? "← Tap" : "← Hover over"} the highlighted phrases to explore the evidence
            </p>
          </motion.div>

          {/* Evidence Card - positioned at edges on desktop */}
          <AnimatePresence mode="wait">
            {currentCard && !isMobile && (
              <motion.div
                key={currentCard.id}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8,
                }}
                ref={cardRef}
                onMouseEnter={handleCardEnter}
                onMouseLeave={handleCardLeave}
                className={`absolute z-20 hidden lg:block -top-4 ${
                  currentSide === "left" ? "-left-8 xl:-left-16" : "-right-8 xl:-right-16"
                }`}
                style={{ maxWidth: "560px", minWidth: "480px" }}
              >
                <div className="w-full rounded-xl border border-accent/20 bg-card/[0.97] backdrop-blur-2xl shadow-[0_8px_60px_-12px_hsl(210,70%,45%,0.15)] overflow-hidden">
                  {/* Card header */}
                  <div className="px-8 pt-6 pb-4 border-b border-accent/10 flex items-center justify-between">
                    <div>
                      <h3 className="text-accent text-sm font-mono tracking-[0.15em] uppercase">
                        {currentCard.title}
                      </h3>
                      <p className="mt-1.5 text-muted-foreground text-sm leading-relaxed">
                        {currentCard.context}
                      </p>
                    </div>
                  </div>

                  {/* SAR entries - horizontal layout */}
                  <div className={`px-8 py-6 ${currentCard.achievements.length > 1 ? 'grid grid-cols-2 gap-6' : ''}`}>
                    {currentCard.achievements.map((sar, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 + i * 0.08 }}
                        className="space-y-2"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                          <p className="text-muted-foreground text-xs leading-relaxed">
                            {sar.situation} {sar.action}
                          </p>
                        </div>
                        <div className="ml-[18px] pl-3 border-l-2 border-accent/30">
                          <p className="text-foreground text-sm font-medium">
                            → {sar.result}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile: Cards appear below text */}
          <AnimatePresence mode="wait">
            {currentCard && isMobile && (
              <motion.div
                key={`mobile-${currentCard.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="lg:hidden mt-8"
              >
                <div className="rounded-xl border border-accent/20 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <div className="px-5 pt-5 pb-3 border-b border-accent/10">
                    <h3 className="text-accent text-xs font-mono tracking-[0.15em] uppercase">
                      {currentCard.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground text-xs leading-relaxed">
                      {currentCard.context}
                    </p>
                  </div>
                  <div className="px-5 py-4 space-y-4">
                    {currentCard.achievements.map((sar, i) => (
                      <div key={i} className="space-y-1.5">
                        <div className="flex items-start gap-2.5">
                          <div className="mt-1.5 w-1 h-1 rounded-full bg-accent/60 flex-shrink-0" />
                          <p className="text-muted-foreground text-xs leading-relaxed">
                            {sar.situation} {sar.action}
                          </p>
                        </div>
                        <div className="ml-[14px] pl-3 border-l-2 border-accent/30">
                          <p className="text-foreground text-xs font-medium">
                            → {sar.result}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export { SummarySection };
