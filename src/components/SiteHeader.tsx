import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import linkedinIcon from "@/assets/linkedin-icon.jpg";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "summary", label: "Track Record" },
  { id: "principles", label: "Principles" },
  { id: "contact", label: "Let's connect" },
];

interface SiteHeaderProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export const SiteHeader = ({ activeSection, scrollToSection }: SiteHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  const handleNav = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  // Close mobile menu on click outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Desktop */}
      <header className="hidden md:block fixed top-6 left-6 right-6 z-50 px-6 py-2 md:px-8 lg:px-12 glass rounded-lg transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav("hero")}
              className="text-sm font-medium text-foreground hover:opacity-80 transition-opacity"
            >
              Goswijn Thijssen
            </button>
            <a
              href="https://www.linkedin.com/in/goswijn/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-4 h-4 hover:opacity-80 transition-opacity"
              aria-label="LinkedIn Profile"
            >
              <img src={linkedinIcon} alt="" className="w-full h-full" aria-hidden="true" />
            </a>
          </div>

          <nav className="flex items-center gap-6">
            {NAV_ITEMS.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNav(section.id)}
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

      {/* Mobile */}
      <header ref={menuRef} className="md:hidden fixed top-0 left-0 right-0 z-50 glass border-b border-border/20">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => handleNav("hero")} className="text-base font-medium text-foreground">
              Goswijn Thijssen
            </button>
            <a
              href="https://www.linkedin.com/in/goswijn/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-4 h-4"
              aria-label="LinkedIn Profile"
            >
              <img src={linkedinIcon} alt="" className="w-full h-full" aria-hidden="true" />
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-border/20 glass animate-fade-in">
            {NAV_ITEMS.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNav(section.id)}
                className="block w-full text-left px-6 py-4 text-base font-medium text-foreground hover:bg-accent/10 transition-colors min-h-[48px]"
              >
                {section.label}
              </button>
            ))}
          </nav>
        )}
      </header>
    </>
  );
};
