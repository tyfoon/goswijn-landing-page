export interface EvidenceBullet {
  label: string;
  detail: string;
}

export interface EvidenceCard {
  id: string;
  title: string;
  bullets: EvidenceBullet[];
}

export const evidenceData: Record<string, EvidenceCard> = {
  "multi-geo": {
    id: "multi-geo",
    title: "Multi-Geo Footprint",
    bullets: [
      { label: "ExxonMobil", detail: "EMEA Product Manager" },
      { label: "Tridion", detail: "Global Marketing" },
      { label: "Google DoubleClick", detail: "Benelux and Nordics" },
      { label: "Google Cloud", detail: "DACH, CEE, Nordics" },
      { label: "Eyeo", detail: "Global Managing Director" },
    ],
  },
  "big-tech": {
    id: "big-tech",
    title: "Big Tech Impact",
    bullets: [
      {
        label: "Google",
        detail:
          "Scaled DoubleClick programmatic business 200x to >$200M. Later, as CMO Google Cloud EMEA North, generated >$750M in annual pipeline and achieved #1 global productivity.",
      },
      {
        label: "Microsoft",
        detail:
          "Led Corporate Accounts across multi-geo footprint, accelerating YoY revenue growth to >25% and reaching $150M ARR.",
      },
    ],
  },
  "scale-ups": {
    id: "scale-ups",
    title: "High-Velocity Scale-Ups",
    bullets: [
      {
        label: "Tridion",
        detail:
          "Joined as an early-stage VC-backed startup. Built global marketing from scratch, scaling to 150+ FTEs and $25M revenue, culminating in a successful acquisition.",
      },
      {
        label: "Eyeo",
        detail:
          "Current Global Managing Director. Restructured an 80+ FTE organization to transition from unpredictable startup motions to a mature SaaS model, driving 20% ARR/EBITDA growth.",
      },
    ],
  },
  "one-to-hundred": {
    id: "one-to-hundred",
    title: "Scaling from 1 to 100",
    bullets: [
      {
        label: "Google DoubleClick",
        detail:
          "Took the programmatic business in Benelux from absolute zero to >$200M ARR, achieving 200x growth and building EMEA's fastest-growing unit.",
      },
      {
        label: "Tridion",
        detail:
          "Scaled the commercial engine from $0 to $25M in revenue, securing market leadership and driving a successful exit.",
      },
    ],
  },
  transformations: {
    id: "transformations",
    title: "Fundamental Transformations",
    bullets: [
      {
        label: "Microsoft License Compliance",
        detail: "Transformed the GTM motion into a global standard.",
      },
      {
        label: "Microsoft Corporate Accounts",
        detail:
          "Overhauled the enterprise sales strategy for complex portfolios.",
      },
      {
        label: "Google Cloud (CMO)",
        detail:
          "Realigned a fragmented multi-geo organization into a unified engine under a flat budget.",
      },
      {
        label: "Eyeo",
        detail:
          "Restructured the entire SaaS P&L and 80+ FTE team to break down silos.",
      },
    ],
  },
  "pnl-owner": {
    id: "pnl-owner",
    title: "P&L Ownership",
    bullets: [
      {
        label: "Eyeo (Current)",
        detail:
          "Holding full P&L responsibility for a $30M+ global SaaS business (350M users), applying rigorous restructuring to prep for IPO/Exit.",
      },
      {
        label: "ExxonMobil (Early Career)",
        detail:
          "Thrown into the deep end via forced job rotation, applying raw grit and rigor to manage and optimize a $200M+ retail network P&L.",
      },
    ],
  },
  "bridge-tech": {
    id: "bridge-tech",
    title: "Commercial Technologist",
    bullets: [
      {
        label: "Complex AI & Cloud",
        detail:
          "Spearheaded Google Cloud's Martech/AI initiatives, translating deep technical differentiators (Security, Data, AI workloads) into a >$750M enterprise pipeline.",
      },
      {
        label: "AdTech & SaaS",
        detail:
          "Bridged the highly complex, emerging technology of programmatic advertising (DoubleClick) with strategic scaling, driving mainstream market adoption.",
      },
    ],
  },
  "gtm-engines": {
    id: "gtm-engines",
    title: "Data-Driven GTM Engines",
    bullets: [
      {
        label: "Partner Ecosystem",
        detail:
          "At Microsoft, built a brand new Software Asset Management (SAM) partner ecosystem to drive compliance, which was successfully adopted as a global standard.",
      },
      {
        label: "Scaling without breaking",
        detail:
          "At Google DoubleClick, managed 200x hyper-growth by continuously adapting the organizational design and building robust parallel partner ecosystems.",
      },
      {
        label: "Predictable ARR",
        detail:
          "At Eyeo, architected a connected, data-driven GTM engine that delivers highly predictable, sustainable margin growth (20% ARR) without breaking the company culture.",
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
