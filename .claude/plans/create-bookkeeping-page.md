# Plan: Create Dedicated Book Keeping Service Page

## Context
The current site is a single-page layout where all services are displayed in a grid with "Learn More" links that anchor to the contact section. The requirement is to create a standalone page for the Book Keeping service that can be accessed both from the top navigation menu and from the "Learn More" link on the service card.

## Design System Consistency
- **Colors**: Primary (#0E5D6B), Secondary (#D3B267), Background (#F8FAFC), Text (#1A2B2E, #475569)
- **Fonts**: Lexend (headings), Source Sans 3 (body) via CSS variables
- **Animations**: Framer Motion with `useInView` scroll triggers, cursor spotlight effects, spring-based hover states
- **Component patterns**: ServiceCard style, gradient backgrounds, glass-like overlays

## Implementation Steps

### 1. Update Navigation (`src/components/Navbar.tsx`)
- Change all nav link `href` attributes to absolute paths for cross-page navigation:
  - Home → `/`
  - Services → `/#services`
  - About → `/#about`
  - MTD ITSA → `/#mtd`
  - Contact → `/#contact`
- Add new "Book Keeping" nav item after Services (both desktop and mobile menus)
- Maintain current styling, scrolled state behavior, and mobile hamburger menu

### 2. Update Footer (`src/components/Footer.tsx`)
- Change quickLinks to absolute paths:
  - Home → `/`
  - About Us → `/#about`
  - Services → `/#services`
  - MTD ITSA → `/#mtd`
  - Contact → `/#contact`
- Update service list links from `#services` to `/#services`
- Update MTD promo link from `#mtd` to `/#mtd`

### 3. Update Services Grid (`src/components/Services.tsx`)
- Modify the Book Keeping service object:
  - Change `href: "#contact"` to `href: "/book-keeping"`
- All other services remain unchanged (still anchor to contact)

### 4. Create Book Keeping Page (`src/app/book-keeping/page.tsx`)
Structure:
```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, CheckCircle2, ArrowRight, CalendarCheck, TrendingUp, Shield, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppointmentCTA from "@/components/AppointmentCTA";
import Contact from "@/components/Contact";
```

Page sections:
- **Hero**: "Book Keeping: Accurate Records, Effortless Management" with animated intro text, brief tagline, and CTA button. Include cursor spotlight effect similar to ServiceCard (radial gradient tracking mouse). Use gradient background (teal).
- **Introduction**: Scroll-in fade-up section with the main descriptive paragraphs from Content.md (lines 78-87).
- **Key Benefits**: Grid of 4 cards with icons and titles:
  - Accurate Records (BookOpen)
  - Focus on Growth (TrendingUp)
  - Customized Solutions (Shield/Adjustments)
  - Financial Clarity (CheckCircle2)
  Style similar to ServiceCard: white background, border, shadow, spotlight on hover, icon with rounded bg, top accent bar on hover.
- **Detailed Content**: Additional paragraphs from Content.md (lines 88-93) as a centered text block with max-width.
- **CTA Section**: Include the existing `<AppointmentCTA />` component (it links to `#contact`).
- **Contact Section**: Include the existing `<Contact />` component (has `id="contact"`).
- **Footer**: Include `<Footer />`.

All sections should have `useInView` with `once: true, margin: "-60px"` for scroll-triggered fade-up animations. Consistent padding (`py-24 lg:py-32` for full sections, `py-16` for tighter spacing). Use `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` for container width.

### 5. Tests & Verification
- Start dev server: `npm run dev`
- Visit `/book-keeping` and verify:
  - Page loads without errors
  - Hero section displays with correct heading and spotlight effect
  - Scroll animations trigger properly
  - All text content matches Content.md
  - Color scheme matches primary/secondary tokens
  - AppointmentCTA and Contact anchor linkage works
- From home page:
  - Click "Book Keeping" in navbar → navigates to dedicated page
  - Click "Learn More" on Book Keeping service card → navigates to dedicated page
- From dedicated page:
  - Click Navbar links to other pages (Home, Services, About, MTD, Contact) → navigate correctly with scroll anchors
  - Mobile menu shows Book Keeping link
- Footer links correctly point to home page anchors

## Files to Modify
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/components/Services.tsx`
- Create `src/app/book-keeping/page.tsx`

## No Additional Dependencies
All required components and styles already exist in the codebase. No new packages needed.
