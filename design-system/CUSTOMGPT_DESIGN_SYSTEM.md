# CustomGPT Design System

**Token source of truth:** `customgpt-design-system/customgpt-tokens.css`
**Primary source page:** `membership-organizations.html`
**Secondary source page:** `index-paper-blue.html`
**Enforcement rule:** Any color, spacing value, font size, radius, shadow, or component not defined here requires operator approval before use. Approved additions go into `customgpt-tokens.css` and this document first.

---

## Design Decisions

**Shadow: always none.** Nothing on the site casts a shadow. No shadow tokens. Enforced by the global reset (`box-shadow: none !important`); the `!important` is required so the rule beats any shadow the WordPress parent theme injects.

**Radius: always none.** Square corners everywhere. No radius tokens. Enforced by the global reset (`border-radius: 0 !important`); the `!important` is required so the rule beats the parent theme's rounded-corner rules.

---

## 1. Base Page Setup

Every page must include these three things in the `<head>`:

```html
<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet" />
```

And this CSS reset block at the top of the page `<style>` tag (before any component CSS):

```css
/* === GLOBAL RESET === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; border-radius: 0 !important; box-shadow: none !important; }
html { scroll-behavior: smooth; }
body { font-family: var(--font); color: var(--color-text); background: var(--color-bg); line-height: 1.6; -webkit-font-smoothing: antialiased; }
a { text-decoration: none; color: inherit; }
img { display: block; max-width: 100%; height: auto; }
ul, ol { list-style: none; }
button { font-family: var(--font); cursor: pointer; border: none; background: transparent; color: inherit; padding: 0; }
/* WP theme override — must use !important to beat theme stylesheet loaded in <head> */
h1, h2, h3, h4, h5, h6 { margin: 0; padding: 0; font-family: 'Lora', Georgia, serif !important; }
p { margin: 0; padding: 0; }
```

> **Why `!important` on headings:** WordPress themes load their own `h1–h6 { font-family: Inter }` rule in `<head>`. Our `<style>` block is in `<body>` (via Gutenberg custom HTML block), so it loads after. The `!important` is required to win the cascade.

---

## 2. Typography

### Heading classes
All headings must use `.h1`, `.h2`, or `.h3`. Never create a custom heading class that sets only `font-size` — it will render at the wrong `line-height`.

```css
.h1 { font-family: 'Lora', Georgia, serif !important; font-size: clamp(38px, 5vw, 58px); font-weight: 700; line-height: 1.08; letter-spacing: -.02em; }
.h2 { font-family: 'Lora', Georgia, serif !important; font-size: clamp(28px, 3.5vw, 44px); font-weight: 700; line-height: 1.1; letter-spacing: -.015em; }
.h3 { font-family: 'Lora', Georgia, serif !important; font-size: clamp(17px, 2vw, 22px); font-weight: 600; line-height: 1.25; letter-spacing: -.01em; }
```

### Supporting type classes
```css
.eyebrow { font-family: var(--font); font-size: var(--text-ui); font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--color-primary); margin-bottom: var(--sp3); display: block; }
.eyebrow--light { color: var(--color-on-dark-accent); }   /* use ONLY on dark backgrounds */
.lead { font-family: var(--font); font-size: clamp(16px, 1.5vw, 20px); line-height: 1.65; color: var(--color-text-muted); }
.lead--light { color: var(--color-on-dark-muted); }   /* use ONLY on dark backgrounds */
.accent { color: var(--color-primary); font-style: italic; display: block; }
```

### 2.3 Approved typography roles

This is the closed set of valid size × weight × color × style combinations. Every text element on every page must map to one row. A new combination requires operator approval before use — add the row here first, then use it.

