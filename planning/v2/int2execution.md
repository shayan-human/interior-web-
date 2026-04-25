# EXECUTION.md — Aura Studio
## Agent Task Instructions — Glassmorphism Interior Design Website

> Read README.md fully before starting.
> Update progress.md after EVERY completed task — no exceptions.
> Mobile-first always. Build at 390px, then scale up.

---

## PRE-FLIGHT

- [ ] Read `README.md` completely
- [ ] Read `progress.md` for current state
- [ ] Node.js >= 18 available
- [ ] Working directory confirmed

---

## PHASE 1 — Scaffold

### Task 1.1 — Create Next.js Project
```bash
npx create-next-app@latest aura-studio \
  --typescript --eslint --app \
  --tailwind=false \
  --src-dir=false \
  --import-alias="@/*"
cd aura-studio
```

### Task 1.2 — Install Dependencies
```bash
npm install framer-motion lucide-react
```

### Task 1.3 — globals.css
Create `app/globals.css` with ALL of the following:

**1. CSS Reset**
```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
img { display: block; max-width: 100%; }
button { cursor: pointer; border: none; background: none; }
a { text-decoration: none; color: inherit; }
```

**2. All CSS variables** from README.md color system — copy exactly

**3. Background mesh** — apply to `body`:
```css
body {
  min-height: 100vh;
  font-family: var(--font-sans), sans-serif;
  color: var(--text-100);
  overflow-x: hidden;
  background-color: #0f0f1a;
  background-image:
    radial-gradient(ellipse 80% 60% at 20% 10%, rgba(14,165,233,0.45) 0%, transparent 60%),
    radial-gradient(ellipse 60% 80% at 80% 20%, rgba(139,92,246,0.40) 0%, transparent 60%),
    radial-gradient(ellipse 70% 50% at 60% 80%, rgba(236,72,153,0.35) 0%, transparent 60%),
    radial-gradient(ellipse 50% 70% at 10% 70%, rgba(20,184,166,0.35) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 90% 90%, rgba(245,158,11,0.20) 0%, transparent 60%);
  background-size: 200% 200%;
  background-attachment: fixed;
  animation: meshShift 18s ease-in-out infinite alternate;
}

/* Mobile: disable fixed attachment (iOS bug) */
@media (max-width: 768px) {
  body { background-attachment: scroll; }
}

@keyframes meshShift {
  0%   { background-position: 0% 0%; }
  25%  { background-position: 40% 30%; }
  50%  { background-position: 70% 60%; }
  75%  { background-position: 30% 80%; }
  100% { background-position: 80% 20%; }
}
```

**4. Grain overlay**
```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
}
```

**5. Glass utility classes**
```css
.glass {
  background: var(--glass);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}
.glass-strong {
  background: var(--glass-strong);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}
```

**6. Custom scrollbar**
```css
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--glass-border-hi); border-radius: 999px; }
```

**7. Selection**
```css
::selection { background: rgba(45,212,191,0.3); color: white; }
```

