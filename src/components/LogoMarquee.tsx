import { AnimatedDotGrid } from "@/components/AnimatedDotGrid";
import adblockPlusLogo from "@/assets/adblock-plus.svg";
import adblockLogo from "@/assets/adblock.svg";
import doubleclickLogo from "@/assets/doubleclick.png";
import exxonLogo from "@/assets/exxon.png";
import eyeoLogo from "@/assets/eyeo.png";
import googleLogo from "@/assets/google.png";
import microsoftLogo from "@/assets/microsoft.png";
import tridionLogo from "@/assets/tridion-transparent.png";
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
  return (
    <section
      className="relative bg-background py-12 border-t border-border/30"
      aria-label="Companies I've worked with"
    >
      <AnimatedDotGrid />
    >
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16 max-w-5xl mx-auto px-6">
        {logos.map((logo, i) => (
          <div key={i} className="flex items-center justify-center">
            <img
              src={logo.src}
              alt={logo.alt}
              className={`${logo.height} w-auto max-w-[120px] object-contain grayscale opacity-40 brightness-200 contrast-50`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
