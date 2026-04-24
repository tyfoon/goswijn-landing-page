# TEXT_CONTENT_ORIGINAL.md — Historisch snapshot (site-status bij commit `e55f90a`)

> **⚠️ Dit is een historisch snapshot, geen werkdocument.**
>
> Dit bestand legt vast hoe de zichtbare tekst van de site eruitzag op het moment dat deze documentatie voor het eerst werd aangelegd — namelijk bij git-commit **`e55f90a`** ("Code edited in Lovable Code Editor"). Dit was het vertrekpunt voordat een reeks copy-updates (hero-bullets, Track Record-herformulering, 200x→400x cijfers, $25M→$30M, toegevoegde 4e Operating Principle, typofixes, etc.) werd doorgevoerd.
>
> Voor de **actuele** tekstinhoud van de site, gebruik [`TEXT_CONTENT.md`](./TEXT_CONTENT.md).
>
> Bewaar dit bestand onveranderd als referentiepunt. Wijzig het niet; als je een nieuwe snapshot wil maken, kopieer het en geef het een nieuwe naam (bijv. `TEXT_CONTENT_SNAPSHOT_YYYY-MM-DD.md`).
>
> **Belangrijkste verschillen tussen dit snapshot en de huidige site:**
> - SEO meta: `200x` (nu `400x`), `PE-backed` (nu `PE/founder-backed`)
> - Hero-bullets: generieke proposities (nu: builder-first, met concrete Google-cijfers)
> - Track Record-paragraaf: opent met "Driving sustainable, multi-geo hyper-growth" (nu: "Building multi-geo businesses end-to-end"), quotes rond 'Commercial Technologist'
> - Evidence cards: bevatten oude cijfers (200x, $25M), tegenwoordige tijd ("Driving", "Delivering", "Preparing"), typo's (`Nodics`, `Doubleclick`, `effecient`), en `Eyeo (AdBlock) — Current` als kolomtitel
> - Operating Principles: **3 kaarten** in 3-koloms grid, icoon boven de titel (nu: 4 kaarten in 4-koloms grid, icoon naast de titel)

---

## 1. SEO / Meta (browsertab, Google, social share)

### 1.1 Browsertab-titel

- **Locatie:** `index.html:15`
- **Tekst:**
  ```
  Goswijn Thijssen — Executive Commercial Leader & Technologist | 25+ Years Multi-Geo Growth
  ```

### 1.2 Meta description (zoekresultaten)

- **Locatie:** `index.html:16`
- **Rol & context:** 1-2 zinnen pitch met harde cijfers (200x, $750M, 20% ARR).
- **Tekst:**
  ```
  Executive Commercial Leader driving 200x growth at Google, $750M+ pipeline, and 20% ARR scaling at PE-backed scale-ups. 25+ years bridging AI, SaaS & AdTech with commercial strategy across EMEA.
  ```

### 1.3 Meta author

- **Locatie:** `index.html:17`
- **Tekst:** `Goswijn Thijssen`

### 1.4 Open Graph (LinkedIn/Facebook previews)

- **Locatie:** `index.html:21-23`
- **Teksten:**
  - `og:title` → `Goswijn Thijssen — Executive Commercial Leader & Technologist`
  - `og:description` → `Executive Commercial Leader driving 200x growth at Google, $750M+ pipeline, and 20% ARR scaling at PE-backed scale-ups. 25+ years bridging AI, SaaS & AdTech with commercial strategy.`
  - `og:image` → `https://goswijn.com/og-image.png`

### 1.5 Twitter-card

- **Locatie:** `index.html:25-28`
- **Teksten:**
  - `twitter:title` → `Goswijn Thijssen — Executive Commercial Leader & Technologist`
  - `twitter:description` → `Executive Commercial Leader driving 200x growth at Google, $750M+ pipeline, and 20% ARR scaling at PE-backed scale-ups. 25+ years bridging AI, SaaS & AdTech with commercial strategy.`
  - `twitter:image` → `https://goswijn.com/og-image.png`

### 1.6 Gestructureerde data (Schema.org Person)

- **Locatie:** `index.html:31-51`
- **Inhoud:**
  - `name` → `Goswijn Thijssen`
  - `jobTitle` → `Executive Commercial Leader & Technologist`
  - `url` → `https://goswijn.com/`
  - `sameAs` → `https://www.linkedin.com/in/goswijn/`
  - `knowsAbout` → `SaaS`, `AdTech`, `AI`, `Go-to-Market Strategy`, `Revenue Growth`, `Cloud Computing`, `P&L Management`
  - `worksFor.name` → `Eyeo`
  - `alumniOf` → `Google`, `Microsoft`, `Tridion`, `ExxonMobil`