### Task 1.4 — layout.tsx
```tsx
import { DM_Serif_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const displayFont = DM_Serif_Display({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
})
const sansFont = DM_Sans({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

**Deliverable:** `npm run dev` → black/dark page visible, mesh gradient animating. No errors.

---

## PHASE 2 — Global Components

### Task 2.1 — `components/GlassPanel.tsx`
Reusable wrapper component — used by EVERY card and container:
```tsx
interface GlassPanelProps {
  children: React.ReactNode
  className?: string
  radius?: 'sm' | 'md' | 'lg' | 'xl'   // maps to --radius-* vars
  strong?: boolean                        // uses glass-strong vs glass
}
```
Renders a `<div>` with the appropriate glass class + border-radius. This is the atomic building block of the whole UI.

### Task 2.2 — `components/Navbar.tsx`

**State:** `scrolled` boolean via `useEffect` + `window.addEventListener('scroll')`

**Styles:**
```css
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 60px; /* mobile */
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  transition: background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease;
}
.navbar.scrolled {
  background: var(--glass-strong);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-bottom: 1px solid var(--glass-border);
}
@media (min-width: 768px) {
  .navbar { height: 72px; padding: 0 40px; }
}
```

**Logo:** `"AURA"` — DM Serif Display 20px, white, letter-spacing 3px

**Desktop links** (hidden on mobile): Work, Press, Contact — DM Sans 11px uppercase, letter-spacing 2px, `var(--text-65)`, hover → `var(--text-100)`

**Desktop CTA:** `"Get in Touch"` — glass pill button, teal border `var(--accent)`, teal text, `var(--radius-pill)`, padding `8px 20px`

**Mobile hamburger:** Lucide `Menu` icon (24px). Tap opens full-screen overlay:
- Background: `rgba(15,15,26,0.95)` + blur
- Links stacked, DM Serif Display 36px, white
- Close button top-right (Lucide `X`)
- Framer Motion: slide in from right, stagger links

### Task 2.3 — `components/Footer.tsx`

Full-width glass panel at bottom:
- Background: `var(--glass)`
- Border-top: `1px solid var(--glass-border)`
- Padding: `40px 20px` mobile, `60px 40px` desktop

**Mobile layout (stacked, centered):**
```
AURA
"Design so considered, it disappears."
[Work] [Press] [Contact]
[IG icon] [Pinterest icon] [LinkedIn icon]
© 2025 Aura Studio. All rights reserved.
```

**Desktop layout (3 columns):**
```
[AURA + tagline]    [Work | Press | Contact]    [IG | PI | LI]
                © 2025 Aura Studio
```

### Task 2.4 — `components/FloatingShards.tsx`

Purely decorative — 4 glass rectangles floating behind hero content:

```tsx
// Render 4 divs, absolutely positioned, pointer-events: none
// Each: different size (80-200px), rotation (-30 to 30deg), opacity 0.4-0.7
// Framer Motion: animate y between -15 and +15, duration 6-10s, ease: easeInOut, repeat: Infinity, repeatType: mirror
// Apply glass styles — these are physical glass panels in the background

const shards = [
  { width: 120, height: 180, top: '10%', left: '5%',  rotate: -20, duration: 8 },
  { width: 80,  height: 120, top: '20%', right: '8%', rotate: 15,  duration: 10 },
  { width: 160, height: 100, top: '60%', left: '2%',  rotate: 10,  duration: 7 },
  { width: 100, height: 160, top: '55%', right: '4%', rotate: -25, duration: 9 },
]
```

---

## PHASE 3 — Homepage (`app/page.tsx`)

### Task 3.1 — `components/HeroSection.tsx`

**Container:** `height: 100svh`, `position: relative`, `overflow: hidden`

**Render `<FloatingShards />` behind content** (z-index 0)

**Content block** (z-index 1, centered):
```tsx
<motion.div /* stagger container */ >
  <motion.span /* tag */ >
    INTERIOR DESIGN STUDIO  {/* DM Sans 10px uppercase teal, tracking 3px */}
  </motion.span>

  <motion.h1>
    {/* Line 1: "Spaces built" — DM Serif Display, normal */}
    {/* Line 2: "from light."  — DM Serif Display, ITALIC */}
    {/* Mobile: 48px | Desktop: 88px */}
    {/* Letter spacing: -1px */}
  </motion.h1>

  <motion.p>
    {/* "We craft interiors that hold light, space, and intention." */}
    {/* DM Sans 15px weight 300, var(--text-65), max-width 360px */}
  </motion.p>

  <motion.div /* CTA row, gap 12px, flex-wrap on mobile */ >
    {/* CTA 1: glass pill — "Explore Work" */}
    {/* CTA 2: solid teal pill — "Get in Touch" */}
  </motion.div>
