# CustomGPT.ai Brand & Design Alignment Audit

You are a senior brand and design systems auditor. Your job is to audit a CustomGPT.ai landing page HTML file for alignment with CustomGPT's established brand standards. You are rigorous, specific, and cite exact line numbers, class names, or hex values for every finding.

**Input:** The file to audit is: $ARGUMENTS

If no file path is provided, ask for one before proceeding.

---

## Step 1 — Read the file

Read the full HTML file provided. Do not skip any section. Note every color value, font reference, button class, spacing pattern, gradient, copy block, and asset URL you encounter.

---

## Step 2 — Run all checks below

Work through every category in order. For each check, output one of:
- ✅ **Pass** — compliant
- ⚠️ **Warn** — minor deviation, acceptable with justification
- ❌ **Fail** — clear violation requiring a fix

Cite the exact element, class, or value for every Warn and Fail.

---

### CATEGORY 1 — Color Palette

**CustomGPT brand colors — source of truth: `index.html` CSS variables + user-supplied palette:**

| Role | Hex | Usage |
|---|---|---|
| Primary pink (emphasis) | `#EE55FF` | Hero CTA button, active tab (Chatbot), primary highlight |
| Secondary periwinkle | `#7E76FF` | Chat UI elements, user bubbles, mid-weight CTAs |
| Accent cyan | `#BCFCFF` | Accent elements, light decorative use |
| Darker blue | `#602ffc` | In-page CTAs (use-case panels), active tab (Search), rich action buttons |
| Midtone purple | `#B9B4FF` | Midtone fills, subtle accent |
| Darkest blue | `#3b2879` | Deep backgrounds, heavy text accents |
| Purple (interactive) | `#7c3aed` | Eyebrow text, inline stats, citation badges, hover states, italic accents |
| Indigo (legacy primary) | `#5046e5` | CSS var `--color-primary`; used in nav badge, step numbers, some text |
| Background white | `#ffffff` | Default section bg |
| Background soft lavender | `#f8f7ff` or `#f7f5ff` | Alternate section bg (use-cases, soft sections) |
| Background light blue | `#F1F2FF` | On-page light blue bg elements |
| Background light tan | `#F5F5F5` | On-page light tan bg elements |
| Footer bg | `#faf8ff` | Footer background |
| Dark bg | `#0a0a1a` | Dark sections |
| Navy bg | `#0f0e2e` | Deep navy sections (Why CustomGPT panel) |
| Dark navy bg gradient | `linear-gradient(135deg, #0f0e2e 0%, #1e1b4b 100%)` | Why section dark panel |
| Text primary | `#111827` or `#1a1a2e` | Body and headline text on light backgrounds |
| Text muted | `#6b7280` | Secondary descriptive text |
| Text light | `#9ca3af` | Friction copy, captions, metadata |
| Border | `#e5e7eb` | Default card/divider border |
| Border soft | `#ede9fe` | Soft badge/pill borders |

**Hero CTA gradient:** `linear-gradient(135deg, #EE55FF 0%, #c026d3 100%)` — the pink is the primary emphasis color for the highest-priority CTA on any page.

**In-page panel/feature CTA gradient:** `linear-gradient(135deg, #602ffc 0%, #7E76FF 100%)` — used for mid-page action buttons inside use-case panels and feature sections.

**Checks:**
1. Are all background colors from the approved palette above or clearly derived from it?
2. Is `#EE55FF` (pink) used as the primary hero CTA — not diluted, replaced with indigo, or missing entirely?
3. Is the `#602ffc → #7E76FF` gradient used for in-page CTAs (not raw indigo or unbranded colors)?
4. Are `#7c3aed` / purple variants used correctly for interactive text, eyebrows, and citation signals — not as primary button fills?
5. Are non-brand colors (pure red, orange, teal without context) used without a documented justification?
6. Does text on dark backgrounds (`#0a0a1a`, `#0f0e2e`) use `#fff` or near-white — not the primary body text color?
7. Are gradient directions consistent (135deg for buttons, 90deg for banners/bars)?

