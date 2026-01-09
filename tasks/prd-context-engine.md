# PRD: George B. Thomas Context Engine

## Introduction

Build a comprehensive context engine that gathers, organizes, and structures all publicly available information about George B. Thomas from across the internet. This engine will power future website pages by providing deep, authentic context about George's expertise across podcasting, video marketing, HubSpot, speaking, AI, and business coaching.

The context engine captures George's positioning as a **Y-Shaped Business Owner** and **Transition Specialist** who operates with these core principles:
- **Value-First**: Leading with genuine value before asking for anything
- **Human-First**: Prioritizing human connection over automation
- **Content-Driven**: Building authority through consistent, helpful content
- **Expert in Helping Humans**: Focused on transformation and growth

## Goals

- Gather ALL publicly available content featuring or created by George B. Thomas
- Organize findings into topic-based context files (both structured JSON and readable markdown)
- Capture verbatim quotes and testimonials with full source attribution
- Build sufficient context to write authentic, detailed pages for each expertise area
- Document George's journey as a T-shaped marketer with deep expertise and broad capabilities
- Preserve the human-first, value-driven narrative throughout all gathered content

## User Stories

### US-001: Set up context engine directory structure
**Description:** As a developer, I need to create the directory structure and base files for storing gathered context.

**Acceptance Criteria:**
- [ ] Create `context/` directory with subdirectories for each topic area
- [ ] Create `context/raw/` for unprocessed findings
- [ ] Create `context/structured/` for JSON data files
- [ ] Create `context/summaries/` for markdown summaries
- [ ] Create `context/quotes/` for verbatim testimonials and quotes
- [ ] Create `context/metadata.json` to track sources and timestamps
- [ ] Typecheck passes

### US-002: Research George B. Thomas podcasting presence
**Description:** As a context gatherer, I need to find all podcast appearances, hosted shows, and podcasting-related content.

**Acceptance Criteria:**
- [ ] Search for "George B. Thomas podcast" across major platforms
- [ ] Find episodes of podcasts George has hosted (Hub Heroes, others)
- [ ] Find guest appearances on other podcasts
- [ ] Capture episode titles, descriptions, dates, and links
- [ ] Extract key quotes and talking points from descriptions/show notes
- [ ] Document podcast topics and themes George discusses
- [ ] Save to `context/structured/podcasting.json`
- [ ] Write summary to `context/summaries/podcasting.md`

### US-003: Research George B. Thomas video and YouTube presence
**Description:** As a context gatherer, I need to find all video content, YouTube channels, and video marketing expertise.

**Acceptance Criteria:**
- [ ] Search YouTube for George B. Thomas channels and appearances
- [ ] Find video tutorials, presentations, and educational content
- [ ] Capture video titles, descriptions, view counts where available
- [ ] Document video topics (HubSpot tutorials, marketing tips, etc.)
- [ ] Find any video testimonials or case studies featuring George
- [ ] Save to `context/structured/video.json`
- [ ] Write summary to `context/summaries/video.md`

### US-004: Research George B. Thomas HubSpot expertise
**Description:** As a context gatherer, I need to find all HubSpot-related content, certifications, community involvement, and thought leadership.

**Acceptance Criteria:**
- [ ] Search HubSpot community for George B. Thomas contributions
- [ ] Find HubSpot Academy certifications and achievements
- [ ] Search for HubSpot blog posts, articles, or features mentioning George
- [ ] Find INBOUND conference appearances or presentations
- [ ] Document HubSpot tools/features George specializes in
- [ ] Capture any HubSpot partner or agency affiliations
- [ ] Save to `context/structured/hubspot.json`
- [ ] Write summary to `context/summaries/hubspot.md`

### US-005: Research George B. Thomas speaking engagements
**Description:** As a context gatherer, I need to find all speaking engagements, keynotes, workshops, and presentation history.

**Acceptance Criteria:**
- [ ] Search for George B. Thomas speaker profiles on speaker bureaus
- [ ] Find conference presentations and keynotes
- [ ] Search for workshop or training session mentions
- [ ] Capture event names, dates, topics, and any available recordings
- [ ] Find speaker testimonials and event feedback
- [ ] Document speaking topics and areas of expertise
- [ ] Save to `context/structured/speaking.json`
- [ ] Write summary to `context/summaries/speaking.md`

### US-006: Gather testimonials and social proof
**Description:** As a context gatherer, I need to find all testimonials, reviews, recommendations, and social proof.

