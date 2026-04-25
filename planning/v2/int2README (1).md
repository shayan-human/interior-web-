# AURA STUDIO — Interior Design Website
## Agent Reference Guide — Glassmorphism Edition

---

## The Concept

**Aura Studio** is not a website. It's a window.

The entire experience is built around one unforgettable idea: **a living gradient mesh background** — slow-moving, breathing, luminous — that bleeds through every frosted glass panel on the page. The UI is almost invisible. It floats. It whispers.

This is **2025 glassmorphism** — not the cheap neon-rainbow version. Disciplined. Surgical. Every panel is `backdrop-filter: blur(24px)`, semi-transparent white, razor-thin border. The background does the heavy lifting emotionally. The UI stays out of the way.

**Mobile is the primary canvas.** Every layout decision starts at 390px and scales UP, not down. The glassmorphism effect must be silky on mobile — no performance shortcuts.

**The one thing users will remember:** The background is alive. The glass breathes. The content feels like it's hovering in mid-air.

---

## Brand Identity

| Property | Value |
|---|---|
| Studio Name | Aura Studio |
| Tagline | *"Design so considered, it disappears."* |
| Personality | Airy, modern, luminous, impossibly light |
| Vibe | Floating glass panels over a living painted sky |

---

## Color System (CSS Variables)

```css
:root {
  /* Animated mesh gradient stops */
  --mesh-1: #0ea5e9;   /* sky blue */
  --mesh-2: #8b5cf6;   /* violet */
  --mesh-3: #ec4899;   /* rose */
  --mesh-4: #14b8a6;   /* teal */
  --mesh-5: #f59e0b;   /* amber — subtle warmth */

  /* Glass surfaces */
  --glass:           rgba(255, 255, 255, 0.07);
  --glass-hover:     rgba(255, 255, 255, 0.12);
  --glass-strong:    rgba(255, 255, 255, 0.16);
  --glass-border:    rgba(255, 255, 255, 0.20);
  --glass-border-hi: rgba(255, 255, 255, 0.40);
  --glass-shadow:    0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.25);
  --glass-blur:      blur(24px) saturate(160%);

  /* Text */
  --text-100: rgba(255, 255, 255, 1.00);
  --text-65:  rgba(255, 255, 255, 0.65);
  --text-40:  rgba(255, 255, 255, 0.40);
  --text-20:  rgba(255, 255, 255, 0.20);

  /* Accent — teal glow */
  --accent:      #2dd4bf;
  --accent-glow: rgba(45, 212, 191, 0.35);

  /* Spacing */
  --radius-sm:  12px;
  --radius-md:  20px;
  --radius-lg:  32px;
  --radius-xl:  48px;
  --radius-pill: 999px;
}
```

---

## Typography System

| Role | Font | Size (mobile → desktop) | Weight | Letter Spacing |
|---|---|---|---|---|
| Display Hero | DM Serif Display | 48px → 88px | 400 | -1px |
| Section Title | DM Serif Display | 32px → 52px | 400 | -0.5px |
| Card Heading | DM Serif Display | 22px → 28px | 400 | normal |
| Nav / Labels | DM Sans | 12px | 500 | 2px uppercase |
| Body | DM Sans | 15px → 16px | 300 | 0.1px |
| Button | DM Sans | 13px | 600 | 1.5px uppercase |
| Tag / Meta | DM Sans | 10px → 11px | 500 | 2.5px uppercase |

**Font Loading (next/font/google):**
```ts
import { DM_Serif_Display, DM_Sans } from 'next/font/google'

const display = DM_Serif_Display({ weight: '400', subsets: ['latin'], variable: '--font-display' })
const sans = DM_Sans({ weight: ['300','400','500','600'], subsets: ['latin'], variable: '--font-sans' })
```

**Why DM Serif Display + DM Sans:**
They're designed as a pair. DM Serif has organic ink-trap details that feel handcrafted against the geometric glass panels. DM Sans is clean enough to disappear. The contrast between the two creates the editorial tension.

---

## The Living Background (CRITICAL)

This animated CSS mesh gradient is the soul of the entire design. It must be implemented on `<body>` or a fixed full-screen `<div>` behind everything.

```css
body {
  min-height: 100vh;
  background-color: #0f0f1a;
  background-image:
    radial-gradient(ellipse 80% 60% at 20% 10%, rgba(14,165,233,0.45) 0%, transparent 60%),
    radial-gradient(ellipse 60% 80% at 80% 20%, rgba(139,92,246,0.40) 0%, transparent 60%),
    radial-gradient(ellipse 70% 50% at 60% 80%, rgba(236,72,153,0.35) 0%, transparent 60%),
    radial-gradient(ellipse 50% 70% at 10% 70%, rgba(20,184,166,0.35) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 90% 90%, rgba(245,158,11,0.20) 0%, transparent 60%);
  animation: meshShift 18s ease-in-out infinite alternate;
}

@keyframes meshShift {
  0%   { background-position: 0% 0%, 100% 0%, 50% 100%, 0% 100%, 100% 100%; }
  25%  { background-position: 30% 20%, 70% 30%, 80% 70%, 20% 80%, 80% 60%; }
  50%  { background-position: 60% 10%, 40% 60%, 20% 40%, 70% 20%, 30% 90%; }
  75%  { background-position: 10% 50%, 90% 10%, 60% 90%, 40% 60%, 60% 30%; }
  100% { background-position: 50% 80%, 20% 90%, 90% 20%, 80% 40%, 10% 10%; }
}
```