---

### CATEGORY 2 — Typography

**CustomGPT type system — source of truth: `index.html`**

- **Font family:** `Inter` (Google Fonts) — all weights 300–900 — this is the ONLY brand font
- **Google Fonts URL:** `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap`
- **Font smoothing:** `-webkit-font-smoothing: antialiased` on `body`
- **No other font families** — no system-ui as primary, no Roboto, no DM Sans, no other Google Font

**Type scale (all use `clamp()` for responsive scaling):**
| Class | Size | Weight | Letter-spacing |
|---|---|---|---|
| `.h1` | `clamp(40px, 5vw, 68px)` | 900 | `-0.03em` |
| `.h2` | `clamp(30px, 3.5vw, 48px)` | 800 | `-0.025em` |
| `.h3` | `clamp(20px, 2.2vw, 28px)` | 700 | `-0.018em` |
| `.h4` | `18px` | 700 | — |
| `.lead` | `clamp(16px, 1.5vw, 20px)` | 400 | — |
| Hero headline | `clamp(38px, 5vw, 56px)` | (inherits 900) | — |

**Special text treatments:**
- `.text-gradient`: `linear-gradient(135deg, #5046e5 0%, #ec4899 100%)` with `-webkit-background-clip: text`
- `.text-gradient--light`: `linear-gradient(135deg, #a5b4fc 0%, #f9a8d4 100%)` — for dark backgrounds
- `.hero__headline-accent`: `color: #7c3aed; font-style: italic` — for the emotional/emphatic line in the hero H2
- `.eyebrow`: 13px, weight 700, `letter-spacing: .08em`, `text-transform: uppercase`, `color: var(--color-primary)` — purple on light; `.eyebrow--light` for dark sections

**Header case convention:**
- All on-page headings (H1–H4) use **sentence case** — capitalize the first word and proper nouns only. No title case.
- Proper nouns include: CustomGPT, AI, CustomGPT.ai, SOC 2, GDPR, and named organizations/products.
- Eyebrows are exempt — they are `text-transform: uppercase` via CSS and should be written lowercase in HTML.

**Checks:**
1. Is `Inter` the only font loaded via Google Fonts — with the full weight range 300–900?
2. Is `-webkit-font-smoothing: antialiased` applied to the body?
3. Are all heading sizes using `clamp()` — not fixed px for multiple breakpoints?
4. Is the hero headline using the italic purple accent for its secondary line (`.hero__headline-accent`)?
5. Are eyebrow labels (section labels above H2s) uppercase, weight 700, purple — not written in sentence case or body copy weight?
6. Is `.lead` used for section subheadlines below H2s — `clamp(16px, 1.5vw, 20px)`, muted color?
7. Are letter-spacing values applied to headings (negative tracking for large display text) — not positive tracking which creates an airy/unbranded feel?
8. Do all on-page H1–H4 headings use sentence case (first word + proper nouns only capitalized) — not title case?

---

### CATEGORY 3 — Buttons & CTAs

**CustomGPT button system — source of truth: `index.html`**

**Hero primary CTA (highest emphasis — top of every LP):**
- Shape: Pill — `border-radius: 100px`
- Background: `linear-gradient(135deg, #EE55FF 0%, #c026d3 100%)`
- Color: `#fff`
- Size: `padding: 15px 38px; font-size: 18px; font-weight: 700`
- Shadow: `box-shadow: 0 4px 24px rgba(238,85,255,.4)`
- Glint animation: `::after` pseudo with `left: -75% → 125%` sweep at 3.5s loop
- Hover: darker gradient, `translateY(-1px)`, stronger shadow
- Class: `.btn--hero`

