import { ContactForm } from "@/components/ContactForm";
import { BookingSection } from "@/components/BookingSection";
import { Button } from "@/components/ui/button";
import backgroundImage from "@/assets/goswijn-background.png";
import portraitImage from "@/assets/goswijn-portrait.png";
import speakingImage from "@/assets/goswijn-thinking.jpg";
import linkedinIcon from "@/assets/linkedin-icon.jpg";

const Index = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-2 md:px-12 lg:px-16 bg-background/80 backdrop-blur-sm border-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity"
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
          <main className="flex flex-1 items-start px-6 pt-16 md:px-12 lg:px-16 md:pt-24">
            <div className="max-w-xl space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  Real step changes. Proven impact.
                </h2>

                <ul className="relative z-20 space-y-4 text-lg font-medium text-foreground md:text-xl">
                  <li className="flex items-start">
                    <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground" />
                    <span>Building Go to Market strategies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground" />
                    <span>Generating sustained revenue growth</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground" />
                    <span>Flawless execution</span>
                  </li>
                </ul>
              </div>

              <div className="relative z-20 pt-4 flex flex-col sm:flex-row gap-4">
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
          <div className="relative mt-auto pointer-events-none">
            <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-background via-background/95 to-transparent" />
            <div className="relative px-6 py-12 md:px-12 lg:px-16 pointer-events-auto">
              <p className="w-full text-sm leading-tight text-foreground md:text-base lg:text-lg">
                I am an entrepreneurial and results-driven commercial executive with extensive
                leadership experience in technology and SaaS within international scale-ups and
                organisations like Google and Microsoft. My career is centered around building
                durable and scalable growth. I do this by developing and executing adaptive,
                customer focussed Go-to-Market strategies and building teams that deliver
                breakthrough results through stellar collaboration and operational excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative bg-background py-24 px-6 md:px-12 lg:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div className="flex justify-center lg:justify-start">
              <img
                src={portraitImage}
                alt="Goswijn Thijssen"
                className="w-full max-w-md h-[600px] object-cover rounded-lg shadow-2xl"
                style={{
                  objectPosition: 'center'
                }}
              />
            </div>
            <div>
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
            <div>
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Book a Session
                </h2>
                <p className="text-lg text-foreground/70">
                  Schedule a focused consultation to discuss your Go-to-Market strategy and growth
                  objectives.
                </p>
              </div>
              <BookingSection />
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <img
                src={speakingImage}
                alt="Goswijn Thijssen Speaking"
                className="w-full max-w-md h-[500px] object-cover rounded-lg shadow-2xl"
                style={{
                  objectPosition: 'center'
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
