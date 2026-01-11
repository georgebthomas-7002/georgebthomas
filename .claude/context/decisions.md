# Decision Log

## 2025-01-09

### Tech Stack
- **CMS:** Sanity (free tier) - chosen over Contentful/Strapi
- **CSS:** Vanilla CSS - chosen over Tailwind/Styled Components
- **Design:** Warm & Personal - chosen over Bold/Minimalist

### Hero Image
- **Rejected:** Circular frame with blob animation (too busy)
- **Approved:** Stacked frames with depth effect

### Git Config
- Name: George B. Thomas
- Email: george@georgebthomas.com

### Sanity Schemas Deployed
- hero, about, service, testimonial, siteSettings

## 2025-01-10

### Website Audit (Ralph)
- **Voice:** Contractions always, "you/yours" > "I/we" (80%+), benefit-first
- **Copy pattern:** "You'll [verb]..." not "George [verbs]..."
- **CTAs:** Action + benefit ("Transform Your Team" not "Book Now")
- **Personal story:** OK to use "I" - authentic; pivot to "you" for values/principles

### Design Standards Enforced
- Section spacing: consistent padding from globals.css
- Cards: unified shadows, borders, border-radius
- Buttons: consistent sizing and hover states
- Colors: only design system (#2D4A6F, #E07A5F, #F8EDE3)

### Ralph Workflow
- Located: `scripts/ralph/`
- PRD → prd.json → `./ralph.sh` (10 iterations per run)
- Progress saved in progress.txt, picks up where left off
- Archive previous runs before new features

### Mobile Optimization (Comprehensive PRD)
**Standards Applied:**
- Touch targets: 44x44px minimum (Apple) / 48x48px (Google)
- Form inputs: 16px+ font size (prevents iOS zoom)
- Safe area insets: env() for notched devices
- Hover protection: `@media (hover: hover)` for desktop-only hover effects

**Mobile Menu Enhancements:**
- Body scroll lock when open
- Hamburger animates to X
- Focus trap for accessibility
- Click outside to close
- Escape key to close
- Full-width touch targets on nav links

**Sliders (Testimonial/Video):**
- Native touch swipe gestures (50px threshold)
- Swipe left = next, swipe right = previous

**Breakpoints Standardized:**
- 375px (small phones)
- 480px (mobile)
- 768px (tablet)
- 1024px (desktop)
- 1200px (large desktop)

**Device Priority:** iPhone-first (iOS Safari), Android Chrome secondary
