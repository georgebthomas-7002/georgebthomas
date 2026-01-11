#!/usr/bin/env node

/**
 * Import articles from Excel spreadsheet
 * Deduplicates against existing resources by URL
 * Auto-tags with Gemini API
 */

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const YAML = require('yaml');

// Load config for taxonomy
const configPath = path.join(__dirname, '..', 'sources.config.yaml');
const config = YAML.parse(fs.readFileSync(configPath, 'utf8'));

// Load existing resources
const resourcesPath = path.join(__dirname, '..', 'data', 'resources.json');
let existingData = { resources: [], taxonomy: config.taxonomy };
if (fs.existsSync(resourcesPath)) {
  existingData = JSON.parse(fs.readFileSync(resourcesPath, 'utf8'));
}

// Get existing URLs for deduplication
const existingUrls = new Set(existingData.resources.map(r => r.url.toLowerCase().replace(/\/$/, '')));

// Helper: Generate unique ID
function generateId(source, title) {
  const slug = title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);
  const hash = Math.random().toString(36).substring(2, 8);
  return `${source.toLowerCase().replace(/\s+/g, '-')}-${slug}-${hash}`;
}

// Helper: Clean text
function cleanText(text) {
  if (!text) return '';
  return text.replace(/\s+/g, ' ').trim();
}

// Auto-tag resources using Gemini API
async function autoTagResources(resources) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('⚠️  GEMINI_API_KEY not set. Skipping auto-tagging.');
    return resources;
  }

  console.log('\n🏷️  Auto-tagging resources with Gemini...');

  const { pillars, secondary_tags } = config.taxonomy;
  const batchSize = 20;
  const taggedResources = [];

  for (let i = 0; i < resources.length; i += batchSize) {
    const batch = resources.slice(i, i + batchSize);
    console.log(`   Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(resources.length/batchSize)}...`);

    const prompt = `Categorize each of the following content items. For each item, assign:
- 1-2 primary pillars from: ${pillars.join(', ')}
- 0-2 secondary tags from: ${secondary_tags.join(', ')}

Base your categorization on the title and description. Return ONLY a JSON array with objects containing "index", "pillars", and "tags" arrays.

Items to categorize:
${batch.map((r, idx) => `${idx}. "${r.title}" - ${r.description}`).join('\n')}

Response format:
[{"index": 0, "pillars": ["HubSpot"], "tags": ["Inbound Marketing"]}, ...]`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 2000 }
        })
      });

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const tags = JSON.parse(jsonMatch[0]);
        batch.forEach((resource, idx) => {
          const tagData = tags.find(t => t.index === idx);
          if (tagData) {
            resource.pillars = tagData.pillars || [];
            resource.tags = tagData.tags || [];
          }
        });
      }
    } catch (error) {
      console.error(`   Tagging error:`, error.message);
    }

    taggedResources.push(...batch);

    // Rate limiting
    if (i + batchSize < resources.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log(`   Tagged ${taggedResources.length} resources`);
  return taggedResources;
}

async function importSpreadsheet(filePath) {
  console.log('\n📊 Importing from spreadsheet:', filePath);
  console.log('='.repeat(50));

  // Read Excel file
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet);

  console.log(`   Found ${rows.length} rows in spreadsheet`);
  console.log(`   Existing resources: ${existingData.resources.length}`);
  console.log(`   Existing URLs to check: ${existingUrls.size}`);

  // Convert to resources and filter duplicates
  const newResources = [];
  let duplicates = 0;

  for (const row of rows) {
    const url = (row['Post URL'] || '').toLowerCase().replace(/\/$/, '');

    if (!url) continue;

    if (existingUrls.has(url)) {
      duplicates++;
      continue;
    }

    // Mark as seen to avoid duplicates within spreadsheet
    existingUrls.add(url);

    newResources.push({
      id: generateId('Sidekick Strategies', row['Post title'] || ''),
      title: cleanText(row['Post title'] || row['Post SEO title'] || ''),
      description: cleanText(row['Meta description'] || ''),
      url: row['Post URL'],
      thumbnail: '', // Spreadsheet doesn't have thumbnails
      publishedAt: '', // Spreadsheet doesn't have dates
      type: 'article',
      source: 'Sidekick Strategies',
      pillars: [],
      tags: []
    });
  }

  console.log(`   New articles to import: ${newResources.length}`);
  console.log(`   Duplicates skipped: ${duplicates}`);

  if (newResources.length === 0) {
    console.log('\n✅ No new articles to import.');
    return;
  }

  // Auto-tag new resources
  const taggedResources = await autoTagResources(newResources);

  // Merge with existing resources
  const allResources = [...existingData.resources, ...taggedResources];

  // Sort by date (resources with dates first, then by title)
  allResources.sort((a, b) => {
    if (a.publishedAt && b.publishedAt) {
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    }
    if (a.publishedAt) return -1;
    if (b.publishedAt) return 1;
    return a.title.localeCompare(b.title);
  });

  // Write output
  const output = {
    lastUpdated: new Date().toISOString(),
    totalResources: allResources.length,
    sources: existingData.sources || {},
    taxonomy: config.taxonomy,
    resources: allResources
  };

  fs.writeFileSync(resourcesPath, JSON.stringify(output, null, 2));

  console.log(`\n✅ Import complete!`);
  console.log(`   Total resources: ${allResources.length}`);
  console.log(`   New articles added: ${taggedResources.length}`);
}

// Get file path from command line or use default
const filePath = process.argv[2] || path.join(__dirname, '..', 'resource-center', 'SKS-Full-blog-export.xlsx');

importSpreadsheet(filePath).catch(console.error);