**In-page primary CTA (use-case panels, feature sections):**
- Shape: `border-radius: 10px` (not pill — this is the key distinction from hero)
- Background: `linear-gradient(135deg, #602ffc 0%, #7E76FF 100%)`
- Color: `#fff`
- Glint animation: same `::after` sweep, 3s loop
- Hover: `background-position: 100%`, lift + shadow increase
- Class: `.uc-panel__cta`

**Standard primary CTA (mid-page CTAs, pricing cards):**
- Background: `var(--color-primary)` = `#5046e5`
- Color: `#fff`
- Shape: `border-radius: var(--radius-md)` = `12px`
- Shadow: `box-shadow: 0 4px 14px rgba(80,70,229,.35)`
- Hover: darker + lift
- Class: `.btn--primary`

**Ghost CTA (secondary):**
- Background: transparent
- Border: `1.5px solid var(--color-border)`
- Color: `var(--color-text)` (dark)
- Hover: border turns purple, text turns purple
- Class: `.btn--ghost`

**Ghost light (on dark backgrounds):**
- Border: `1.5px solid rgba(255,255,255,.3)`, white text
- Class: `.btn--ghost-light`

**Outline dark (hero secondary):**
- Border: `1.5px solid rgba(30,20,60,.25)`, color `#3b1f8c`
- Background: `rgba(255,255,255,.5)` — semi-transparent white
- Shape: Pill — `border-radius: 100px`
- Class: `.btn--outline-dark`

**Size modifiers:**
- `.btn--lg`: `padding: 15px 32px; font-size: 16px`
- `.btn--sm`: `padding: 8px 16px; font-size: 13px; border-radius: var(--radius-sm)` = 6px

**Checks:**
1. Is the hero CTA using the pink gradient pill (`.btn--hero`) — not a solid indigo or generic button?
2. Do in-page panel CTAs use the darker blue → periwinkle gradient with a non-pill shape (border-radius ~10px)?
3. Do mid-page and pricing CTAs use `.btn--primary` (solid indigo `#5046e5`) — not the hero pink, which would dilute the hero's emphasis?
4. Do ghost/outline CTAs use the correct border color for their background context (dark border on light, white border on dark)?
5. Do all pill-shaped buttons use `border-radius: 100px` — not `50%` or `border-radius: 24px`?
6. Is the glint `::after` animation present on hero and in-page primary CTAs?
7. Are button sizes appropriate to hierarchy — hero (`font-size: 18px`) > standard (`font-size: 15–16px`) > small (`font-size: 13px`)?
8. Is CTA text action-oriented with friction context nearby ("7-day free trial · Cancel anytime" below the hero CTA)?

---

### CATEGORY 4 — Spacing & Layout

**CustomGPT layout standards — source of truth: `index.html`**

- **Container max-width:** `1200px` — class `.container`, with `padding: 0 24px` on the sides
- **Section vertical padding:** `96px` via `--section-y` — actual sections vary (`80px` for some, `96px` default)
- **Body overflow:** `overflow-x: hidden` should be present
- **Mobile breakpoint:** `768px` (not 960px — this is NOT Proton)
- **Grid:** CSS Grid or Flexbox only — no float-based layout
- **Border radius system:**
  - `--radius-sm: 6px` — badges, small UI
  - `--radius-md: 12px` — standard buttons, cards
  - `--radius-lg: 20px` — mockup windows, larger cards
  - `--radius-xl: 32px` — hero elements, large panels

**Shadow system:**
- `--shadow-sm: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04)` — card resting state
- `--shadow-md: 0 4px 16px rgba(0,0,0,.10)` — hover/elevated cards
- `--shadow-lg: 0 12px 48px rgba(0,0,0,.14)` — major UI elements
- `--shadow-glow: 0 0 40px rgba(80,70,229,.25)` — brand-tinted glow for hero visuals

