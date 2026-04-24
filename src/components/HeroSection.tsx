import { Button } from "@/components/ui/button";

import portraitImage from "@/assets/goswijn-portrait-new.png";

interface HeroSectionProps {
  scrollY: number;
  scrollToSection: (id: string) => void;
}

export const HeroSection = ({ scrollY, scrollToSection }: HeroSectionProps) => {
  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden">
      

      {/* Subtle floating shapes */}
      <div
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }} />
      
      <div
        className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-foreground/5 blur-3xl"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }} />
      

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col pt-20 md:pt-14">
        <main className="flex flex-1 items-center px-6 md:px-12 lg:px-16 relative z-30 py-6 md:py-0">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-stretch">
            {/* Portrait - mobile */}
            <div className="flex justify-center lg:hidden animate-on-scroll">
              <img
                src={portraitImage}
                alt="Goswijn Thijssen, Executive Commercial Leader"
                className="w-48 h-48 object-cover rounded-full shadow-2xl"
                style={{ objectPosition: "center top" }} />
              
            </div>

            <div className="flex flex-col justify-between animate-on-scroll">
              <div className="space-y-4 md:space-y-6 lg:space-y-8">
                <h1 className="text-4xl leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl font-medium">
                  Executive Commercial Leader &amp; Technologist
                </h1>

                <ul className="space-y-2 md:space-y-4 text-base text-foreground md:text-lg lg:text-xl">
                  <li className="flex items-start transition-transform duration-300 hover:translate-x-2">
                    <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>Builder who started solo at Google and scaled DoubleClick from $500K to $200M+ ARR</span>
                  </li>
                  <li className="flex items-start transition-transform duration-300 hover:translate-x-2">
                    <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>Commercial Technologist bridging deep tech (AI, SaaS, Cloud, AdTech) with commercial scale</span>
                  </li>
                  <li className="flex items-start transition-transform duration-300 hover:translate-x-2">
                    <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>25+ years combining Big Tech rigor with PE/founder-backed grit</span>
                  </li>
                </ul>

                <p className="text-xs leading-relaxed text-foreground/80 sm:text-sm md:text-base max-w-xl">With 25+ years of multi-geo leadership, including as a Director at Google and executive at Microsoft, I build data-driven GTM engines that capture market share. I bridge the gap between deep technical complexity and commercial strategy, delivering durable growth and profitability without breaking the organization.

                </p>
              </div>

              <div className="pt-4 flex gap-3">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("summary")}
                  className="font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 bg-accent text-accent-foreground">
                  
                  View Track Record
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("contact")}
                  className="font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border-white/30 text-foreground hover:bg-foreground/10">
                  
                  Let's connect
                </Button>
              </div>
            </div>

            {/* Portrait - desktop */}
            <div className="hidden lg:flex justify-end animate-on-scroll" style={{ animationDelay: "0.2s" }}>
              <img
                src={portraitImage}
                alt="Goswijn Thijssen — multi-geo commercial leader and technologist"
                loading="lazy"
                className="w-full max-w-md h-[550px] object-cover rounded-lg shadow-2xl"
                style={{ objectPosition: "center" }} />
              
            </div>
          </div>
        </main>
      </div>
    </section>);

};