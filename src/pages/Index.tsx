import { ContactForm } from "@/components/ContactForm";
import { BookingSection } from "@/components/BookingSection";
import { CanvasWaveBackground } from "@/components/CanvasWaveBackground";
import { SummarySection } from "@/components/SummarySection";
import { OperatingPrinciples } from "@/components/OperatingPrinciples";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/HeroSection";
import { LogoMarquee } from "@/components/LogoMarquee";
import { SiteHeader } from "@/components/SiteHeader";

import speakingImage from "@/assets/goswijn-thinking.jpg";
import { useEffect, useState } from "react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollY, setScrollY] = useState(0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, observerOptions);
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      animatedElements.forEach((el) => observer.unobserve(el));
      sections.forEach((section) => sectionObserver.unobserve(section));
    };
  }, []);

  return (
    <div className="relative w-full">
      <CanvasWaveBackground />
      <SiteHeader activeSection={activeSection} scrollToSection={scrollToSection} />

      <HeroSection scrollY={scrollY} scrollToSection={scrollToSection} />

      <SummarySection />

      <OperatingPrinciples />

      {/* Contact & Booking Section */}
      <section
        id="contact"
        className="relative py-24 px-6 md:px-12 lg:px-16 overflow-hidden animate-on-scroll"
      >
        
        {/* Parallax background elements */}
        <div
          className="absolute top-0 left-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl"
          style={{ transform: `translateY(${(scrollY - 800) * 0.1}px)` }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-foreground/5 blur-3xl"
          style={{ transform: `translateY(${(scrollY - 800) * 0.15}px)` }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Left: Image */}
            <div className="relative h-[420px] lg:h-auto animate-on-scroll rounded-lg overflow-hidden shadow-2xl">
              <img
                src={speakingImage}
                alt="Goswijn Thijssen in a thoughtful moment during a business discussion"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "center top" }}
              />
            </div>

            {/* Right: Booking + Contact */}
            <div className="animate-on-scroll space-y-8" style={{ animationDelay: "0.2s" }}>
              <div>
                <h2 className="text-2xl md:text-3xl text-foreground mb-2">Let's connect</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Feel free to provide me with as much background as possible as this will significantly improve the
                  value of our conversation.
                </p>
                <BookingSection />
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Leave your contact details below and I will get back to you as soon as possible
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <LogoMarquee />
    </div>
  );
};

export default Index;