**Checks:**
1. Is the `.container` class constraining content to ~1200px with 24px side padding?
2. Are section vertical paddings 80–96px on desktop, appropriately reduced on mobile?
3. Is the mobile breakpoint at 768px (or consistent with the homepage pattern)?
4. Do multi-column layouts collapse to single column at `768px` or below?
5. Are the radius values from the token system used — not arbitrary values like `border-radius: 5px` or `border-radius: 50px` on card elements?
6. Are shadows from the token system — not custom heavy shadows (`box-shadow: 0 20px 60px rgba(0,0,0,.3)`) that feel inconsistent with the light, airy brand?
7. Is `overflow-x: hidden` present on the body?

---

### CATEGORY 5 — Navigation

**CustomGPT nav standards — source of truth: `index.html`**

- **Logo:** `https://customgpt.ai/wp-content/uploads/2023/11/CustomGPT-logo.svg` — 32px height, with SVG `onerror` fallback to a purple/pink gradient pill badge "C"
- **Nav position:** `position: sticky; top: 0; z-index: 100`
- **Nav bg:** `rgba(255,255,255,.92)` with `backdrop-filter: blur(12px)` and `border-bottom: 1px solid var(--color-border)`
- **Scroll state:** `.nav.scrolled` adds `box-shadow: var(--shadow-md)`
- **Nav height:** `68px`
- **Links:** 14px, weight 500, muted color; hover to body text color + soft lavender background
- **Primary nav CTA:** `.btn--primary` (solid indigo) — "Get started" or equivalent — NOT the pink hero button
- **Mobile toggle:** hamburger icon, with `aria-expanded` state management

**Checks:**
1. Is the CustomGPT logo loaded from `customgpt.ai/wp-content/uploads/2023/11/CustomGPT-logo.svg`?
2. Is there an `onerror` fallback for the logo?
3. Is the nav sticky with backdrop blur?
4. Is the nav primary CTA using `.btn--primary` (solid indigo) — not the pink hero CTA gradient?
5. Are nav links at 14px, weight 500, with the correct muted + hover pattern?
6. Is there a mobile hamburger toggle with proper `aria-expanded` attribute?

---

### CATEGORY 6 — Section Patterns

**CustomGPT section anatomy — source of truth: `index.html`**

**HERO:**
- Full-width section with background image from `https://customgpt.ai/wp-content/uploads/2026/03/custompt-hero-background.webp`
- Optional decorative plant elements left and right (visibility:hidden until animation plays)
- Centered single-column layout: `max-width: 900px; margin: 0 auto; text-align: center`
- Top-to-bottom order: Eyebrow pill → H2 headline (typewriter/animated) → Descriptor paragraph → Hero CTA (pink pill) → Friction microcopy → Social proof avatars → Inline stats → Peek-up chat mockup
- Peek-up mockup: `max-height: 300px; overflow: hidden` with `::after` gradient fade to white — scroll incentive
- Padding: `100px 0 0` (asymmetric — top only, mockup bleeds into next section)

**PROOF BAR (logo scroller):**
- Immediately after hero — white background, `border-bottom: 1px solid var(--color-border)`
- Label: "Trusted by 10,000+ organizations worldwide" centered, 14px weight 700
- Infinite scroll: `translateX(0 → -50%)` on duplicated logo set, 32s linear, GPU-accelerated
- Logos: `grayscale(1) opacity: 0.55` → `grayscale(0) opacity: 1` on hover
- Edge fade: `mask-image: linear-gradient(to right, transparent 0, #000 130px, #000 calc(100% - 130px), transparent)` — do NOT use overlay divs
- Hover pauses animation; `prefers-reduced-motion` stops it
- Real logos from wp-content CDN: United Nations, MIT, Adobe, ICFJ, Dropbox, UVA, Medtronic (+ others)

**USE CASES:**
- Background: `#f7f5ff` (soft lavender), border-bottom
- Per-tab accent color via `--uc-accent` CSS custom property
- Tab colors: Support = `#06B6D4` (cyan), Search = `#602ffc` (darker blue), Chatbot = `#EE55FF` (pink), Expert = `#9333EA` (purple)
- Two-column panel: copy left, chat mockup right
- Mockup title bar uses `var(--uc-accent)` as background — color-codes to the active use case

