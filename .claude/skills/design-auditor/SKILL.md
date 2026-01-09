---
name: design-auditor
description: Audit digital designs (websites, apps, SaaS interfaces) and provide specific, actionable improvements to elevate work from good to award-winning. Use when reviewing mockups, live sites, screenshots, or design files. Triggers on requests to review, audit, critique, or improve designs, or when asked to identify what's missing from a design.
---

# Design Auditor

Evaluate digital designs against patterns from award-winning designers (Awwwards, CSS Design Awards, Red Dot, Apple Design Awards 2020-2025). Provide specific, prioritized improvements.

## Core Philosophy

Award-winning design isn't magic. It's comprehensive intentionality. The gap between 80% and 100% lies in:
- **Completeness**: Designing all states, not just the happy path
- **Consistency**: Similar elements behave similarly
- **Polish**: Hundreds of micro-decisions executed with purpose
- **Performance**: Technical excellence enabling rich interactions

## Audit Framework

Evaluate designs across these six dimensions. Score each 1-10, where 8+ indicates award-level quality.

### 1. Typography Architecture

**Check for:**
- Dramatic size hierarchy (headlines 80-200px desktop, clear contrast between levels)
- Maximum 2-3 font families with intentional weight usage
- Variable fonts for smooth transitions and reduced requests
- Consistent line-height and letter-spacing system
- Responsive scaling that maintains hierarchy on mobile

**Red flags:**
- Subtle size differences between heading levels
- More than 3 font families
- Inconsistent spacing between text elements
- Body text below 16px on mobile

### 2. Animation and Motion

**Check for:**
- Purpose-driven animation (guides attention, confirms actions, expresses brand)
- Consistent timing across similar interactions (200-400ms for micro-interactions)
- Scroll-triggered reveals with logical sequencing
- Smooth easing curves (avoid linear for UI, use ease-out for exits)
- Reduced-motion alternative respected

**Red flags:**
- Animation for decoration only
- Inconsistent timing between similar elements
- Jarring or abrupt transitions
- No hover states on interactive elements
- Missing loading state animations

### 3. Layout and Spacing

**Check for:**
- Structured asymmetry (underlying grid with intentional violations)
- Generous white space (40-60% more padding than "safe" design)
- Bento-style cards with varying sizes creating visual rhythm
- Clear content grouping through proximity
- Mobile layout that feels native, not squeezed

**Red flags:**
- Rigid symmetry throughout
- Cramped spacing signaling amateur work
- Inconsistent padding between similar components
- Responsive breakpoints that break visual relationships

### 4. Color and Contrast

**Check for:**
- WCAG 2.1 AA compliance minimum (4.5:1 for body text)
- Dark mode using dark gray (#121212-#1a1a1a), not pure black
- Desaturated accent colors in dark mode
- Systematic accent usage (highlights guide attention predictably)
- Glassmorphism effects used sparingly and with purpose

**Red flags:**
- Pure black backgrounds (#000000)
- Accent colors competing for attention
- Insufficient contrast for accessibility
- Color as only differentiator (fails for colorblind users)

### 5. Interaction Completeness

**Check for all states:**
- Buttons: default, hover, active, disabled, loading, success, error (6 minimum)
- Forms: empty, focused, filled, validating, valid, invalid, disabled
- Links: default, hover, visited, active, focus
- Cards/containers: default, hover, selected, loading

**Check for edge cases:**
- Empty states with guidance and CTAs
- Error states with human-readable messages and recovery paths
- Loading states with brand personality
- 404 pages as brand moments
- Skeleton screens during data fetching

**Red flags:**
- Missing hover states
- Generic error messages ("Something went wrong")
- Blank empty states
- No loading indicators
- Form validation only on submit

### 6. Technical Excellence

**Check for:**
- Core Web Vitals compliance (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- Touch targets 44x44px minimum
- Semantic HTML structure
- Keyboard navigation functional
- Screen reader compatibility
- Images optimized (WebP/AVIF, lazy loading, proper srcset)

**Red flags:**
- Layout shift during load
- Tiny tap targets on mobile
- Broken keyboard focus order
- Missing alt text on meaningful images

## The 10 Non-Negotiable Patterns

Award-winning sites consistently include:

1. **Variable fonts** with dramatic size hierarchy
2. **GSAP-powered scroll animations** with purposeful triggers
3. **Bento-style asymmetric grids** within structured systems
4. **Dark mode implementation** using dark gray, not pure black
5. **Custom cursor behaviors** responding to context
6. **Smooth scrolling** via Lenis or equivalent
7. **Complete state design** for all interactive elements
8. **Micro-interaction consistency** across similar actions
9. **Performance optimization** enabling rich interactions
10. **Accessibility compliance** as foundation, not afterthought

## Audit Output Format

Structure feedback as:

```
## Design Audit: [Name/Description]

### Overall Score: X/10
[One sentence summary of current state]

### Critical Issues (Fix First)
1. [Issue]: [Specific problem] → [Specific fix]
2. ...

### High-Impact Improvements
1. [Area]: [Current state] → [Award-level state]
2. ...

### Polish Opportunities
1. [Detail]: [Enhancement that elevates from good to exceptional]
2. ...

### What's Working Well
- [Specific strength to preserve]
- ...
```

## Quick Audit Checklist

For rapid assessment, check these 10 items:

- [ ] Typography has 3+ distinct hierarchy levels with dramatic contrast
- [ ] All buttons have hover states with smooth transitions
- [ ] Empty/error/loading states are designed, not default
- [ ] White space is generous, not cramped
- [ ] Mobile experience feels native, not responsive afterthought
- [ ] Animation timing is consistent across similar interactions
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Touch targets are adequately sized (44x44px)
- [ ] Form validation shows inline, helpful feedback
- [ ] Page loads without visible layout shift

Score: Count of checked items
- 9-10: Award-ready
- 7-8: Strong foundation, needs polish
- 5-6: Good start, significant gaps
- Below 5: Fundamental improvements needed

## Detailed Reference

For comprehensive audit criteria, see:
- [edge-cases.md](./references/edge-cases.md) - Complete edge case checklist
- [animation-patterns.md](./references/animation-patterns.md) - Motion design standards
- [typography-system.md](./references/typography-system.md) - Type hierarchy specifications
