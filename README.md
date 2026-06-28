<div align="center">

<img src="https://raw.githubusercontent.com/rajnishpark03/iPhone-Challenge/main/public/iphone-17-prize.webp" alt="iPhone 17 Prize" width="320" />

# TuteDude iPhone Challenge

**A cinematic web experience for the TuteDude iPhone Challenge.**
Built with a dark futuristic UI, smooth scroll, and per-section animations — because a challenge this good deserves a site that looks the part.

[![Live Site](https://img.shields.io/badge/Live%20Site-tutedude--challenge.vercel.app-black?style=for-the-badge&logo=vercel)](https://tutedude-challenge.vercel.app)

</div>

---

## What this is

A fully interactive website for the TuteDude iPhone Challenge — where students post Instagram Reels about their learning journey and win an iPhone 17. The site covers everything: how to participate, prizes, rules, FAQs, and a closing CTA. Think Apple keynote energy with glassmorphic UI and smooth animations.

---

## What makes it different

- A floating iPhone in the hero with dynamic lighting, sparkle particles, and parallax on mouse move
- Every section has its own animation style: scroll-triggered timelines, 3D tilt cards, animated scoring bars, spotlight cards, infinite marquees, particle fields
- Lenis smooth scroll hooked into GSAP's ScrollTrigger so everything feels physically correct
- Dark, futuristic design system — glassmorphism, organic gradients, noise texture, animated grid lines

---

## Tech Stack

| | Tool |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion + GSAP + ScrollTrigger |
| Smooth Scroll | Lenis |
| 3D | Three.js / React Three Fiber |
| Icons | Lucide + React Icons |

---

## Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`

---

## Project structure

```
app/
  layout.tsx        # global chrome: nav, SEO, aurora background
  page.tsx          # hero + all challenge sections
  globals.css       # design tokens, glass utilities, cursor styles

components/
  providers/        # Lenis smooth-scroll setup
  cursor/           # custom cursor (blob + dot + behaviors)
  three/            # React Three Fiber hero scene
  ui/               # reusable animation primitives
  sections/         # one component per challenge section

lib/
  content.ts        # all site copy
  gsap.ts           # GSAP + ScrollTrigger init
  utils.ts          # cn(), lerp(), clamp()
```

---

## Accessibility

`prefers-reduced-motion` is respected throughout — animations degrade to static states, smooth scroll turns off, and particles pause. The custom cursor falls back to native on touch devices.

---

<div align="center">

Built for the **#30DayTuteDudeChallenge**

</div>