| Role | Class(es) | Family | Size | Weight | Color | Transform | Style |
|---|---|---|---|---|---|---|---|
| Page heading 1 | `.h1` | Lora | clamp(38–58px) | 700 | `--color-text` | none | normal |
| Page heading 2 | `.h2` | Lora | clamp(28–44px) | 700 | `--color-text` | none | normal |
| Section heading 3 | `.h3` | Lora | clamp(17–22px) | 600 | `--color-text` | none | normal |
| Eyebrow (light bg) | `.eyebrow` | Inter | `--text-ui` | 700 | `--color-primary` | uppercase | normal |
| Eyebrow (dark bg) | `.eyebrow--light` | Inter | `--text-ui` | 700 | `--color-on-dark-accent` | uppercase | normal |
| Lead / subheadline (light bg) | `.lead` | Inter | clamp(16–20px) | 400 | `--color-text-muted` | none | normal |
| Lead / subheadline (dark bg) | `.lead--light` | Inter | clamp(16–20px) | 400 | `--color-on-dark-muted` | none | normal |
| Block quote (full-width) | `.tm-wrap__text`, `.cs-hero__quote` | Lora | clamp(17–21px) | 400 | `--color-text` | none | **italic** |
| Strip card quote | `.tm-card__quote` | Lora | `--text-md` | 400 | `--color-text` | none | **italic** |
| Display price number | `.plan__price` | Inter | clamp(32–42px) | 900 | `--color-text` | none | normal |
| Display stat value | `.stat__val` | Lora | clamp(36–52px) | 700 | `--color-primary` | none | normal |
| Price unit (/mo) | `.plan__price-unit` | Inter | `--text-lg` | 500 | `--color-text-muted` | none | normal |
| Secondary price (add-ons) | `.addon__price` | Inter | `--text-xl` | 800 | `--color-primary` | none | normal |
| Secondary price unit | `.addon__price-unit` | Inter | `--text-sm` | 500 | `--color-text-muted` | none | normal |
| Card / section label (uppercase) | `.plan__name` | Inter | `--text-base` | 700 | `--color-text-muted` | **uppercase** | normal |
| Card title / addon name | `.addon__name`, `.vp__title` | Inter | `--text-base` | 700 | `--color-text` | none | normal |
| Feature item | `.plan__feature` | Inter | `--text-base` | 400 | `--color-text` | none | normal |
| Card body / description | `.plan__desc`, `.vp__desc`, `.uc__desc` | Inter | `--text-base` | 400 | `--color-text-muted` | none | normal |
| UI / billing note | `.plan__billing`, `.tm-wrap__role` | Inter | `--text-ui` | 400 | `--color-text-muted` | none | normal |
| Save / accent nudge | `.pricing-save-nudge` | Inter | `--text-sm` | 600 | `--color-primary` | none | normal |
| FAQ / accordion trigger | `.faq-q` | Inter | `--text-body` | 600 | `--color-text` | none | normal |
| Microcopy (light bg) | `.plan__friction`, `.addon__period` | Inter | `--text-xs` | 400 | `--color-text-muted` | none | normal |

**Rules:**
- Italic is only valid for block quotes / testimonials (Lora family only).
- Uppercase is only valid for eyebrows and plan/card tier labels.
- Weight 900 is only valid for the plan price display number.
- Weight 800 is only valid for secondary price (add-on) numbers.
- Any new combination of these axes requires operator approval and a new row above.

---

## 3. Layout

```css
.container  { max-width: var(--max-w); margin: 0 auto; padding: 0 24px; }
.section    { padding: var(--section-y) 0; }
.section--soft { background: var(--color-bg-neutral); }
.text-center { text-align: center; }
.border-t   { border-top: 1.5px solid var(--color-border); }
.border-b   { border-bottom: 1.5px solid var(--color-border); }
```

Section border rule: use `border-bottom` only. Never add `border-top` to a section that immediately follows another bordered section — it creates a doubled 3px line.

### Section header (`.sec-hd`)
```css
.sec-hd { max-width: 680px; margin: 0 auto 52px; text-align: center; }
.sec-hd .eyebrow { margin-bottom: 10px; }
.sec-hd h2 { margin-bottom: 14px; }
```

HTML pattern:
```html
<div class="sec-hd text-center">
  <span class="eyebrow">Section label</span>
  <h2 class="h2">Section heading</h2>
  <p class="lead">Supporting description.</p>
</div>
```

---

## 4. Buttons — Primary + Secondary CTA System

**The rule:** Every CTA is either **primary** (filled) or **secondary** (ghost/outlined). In any two-CTA group there is exactly one primary and one secondary. The secondary is **always** ghost styling — *regardless of whether it is itself a conversion action* (e.g. "Book a demo", "Talk to sales", "Try free for 7 days" on a non-featured pricing card are all secondary → ghost). Ghost variant is chosen by background, not by action type.

| Variant | Role | Use | Arrow |
|---|---|---|---|
| `btn--hero` | Primary CTA | Hero + bottom CTA positions | Never |
| `btn--primary` | Primary CTA | Inline / mid-page / featured pricing card | Never |
| `btn--ghost` | **Secondary CTA — light backgrounds** | The secondary action in a pair on a light bg (dark outline, indigo hover) | Never |
| `btn--ghost-light` | **Secondary CTA — dark backgrounds** | The secondary action in a pair on a dark bg (white outline) | Never |

- **No button carries an arrow.** Arrows belong only to `.text-link` (inline discovery links that are not button-shaped, e.g. "See full pricing details").
- **Consistent sizing.** A primary button is the same size whether it stands alone or sits in a button group. A lone primary is never larger than a paired one.
- Ghost (light bg) styling per tokens: transparent fill, `#111827` text, `1.5px solid var(--btn-ghost-border)` (`#b8b2a8` warm tan) border. Hover: `var(--btn-ghost-bg-hover)` (`#f0ede6` neutral fill), text stays `#111827`, border-color → `var(--btn-ghost-border-hover)` (`#111827`), `translateY(-1px)`. Never an indigo hover.
- Pricing pattern: the featured ("Most Popular") plan uses the primary fill (`btn--primary`); all other plan CTAs are ghost secondaries — even when the action is "Try free for 7 days".

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 12px 24px; font-family: var(--font); font-size: var(--text-md);
  font-weight: 600; white-space: nowrap; text-decoration: none; cursor: pointer; border: none;
  transition: background var(--trans-base), color var(--trans-base), border-color var(--trans-base), transform var(--trans-fast);
}
.btn .arr { display: inline-flex; flex-shrink: 0; transition: transform var(--trans-base); }
.btn:hover .arr { transform: translateX(4px); }