**Acceptance Criteria:**
- [ ] Search LinkedIn for recommendations on George's profile
- [ ] Find Google reviews or testimonials for any businesses
- [ ] Search for case studies or success stories mentioning George
- [ ] Find social media mentions and endorsements
- [ ] Capture VERBATIM quotes with full attribution (name, role, company, date, source URL)
- [ ] Categorize testimonials by type (speaking, coaching, HubSpot, video, general)
- [ ] Save to `context/structured/testimonials.json`
- [ ] Save individual quotes to `context/quotes/` directory
- [ ] Write summary to `context/summaries/testimonials.md`

### US-007: Research George B. Thomas AI and technology content
**Description:** As a context gatherer, I need to find all AI-related content, technology thought leadership, and innovation discussions.

**Acceptance Criteria:**
- [ ] Search for George B. Thomas AI content, articles, or discussions
- [ ] Find any AI tools or technologies George has discussed or recommended
- [ ] Document George's perspective on AI in marketing/sales
- [ ] Find content about technology adoption and digital transformation
- [ ] Save to `context/structured/ai-technology.json`
- [ ] Write summary to `context/summaries/ai-technology.md`

### US-008: Research George B. Thomas business and coaching content
**Description:** As a context gatherer, I need to find all business coaching, consulting, and entrepreneurship content.

**Acceptance Criteria:**
- [ ] Search for Sidekick Strategies and related business entities
- [ ] Find coaching programs, courses, or training offerings
- [ ] Document the "Y-Shaped Business Owner" positioning
- [ ] Find content about being a "Transition Specialist"
- [ ] Capture Value-First and Human-First philosophy examples
- [ ] Find business advice articles, posts, or interviews
- [ ] Save to `context/structured/business-coaching.json`
- [ ] Write summary to `context/summaries/business-coaching.md`

### US-009: Research George B. Thomas marketing and sales content
**Description:** As a context gatherer, I need to find all marketing strategy, sales enablement, and inbound marketing content.

**Acceptance Criteria:**
- [ ] Search for marketing strategy articles and content by George
- [ ] Find sales enablement tips, techniques, and training
- [ ] Document inbound marketing philosophy and approach
- [ ] Find content about content marketing and content strategy
- [ ] Search for SEO, email marketing, or social media expertise
- [ ] Save to `context/structured/marketing-sales.json`
- [ ] Write summary to `context/summaries/marketing-sales.md`

### US-010: Research George B. Thomas personal brand and biography
**Description:** As a context gatherer, I need to find biographical information, personal brand elements, and origin story content.

**Acceptance Criteria:**
- [ ] Find professional bio versions from various sources
- [ ] Document career history and professional journey
- [ ] Find origin story or "how I got started" content
- [ ] Capture personal mission and vision statements
- [ ] Document core values and principles
- [ ] Find photos and headshots with usage rights noted
- [ ] Save to `context/structured/biography.json`
- [ ] Write summary to `context/summaries/biography.md`

### US-011: Compile T-shaped marketer narrative
**Description:** As a context analyst, I need to synthesize all gathered context into a T-shaped marketer narrative showing depth and breadth.

**Acceptance Criteria:**
- [ ] Analyze all context files to identify expertise depth areas
- [ ] Map out breadth of knowledge across marketing disciplines
- [ ] Document the T-shape: deep expertise (stem) + broad skills (crossbar)
- [ ] Identify unique intersections of skills that differentiate George
- [ ] Create visual representation data for T-shape diagram
- [ ] Write narrative summary connecting all expertise areas
- [ ] Save to `context/structured/t-shaped-narrative.json`
- [ ] Write summary to `context/summaries/t-shaped-narrative.md`

### US-012: Create context engine index and search capability
**Description:** As a developer, I need to create an index of all gathered context for easy retrieval and searching.

**Acceptance Criteria:**
- [ ] Create `context/index.json` with all content indexed
- [ ] Include tags/categories for each piece of content
- [ ] Include source URLs and retrieval dates
- [ ] Create `context/README.md` documenting the context structure
- [ ] Add statistics: total sources, quotes, topics covered
- [ ] Typecheck passes

### US-013: Validate context completeness for page creation
**Description:** As a content strategist, I need to validate that sufficient context exists to write each planned website page.

