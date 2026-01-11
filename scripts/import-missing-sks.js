#!/usr/bin/env node
/**
 * Import missing Sidekick Strategies articles from spreadsheet
 * and fetch their thumbnails.
 */

const XLSX = require('xlsx');
const fs = require('fs');
const https = require('https');

// Read spreadsheet
console.log('Reading spreadsheet...');
const wb = XLSX.readFile('resource-center/SKS-Full-blog-export.xlsx');
const sheet = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet);

// Extract valid articles from spreadsheet
const spreadsheetArticles = new Map();
for (const row of rows) {
  const url = row['Post URL'];
  if (url && typeof url === 'string' &&
      url.startsWith('https://sidekickstrategies.com/blog/') &&
      !url.includes('/tag/') &&
      !url.includes('/page/') &&
      !url.includes('-temporary-slug-')) {

    if (!spreadsheetArticles.has(url)) {
      spreadsheetArticles.set(url, {
        url,
        title: row['Post title'] || row['Post SEO title'] || '',
        description: row['Meta description'] || ''
      });
    }
  }
}

console.log(`Valid spreadsheet articles: ${spreadsheetArticles.size}`);

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

// Find articles in spreadsheet but not in resources
const missingUrls = [];
for (const [url, article] of spreadsheetArticles) {
  if (!existingUrls.has(url)) {
    missingUrls.push(article);
  }
}

// Find articles in resources but not in spreadsheet
const extraInResources = [];
for (const url of existingUrls) {
  if (!spreadsheetArticles.has(url)) {
    extraInResources.push(url);
  }
}

console.log(`\nMissing from resources: ${missingUrls.length}`);
console.log(`Extra in resources (not in spreadsheet): ${extraInResources.length}`);

if (missingUrls.length === 0) {
  console.log('\nAll spreadsheet articles are already in resources!');
  process.exit(0);
}

console.log('\nMissing articles:');
missingUrls.forEach((a, i) => console.log(`  ${i+1}. ${a.title.slice(0, 60)}...`));

// Function to fetch og:image
function fetchOgImage(url) {
  return new Promise((resolve) => {
    const req = https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ResourceAggregator/1.0)' },
      timeout: 10000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchOgImage(res.headers.location).then(resolve);
        return;
      }
      if (res.statusCode !== 200) {
        resolve(null);
        return;
      }

      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => {
        const match = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
                      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
        resolve(match ? match[1] : null);
      });
    });

    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
  });
}

async function importMissingArticles() {
  console.log('\nFetching thumbnails for missing articles...');

  for (let i = 0; i < missingUrls.length; i++) {
    const article = missingUrls[i];
    process.stdout.write(`\r[${i+1}/${missingUrls.length}] ${article.title.slice(0, 40)}...`);

    const thumbnail = await fetchOgImage(article.url);

    // Create resource entry
    const slug = article.url.replace('https://sidekickstrategies.com/blog/', '');
    const resource = {
      id: `sidekick-strategies-${slug}-${Date.now()}`,
      title: article.title,
      description: article.description.slice(0, 300) + (article.description.length > 300 ? '...' : ''),
      url: article.url,
      thumbnail: thumbnail,
      publishedAt: new Date().toISOString(),
      type: 'article',
      source: 'Sidekick Strategies',
      pillars: ['HubSpot', 'Marketing & Sales'],
      tags: []
    };

    if (thumbnail) {
      resources.resources.push(resource);
    } else {
      console.log(`\n  ⚠ No thumbnail for: ${article.url}`);
    }

    await new Promise(r => setTimeout(r, 300));
  }

  // Update totals
  resources.totalResources = resources.resources.length;
  resources.lastUpdated = new Date().toISOString();

  // Save
  fs.writeFileSync(resourcesPath, JSON.stringify(resources, null, 2));
  console.log(`\n\nSaved! Total resources: ${resources.totalResources}`);
}

importMissingArticles().catch(console.error);
