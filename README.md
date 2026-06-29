# CustomGPT.ai Landing Page System

Skills and workflow for building, auditing, and publishing landing pages on customgpt.ai. All skills run inside Claude Code.

---

## Workflow

Every page follows this sequence in order. Do not skip steps or run them out of order.

```
Step 1   /customgpt-page-strategy     Strategic brief — always runs first
Step 2   /customgpt-page-builder      HTML build — 7 page types, full design system
Step 3   /customgpt-brand-audit       Brand and design compliance
Step 4   /brand-messaging-audit       Claims accuracy, positioning, legal risk
Step 5   /seo-aeo-audit               Technical SEO and AEO citation optimization
Step 6   /cro-audit                   Conversion optimization
Step 7   /link-qa                     Validate all links before launch
Step 8   /analytics-audit             Verify tracking implementation
```

A page is not launch-ready until all six audits are cleared.

---

## Skills

### Step 1 — `/customgpt-page-strategy`

Intakes source material and produces a strategic brief before any building begins. Handles three entry modes:

- **Copywriter copy** — extracts strategic signals from LP-format copy
- **Raw material** — processes messaging docs, PRDs, product notes
- **Existing page** — maps current structure for a revamp

Outputs: primary buyer, funnel stage, primary CTA, keyword intent, proof available, section structure recommendation, and a pre-filled brief ready for the builder.

Run this first. The builder assumes a brief exists.

---

### Step 2 — `/customgpt-page-builder`

Builds the complete HTML file. Supports 7 page types with locked canonical section templates:

| Template | Page type | Funnel stage |
|---|---|---|
| A | Integration page | Mid-funnel |
| B | Feature page | Mid-funnel |
| C | Use case / solution page | Top-to-mid |
| D | Industry page | Top-funnel |
| E | Comparison page | Bottom-funnel |
| F | Campaign / paid LP | Bottom-funnel |
| G | Team / About page | — |

The builder includes the full CustomGPT design system (CSS variables, typography scale, button hierarchy, 14 approved widgets) and covers all phases: page type identification, brief gathering, structure approval, copy approval section-by-section, HTML generation, and WordPress publishing via REST API.

**Design system is enforced inside this skill.** No raw hex outside `:root`. No other fonts. No layout values outside the token set.

When downstream WordPress/theme work introduces a reusable design rule, token, or standards-aligned behavior, promote that rule back into this standards repo in the same work cycle. Downstream implementations should periodically refresh from this repo with a fast-forward pull before standards-aligned work and after long sessions, then mirror the latest source rule back into their local bridge files.

---

### Step 3 — `/customgpt-brand-audit`

10-category audit: color palette, typography, buttons/CTAs, spacing/layout, navigation, section patterns, copy tone/voice, assets/CDN, schema/SEO signals, and brand differentiation signals.

Saves full analysis to `audits/brand-audit.md`. Presents P1 and P2 fixes one at a time for approve/adjust/deny.

---

### Step 4 — `/brand-messaging-audit`

Audits claims accuracy, positioning strength, legal risk, audience fit, and competitive differentiation. Flags unsupported claims, weak value props, and copy that could appear on any generic AI SaaS page unchanged.

---

### Step 5 — `/seo-aeo-audit`

Technical SEO (meta, schema, canonical, title/description) plus AEO optimization for LLM citation indexing. Checks FAQ schema verbatim match, heading structure, keyword placement, and structured data completeness.

---

### Step 6 — `/cro-audit`

Conversion rate audit covering CTA hierarchy, friction points, trust signals, headline-to-offer alignment, and conversion path clarity. Presents changes one at a time. Full analysis saved to `audits/cro-audit.md`.

---

### Step 7 — `/link-qa`

Validates every link on the page: internal links, external links, CTA destinations, CDN asset URLs, and schema URLs. Flags broken, redirected, or placeholder links before launch.

---

### Step 8 — `/analytics-audit`

Verifies tracking implementation: GA4 events, conversion tracking, UTM handling, and data layer integrity. Confirms all CTA clicks and form submissions are captured before launch.

---

## Design System

The canonical design system lives in [`design-system/`](design-system/). It is the single source of truth — every skill in this repo defers to it.

- **[`CUSTOMGPT_DESIGN_SYSTEM.md`](design-system/CUSTOMGPT_DESIGN_SYSTEM.md)** — full spec: tokens, typography, button system, component blocks, page skeleton, WordPress publishing
- **[`customgpt-tokens.css`](design-system/customgpt-tokens.css)** — token source of truth
- **[`STYLE_GUIDE.html`](design-system/STYLE_GUIDE.html)** / **[`CustomGPT-Style-Guide.pdf`](design-system/CustomGPT-Style-Guide.pdf)** — human-readable style guide for design audits
- **[`COMPONENT_INDEX.md`](design-system/COMPONENT_INDEX.md)** — component inventory
- **[`lint-tokens.js`](design-system/lint-tokens.js)** — token lint enforcer (no raw hex or bare px outside `:root`)

All brand values are enforced inside `/customgpt-page-builder`. Key rules:

| Element | Value |
|---|---|
| Headings | Lora (serif), weights 600–700 |
| Body / UI | Inter, weights 300–900 |
| Primary color | Indigo `#7367f0` (`--color-primary`); hover `#5a52d4` (`--color-primary-hover`) |
| Buttons | Primary = solid indigo fill; secondary = ghost/outline. Square corners, no shadow, 1.5px border, no arrows |
| Pink | Marketing accent only (`#EE55FF`) — never a button fill |
| Corners | Square everywhere — `border-radius: 0` (no radius tokens) |
| Shadows | None anywhere — `box-shadow: none` (no shadow tokens) |
| Page background | Warm off-white `#faf9f6` (never pure white) |
| Borders | Warm tan `#b8b2a8`, 1.5px |
| Container max-width | 1200px |
| Mobile breakpoint | 768px |
| Friction copy | `7-day free trial · Cancel anytime` — always adjacent to CTAs (never "No credit card") |

---

## WordPress Publishing

All pages are published via the WordPress REST API. The builder includes the full push script pattern in Phase 6. Required steps:

1. CSS scope wrapper — `cgpt-[slug]` class on body wrapper
2. Button reset — neutralizes Starto theme overrides
3. Gutenberg `<!-- wp:html {"align":"full"} -->` block wrapper
4. Page template set to `elementor_header_footer`
5. WP block margin fix