---

## 2. Sticky top-navigatie

### 2.1 Naamlabel links boven
- **Locatie:** `src/components/SiteHeader.tsx:48` / `:87`
- **Tekst:** `Goswijn Thijssen`

### 2.2 LinkedIn-icon aria-label
- **Locatie:** `src/components/SiteHeader.tsx:55` / `:93`
- **Tekst:** `LinkedIn Profile`

### 2.3 Navigatie-items
- **Locatie:** `src/components/SiteHeader.tsx:5-10`
- **Teksten:** `Home`, `Track Record`, `Principles`, `Let's connect`

### 2.4 Mobiele menuknop aria-label
- **Locatie:** `src/components/SiteHeader.tsx:103`
- **Tekst:** `Toggle menu`

---

## 3. Hero-sectie

### 3.1 Portret-afbeelding alt-tekst
- **Locatie:** `src/components/HeroSection.tsx:33` (mobiel) / `:88` (desktop)
- **Teksten:**
  - Mobiel: `Goswijn Thijssen, Executive Commercial Leader`
  - Desktop: `Goswijn Thijssen — multi-geo commercial leader and technologist`

### 3.2 Hoofdkop (H1)
- **Locatie:** `src/components/HeroSection.tsx:42`
- **Tekst:** `Executive Commercial Leader & Technologist`

### 3.3 Bullet-lijst onder de H1
- **Locatie:** `src/components/HeroSection.tsx:46-57`
- **Teksten:**
  1. `Scaling from 1 to 100 & driving fundamental transformations`
  2. `Translating complex tech (AI, Cloud, SaaS) into predictable ARR`
  3. `Combining Big Tech operational rigor with PE/VC situational grit`

### 3.4 Introductie-paragraaf
- **Locatie:** `src/components/HeroSection.tsx:60-62`
- **Tekst:**
  ```
  With 25+ years of multi-geo leadership, including as a Director at Google and executive at Microsoft, I build data-driven GTM engines that capture market share. I bridge the gap between deep technical complexity and commercial strategy, delivering durable growth and profitability without breaking the organization.
  ```

### 3.5 Call-to-action knoppen
- **Locatie:** `src/components/HeroSection.tsx:65-80`
- **Teksten:**
  - Primaire knop: `View Track Record`
  - Secundaire knop: `Let's connect`

---

## 4. Track Record-sectie

### 4.1 Sectie-label
- **Locatie:** `src/components/SummarySection.tsx:108`
- **Tekst:** `Track Record`

### 4.2 Hoofdparagraaf met 8 interactieve frasen
- **Locatie:** `src/components/SummarySection.tsx:122-155`
- **Volledige tekst (onderstreepte frasen in **vet**):**
  ```
  Driving sustainable, **multi-geo** hyper-growth across **Big Tech** and
  **high-velocity scale-ups**, whether **scaling from 1 to 100** or driving
  **fundamental transformations**. **As a P&L owner, I combine corporate
  operational rigor with situational grit**. As a 'Commercial Technologist',
  I **bridge complex tech (AI, SaaS, Cloud, AdTech) with commercial strategy
  and scaling**, **building data-driven GTM engines (direct & partner) that
  capture market share and deliver predictable ARR and profitability
  without breaking**.
  ```
- **Frase-IDs:** `multi-geo`, `big-tech`, `scale-ups`, `one-to-hundred`, `transformations`, `pnl-owner`, `bridge-tech`, `gtm-engines`

### 4.3 Hint-regel onder de paragraaf
- **Locatie:** `src/components/SummarySection.tsx:157-160`
- **Teksten:**
  - Desktop: `← Hover over the highlighted phrases to explore the evidence`
  - Mobiel: `← Tap the highlighted phrases to explore the evidence`

---

## 5. Evidence-kaarten

**Bron:** `src/components/summary/evidenceData.ts`

### 5.1 Kaart `multi-geo` — "Multi-Geo Footprint"
- **Locatie:** `src/components/summary/evidenceData.ts:35-47`
- **Layout:** `simple`
- **Titel:** `Multi-Geo Footprint`
- **Bullets:**
  - `Eyeo` → `Global Managing Director`
  - `Google Cloud` → `Director DACH, CEE, Nordics`
  - `Google Doubleclick` → `Director Sales Benelux, Nodics`
  - `Microsoft` → `Enterprise Leadership (Corporate Accounts & Compliance)`
  - `Tridion` → `Global Marketing Director`
  - `ExxonMobil` → `EMEA Product Manager`