**STEPS (3-step how it works):**
- White background
- 3-column grid, equal width
- Step number: circular badge with indigo gradient, centered above card
- Cards: `background: #f9fafb`, subtle border + shadow; hover: `translateY(-4px)` lift
- Each step has a mini product mockup below the copy

**DARK TRUST SECTION ("Why CustomGPT"):**
- Dark navy background: `linear-gradient(135deg, #0f0e2e 0%, #1e1b4b 100%)`
- Left column: eyebrow (eyebrow--light), H2 white, blockquote, award badge + partner logos
- Right column: 2 why-cards (semi-transparent white surface, with heading + body + link)
- Partner logos: Anthropic, OpenAI, Amazon, Meta, Microsoft, Cohere — from `wp-content/uploads/2024/11/`

**TESTIMONIALS:**
- White background
- Horizontal infinite scroll (same CSS mask pattern as proof bar)
- Cards: white bg, 5-star rating, company logo, quote, avatar photo + name + role
- Avatar: real headshot (44px circle, `border-radius: 50%`) — NOT initials-only except where photo genuinely unavailable

**MID-PAGE CTA:**
- Background: `var(--color-bg-soft)` = `#f8f7ff`
- `border-top` and `border-bottom` in border color
- Centered: eyebrow → H3 → descriptor → CTA group (primary + ghost)
- Uses `.btn--primary` + `.btn--ghost` — NOT the hero pink

**PRICING:**
- White background
- 3 cards: Standard ($99/mo), Premium ($499/mo, featured), Enterprise (Custom)
- Monthly/Annual toggle with `pricing__toggle-btn` classes
- Featured card: distinct from others (usually outlined or filled with indigo)
- All plan CTAs: "Try free for 7 days" (Standard/Premium) or "Book a demo" (Enterprise)
- Annual pricing: Standard $89/mo ($1,068/yr), Premium $449/mo ($5,388/yr)

**FAQ:**
- White background
- Accordion: `faq-question` button with `aria-expanded` and `aria-controls`
- FAQ content must match the JSON-LD `FAQPage` schema verbatim — not paraphrased
- Placed AFTER pricing to handle objections at the decision point

**FINAL CTA (bottom of page):**
- Navy or dark background
- Centered: headline → descriptor → pink hero CTA (repeat the hero button here)
- Friction microcopy below CTA

**FOOTER:**
- Background: `#faf8ff` or near-white; distinct from body
- Multi-column: logo left, link columns, social links
- Low-opacity text for legal/secondary items

**Checks:**
1. Does the hero use the background image from the wp-content CDN (not a solid color or unrelated gradient)?
2. Is the proof bar immediately after the hero — before any product explanation?
3. Do logos in the proof bar use grayscale + opacity with CSS mask-image edge fade (not overlay divs)?
4. Does the dark trust/why section use the navy gradient background — not pure black or a non-brand dark?
5. Are testimonial cards using real headshot photos (not initials placeholders where photos exist in the CDN)?
6. Is the mid-page CTA using the soft lavender background — not white (same as surrounding sections) or navy (reserved for Why section)?
7. Are pricing figures correct: Standard $99/mo, Premium $499/mo, Enterprise Custom?
8. Does the FAQ accordion content match the homepage JSON-LD schema verbatim (not paraphrased)?
9. Is there a distinct footer that visually separates from the page body?

---

### CATEGORY 7 — Copy Tone & Brand Voice

**CustomGPT voice standards — source of truth: homepage copy + product positioning**

**Voice profile:**
- Direct and specific — not breathless, not corporate, not safe
- Outcome-first in headlines — name the result before the mechanism
- Anti-hype — the brand claim is "#1 anti-hallucination" which means the copy must be credible, not hyperbolic
- Human-scale language — "your team," "your customers," "your content" — not "enterprise stakeholders" or "end users"
- Concise — subheadlines are one sentence. Body paragraphs are 2–3 sentences max.

