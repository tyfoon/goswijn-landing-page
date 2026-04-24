# TEXT_CONTENT.md — Tekstinhoud van de website

> **Doel:** dit bestand bevat alle zichtbare tekst van de site, per sectie gegroepeerd, met exacte bronverwijzing (bestand + regelnummer) **én visuele context** zodat iedere AI-assistent (Claude, Gemini, ChatGPT, etc.) of menselijke redacteur direct begrijpt wáár op de pagina een stukje tekst zich bevindt en welke rol het speelt.
>
> **Leeswijzer per item:**
> - **Locatie** — bronbestand + regelnummer(s)
> - **Waar op de pagina** — visuele plek (boven/onder, naast welk element, in welke sectie)
> - **Rol & context** — wat deze tekst doet voor de bezoeker
> - **Tekst** — de huidige letterlijke inhoud
>
> ⚠️ Dit is een **Lovable**-project dat via GitHub gesynchroniseerd wordt. Als je tekst wijzigt (in Lovable, lokaal, of via een AI-assistent), update dan óók dit bestand — anders raakt de documentatie uit sync met de echte site.
>
> **Paginastructuur (single-page site, van boven naar beneden):**
> 1. Sticky top-navigatie (blijft altijd zichtbaar)
> 2. **Hero** — portret + H1 + bullets + CTA's
> 3. **Track Record** — hoofdparagraaf met klikbare frasen → pop-up bewijskaarten
> 4. **Logo banner** — scrollende logo's onderaan Track Record
> 5. **Operating Principles** — 3 kaarten
> 6. **Let's Connect** — foto + afsprakenplanner + contactformulier
>
> Plus uitzonderingspagina's: 404, Error Boundary, admin Calendar Auth.

---

## 1. SEO / Meta (browsertab, Google, social share)

Deze teksten zijn niet zichtbaar op de site zelf, maar bepalen hoe de pagina verschijnt in Google-zoekresultaten, in een browsertab, en wanneer de URL wordt gedeeld op LinkedIn / Facebook / X.

### 1.1 Browsertab-titel

- **Locatie:** `index.html:15`
- **Waar zichtbaar:** tekst op het browser-tabblad (en bovenaan elk Google-zoekresultaat als blauwe link).
- **Rol & context:** primaire SEO-titel; moet de kernpropositie vangen in ~60 tekens. Lang, maar gericht op executive-recruiters die zoeken op "commercial leader", "Google", "multi-geo".
- **Tekst:**
  ```
  Goswijn Thijssen — Executive Commercial Leader & Technologist | 25+ Years Multi-Geo Growth
  ```

### 1.2 Meta description (zoekresultaten)

- **Locatie:** `index.html:16`
- **Waar zichtbaar:** grijze tekst onder de blauwe link in Google-zoekresultaten.
- **Rol & context:** 1-2 zinnen pitch met harde cijfers (400x, $750M, 20% ARR) om de click-through te maximaliseren.
- **Tekst:**
  ```
  Executive Commercial Leader driving 400x growth at Google, $750M+ pipeline, and 20% ARR scaling at PE/founder-backed scale-ups. 25+ years bridging AI, SaaS & AdTech with commercial strategy across EMEA.
  ```

### 1.3 Meta author

- **Locatie:** `index.html:17`
- **Rol & context:** auteur-attribuut voor metadata, niet zichtbaar op pagina.
- **Tekst:** `Goswijn Thijssen`

### 1.4 Open Graph (LinkedIn-, Facebook-previews)

- **Locatie:** `index.html:21-23`
- **Waar zichtbaar:** de titel-, beschrijving- en afbeeldingspreview die verschijnt wanneer iemand `https://goswijn.com` plakt in LinkedIn, Slack, WhatsApp, iMessage, Facebook.
- **Rol & context:** korter dan de browsertitel — past in een social-kaart. Afbeelding `og-image.png` staat in `public/`.
- **Teksten:**
  - `og:title` → `Goswijn Thijssen — Executive Commercial Leader & Technologist`
  - `og:description` → `Executive Commercial Leader driving 400x growth at Google, $750M+ pipeline, and 20% ARR scaling at PE/founder-backed scale-ups. 25+ years bridging AI, SaaS & AdTech with commercial strategy.`
  - `og:image` → `https://goswijn.com/og-image.png`

### 1.5 Twitter-card

- **Locatie:** `index.html:25-28`
- **Waar zichtbaar:** preview op X/Twitter bij delen van de URL.
- **Rol & context:** identiek aan Open Graph; Twitter gebruikt eigen tags.
- **Teksten:** `twitter:title`, `twitter:description`, `twitter:image` — inhoud zie 1.4.

### 1.6 Gestructureerde data (Schema.org Person)

- **Locatie:** `index.html:31-51`
- **Waar zichtbaar:** niet direct; gebruikt door Google om een kennispaneel of rich result op te bouwen ("Goswijn Thijssen — Executive Commercial Leader, worked at Google, Microsoft…").
- **Rol & context:** machine-leesbare biografie. `alumniOf` lijst alle eerdere werkgevers; `worksFor` is de huidige (Eyeo).
- **Inhoud:**
  - `name` → `Goswijn Thijssen`
  - `jobTitle` → `Executive Commercial Leader & Technologist`
  - `url` → `https://goswijn.com/`
  - `sameAs` → `https://www.linkedin.com/in/goswijn/`
  - `knowsAbout` → `SaaS`, `AdTech`, `AI`, `Go-to-Market Strategy`, `Revenue Growth`, `Cloud Computing`, `P&L Management`
  - `worksFor.name` → `Eyeo`
  - `alumniOf` → `Google`, `Microsoft`, `Tridion`, `ExxonMobil`