### 5.2 Kaart `big-tech` — "Big Tech Impact"
- **Locatie:** `src/components/summary/evidenceData.ts:48-69`
- **Layout:** `sar`, 2 kolommen
- **Titel:** `Big Tech Impact`
- **Context:** `Driving massive scale and impact at the world's largest tech firms.`
- **Kolom Google:**
  - Situation: `Hyper-growth scaling for DoubleClick & EMEA GTM restructuring for Cloud.`
  - Action: `Scaled programmatic business from scratch (managing 80+ FTE across 7 countries) and later generated >$750M in annual pipeline as CMO EMEA North (leading a 40+ FTE multi-geo org).`
  - Result: `Achieved 200x growth (to >$200M) and #1 global productivity.`
- **Kolom Microsoft:**
  - Situation: `Managing the highly complex Corporate Accounts portfolio across a multi-geo footprint.`
  - Action: `Overhauled enterprise sales strategy, leading direct and indirect cross-functional teams (20+ FTE including senior sales, solution specialists, and marketing).`
  - Result: `Accelerated YoY revenue growth to >25%, reaching $150M ARR.`

### 5.3 Kaart `scale-ups` — "High-Velocity Scale-Ups"
- **Locatie:** `src/components/summary/evidenceData.ts:70-90`
- **Layout:** `sar`, 2 kolommen
- **Titel:** `High-Velocity Scale-Ups`
- **Context:** `Building and professionalizing VC/PE-backed growth engines.`
- **Kolom Tridion:**
  - Situation: `Early-stage VC-backed startup needing a global GTM foundation.`
  - Action: `Built global marketing from absolute zero to market and category leadership.`
  - Result: `Grew revenue to $25M and prepared for a successful exit.`
- **Kolom Eyeo (AdBlock):**
  - Situation: `A $30M+ B2C PE/Founder-backed SaaS business requiring transition to a more cost effecient and predictable model.`
  - Action: `Restructured an 80+ FTE organization, aligning Marketing, Product, Engineering, and Sales.`
  - Result: `Driving ~20% ARR and EBITDA growth.`

### 5.4 Kaart `one-to-hundred` — "Scaling from 1 → 100"
- **Locatie:** `src/components/summary/evidenceData.ts:91-110`
- **Layout:** `sar`, 2 kolommen
- **Titel:** `Scaling from 1 → 100`
- **Context:** `Taking proven early traction and multiplying it exponentially.`
- **Kolom Google DoubleClick:**
  - Situation: `Programmatic advertising was an emerging, complex technology with immense potential.`
  - Action: `Architected a localized direct and partner GTM motion for the Benelux.`
  - Result: `Scaled from $0 to >$200M ARR (200x growth), building EMEA's fastest-growing unit.`
- **Kolom Tridion:**
  - Situation: `The commercial engine needed to scale rapidly post-product-market fit.`
  - Action: `Executed an aggressive, data-driven global demand generation strategy.`
  - Result: `Scaled from $0 to $25M in revenue, capturing dominance.`

### 5.5 Kaart `transformations` — "Fundamental Transformations"
- **Locatie:** `src/components/summary/evidenceData.ts:111-133`
- **Layout:** `sar`, 3 kolommen (geen `situation`)
- **Titel:** `Fundamental Transformations`
- **Context:** `Restructuring complex organizations to unlock trapped value.`
- **Kolom Microsoft License Compliance:**
  - Action: `Created a brand-new Software Asset Management partner ecosystem.`
  - Result: `Adopted globally as a corporate standard.`
- **Kolom Google Cloud (CMO):**
  - Action: `Realigned a fragmented multi-geo matrix into a unified engine.`
  - Result: `Achieved this under a strict flat budget.`
- **Kolom Eyeo (AdBlock):**
  - Action: `Overhauled the entire SaaS P&L, breaking down operational silos.`
  - Result: `Unified an 80+ FTE organization across functions.`

### 5.6 Kaart `pnl-owner` — "P&L Ownership"
- **Locatie:** `src/components/summary/evidenceData.ts:134-154`
- **Layout:** `sar`, 2 kolommen
- **Titel:** `P&L Ownership`
- **Context:** `Applying relentless discipline across radically different environments.`
- **Kolom Eyeo (AdBlock) — Current:**
  - Situation: `Preparing a 350M-user global SaaS business for an IPO/Exit.`
  - Action: `Applying rigorous restructuring and tough organizational realignment.`
  - Result: `Delivering predictable 20% ARR/EBITDA growth.`
