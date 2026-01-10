# George B. Thomas Context Engine

Comprehensive research database capturing George B. Thomas's expertise, content, testimonials, and positioning across all professional domains.

## Directory Structure

```
context/
├── README.md              # This file
├── metadata.json          # Source tracking and statistics
├── index.json             # Master index of all content (created after research)
├── validation-report.md   # Page readiness assessment (created after research)
│
├── raw/                   # Unprocessed search results
│   └── [date]-[topic].json
│
├── structured/            # Processed JSON data by topic
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
├── summaries/             # Human-readable markdown summaries
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
└── quotes/                # Individual verbatim quotes with attribution
    ├── quote-001.json
    ├── quote-002.json
    └── ...
```

## Positioning

This context engine captures George B. Thomas as:

### Y-Shaped Business Owner
Deep expertise in multiple verticals (HubSpot, Video, Podcasting) with broad marketing knowledge connecting them all.

### Transition Specialist
Helping businesses and individuals navigate change, adopt new technologies, and transform their approach.

### Core Principles
- **Value-First**: Leading with genuine value before asking for anything
- **Human-First**: Prioritizing human connection over automation
- **Content-Driven**: Building authority through consistent, helpful content
- **Expert in Helping Humans**: Focused on transformation and growth

## Data Formats

### Structured JSON Schema
Each topic file in `structured/` follows this pattern:
```json
{
  "topic": "topic-name",
  "lastUpdated": "ISO-date",
  "sourceCount": 0,
  "sources": [
    {
      "title": "Source Title",
      "url": "https://...",
      "type": "podcast|video|article|profile|testimonial",
      "date": "ISO-date or null",
      "retrievedAt": "ISO-date",
      "summary": "Brief description",
      "keyPoints": ["point1", "point2"],
      "quotes": ["quote1", "quote2"],
      "tags": ["tag1", "tag2"]
    }
  ]
}
```

### Quote Schema
Each file in `quotes/` follows this pattern:
```json
{
  "id": "quote-001",
  "quote": "Verbatim quote text",
  "attribution": {
    "name": "Person Name",
    "role": "Their Role",
    "company": "Their Company",
    "date": "ISO-date or null"
  },
  "source": {
    "url": "https://...",
    "type": "linkedin|review|testimonial|interview",
    "retrievedAt": "ISO-date"
  },
  "category": "speaking|coaching|hubspot|video|general",
  "tags": ["tag1", "tag2"]
}
```

## Usage

This context is designed to power website page creation. Each topic should have sufficient depth to write 500+ words of authentic content without additional research.

### Page Readiness Criteria
- Minimum 5 unique sources per topic
- At least 3 specific examples or case studies
- Verbatim quotes where available
- Clear connection to positioning (Value-First, Human-First, etc.)
