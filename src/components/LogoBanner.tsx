import { motion } from "framer-motion";

import bisbrickLogo from "@/assets/bisbrick.svg";
import codesandboxLogo from "@/assets/codesandbox.png";
import doubleclickLogo from "@/assets/doubleclick-new.svg";
import exxonLogo from "@/assets/exxon.png";
import eyeoLogo from "@/assets/eyeo.png";
import googleLogo from "@/assets/google.svg";
import googleCloudLogo from "@/assets/google-cloud.svg";
import microsoftLogo from "@/assets/microsoft.png";
import shellLogo from "@/assets/shell.svg";
import tridionLogo from "@/assets/tridion-v2.svg";

import bsaLogo from "@/assets/bsa.svg";
import breinLogo from "@/assets/brein.svg";
import eqtLogo from "@/assets/eqt.png";
import nvpiLogo from "@/assets/nvpi.svg";

interface LogoItem {
  src: string;
  alt: string;
  height: string;
  brightness: string;
}

interface LogoGroup {
  label: string;
  logos: LogoItem[];
}

const groups: LogoGroup[] = [
  {
    label: "Executive Leadership",
    logos: [
      { src: eyeoLogo, alt: "Eyeo", height: "h-4 md:h-5", brightness: "brightness-150" },
      { src: googleCloudLogo, alt: "Google Cloud", height: "h-7 md:h-8", brightness: "brightness-200" },
      { src: googleLogo, alt: "Google", height: "h-5 md:h-6", brightness: "brightness-200" },
      { src: doubleclickLogo, alt: "DoubleClick", height: "h-12 md:h-16", brightness: "brightness-200" },
      { src: microsoftLogo, alt: "Microsoft", height: "h-7 md:h-8", brightness: "brightness-200" },
      { src: tridionLogo, alt: "Tridion", height: "h-7 md:h-8", brightness: "brightness-150" },
    ],
  },
  {
    label: "Early Career",
    logos: [
      { src: exxonLogo, alt: "ExxonMobil", height: "h-7 md:h-8", brightness: "brightness-200" },
      { src: shellLogo, alt: "Shell", height: "h-9 md:h-10", brightness: "brightness-200" },
    ],
  },
  {
    label: "Board & Advisory",
    logos: [
      { src: eqtLogo, alt: "EQT", height: "h-3 md:h-4", brightness: "brightness-200" },
      { src: nvpiLogo, alt: "NVPI", height: "h-5 md:h-6", brightness: "brightness-150" },
      { src: bsaLogo, alt: "BSA", height: "h-5 md:h-6", brightness: "brightness-150" },
      { src: breinLogo, alt: "BREIN", height: "h-5 md:h-6", brightness: "brightness-150" },
      { src: bisbrickLogo, alt: "Bisbrick", height: "h-5 md:h-6", brightness: "brightness-150" },
      { src: codesandboxLogo, alt: "CodeSandbox", height: "h-5 md:h-6", brightness: "brightness-[2.5]" },
    ],
  },
];

const GroupBlock = ({ group }: { group: LogoGroup }) => (
  <div className="flex-shrink-0 flex flex-col gap-3">
    <p className="section-label text-xs tracking-widest uppercase text-muted-foreground/60">
      {group.label}
    </p>
    <div className="flex items-center gap-8 md:gap-12">
      {group.logos.map((logo, i) => (
        <div key={i} className="flex-shrink-0 flex items-center justify-center">
          <img
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            className={`${logo.height} w-auto max-w-[140px] object-contain grayscale opacity-35 ${logo.brightness} contrast-50 hover:opacity-55 transition-opacity duration-300`}
          />
        </div>
      ))}
    </div>
  </div>
);

const MarqueeContent = () => (
  <div className="flex items-start gap-16 md:gap-24">
    {groups.map((group, i) => (
      <GroupBlock key={i} group={group} />
    ))}
  </div>
);

export const LogoBanner = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.3 }}
    className="pt-16 md:pt-20 pb-6"
  >
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      <div
        className="flex items-start gap-16 md:gap-24 w-max animate-marquee"
        style={{ animationDuration: "40s" }}
      >
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  </motion.div>
);