.btn--hero    { background: var(--color-primary); color: #fff; border: 1.5px solid #111827; padding: 12px 24px; font-size: var(--text-md); font-weight: 700; }
.btn--hero:hover { background: var(--color-primary-hover); color: #fff; transform: translateY(-1px); }

.btn--primary { background: var(--color-primary); color: #fff; border: 1.5px solid #111827; }
.btn--primary:hover { background: var(--color-primary-hover); color: #fff; transform: translateY(-1px); }

.btn--ghost   { background: transparent; color: var(--btn-ghost-text); border: 1.5px solid var(--btn-ghost-border); }
.btn--ghost:hover { background: var(--btn-ghost-bg-hover); color: var(--btn-ghost-text); border-color: var(--btn-ghost-border-hover); transform: translateY(-1px); }

.btn--ghost-light { background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,.4); }
.btn--ghost-light:hover { border-color: rgba(255,255,255,.7); color: rgba(255,255,255,.85); transform: translateY(-1px); }

.btn-group { display: flex; align-items: center; gap: var(--sp3); flex-wrap: wrap; }
.btn-group--center { justify-content: center; }
```

Arrow SVG (inline, used **only** in `.text-link` discovery links — never on buttons):
```html
<span class="arr" aria-hidden="true">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
</span>
```

Text links (inline discovery, not button-shaped):
```css
.text-link { display: inline-flex; align-items: center; gap: 4px; font-family: var(--font); font-size: var(--text-base); color: var(--color-text-muted); font-weight: 600; transition: color var(--trans-base); }
.text-link .arr { display: inline-flex; flex-shrink: 0; transition: transform var(--trans-base); }
.text-link:hover { color: var(--color-primary); }
.text-link:hover .arr { transform: translateX(4px); }
```

---

## 5. Icons

- Library: **Lucide** (`lucide.dev`) — inline SVG only. No CDN, no icon fonts, no emoji.
- SVG size: `width="22" height="22"` on the `<svg>` element. viewBox `0 0 24 24` — do not change.
- Container: `width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;`
- Color rotation within any section (no two adjacent icons share the same tint):
  1. **Indigo** — container: `background: rgba(115,103,240,.12)` · stroke: `#7367f0`
  2. **Pink** — container: `background: rgba(238,85,255,.12)` · stroke: `#EE55FF`
  3. **Lavender** — container: `background: rgba(167,139,250,.18)` · stroke: `#a78bfa`

---

## 6. Component Blocks

### 6.1 Navigation

```css
.nav { position: sticky; top: 0; z-index: var(--z-nav); background: var(--color-bg); border-bottom: 1.5px solid #111827; }
.nav__inner { display: flex; align-items: center; justify-content: space-between; height: 64px; gap: 24px; }
.nav__logo { display: flex; align-items: center; gap: 8px; font-family: var(--font); font-size: 17px; font-weight: 800; color: var(--color-text); }
.nav__logo img { height: 28px; width: auto; }
.nav__links { display: flex; align-items: center; gap: 4px; }
.nav__link { padding: 8px 14px; font-family: var(--font); font-size: var(--text-base); font-weight: 500; color: var(--color-text-muted); transition: color var(--trans-fast); }
.nav__link:hover { color: var(--color-text); }
.nav__actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
@media (max-width: 768px) { .nav__links { display: none; } }
```

```html
<nav class="nav">
  <div class="container">
    <div class="nav__inner">
      <a href="https://customgpt.ai/" class="nav__logo">
        <img src="https://customgpt.ai/wp-content/uploads/2023/11/CustomGPT-logo.svg" alt="CustomGPT.ai" height="28" width="auto">
      </a>
      <div class="nav__links">
        <a href="https://customgpt.ai/features/" class="nav__link">Features</a>
        <a href="https://customgpt.ai/customers/" class="nav__link">Customers</a>
        <a href="https://customgpt.ai/pricing/" class="nav__link">Pricing</a>
      </div>
      <div class="nav__actions">
        <a href="https://app.customgpt.ai/" class="btn btn--ghost">Sign in</a>
        <a href="https://app.customgpt.ai/register" class="btn btn--hero">Start free trial</a>
      </div>
    </div>
  </div>
</nav>
```

---

### 6.2 Hero — Centered CTA

```css
.hero { background: url('https://customgpt.ai/wp-content/uploads/2026/04/hero-background-image.webp') center top / cover no-repeat; padding: 112px 0 80px; border-bottom: 1.5px solid var(--color-border); }
.hero__content { display: flex; flex-direction: column; align-items: center; text-align: center; max-width: 860px; margin: 0 auto; }
.hero__pill { display: inline-block; font-family: var(--font); font-size: var(--text-sm); font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--color-primary); background: rgba(115,103,240,.1); border: 1px solid rgba(115,103,240,.2); padding: 5px 16px; margin-bottom: 20px; }
.hero__headline { color: var(--color-text); margin-bottom: 20px; }
.hero__desc { font-family: var(--font); font-size: var(--text-xl); color: var(--color-text-muted); line-height: 1.65; margin-bottom: 32px; max-width: 700px; }
.hero__friction { font-family: var(--font); font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 10px; }
```

```html
<section class="hero">
  <div class="container">
    <div class="hero__content">
      <div class="hero__pill">Page-specific label</div>
      <h1 class="h1 hero__headline">
        Primary headline here
      </h1>
      <p class="hero__desc">
        Supporting description. One or two sentences.
      </p>
      <div class="btn-group btn-group--center">
        <a href="[CTA URL]" class="btn btn--hero">Book a consultation</a>
      </div>
      <p class="hero__friction">15-minute conversation · No commitment</p>
    </div>
  </div>
  <!-- Proof bar sits inside the hero on the paper background -->
  <div class="hero__proof" aria-label="Trusted by [audience]">
    <!-- see 6.3 Proof Bar -->
  </div>
</section>
```

---

### 6.3 Proof Bar (infinite logo scroller)

Copy this CSS verbatim. Do not recreate from memory — wrong values will break the animation.

```css
.hero__proof { padding: 40px 0 0; width: 100%; }
.proof-bar { background: transparent; padding: 0; overflow: hidden; }
.proof-bar__label { text-align: center; font-size: var(--text-ui); font-weight: 600; color: var(--color-text-muted); margin-bottom: 28px; }
.proof-bar__viewport {
  -webkit-mask-image: linear-gradient(to right, transparent 0px, #000 130px, #000 calc(100% - 130px), transparent 100%);
  mask-image: linear-gradient(to right, transparent 0px, #000 130px, #000 calc(100% - 130px), transparent 100%);
  overflow: hidden; user-select: none; -webkit-user-select: none;
}
.proof-bar__track { display: flex; width: max-content; animation: logoScroll 48s linear infinite; will-change: transform; }
.proof-bar__track:hover { animation-play-state: paused; }
.proof-bar__set { display: flex; align-items: center; gap: 1px; padding: 0 1px; flex-shrink: 0; }
.proof-bar__logo { display: flex; align-items: center; justify-content: center; height: 80px; flex-shrink: 0; filter: grayscale(1); opacity: 0.55; transition: opacity 0.2s ease, filter 0.2s ease; }
.proof-bar__logo:hover { opacity: 1; filter: grayscale(0); }
.proof-bar__logo img { height: 100%; width: auto; max-width: 320px; object-fit: contain; display: block; -webkit-user-drag: none; pointer-events: none; }
.proof-bar__logo a { display: flex; align-items: center; justify-content: center; height: 100%; text-decoration: none; pointer-events: auto; }
@keyframes logoScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .proof-bar__track { animation: none; } }
```

```html
<div class="hero__proof" aria-label="Trusted by [audience] worldwide">
  <p class="proof-bar__label">Trusted by [audience] worldwide</p>
  <div class="proof-bar__viewport">
    <div class="proof-bar__track" role="list" aria-label="Customer logos">
      <!-- REAL SET (with alt text and aria) -->
      <div class="proof-bar__set">
        <div class="proof-bar__logo" role="listitem">
          <img src="[logo-url]" alt="[Company name]" height="36" draggable="false" loading="eager">
        </div>
        <!-- repeat for each logo -->
      </div>
      <!-- DUPLICATE SET (aria-hidden, no alt text, for infinite scroll) -->
      <div class="proof-bar__set" aria-hidden="true">
        <div class="proof-bar__logo"><img src="[logo-url]" alt="" height="36" draggable="false" loading="eager"></div>
        <!-- repeat matching logos -->
      </div>
    </div>
  </div>
</div>
```

Rules: all images `loading="eager"` (never lazy — causes pop-in on loop). Add `draggable="false"` on all `<img>`. No `user-select` on the viewport (already in CSS above).

---

### 6.4 Stats Strip

```css
.stats-strip { border-bottom: 1.5px solid var(--color-border); padding: 40px 0; }
.stats-strip__inner { display: flex; align-items: stretch; justify-content: center; }
.stat { text-align: center; padding: 0 52px; border-right: 1px solid var(--color-border); }
.stat:last-child { border-right: none; }
.stat__val { font-family: var(--font-serif); font-size: clamp(36px, 4vw, 52px); font-weight: 700; color: var(--color-primary); line-height: 1; display: flex; flex-direction: column; align-items: center; gap: 2px; }
.stat__lbl { font-family: var(--font); font-size: var(--text-base); color: var(--color-text-muted); margin-top: 6px; max-width: 140px; margin-left: auto; margin-right: auto; }
@media (max-width: 640px) { .stats-strip__inner { flex-wrap: wrap; gap: 32px; } .stat { border-right: none; padding: 0 24px; width: 50%; } }
```

```html
<div class="stats-strip">
  <div class="container">
    <span class="eyebrow" style="display:block;text-align:center;margin-bottom:32px;">Across our [audience] customers</span>
    <div class="stats-strip__inner">
      <div class="stat">
        <div class="stat__val">88%</div>
        <div class="stat__lbl">member questions automated</div>
      </div>
      <div class="stat">
        <div class="stat__val">95%+</div>
        <div class="stat__lbl">member satisfaction</div>
      </div>
      <div class="stat">
        <div class="stat__val">2</div>
        <div class="stat__lbl">weeks to launch</div>
      </div>
    </div>
  </div>
</div>
```

---

### 6.5 Value Props Grid (3-column card grid)

```css
.vp-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; max-width: 900px; margin: 0 auto; padding-top: 4px; overflow: visible; }
.vp { padding: 30px 24px; background: var(--color-bg-neutral); border: 1.5px solid var(--color-border); display: flex; flex-direction: column; transition: transform var(--trans-fast); }
.vp:hover { transform: translateY(-2px); }
.vp__icon { width: 44px; height: 44px; background: rgba(115,103,240,.1); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; flex-shrink: 0; }
.vp__icon svg { width: 22px; height: 22px; }
.vp__title { font-family: var(--font-serif); font-size: 16px; font-weight: 600; color: var(--color-text); margin-bottom: 8px; line-height: 1.3; }
.vp__desc { font-family: var(--font); font-size: var(--text-base); color: var(--color-text-muted); line-height: 1.55; }
@media (max-width: 768px) { .vp-grid { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 480px) { .vp-grid { grid-template-columns: 1fr; } }
```

Card hover: `translateY(-2px)` only. Never change background on hover.

Icon container colors rotate: indigo → pink → lavender (see § 5 Icons).

```html
<section class="section border-b">
  <div class="container">
    <div class="sec-hd text-center">
      <span class="eyebrow">Section label</span>
      <h2 class="h2">Section heading</h2>
      <p class="lead">Supporting description.</p>
    </div>
    <div class="vp-grid">
      <div class="vp">
        <div class="vp__icon" style="background:rgba(115,103,240,.12)">
          <!-- Lucide SVG, stroke="#7367f0" -->
        </div>
        <div class="vp__title">Card title</div>
        <p class="vp__desc">Card description.</p>
      </div>
      <!-- repeat × N, rotating icon tints: indigo → pink → lavender -->
    </div>
  </div>
</section>
```

---

### 6.6 Use Cases Grid (numbered card grid)

```css
.uc-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
.uc { padding: 32px 28px; background: var(--color-bg); border: 1.5px solid var(--color-border); display: flex; flex-direction: column; transition: transform var(--trans-fast); }
.uc:hover { transform: translateY(-2px); }
.uc__num { font-family: var(--font); font-size: var(--text-ui); font-weight: 700; color: var(--color-primary); letter-spacing: .06em; margin-bottom: 12px; }
.uc__title { font-family: var(--font-serif); font-size: 18px; font-weight: 600; color: var(--color-text); margin-bottom: 10px; line-height: 1.3; }
.uc__desc { font-family: var(--font); font-size: var(--text-base); color: var(--color-text-muted); line-height: 1.6; }
@media (max-width: 768px) { .uc-grid { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 480px) { .uc-grid { grid-template-columns: 1fr; } }
```

```html
<section class="section section--soft border-b">
  <div class="container">
    <div class="sec-hd text-center">...</div>
    <div class="uc-grid">
      <div class="uc">
        <div class="uc__num">01</div>
        <div class="uc__title">Use case title</div>
        <p class="uc__desc">Description.</p>
      </div>
      <!-- repeat for each card, incrementing uc__num -->
    </div>
  </div>
</section>
```

---

### 6.7 How It Works (3-step grid)

```css
.steps-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
.step { padding: 36px 32px; background: var(--color-bg-neutral); border: 1.5px solid var(--color-border); transition: transform var(--trans-fast); display: flex; flex-direction: column; }
.step:hover { transform: translateY(-3px); }
.step__num { font-family: var(--font-serif); font-size: 52px; font-weight: 700; color: var(--color-primary); opacity: .18; line-height: 1; margin-bottom: 8px; }
.step__title { font-family: var(--font-serif); font-size: 22px; font-weight: 600; color: var(--color-text); margin-bottom: 12px; }
.step__desc { font-family: var(--font); font-size: var(--text-base); color: var(--color-text-muted); line-height: 1.6; margin-bottom: 18px; }
.step__img { width: 100%; margin-top: auto; padding-top: 20px; display: block; }
@media (max-width: 768px) { .steps-grid { grid-template-columns: 1fr; } }
```

```html
<section class="section border-b">
  <div class="container">
    <div class="sec-hd text-center">...</div>
    <div class="steps-grid">
      <div class="step">
        <div class="step__num">01</div>
        <div class="step__title">Step title</div>
        <p class="step__desc">Step description.</p>
        <img src="[step-image]" alt="[alt text]" class="step__img" loading="eager" draggable="false">
      </div>
      <!-- × 3 steps -->
    </div>
    <!-- Optional secondary CTA below steps -->
    <div class="text-center" style="margin-top:40px;">
      <a href="[URL]" class="btn btn--primary">Book a consultation</a>
    </div>
  </div>
</section>
```

---

### 6.8 Testimonial Block (`.tm-wrap`)

```css
.tm-wrap { max-width: 820px; margin: 0 auto; border: 1.5px solid var(--color-border); padding: 48px 56px; position: relative; background: var(--color-bg); }
.tm-wrap__text { font-family: 'Lora', Georgia, serif !important; font-size: clamp(17px, 2vw, 21px); line-height: 1.7; color: var(--color-text); margin-bottom: 28px; font-style: italic; position: relative; }
.tm-wrap__attr { display: flex; align-items: center; gap: 14px; }
.tm-wrap__av { width: 42px; height: 42px; border: 1.5px solid var(--color-border); background: var(--color-bg-neutral); display: flex; align-items: center; justify-content: center; font-family: var(--font); font-size: var(--text-ui); font-weight: 700; color: var(--color-primary); flex-shrink: 0; }
.tm-wrap__name { font-family: var(--font); font-size: var(--text-base); font-weight: 700; color: var(--color-text); }
.tm-wrap__role { font-family: var(--font); font-size: var(--text-ui); color: var(--color-text-muted); }
@media (max-width: 640px) { .tm-wrap { padding: 32px 24px; } }
```

```html
<section class="section border-b">
  <div class="container">
    <div class="tm-wrap">
      <p class="tm-wrap__text">
        "Quote text here."
      </p>
      <div class="tm-wrap__attr">
        <div class="tm-wrap__av">
          <!-- Avatar image OR initials fallback -->
          <img src="[avatar-url]" alt="[Name]" style="width:42px;height:42px;object-fit:cover;" draggable="false">
        </div>
        <div>
          <div class="tm-wrap__name">Full Name</div>
          <div class="tm-wrap__role">Title, Company</div>
        </div>
      </div>
      <div style="margin-top:24px;">
        <a href="[case-study-url]" class="btn btn--ghost">View case study<span class="arr" aria-hidden="true"><!-- arrow SVG --></span></a>
      </div>
    </div>
  </div>
</section>
```

No decorative quotation mark characters. No `"` or `"` visual decoration.

---

### 6.9 Case Study Hero (`.cs-hero`)

```css
.cs-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; padding: 48px; background: var(--color-bg); border: 1.5px solid var(--color-border); align-items: center; }
.cs-hero__logo { height: 80px; width: auto; margin-bottom: 28px; display: block; }
.cs-hero__quote { font-family: 'Lora', Georgia, serif !important; font-size: clamp(17px, 2vw, 21px); font-weight: 400; font-style: italic; line-height: 1.7; color: var(--color-text); margin-bottom: 28px; }
.cs-hero__attr { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
.cs-hero__avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
.cs-hero__name { font-size: var(--text-base); font-weight: 700; color: var(--color-text); }
.cs-hero__role { font-size: var(--text-sm); color: var(--color-text-muted); }
.cs-hero__stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
.cs-hero__stat { padding: 22px 18px; background: var(--color-bg-neutral); border: 1.5px solid var(--color-border); transition: transform var(--trans-fast); }
.cs-hero__stat:hover { transform: translateY(-2px); }
.cs-hero__stat-val { font-family: var(--font-serif); font-size: 26px; font-weight: 700; color: var(--color-primary); line-height: 1.1; letter-spacing: -.02em; margin-bottom: 6px; }
.cs-hero__stat-lbl { font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.4; }
@media (max-width: 768px) { .cs-hero { grid-template-columns: 1fr; gap: 32px; padding: 32px 24px; } }
```

---

### 6.10 FAQ Accordion

```css
.faq { border: 1.5px solid var(--color-border); max-width: 800px; margin: 0 auto; }
.faq-item { border-bottom: 1px solid var(--color-border); }
.faq-item:last-child { border-bottom: none; }
.faq-q { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 20px 28px; cursor: pointer; font-family: var(--font); font-size: var(--text-body); font-weight: 600; color: var(--color-text); transition: background var(--trans-fast); }
.faq-q:hover { background: var(--color-bg-neutral); }
.faq-chevron { flex-shrink: 0; transition: transform var(--trans-base); }
.faq-item.open .faq-chevron { transform: rotate(180deg); }
.faq-a { display: none; padding: 0 28px 20px; font-family: var(--font); font-size: var(--text-base); color: var(--color-text-muted); line-height: 1.7; }
.faq-item.open .faq-a { display: block; }
```

```html
<section class="section section--soft border-b">
  <div class="container">
    <div class="sec-hd text-center">
      <span class="eyebrow">FAQs</span>
      <h2 class="h2">Heading</h2>
    </div>
    <div class="faq">
      <div class="faq-item open">
        <div class="faq-q" onclick="this.parentElement.classList.toggle('open')">
          <span>Question text?</span>
          <span class="faq-chevron">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </div>
        <div class="faq-a">Answer text.</div>
      </div>
      <!-- repeat faq-item, only first one gets class="open" by default -->
    </div>
  </div>
</section>
```

---

### 6.11 Security Section (dark background)

```css
.security { background: var(--color-bg-dark); background-image: url('https://customgpt.ai/wp-content/uploads/2026/04/dark-blue-background-paper.webp'); background-size: cover; background-position: center; color: var(--color-on-dark); padding: var(--section-y) 0; }
.security__header { text-align: center; max-width: 760px; margin: 0 auto 48px; }
.security__header .h2 { margin-bottom: 16px; color: var(--color-on-dark) !important; }
.security .eyebrow--light { color: var(--color-on-dark-accent) !important; }
.security .lead--light { color: var(--color-on-dark-muted) !important; }
.security__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; margin-bottom: 48px; }
.security-card { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08); padding: 32px; display: flex; gap: 16px; align-items: flex-start; transition: transform var(--trans-fast); }
.security-card:hover { transform: translateY(-3px); }
.security-card__icon { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
/* Icon tints on dark bg */
.security-card__icon--indigo { background: rgba(115,103,240,.18); }
.security-card__icon--pink   { background: rgba(238,85,255,.12); }
.security-card__icon--violet { background: rgba(167,139,250,.18); }
.security-card__title { font-size: var(--text-md); font-weight: 700; color: var(--color-on-dark) !important; margin-bottom: 8px; }
.security-card__desc  { font-size: var(--text-base); color: var(--color-on-dark-muted) !important; line-height: 1.65; }
.security__footer { display: flex; flex-direction: column; align-items: center; gap: 32px; margin-top: 48px; }
.security__badges-row { display: flex; align-items: center; gap: 48px; flex-wrap: wrap; justify-content: center; }
.security__badge-img { height: 120px; width: auto; filter: brightness(0) invert(1); opacity: 0.8; }
@media (max-width: 768px) { .security__grid { grid-template-columns: 1fr; } }
```

> **WP theme note:** `color: var(--color-on-dark) !important` on `.security__header .h2` is required — the WP theme injects a stylesheet that overrides heading color with `color: inherit` from the dark section's `color: var(--color-on-dark)`, but some themes override this with `!important` themselves.

---

### 6.12 Final CTA (dark background)

```css
.final-cta { background: var(--color-bg-dark); background-image: url('https://customgpt.ai/wp-content/uploads/2026/04/pink-and-dark-blue-background.webp'); background-size: cover; background-position: center; color: var(--color-on-dark); padding: 96px 0; text-align: center; position: relative; overflow: hidden; }
.final-cta__overlay { position: absolute; inset: 0; background: linear-gradient(rgba(10,10,30,.35), rgba(10,10,30,.45)); }
.final-cta__content { position: relative; z-index: 1; }
.final-cta .eyebrow { color: var(--color-on-dark-accent); margin-bottom: 12px; }
.final-cta h2 { color: var(--color-on-dark); margin-bottom: 16px; }
.final-cta .lead { margin-bottom: 36px; }
.final-cta__friction { font-size: var(--text-xs); color: rgba(255,255,255,.4); margin-top: 14px; }
.trust-badges { display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap; margin-top: 24px; }
.trust-badge { font-size: var(--text-xs); font-weight: 600; color: rgba(255,255,255,.45); display: flex; align-items: center; gap: 5px; }
```

```html
<section class="final-cta">
  <div class="final-cta__overlay" aria-hidden="true"></div>
  <div class="container">
    <div class="final-cta__content">
      <span class="eyebrow eyebrow--light">Ready to get started?</span>
      <h2 class="h2">Section heading</h2>
      <p class="lead lead--light">Supporting copy.</p>
      <div class="btn-group btn-group--center">
        <a href="[CTA URL]" class="btn btn--hero">Book a consultation</a>
      </div>
      <p class="final-cta__friction">15-minute conversation · No commitment</p>
      <div class="trust-badges">
        <span class="trust-badge"><!-- shield SVG --> SOC 2 Type II</span>
        <span class="trust-badge"><!-- shield SVG --> GDPR Compliant</span>
        <span class="trust-badge"><!-- shield SVG --> AES-256 Encryption</span>
      </div>
    </div>
  </div>
</section>
```

---

### 6.13 Footer

```css
.footer { border-top: 1.5px solid var(--color-border); padding: 28px 0; }
.footer__inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
.footer__logo { display: flex; align-items: center; gap: 8px; font-family: var(--font); font-weight: 800; font-size: 15px; color: var(--color-text); }
.footer__logo img { height: 22px; width: auto; }
.footer__links { display: flex; gap: 24px; }
.footer__link { font-size: var(--text-base); color: var(--color-text-muted); transition: color var(--trans-fast); }
.footer__link:hover { color: var(--color-primary); }
.footer__copy { font-size: var(--text-ui); color: var(--color-text-muted); }
```

```html
<footer class="footer">
  <div class="container">
    <div class="footer__inner">
      <a href="https://customgpt.ai/" class="footer__logo">
        <img src="https://customgpt.ai/wp-content/uploads/2023/11/CustomGPT-logo.svg" alt="CustomGPT.ai" height="22" width="auto">
        CustomGPT.ai
      </a>
      <div class="footer__links">
        <a href="https://customgpt.ai/privacy-policy/" class="footer__link">Privacy</a>
        <a href="https://customgpt.ai/terms-of-service/" class="footer__link">Terms</a>
        <a href="https://customgpt.ai/security/" class="footer__link">Security</a>
      </div>
      <div class="footer__copy">© 2026 CustomGPT Inc.</div>
    </div>
  </div>
</footer>
```

---

## 7. Standard Page Skeleton

Section order for industry/solution landing pages. Mark optional sections with context.

```
1.  Nav
2.  Hero (with proof bar inside)            ← always
3.  Stats strip                             ← when key metrics are available
4.  [Chat embed or product demo]            ← optional, LP-specific
5.  Trust banner (awards + partner logos)  ← always
6.  Value props grid                        ← always
7.  Use cases grid                          ← always
8.  [Featured resource / download CTA]     ← optional (blueprint, guide, etc.)
9.  Customer results (cs-hero)              ← always when case study exists
10. How it works (steps grid)               ← always
11. Security (dark section)                 ← always
12. Testimonial (tm-wrap)                   ← when additional quote available
13. FAQ accordion                           ← always
14. Final CTA (dark section)               ← always
15. Footer
```

---

## 8. WordPress Publishing Guide

### Page setup
- **Template:** `elementor_canvas` — provides no theme header/footer; the page supplies its own nav and footer.
- **Gutenberg block:** Wrap the entire page HTML in `<!-- wp:html -->` ... `<!-- /wp:html -->`.
- **Page ID:** Find per-page IDs by running:
  ```powershell
  $r = Invoke-RestMethod -Uri "https://customgpt.ai/wp-json/wp/v2/pages?slug=[slug]&_fields=id,slug,title" -Headers $authHeaders
  ```

### Auth
Username: `Luke` · App password: stored in `reference_wordpress_credentials.md` in memory.

```powershell
$auth = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes("Luke:[app-password]"))
$authHeaders = @{ Authorization = "Basic $auth" }
```

### Workflow — always fetch → modify → push. Never push from local file.

```powershell
# 1. FETCH
$page = Invoke-RestMethod -Uri "https://customgpt.ai/wp-json/wp/v2/pages/[ID]?context=edit&_fields=content" -Headers $authHeaders
$content = $page.content.raw

# 2. MODIFY (string replacement only — no regex on strings containing &)
$content = $content.Replace('[old string]', '[new string]')

# 3. PUSH
$obj = @{ content = $content; status = "publish" }
$bodyBytes = [System.Text.Encoding]::UTF8.GetBytes(($obj | ConvertTo-Json -Depth 3))
$postHeaders = @{ Authorization = "Basic $auth"; "Content-Type" = "application/json" }
$r = Invoke-RestMethod -Method Post -Uri "https://customgpt.ai/wp-json/wp/v2/pages/[ID]" -Headers $postHeaders -Body $bodyBytes
Write-Host "Status: $($r.status) | Modified: $($r.modified)"
```

> **Critical:** Variables don't persist across separate PowerShell tool calls. Always fetch and modify in the same script block. Use `.Replace()` — never `-replace` regex — on strings containing `&` (e.g. Calendly URLs).

### SEO/meta via RankMath
```powershell
$meta = @{ post_id = [ID]; meta = @{ rank_math_description = "[desc]"; rank_math_title = "[title]" } }
$metaBytes = [System.Text.Encoding]::UTF8.GetBytes(($meta | ConvertTo-Json -Depth 5))
$r = Invoke-RestMethod -Method Post -Uri "https://customgpt.ai/wp-json/rankmath/v1/updateMeta" -Headers $postHeaders -Body $metaBytes
```

### Caching
Clear WP Rocket cache after any meta/OG image change or the update won't appear in social previews.

---

## 9. Approving New Design Elements

If a page needs anything not in this document:

1. Name the element and describe what it does.
2. Check whether an existing token or component can serve the purpose.
3. If not, ask the operator (Luke) for approval before using it.
4. Once approved, add the token to `customgpt-tokens.css` and the component block here first.
5. Then use it in the page.

This applies to: new CSS classes, new color values, new spacing values not on the scale, new component patterns, any hex value or hard-coded px that isn't a token reference.