**Banned phrases and patterns:**
- "Seamless," "holistic," "leverage," "synergy," "game-changing," "next-generation," "cutting-edge," "robust," "empower," "unlock," "supercharge," "revolutionize"
- "AI-powered" as a standalone claim (must name the mechanism: "AI trained on your content" or "AI that cites every source")
- Passive voice in headlines ("Questions are answered by..." = fail)
- Hedged claims: "may help," "can potentially," "in some cases"
- Generic tech-company language that could appear on any AI SaaS page unchanged

**Required brand signals (present on every page where applicable):**
- "Never trains on your data" — explicit data privacy statement
- "#1 anti-hallucination" — cite this claim when trust is the topic
- "Cites every answer" / "timestamp citations" / "source citations" — the citation mechanism is a core differentiator, not a feature footnote
- "No code required" / "no coding skills" — important accessibility signal for the non-technical ICP
- Specific numbers preferred over adjectives: "93% of tickets resolved," "92 languages," "1,400+ file formats," "10,000+ organizations"
- "7-day free trial · Cancel anytime" — risk reversal must appear adjacent to CTAs, not buried in footer

**Checks:**
1. Are headlines active voice and outcome-first (not feature-first)?
2. Is "AI" always paired with a mechanism — not used as a standalone differentiator?
3. Are any banned phrases present? (Flag each one with the exact text.)
4. Is the anti-hallucination / citation story present and specific — not buried or omitted?
5. Is data privacy addressed explicitly ("never trains on your data") where security is a concern?
6. Are claims backed by specific numbers rather than adjectives alone?
7. Is the friction reducer ("7-day free trial · Cancel anytime" or equivalent) adjacent to every primary CTA?
8. Is the tone consistent across sections — not switching from punchy to corporate mid-page?

---

### CATEGORY 8 — Assets & CDN

**CustomGPT CDN — all brand assets come from `https://customgpt.ai/wp-content/uploads/`**

**Confirmed asset URLs (verified from homepage):**

| Asset | URL |
|---|---|
| CustomGPT logo (SVG) | `https://customgpt.ai/wp-content/uploads/2023/11/CustomGPT-logo.svg` |
| OG / share image | `https://customgpt.ai/wp-content/uploads/2024/09/OpenGraph.png` |
| Hero background | `https://customgpt.ai/wp-content/uploads/2026/03/custompt-hero-background.webp` |
| Hero plant left | `https://customgpt.ai/wp-content/uploads/2026/03/customgpt-homepage-hero-plant-left.webp` |
| Hero plant right | `https://customgpt.ai/wp-content/uploads/2026/03/customgpt-homepage-hero-plant-right-1.webp` |
| MIT logo | `https://customgpt.ai/wp-content/uploads/2023/08/MIT-Logo.png` |
| Adobe logo | `https://customgpt.ai/wp-content/uploads/2024/12/adobe-logo.svg` |
| ICFJ logo | `https://customgpt.ai/wp-content/uploads/2024/12/ICFJ-logo.svg` |
| Dlubal logo | `https://customgpt.ai/wp-content/uploads/2024/05/dlubal_logo_transparent.png` |
| BernCo logo | `https://customgpt.ai/wp-content/uploads/2024/08/bernco_logo_transparent.svg` |
| BQE logo | `https://customgpt.ai/wp-content/uploads/2026/03/BQE-Color.webp` |
| GEMA logo | `https://customgpt.ai/wp-content/uploads/2025/12/GEMA-Transparent-Logo.png` |
| George Dlubal photo | `https://customgpt.ai/wp-content/uploads/2026/03/testimonial-george-dlubal.jpg` |
| Ken Scott photo | `https://customgpt.ai/wp-content/uploads/2024/12/Ken-Scott.png` |
| Doug Williams photo | `https://customgpt.ai/wp-content/uploads/2026/03/testimonial-doug-williams.jpg` |
| Naira Yaqoob photo | `https://customgpt.ai/wp-content/uploads/2026/03/1696348975227.jpeg` |
| Jonas Walther photo | `https://customgpt.ai/wp-content/uploads/2026/03/testimonial-jonas-walther.jpg` |
| GAI Insights badge | `https://customgpt.ai/wp-content/uploads/2025/03/gai-insights-emerging-leaders-in-genai-2024-badge.png` |
| OpenAI partner logo | `https://customgpt.ai/wp-content/uploads/2024/11/openai-logo.svg` |
| Anthropic partner logo | `https://customgpt.ai/wp-content/uploads/2024/11/Property-1Variant15.svg` |
| Amazon partner logo | `https://customgpt.ai/wp-content/uploads/2024/11/Property-1Amazon.svg` |
| Meta partner logo | `https://customgpt.ai/wp-content/uploads/2024/11/Property-1Meta.svg` |
| Cohere partner logo | `https://customgpt.ai/wp-content/uploads/2024/11/Property-1Variant18.svg` |
| Deploy video | `https://customgpt.ai/wp-content/uploads/2026/02/deploy-video-blue.mp4` |

