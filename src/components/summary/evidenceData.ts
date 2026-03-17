// --- Types ---

export interface SimpleBullet {
  label: string;
  detail: string;
}

export interface SARColumn {
  heading: string;
  situation?: string;
  action: string;
  result: string;
}

export interface EvidenceCardSimple {
  id: string;
  title: string;
  layout: "simple";
  bullets: SimpleBullet[];
}

export interface EvidenceCardSAR {
  id: string;
  title: string;
  layout: "sar";
  context: string;
  columns: SARColumn[];
}

export type EvidenceCard = EvidenceCardSimple | EvidenceCardSAR;

// --- Data ---

export const evidenceData: Record<string, EvidenceCard> = {
  "multi-geo": {
    id: "multi-geo",
    title: "Multi-Geo Footprint",
    layout: "simple",
    bullets: [
      { label: "Google", detail: "Director (Cloud EMEA North & DoubleClick)" },
      { label: "Microsoft", detail: "Enterprise Leadership (Corporate Accounts & Compliance)" },
      { label: "Eyeo", detail: "Global Managing Director" },
      { label: "Tridion", detail: "Global Marketing Director" },
      { label: "ExxonMobil", detail: "EMEA Product Manager" },
    ],
  },
  "big-tech": {
    id: "big-tech",
    title: "Big Tech Impact",
    layout: "sar",
    context: "Driving massive scale and impact at the world's largest tech firms.",
    columns: [
      {
        heading: "Google",
        situation: "Hyper-growth scaling for DoubleClick & EMEA GTM restructuring for Cloud.",
        action:
          "Scaled programmatic business from scratch (managing 80+ FTE across 7 countries) and later generated >$750M in annual pipeline as CMO EMEA North (leading a 40+ FTE multi-geo org).",
        result: "Achieved 200x growth (to >$200M) and #1 global productivity.",
      },
      {
        heading: "Microsoft",
        situation: "Managing the highly complex Corporate Accounts portfolio across a multi-geo footprint.",
        action:
          "Overhauled enterprise sales strategy, leading direct and indirect cross-functional teams (20+ FTE including senior sales, solution specialists, and marketing).",
        result: "Accelerated YoY revenue growth to >25%, reaching $150M ARR.",
      },
    ],
  },
  "scale-ups": {
    id: "scale-ups",
    title: "High-Velocity Scale-Ups",
    layout: "sar",
    context: "Building and professionalizing VC/PE-backed growth engines.",
    columns: [
      {
        heading: "Tridion",
        situation: "Early-stage VC-backed startup needing a global GTM foundation.",
        action: "Built global marketing from absolute zero to market and category leadership.",
        result: "Grew revenue to $25M and prepared for a successful exit.",
      },
      {
        heading: "Eyeo (AdBlock)",
        situation: "A $30M+ PE/Founder-backed business requiring transition to a mature SaaS model.",
        action: "Restructured an 80+ FTE organization, aligning Product, Engineering, and Sales.",
        result: "Currently driving 20% ARR and EBITDA growth.",
      },
    ],
  },
  "one-to-hundred": {
    id: "one-to-hundred",
    title: "Scaling from 1 → 100",
    layout: "sar",
    context: "Taking proven early traction and multiplying it exponentially.",
    columns: [
      {
        heading: "Google DoubleClick",
        situation: "Programmatic advertising was an emerging, complex technology with immense potential.",
        action: "Architected a localized direct and partner GTM motion for the Benelux.",
        result: "Scaled from $0 to >$200M ARR (200x growth), building EMEA's fastest-growing unit.",
      },
      {
        heading: "Tridion",
        situation: "The commercial engine needed to scale rapidly post-product-market fit.",
        action: "Executed an aggressive, data-driven global demand generation strategy.",
        result: "Scaled from $0 to $25M in revenue, capturing dominance.",
      },
    ],
  },
  transformations: {
    id: "transformations",
    title: "Fundamental Transformations",
    layout: "sar",
    context: "Restructuring complex organizations to unlock trapped value.",
    columns: [
      {
        heading: "Microsoft License Compliance",
        action: "Created a brand-new Software Asset Management partner ecosystem.",
        result: "Adopted globally as a corporate standard.",
      },
      {
        heading: "Google Cloud (CMO)",
        action: "Realigned a fragmented multi-geo matrix into a unified engine.",
        result: "Achieved this under a strict flat budget.",
      },
      {
        heading: "Eyeo (AdBlock)",
        action: "Overhauled the entire SaaS P&L, breaking down operational silos.",
        result: "Unified an 80+ FTE organization across functions.",
      },
    ],
  },
  "pnl-owner": {
    id: "pnl-owner",
    title: "P&L Ownership",
    layout: "sar",
    context: "Applying relentless discipline across radically different environments.",
    columns: [
      {
        heading: "Eyeo (AdBlock) — Current",
        situation: "Preparing a 350M-user global SaaS business for an IPO/Exit.",
        action: "Applying rigorous restructuring and tough organizational realignment.",
        result: "Delivering predictable 20% ARR/EBITDA growth.",
      },
      {
        heading: "ExxonMobil — Early Career",
        situation:
          "Thrown into the deep end via forced job rotation with full P&L responsibility for a $200M+ retail network.",
        action: "Applied raw grit and data-driven management in an unfamiliar context.",
        result: "Increased network profitability by 82% over 3 years.",
      },
    ],
  },
  "bridge-tech": {
    id: "bridge-tech",
    title: "Commercial Technologist",
    layout: "sar",
    context: "Translating deep engineering into massive commercial value.",
    columns: [
      {
        heading: "AI & Cloud — Google",
        situation:
          "Highly complex technical differentiators (Security, Data, AI workloads) needed enterprise adoption.",
        action: "Spearheaded Martech/AI initiatives and orchestrated bespoke C-suite ABM programs.",
        result: "Generated >$750M in enterprise pipeline.",
      },
      {
        heading: "AdTech — DoubleClick",
        situation: "Programmatic AdTech was a highly technical 'black box' for early adopters.",
        action: "Bridged the technology with strategic scaling and robust partner training.",
        result: "Drove mainstream market adoption, scaling to >$200M.",
      },
    ],
  },
  "gtm-engines": {
    id: "gtm-engines",
    title: "Data-Driven GTM Engines",
    layout: "sar",
    context: "Architecting scalable, predictable revenue engines.",
    columns: [
      {
        heading: "Microsoft Compliance",
        action: "Built a brand-new SAM ecosystem.",
        result: "Adopted as the global corporate standard.",
      },
      {
        heading: "Google DoubleClick",
        action: "Continuously adapted org design and built parallel partner ecosystems.",
        result: "Managed 200x hyper-growth without breaking the operation.",
      },
      {
        heading: "Eyeo (AdBlock)",
        action: "Architected a connected, data-driven GTM engine.",
        result: "Delivering 20% ARR growth while protecting company culture.",
      },
    ],
  },
};

export const cardSide: Record<string, "left" | "right"> = {
  "multi-geo": "right",
  "big-tech": "left",
  "scale-ups": "right",
  "one-to-hundred": "left",
  transformations: "right",
  "pnl-owner": "left",
  "bridge-tech": "right",
  "gtm-engines": "left",
};
