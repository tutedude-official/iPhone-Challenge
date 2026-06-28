# Creator's Handbook — TuteDude iPhone Challenge

An award-grade, cinematic, fully interactive web experience built from the
official **TuteDude Creator's Handbook (2026 Edition)**. Every page of the
handbook is reimagined as a unique animated section — the copy is preserved
verbatim; only the presentation is transformed.

> _"Apple keynote meets an Awwwards Site of the Day."_

---

## ✨ Highlights

- **Cinematic 3D hero** — a floating phone + trophy rendered with React Three
  Fiber, dynamic lighting, sparkles and mouse parallax.
- **Advanced custom cursor** — blob + dot with magnetic hover, stretch-on-speed,
  text mode, click ripples, glow trail and contextual labels.
- **Lenis smooth scroll** wired into a single GSAP `ScrollTrigger` ticker.
- **A distinct animation language per section** — scroll-drawn timelines,
  animated scoring bars, 3D tilt cards, spotlight cards, accordions, magnetic
  buttons, infinite marquees, particle fields and aurora backgrounds.
- **Dark, futuristic, glassmorphic** design system with organic gradients,
  noise texture, animated grid and glow.
- **Performance-minded** — dynamic import of the 3D scene, GPU-friendly canvas
  particles (paused offscreen), `prefers-reduced-motion` honored throughout,
  package-import optimization and code splitting.
- **Responsive + accessible + SEO** — fluid typography, touch-aware cursor
  fallback, semantic markup, Open Graph / Twitter metadata.

## 🧱 Tech Stack

| Area | Tooling |
| --- | --- |
| Framework | **Next.js 15** (App Router) + **React 19** |
| Language | **TypeScript** |
| Styling | **TailwindCSS** (custom design system) |
| Animation | **Framer Motion**, **GSAP + ScrollTrigger**, **Motion One** primitives |
| Smooth scroll | **Lenis** |
| 3D | **Three.js** / **React Three Fiber** + **drei** |
| Components | **ReactBits-style** primitives (re-implemented), shadcn-style patterns |
| Icons | **Lucide**, **React Icons** |

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build && npm start
```

## 📁 Structure

```
app/
  layout.tsx          # fonts, SEO, global chrome (cursor, aurora, nav, dock)
  page.tsx            # assembles every handbook section in order
  globals.css         # design tokens, glass, aurora, cursor styles
components/
  providers/          # Lenis smooth-scroll provider
  cursor/             # advanced custom cursor
  three/              # React Three Fiber hero scene
  ui/                 # reusable animation primitives (ReactBits-style)
  sections/           # one component per handbook page
lib/
  content.ts          # ALL handbook copy, extracted verbatim
  gsap.ts             # GSAP + ScrollTrigger registration
  utils.ts            # cn(), lerp(), clamp()
```

## 📝 Content fidelity

All titles, descriptions, lists, FAQs, rules, the timeline, prizes and scoring
live in [`lib/content.ts`](lib/content.ts), transcribed directly from the
handbook PDF. Nothing was summarized, rewritten or removed — the experience is a
pure visual re-imagining.

## ♿ Accessibility & motion

The site fully respects `prefers-reduced-motion`: smooth scroll, particle
loops, split-text and scrubbed timelines all degrade to instant, static
states. The custom cursor is disabled on touch / coarse-pointer devices.

---

Built for the **#30DayTuteDudeChallenge**.
