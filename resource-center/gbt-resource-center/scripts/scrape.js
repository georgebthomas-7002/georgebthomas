#!/usr/bin/env node

/**
 * Resource Aggregator Scraper
 * 
 * Fetches content from YouTube channels, podcast RSS feeds, and blog RSS feeds.
 * Auto-tags each resource using Claude API based on the configured taxonomy.
 * Outputs to data/resources.json
 * 
 * Usage:
 *   npm run scrape              - Scrape all sources
 *   npm run scrape:youtube      - YouTube only
 *   npm run scrape:podcasts     - Podcasts only
 *   npm run scrape:blogs        - Blogs only
 * 
 * Required environment variables:
 *   YOUTUBE_API_KEY     - Google YouTube Data API key
 *   GEMINI_API_KEY      - Google Gemini API key for auto-tagging
 */

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const https = require('https');
const { parseString } = require('xml2js');
const YAML = require('yaml');

// Load config
const configPath = path.join(__dirname, '..', 'sources.config.yaml');
const config = YAML.parse(fs.readFileSync(configPath, 'utf8'));

// Parse command line args
const args = process.argv.slice(2);
const youtubeOnly = args.includes('--youtube-only');
const podcastsOnly = args.includes('--podcasts-only');
const blogsOnly = args.includes('--blogs-only');
const skipTagging = args.includes('--skip-tagging');

// Helper: Fetch URL content
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : require('http');
    protocol.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

// Helper: Parse RSS/XML
function parseXML(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, { explicitArray: false }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// Helper: Generate unique ID
function generateId(source, title, date) {
  const slug = title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);
  const dateStr = date ? new Date(date).toISOString().split('T')[0] : 'undated';
  return `${source.toLowerCase().replace(/\s+/g, '-')}-${slug}-${dateStr}`;
}

