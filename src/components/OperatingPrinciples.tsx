import { motion } from "framer-motion";
import { Layers, Network, Compass } from "lucide-react";


const principles = [
  {
    icon: Layers,
    title: "Radical Alignment",
    text: "I build unified GTM engines by ruthlessly aligning Product, Engineering, and Sales. I make data-driven decisions, but I refuse to be data-paralyzed. I actively demand pushback from my teams and believe that constructive friction is essential to maintain momentum and build a scalable revenue machine.",
  },
  {
    icon: Network,
    title: "Translating Complexity",
    text: "Deep technology (AI, Cloud, AdTech) only holds value if the market understands it. When it comes to business transformation, my primary role is curation. I ruthlessly filter out the organizational noise to bridge the gap between highly complex engineering and C-suite business value, turning technical differentiators into predictable pipeline.",
  },
  {
    icon: Compass,
    title: "Situational Grit",
    text: "What you see is what you get. I adapt my leadership to the context—whether navigating dot-com crashes, flat corporate budgets, or PE-backed turnarounds. I lead with transparency, and when the situation demands it, I will gladly get in the trenches to rebuild things from the ground up.",
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
      className="relative py-20 md:py-24 px-6 md:px-12 lg:px-16 overflow-hidden"
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
          <span className="text-accent text-xs section-label tracking-widest uppercase">
            Operating Principles
          </span>
          <div className="mt-2 w-12 h-[2px] bg-accent/40" />
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
              className="group relative rounded-xl border border-white/10 bg-card/80 backdrop-blur-sm p-8 transition-all duration-500 hover:border-accent/30 hover:shadow-lg shadow-black/40 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="mb-6 inline-flex items-center justify-center w-11 h-11 rounded-lg bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/15">
                <principle.icon className="w-7 h-7" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight">
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