- **Kolom ExxonMobil — Early Career:**
  - Situation: `Thrown into the deep end via forced job rotation with full P&L responsibility for a $200M+ retail network.`
  - Action: `Applied raw grit and data-driven management in an unfamiliar context.`
  - Result: `Increased network profitability by 82% over 3 years.`

### 5.7 Kaart `bridge-tech` — "Commercial Technologist"
- **Locatie:** `src/components/summary/evidenceData.ts:155-175`
- **Layout:** `sar`, 2 kolommen
- **Titel:** `Commercial Technologist`
- **Context:** `Translating deep engineering into massive commercial value.`
- **Kolom AI & Cloud — Google:**
  - Situation: `Highly complex technical differentiators (Security, Data, AI workloads) needed enterprise adoption.`
  - Action: `Spearheaded Martech/AI initiatives and orchestrated bespoke C-suite ABM programs.`
  - Result: `Generated >$750M in enterprise pipeline.`
- **Kolom AdTech — DoubleClick:**
  - Situation: `Programmatic AdTech was a highly technical 'black box' for early adopters.`
  - Action: `Bridged the technology with strategic scaling and robust partner training.`
  - Result: `Drove mainstream market adoption, scaling to >$200M.`

### 5.8 Kaart `gtm-engines` — "Data-Driven GTM Engines"
- **Locatie:** `src/components/summary/evidenceData.ts:176-198`
- **Layout:** `sar`, 3 kolommen (geen `situation`)
- **Titel:** `Data-Driven GTM Engines`
- **Context:** `Architecting scalable, predictable revenue engines.`
- **Kolom Microsoft Compliance:**
  - Action: `Built a brand-new SAM ecosystem.`
  - Result: `Adopted as the global corporate standard.`
- **Kolom Google DoubleClick:**
  - Action: `Continuously adapted org design and built parallel partner ecosystems.`
  - Result: `Managed 200x hyper-growth without breaking the operation.`
- **Kolom Eyeo (AdBlock):**
  - Action: `Architected a connected, data-driven GTM engine.`
  - Result: `Delivering 20% ARR growth while protecting company culture.`

---

## 6. Logo-banner

- **Locatie:** `src/components/LogoBanner.tsx:33-63`

### 6.1 Groep-labels
- `Executive Leadership` / `Early Career` / `Board & Advisory`

### 6.2 Logo alt-teksten
- **Executive Leadership:** `Eyeo`, `Google Cloud`, `Google`, `DoubleClick`, `Microsoft`, `Tridion`
- **Early Career:** `ExxonMobil`, `Shell`
- **Board & Advisory:** `EQT`, `NVPI`, `BSA`, `BREIN`, `Bisbrick`, `CodeSandbox`

---

## 7. Operating Principles-sectie

### 7.1 Sectie-label en ondertitel
- **Locatie:** `src/components/OperatingPrinciples.tsx:53-57`
- **Teksten:**
  - Label: `Operating Principles`
  - Ondertitel: `How I build, scale, and lead multi-geo organizations.`

### 7.2 Drie principes-kaarten
- **Locatie:** `src/components/OperatingPrinciples.tsx:4-20`
- **Waar op de pagina:** drie kaarten in een 3-koloms grid op desktop, gestapeld op mobiel. Icoon staat **boven** de titel (grote layout-stijl).
- **Rol & context:** Goswijn's leiderschapsfilosofie in drie pijlers.

#### Principe 1 — `Radical Alignment` (icoon: Layers)
> I build unified GTM engines by ruthlessly aligning Product, Engineering, and Sales. I make data-driven decisions, but I refuse to be data-paralyzed. I actively demand pushback from my teams and believe that constructive friction is essential to maintain momentum and build a scalable revenue machine.

#### Principe 2 — `Translating Complexity` (icoon: Network)
> Deep technology (AI, Cloud, AdTech) only holds value if the market understands it. When it comes to business transformation, my primary role is curation. I ruthlessly filter out the organizational noise to bridge the gap between highly complex engineering and C-suite business value, turning technical differentiators into predictable pipeline.

#### Principe 3 — `Situational Grit` (icoon: Compass)
> What you see is what you get. I adapt my leadership to the context, whether navigating dot-com crashes, flat corporate budgets, or PE-backed turnarounds. I lead with transparency, and when the situation demands it, I will gladly get in the trenches to rebuild things from the ground up.

---

## 8. Let's Connect-sectie

### 8.1 Sectie-label
- **Locatie:** `src/pages/Index.tsx:85-87`
- **Tekst:** `Let's Connect`

### 8.2 Afbeelding alt-tekst
- **Locatie:** `src/pages/Index.tsx:100` / `:109`
- **Tekst:** `Goswijn Thijssen during a strategic business discussion`

