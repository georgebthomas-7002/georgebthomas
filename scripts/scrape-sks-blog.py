#!/usr/bin/env python3
"""Scrape all articles from Sidekick Strategies blog."""

import json
import re
import time
import urllib.request
from urllib.error import URLError, HTTPError
from datetime import datetime

BASE_URL = "https://sidekickstrategies.com/blog"

def fetch_page(url):
    """Fetch a page and return HTML."""
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (compatible; ResourceAggregator/1.0)'
        })
        with urllib.request.urlopen(req, timeout=30) as response:
            return response.read().decode('utf-8', errors='ignore')
    except (URLError, HTTPError) as e:
        print(f"Error fetching {url}: {e}")
        return None

def extract_articles(html):
    """Extract article data from blog listing HTML."""
    articles = []

    # Find all article links - look for blog post URLs
    # Pattern: /blog/article-slug
    article_pattern = r'<a[^>]+href="(https://sidekickstrategies\.com/blog/[^"]+)"[^>]*>([^<]*)</a>'

    # Also look for article cards with more context
    # HubSpot blogs typically have structured markup

    # Find all unique blog URLs
    urls_found = set()
    for match in re.finditer(r'href="(https://sidekickstrategies\.com/blog/[a-z0-9-]+)"', html, re.IGNORECASE):
        url = match.group(1)
        # Skip pagination and tag pages
        if '/blog/tag/' not in url and '/blog/page/' not in url and url != 'https://sidekickstrategies.com/blog':
            urls_found.add(url)

    return list(urls_found)

def get_article_details(url):
    """Fetch individual article page to get full details."""
    html = fetch_page(url)
    if not html:
        return None

    article = {'url': url}

    # Extract title from og:title or title tag
    match = re.search(r'<meta[^>]+property=["\']og:title["\'][^>]+content=["\']([^"\']+)["\']', html, re.IGNORECASE)
    if not match:
        match = re.search(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:title["\']', html, re.IGNORECASE)
    if not match:
        match = re.search(r'<title>([^<]+)</title>', html, re.IGNORECASE)
    if match:
        article['title'] = match.group(1).strip()

    # Extract description from og:description or meta description
    match = re.search(r'<meta[^>]+property=["\']og:description["\'][^>]+content=["\']([^"\']+)["\']', html, re.IGNORECASE)
    if not match:
        match = re.search(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:description["\']', html, re.IGNORECASE)
    if not match:
        match = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']+)["\']', html, re.IGNORECASE)
    if match:
        article['description'] = match.group(1).strip()[:300] + '...' if len(match.group(1)) > 300 else match.group(1).strip()

    # Extract thumbnail from og:image
    match = re.search(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']', html, re.IGNORECASE)
    if not match:
        match = re.search(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image["\']', html, re.IGNORECASE)
    if match:
        article['thumbnail'] = match.group(1)

    # Extract published date from article:published_time or datePublished
    match = re.search(r'<meta[^>]+property=["\']article:published_time["\'][^>]+content=["\']([^"\']+)["\']', html, re.IGNORECASE)
    if not match:
        match = re.search(r'"datePublished":\s*"([^"]+)"', html)
    if match:
        article['publishedAt'] = match.group(1)

    return article

def get_max_pages(html):
    """Find the maximum number of pages from pagination."""
    # Look for pagination links like /blog/page/N
    pages = re.findall(r'/blog/page/(\d+)', html)
    if pages:
        return max(int(p) for p in pages)
    return 1

def main():
    print("Scraping Sidekick Strategies Blog...")
    print("=" * 50)

    all_urls = set()

    # Fetch first page to get pagination info
    html = fetch_page(BASE_URL)
    if not html:
        print("Failed to fetch blog homepage")
        return

    max_pages = get_max_pages(html)
    print(f"Found {max_pages} pages to scrape")

    # Scrape each page
    for page in range(1, max_pages + 1):
        if page == 1:
            url = BASE_URL
        else:
            url = f"{BASE_URL}/page/{page}"

        print(f"\n[Page {page}/{max_pages}] {url}")
        html = fetch_page(url)
        if html:
            urls = extract_articles(html)
            print(f"  Found {len(urls)} article URLs")
            all_urls.update(urls)

        time.sleep(0.5)  # Rate limit

    print(f"\n{'=' * 50}")
    print(f"Total unique article URLs found: {len(all_urls)}")

    # Now fetch details for each article
    articles = []
    for i, url in enumerate(sorted(all_urls), 1):
        print(f"\n[{i}/{len(all_urls)}] Fetching: {url[:60]}...")
        details = get_article_details(url)
        if details and details.get('title'):
            articles.append(details)
            print(f"  ✓ {details.get('title', 'No title')[:50]}...")
        else:
            print(f"  ✗ Failed to get details")
        time.sleep(0.3)  # Rate limit

    # Save scraped articles
    output = {
        'scraped_at': datetime.now().isoformat(),
        'total': len(articles),
        'articles': articles
    }

    with open('data/sks-scraped.json', 'w') as f:
        json.dump(output, f, indent=2)

    print(f"\n{'=' * 50}")
    print(f"Scraped {len(articles)} articles")
    print(f"Saved to data/sks-scraped.json")

if __name__ == '__main__':
    main()