Add a **grain texture overlay** on top using an SVG noise filter or CSS pseudo-element — this prevents the gradient from looking like a cheap stock background and adds tactile depth:

```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
}
```

---

## Glass Panel Mixin (Reuse Everywhere)

```css
.glass {
  background: var(--glass);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}

.glass:hover {
  background: var(--glass-hover);
  border-color: var(--glass-border-hi);
}
```

---

## Pages & Sections

### Page 1 — Homepage (`/`)
1. Hero Section
2. Featured Projects (3 cards)
3. Testimonials Slider
4. CTA Strip

### Page 2 — Portfolio (`/work`)
1. Page header
2. Filter tabs
3. Full project grid (6 projects)

### Page 3 — Contact (`/contact`)
1. Split layout — text + form

### Shared
- `<Navbar />`
- `<Footer />`

---

## Placeholder Content

**Studio:** Aura Studio — *"Design so considered, it disappears."*

**Projects:**
| # | Name | Type | Location | Year |
|---|------|------|----------|------|
| 1 | Cloud Nine Penthouse | Residential | Singapore | 2024 |
| 2 | The Mist Pavilion | Hospitality | Kyoto | 2024 |
| 3 | Transparent House | Residential | Oslo | 2023 |
| 4 | Studio Zero | Commercial | Berlin | 2023 |
| 5 | The Pale Room | Residential | Sydney | 2023 |
| 6 | Haze Lounge | Hospitality | Dubai | 2022 |

**Placeholder Image URLs (Unsplash):**
```
Hero:       https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80
Project 1:  https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=80
Project 2:  https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=900&q=80
Project 3:  https://images.unsplash.com/photo-1505693314120-0d443867891c?w=900&q=80
Project 4:  https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80
Project 5:  https://images.unsplash.com/photo-1567016432779-094069958ea5?w=900&q=80
Project 6:  https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80
```

**Testimonials:**
1. *"Aura stripped away everything unnecessary. What remained was exactly us."* — Priya N., Singapore
2. *"Walking into the space they designed felt like breathing for the first time."* — Marcus L., Oslo
3. *"They translated silence into architecture. I didn't know that was possible."* — Yuki T., Kyoto

---

## Component Specs

### `<Navbar />`
- Fixed top, full width
- Glass panel: `var(--glass-strong)` + blur + border-bottom `var(--glass-border)`
- Left: "AURA" wordmark — DM Serif Display 18px, white
- Right (desktop): links in DM Sans 12px uppercase 2px tracking, white 65%
- Right (mobile): hamburger → full-screen glass overlay menu
- Active link: teal underline dot `var(--accent)` 2px
- No logo image — pure typographic mark

### `<HeroSection />`
- Full viewport height (`100svh` — use `svh` for mobile safari)
- Centered content, no competing elements
- Structure:
  ```
  [Tag: "INTERIOR DESIGN STUDIO" — DM Sans 10px uppercase teal]
  [H1 Line 1: "Spaces built" — DM Serif Display]
  [H1 Line 2: "from light." — DM Serif Display italic]
  [Body: 1 line descriptor — DM Sans 15px white 65%]
  [Two CTAs side by side]
  [Scroll pill at bottom center]
  ```
- CTA 1 "Explore Work": glass pill button — `var(--glass-strong)` bg, white border, white text
- CTA 2 "Get in Touch": solid teal pill — `var(--accent)` bg, white text, no border
- **Staggered Framer Motion reveals**: each element fades up with 0.12s stagger
- **Floating glass shards**: 3–4 absolutely positioned glass rectangles (rotated, blurred, low opacity) for depth behind the text — purely decorative

### `<ProjectCard />`
- Glass panel, `var(--radius-lg)` 32px corners
- Image fills top 65% of card, `border-radius` matches card top corners
- Bottom panel: frosted, category tag + title + location + "View →" link
- Hover: entire card lifts (`translateY(-6px)`), border brightens, image subtle zoom
- Mobile: full-width cards, stacked vertically

### `<ProjectGrid />` (Homepage — 3 featured)
- Mobile: single column, full-width cards
- Tablet: 2-column grid
- Desktop: asymmetric — 1 large card (spans 2 rows) + 2 smaller cards beside it