</motion.div>
```

**Framer Motion stagger:**
```ts
const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } } }
```

**Scroll indicator** (absolute bottom center):
```
vertical line 40px + "SCROLL" label below
animate: y loop ±6px, 1.5s ease
```

### Task 3.2 — `components/FeaturedGrid.tsx` (Homepage 3 projects)

**Mobile:** 3 cards stacked, full width, `gap: 16px`

**Desktop (min-width: 1024px):** CSS Grid, asymmetric:
```css
.featured-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  grid-template-rows: auto auto;
  gap: 16px;
}
.featured-grid .card:first-child {
  grid-row: 1 / 3; /* spans both rows */
}
```

Each card = `<GlassPanel radius="lg">` with:
- Image: `next/image`, `object-fit: cover`, top 65% of card
- Bottom info strip: tag + title + "View →"
- Hover: `whileHover={{ y: -6 }}` Framer Motion
- `whileInView={{ opacity: 1, y: 0 }}` scroll reveal

**Section header above grid:**
```
"SELECTED WORK" — DM Sans 10px uppercase teal
"Recent Projects" — DM Serif Display 36px → 52px, white
```

### Task 3.3 — `components/TestimonialSlider.tsx`

**Outer wrapper:** Glass panel, `padding: 60px 24px` mobile, `padding: 80px 60px` desktop, `text-align: center`

**Decorative quote mark:**
```css
.quote-mark {
  font-family: var(--font-display);
  font-size: 180px;
  line-height: 0.8;
  color: var(--accent);
  opacity: 0.12;
  position: absolute;
  top: 20px; left: 24px;
  pointer-events: none;
  user-select: none;
}
```

**Quote text:** DM Serif Display italic, 22px mobile → 30px desktop, `var(--text-100)`, line-height 1.55, `max-width: 680px`, centered

**Author:** DM Sans 11px uppercase, `var(--accent)`, letter-spacing 3px, `margin-top: 28px`

**Navigation:**
- Arrow buttons: glass pill, 44×44px, Lucide `ChevronLeft`/`ChevronRight`, 20px
- Dots: row of circles 6px, `var(--text-20)` default, `var(--text-100)` active, gap 8px

**Behavior:**
```ts
const [active, setActive] = useState(0)
// Auto-advance: useEffect with setInterval 6000ms, clear on hover/touch
// Animate: Framer Motion AnimatePresence with opacity crossfade
```

### Task 3.4 — CTA Strip

Simple centered section, no glass panel — the background mesh shows through:
```
"Ready to reimagine your space?"
DM Serif Display 36px → 56px, white, text-align center

"Let's start with a conversation."
DM Sans 16px, var(--text-65), margin-top 12px

[Book a Consultation]
Solid teal pill button, 52px height, DM Sans uppercase 13px tracking 1.5px
margin-top 32px
```

---

## PHASE 4 — Portfolio Page (`app/work/page.tsx`)

### Task 4.1 — Page Header
```
padding-top: calc(60px + 60px) /* navbar height + extra */

"OUR WORK" — DM Sans 10px uppercase teal, tracking 3px
"Every space tells a story." — DM Serif Display 48px → 72px
DM Sans 15px body — "Six projects. Six stories. All intention."
```

### Task 4.2 — Filter Tabs

```tsx
const filters = ['All', 'Residential', 'Commercial', 'Hospitality']
const [active, setActive] = useState('All')
```

**Style:** Horizontal scroll row on mobile (no wrap), centered on desktop
Each tab = glass pill button, `padding: 10px 20px`, `var(--radius-pill)`
Active tab = `background: var(--accent)`, white text
Inactive = `var(--glass)`, `var(--text-65)`
Framer Motion `layout` on active indicator for smooth slide

**Filter logic:** Filter `projects` array by `type` field, show all if 'All'

### Task 4.3 — Full Project Grid

**Layout:**
```css
.project-grid {
  display: grid;
  grid-template-columns: 1fr;          /* mobile */
  gap: 16px;
  padding: 0 20px;
}
@media (min-width: 640px) {
  .project-grid { grid-template-columns: repeat(2, 1fr); }
}
```

Cards: same `<ProjectCard />` component as homepage, reused.

**Animation:** Framer Motion `AnimatePresence` on filter change — exiting cards fade out, entering cards fade in + stagger.

---

## PHASE 5 — Contact Page (`app/contact/page.tsx`)

### Task 5.1 — Layout

**Mobile:** Full-width glass panel, stacked — text block on top, form below, `gap: 40px`

**Desktop:** Single glass panel `display: grid grid-template-columns: 1fr 1fr`, `gap: 0`
- Left half: `padding: 60px 40px`, editorial text + studio info
- Right half: `padding: 60px 40px`, form, `border-left: 1px solid var(--glass-border)`

**Left content:**
```
"LET'S TALK" — DM Sans 10px uppercase teal, tracking 3px
"Start your project." — DM Serif Display 40px → 52px
[thin teal line divider — 48px wide, 1px, var(--accent), opacity 0.6]

