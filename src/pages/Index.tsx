import { ContactForm } from "@/components/ContactForm";
import { BookingSection } from "@/components/BookingSection";
import { Button } from "@/components/ui/button";

import portraitImage from "@/assets/goswijn-portrait-new.png";
import speakingImage from "@/assets/goswijn-thinking.jpg";
import linkedinIcon from "@/assets/linkedin-icon.jpg";
import adblockPlusLogo from "@/assets/adblock-plus.svg";
import adblockLogo from "@/assets/adblock.svg";
import doubleclickLogo from "@/assets/doubleclick.jpg";
import exxonLogo from "@/assets/exxon.png";
import eyeoLogo from "@/assets/eyeo.png";
import googleLogo from "@/assets/google.png";
import microsoftLogo from "@/assets/microsoft.png";
import tridionLogo from "@/assets/tridion.png";
import googleCloudLogo from "@/assets/google-cloud.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: "smooth"
    });
    setMobileMenuOpen(false);
  };
  useEffect(() => {
    // Parallax scroll handler
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    // Scroll animation observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    // Section tracking observer
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3
      }
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
      {/* Desktop: Fixed Floating Header */}
      <header className="hidden md:block fixed top-6 left-6 right-6 z-50 px-6 py-2 md:px-8 lg:px-12 glass rounded-lg transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-sm font-medium text-foreground hover:opacity-80 transition-opacity">
              Goswijn Thijssen
            </button>
            <a
              href="https://www.linkedin.com/in/goswijn/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-4 h-4 hover:opacity-80 transition-opacity"
              aria-label="LinkedIn Profile">
              
              <img src={linkedinIcon} alt="LinkedIn" className="w-full h-full" />
            </a>
          </div>

          <nav className="flex items-center gap-6">
            {[
            {
              id: "hero",
              label: "Home"
            },
            {
              id: "contact",
              label: "Let's connect"
            }].
            map((section) =>
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`text-sm font-medium transition-all duration-300 relative pb-1 ${activeSection === section.id ? "text-foreground" : "text-foreground/60 hover:text-foreground"}`}>
              
                {section.label}
                {activeSection === section.id &&
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full" />
              }
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Mobile: Traditional Top Navigation Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 glass border-b border-border/20">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => scrollToSection("hero")} className="text-base font-medium text-foreground">
              Goswijn Thijssen
            </button>
            <a
              href="https://www.linkedin.com/in/goswijn/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-4 h-4"
              aria-label="LinkedIn Profile">
              
              <img src={linkedinIcon} alt="LinkedIn" className="w-full h-full" />
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu">
            
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen &&
        <nav className="border-t border-border/20 glass">
          {[
          {
            id: "hero",
            label: "Home"
          },
          {
            id: "contact",
            label: "Contact & Book"
          }].
          map((section) =>
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="block w-full text-left px-6 py-4 text-base font-medium text-foreground hover:bg-accent transition-colors">
            
                {section.label}
              </button>
          )}
          </nav>
        }
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-background">
        {/* Subtle floating shapes */}
        <div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`
          }} />
        <div
          className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-foreground/5 blur-3xl"
          style={{
            transform: `translateY(${scrollY * 0.15}px)`
          }} />

        {/* Content Container */}
        <div className="relative z-10 flex min-h-screen flex-col pt-14">
          {/* Main Content */}
          <main className="flex flex-1 items-center px-6 md:px-12 lg:px-16 relative z-30">
            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-stretch">
              <div className="flex flex-col justify-between animate-on-scroll">
                <div className="space-y-4">
                  <h2 className="text-2xl leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl">
                    Executive Commercial Leader &amp; Technologist
                  </h2>

                  <ul className="space-y-3 text-base text-foreground md:text-lg">
                    <li className="flex items-start transition-transform duration-300 hover:translate-x-2">
                      <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <span>Building innovative Go to Market strategies</span>
                    </li>
                    <li className="flex items-start transition-transform duration-300 hover:translate-x-2">
                      <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <span>Creating durable and scalable growth</span>
                    </li>
                    <li className="flex items-start transition-transform duration-300 hover:translate-x-2">
                      <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <span>Assuring flawless execution across teams</span>
                    </li>
                  </ul>

                  <p className="text-xs leading-relaxed text-foreground/80 md:text-sm max-w-xl">
                    Executive Commercial Leader &amp; Technologist with deep expertise in SaaS, Data, AdTech and AI and 25+ years of multi-geo leadership. I bridge the gap between the rigor of Big Tech (Google, Microsoft) and the situational grit of PE/VC environments. My strength lies in building durable hypergrowth engines, whether starting from scratch or accelerating existing businesses, by implementing data-driven GTM strategies and leading high-performance teams that combine operational excellence with entrepreneurial speed and innovation.
                  </p>
                </div>

                <div className="pt-4">
                  <Button
                    size="lg"
                    onClick={() => scrollToSection("contact")}
                    className="font-medium shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-primary text-primary-foreground">
                    Let's connect
                  </Button>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end animate-on-scroll" style={{ animationDelay: "0.2s" }}>
                <img
                  src={portraitImage}
                  alt="Goswijn Thijssen"
                  className="w-full max-w-md h-[550px] object-cover rounded-lg shadow-2xl"
                  style={{ objectPosition: "center" }}
                />
              </div>
            </div>
          </main>
        </div>
      </section>
      {/* Contact & Booking Section */}
      <section
        id="contact"
        className="relative bg-background py-24 px-6 md:px-12 lg:px-16 overflow-hidden animate-on-scroll">
        
        {/* Parallax background elements */}
        <div
          className="absolute top-0 left-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl"
          style={{
            transform: `translateY(${(scrollY - 800) * 0.1}px)`
          }} />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-foreground/5 blur-3xl"
          style={{
            transform: `translateY(${(scrollY - 800) * 0.15}px)`
          }} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Image */}
            <div className="flex justify-center lg:justify-start animate-on-scroll">
              <img
                src={speakingImage}
                alt="Goswijn Thijssen Speaking"
                className="w-full h-[600px] object-cover rounded-lg shadow-2xl"
                style={{ objectPosition: "center top" }}
              />
            </div>

            {/* Right: Booking + Contact */}
            <div className="animate-on-scroll space-y-8" style={{ animationDelay: "0.2s" }}>
              <div>
                <h2 className="text-2xl md:text-3xl text-foreground mb-2">Let's connect</h2>
                <p className="text-sm text-foreground/70 mb-4">
                  Feel free to provide me with as much background as possible as this will significantly improve the
                  value of our conversation.
                </p>
                <BookingSection />
              </div>

              <div>
                <p className="text-sm text-foreground/70 mb-4">
                  Leave your contact details below and I will get back to you as soon as possible
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="relative bg-background py-12 px-6 md:px-12 lg:px-16 animate-on-scroll border-t border-border/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            <img
              src={googleLogo}
              alt=""
              className="h-6 md:h-7 w-auto max-w-[120px] object-contain grayscale invert opacity-40 hover:opacity-70 hover:scale-110 transition-all duration-300" />
            
            <img
              src={googleCloudLogo}
              alt=""
              className="h-8 md:h-10 w-auto max-w-[120px] object-contain grayscale invert opacity-50 hover:opacity-70 hover:scale-110 transition-all duration-300" />
            
            <img
              src={microsoftLogo}
              alt=""
              className="h-8 md:h-10 w-auto max-w-[120px] object-contain grayscale invert opacity-50 hover:opacity-70 hover:scale-110 transition-all duration-300" />
            
            <img
              src={doubleclickLogo}
              alt=""
              className="h-15 md:h-20 w-auto max-w-[120px] object-contain grayscale invert opacity-50 hover:opacity-70 hover:scale-110 transition-all duration-300" />
            
            <img
              src={eyeoLogo}
              alt=""
              className="h-5 md:h-6 w-auto max-w-[120px] object-contain grayscale invert opacity-40 hover:opacity-70 hover:scale-110 transition-all duration-300" />
            
            <img
              src={adblockLogo}
              alt=""
              className="h-5 md:h-6 w-auto max-w-[120px] object-contain grayscale invert opacity-50 hover:opacity-70 hover:scale-110 transition-all duration-300" />
            
            <img
              src={exxonLogo}
              alt=""
              className="h-8 md:h-10 w-auto max-w-[120px] object-contain grayscale invert opacity-50 hover:opacity-70 hover:scale-110 transition-all duration-300" />
            
            <img
              src={tridionLogo}
              alt=""
              className="h-8 md:h-10 w-auto max-w-[120px] object-contain grayscale invert opacity-50 hover:opacity-70 hover:scale-110 transition-all duration-300" />
            
            <img
              src={adblockPlusLogo}
              alt=""
              className="h-8 md:h-10 w-auto max-w-[120px] object-contain grayscale invert opacity-50 hover:opacity-70 hover:scale-110 transition-all duration-300" />
            
          </div>
        </div>
      </section>
    </div>);

};
export default Index;