**Acceptance Criteria:**
- [ ] Review podcasting context - sufficient for dedicated page? (Y/N with notes)
- [ ] Review video context - sufficient for dedicated page? (Y/N with notes)
- [ ] Review HubSpot context - sufficient for dedicated page? (Y/N with notes)
- [ ] Review speaking context - sufficient for dedicated page? (Y/N with notes)
- [ ] Review coaching context - sufficient for dedicated page? (Y/N with notes)
- [ ] Review AI/technology context - sufficient for dedicated page? (Y/N with notes)
- [ ] Document gaps requiring additional research
- [ ] Create `context/validation-report.md` with findings

## Functional Requirements

- FR-1: The system must search across multiple internet sources (Google, YouTube, LinkedIn, podcast directories, HubSpot community)
- FR-2: All gathered content must include source URL and retrieval timestamp
- FR-3: Testimonials must be captured verbatim with full attribution
- FR-4: Context must be stored in both JSON (structured) and Markdown (readable) formats
- FR-5: The system must avoid duplicate content across searches
- FR-6: Content must be categorized by topic area for easy retrieval
- FR-7: The system must track which sources have been searched and when
- FR-8: Quotes must be stored individually with metadata for easy citation
- FR-9: The narrative must consistently reflect Value-First, Human-First, Content-Driven positioning
- FR-10: The system must compile historical content regardless of date

## Non-Goals

- Not building a web scraper or automated crawler (manual research with AI assistance)
- Not gathering competitor analysis or peer comparisons
- Not creating the actual website pages (context gathering only)
- Not verifying or fact-checking biographical claims
- Not gathering private or non-public information
- Not contacting individuals for testimonials (public sources only)

## Technical Considerations

- Use sub-agents (Task tool with Explore type) for parallel research
- Use WebSearch and WebFetch tools for internet research
- Store context in project's `context/` directory
- JSON schema should be consistent across topic areas
- Markdown summaries should follow consistent template
- Consider rate limiting for web searches to avoid blocks

## Context File Structure

```
context/
├── README.md                    # Documentation of context system
├── index.json                   # Master index of all content
├── metadata.json                # Source tracking and timestamps
├── validation-report.md         # Page readiness assessment
│
├── raw/                         # Unprocessed search results
│   └── [search-date]-[topic].json
│
├── structured/                  # Processed JSON data
│   ├── podcasting.json
│   ├── video.json
│   ├── hubspot.json
│   ├── speaking.json
│   ├── testimonials.json
│   ├── ai-technology.json
│   ├── business-coaching.json
│   ├── marketing-sales.json
│   ├── biography.json
│   └── t-shaped-narrative.json
│
├── summaries/                   # Human-readable markdown
│   ├── podcasting.md
│   ├── video.md
│   ├── hubspot.md
│   ├── speaking.md
│   ├── testimonials.md
│   ├── ai-technology.md
│   ├── business-coaching.md
│   ├── marketing-sales.md
│   ├── biography.md
│   └── t-shaped-narrative.md
│
└── quotes/                      # Individual verbatim quotes
    ├── testimonial-001.json
    ├── testimonial-002.json
    └── ...
```

## Success Metrics

- Minimum 50 unique sources gathered across all topics
- Minimum 20 verbatim testimonials/quotes captured
- All 9 topic areas have sufficient content for dedicated pages
- T-shaped narrative clearly demonstrates depth + breadth
- Context enables writing 500+ words per topic without additional research
- Value-First, Human-First positioning evident in gathered content

## Open Questions

- Should we include social media posts (Twitter/X, LinkedIn posts) as sources?
- What is the minimum number of sources needed per topic to consider it "sufficient"?
- Should we prioritize recent content or historical content when there's overlap?
- Are there specific podcasts or events George wants highlighted?

## Positioning Summary

The context engine should consistently surface content that demonstrates George B. Thomas as:

**Y-Shaped Business Owner**: Deep expertise in multiple verticals (HubSpot, Video, Podcasting) with broad marketing knowledge connecting them all.

**Transition Specialist**: Helping businesses and individuals navigate change, adopt new technologies, and transform their approach.

**Value-First**: Every piece of content should demonstrate George leading with value, education, and genuine helpfulness.

**Human-First**: Technology serves humans, not the other way around. Personal connection and authenticity over automation.

**Content-Driven**: Authority built through consistent creation—podcasts, videos, articles, speaking—not just credentials.

**Expert in Helping Humans**: The through-line across all topics is empowering people to grow, succeed, and become better versions of themselves.