### `<ProjectGrid />` (Work page — 6 projects)
- Mobile: single column
- Tablet+: 2-column uniform grid, gap 16px
- Filter tabs animate card reorder with Framer Motion `layout`

### `<TestimonialSlider />`
- Full-width glass panel section, centered
- Giant decorative `"` in DM Serif Display, 180px, teal at 15% opacity
- Quote in DM Serif Display italic, 24px → 32px, white
- Author in DM Sans uppercase 11px, teal, letter-spacing 3px
- Left/right chevron buttons (glass pill, 44px touch target)
- Dot indicators: 6px circles, white 30% default, white 100% active
- Auto-advances every 6s, pauses on hover/touch

### `<ContactForm />`
- Mobile: stacked (text above, form below)
- Desktop: 50/50 split inside one glass panel
- Left: headline + tagline + studio info
- Right: form fields
- Field style: no box, only bottom border `rgba(255,255,255,0.2)`, focus → teal bottom border
- Fields: Name, Email, Project Type (select), Message
- Submit: full-width teal pill, DM Sans uppercase, 52px height
- Success state: glass checkmark animation + "We'll be in touch."

### `<Footer />`
- Glass panel, full width
- Mobile: stacked center-aligned
- Desktop: 3-column — wordmark + tagline | nav links | social icons
- Social: IG, Pinterest, LinkedIn (Lucide icons, 20px, white 40%)
- Bottom: copyright in DM Sans 11px, white 25%

---

## Mobile-First Rules (NON-NEGOTIABLE)

1. **Use `100svh`** not `100vh` for hero — fixes iOS Safari bottom bar issue
2. **Touch targets minimum 44×44px** — all buttons, nav links, filter tabs
3. **`-webkit-backdrop-filter`** alongside `backdrop-filter` — required for Safari glass effect
4. **No hover-only interactions** — every hover state must have a tap equivalent
5. **Font sizes never below 13px** on mobile — readability is sacred
6. **Padding on mobile**: minimum `20px` horizontal on all sections
7. **Cards**: full-width (`width: 100%`) on mobile, never cramped 2-column below 600px
8. **Animations**: respect `prefers-reduced-motion` — wrap all Framer Motion in check
9. **Background mesh**: use `background-attachment: fixed` — but on mobile use `scroll` (fixed doesn't work on iOS)
10. **Navbar height**: `60px` mobile, `72px` desktop — consistent

---

## Animation Choreography

| Element | Animation | Trigger |
|---|---|---|
| Page load | Staggered fade-up (0.12s delay each) | Mount |
| Scroll sections | Fade + translateY(30px → 0) | IntersectionObserver / whileInView |
| Project cards | translateY(-6px) + border glow | Hover / tap |
| Navbar | Transparent → glass blur | Scroll > 60px |
| Filter change | Layout animation (Framer Motion) | Click |
| Testimonial | Slide + fade crossfade | Auto / arrow click |
| CTA button | Scale(0.97) | Press |
| Floating shards | Slow float loop (y: ±15px, 8s ease) | Continuous |
| Form submit | Checkmark scale reveal | Submit success |

All animations use only `transform` and `opacity` — zero layout-triggering properties.

---

## File Structure

```
aura-studio/
├── app/
│   ├── layout.tsx            # Root layout, fonts, CSS vars, CursorGlow
│   ├── page.tsx              # Homepage
│   ├── work/page.tsx         # Full portfolio
│   ├── contact/page.tsx      # Contact + booking
│   └── globals.css           # Variables, reset, background mesh, glass mixin
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── FloatingShards.tsx    # Decorative glass background elements
│   ├── ProjectCard.tsx
│   ├── FeaturedGrid.tsx      # Asymmetric homepage grid
│   ├── ProjectGrid.tsx       # Full work page grid with filter
│   ├── TestimonialSlider.tsx
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   └── GlassPanel.tsx        # Reusable glass wrapper component
├── lib/
│   └── projects.ts           # Placeholder project data array
└── package.json
```

---

## Quality Checklist

- [ ] Background mesh animates smoothly — no jank on mobile
- [ ] `backdrop-filter` + `-webkit-backdrop-filter` on ALL glass elements
- [ ] `100svh` used for hero (not `100vh`)
- [ ] All touch targets ≥ 44px
- [ ] DM Serif Display + DM Sans loaded via `next/font/google`
- [ ] No hardcoded hex colors — only CSS variables
- [ ] Framer Motion `prefers-reduced-motion` respected
- [ ] `background-attachment: scroll` on mobile for mesh (not `fixed`)
- [ ] Navbar glass activates on scroll > 60px
- [ ] All 6 projects render in `/work` with working filter
- [ ] Contact form shows success state on submit
- [ ] Footer renders correctly on 390px width
- [ ] `npm run build` passes with zero TypeScript errors
