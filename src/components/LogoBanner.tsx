import { motion } from "framer-motion";

import adblockPlusLogo from "@/assets/adblock-plus.svg";
import adblockLogo from "@/assets/adblock.svg";
import bisbrickLogo from "@/assets/bisbrick.svg";
import codesandboxLogo from "@/assets/codesandbox.png";
import doubleclickLogo from "@/assets/doubleclick-new.svg";
import endeitLogo from "@/assets/endeit.png";
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

const executiveLogos: LogoItem[] = [
  { src: googleLogo, alt: "Google", height: "h-5 md:h-6", brightness: "brightness-200" },
  { src: microsoftLogo, alt: "Microsoft", height: "h-7 md:h-8", brightness: "brightness-200" },
  { src: exxonLogo, alt: "ExxonMobil", height: "h-7 md:h-8", brightness: "brightness-200" },
  { src: doubleclickLogo, alt: "DoubleClick", height: "h-12 md:h-16", brightness: "brightness-200" },
  { src: tridionLogo, alt: "Tridion", height: "h-7 md:h-8", brightness: "brightness-150" },
  { src: eyeoLogo, alt: "Eyeo", height: "h-4 md:h-5", brightness: "brightness-150" },
  { src: googleCloudLogo, alt: "Google Cloud", height: "h-7 md:h-8", brightness: "brightness-200" },
  { src: adblockLogo, alt: "AdBlock", height: "h-4 md:h-5", brightness: "brightness-150" },
  { src: adblockPlusLogo, alt: "Adblock Plus", height: "h-7 md:h-8", brightness: "brightness-150" },
  { src: shellLogo, alt: "Shell", height: "h-7 md:h-8", brightness: "brightness-200" },
];

const advisoryLogos: LogoItem[] = [
  { src: eqtLogo, alt: "EQT", height: "h-3 md:h-4", brightness: "brightness-200" },
  { src: nvpiLogo, alt: "NVPI", height: "h-5 md:h-6", brightness: "brightness-150" },
  { src: bsaLogo, alt: "BSA", height: "h-5 md:h-6", brightness: "brightness-150" },
  { src: breinLogo, alt: "BREIN", height: "h-5 md:h-6", brightness: "brightness-150" },
  { src: bisbrickLogo, alt: "Bisbrick", height: "h-5 md:h-6", brightness: "brightness-150" },
  { src: endeitLogo, alt: "Endeit", height: "h-5 md:h-6", brightness: "brightness-200" },
  { src: codesandboxLogo, alt: "CodeSandbox", height: "h-5 md:h-6", brightness: "brightness-200" },
];

const LogoGrid = ({ logos, label }: { logos: LogoItem[]; label: string }) => (
  <div className="space-y-4">
    <p className="section-label text-xs tracking-widest uppercase text-muted-foreground/60">
      {label}
    </p>
    <div className="flex flex-wrap items-center gap-6 md:gap-10">
      {logos.map((logo, i) => (
        <div key={i} className="flex items-center justify-center">
          <img
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            className={`${logo.height} w-auto max-w-[120px] object-contain grayscale opacity-35 ${logo.brightness} contrast-50 hover:opacity-55 transition-opacity duration-300`}
          />
        </div>
      ))}
    </div>
  </div>
);

export const LogoBanner = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.3 }}
    className="pt-20 md:pt-24 pb-8 space-y-10"
  >
    <LogoGrid logos={executiveLogos} label="Executive Leadership" />
    <LogoGrid logos={advisoryLogos} label="Board & Advisory" />
  </motion.div>
);
