#!/usr/bin/env node
/**
 * Import Sidekick Strategies articles from spreadsheet export
 * and fetch thumbnails for each article.
 */

const XLSX = require('xlsx');
const fs = require('fs');
const https = require('https');
const http = require('http');

// Read spreadsheet
console.log('Reading spreadsheet...');
const wb = XLSX.readFile('resource-center/SKS-Full-blog-export.xlsx');
const sheet = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet);
console.log(`Found ${rows.length} rows in spreadsheet`);

// Filter valid articles
const validArticles = rows.filter(row => {
  const url = row['Post URL'];
  return url && url.startsWith('https://sidekickstrategies.com/blog/') &&
         !url.includes('/tag/') &&
         !url.includes('/page/') &&
         !url.includes('-temporary-slug-');
});

console.log(`Valid articles: ${validArticles.length}`);

// Load current resources
const resourcesPath = 'data/resources.json';
const resources = JSON.parse(fs.readFileSync(resourcesPath, 'utf-8'));

// Get existing SKS URLs
const existingUrls = new Set(
  resources.resources
    .filter(r => r.source === 'Sidekick Strategies')
    .map(r => r.url)
);

console.log(`Existing SKS articles: ${existingUrls.size}`);

// Find new articles
const newArticles = validArticles.filter(row => !existingUrls.has(row['Post URL']));
console.log(`New articles to import: ${newArticles.length}`);

// Function to fetch og:image from a URL
function fetchOgImage(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ResourceAggregator/1.0)' },
      timeout: 10000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        fetchOgImage(res.headers.location).then(resolve);
        return;
      }

      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => {
        // Look for og:image
        const match = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
                      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
        resolve(match ? match[1] : null);
      });
    });

    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
  });
}

// Create resource entry from spreadsheet row
function createResource(row, thumbnail) {
  const url = row['Post URL'];
  const title = row['Post title'] || row['Post SEO title'] || '';
  const description = row['Meta description'] || '';

  // Generate ID from URL
  const slug = url.replace('https://sidekickstrategies.com/blog/', '');
  const id = `sidekick-strategies-${slug}`;

  return {
    id,
    title,
    description: description.slice(0, 300) + (description.length > 300 ? '...' : ''),
    url,
    thumbnail: thumbnail || null,
    publishedAt: new Date().toISOString(), // Default to now since spreadsheet doesn't have dates
    type: 'article',
    source: 'Sidekick Strategies',
    pillars: ['HubSpot', 'Marketing & Sales'],
    tags: []
  };
}

// Process articles in batches
async function processArticles() {
  const BATCH_SIZE = 10;
  const DELAY = 300; // ms between requests

  let processed = 0;
  let withThumbnails = 0;
  let failed = 0;

  // Remove existing SKS resources (we'll rebuild from spreadsheet)
  resources.resources = resources.resources.filter(r => r.source !== 'Sidekick Strategies');
  console.log(`\nRebuilding Sidekick Strategies from spreadsheet...`);

  // Process all valid articles
  for (let i = 0; i < validArticles.length; i++) {
    const row = validArticles[i];
    const url = row['Post URL'];

    processed++;
    process.stdout.write(`\r[${processed}/${validArticles.length}] Fetching thumbnails...`);

    // Fetch thumbnail
    const thumbnail = await fetchOgImage(url);

    if (thumbnail) {
      withThumbnails++;
      const resource = createResource(row, thumbnail);
      resources.resources.push(resource);
    } else {
      failed++;
      // Still add but without thumbnail
      const resource = createResource(row, null);
      resources.resources.push(resource);
    }

    // Small delay to avoid overwhelming the server
    await new Promise(r => setTimeout(r, DELAY));
  }

  console.log(`\n\nProcessing complete!`);
  console.log(`  Total processed: ${processed}`);
  console.log(`  With thumbnails: ${withThumbnails}`);
  console.log(`  Without thumbnails: ${failed}`);

  // Update totals
  resources.totalResources = resources.resources.length;
  resources.lastUpdated = new Date().toISOString();

  // Save
  fs.writeFileSync(resourcesPath, JSON.stringify(resources, null, 2));
  console.log(`\nSaved to ${resourcesPath}`);
  console.log(`Total resources: ${resources.totalResources}`);
}

processArticles().catch(console.error);
