import { ContactForm } from "@/components/ContactForm";
import { BookingSection } from "@/components/BookingSection";
import { Button } from "@/components/ui/button";
import backgroundImage from "@/assets/goswijn-background.png";
import portraitImage from "@/assets/goswijn-portrait.png";
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

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
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
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
      sections.forEach((section) => sectionObserver.unobserve(section));
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* Fixed Header with Section Indicators */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-2 md:px-12 lg:px-16 bg-background/80 backdrop-blur-md transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-xl tracking-tight text-foreground hover:opacity-80 transition-opacity"
            >
              Goswijn Thijssen
            </button>
            <a
              href="https://www.linkedin.com/in/goswijn/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 hover:opacity-80 transition-opacity"
              aria-label="LinkedIn Profile"
            >
              <img src={linkedinIcon} alt="LinkedIn" className="w-full h-full rounded" />
            </a>
          </div>
          
          {/* Section Navigation Indicators */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { id: "hero", label: "Home" },
              { id: "contact", label: "Contact" },
              { id: "booking", label: "Book" }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-sm font-medium transition-all duration-300 relative pb-1 ${
                  activeSection === section.id
                    ? "text-foreground"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {section.label}
                {activeSection === section.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen w-full overflow-hidden">
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat bg-fixed"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex min-h-screen flex-col pt-14">
          {/* Main Content */}
          <main className="flex flex-1 items-start px-6 pt-16 md:px-12 lg:px-16 md:pt-24 relative z-30">
            <div className="max-w-xl space-y-8 animate-on-scroll relative z-30">
              <div className="space-y-6 relative z-30">
                <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl relative z-30">
                  <span className="inline-block md:whitespace-nowrap w-fit">Breakthrough changes.</span>
                  <span className="inline-block md:whitespace-nowrap w-fit">Proven impact.</span>
                </h2>

                <ul className="relative z-30 space-y-4 text-lg font-medium text-foreground md:text-xl">
                  <li className="flex items-start transition-transform duration-300 hover:translate-x-2">
                    <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground" />
                    <span>Building innovative Go to Market strategies</span>
                  </li>
                  <li className="flex items-start transition-transform duration-300 hover:translate-x-2">
                    <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground" />
                    <span>Creating scalable and sustained revenue growth</span>
                  </li>
                  <li className="flex items-start transition-transform duration-300 hover:translate-x-2">
                    <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground" />
                    <span>Assuring flawless execution across teams</span>
                  </li>
                </ul>
              </div>

              <div className="relative z-30 pt-4 flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="font-medium"
                >
                  Contact Me
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("booking")}
                  className="font-medium"
                >
                  Book Time with Me
                </Button>
              </div>
            </div>
          </main>

          {/* Bottom Gradient with Bio */}
          <div className="relative mt-auto pointer-events-none z-20">
            <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-background via-background/95 to-transparent z-10" />
            <div className="relative px-6 py-8 md:px-12 lg:px-16 pointer-events-auto z-20">
              <p className="w-full text-xs leading-tight text-foreground md:text-sm lg:text-base">
                I am an entrepreneurial and results-driven commercial executive with 25+ years of leadership experience in technology and SaaS within international scale-ups and organisations like Google and Microsoft. My core strength lies in building durable and scalable hypergrowth up towards 1B+ revenue. From scratch or within existing business. I do this by developing and executing adaptive, customer focussed Go-to-Market strategies and building teams that deliver breakthrough results through stellar collaboration and operational excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative bg-background py-24 px-6 md:px-12 lg:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div className="flex justify-center lg:justify-start animate-on-scroll">
              <img
                src={portraitImage}
                alt="Goswijn Thijssen"
                className="w-full max-w-md h-[600px] object-cover rounded-lg shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
                style={{
                  objectPosition: 'center'
                }}
              />
            </div>
            <div className="animate-on-scroll" style={{ animationDelay: "0.2s" }}>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Reach out
                </h2>
                <p className="text-lg text-foreground/70">
                  Leave your contact details below and I will get back to you as soon as possible
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section
        id="booking"
        className="relative py-16 px-6 md:px-12 lg:px-16 overflow-hidden"
      >
        {/* Parallax Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 bg-fixed"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="animate-on-scroll">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Book a Session
                </h2>
                <div className="space-y-3">
                  <p className="text-lg text-foreground/70">
                    Schedule a focused consultation to discuss how you can reach your business goals by taking a good look at your Go-to-Market strategy and how it can be improved to create sustained hyper growth.
                  </p>
                  <p className="text-lg text-foreground/70">
                    Feel free to provide me with as much background as possible as this will significantly improve the value of our conversation.
                  </p>
                </div>
              </div>
              <BookingSection />
            </div>
            
            <div className="flex justify-center lg:justify-end animate-on-scroll" style={{ animationDelay: "0.2s" }}>
              <img
                src={speakingImage}
                alt="Goswijn Thijssen Speaking"
                className="w-full max-w-md h-[500px] object-cover rounded-lg shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
                style={{
                  objectPosition: 'center'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="relative bg-background py-12 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            <img src={googleLogo} alt="" className="h-6 md:h-7 w-auto max-w-[120px] object-contain grayscale opacity-40 hover:opacity-70 transition-opacity" />
            <img src={googleCloudLogo} alt="" className="h-8 md:h-10 w-auto max-w-[120px] object-contain grayscale opacity-60 hover:opacity-80 transition-opacity" />
            <img src={microsoftLogo} alt="" className="h-8 md:h-10 w-auto max-w-[120px] object-contain grayscale opacity-60 hover:opacity-80 transition-opacity" />
            <img src={doubleclickLogo} alt="" className="h-15 md:h-20 w-auto max-w-[120px] object-contain grayscale opacity-60 hover:opacity-80 transition-opacity" />
            <img src={eyeoLogo} alt="" className="h-5 md:h-6 w-auto max-w-[120px] object-contain grayscale opacity-40 hover:opacity-70 transition-opacity" />
            <img src={adblockLogo} alt="" className="h-5 md:h-6 w-auto max-w-[120px] object-contain grayscale opacity-60 hover:opacity-80 transition-opacity" />
            <img src={exxonLogo} alt="" className="h-8 md:h-10 w-auto max-w-[120px] object-contain grayscale opacity-60 hover:opacity-80 transition-opacity" />
            <img src={tridionLogo} alt="" className="h-8 md:h-10 w-auto max-w-[120px] object-contain grayscale opacity-60 hover:opacity-80 transition-opacity" />
            <img src={adblockPlusLogo} alt="" className="h-8 md:h-10 w-auto max-w-[120px] object-contain grayscale opacity-60 hover:opacity-80 transition-opacity" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
