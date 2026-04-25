# LUMIÈRE STUDIO — Interior Design Website
## Agent Reference Guide

---

## Project Overview

A **dark, cinematic, luxury interior design website** for a placeholder brand called **Lumière Studio**. The site is built in **Next.js (React)** and is inspired by a fusion of three world-class design systems: Ferrari's editorial chiaroscuro rhythm, Framer's void-black canvas precision, and Apple's product-as-hero philosophy — all unified under a **Gold / Champagne** accent palette.

---

## Brand Identity

| Property | Value |
|----------|-------|
| Studio Name | Lumière Studio |
| Tagline | *"Spaces that breathe. Rooms that speak."* |
| Personality | Luxury, editorial, cinematic, restrained |
| Primary Accent | Champagne Gold `#C9A84C` |
| Secondary Accent | Pale Gold `#E8D5A3` |
| Background | Absolute Black `#000000` |
| Surface Dark | `#0D0D0D` |
| Surface Elevated | `#141414` |
| Text Primary | Pure White `#FFFFFF` |
| Text Secondary | `#A0A0A0` |
| Text Muted | `#606060` |

---

## Design Philosophy

### The Three Pillars

**1. Ferrari's Chiaroscuro Rhythm**
Sections alternate between pure black cinematic moments and near-white editorial panels. Each section is a self-contained vignette — a "page" in a luxury magazine. Hard cuts between sections, never gradients.

**2. Framer's Void-Black Canvas**
The black background is not decorative — it IS the design. Every element floats in space. Product (in this case: interior photography) is the hero. Tight negative letter-spacing on headings creates compressed, kinetic type.

**3. Apple's Product-as-Hero**
Interiors are photographed and presented as sculpture. Each project in the portfolio gets its own "scene." One focal point per section. Never compete for attention.

---

## Typography System

| Role | Font | Size | Weight | Letter Spacing |
|------|------|------|--------|----------------|
| Display Hero | Playfair Display | 96px | 400 | -3px |
| Section Title | Playfair Display | 56px | 400 | -2px |
| Card Heading | Cormorant Garamond | 32px | 300 | -0.5px |
| Nav Links | Jost | 13px | 400 | 2px uppercase |
| Body | Jost | 16px | 300 | 0.2px |
| Labels / Tags | Jost | 11px | 500 | 3px uppercase |
| Button | Jost | 13px | 500 | 2px uppercase |

**Font Stack:**
- Display: `'Playfair Display', Georgia, serif` — old-world gravitas meets modern luxury
- Subheading: `'Cormorant Garamond', serif` — ultra-refined, editorial, architectural
- UI/Body: `'Jost', sans-serif` — geometric, clean, contemporary

> Load via Google Fonts: `Playfair+Display:wght@400;700`, `Cormorant+Garamond:wght@300;400`, `Jost:wght@300;400;500`

---

## Color System (CSS Variables)

```css
:root {
  /* Backgrounds */
  --bg-void: #000000;
  --bg-dark: #0D0D0D;
  --bg-elevated: #141414;
  --bg-light: #F5F2EE;       /* editorial white sections */

  /* Gold Accent */
  --gold: #C9A84C;
  --gold-light: #E8D5A3;
  --gold-muted: #8A6F32;

  /* Text */
  --text-primary: #FFFFFF;
  --text-secondary: #A0A0A0;
  --text-muted: #606060;
  --text-dark: #1A1A1A;      /* for light sections */

  /* Borders */
  --border-gold: rgba(201, 168, 76, 0.3);
  --border-subtle: rgba(255, 255, 255, 0.08);

  /* Overlays */
  --overlay-dark: rgba(0, 0, 0, 0.7);
  --overlay-mid: rgba(0, 0, 0, 0.45);
}
```

---

## Pages & Sections

### 1. Hero / Landing (`/`)
- Full-viewport black section
- Large Playfair Display headline with extreme negative tracking
- Subtle gold horizontal rule / line accent
- Two CTAs: "View Work" (ghost/outline) + "Book a Consultation" (gold filled)
- Ambient cursor glow effect (gold hue follows mouse)
- Smooth scroll indicator at bottom

### 2. Portfolio / Projects Gallery (`/work`)
- Alternating chiaroscuro layout: full-bleed project image + text on opposite side
- Each project card: title in Cormorant Garamond, category tag in Jost uppercase, year
- Hover: image subtle zoom, gold border line reveals
- Filter bar at top: All / Residential / Commercial / Hospitality

