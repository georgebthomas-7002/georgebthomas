#!/usr/bin/env node
const XLSX = require('xlsx');

const wb = XLSX.readFile('resource-center/SKS-Full-blog-export.xlsx');
const sheet = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet);

// Analyze URLs
const urls = rows.map(r => r['Post URL']).filter(Boolean);
const uniqueUrls = new Set(urls);

const validUrls = [];
const drafts = [];
const fragments = [];
const tempSlugs = [];

for (const row of rows) {
  const url = row['Post URL'];

  if (!url || typeof url !== 'string' || !url.startsWith('http')) {
    fragments.push(row);
  } else if (url.includes('DRAFT')) {
    drafts.push(url);
  } else if (url.includes('-temporary-slug-')) {
    tempSlugs.push(url);
  } else if (url.startsWith('https://sidekickstrategies.com/blog/') &&
             !url.includes('/tag/') &&
             !url.includes('/page/')) {
    validUrls.push(url);
  }
}

const uniqueValidUrls = new Set(validUrls);

console.log('Spreadsheet Analysis:');
console.log('  Total rows:', rows.length);
console.log('  Unique URLs:', uniqueUrls.size);
console.log('  Valid article URLs:', uniqueValidUrls.size);
console.log('  Drafts:', drafts.length);
console.log('  Temp slugs:', tempSlugs.length);
console.log('  Missing/invalid URLs:', fragments.length);

// Blog names
const blogNames = new Set(rows.map(r => r['Blog name']).filter(Boolean));
console.log('  Blog names:', Array.from(blogNames));

// Duplicates
const duplicates = validUrls.length - uniqueValidUrls.size;
console.log('  Duplicate URLs:', duplicates);
