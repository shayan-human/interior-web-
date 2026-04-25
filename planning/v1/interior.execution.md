# EXECUTION.md — Agent Task Instructions
## Lumière Studio — Interior Design Website

> **Read README.md and progress.md before starting any task.**
> After completing each task, update `progress.md` immediately.

---

## PRE-FLIGHT CHECKLIST

Before writing a single line of code:

- [ ] Read `README.md` fully
- [ ] Read `progress.md` to check current state
- [ ] Confirm Node.js >= 18 is available
- [ ] Confirm you are working in the correct project directory

---

## PHASE 1 — Project Scaffolding

### Task 1.1 — Bootstrap Next.js Project
```bash
npx create-next-app@latest lumiere-studio \
  --typescript \
  --tailwind=false \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"
cd lumiere-studio
```

### Task 1.2 — Install Dependencies
```bash
npm install framer-motion lucide-react
```

### Task 1.3 — Setup Fonts in layout.tsx
Use `next/font/google` to load:
- `Playfair_Display` — weights: 400, 700, italics
- `Cormorant_Garamond` — weights: 300, 400
- `Jost` — weights: 300, 400, 500

Apply as CSS variables: `--font-display`, `--font-serif`, `--font-sans`

### Task 1.4 — Create globals.css
Must include:
- All CSS variables from README.md color system
- CSS reset (box-sizing, margin 0, padding 0)
- Base typography rules (font-family on body, line-height, color)
- Smooth scroll behavior
- Custom scrollbar (thin, dark, gold thumb)
- `::selection` highlight in gold

**Deliverable:** Project boots with `npm run dev` showing blank black page. No errors.

---

## PHASE 2 — Global Components

### Task 2.1 — Navbar Component (`components/Navbar.tsx`)

**Behavior:**
- Default state: fully transparent background, white logo + links
- Scroll state (>80px from top): `rgba(0,0,0,0.85)` background + `backdrop-filter: blur(12px)`
- Transition: 300ms ease

**Structure:**
```
[Logo: "LUMIÈRE"] ————————————— [Work] [About] [Press] [Contact] [Book a Call →]
```

**Styling rules:**
- Logo: Playfair Display, 18px, weight 400, letter-spacing 4px, uppercase
- Links: Jost, 12px, weight 400, letter-spacing 2.5px, uppercase, `var(--text-secondary)`
- Active link: gold dot indicator below (2px × 2px circle in `var(--gold)`)
- "Book a Call" button: border `1px solid var(--gold)`, color `var(--gold)`, padding `8px 20px`, no border-radius (or 1px max), hover: bg gold, text black
- Mobile (<768px): hamburger icon (Lucide `Menu`), full-screen overlay menu

### Task 2.2 — Footer Component (`components/Footer.tsx`)

**Structure:**
```
[LUMIÈRE STUDIO]         [Work] [Press] [Contact]       [IG] [LI] [PI]
"Spaces that breathe."
© 2024 Lumière Studio. All rights reserved.
```

**Styling:**
- Background: `var(--bg-dark)` `#0D0D0D`
- Top border: `1px solid var(--border-subtle)`
- Logo: Playfair Display, gold color
- Links: Jost uppercase 11px, `var(--text-muted)`
- Divider: thin gold line `var(--border-gold)` above copyright

### Task 2.3 — GoldDivider Component (`components/GoldDivider.tsx`)
Simple component: `<div>` with `height: 1px`, `background: var(--gold)`, `opacity: 0.4`, configurable `width` prop (default `60px`)

### Task 2.4 — CursorGlow Component (`components/CursorGlow.tsx`)
- Track `mousemove` event on `window`
- Render a `div` fixed-position, pointer-events none
- Style: `width: 400px`, `height: 400px`, `border-radius: 50%`
- Background: `radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)`
- Translate to cursor position with `transform: translate(-50%, -50%)`
- Add to root layout — renders on all pages

---

## PHASE 3 — Homepage (`app/page.tsx`)

### Task 3.1 — Hero Section (`components/HeroSection.tsx`)

