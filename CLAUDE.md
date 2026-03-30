# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build (also runs TypeScript check)
npm run lint     # ESLint
npm run start    # Serve production build
```

There are no tests in this project.

## Stack

- **Next.js 16.2** (App Router, `"use client"` components throughout)
- **React 19** / **TypeScript**
- **Tailwind CSS v4** — configured via `src/app/globals.css` with `@import "tailwindcss"` and `@theme inline {}`. There is **no `tailwind.config.ts`**.
- **Framer Motion 12** — used heavily for animations
- **Lucide React** — icon library

## Architecture

Single-page site. `src/app/page.tsx` renders all sections in order:

```
Navbar → Hero → Partners → Services → About → AppointmentCTA → MTD → Contact → Footer
```

All components are in `src/components/`. `HeroGraphic.tsx` is a standalone animated SVG/canvas component used only inside `Hero.tsx`.

## Design System

Brand colors are CSS custom properties defined in `globals.css`:

| Token | Value | Usage |
|---|---|---|
| `--primary` | `#0E5D6B` | Deep teal — primary brand |
| `--primary-dark` | `#0A3F4A` | Dark teal — hero bg, footer bg |
| `--secondary` | `#D3B267` | Gold — CTAs, accents |
| `--bg` | `#F8FAFC` | Page background |

Colors are used as raw hex strings in inline `style={{}}` props (not Tailwind utilities), because the palette predates utility generation.

Fonts are loaded via `next/font/google` in `layout.tsx` and exposed as CSS variables:
- `var(--font-lexend)` — headings (`Lexend`)
- `var(--font-source-sans)` — body (`Source_Sans_3`)

## Animation Patterns

**Scroll-triggered**: `useInView` from Framer Motion with `once: true, margin: "-40px"`. Components animate from `opacity: 0, y: 40` to visible on entry.

**Mouse parallax** (Hero section): `useMotionValue` → `useSpring` → `useTransform` maps normalized cursor position (−1 to 1) to pixel offsets. Multiple layers move at different depths/directions.

**Spring bars** (HeroGraphic): Low-damping springs (`stiffness: 85, damping: 8`) create an overshoot "growth pop" effect on bar chart bars.

**Cursor spotlight**: Radial gradient centered on cursor coordinates, tracked via `onMouseMove` on the section/card element. Used in both `Hero.tsx` and each `ServiceCard` in `Services.tsx`.

## Content Source

All copy, contact info, and service descriptions originate from `Content.md` at the project root.