---

## 2. Sticky top-navigatie (blijft altijd in beeld)

Een smalle glas-effect balk die `fixed` bovenaan het scherm staat. Op desktop zweeft hij met marges aan de rand; op mobiel zit hij volledig vastgeplakt aan de bovenrand. Scrollen verandert alleen welk menu-item onderstreept is (actief).

### 2.1 Naamlabel links boven

- **Locatie:** `src/components/SiteHeader.tsx:48` (desktop) / `:87` (mobiel)
- **Waar op de pagina:** helemaal links in de navigatiebalk, naast een klein LinkedIn-icoon.
- **Rol & context:** fungeert als merknaam + "home"-knop; klikken scrollt vloeiend terug naar de hero-sectie.
- **Tekst:** `Goswijn Thijssen`

### 2.2 LinkedIn-icon aria-label

- **Locatie:** `src/components/SiteHeader.tsx:55` / `:93`
- **Waar op de pagina:** klein LinkedIn-icoontje direct naast de naam.
- **Rol & context:** alleen voor screenreaders/toegankelijkheid, niet visueel zichtbaar. Link opent `linkedin.com/in/goswijn/` in nieuw tabblad.
- **Tekst:** `LinkedIn Profile`

### 2.3 Navigatie-items (menu rechts)

- **Locatie:** `src/components/SiteHeader.tsx:5-10`
- **Waar op de pagina:** rechts in de sticky header (desktop) of in een uitklapbaar menu achter een hamburgerknop (mobiel).
- **Rol & context:** scrollt de pagina naar de betreffende sectie. Het actieve item (de sectie waar de bezoeker nu naar kijkt) krijgt een onderstreping.
- **Teksten (label → doel-sectie):**
  - `Home` → hero
  - `Track Record` → summary
  - `Principles` → principles
  - `Let's connect` → contact

### 2.4 Mobiele menuknop aria-label

- **Locatie:** `src/components/SiteHeader.tsx:103`
- **Waar op de pagina:** hamburger-icoon rechtsboven op mobiel; verandert in een kruis-icoon wanneer het menu open is.
- **Rol & context:** alleen screenreaders.
- **Tekst:** `Toggle menu`

---

## 3. Hero-sectie (bovenaan de pagina, eerste scherm dat bezoeker ziet)

Het eerste volledige scherm: links staat de tekstkolom (H1 + bullets + paragraaf + 2 CTA-knoppen), rechts op desktop staat een professioneel portret. Op mobiel staat het portret als ronde thumbnail bovenin en de tekst eronder. Achter de hero-tekst zweven subtiele blur-bollen mee bij het scrollen (parallax).

### 3.1 Portret-afbeelding alt-tekst

- **Locatie:** `src/components/HeroSection.tsx:33` (mobiel) / `:88` (desktop)
- **Waar op de pagina:** het portret van Goswijn — rond op mobiel, rechthoekig rechts op desktop.
- **Rol & context:** screenreader-tekst; ook zichtbaar als de afbeelding niet laadt.
- **Teksten:**
  - Mobiel: `Goswijn Thijssen, Executive Commercial Leader`
  - Desktop: `Goswijn Thijssen — multi-geo commercial leader and technologist`

### 3.2 Hoofdkop (H1)

- **Locatie:** `src/components/HeroSection.tsx:42`
- **Waar op de pagina:** grootste tekst op de hele pagina, links-boven in de hero-kolom.
- **Rol & context:** dé one-liner die Goswijn in twee woorden positioneert. Belangrijk voor SEO (enige H1 van de site).
- **Tekst:** `Executive Commercial Leader & Technologist`

### 3.3 Bullet-lijst onder de H1

- **Locatie:** `src/components/HeroSection.tsx:46-57`
- **Waar op de pagina:** drie bullets met paarse stip, direct onder de H1. Op hover schuiven ze subtiel naar rechts.
- **Rol & context:** drie punch-line proposities — scanbare kern-differentiatoren.
- **Teksten:**
  1. `Builder who started solo at Google and scaled DoubleClick from $500K to $200M+ ARR`
  2. `Commercial Technologist bridging deep tech (AI, SaaS, Cloud, AdTech) with commercial scale`
  3. `25+ years combining Big Tech rigor with PE/founder-backed grit`

### 3.4 Introductie-paragraaf

- **Locatie:** `src/components/HeroSection.tsx:60-62`
- **Waar op de pagina:** kleine lichtgrijze paragraaf onder de bullets, vóór de knoppen.
- **Rol & context:** langer uitgeschreven elevator pitch — 2 zinnen die dieper gaan dan de bullets.
- **Tekst:**
  ```
  With 25+ years of multi-geo leadership, including as a Director at Google and executive at Microsoft, I build data-driven GTM engines that capture market share. I bridge the gap between deep technical complexity and commercial strategy, delivering durable growth and profitability without breaking the organization.
  ```

### 3.5 Call-to-action knoppen