// Helper: Clean HTML from text
function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Helper: Truncate description
function truncateDescription(text, maxLength = 200) {
  const clean = cleanText(text);
  if (clean.length <= maxLength) return clean;
  return clean.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

// Fetch YouTube channel videos
async function fetchYouTubeChannel(channel) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    console.warn('⚠️  YOUTUBE_API_KEY not set. Skipping YouTube channels.');
    return [];
  }

  console.log(`📺 Fetching YouTube: ${channel.name}`);
  
  try {
    // First, get channel ID from handle
    const channelHandle = channel.id.replace('@', '');
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${channelHandle}&key=${apiKey}`;
    const searchData = JSON.parse(await fetchUrl(searchUrl));
    
    if (!searchData.items || searchData.items.length === 0) {
      console.warn(`   Could not find channel: ${channel.name}`);
      return [];
    }
    
    const channelId = searchData.items[0].snippet.channelId;
    
    // Get channel uploads playlist
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`;
    const channelData = JSON.parse(await fetchUrl(channelUrl));
    
    if (!channelData.items || channelData.items.length === 0) {
      console.warn(`   Could not get channel details: ${channel.name}`);
      return [];
    }
    
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
    
    // Get videos from uploads playlist (last 50)
    const videosUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${uploadsPlaylistId}&key=${apiKey}`;
    const videosData = JSON.parse(await fetchUrl(videosUrl));
    
    if (!videosData.items) {
      return [];
    }

    const resources = videosData.items.map(item => ({
      id: generateId(channel.name, item.snippet.title, item.snippet.publishedAt),
      title: item.snippet.title,
      description: truncateDescription(item.snippet.description),
      url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url || '',
      publishedAt: item.snippet.publishedAt,
      type: 'video',
      source: channel.name,
      pillars: [],
      tags: []
    }));

    console.log(`   Found ${resources.length} videos`);
    return resources;
  } catch (error) {
    console.error(`   Error fetching ${channel.name}:`, error.message);
    return [];
  }
}

// Fetch podcast RSS feed
async function fetchPodcastFeed(feed) {
  console.log(`🎙️  Fetching Podcast: ${feed.name}`);
  
  try {
    const xml = await fetchUrl(feed.url);
    const parsed = await parseXML(xml);
    
    const channel = parsed.rss?.channel;
    if (!channel) {
      console.warn(`   Invalid RSS feed: ${feed.name}`);
      return [];
    }

    const items = Array.isArray(channel.item) ? channel.item : [channel.item].filter(Boolean);
    
    const resources = items.slice(0, 100).map(item => {
      // Get episode URL (prefer link, fallback to enclosure)
      let episodeUrl = item.link;
      if (!episodeUrl && item.enclosure) {
        episodeUrl = item.enclosure.$.url;
      }

      // Get thumbnail from itunes:image or channel image
      let thumbnail = '';
      if (item['itunes:image']?.$?.href) {
        thumbnail = item['itunes:image'].$.href;
      } else if (channel['itunes:image']?.$?.href) {
        thumbnail = channel['itunes:image'].$.href;
      } else if (channel.image?.url) {
        thumbnail = channel.image.url;
      }

      // Get duration
      const duration = item['itunes:duration'] || '';

      return {
        id: generateId(feed.name, item.title, item.pubDate),
        title: cleanText(item.title),
        description: truncateDescription(item.description || item['itunes:summary'] || ''),
        url: episodeUrl,
        thumbnail,
        publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : '',
        duration: duration,
        type: 'podcast',
        source: feed.name,
        pillars: [],
        tags: []
      };
    });

    console.log(`   Found ${resources.length} episodes`);
    return resources;
  } catch (error) {
    console.error(`   Error fetching ${feed.name}:`, error.message);
    return [];
  }
}

// Fetch blog RSS feed
async function fetchBlogFeed(feed) {
  console.log(`📝 Fetching Blog: ${feed.name}`);
  
  try {
    const xml = await fetchUrl(feed.url);
    const parsed = await parseXML(xml);
    
    // Handle both RSS and Atom formats
    let items = [];
    if (parsed.rss?.channel?.item) {
      items = Array.isArray(parsed.rss.channel.item) 
        ? parsed.rss.channel.item 
        : [parsed.rss.channel.item];
    } else if (parsed.feed?.entry) {
      items = Array.isArray(parsed.feed.entry) 
        ? parsed.feed.entry 
        : [parsed.feed.entry];
    }

    const resources = items.slice(0, 100).map(item => {
      // Handle RSS vs Atom format differences
      const title = item.title?._ || item.title || '';
      const link = item.link?.$.href || item.link || '';
      const description = item.description || item.summary?._ || item.summary || item.content?._ || '';
      const pubDate = item.pubDate || item.published || item.updated || '';
      
      // Try to extract thumbnail from content or media
      let thumbnail = '';
      if (item['media:thumbnail']?.$?.url) {
        thumbnail = item['media:thumbnail'].$.url;
      } else if (item['media:content']?.$?.url) {
        thumbnail = item['media:content'].$.url;
      } else if (item.enclosure?.$?.url && item.enclosure.$.type?.startsWith('image')) {
        thumbnail = item.enclosure.$.url;
      }

      return {
        id: generateId(feed.name, title, pubDate),
        title: cleanText(title),
        description: truncateDescription(description),
        url: link,
        thumbnail,
        publishedAt: pubDate ? new Date(pubDate).toISOString() : '',
        type: 'article',
        source: feed.name,
        pillars: [],
        tags: []
      };
    });

    console.log(`   Found ${resources.length} articles`);
    return resources;
  } catch (error) {
    console.error(`   Error fetching ${feed.name}:`, error.message);
    return [];
  }
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

  // Process in batches of 20
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
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            maxOutputTokens: 2000
          }
        })
      });

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      // Extract JSON from response
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

    // Rate limiting pause
    if (i + batchSize < resources.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log(`   Tagged ${taggedResources.length} resources`);
  return taggedResources;
}

// Main scrape function
async function scrape() {
  console.log('\n🚀 Starting Resource Aggregator Scrape\n');
  console.log('=' .repeat(50));
  
  let allResources = [];

  // Fetch YouTube channels
  if (!podcastsOnly && !blogsOnly) {
    for (const channel of config.youtube_channels || []) {
      const videos = await fetchYouTubeChannel(channel);
      allResources.push(...videos);
    }
  }

  // Fetch podcast feeds
  if (!youtubeOnly && !blogsOnly) {
    for (const feed of config.podcast_feeds || []) {
      const episodes = await fetchPodcastFeed(feed);
      allResources.push(...episodes);
    }
  }

  // Fetch blog feeds
  if (!youtubeOnly && !podcastsOnly) {
    for (const feed of config.blog_feeds || []) {
      const articles = await fetchBlogFeed(feed);
      allResources.push(...articles);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`📊 Total resources fetched: ${allResources.length}`);

  // Auto-tag if not skipped
  if (!skipTagging && allResources.length > 0) {
    allResources = await autoTagResources(allResources);
  }

  // Sort by date (newest first)
  allResources.sort((a, b) => {
    const dateA = new Date(a.publishedAt || 0);
    const dateB = new Date(b.publishedAt || 0);
    return dateB - dateA;
  });

  // Write output
  const output = {
    lastUpdated: new Date().toISOString(),
    totalResources: allResources.length,
    sources: {
      youtube: config.youtube_channels?.map(c => c.name) || [],
      podcasts: config.podcast_feeds?.map(f => f.name) || [],
      blogs: config.blog_feeds?.map(f => f.name) || []
    },
    taxonomy: config.taxonomy,
    resources: allResources
  };

  const outputPath = path.join(__dirname, '..', 'data', 'resources.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  
  console.log(`\n✅ Written to ${outputPath}`);
  console.log(`   ${allResources.filter(r => r.type === 'video').length} videos`);
  console.log(`   ${allResources.filter(r => r.type === 'podcast').length} podcast episodes`);
  console.log(`   ${allResources.filter(r => r.type === 'article').length} articles`);
  console.log('\n🎉 Scrape complete!\n');
}

// Run
scrape().catch(console.error);