### 3. Testimonials / Press Section
- Dark section (`#0D0D0D`) with centered pull-quote in Playfair Display italic
- Gold quotation mark decorative element
- Client name in Jost uppercase small caps below
- Carousel / slider for multiple testimonials
- Press logos in muted white (reduced opacity)

### 4. Contact / Booking (`/contact`)
- Split layout: left = editorial text, right = minimal form
- Form fields: dark surface `#141414`, gold focus border
- CTA button: gold filled, Jost uppercase
- Studio address / social links below in muted text

---

## Component Library

| Component | Notes |
|-----------|-------|
| `<Navbar />` | Transparent on scroll, logo left, links right, gold dot active indicator |
| `<HeroSection />` | Full viewport, animated headline reveal, cursor glow |
| `<ProjectCard />` | Image + overlay text, hover gold border reveal |
| `<ProjectGrid />` | Masonry-style or alternating editorial layout |
| `<TestimonialSlider />` | Auto-advance carousel, gold accent quote mark |
| `<ContactForm />` | Minimal dark form, gold focus states |
| `<Footer />` | Dark, multi-column, social icons, copyright |
| `<GoldDivider />` | Thin horizontal gold rule used between sections |
| `<CursorGlow />` | Custom cursor with ambient gold radial glow |

---

## Animations & Interactions

| Interaction | Implementation |
|-------------|---------------|
| Page load | Staggered fade-up reveals using Framer Motion |
| Scroll reveal | `IntersectionObserver` triggers fade + slide-up |
| Image hover | CSS `transform: scale(1.04)` with `overflow: hidden` |
| Nav scroll | Transparent → `rgba(0,0,0,0.85)` + backdrop blur on scroll |
| Cursor glow | `mousemove` event → CSS custom property update → radial gradient |
| Project filter | Animated reorder with layout transition (Framer Motion) |
| Testimonial slider | CSS scroll snap or Framer Motion drag |

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Styling | CSS Modules + Global CSS variables |
| Animation | Framer Motion |
| Images | Next.js `<Image />` with placeholder blur |
| Fonts | Google Fonts via `next/font/google` |
| Icons | Lucide React (minimal set) |
| Deployment | Vercel-ready |

---

## File Structure

```
lumiere-studio/
├── app/
│   ├── layout.tsx          # Root layout, fonts, global styles
│   ├── page.tsx            # Homepage (Hero + Portfolio preview + Testimonials)
│   ├── work/
│   │   └── page.tsx        # Full portfolio grid
│   ├── contact/
│   │   └── page.tsx        # Contact & booking form
│   └── globals.css         # CSS variables, resets, typography
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectGrid.tsx
│   ├── TestimonialSlider.tsx
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── GoldDivider.tsx
│   └── CursorGlow.tsx
├── public/
│   └── images/             # Placeholder project images (use unsplash URLs)
└── package.json
```

---

## Placeholder Content

**Projects:**
1. *The Onyx Residence* — Private Villa, Dubai — 2024
2. *Maison Blanc* — Penthouse Apartment, Paris — 2024
3. *The Meridian* — Boutique Hotel Lobby, Milan — 2023
4. *Studio Kova* — Creative Agency HQ, London — 2023
5. *Silhouette House* — Minimalist Family Home, Tokyo — 2023
6. *The Amber Suite* — Presidential Suite, New York — 2022

**Testimonials:**
1. *"Lumière transformed our penthouse into a living artwork. Every detail whispers intention."* — Isabella M., Paris
2. *"Working with this studio was unlike anything we'd experienced. The space now tells our story."* — James R., Dubai
3. *"Flawless execution, extraordinary vision. Our hotel lobby stopped guests in their tracks."* — Sofia V., Milan

---

## Quality Checklist (Agent Must Verify)

- [ ] All sections use CSS variables — no hardcoded colors
- [ ] Fonts loaded via `next/font/google` — no external `<link>` tags
- [ ] All images use `next/image` with `alt` text and `priority` on hero
- [ ] Navbar becomes opaque on scroll (JS scroll listener)
- [ ] Gold accent appears on: active nav, CTA buttons, form focus, section labels, dividers
- [ ] No purple gradients, no Inter font, no generic AI aesthetics
- [ ] Mobile responsive: single column below 768px, nav collapses to hamburger
- [ ] Framer Motion installed and used for at least: hero reveal, scroll reveals, project hover
- [ ] Contact form has at minimum: Name, Email, Project Type (select), Message, Submit
- [ ] Footer has: studio name, nav links, social placeholders, copyright line
