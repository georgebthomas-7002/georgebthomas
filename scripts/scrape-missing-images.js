#!/usr/bin/env node

/**
 * Scrape Missing Images
 *
 * Fetches og:image from resource URLs that are missing thumbnails.
 * Updates data/resources.json with found images.
 *
 * Usage:
 *   node scripts/scrape-missing-images.js              - Process all missing
 *   node scripts/scrape-missing-images.js --limit 50   - Process first 50
 *   node scripts/scrape-missing-images.js --dry-run    - Preview without saving
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Load resources
const dataPath = path.join(__dirname, '..', 'data', 'resources.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Parse args
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const limitIdx = args.indexOf('--limit');
const limit = limitIdx !== -1 ? parseInt(args[limitIdx + 1]) : Infinity;

// Fetch URL with redirect following
function fetchUrl(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) {
      reject(new Error('Too many redirects'));
      return;
    }

    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ResourceScraper/1.0)'
      }
    }, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('/')) {
          const urlObj = new URL(url);
          redirectUrl = `${urlObj.protocol}//${urlObj.host}${redirectUrl}`;
        }
        resolve(fetchUrl(redirectUrl, redirectCount + 1));
        return;
      }

      if (res.statusCode === 404) {
        reject(new Error('404'));
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// Extract og:image from HTML
function extractOgImage(html) {
  // Try og:image first
  const ogMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
  if (ogMatch) return ogMatch[1];

  // Try reverse order (content before property)
  const ogMatchAlt = html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
  if (ogMatchAlt) return ogMatchAlt[1];

  // Try twitter:image
  const twitterMatch = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i);
  if (twitterMatch) return twitterMatch[1];

  // Try twitter:image reverse
  const twitterMatchAlt = html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i);
  if (twitterMatchAlt) return twitterMatchAlt[1];

  return null;
}

// Main
async function main() {
  console.log('\n🔍 Scraping Missing Images\n');
  console.log('='.repeat(50));

  // Find resources without thumbnails
  const missing = data.resources.filter(r => !r.thumbnail || r.thumbnail === '');
  console.log(`📊 Resources without thumbnails: ${missing.length}`);

  const toProcess = missing.slice(0, limit);
  console.log(`📋 Processing: ${toProcess.length}${dryRun ? ' (dry run)' : ''}\n`);

  let found = 0;
  let notFound = 0;
  let errors = 0;
  const results = [];

  for (let i = 0; i < toProcess.length; i++) {
    const resource = toProcess[i];
    const progress = `[${i + 1}/${toProcess.length}]`;

    try {
      const html = await fetchUrl(resource.url);
      const ogImage = extractOgImage(html);

      if (ogImage) {
        found++;
        console.log(`${progress} ✅ ${resource.title.substring(0, 50)}...`);
        console.log(`       → ${ogImage.substring(0, 60)}...`);

        // Update the resource in the original data
        if (!dryRun) {
          const idx = data.resources.findIndex(r => r.id === resource.id);
          if (idx !== -1) {
            data.resources[idx].thumbnail = ogImage;
          }
        }
        results.push({ id: resource.id, title: resource.title, image: ogImage });
      } else {
        notFound++;
        console.log(`${progress} ⚠️  No og:image: ${resource.title.substring(0, 50)}...`);
      }
    } catch (err) {
      errors++;
      console.log(`${progress} ❌ ${err.message}: ${resource.title.substring(0, 40)}...`);
    }

    // Rate limiting - be polite
    if (i < toProcess.length - 1) {
      await new Promise(r => setTimeout(r, 200));
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`\n📊 Results:`);
  console.log(`   ✅ Found: ${found}`);
  console.log(`   ⚠️  No image: ${notFound}`);
  console.log(`   ❌ Errors: ${errors}`);

  if (!dryRun && found > 0) {
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    console.log(`\n💾 Saved ${found} new thumbnails to resources.json`);
  } else if (dryRun) {
    console.log(`\n🔍 Dry run - no changes saved`);
  }

  console.log('\n✨ Done!\n');
}

main().catch(console.error);
