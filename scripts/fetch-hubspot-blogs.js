#!/usr/bin/env node
/**
 * Fetch all blog posts from HubSpot API
 * Uses the CMS Blog Posts API v3
 */

const https = require('https');
const fs = require('fs');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const HUBSPOT_TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
const PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

if (!HUBSPOT_TOKEN) {
  console.error('Error: HUBSPOT_PRIVATE_APP_TOKEN not found in .env.local');
  process.exit(1);
}

console.log('HubSpot Blog Export');
console.log('='.repeat(50));
console.log(`Portal ID: ${PORTAL_ID}`);

function fetchFromHubSpot(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.hubapi.com',
      path: path,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Failed to parse response: ${e.message}`));
          }
        } else {
          reject(new Error(`API Error ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function fetchAllBlogPosts() {
  const allPosts = [];
  let after = null;
  let page = 1;

  console.log('\nFetching blog posts...');

  while (true) {
    const params = new URLSearchParams({
      limit: '100',
      state: 'PUBLISHED'
    });

    if (after) {
      params.set('after', after);
    }

    process.stdout.write(`\rPage ${page}: fetching...`);

    try {
      const response = await fetchFromHubSpot(`/cms/v3/blogs/posts?${params}`);

      if (response.results && response.results.length > 0) {
        allPosts.push(...response.results);
        process.stdout.write(`\rPage ${page}: ${response.results.length} posts (total: ${allPosts.length})`);
      }

      // Check for more pages
      if (response.paging && response.paging.next && response.paging.next.after) {
        after = response.paging.next.after;
        page++;
      } else {
        break;
      }
    } catch (error) {
      console.error(`\nError on page ${page}: ${error.message}`);
      break;
    }
  }

  console.log(`\n\nTotal posts fetched: ${allPosts.length}`);
  return allPosts;
}

async function main() {
  try {
    // Fetch all blog posts
    const posts = await fetchAllBlogPosts();

    if (posts.length === 0) {
      console.log('No blog posts found.');
      return;
    }

    // Transform to resource format
    const resources = posts.map(post => ({
      id: `sidekick-strategies-${post.slug || post.id}`,
      title: post.htmlTitle || post.name || 'Untitled',
      description: (post.metaDescription || post.postSummary || '').slice(0, 300),
      url: post.url || `https://sidekickstrategies.com/blog/${post.slug}`,
      thumbnail: post.featuredImage || post.featuredImageAltText || null,
      publishedAt: post.publishDate || post.created,
      type: 'article',
      source: 'Sidekick Strategies',
      pillars: ['HubSpot', 'Marketing & Sales'],
      tags: (post.tagIds || []).map(id => `tag-${id}`),
      // Store additional metadata
      _hubspot: {
        id: post.id,
        slug: post.slug,
        authorName: post.authorName,
        blogId: post.contentGroupId
      }
    }));

    // Save raw export for reference
    fs.writeFileSync('data/hubspot-blog-export.json', JSON.stringify({
      exportedAt: new Date().toISOString(),
      totalPosts: posts.length,
      posts: posts
    }, null, 2));
    console.log(`\nSaved raw export to data/hubspot-blog-export.json`);

    // Load current resources and update SKS entries
    const resourcesPath = 'data/resources.json';
    const currentResources = JSON.parse(fs.readFileSync(resourcesPath, 'utf-8'));

    // Remove existing SKS resources
    currentResources.resources = currentResources.resources.filter(r => r.source !== 'Sidekick Strategies');

    // Add new SKS resources (only those with thumbnails)
    const withThumbnails = resources.filter(r => r.thumbnail);
    const withoutThumbnails = resources.filter(r => !r.thumbnail);

    currentResources.resources.push(...withThumbnails);
    currentResources.totalResources = currentResources.resources.length;
    currentResources.lastUpdated = new Date().toISOString();

    fs.writeFileSync(resourcesPath, JSON.stringify(currentResources, null, 2));

    console.log(`\nResults:`);
    console.log(`  Total from HubSpot: ${posts.length}`);
    console.log(`  With thumbnails: ${withThumbnails.length}`);
    console.log(`  Without thumbnails: ${withoutThumbnails.length}`);
    console.log(`  Total resources: ${currentResources.totalResources}`);

    // Show sample
    console.log(`\nSample post:`);
    console.log(JSON.stringify(resources[0], null, 2));

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
