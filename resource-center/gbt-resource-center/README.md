# GBT Resource Center

A searchable resource aggregator that pulls content from YouTube channels, podcast RSS feeds, and blog RSS feeds. Creates a filterable index that links to original content.

## Features

- **Multi-source aggregation**: YouTube channels, podcast RSS, blog RSS
- **Auto-tagging**: Uses Claude API to categorize content by topic
- **Searchable**: Full-text search across titles and descriptions
- **Filterable**: By content type, topic pillar, and source
- **Zero duplication**: Links to original content, stores only metadata

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

- **YOUTUBE_API_KEY**: Get from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
  - Create a project → Enable YouTube Data API v3 → Create API key
- **ANTHROPIC_API_KEY**: Get from [Anthropic Console](https://console.anthropic.com/)

### 3. Configure your sources

Edit `sources.config.yaml` to add/remove:
- YouTube channels (by handle, e.g., `@thegeorgebthomas`)
- Podcast RSS feeds
- Blog RSS feeds

### 4. Run the scraper

```bash
npm run scrape
```

This fetches all content and generates `data/resources.json`.

### 5. Start the dev server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your resource center.

## Commands

| Command | Description |
|---------|-------------|
| `npm run scrape` | Fetch all sources and regenerate resources.json |
| `npm run scrape:youtube` | Scrape YouTube channels only |
| `npm run scrape:podcasts` | Scrape podcast feeds only |
| `npm run scrape:blogs` | Scrape blog feeds only |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The scraper runs locally. After scraping, commit `data/resources.json` and push to trigger a new deployment.

### Automated Updates (Optional)

Set up a GitHub Action to run the scraper weekly:

```yaml
# .github/workflows/scrape.yml
name: Update Resources
on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly on Sunday
  workflow_dispatch:  # Manual trigger

jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm run scrape
        env:
          YOUTUBE_API_KEY: ${{ secrets.YOUTUBE_API_KEY }}
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: 'chore: update resources'
          file_pattern: 'data/resources.json'
```

## Customization

### Adding a new source

1. Add to appropriate section in `sources.config.yaml`
2. Run `npm run scrape`

### Modifying taxonomy

Edit the `taxonomy` section in `sources.config.yaml`:

```yaml
taxonomy:
  pillars:
    - Your Category 1
    - Your Category 2
  secondary_tags:
    - Tag 1
    - Tag 2
```

### Styling

The frontend uses Tailwind CSS. Edit:
- `tailwind.config.js` for theme customization
- `src/app/globals.css` for global styles
- `src/app/page.tsx` for component styles

## File Structure

```
gbt-resource-center/
├── data/
│   └── resources.json      # Generated resource index
├── scripts/
│   └── scrape.js           # Main scraper script
├── src/
│   └── app/
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx        # Resource center UI
├── sources.config.yaml     # Source configuration
├── package.json
└── README.md
```
