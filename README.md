# Andrea Zucca — Digital Atelier

A dark, industrial, brutalist fashion experience for designer **Andrea Zucca**, built with
**Next.js 15 (App Router) + TypeScript + Tailwind CSS** and a premium motion stack
(Framer Motion, GSAP, Lenis, custom cursor).

> Palette: absolute black · blood red · metallic silver
> Mood: anatomic · cage / restraint · barbed wire · distressed · raw

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build
npm run start
```

---

## Project structure

```
app/
  layout.tsx                 # fonts, metadata/SEO, providers, cursor, grain
  page.tsx                   # home (Hero → Work → About → Contact)
  globals.css                # tokens, grain, distress filters, helpers
  projects/
    senza-limiti/page.tsx
    anatomia-della-gabbia/page.tsx
    ear-cuff/page.tsx
components/
  layout/      Navbar, Footer
  sections/    Hero, FeaturedProjects, About, Contact
  projects/    SenzaLimiti, AnatomiaGabbia, EarCuff + shared, BarbedWire, Filigree
  ui/          Preloader, CustomCursor, Magnetic, RevealText, Grain, SvgFilters
  providers/   SmoothScroll (Lenis)
lib/
  projects.ts  # single source of truth for the 3 collections
  fonts.ts     # next/font configuration
  utils.ts     # cn() helper
public/assets/
  projects/<slug>/NN.jpg     # collection imagery
  stylist/NN.jpg             # designer portraits
```

## Replacing images / placeholders

All imagery lives under `public/assets/`. To swap a photo, drop a file with the **same
name** over the existing one — no code changes required. Each collection's images,
copy, GPS coordinates and accent colour are defined in **`lib/projects.ts`**.

| Where | Path |
| --- | --- |
| Hero background | `public/assets/stylist/01.jpg` |
| About portrait | `public/assets/stylist/05.jpg` |
| Senza Limiti | `public/assets/projects/senza-limiti/01–06.jpg` |
| Anatomia della Gabbia | `public/assets/projects/anatomia-della-gabbia/01–10.jpg` |
| Ear Cuff | `public/assets/projects/ear-cuff/01,03–09.jpg` |

## Notes

- Fully responsive / mobile-first; custom cursor & smooth scroll auto-disable on touch
  and when `prefers-reduced-motion` is set.
- SEO-ready: per-route metadata, Open Graph images, semantic markup.
- The original unprocessed image dump (`publicassetsprojects/`) is git-ignored.
