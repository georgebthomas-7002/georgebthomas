#!/usr/bin/env node

/**
 * Cleanup Invalid URLs
 * Removes resources with invalid URLs (not starting with http)
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'resources.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const before = data.resources.length;
const invalid = data.resources.filter(r => !r.url || !r.url.startsWith('http'));
const valid = data.resources.filter(r => r.url && r.url.startsWith('http'));

console.log('\n🧹 Cleaning up invalid URLs\n');
console.log('='.repeat(40));
console.log(`📊 Before: ${before} resources`);
console.log(`❌ Invalid removed: ${invalid.length}`);
console.log(`✅ Valid remaining: ${valid.length}`);

// Update data
data.resources = valid;
data.totalResources = valid.length;
data.lastUpdated = new Date().toISOString();

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('\n💾 Saved cleaned resources.json');
console.log('='.repeat(40));
