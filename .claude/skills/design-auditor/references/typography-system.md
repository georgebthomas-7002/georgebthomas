# Typography System for Award-Winning Design

Typography is the foundation of visual hierarchy. Award-winning sites use type as architecture.

## Type Scale Principles

### Dramatic Contrast
Award-winning sites use **dramatic size differences**, not subtle gradations.

**Weak hierarchy (amateur):**
- H1: 32px
- H2: 28px
- H3: 24px
- Body: 16px

**Strong hierarchy (award-level):**
- H1: 80-200px (display/hero)
- H2: 48-64px
- H3: 32-40px
- Body: 18-20px

The ratio between levels should be obvious at a glance.

### Recommended Type Scales

**Modular scale 1.5 (dramatic):**
16, 24, 36, 54, 81, 121px

**Modular scale 1.333 (balanced):**
16, 21, 28, 38, 50, 67px

**Custom scales** are fine if they maintain clear hierarchy.

## Font Pairing Guidelines

### Maximum 2-3 Families

**Pattern 1: Display + Body**
- Display: High-personality for headlines (variable or distinct weight range)
- Body: Neutral, highly readable for text

**Pattern 2: Sans + Serif**
- Sans: Headlines (modern, bold)
- Serif: Body (elegant, readable)

**Pattern 3: Single Family**
- One variable font with wide weight range
- Uses weight contrast for hierarchy

### Award-Winning Font Choices

**Display favorites:**
- Inter (variable, modern sans)
- Space Grotesk (geometric, tech-forward)
- Clash Display (bold, distinctive)
- Cabinet Grotesk (friendly, rounded)

**Body favorites:**
- Inter (highly legible, variable)
- Source Sans Pro (neutral, accessible)
- Roboto (clean, versatile)
- IBM Plex Sans (professional, open source)

**Serif accents:**
- Playfair Display (elegant headlines)
- Lora (readable body text)
- Freight Text (refined, editorial)

## Variable Font Benefits

Variable fonts enable:
- Smooth weight transitions on hover
- Responsive typography without multiple files
- Reduced HTTP requests
- Precise optical sizing

**Usage in award-winning sites:** 42% of Awwwards-featured sites use variable fonts.

## Spacing System

### Line Height (leading)

- Headlines: 1.0-1.2 (tight)
- Subheadlines: 1.2-1.3
- Body text: 1.5-1.7 (comfortable reading)
- Small text/captions: 1.4-1.5

### Letter Spacing (tracking)

- Headlines (large): -0.02 to -0.05em (tighten)
- Body text: 0 (default)
- All caps: +0.05 to +0.1em (open up)
- Small text: +0.01 to +0.02em (slight opening)

### Paragraph Spacing

- Between paragraphs: 1-1.5x the line height
- After headings: 0.5-1x the heading line height
- Before headings: 1.5-2x paragraph spacing

## Responsive Typography

### Fluid Type Scale

Use clamp() for smooth scaling:
```css
font-size: clamp(2rem, 5vw + 1rem, 6rem);
```

**Pattern:**
- Minimum: readable on mobile
- Preferred: viewport-relative
- Maximum: doesn't overwhelm on desktop

### Breakpoint Recommendations

- **Mobile (320-480px)**: Body 16-18px, H1 32-48px
- **Tablet (481-768px)**: Body 17-19px, H1 48-72px
- **Desktop (769-1200px)**: Body 18-20px, H1 72-120px
- **Large (1200px+)**: Body 18-22px, H1 96-200px

## Kinetic Typography

Animated text appears on 60%+ of Awwwards Site of the Day winners.

### Common Patterns

**Split text animation:**
- Characters or words animate individually
- Stagger 20-50ms between elements
- Use GSAP SplitText or similar

**Reveal on scroll:**
- Text reveals as user scrolls
- Clip-path or transform-based
- Duration: 400-600ms

**Hover effects:**
- Weight shifts (variable fonts)
- Color transitions
- Underline animations

### Implementation Notes

- Use GSAP for complex sequences
- Ensure text is selectable after animation
- Provide reduced-motion alternative
- Don't animate body text (readability)

## Audit Checklist

- [ ] Clear hierarchy visible at a glance (3+ distinct levels)
- [ ] Maximum 2-3 font families
- [ ] Headlines are dramatically larger than body (3x+ ratio)
- [ ] Body text is 16px+ on all devices
- [ ] Line height is comfortable for reading (1.5+ for body)
- [ ] Letter spacing is intentional (tightened headlines, opened all-caps)
- [ ] Responsive scaling maintains hierarchy
- [ ] Variable fonts used where beneficial
- [ ] Text animations serve purpose (not decoration)
- [ ] All text meets WCAG contrast requirements

## Common Mistakes

- **Font soup**: More than 3 families creates chaos
- **Subtle hierarchy**: Size differences too small to scan
- **Cramped leading**: Line height too tight for readability
- **Tiny mobile text**: Body text below 16px strains eyes
- **Inconsistent spacing**: Different paragraphs spaced differently
- **Weight confusion**: Too many weights without clear roles
- **Animation overload**: Every headline animates, nothing stands out