- **Locatie:** `src/components/HeroSection.tsx:65-80`
- **Waar op de pagina:** twee knoppen naast elkaar, onderaan de tekstkolom. De primaire knop is geel/accent-kleur, de secundaire is transparant met rand.
- **Rol & context:** bezoeker stuurt hun aandacht — of naar het bewijs (Track Record) of meteen naar actie (contact).
- **Teksten:**
  - Primaire knop (accent-kleur): `View Track Record` → scrollt naar Summary-sectie
  - Secundaire knop (outline): `Let's connect` → scrollt naar Contact-sectie

---

## 4. Track Record-sectie (onder de hero)

Tweede volledige scherm. Staat gecentreerd: klein sectie-label, dan een grote paragraaf met 8 interactieve (dashed-underlined) frasen. Hovering (desktop) of tappen (mobiel) op zo'n frase laat een bewijskaart verschijnen naast de tekst met concrete cijfers/cases (zie sectie 5). Onder de paragraaf staat een instructie-hint; helemaal onderaan de sectie scrolt een logo-banner (zie sectie 6).

### 4.1 Sectie-label

- **Locatie:** `src/components/SummarySection.tsx:108`
- **Waar op de pagina:** klein amber/accent-gekleurd label in uppercase, helemaal bovenaan de sectie, boven de hoofdparagraaf.
- **Rol & context:** structuurlabel — signaleert dat deze sectie het bewijs / de track record is. Stijl (`section-label`) is consistent met andere sectielabels (Operating Principles, Let's Connect).
- **Tekst:** `Track Record`

### 4.2 Hoofdparagraaf met 8 interactieve frasen

- **Locatie:** `src/components/SummarySection.tsx:122-155`
- **Waar op de pagina:** grote, lichte paragraaf gecentreerd in het scherm. Specifieke frasen hebben een stippellijn-onderstreping (accent-kleur) en zijn klikbaar/hoverbaar.
- **Rol & context:** verhalende samenvatting van Goswijn's positionering. Elke onderstreepte frase koppelt aan een evidence-card (sectie 5) die zijdelings naast of onder de paragraaf verschijnt.
- **Volledige tekst (onderstreepte frasen in **vet**, met hun ID):**
  ```
  Building **multi-geo** businesses end-to-end across **Big Tech** and
  **high-velocity scale-ups**, whether **scaling from 1 to 100** or driving
  **fundamental transformations**. **As a P&L owner, I combine corporate
  operational rigor with situational grit**. As a Commercial Technologist,
  I **bridge complex tech (AI, SaaS, Cloud, AdTech) with commercial strategy
  and scaling**, **building data-driven GTM engines (direct & partner) that
  capture market share and deliver predictable ARR and profitability
  without breaking**.
  ```
- **Frase → evidence-card ID (koppeling naar sectie 5):**
  - `multi-geo` → sectie 5.1
  - `Big Tech` → sectie 5.2
  - `high-velocity scale-ups` → sectie 5.3
  - `scaling from 1 to 100` → sectie 5.4
  - `fundamental transformations` → sectie 5.5
  - `As a P&L owner…` → sectie 5.6
  - `bridge complex tech…` → sectie 5.7
  - `building data-driven GTM engines…` → sectie 5.8

### 4.3 Hint-regel onder de paragraaf

- **Locatie:** `src/components/SummarySection.tsx:157-160`
- **Waar op de pagina:** klein grijs regeltje direct onder de hoofdparagraaf, links uitgelijnd.
- **Rol & context:** leert de bezoeker dat de onderstreepte frasen interactief zijn. Tekst wisselt automatisch tussen desktop (hover) en mobiel (tap).
- **Teksten:**
  - Desktop: `← Hover over the highlighted phrases to explore the evidence`
  - Mobiel: `← Tap the highlighted phrases to explore the evidence`

---

## 5. Evidence-kaarten (pop-up bij interactie met Track Record)

Wanneer de bezoeker een onderstreepte frase aanraakt, verschijnt er een kaart met bewijsmateriaal. Op desktop zweeft de kaart links of rechts naast de paragraaf (bepaald per kaart via `cardSide`); op mobiel verschijnt hij volledig onder de paragraaf. Elke kaart heeft een titel in accent-kleur en een van twee layouts.

**Bron van alle 8 kaarten:** `src/components/summary/evidenceData.ts` (één centraal databestand — past dus nooit de hoofdparagraaf aan).

**Layouts:**
- `simple` — kort lijstje `label: detail` (bedrijf → rol).
- `sar` — Situation / Action / Result structuur. Eén gedeelde contextzin bovenaan, daaronder 2 of 3 kolommen per bedrijf. Elke kolom heeft optioneel een *Situation*, een *Action* en een *Result* (de Result-regel is altijd visueel gemarkeerd als het resultaat).

### 5.1 Kaart `multi-geo` — "Multi-Geo Footprint"

- **Locatie:** `src/components/summary/evidenceData.ts:35-47`
- **Verschijnt wanneer:** bezoeker hovert/tapt op `multi-geo` in de Track Record-paragraaf.
- **Positie:** rechts van de paragraaf (desktop).
- **Layout:** `simple` — 6 bullets, één per werkgever.
- **Rol & context:** bewijs voor "multi-geo" claim; lijst werkgevers met regio/rol.
- **Titel:** `Multi-Geo Footprint`
- **Bullets (bedrijf → rol/regio):**
  - `Eyeo` → `Global Managing Director`
  - `Google Cloud` → `Director DACH, CEE, Nordics`
  - `Google DoubleClick` → `Director Sales Benelux, Nordics`
  - `Microsoft` → `Enterprise Leadership (Corporate Accounts & Compliance)`
  - `Tridion` → `Global Marketing Director`
  - `ExxonMobil` → `EMEA Product Manager`

### 5.2 Kaart `big-tech` — "Big Tech Impact"

- **Locatie:** `src/components/summary/evidenceData.ts:48-69`
- **Verschijnt wanneer:** hover/tap op `Big Tech`.
- **Positie:** links (desktop).
- **Layout:** `sar` — 2 kolommen (Google, Microsoft).
- **Rol & context:** bewijs voor impact binnen de grootste tech-bedrijven.
- **Titel:** `Big Tech Impact`
- **Context-zin:** `Driving massive scale and impact at the world's largest tech firms.`
- **Kolom Google:**
  - Situation: `Hyper-growth scaling for DoubleClick & EMEA GTM restructuring for Cloud.`
  - Action: `Scaled programmatic business from scratch (managing 80+ FTE across 7 countries) and later generated >$750M in annual pipeline as CMO EMEA North (leading a 40+ FTE multi-geo org).`
  - Result: `Achieved 400x growth (from $500K to >$200M) and #1 global productivity.`
- **Kolom Microsoft:**
  - Situation: `Managing the highly complex Corporate Accounts portfolio across a multi-geo footprint.`
  - Action: `Overhauled enterprise sales strategy, leading direct and indirect cross-functional teams (20+ FTE including senior sales, solution specialists, and marketing).`
  - Result: `Accelerated YoY revenue growth to >25%, reaching $150M ARR.`

### 5.3 Kaart `scale-ups` — "High-Velocity Scale-Ups"

- **Locatie:** `src/components/summary/evidenceData.ts:70-90`
- **Verschijnt wanneer:** hover/tap op `high-velocity scale-ups`.
- **Positie:** rechts (desktop).
- **Layout:** `sar` — 2 kolommen (Tridion, Eyeo).
- **Rol & context:** bewijs dat Goswijn ook in VC/PE-gefinancierde scale-ups presteert, niet alleen in corporate.
- **Titel:** `High-Velocity Scale-Ups`
- **Context-zin:** `Building and professionalizing VC/PE-backed growth engines.`
- **Kolom Tridion:**
  - Situation: `Early-stage VC-backed startup needing a global GTM foundation.`
  - Action: `Built global marketing from absolute zero to market and category leadership.`
  - Result: `Grew revenue to $30M and prepared for a successful exit.`
- **Kolom Eyeo (AdBlock):**
  - Situation: `A $30M+ B2C PE/Founder-backed SaaS business requiring transition to a more cost efficient and predictable model.`
  - Action: `Restructured an 80+ FTE organization, aligning Marketing, Product, Engineering, and Sales.`
  - Result: `Drove 20% ARR and EBITDA growth.`

### 5.4 Kaart `one-to-hundred` — "Scaling from 1 → 100"

- **Locatie:** `src/components/summary/evidenceData.ts:91-110`
- **Verschijnt wanneer:** hover/tap op `scaling from 1 to 100`.
- **Positie:** links (desktop).
- **Layout:** `sar` — 2 kolommen.
- **Rol & context:** bewijs voor exponentiële schaling vanaf nul.
- **Titel:** `Scaling from 1 → 100`
- **Context-zin:** `Taking proven early traction and multiplying it exponentially.`
- **Kolom Google DoubleClick:**
  - Situation: `Programmatic advertising was an emerging, complex technology with immense potential.`
  - Action: `Architected a localized direct and partner GTM motion for the Benelux.`
  - Result: `Scaled from $500K to >$200M ARR (400x growth), building EMEA's fastest-growing unit.`
- **Kolom Tridion:**
  - Situation: `The commercial engine needed to scale rapidly post-product-market fit.`
  - Action: `Executed an aggressive, data-driven global demand generation strategy.`
  - Result: `Scaled from $0 to $30M in revenue, capturing dominance.`

### 5.5 Kaart `transformations` — "Fundamental Transformations"

- **Locatie:** `src/components/summary/evidenceData.ts:111-133`
- **Verschijnt wanneer:** hover/tap op `fundamental transformations`.
- **Positie:** rechts (desktop).
- **Layout:** `sar` — **3 kolommen** zonder *situation* (breder, dus alleen Action + Result).
- **Rol & context:** bewijs voor het doorvoeren van grote organisatorische veranderingen.
- **Titel:** `Fundamental Transformations`
- **Context-zin:** `Restructuring complex organizations to unlock trapped value.`
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
- **Verschijnt wanneer:** hover/tap op `As a P&L owner, I combine corporate operational rigor with situational grit`.
- **Positie:** links (desktop).
- **Layout:** `sar` — 2 kolommen.
- **Rol & context:** bewijs voor financiële verantwoordelijkheid, van huidig Eyeo tot vroege carrière ExxonMobil.
- **Titel:** `P&L Ownership`
- **Context-zin:** `Applying relentless discipline across radically different environments.`
- **Kolom Eyeo (AdBlock):**
  - Situation: `Joined the executive board to transform a fragmented $30M+ P&L for trade sale or IPO.`
  - Action: `Applied rigorous restructuring and tough organizational realignment.`
  - Result: `Delivered 20% ARR and 20% EBITDA growth.`
- **Kolom ExxonMobil — Early Career:**
  - Situation: `Thrown into the deep end via forced job rotation with full P&L responsibility for a $200M+ retail network.`
  - Action: `Applied raw grit and data-driven management in an unfamiliar context.`
  - Result: `Increased network profitability by 82% over 3 years.`

### 5.7 Kaart `bridge-tech` — "Commercial Technologist"

- **Locatie:** `src/components/summary/evidenceData.ts:155-175`
- **Verschijnt wanneer:** hover/tap op `bridge complex tech (AI, SaaS, Cloud, AdTech) with commercial strategy and scaling`.
- **Positie:** rechts (desktop).
- **Layout:** `sar` — 2 kolommen.
- **Rol & context:** bewijs voor het vertalen van diepe technologie naar commerciële waarde.
- **Titel:** `Commercial Technologist`
- **Context-zin:** `Translating deep engineering into massive commercial value.`
- **Kolom AI & Cloud — Google:**
  - Situation: `Highly complex technical differentiators (Security, Data, AI workloads) needed enterprise adoption.`
  - Action: `Spearheaded Martech/AI initiatives and orchestrated bespoke C-suite ABM programs.`
  - Result: `Generated >$750M in enterprise pipeline.`
- **Kolom AdTech — DoubleClick:**
  - Situation: `Programmatic AdTech was a highly technical 'black box' for early adopters.`
  - Action: `Bridged the technology with strategic scaling and robust partner training.`
  - Result: `Drove mainstream market adoption, scaling 400x to >$200M.`

### 5.8 Kaart `gtm-engines` — "Data-Driven GTM Engines"

- **Locatie:** `src/components/summary/evidenceData.ts:176-198`
- **Verschijnt wanneer:** hover/tap op `building data-driven GTM engines (direct & partner) that capture market share and deliver predictable ARR and profitability without breaking`.
- **Positie:** links (desktop).
- **Layout:** `sar` — **3 kolommen** zonder *situation*.
- **Rol & context:** bewijs voor het bouwen van voorspelbare go-to-market motoren.
- **Titel:** `Data-Driven GTM Engines`
- **Context-zin:** `Architecting scalable, predictable revenue engines.`
- **Kolom Microsoft Compliance:**
  - Action: `Built a brand-new SAM ecosystem.`
  - Result: `Adopted as the global corporate standard.`
- **Kolom Google DoubleClick:**
  - Action: `Continuously adapted org design and built parallel partner ecosystems.`
  - Result: `Managed 400x hyper-growth without breaking the operation.`
- **Kolom Eyeo (AdBlock):**
  - Action: `Architected a connected, data-driven GTM engine.`
  - Result: `Delivered 20% ARR growth while protecting company culture.`

---

## 6. Logo-banner (onderaan Track Record-sectie)

- **Locatie:** `src/components/LogoBanner.tsx:33-63`
- **Waar op de pagina:** sticky onderkant van de Track Record-sectie — een horizontaal scrollende rij logo's in drie gegroepeerde blokken. Elk blok heeft een klein label erboven. De banner loopt oneindig (marquee).
- **Rol & context:** sociale proof door logo's van werkgevers / board-posities / advisory-rollen. Logo's zijn subtiel (grayscale, lage opacity) om niet te concurreren met de tekst.

### 6.1 Groep-labels

Klein amber label boven elke cluster logo's:
- `Executive Leadership` — werkgevers als executive.
- `Early Career` — vroege carrière.
- `Board & Advisory` — huidige bestuurs-/advisory-rollen.

### 6.2 Logo alt-teksten (screenreaders)

- **Executive Leadership:** `Eyeo`, `Google Cloud`, `Google`, `DoubleClick`, `Microsoft`, `Tridion`
- **Early Career:** `ExxonMobil`, `Shell`
- **Board & Advisory:** `EQT`, `NVPI`, `BSA`, `BREIN`, `Bisbrick`, `CodeSandbox`

> **Let op:** `src/components/LogoMarquee.tsx` bestaat ook in de repo (regels 20-38) als oudere variant met alle logo's in één platte rij en het label `Companies I've worked for`. Deze component wordt **niet** gebruikt in `Index.tsx` en kan mogelijk worden opgeschoond.

---

## 7. Operating Principles-sectie

Derde scherm. Gecentreerd blok met sectielabel + ondertitel, gevolgd door **4 kaarten** in een 4-koloms grid op desktop (2-koloms op tablet, gestapeld op mobiel). Elke kaart heeft bovenaan het icoon + titel naast elkaar, daaronder een beschrijvende paragraaf. Op hover lichten ze licht op en bewegen omhoog.

### 7.1 Sectie-label en ondertitel

- **Locatie:** `src/components/OperatingPrinciples.tsx:53-57`
- **Waar op de pagina:** klein accent-label bovenaan de sectie, daaronder een grijze ondertitel.
- **Rol & context:** consistent stijl met andere sectielabels (Track Record, Let's Connect).
- **Teksten:**
  - Label: `Operating Principles`
  - Ondertitel: `How I build, scale, and lead multi-geo organizations.`

### 7.2 Vier principes-kaarten

- **Locatie:** `src/components/OperatingPrinciples.tsx:4-25`
- **Waar op de pagina:** vier kaarten in een rij (desktop, 4-koloms), 2 kolommen op tablet, gestapeld op mobiel. Elke kaart heeft een Lucide-icoon (Layers / Network / Compass / Code2) naast de titel, en eronder een alinea.
- **Rol & context:** Goswijn's leiderschapsfilosofie in vier pijlers.

#### Principe 1 — `Radical Alignment` (icoon: Layers)

> I build unified GTM engines by ruthlessly aligning Product, Engineering, and Sales. I make data-driven decisions, but I refuse to be data-paralyzed. I actively demand pushback from my teams and believe that constructive friction is essential to maintain momentum and build a scalable revenue machine.

#### Principe 2 — `Translating Complexity` (icoon: Network)

> Deep technology (AI, Cloud, AdTech) only holds value if the market understands it. When it comes to business transformation, my primary role is curation. I ruthlessly filter out the organizational noise to bridge the gap between highly complex engineering and C-suite business value, turning technical differentiators into predictable pipeline.

#### Principe 3 — `Situational Grit` (icoon: Compass)

> What you see is what you get. I adapt my leadership to the context, whether navigating dot-com crashes, flat corporate budgets, or PE-backed turnarounds. I lead with transparency, and when the situation demands it, I will gladly get in the trenches to rebuild things from the ground up.

#### Principe 4 — `Hands-On Builder` (icoon: Code2)

> I am a commercial leader who codes. Nearly 400 GitHub commits last month, hands-on across the AI stack, and I teach vibe coding to executives at Erasmus. This is not a hobby. It lets me bridge product, engineering, and commercial in one mind, and design GTM motions that match how the product really works.

---

## 8. Let's Connect-sectie (onderaan de pagina)

Laatste scherm. Tweekolommig: links een foto van Goswijn ("thinking"-stijl), rechts een stacked blok met de afsprakenplanner (sectie 9) bovenaan en het contactformulier (sectie 10) onderaan. Op mobiel staat de foto als ronde thumbnail bovenin en de rest eronder.

### 8.1 Sectie-label

- **Locatie:** `src/pages/Index.tsx:85-87`
- **Waar op de pagina:** accent-label bovenaan de sectie (consistent met Track Record en Operating Principles).
- **Tekst:** `Let's Connect`

### 8.2 Afbeelding alt-tekst

- **Locatie:** `src/pages/Index.tsx:100` (mobiel rond) / `:109` (desktop full).
- **Rol & context:** screenreader-omschrijving van de sfeerfoto van Goswijn in een strategiegesprek.
- **Tekst:** `Goswijn Thijssen during a strategic business discussion`

### 8.3 Introductie-regel boven het contactformulier

- **Locatie:** `src/pages/Index.tsx:124-126`
- **Waar op de pagina:** kleine grijze regel direct boven het contactformulier (dus onder de afsprakenplanner).
- **Rol & context:** geeft de bezoeker een reden om het formulier in te vullen.
- **Tekst:**
  ```
  Leave your contact detail and topic of conversation below and I will get back to you as soon as possible.
  ```

---

## 9. Afsprakenplanner (Booking Section)

Staat bovenaan de rechterkolom van de Let's Connect-sectie. Toont één kaart met "30 minutes" + "Book Now". Klik opent een dialoog (pop-up) met twee stappen: eerst dag/tijd kiezen, dan persoonlijke gegevens. Bij succes verschijnt een groene bevestiging.

### 9.1 Boekingskaart (always visible in de rechterkolom)

- **Locatie:** `src/components/BookingSection.tsx:39-43, 236-246`
- **Waar op de pagina:** kaart bovenaan de rechterkolom van Let's Connect. Klok-icoon links, duur in het midden, "Book Now"-knop rechts.
- **Rol & context:** primaire conversie-CTA; `bookingOptions` is een array, dus meerdere kaarten kunnen worden toegevoegd — momenteel slechts één (30 minuten).
- **Teksten:**
  - Duur-label: `{30} minutes` (`30` komt uit `bookingOptions[0].duration`)
  - Knop: `Book Now`

### 9.2 Dialoog-header (pop-up titel en subtitel)

- **Locatie:** `src/components/BookingSection.tsx:255-260`
- **Waar op de pagina:** bovenaan de pop-up (modal) die verschijnt na klikken op Book Now.
- **Rol & context:** titel + dynamische beschrijving afhankelijk van welke stap actief is.
- **Teksten:**
  - Titel (dynamisch): `Book a {duration}-minute consultation`
  - Beschrijving tijdens stap "time": `Select a day and time for your consultation.`
  - Beschrijving tijdens stap "details": `Fill in your details to complete the booking.`

### 9.3 Succesbericht in dialoog

- **Locatie:** `src/components/BookingSection.tsx:263-268`
- **Waar op de pagina:** vervangt de hele dialooginhoud na een succesvolle boeking. Groot groen vinkje-icoon met onderstaande teksten. Sluit na ~2 seconden automatisch.
- **Teksten:**
  - Titel: `Booking Confirmed!`
  - Ondertitel: `Check your email for details`

### 9.4 Stap 1 — dag kiezen

- **Locatie:** `src/components/BookingSection.tsx:272, 329`
- **Waar op de pagina:** bovenste gedeelte van de dialoog. 5 dag-tegels (ma-vr) met pijlen om 7 dagen vooruit/terug te navigeren. Groene randen = beschikbaar, grijs = vol.
- **Teksten:**
  - Label boven tegels: `Select a Day`
  - Na selectie van een dag verschijnt: `Available Times` (label boven de tijd-tegels)

### 9.5 Stap 2 — gegevensformulier

- **Locatie:** `src/components/BookingSection.tsx:353-424`
- **Waar op de pagina:** vervangt stap 1 in dezelfde dialoog zodra er een tijdslot is gekozen. Bovenaan staat de geselecteerde tijd met een "Change"-knop om terug te gaan.
- **Teksten:**
  - Geselecteerde-slot header: `Selected: {datum, dag, tijd}`
  - Wijzig-knop: `Change`
  - Veldlabel **Name**, placeholder: `Your full name`
  - Veldlabel **Email**, placeholder: `your.email@example.com`
  - Veldlabel **What would you like to discuss?**, placeholder: `Brief description of what you'd like to talk about...`
  - Veldlabel **Attachment (optional - max 5MB)** — file-input voor `.pdf/.doc/.docx/.txt`
  - Bestandinfo na upload: `Selected: {naam} ({grootte}MB)`
  - Onderaan twee knoppen: `Back`, `Review & Confirm`

### 9.6 Bevestigings-dialoog (tweede pop-up)

- **Locatie:** `src/components/BookingSection.tsx:447-493`
- **Waar op de pagina:** verschijnt bovenop de eerste dialoog als de bezoeker op "Review & Confirm" klikt. Samenvatting van datum/tijd/duur plus definitieve knoppen.
- **Rol & context:** extra bevestigingsstap om per ongeluk boeken te voorkomen.
- **Teksten:**
  - Titel: `Confirm Your Booking`
  - Beschrijving: `Please review your booking details`
  - Rij-labels: `Date:`, `Time:`, `Duration:`
  - Annuleerknop: `Cancel`
  - Bevestigknop (inactief): `Confirm`, tijdens verzenden: `Booking...`

### 9.7 Toast-meldingen (tijdelijke pop-ups rechtsonder)

- **Locatie:** `src/components/BookingSection.tsx:63-67, 100-104, 148-150, 153-157, 406-409`
- **Waar op de pagina:** toasts — kleine kaartjes die ~4 sec rechtsonder verschijnen en vanzelf verdwijnen.
- **Rol & context:** feedback bij API-fouten of ontbrekende invoer.
- **Teksten:**
  - **Slots laden mislukt** — titel: `Error`, bericht: `Failed to load available time slots. Please try again.`
  - **Ontbrekende info** — titel: `Missing information`, bericht: `Please fill in all fields and select a time slot`
  - **Boeking gelukt** — titel: `Booking confirmed!`, bericht: `You will receive a confirmation email shortly.` (of backend-bericht)
  - **Boeking mislukt** — titel: `Booking failed`, bericht: `Failed to complete booking. Please try again.` (of backend-fout)
  - **Bestand te groot** — titel: `File too large`, bericht: `Please upload a file smaller than 5MB`

---

## 10. Contactformulier

Onderdeel van de Let's Connect-sectie, onder de afsprakenplanner. Drie velden + twee knoppen.

### 10.1 Formuliervelden

- **Locatie:** `src/components/ContactForm.tsx:88-114`
- **Waar op de pagina:** drie verticale velden — naam, e-mail, bericht.
- **Rol & context:** lichte variant van contact — voor bezoekers die nog niet direct een afspraak willen boeken.
- **Teksten (placeholders in de lege velden):**
  - Veld 1 (tekst-input): `Your Name`
  - Veld 2 (email-input): `Your Email`
  - Veld 3 (textarea, 6 rijen): `Your Message`

### 10.2 Knoppen onder het formulier

- **Locatie:** `src/components/ContactForm.tsx:117-135`
- **Waar op de pagina:** twee knoppen verticaal gestapeld onder het bericht-veld.
- **Rol & context:** hoofdknop verstuurt het bericht; secundaire knop stuurt een CV-aanvraag naar Goswijn's mailbox.
- **Teksten:**
  - **Verzendknop** (primair, grote knop) — inactief: `Send Message`, tijdens verzenden: `Sending...`
  - **CV-aanvraag** (secundaire kleine knop met bestandsicoon) — inactief: `Request Full CV / Resume`, tijdens verzenden: `Requesting...`

### 10.3 Toast-meldingen (feedback)

- **Locatie:** `src/components/ContactForm.tsx:30-42, 49-54, 70-79`
- **Waar op de pagina:** kleine pop-ups rechtsonder.
- **Teksten:**
  - **Bericht verzonden** — titel: `Message sent!`, bericht: `Thank you for your message. I'll get back to you soon.`
  - **Bericht mislukt** — titel: `Error`, bericht: `Failed to send message. Please try again.`
  - **Verplichte velden bij CV-aanvraag** — titel: `Required fields`, bericht: `Please fill in your name and email above first.`
  - **CV aangevraagd** — titel: `CV requested!`, bericht: `I'll send you my full CV/Resume shortly.`
  - **CV mislukt** — titel: `Error`, bericht: `Failed to request CV. Please try again.`

### 10.4 Verborgen e-mail template bij CV-aanvraag

- **Locatie:** `src/components/ContactForm.tsx:64`
- **Waar zichtbaar:** niet op de site — dit is het bericht dat naar Goswijn's inbox gaat wanneer iemand op "Request Full CV / Resume" klikt.
- **Rol & context:** signaleert dat de aanvraag specifiek een CV-verzoek is (zodat het in de inbox gesorteerd kan worden).
- **Template:** `[CV/Resume Request] {name} ({email}) has requested your full CV/Resume.`

---

## 11. 404-pagina (wanneer een URL niet bestaat)

- **Locatie:** `src/pages/NotFound.tsx:12-20`
- **Waar zichtbaar:** alleen op onbestaande URL's (bijv. `goswijn.com/niet-bestaand`). Gecentreerde tekst op grijze achtergrond.
- **Rol & context:** verwijst de bezoeker terug naar de homepage.
- **Teksten:**
  - Grote titel: `404`
  - Ondertitel: `Oops! Page not found`
  - Terugkeer-link (blauw onderstreept): `Return to Home`

---

## 12. Error Boundary (crash-vangnet)

- **Locatie:** `src/components/ErrorBoundary.tsx:28-40`
- **Waar zichtbaar:** alleen als er een onverwachte JavaScript-fout optreedt die de pagina zou crashen.
- **Rol & context:** voorkomt een lege witte pagina bij fouten; toont een vriendelijke boodschap en een refresh-knop.
- **Teksten:**
  - Titel: `Something went wrong`
  - Uitleg: `Please refresh the page to try again.`
  - Knop: `Refresh Page`

---

## 13. Google Calendar-integratie (interne/admin UI)

> Deze component zit in de codebase maar wordt momenteel **niet gerenderd** op de publieke site. Hij kan gebruikt worden op een toekomstige admin-pagina om Goswijn zijn Google Calendar te laten koppelen aan de booking-functionaliteit.

- **Locatie:** `src/components/GoogleCalendarAuth.tsx:84-114`
- **Rol & context:** admin-kaart om via OAuth de agenda te koppelen.
- **Teksten:**
  - Kaarttitel: `Google Calendar Integration`
  - Beschrijving: `Connect your Google Calendar to send calendar invites to clients`
  - Status (geautoriseerd): `Google Calendar is connected`
  - Knop (niet geautoriseerd): `Connect Google Calendar`, tijdens OAuth-flow: `Authorizing...`
  - Toast succes — titel: `Success!`, bericht: `Google Calendar has been authorized successfully.`
  - Toast mislukt — titel: `Authorization Failed`, bericht: `Failed to authorize Google Calendar` (of foutmelding van Google)

---

## Bestandenoverzicht — waar staat welke tekst?

| Bestand | Wat bevat het | Secties in dit doc |
|---|---|---|
| `index.html` | SEO-metadata, Open Graph, Twitter, Schema.org | 1 |
| `src/components/SiteHeader.tsx` | Sticky navigatie, naam-logo links, menu-items | 2 |
| `src/components/HeroSection.tsx` | H1, bullets, intro, CTA-knoppen, portret alt-tekst | 3 |
| `src/components/SummarySection.tsx` | Track Record-label, hoofdparagraaf met interactieve frasen, hint | 4 |
| `src/components/summary/evidenceData.ts` | **Alle 8 evidence-kaarten** (titels, context, bullets, SAR) | 5 |
| `src/components/LogoBanner.tsx` | Groep-labels en alt-teksten van logo-marquee | 6 |
| `src/components/LogoMarquee.tsx` | Oude (ongebruikte?) logo-variant | 6 (noot) |
| `src/components/OperatingPrinciples.tsx` | Sectielabel, ondertitel, 3 principes | 7 |
| `src/pages/Index.tsx` | "Let's Connect"-label, intro-regel contact, alt-tekst | 8 |
| `src/components/BookingSection.tsx` | Booking-UI, dialogen, formulier, toasts | 9 |
| `src/components/ContactForm.tsx` | Contact-placeholders, knoppen, toasts, CV-template | 10 |
| `src/pages/NotFound.tsx` | 404-pagina | 11 |
| `src/components/ErrorBoundary.tsx` | Crash-fallback | 12 |
| `src/components/GoogleCalendarAuth.tsx` | Admin OAuth-koppeling | 13 |

---

## Werkwijze voor tekstwijzigingen

1. **Open dit bestand** (`TEXT_CONTENT.md`) en zoek de sectie die je wilt wijzigen. Gebruik Cmd+F op bijv. een woord uit de huidige tekst om snel te vinden.
2. **Lees de context** ("Waar op de pagina" + "Rol & context") zodat je weet wat het effect van je wijziging is.
3. **Noteer de "Locatie"** — bijv. `src/components/HeroSection.tsx:42` — en pas de tekst aan in dat bronbestand op die regel.
4. **Update óók deze `TEXT_CONTENT.md`** met de nieuwe tekst, zodat het bestand in sync blijft met de echte site.
5. Commit / push (of laat Lovable dit doen).
6. Controleer in een browser of de wijziging correct op de pagina verschijnt op de plek die "Waar op de pagina" beschreef.

---

## Voor AI-assistenten (Claude, Gemini, ChatGPT, Lovable)

Als je gevraagd wordt een stuk tekst aan te passen:
1. Zoek eerst in dit bestand de betreffende passage (via Cmd+F / grep op een unieke frase).
2. Gebruik de **Locatie**-regel om het juiste bronbestand + regel te vinden — pas dáár de tekst aan, **niet** alleen in dit doc-bestand.
3. Update **zowel** het bronbestand als deze `TEXT_CONTENT.md`. Deze twee moeten identiek blijven qua zichtbare tekst.
4. Voor de evidence-kaarten (sectie 5): **alle data staat in één bestand** `src/components/summary/evidenceData.ts`. Je hoeft dus niet in 8 verschillende bestanden te zoeken.
5. Bij twijfel over de positie op de pagina: lees "Waar op de pagina" + "Rol & context" in dit doc — daarin staat hoe het visueel in de flow past.
