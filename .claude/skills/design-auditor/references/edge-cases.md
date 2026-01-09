# Edge Case Design Checklist

Award-winning designs treat edge cases as brand opportunities, not afterthoughts.

## Empty States

Every empty state must include:
- [ ] Visual element (illustration, icon, or brand moment)
- [ ] Clear explanation of what goes here
- [ ] Primary CTA to populate the state
- [ ] Secondary guidance if applicable

**Examples of excellent empty states:**
- Slack: Witty copy that matches brand voice
- Todoist: Celebratory "all done" with confetti
- Linear: Clean guidance with keyboard shortcut hints

## Loading States

- [ ] Skeleton screens for content areas (not spinners)
- [ ] Progress indicators for long operations (upload, export)
- [ ] Optimistic UI for instant-feeling interactions
- [ ] Brand personality in waiting moments
- [ ] Reduced-motion alternative (no pulsing for users who disabled animation)

**Timing guidelines:**
- 0-100ms: No indicator needed (feels instant)
- 100-300ms: Subtle transition or skeleton
- 300ms-1s: Skeleton screens
- 1s+: Progress indicator with context

## Error States

Every error must provide:
- [ ] Human-readable message (not error codes)
- [ ] What went wrong in plain language
- [ ] How to fix it (recovery path)
- [ ] Way to get help if self-service fails

**Error message formula:**
"[What happened]. [Why it might have happened]. [What to do next]."

Bad: "Error 500"
Good: "We couldn't save your changes. This usually means a connection issue. Try again, or contact support if it keeps happening."

## Form Validation

- [ ] Inline validation (not just on submit)
- [ ] Validation triggers after field blur, not on every keystroke
- [ ] Success states for valid fields (subtle checkmark)
- [ ] Error messages below the field, not in alerts
- [ ] Focus moves to first error on submit
- [ ] Password requirements shown before typing, not after failure

## Button States

Every button needs all six states:
1. **Default**: Base appearance
2. **Hover**: Visual feedback on cursor proximity
3. **Active/Pressed**: Feedback during click
4. **Disabled**: Clearly inactive with reduced opacity
5. **Loading**: Spinner or animation replacing text
6. **Success/Error**: Confirmation feedback after action

## 404 and Error Pages

- [ ] On-brand visual treatment
- [ ] Clear explanation (page doesn't exist, etc.)
- [ ] Search functionality or navigation
- [ ] Link to homepage
- [ ] Optional: Easter egg or brand moment

## Offline States

For apps with offline capability:
- [ ] Clear offline indicator
- [ ] Explanation of limited functionality
- [ ] Queue for actions to sync later
- [ ] Notification when back online

## Permission States

- [ ] Pre-permission explanation (before browser prompt)
- [ ] Graceful degradation if denied
- [ ] Settings path to change permission later
- [ ] Alternative functionality when permission unavailable

## Session States

- [ ] Session timeout warning before automatic logout
- [ ] Save draft before session expires
- [ ] Seamless re-authentication without losing work
- [ ] Clear feedback when session restored

## Data States

- [ ] First-time user (onboarding emphasis)
- [ ] Power user (shortcuts, bulk actions)
- [ ] Low data (still functional with partial content)
- [ ] Large dataset (pagination, virtual scrolling, performance)
- [ ] Stale data (refresh indicators, timestamps)
