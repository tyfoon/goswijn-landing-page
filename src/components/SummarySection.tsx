import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { evidenceData, cardSide } from "./summary/evidenceData";
import { EvidenceCardDesktop } from "./summary/EvidenceCardDesktop";
import { EvidenceCardMobile } from "./summary/EvidenceCardMobile";
import { LogoBanner } from "./LogoBanner";

const SummarySection = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobile = useIsMobile();

  const handleHover = useCallback((id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveCard(id);
  }, []);

  const handleLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setActiveCard(null), 200);
  }, []);

  const handleCardEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const handleCardLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setActiveCard(null), 200);
  }, []);

  const handleTap = useCallback((id: string) => {
    setActiveCard((prev) => (prev === id ? null : id));
  }, []);

  // Position card so it stays within viewport, overlapping text upward if needed
  useEffect(() => {
    if (activeCard && cardContainerRef.current) {
      const container = cardContainerRef.current;
      const child = container.firstElementChild as HTMLElement | null;
      if (!child) return;

      // Reset first to measure natural position
      child.style.marginTop = '';

      requestAnimationFrame(() => {
        const rect = child.getBoundingClientRect();
        const overflow = rect.bottom - window.innerHeight + 16; // 16px padding from bottom
        if (overflow > 0) {
          child.style.marginTop = `-${overflow}px`;
        }
      });
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
      onMouseEnter={!isMobile ? () => handleHover(id) : undefined}
      onMouseLeave={!isMobile ? handleLeave : undefined}
      onClick={isMobile ? () => handleTap(id) : undefined}
      className={`
        relative cursor-pointer transition-all duration-300
        border-b-2 border-dashed cursor-pointer
        ${
          activeCard === id
            ? "border-accent text-accent"
            : "border-accent/50 text-foreground/90 hover:text-accent hover:border-accent"
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
      className="relative min-h-screen overflow-x-hidden flex flex-col"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-24 flex-1">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div>
            <span className="text-accent text-xs section-label tracking-widest uppercase">
              Track Record
            </span>
            <div className="mt-2 w-12 h-[2px] bg-accent/40" />
          </div>
        </motion.div>

        {/* Main text — always centered, unaffected by cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <p className="text-base md:text-lg lg:text-xl leading-relaxed md:leading-relaxed lg:leading-[1.9] text-foreground/85 font-light max-w-3xl text-left">
            Driving sustainable,{" "}
            <InteractivePhrase id="multi-geo">multi-geo</InteractivePhrase>{" "}
            hyper-growth across{" "}
            <InteractivePhrase id="big-tech">Big Tech</InteractivePhrase> and{" "}
            <InteractivePhrase id="scale-ups">
              high-velocity scale-ups
            </InteractivePhrase>
            , whether{" "}
            <InteractivePhrase id="one-to-hundred">
              scaling from 1 to 100
            </InteractivePhrase>{" "}
            or driving{" "}
            <InteractivePhrase id="transformations">
              fundamental transformations
            </InteractivePhrase>
            .{" "}
            <InteractivePhrase id="pnl-owner">
              As a P&L owner, I combine corporate operational rigor with
              situational grit
            </InteractivePhrase>
            . As a 'Commercial Technologist', I{" "}
            <InteractivePhrase id="bridge-tech">
              bridge complex tech (AI, SaaS, Cloud, AdTech) with commercial
              strategy and scaling
            </InteractivePhrase>
            ,{" "}
            <InteractivePhrase id="gtm-engines">
              building data-driven GTM engines (direct &amp; partner) that
              capture market share and deliver predictable ARR and
              profitability without breaking
            </InteractivePhrase>
            .
          </p>

          <p className="mt-6 text-xs text-muted-foreground text-left w-full max-w-3xl">
            {isMobile ? "← Tap" : "← Hover over"} the highlighted phrases to
            explore the evidence
          </p>
        </motion.div>

        {/* Evidence cards — independent centered container */}
        <div ref={cardContainerRef} className="relative z-30 flex justify-center">
          <AnimatePresence mode="wait">
            {currentCard && !isMobile && currentSide && (
              <EvidenceCardDesktop
                card={currentCard}
                side={currentSide}
                onMouseEnter={handleCardEnter}
                onMouseLeave={handleCardLeave}
              />
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {currentCard && isMobile && (
              <EvidenceCardMobile card={currentCard} />
            )}
          </AnimatePresence>
        </div>

      </div>
      <LogoBanner />
    </section>
  );
};

export { SummarySection };