**Layout:** Full viewport height, black background, vertically centered content

**Content structure:**
```
[Label: "INTERIOR DESIGN STUDIO" — Jost 11px uppercase gold letter-spacing 4px]
[Headline: "We design" — Playfair Display 96px]
[Headline italic: "spaces" — Playfair Display 96px italic gold]
[Headline: "that live." — Playfair Display 96px]
[GoldDivider — 80px width]
[Subtext: "Lumière Studio crafts interiors..." — Jost 16px weight 300 var(--text-secondary)]
[CTAs: "View Our Work" (outline gold) | "Book a Consultation" (filled gold)]
[Scroll indicator: thin vertical line + "SCROLL" label at bottom center]
```

**Animations (Framer Motion):**
- Each line of headline: fade up, staggered 0.15s delay
- Label: fade in first
- CTAs: fade up last
- Scroll indicator: subtle pulse opacity

### Task 3.2 — Portfolio Preview Section

Show 3 featured projects in an alternating editorial layout:

**Layout pattern:**
```
Project 1: [IMAGE 60%] [TEXT 40%] — black background
Project 2: [TEXT 40%] [IMAGE 60%] — #0D0D0D background  
Project 3: [IMAGE 60%] [TEXT 40%] — black background
```

**Each project text block:**
- Category tag: Jost 10px uppercase gold, letter-spacing 3px
- Number: Cormorant Garamond 120px weight 300, opacity 0.06, absolute positioned
- Title: Playfair Display 48px
- Description: Jost 15px weight 300 `var(--text-secondary)` — 2 lines max
- Link: "View Project →" Jost 12px uppercase gold, letter-spacing 2px

**Image treatment:**
- `next/image` with `object-fit: cover`
- Hover: `scale(1.03)` with `overflow: hidden` on wrapper, 600ms ease
- Gold border `1px solid var(--border-gold)` visible on hover

**Scroll reveal:** Each project fades + slides up on scroll (IntersectionObserver or Framer Motion `whileInView`)

### Task 3.3 — Testimonials Section (`components/TestimonialSlider.tsx`)

**Layout:** Full-width dark section `#0D0D0D`, centered content, max-width 800px

**Content:**
- Decorative `"` in Playfair Display, 200px, `var(--gold)`, opacity 0.15, absolute top-left
- Quote text: Cormorant Garamond, 28px, weight 300, italic, white, line-height 1.6
- Author: Jost, 11px, uppercase, letter-spacing 3px, `var(--gold)`, margin-top 32px
- Navigation: left/right arrow buttons (Lucide `ChevronLeft`/`ChevronRight`)
- Dot indicators below

**Behavior:** Auto-advance every 5 seconds, pause on hover, manual nav

### Task 3.4 — CTA Banner Section

Full-width section with light background `var(--bg-light)` `#F5F2EE`:

```
"Ready to transform your space?"  — Playfair Display 56px, dark text
"Book a complimentary consultation with our studio."  — Jost 18px weight 300
[Book Now →] — gold filled button
```

This is the ONE light section on the homepage — creates the Ferrari chiaroscuro contrast.

---

## PHASE 4 — Portfolio Page (`app/work/page.tsx`)

### Task 4.1 — Page Header
- Black background, full-width
- "OUR WORK" label in Jost uppercase gold
- "Every space, a story." headline in Playfair Display 72px
- GoldDivider below

### Task 4.2 — Filter Bar
- Horizontal filter: All / Residential / Commercial / Hospitality
- Style: Jost 12px uppercase, letter-spacing 2px, `var(--text-muted)` default, `var(--gold)` active
- Active indicator: thin gold underline
- Framer Motion `layout` prop for animated active pill transition

### Task 4.3 — Project Grid
Use all 6 placeholder projects from README.md

**Grid layout:**
- Desktop: 2-column CSS Grid, gap 2px (tight editorial grid)
- Each cell: full-bleed image with text overlay on hover
- Image aspect ratio: 3:4 (portrait) or 16:9 (landscape) alternating
- Hover overlay: `rgba(0,0,0,0.6)` fade in + project info slides up