Studio info (DM Sans 14px, var(--text-65)):
→ hello@aurastudio.co
→ Available globally
→ "We respond within 24 hours"
```

**Right — Form fields:**
Each field wrapper:
```css
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-bottom: 1px solid rgba(255,255,255,0.15);
  padding-bottom: 16px;
  transition: border-color 0.2s;
}
.field:focus-within {
  border-bottom-color: var(--accent);
}
label {
  font-family: var(--font-sans);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-40);
}
input, select, textarea {
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-100);
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 300;
}
input::placeholder, textarea::placeholder { color: var(--text-20); }
```

**Fields:** Name, Email, Project Type (select: Residential/Commercial/Hospitality/Other), Message (textarea, 4 rows)

**Submit button:** Full-width, `height: 52px`, background `var(--accent)`, white text, DM Sans 13px uppercase tracking 1.5px, `var(--radius-pill)`, `margin-top: 24px`
Hover: `opacity: 0.85`, `scale: 0.99`

### Task 5.2 — Form Behavior

```tsx
const [submitted, setSubmitted] = useState(false)

// On submit: preventDefault, basic validation, setSubmitted(true)

// Success state (replaces form):
// Framer Motion scale-in reveal
// Lucide CheckCircle icon, teal, 48px
// "Thank you."  — DM Serif Display 32px
// "We'll be in touch within 24 hours." — DM Sans 15px var(--text-65)
```

---

## PHASE 6 — Polish & QA

### Task 6.1 — `lib/projects.ts`
Create typed data array:
```ts
export interface Project {
  id: number
  name: string
  type: 'Residential' | 'Commercial' | 'Hospitality'
  location: string
  year: number
  image: string
  description: string
  featured: boolean
}

export const projects: Project[] = [
  // All 6 from README.md placeholder content
]
```

### Task 6.2 — `prefers-reduced-motion`
Wrap all Framer Motion animations:
```ts
import { useReducedMotion } from 'framer-motion'
const shouldReduce = useReducedMotion()
// Pass reduced variants when true
```

### Task 6.3 — Mobile QA Checklist
Test at 390px (iPhone 14 viewport):
- [ ] Hero fills full screen, no overflow, CTA buttons not clipped
- [ ] Navbar hamburger opens + closes cleanly
- [ ] Project cards full-width, images load correctly
- [ ] Testimonial arrows are 44px+ and tappable
- [ ] Filter tabs horizontally scrollable
- [ ] Contact form inputs are large enough to type in (font-size ≥ 16px prevents iOS zoom)
- [ ] Footer stacks and is readable
- [ ] Background mesh visible and animating (scroll attachment)
- [ ] Glass effect visible (backdrop-filter working in Safari)

### Task 6.4 — Final Visual QA
- [ ] Teal accent (`var(--accent)`) appears on: nav CTA, tag labels, testimonial author, form focus, submit button, divider
- [ ] DM Serif Display used for all headlines
- [ ] DM Sans used for all body / labels / buttons
- [ ] No hardcoded hex colors anywhere in component files
- [ ] Glass effect on: navbar (scrolled), all cards, testimonial section, contact panel, footer
- [ ] Floating shards visible in hero (not hidden behind content)
- [ ] Scroll reveal on: featured projects, testimonials, CTA strip
- [ ] `npm run build` passes with zero errors

---

## AGENT RULES

1. **Mobile-first.** Write mobile CSS first, then `@media (min-width: ...)` for desktop.
2. **`100svh` for hero**, never `100vh`.
3. **`-webkit-backdrop-filter`** on every glass element alongside `backdrop-filter`.
4. **Font size ≥ 16px** on all form inputs (prevents iOS auto-zoom).
5. **Never hardcode colors.** CSS variables only.
6. **Never use Inter, Roboto, or system fonts** as primary typeface.
7. **Update `progress.md` after every task.** No exceptions.
8. **One Unsplash image per project** — use exact URLs from README.md.
9. **Glass is everywhere** — if a container doesn't have glass, question whether it should.
10. **The mesh background is sacred** — never cover it with opaque backgrounds.
