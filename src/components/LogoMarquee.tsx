import adblockPlusLogo from "@/assets/adblock-plus.svg";
import adblockLogo from "@/assets/adblock.svg";
import doubleclickLogo from "@/assets/doubleclick.jpg";
import exxonLogo from "@/assets/exxon.png";
import eyeoLogo from "@/assets/eyeo.png";
import googleLogo from "@/assets/google.png";
import microsoftLogo from "@/assets/microsoft.png";
import tridionLogo from "@/assets/tridion.png";
import googleCloudLogo from "@/assets/google-cloud.svg";

const logos = [
  { src: googleLogo, alt: "Google", height: "h-6 md:h-7" },
  { src: googleCloudLogo, alt: "Google Cloud", height: "h-8 md:h-10" },
  { src: microsoftLogo, alt: "Microsoft", height: "h-8 md:h-10" },
  { src: doubleclickLogo, alt: "DoubleClick", height: "h-15 md:h-20" },
  { src: eyeoLogo, alt: "Eyeo", height: "h-5 md:h-6" },
  { src: adblockLogo, alt: "Adblock", height: "h-5 md:h-6" },
  { src: exxonLogo, alt: "ExxonMobil", height: "h-8 md:h-10" },
  { src: tridionLogo, alt: "Tridion", height: "h-8 md:h-10" },
  { src: adblockPlusLogo, alt: "Adblock Plus", height: "h-8 md:h-10" },
];

export const LogoMarquee = () => {
  // Duplicate logos for seamless infinite scroll
  const allLogos = [...logos, ...logos];

  return (
    <section
      className="relative bg-background py-12 overflow-hidden border-t border-border/30"
      aria-label="Companies I've worked with"
    >
      <div className="flex animate-marquee w-max">
        {allLogos.map((logo, i) => (
          <div key={i} className="flex items-center justify-center px-8 md:px-12 lg:px-16 flex-shrink-0">
            <img
              src={logo.src}
              alt={logo.alt}
              className={`${logo.height} w-auto max-w-[120px] object-contain brightness-75 opacity-50 hover:opacity-80 hover:brightness-100 transition-all duration-300`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