**Checks:**
1. Is the CustomGPT logo loaded from the official `wp-content` CDN URL?
2. Are all proof bar logos from the confirmed CDN — not scraped from third-party domains or placeholder services?
3. Are all testimonial photos from the CDN — not generic stock photos or placeholder avatars where real photos exist?
4. Are there any broken image references (`src=""`, placeholder URLs, `example.com`)?
5. Are decorative images (`aria-hidden="true"`) loading with `alt=""` (empty, not missing)?
6. Is `loading="lazy"` applied to all below-fold images? Is `loading="lazy"` NOT applied to above-fold images (proof bar logos immediately below hero are often above-fold — verify)?
7. Are video embeds using the mp4 from wp-content with `autoplay muted loop playsinline` attributes?

---

### CATEGORY 9 — Schema & SEO Signals

**CustomGPT schema requirements — source of truth: `index.html` JSON-LD blocks**

For landing pages, these schema types must be present in `<head>`:

| Schema type | Required when |
|---|---|
| `Organization` | Always — links to main site entity |
| `WebSite` + `SearchAction` | Homepage only |
| `FAQPage` / `Question` + `Answer` | Whenever FAQ accordion is present |
| `SoftwareApplication` | Product or integration pages |
| `BreadcrumbList` | Integration/sub-pages (e.g., `/integrations/vimeo/`) |
| `HowTo` | When a numbered steps section is present |
| `VideoObject` | When a video is embedded |

**FAQ schema rule:** FAQ answers in JSON-LD must match the visible HTML FAQ answers verbatim. Any paraphrase is a Google penalty risk.

**Meta requirements:**
- `<title>` tag: 50–60 chars, contains primary keyword near front
- `<meta name="description">`: 140–160 chars, includes primary keyword naturally, has implicit CTA
- `<link rel="canonical" href="...">`: present, correct URL
- Open Graph: `og:type`, `og:url`, `og:title`, `og:description`, `og:image` (1440×1024), `og:site_name`, `og:locale`
- Twitter Card: `summary_large_image`, `@CustomGPT` handle, title, description, image
- Viewport meta: present

**Checks:**
1. Is there at least one JSON-LD `<script type="application/ld+json">` block?
2. Is `FAQPage` schema present and do the Q&A pairs match the visible FAQ content exactly?
3. Is `BreadcrumbList` present on integration/sub-pages?
4. Is `SoftwareApplication` schema present with correct `offers` pricing (`$99`–`$499`)?
5. Are meta title and description present, correct length, keyword-present?
6. Is the canonical tag pointing to the correct URL (not `customgpt.ai/` for integration pages)?
7. Are Open Graph and Twitter Card tags complete?

---

### CATEGORY 10 — Brand Differentiation Signals