### 8.3 Introductie-regel boven het contactformulier
- **Locatie:** `src/pages/Index.tsx:124-126`
- **Tekst:**
  ```
  Leave your contact detail and topic of conversation below and I will get back to you as soon as possible.
  ```

---

## 9. Afsprakenplanner (Booking Section)

- **Locatie:** `src/components/BookingSection.tsx`

### 9.1 Boekingskaart
- Duur-label: `{30} minutes`
- Knop: `Book Now`

### 9.2 Dialoog-header
- Titel (dynamisch): `Book a {duration}-minute consultation`
- Stap "time": `Select a day and time for your consultation.`
- Stap "details": `Fill in your details to complete the booking.`

### 9.3 Succesbericht
- Titel: `Booking Confirmed!`
- Ondertitel: `Check your email for details`

### 9.4 Stap 1 — dag kiezen
- Label: `Select a Day` / `Available Times`

### 9.5 Stap 2 — gegevensformulier
- `Selected: ` + datum/tijd; `Change` knop
- Veldlabels: `Name` (placeholder `Your full name`), `Email` (placeholder `your.email@example.com`), `What would you like to discuss?` (placeholder `Brief description of what you'd like to talk about...`), `Attachment (optional - max 5MB)`
- Bijlage-info: `Selected: {naam} ({grootte}MB)`
- Knoppen: `Back`, `Review & Confirm`

### 9.6 Bevestigingsdialoog
- Titel: `Confirm Your Booking`
- Beschrijving: `Please review your booking details`
- Labels: `Date:`, `Time:`, `Duration:`
- Knoppen: `Cancel`, `Confirm` (tijdens submit: `Booking...`)

### 9.7 Toast-meldingen
- Slots laden mislukt — `Error` / `Failed to load available time slots. Please try again.`
- Ontbrekende info — `Missing information` / `Please fill in all fields and select a time slot`
- Boeking gelukt — `Booking confirmed!` / `You will receive a confirmation email shortly.`
- Boeking mislukt — `Booking failed` / `Failed to complete booking. Please try again.`
- Bestand te groot — `File too large` / `Please upload a file smaller than 5MB`

---

## 10. Contactformulier

### 10.1 Formuliervelden
- Placeholders: `Your Name`, `Your Email`, `Your Message`

### 10.2 Knoppen
- Verzenden: `Send Message` / tijdens submit `Sending...`
- CV: `Request Full CV / Resume` / tijdens submit `Requesting...`

### 10.3 Toast-meldingen
- Bericht verzonden: `Message sent!` / `Thank you for your message. I'll get back to you soon.`
- Bericht mislukt: `Error` / `Failed to send message. Please try again.`
- Verplichte velden: `Required fields` / `Please fill in your name and email above first.`
- CV aangevraagd: `CV requested!` / `I'll send you my full CV/Resume shortly.`
- CV mislukt: `Error` / `Failed to request CV. Please try again.`

### 10.4 E-mail template bij CV-aanvraag
- **Locatie:** `src/components/ContactForm.tsx:64`
- **Template:** `[CV/Resume Request] {name} ({email}) has requested your full CV/Resume.`

---

## 11. 404-pagina
- **Locatie:** `src/pages/NotFound.tsx:12-20`
- Titel: `404`
- Ondertitel: `Oops! Page not found`
- Link: `Return to Home`

---

## 12. Error Boundary
- **Locatie:** `src/components/ErrorBoundary.tsx:28-40`
- Titel: `Something went wrong`
- Uitleg: `Please refresh the page to try again.`
- Knop: `Refresh Page`

---

## 13. Google Calendar-integratie (admin)
- **Locatie:** `src/components/GoogleCalendarAuth.tsx:84-114`
- Titel: `Google Calendar Integration`
- Beschrijving: `Connect your Google Calendar to send calendar invites to clients`
- Status: `Google Calendar is connected`
- Knop: `Connect Google Calendar` (tijdens OAuth: `Authorizing...`)
- Toasts: `Success!` / `Google Calendar has been authorized successfully.`, `Authorization Failed` / `Failed to authorize Google Calendar`

---

## Snapshot-metadata

- **Git-commit:** `e55f90a` ("Code edited in Lovable Code Editor")
- **Snapshot gemaakt op:** 2026-04-24
- **Reden:** vastleggen van pre-sessie tekststatus voordat de copy-rewrite werd doorgevoerd in commits `e93f8c3` (hero/Track Record/evidence herformulering, TEXT_CONTENT.md toegevoegd) en `2edfb4d` (sync 4e Operating Principle).
