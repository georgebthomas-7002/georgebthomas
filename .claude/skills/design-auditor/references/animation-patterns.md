# Animation Patterns for Award-Winning Design

Motion creates emotion. Animation is communication, not decoration.

## Animation Purpose Framework

Every animation must serve at least one purpose:

1. **Guide attention**: Direct user focus to important elements
2. **Confirm action**: Acknowledge user input
3. **Express brand**: Reinforce personality and values
4. **Explain relationships**: Show how elements connect
5. **Smooth transitions**: Reduce cognitive load between states

If animation serves no purpose, remove it.

## Timing Standards

### Micro-interactions
- Duration: 150-300ms
- Use for: Button hovers, toggles, small state changes
- Easing: ease-out or custom spring

### UI Transitions
- Duration: 200-400ms
- Use for: Modal opens, page transitions, card expansions
- Easing: ease-in-out or custom cubic-bezier

### Content Reveals
- Duration: 400-800ms
- Use for: Scroll animations, entrance sequences
- Easing: ease-out with slight overshoot for playfulness

### Complex Sequences
- Duration: 600-1200ms total
- Use for: Onboarding, hero animations, storytelling
- Easing: Orchestrated with staggered timing

## Easing Guidelines

**Never use linear** for UI animation (feels mechanical)

**ease-out** (deceleration):
- Use for elements entering the screen
- Feels natural, like objects coming to rest

**ease-in** (acceleration):
- Use sparingly for elements exiting
- Objects leaving pick up speed

**ease-in-out** (acceleration then deceleration):
- Use for elements moving position
- Natural for object movement

**Custom springs**:
- Use for playful, brand-forward moments
- Parameters: stiffness, damping, mass

## Scroll Animation Patterns

### Fade and Rise
Element fades in while moving up 20-40px
- Trigger: When element enters viewport (10-20% visible)
- Duration: 400-600ms
- Stagger: 50-100ms between elements

### Parallax
Background moves slower than foreground
- Ratio: 0.3-0.5x scroll speed for subtle effect
- Warning: Disable for reduced-motion preference

### Reveal on Scroll
Content reveals as user scrolls
- Use clip-path or transform for smooth performance
- Avoid animating width/height (causes reflow)

### Sticky Transitions
Element behavior changes at scroll threshold
- Use Intersection Observer for detection
- Smooth transition between states

## Hover State Patterns

### Scale
- Subtle: 1.02-1.05 transform scale
- Obvious: 1.05-1.1 transform scale
- Always use transform, not width/height

### Lift (Shadow)
- Add/increase box-shadow on hover
- Combine with slight translateY(-2px to -4px)
- Creates depth and emphasis

### Color Shift
- Background color transition
- Border color or width change
- Duration: 150-200ms

### Reveal
- Show additional content on hover
- Use opacity and transform together
- Ensure touch alternative exists

## Page Transition Patterns

### Cross-fade
- Simple opacity transition
- Duration: 200-300ms
- Works for any page pair

### Slide
- Content slides in from direction
- Match navigation direction (left nav = left slide)
- Duration: 300-400ms

### Clip-path
- Reveal new page with shape animation
- More dramatic, use for emphasis
- Duration: 400-600ms

### Shared Element
- Element animates between positions
- Requires FLIP technique
- Duration: 300-500ms

## Performance Rules

1. **Only animate transform and opacity** (GPU accelerated)
2. **Avoid animating**: width, height, margin, padding, top/left
3. **Use will-change sparingly** (only on elements about to animate)
4. **Test on low-end devices** (animation should degrade gracefully)
5. **Respect prefers-reduced-motion** (disable or simplify all animation)

## Reduced Motion Implementation

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Or selectively disable:
- Remove parallax entirely
- Keep essential feedback (button press confirmation)
- Replace motion with opacity changes

## Common Mistakes

- **Over-animation**: Too many things moving creates chaos
- **Slow timing**: Anything over 500ms for UI feels sluggish
- **No consistency**: Similar elements animate differently
- **Competing animations**: Multiple focal points confuse users
- **Ignoring performance**: Beautiful animation that janks isn't beautiful
- **Forgetting accessibility**: No reduced-motion support
