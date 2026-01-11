# Design Context

## Direction
Warm & Personal - approachable, trustworthy, human connection

---

## Color Palette

### Primary Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | #2D4A6F | Deep trust blue |
| `--color-primary-light` | #3D5A80 | Lighter blue |
| `--color-primary-dark` | #1D3557 | Darker blue, headings |

### Accent Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-accent` | #E07A5F | Warm coral (CTAs, highlights) |
| `--color-accent-light` | #F4A261 | Golden orange |
| `--color-accent-dark` | #C45C3D | Deep coral |

### Neutral Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-warm` | #F8EDE3 | Warm cream background |
| `--color-warm-light` | #FDF9F5 | Light cream |
| `--color-warm-dark` | #E8D5C4 | Darker cream, borders |
| `--color-white` | #FFFFFF | White |
| `--color-black` | #1A1A2E | Near black |

### Text Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-text` | #2B2D42 | Rich charcoal (body) |
| `--color-text-light` | #5C5E6E | Muted text |
| `--color-text-muted` | #8D99AE | Light muted |

### Gradients
| Token | Value |
|-------|-------|
| `--gradient-warm` | `linear-gradient(135deg, var(--color-warm-light) 0%, var(--color-warm) 100%)` |
| `--gradient-hero` | `linear-gradient(180deg, var(--color-warm-light) 0%, var(--color-white) 100%)` |
| `--gradient-accent` | `linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%)` |
| `--gradient-overlay` | `linear-gradient(180deg, rgba(45, 74, 111, 0.9) 0%, rgba(29, 53, 87, 0.95) 100%)` |

---

## Typography

### Font Families
| Token | Value | Usage |
|-------|-------|-------|
| `--font-family-heading` | `'Georgia', 'Times New Roman', serif` | Headings |
| `--font-family-body` | `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif` | Body text |

### Font Sizes (Fluid with clamp)
| Token | Value | Usage |
|-------|-------|-------|
| `--font-size-xs` | 0.75rem → 0.875rem | Small labels |
| `--font-size-sm` | 0.875rem → 1rem | Subtitles, badges |
| `--font-size-base` | 1rem → 1.125rem | Body text |
| `--font-size-lg` | 1.125rem → 1.25rem | Large body |
| `--font-size-xl` | 1.25rem → 1.5rem | Card titles |
| `--font-size-2xl` | 1.5rem → 2rem | Section titles |
| `--font-size-3xl` | 2rem → 3rem | H3 |
| `--font-size-4xl` | 2.5rem → 4rem | H2 |
| `--font-size-5xl` | 3rem → 5rem | H1 |

### Font Weights
| Token | Value |
|-------|-------|
| `--font-weight-normal` | 400 |
| `--font-weight-medium` | 500 |
| `--font-weight-semibold` | 600 |
| `--font-weight-bold` | 700 |

### Line Heights
| Token | Value | Usage |
|-------|-------|-------|
| `--line-height-tight` | 1.2 | Headings |
| `--line-height-normal` | 1.6 | Body |
| `--line-height-relaxed` | 1.8 | Descriptions |

---

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 0.25rem (4px) | Tiny gaps |
| `--space-sm` | 0.5rem (8px) | Small gaps |
| `--space-md` | 1rem (16px) | Default |
| `--space-lg` | 1.5rem (24px) | Cards, sections |
| `--space-xl` | 2rem (32px) | Large gaps |
| `--space-2xl` | 3rem (48px) | Card padding |
| `--space-3xl` | 4rem (64px) | Section gaps |
| `--space-4xl` | 6rem (96px) | Large sections |
| `--space-5xl` | 8rem (128px) | Section padding |

---

## Section Patterns

### Standard Section
```css
.section {
  padding: var(--space-5xl) 0;  /* 8rem / 128px */
}
```

### Hero Section
```css
.hero {
  min-height: 100vh;
  padding-top: var(--space-5xl);
  background: var(--gradient-hero);
}
```

### Dark Section (Testimonials, CTA)
```css
.section--dark {
  background: var(--gradient-overlay);
  color: var(--color-white);
}
```

### Warm Section
```css
.section--warm {
  background: var(--gradient-warm);
}
```

### Section Header Pattern
```css
.services__header,
.testimonials__header {
  text-align: center;
  max-width: var(--container-narrow);  /* 800px */
  margin: 0 auto var(--space-4xl);     /* 6rem below */
}
```

---

## Layout

### Container Widths
| Token | Value | Usage |
|-------|-------|-------|
| `--container-max` | 1200px | Default container |
| `--container-narrow` | 800px | Text-heavy sections |
| `--container-wide` | 1400px | Full-width sections |

