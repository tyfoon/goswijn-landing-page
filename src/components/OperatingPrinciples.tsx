import { motion } from "framer-motion";
import { Layers, Network, Compass } from "lucide-react";
import { AnimatedDotGrid } from "@/components/AnimatedDotGrid";

const principles = [
  {
    icon: Layers,
    title: "Radical Alignment",
    text: "I don't believe in silos. Whether it's connecting Product and Engineering with Sales, or aligning BDRs with Customer Success, I build unified GTM engines. I implement shared OKRs and relentless operational rigor to ensure the entire organization moves as one revenue-generating machine.",
  },
  {
    icon: Network,
    title: "Translating Complexity",
    text: "Deep technology (AI, Cloud, programmatic AdTech) only holds value if the market understands it. My core competency is bridging the gap between highly complex engineering and C-suite business value, turning technical differentiators into scalable, predictable pipeline velocity.",
  },
  {
    icon: Compass,
    title: "Situational Grit",
    text: "Having navigated everything from forced job rotations at ExxonMobil and dot-com crash startups to matrixed Big Tech environments with flat budgets, I adapt my leadership to the context. I lead with transparency, empower teams with data, and am never afraid to dive into the operational trenches when the business requires it.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 30,
      delay: 0.15 * i,
    },
  }),
};

export const OperatingPrinciples = () => {
  return (
    <section
      id="principles"
      className="relative bg-secondary/30 py-24 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden dot-grid"
    >
      {/* Ambient radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/[0.03] blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-accent/60 text-xs md:text-sm font-mono tracking-[0.2em] uppercase">
            Operating Principles
          </span>
          <div className="mt-2 w-12 h-[2px] bg-accent/30" />
          <p className="mt-4 text-muted-foreground text-sm md:text-base max-w-lg">
            How I build, scale, and lead multi-geo organizations.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {principles.map((principle, i) => (
            <motion.div
              key={principle.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              className="group relative rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-8 transition-all duration-500 hover:border-accent/30 hover:shadow-[0_8px_40px_-12px_hsl(210,70%,45%,0.12)] hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="mb-6 inline-flex items-center justify-center w-11 h-11 rounded-lg bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/15">
                <principle.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-3 tracking-tight">
                {principle.title}
              </h3>

              {/* Text */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {principle.text}
              </p>

              {/* Subtle corner accent on hover */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 right-0 w-[1px] h-8 bg-gradient-to-b from-accent/40 to-transparent" />
                <div className="absolute top-0 right-0 h-[1px] w-8 bg-gradient-to-l from-accent/40 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
