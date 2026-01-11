#!/usr/bin/env node

/**
 * Check for 404 Resources
 *
 * Tests all resource URLs and reports which ones return 404 errors.
 * Outputs a list of broken resources.
 *
 * Usage:
 *   node scripts/check-404s.js                 - Check all resources
 *   node scripts/check-404s.js --limit 100     - Check first 100
 *   node scripts/check-404s.js --source "SSL"  - Check specific source
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
const limitIdx = args.indexOf('--limit');
const limit = limitIdx !== -1 ? parseInt(args[limitIdx + 1]) : Infinity;
const sourceIdx = args.indexOf('--source');
const sourceFilter = sourceIdx !== -1 ? args[sourceIdx + 1] : null;

// Check URL status (HEAD request for speed)
function checkUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;

    const req = protocol.request(url, {
      method: 'HEAD',
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkChecker/1.0)'
      }
    }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400) {
        resolve({ status: res.statusCode, redirect: true });
      } else {
        resolve({ status: res.statusCode, redirect: false });
      }
    });

    req.on('error', (err) => {
      resolve({ status: 0, error: err.message });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 0, error: 'Timeout' });
    });

    req.end();
  });
}

// Main
async function main() {
  console.log('\n🔍 Checking for 404 Resources\n');
  console.log('='.repeat(60));

  // Filter resources
  let resources = data.resources;
  if (sourceFilter) {
    resources = resources.filter(r =>
      r.source.toLowerCase().includes(sourceFilter.toLowerCase())
    );
    console.log(`🔎 Filtering by source: "${sourceFilter}"`);
  }

  console.log(`📊 Total resources to check: ${resources.length}`);

  const toCheck = resources.slice(0, limit);
  console.log(`📋 Checking: ${toCheck.length}\n`);

  const notFound = [];
  const errors = [];
  const redirects = [];
  let ok = 0;

  for (let i = 0; i < toCheck.length; i++) {
    const resource = toCheck[i];
    const progress = `[${i + 1}/${toCheck.length}]`;

    const result = await checkUrl(resource.url);

    if (result.status === 404) {
      notFound.push(resource);
      console.log(`${progress} ❌ 404: ${resource.title.substring(0, 50)}...`);
    } else if (result.status === 0) {
      errors.push({ ...resource, error: result.error });
      console.log(`${progress} ⚠️  ${result.error}: ${resource.title.substring(0, 40)}...`);
    } else if (result.status >= 400) {
      errors.push({ ...resource, error: `HTTP ${result.status}` });
      console.log(`${progress} ⚠️  ${result.status}: ${resource.title.substring(0, 40)}...`);
    } else {
      ok++;
      if (i % 50 === 0) {
        process.stdout.write(`${progress} ✅ Checked ${ok} OK so far...\r`);
      }
    }

    // Rate limiting
    if (i < toCheck.length - 1) {
      await new Promise(r => setTimeout(r, 100));
    }
  }

  console.log('\n\n' + '='.repeat(60));
  console.log(`\n📊 Results:`);
  console.log(`   ✅ OK: ${ok}`);
  console.log(`   ❌ 404 Not Found: ${notFound.length}`);
  console.log(`   ⚠️  Other Errors: ${errors.length}`);

  if (notFound.length > 0) {
    console.log(`\n\n📋 404 Resources (${notFound.length}):`);
    console.log('-'.repeat(60));
    notFound.forEach((r, i) => {
      console.log(`\n${i + 1}. ${r.title}`);
      console.log(`   Source: ${r.source}`);
      console.log(`   URL: ${r.url}`);
      console.log(`   ID: ${r.id}`);
    });

    // Save to file
    const outputPath = path.join(__dirname, '..', 'data', '404-resources.json');
    fs.writeFileSync(outputPath, JSON.stringify({
      checkedAt: new Date().toISOString(),
      total404: notFound.length,
      resources: notFound.map(r => ({
        id: r.id,
        title: r.title,
        url: r.url,
        source: r.source,
        publishedAt: r.publishedAt
      }))
    }, null, 2));
    console.log(`\n💾 Saved 404 list to data/404-resources.json`);
  }

  if (errors.length > 0) {
    console.log(`\n\n⚠️  Error Resources (${errors.length}):`);
    console.log('-'.repeat(60));
    errors.forEach((r, i) => {
      console.log(`${i + 1}. [${r.error}] ${r.title.substring(0, 50)}...`);
    });
  }

  console.log('\n✨ Done!\n');
}

main().catch(console.error);
