---
name: resource-aggregator
description: Build and maintain a searchable resource center that aggregates content from YouTube channels, podcast RSS feeds, and blog RSS feeds. Creates a JSON index with auto-generated tags that powers a filterable frontend. Use when building a content hub that links to external resources, aggregating content from multiple sources, or creating a searchable resource library.
---

# Resource Aggregator

Creates a searchable resource center by scraping metadata from YouTube channels, podcast RSS feeds, and blog RSS feeds. The system stores metadata only and links to original content.

## Quick Start

1. Configure sources in `sources.config.yaml`
2. Run `npm run scrape` to fetch and tag all resources
3. Deploy the frontend to display the searchable index

## Source Configuration

Edit `sources.config.yaml`:

```yaml
youtube_channels:
  - id: "@thegeorgebthomas"
    name: "George B Thomas"
  - id: "@thespiritualsideofleadership"  
    name: "Spiritual Side of Leadership"

podcast_feeds:
  - url: "https://feeds.transistor.fm/the-hubheroes-podcast"
    name: "Hub Heroes"
  - url: "https://feeds.transistor.fm/beyond-the-default"
    name: "Beyond Your Default"

blog_feeds:
  - url: "https://sidekickstrategies.com/blog/rss.xml"
    name: "Sidekick Strategies"

taxonomy:
  pillars:
    - AI & Technology
    - HubSpot
    - Marketing & Sales
    - Video
    - Podcasting
    - Personal Growth
    - Leadership
    - Spiritual Leadership
  secondary_tags:
    - Speaking & Training
    - Inbound Marketing
    - Sales Enablement
    - Content Strategy
    - Community Building
```

## Commands

- `npm run scrape` - Fetch all sources and regenerate resources.json
- `npm run scrape:youtube` - YouTube only
- `npm run scrape:podcasts` - Podcasts only
- `npm run scrape:blogs` - Blogs only

## Output Structure

The scraper generates `data/resources.json`:

```json
{
  "lastUpdated": "2025-01-10T...",
  "resources": [
    {
      "id": "unique-id",
      "title": "Episode or Article Title",
      "description": "Brief description",
      "url": "https://original-source.com/...",
      "thumbnail": "https://...",
      "publishedAt": "2025-01-10",
      "duration": "45:00",
      "type": "video|podcast|article",
      "source": "Hub Heroes",
      "pillars": ["HubSpot", "Marketing & Sales"],
      "tags": ["Inbound Marketing"]
    }
  ]
}
```

## Auto-Tagging

The scraper sends titles and descriptions to Claude API for categorization. Each resource gets:
- 1-2 primary pillars from the taxonomy
- 0-2 secondary tags if applicable

## Frontend Features

- Full-text search across titles and descriptions
- Filter by pillar (8 categories)
- Filter by content type (Video, Podcast, Article)
- Filter by source
- Responsive card grid with thumbnails
- Click-through to original content

## Environment Variables

Required in `.env`:
```
YOUTUBE_API_KEY=your-key
ANTHROPIC_API_KEY=your-key
```

## Adding New Sources

1. Add to appropriate section in `sources.config.yaml`
2. Run `npm run scrape`
3. Frontend automatically displays new resources
