# Coaching Products & Payments

George B. Thomas offers 1:1 coaching packages through the website.

## Coaching Packages

| Package | Price | Hours | Rate | Description |
|---------|-------|-------|------|-------------|
| **Activation Meeting** | $99 | 45 min | N/A | A focused discovery session to map out goals and create a clear path forward |
| **Starter** | $2,000 | 10 hrs | $200/hr | Entry-level coaching package for focused transformation |
| **Growth** | $4,000 | 20 hrs | $200/hr | Mid-tier package for deeper development |
| **Transformation** | $6,000 | 30 hrs | $200/hr | Comprehensive coaching for complete transformation |

## Coaching Topics / Focus Areas

1. **HubSpot Strategy & Implementation** - CRM setup, automation, strategy
2. **Video Marketing Mastery** - Getting comfortable on camera, video strategy
3. **Podcasting Excellence** - Launching and growing podcasts
4. **AI Integration & Strategy** - Adopting AI tools in business
5. **Personal Transformation** - Mindset, confidence, limiting beliefs
6. **Marketing & Content Strategy** - Business growth and content planning

## HubSpot Payment Links

Hosted on sidekickstrategies.com domain:

| Package | Payment Link |
|---------|--------------|
| Activation | `https://sidekickstrategies.com/hs/payments/sjjHzmQqYWTPn7bn?referrer=PAYMENT_LINK` |
| Starter | `https://sidekickstrategies.com/hs/payments/hhGnDxVKkRCC?referrer=PAYMENT_LINK` |
| Growth | `https://sidekickstrategies.com/hs/payments/sdJMg4rSXj2H7?referrer=PAYMENT_LINK` |
| Transformation | `https://sidekickstrategies.com/hs/payments/xRtR6JnWmvymn4?referrer=PAYMENT_LINK` |

**Redirect URLs after payment:**
- `https://www.georgebthomas.com/coaching/thank-you?purchased=<package>`

## Pages & Flow

| Page | Purpose |
|------|---------|
| `/coaching` | Main landing page with package cards and CTAs |
| `/coaching/apply` | Multi-step application form (4 steps) |
| `/coaching/thank-you` | Post-purchase confirmation with package-specific content |

**User Flow:**
1. User visits `/coaching` → selects package → clicks "Get Started"
2. Redirected to `/coaching/apply?package=X`
3. Completes 4-step form (package, topics, goals, contact info)
4. Clicks "Continue to Payment" → data submitted to HubSpot CRM
5. Redirected to HubSpot payment link
6. After payment → redirected to `/coaching/thank-you?purchased=X`

## HubSpot CRM Integration

- **Pipeline:** Coaching (ID: `853766153`)
- **First Stage:** Application Received (ID: `1272766053`)
- **Contact Properties:**
  - `coaching_package` - Selected package slug
  - `coaching_topics` - Semicolon-separated topic IDs
  - `preferred_meeting_time` - Preferred session timing
- **Deal Properties:**
  - Created with package price as amount
  - Associated with contact record

## Environment Variables

```
NEXT_PUBLIC_PAYMENT_LINK_ACTIVATION=https://...
NEXT_PUBLIC_PAYMENT_LINK_STARTER=https://...
NEXT_PUBLIC_PAYMENT_LINK_GROWTH=https://...
NEXT_PUBLIC_PAYMENT_LINK_TRANSFORMATION=https://...
```

## Future Considerations

- Product descriptions may need updates in HubSpot payment link settings
- Consider adding email workflows for post-purchase onboarding
- May add scheduling integration (Calendly/HubSpot Meetings) after purchase