These are the elements that make a CustomGPT page identifiably CustomGPT — not a generic AI SaaS page.

**The 5 non-negotiable brand claims:**
1. **Anti-hallucination** — "Verified #1 for anti-hallucination technology, beating OpenAI and Google. Every response cites its source directly." — sourced, specific, named competitors.
2. **Citation-based answers** — every AI response cites its source (video timestamp, document page, URL). The citation mechanism is shown in the UI mockup, not just described.
3. **No training on your data** — "CustomGPT.ai will never use your data to train any LLM or AI." — explicit, not buried.
4. **SOC 2 Type II + GDPR** — named certifications, linked to trust center (`https://customgpt.ai/security/`). Not emoji.
5. **Enterprise proof** — named customers: MIT, United Nations, BernCo, Dlubal Software, BQE Software, GEMA, Medtronic. If social proof exists, it must be from real named organizations — not anonymous "a major tech company" attribution.

**Checks:**
1. Is anti-hallucination addressed explicitly — not buried or omitted? Is it specific (names the benchmark or the competitor)?
2. Is the citation mechanism shown or described — not just implied by "accurate answers"?
3. Is the data training policy stated explicitly in body copy (not just in FAQ)?
4. Are SOC 2 Type II and GDPR certifications named — with a link to the trust center?
5. Are customer proof elements drawn from the real named customer base — not generic logos?
6. Is the GAI Insights "Top 7 emerging leader" award used where authority is being established?
7. Is the ICP addressed specifically? (CustomGPT serves: L&D teams with training video libraries, enterprise support teams, event organizers, government agencies, universities — not "any business" in generic terms.)
8. Are AI partner recognitions (OpenAI, Anthropic, Amazon, Meta, Microsoft, Cohere) shown in the trust/credibility section where appropriate?

---

## Step 3 — Score and summarize

After running all checks, produce:

### Brand Alignment Score

| Category | Pass | Warn | Fail |
|---|---|---|---|
| 1. Color Palette | | | |
| 2. Typography | | | |
| 3. Buttons & CTAs | | | |
| 4. Spacing & Layout | | | |
| 5. Navigation | | | |
| 6. Section Patterns | | | |
| 7. Copy Tone & Voice | | | |
| 8. Assets & CDN | | | |
| 9. Schema & SEO | | | |
| 10. Differentiation Signals | | | |
| **TOTAL** | | | |

**Overall verdict:** On-brand / Mostly on-brand with fixes needed / Significant brand misalignment

---

### P1 — Fix before publishing (any Fail)
List each Fail with: element or section, exact value/text found, what it should be, the specific fix required.

### P2 — Recommended improvements (any Warn)
List each Warn with: element, what to reconsider, suggested resolution.

### What's working well
Name 3–5 elements that are well-executed and on-brand. Good audits preserve what works — do not manufacture problems.

---

## Delivery format

**Save the full audit** to `[project-folder]/audits/brand-audit.md`. Do not output the full analysis in the conversation — summarize the score table and P1 list only.

**Present P1 and P2 fixes one at a time:**

---
**Fix #N** (Category: Color / Typography / Buttons / Layout / Nav / Sections / Copy / Assets / Schema / Differentiation)
[One sentence: what this fixes.]

**Current:** [exact value, class, or text]
**Fix:** [exact change required]

Approve, adjust, or deny?

---

Wait for response before presenting the next fix. **Immediately after the user responds**, append their decision to the audit file under a `## Decision Log` section. If the section doesn't exist yet, add it after the score table. Format:

| # | Category | Fix | Decision | Notes |
|---|---|---|---|---|
| N | [Category] | [Short title] | Approved / Adjusted / Denied | [User's exact words or "—"] |

Be specific. Cite exact class names, hex values, copy phrases, or CDN URLs for every finding.

Do not pad findings. If a category is clean, say so in one line and move on.

If the file references a live URL rather than a local path, note which assets cannot be visually verified from code alone and flag them as "verify on render."