**Project card hover content:**
- Category: Jost 10px uppercase gold
- Title: Playfair Display 28px white
- Year: Jost 12px `var(--text-secondary)`
- "View →" link

---

## PHASE 5 — Contact Page (`app/contact/page.tsx`)

### Task 5.1 — Page Layout
Split 50/50 layout (desktop):

**Left panel — Editorial text:**
- Background: black
- "LET'S CREATE SOMETHING EXTRAORDINARY" label in Jost uppercase gold 11px
- "Start your project." headline in Playfair Display 56px
- GoldDivider
- Studio info: Address (placeholder), Email, Phone — Jost 14px weight 300
- Response time note: "We respond within 24 hours"

**Right panel — Form:**
- Background: `var(--bg-elevated)` `#141414`
- Form fields: Name, Email, Project Type (select: Residential/Commercial/Hospitality), Budget Range (select), Message
- Input styling: background transparent, border-bottom `1px solid var(--border-subtle)`, no border-radius, padding `16px 0`, Jost 15px
- Focus state: border-bottom transitions to `1px solid var(--gold)`
- Placeholder: `var(--text-muted)`
- Submit button: full-width, gold background, black text, Jost uppercase, 56px height
- Hover: gold lightens, subtle scale

### Task 5.2 — Form Behavior
- Client-side validation (required fields)
- On submit: show success state ("Thank you. We'll be in touch soon.")
- No actual API needed — static success state

---

## PHASE 6 — Polish & QA

### Task 6.1 — Mobile Responsiveness
Verify at 375px, 768px, 1280px, 1920px:
- [ ] Navbar collapses to hamburger at <768px
- [ ] Hero headline scales: 96px → 56px → 40px
- [ ] Portfolio alternating layout stacks to single column on mobile
- [ ] Contact split layout stacks (form below editorial text)
- [ ] Testimonial slider works with touch/swipe
- [ ] Footer stacks to single column

### Task 6.2 — Performance
- [ ] All images use `next/image` with width/height specified
- [ ] Fonts loaded with `next/font/google` (no layout shift)
- [ ] CursorGlow uses `will-change: transform` for GPU acceleration
- [ ] Framer Motion animations use `opacity` and `transform` only (no layout thrashing)

### Task 6.3 — Final Visual QA
- [ ] Gold accent appears consistently: nav active, buttons, form focus, dividers, labels, quote marks, decorative numbers
- [ ] No section has competing focal points — one hero element per section
- [ ] All dark sections use `var(--bg-void)` or `var(--bg-dark)` — never arbitrary dark colors
- [ ] The one light section (`#F5F2EE` CTA banner) creates clear contrast rhythm
- [ ] Typography hierarchy is legible: Playfair headline → Cormorant subhead → Jost body
- [ ] Hover states exist on: nav links, project cards, CTA buttons, footer links
- [ ] Scroll behavior is smooth (`scroll-behavior: smooth` in CSS)

---

## AGENT RULES

1. **Never use hardcoded hex colors** — always use CSS variables
2. **Never use Inter, Roboto, Arial, or system-ui** as primary fonts
3. **Never use purple gradients or generic AI aesthetics**
4. **Never add borders with large radius to non-button elements** — cards are sharp
5. **Always update progress.md** after completing each numbered task
6. **One focal point per section** — resist the urge to add content
7. **Gold is sacred** — do not overuse; it must feel earned when it appears
8. **Photography is the hero** — use high-quality Unsplash URLs for placeholders

### Recommended Unsplash Image URLs (use these as `src` for placeholder images)
```
Hero BG:       https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920
Project 1:     https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200
Project 2:     https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200
Project 3:     https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200
Project 4:     https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200
Project 5:     https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200
Project 6:     https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200
```

---

## COMPLETION CRITERIA

The project is **done** when:
- `npm run dev` runs without errors
- `npm run build` succeeds with no TypeScript errors
- All 3 pages render correctly: `/`, `/work`, `/contact`
- All items in Phase 6 QA checklist are checked
- `progress.md` shows all tasks complete
