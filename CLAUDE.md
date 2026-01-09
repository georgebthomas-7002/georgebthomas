# George B. Thomas Professional Website

## Project Overview

A professional website for George B. Thomas, speaker and coach, built with Next.js, Vanilla CSS, Sanity CMS, and deployed on Vercel.

## Philosophy: Compounding Engineering

**Each unit of engineering work should make subsequent units of work easier—not harder.**

When working on this project, follow the compounding engineering process:

1. **Plan** → Understand the change needed and its impact
2. **Work** → Execute using the compound engineering workflow
3. **Review** → Verify changes work as expected
4. **Compound** → Update this CLAUDE.md with learnings

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework with App Router |
| TypeScript | Type safety |
| Vanilla CSS | Custom design system (no frameworks) |
| Sanity CMS | Headless content management |
| Vercel | Hosting and deployment |

## Project Structure

```
georgebthomas/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with SEO metadata
│   │   └── page.tsx            # Homepage with all sections
│   ├── components/
│   │   ├── Header.tsx          # Sticky navigation
│   │   ├── Hero.tsx            # Hero section with animations
│   │   ├── About.tsx           # Story section with stats
│   │   ├── Services.tsx        # Service cards
│   │   ├── Testimonials.tsx    # Testimonial carousel
│   │   ├── CTA.tsx             # Call-to-action
│   │   └── Footer.tsx          # Site footer
│   ├── lib/
│   │   └── useScrollAnimation.ts  # Intersection Observer hooks
│   ├── sanity/
│   │   ├── config.ts           # Project configuration
│   │   └── client.ts           # Sanity client & queries
│   └── styles/
│       └── globals.css         # Complete design system
├── .claude/
│   ├── agents/                 # Compound engineering agents
│   ├── commands/               # Workflow commands
│   ├── skills/                 # Reusable skills
│   └── plans/                  # Engineering plans
└── public/
    └── images/                 # Static assets
```

## Available Compound Engineering Commands

| Command | Purpose |
|---------|---------|
| `/workflows:plan` | Create implementation plans for new features |
| `/workflows:work` | Execute work items systematically |
| `/workflows:review` | Conduct code reviews before merging |
| `/workflows:compound` | Document solved problems and learnings |

## Sanity CMS Configuration

- **Project ID**: `lw5fs0o8`
- **Dataset**: `production`
- **Studio**: https://www.sanity.io/manage/project/lw5fs0o8

### Content Types

| Type | Purpose |
|------|---------|
| `hero` | Hero section content |
| `about` | About section with stats |
| `service` | Individual service cards |
| `testimonial` | Client testimonials |
| `siteSettings` | Global site configuration |

## Design System

The CSS design system uses custom properties for consistency:

### Colors
- `--color-primary`: #2D4A6F (Deep trust blue)
- `--color-accent`: #E07A5F (Warm coral)
- `--color-warm`: #F8EDE3 (Warm cream)

### Typography
- Headings: Georgia (serif)
- Body: System UI stack (sans-serif)

### Animations
- `.animate-fade-in` - Fade in on scroll
- `.animate-slide-left` / `.animate-slide-right` - Slide animations
- `.animate-scale` - Scale up animation
- `.stagger-children` - Staggered child animations

## Deployment

### Automatic Deployment
Push to `main` branch triggers automatic Vercel deployment.

### Manual Deployment
```bash
npx vercel --prod
```

### URLs
- **Production**: https://georgebthomas.vercel.app
- **GitHub**: https://github.com/georgebthomas-7002/georgebthomas

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Key Learnings

_This section captures important learnings as we work on this project._

### 2025-01-09: Initial Project Setup

Created the foundational website with:
- Warm & personal design direction
- Scroll-driven animations using Intersection Observer
- Sanity CMS integration with 5 content types
- Vercel deployment with automatic deploys from GitHub

**Learning:** Using vanilla CSS with custom properties provides full control over the design system while keeping the codebase simple and maintainable. The scroll animations use the Intersection Observer API for performance.

---

## Quick Reference

### Adding a New Section

1. Create component in `src/components/NewSection.tsx`
2. Add to exports in `src/components/index.ts`
3. Import and add to `src/app/page.tsx`
4. Add corresponding Sanity schema if needed

### Adding Sanity Content Type

1. Deploy schema using Sanity MCP tools
2. Add GROQ query to `src/sanity/client.ts`
3. Create/update component to fetch and display content

### Updating Styles

All styles are in `src/styles/globals.css`:
- Design tokens: Lines 1-100
- Base styles: Lines 100-200
- Components: Lines 200+
- Animations: Search for `@keyframes` or `.animate-`