### Container
```css
.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--space-lg);  /* 1.5rem sides */
}
```

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Small elements |
| `--radius-md` | 8px | Inputs, small cards |
| `--radius-lg` | 16px | Info cards |
| `--radius-xl` | 24px | Main cards, images |
| `--radius-2xl` | 32px | Hero containers |
| `--radius-full` | 9999px | Pills, avatars |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(43, 45, 66, 0.08)` | Subtle |
| `--shadow-md` | `0 4px 12px rgba(43, 45, 66, 0.1)` | Cards default |
| `--shadow-lg` | `0 8px 30px rgba(43, 45, 66, 0.12)` | Cards hover |
| `--shadow-xl` | `0 20px 50px rgba(43, 45, 66, 0.15)` | Hero images |
| `--shadow-glow` | `0 0 40px rgba(224, 122, 95, 0.2)` | Accent glow |

---

## Card Patterns

### Standard Card
```css
.card {
  background: var(--color-white);
  border-radius: var(--radius-xl);     /* 24px */
  padding: var(--space-2xl);           /* 3rem / 48px */
  box-shadow: var(--shadow-md);
}
.card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}
```

### Service Card
```css
.service-card {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  box-shadow: var(--shadow-md);
}
.service-card::before {  /* accent bar on hover */
  height: 4px;
  background: var(--gradient-accent);
}
```

### Feature Card
```css
.feature-card {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  box-shadow: var(--shadow-md);
}
.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}
```

### Info Card
```css
.info-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);     /* 16px */
  padding: var(--space-xl);            /* 2rem / 32px */
  box-shadow: 0 4px 20px rgba(43, 45, 66, 0.18);
  border: 2px solid transparent;
}
.info-card:hover {
  transform: translateY(-6px) scale(1.02);
  border-color: var(--color-accent);
}
```

### Testimonial Card
```css
.testimonial-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## Buttons

### Primary Button
```css
.btn--primary {
  padding: var(--space-md) var(--space-xl);  /* 1rem 2rem */
  background: var(--gradient-accent);
  color: var(--color-white);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-md), 0 4px 15px rgba(224, 122, 95, 0.3);
}
.btn--primary:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: var(--shadow-lg), 0 8px 25px rgba(224, 122, 95, 0.4);
}
```

### Secondary Button
```css
.btn--secondary {
  padding: var(--space-md) var(--space-xl);
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-full);
}
.btn--secondary:hover {
  background: var(--color-primary);
  color: var(--color-white);
  transform: translateY(-2px);
}
```

### Button Sizes
| Variant | Padding |
|---------|---------|
| Default | `var(--space-md) var(--space-xl)` (1rem 2rem) |
| Large | `var(--space-lg) var(--space-2xl)` (1.5rem 3rem) |
| Small | `var(--space-sm) var(--space-md)` (0.5rem 1rem) |

### Outline Light (for dark backgrounds)
```css
.btn--outline-light {
  background: transparent;
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.6);
}
.btn--outline-light:hover {
  background: #fff;
  color: var(--color-primary-dark);
}
```

---

## Animations

### Scroll-Triggered
- Trigger: Intersection Observer
- Classes: `.animate-fade-in`, `.animate-slide-left`, `.animate-slide-right`, `.animate-scale`
- Active class: `.is-visible`

### Durations
| Token | Value |
|-------|-------|
| `--duration-fast` | 150ms |
| `--duration-normal` | 300ms |
| `--duration-slow` | 500ms |
| `--duration-slower` | 800ms |

### Easing
| Token | Value |
|-------|-------|
| `--ease-out` | `cubic-bezier(0.33, 1, 0.68, 1)` |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

### Stagger Children
```css
.stagger-children > *:nth-child(1) { transition-delay: 0ms; }
.stagger-children > *:nth-child(2) { transition-delay: 100ms; }
/* ... up to 6 children */
```

---

## Hero Image Treatment

- **Style:** Stacked Frames (user approved)
- Two decorative frames offset behind photo
- Back frame: coral (`--color-accent`), -6deg rotation, 15% opacity
- Middle frame: lighter coral (`--color-accent-light`), -3deg rotation, 25% opacity
- Hover: frames shift further, image lifts slightly

---

## Design Verification Checklist

### Section Consistency
- [ ] Section padding: `var(--space-5xl)` (8rem) top/bottom
- [ ] Section header centered with `max-width: var(--container-narrow)` (800px)
- [ ] Section header margin-bottom: `var(--space-4xl)` (6rem)

### Card Consistency
- [ ] Card background: `var(--color-white)`
- [ ] Card border-radius: `var(--radius-xl)` (24px) or `var(--radius-lg)` (16px)
- [ ] Card padding: `var(--space-2xl)` (3rem) or `var(--space-xl)` (2rem)
- [ ] Card shadow: `var(--shadow-md)` default, `var(--shadow-xl)` on hover
- [ ] Card hover: `translateY(-8px)` or `translateY(-6px)`

### Button Consistency
- [ ] Primary: gradient accent background, white text, full radius
- [ ] Secondary: transparent, primary border and text
- [ ] Padding: `1rem 2rem` (normal), `1.5rem 3rem` (large)
- [ ] Hover lift: `translateY(-3px)` primary, `translateY(-2px)` secondary

### Color Usage
- [ ] Only use design system colors (no hardcoded values)
- [ ] Headings: `var(--color-primary-dark)`
- [ ] Body text: `var(--color-text)` or `var(--color-text-light)`
- [ ] Accents: `var(--color-accent)` family only
- [ ] Backgrounds: `var(--color-white)`, `var(--color-warm)` family, or gradients

### Spacing Consistency
- [ ] Use spacing scale tokens (`--space-*`)
- [ ] Grid gaps typically `var(--space-xl)` or `var(--space-2xl)`
- [ ] Container padding: `var(--space-lg)` horizontal

### Animation Consistency
- [ ] Scroll animations use `.animate-fade-in`, `.animate-slide-*`, `.animate-scale`
- [ ] Stagger with `.stagger-children` (100ms delay between children)
- [ ] Card hover transitions: `var(--duration-normal)` with `var(--ease-spring)`
