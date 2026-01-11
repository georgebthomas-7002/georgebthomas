#!/usr/bin/env python3
"""Fetch missing thumbnails from article og:image meta tags."""

import json
import re
import time
import urllib.request
from urllib.error import URLError, HTTPError

def get_og_image(url):
    """Fetch og:image from a URL."""
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (compatible; ThumbnailFetcher/1.0)'
        })
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode('utf-8', errors='ignore')

            # Look for og:image meta tag
            match = re.search(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']', html, re.IGNORECASE)
            if match:
                return match.group(1)

            # Try alternate format
            match = re.search(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image["\']', html, re.IGNORECASE)
            if match:
                return match.group(1)

    except (URLError, HTTPError, Exception) as e:
        print(f"  Error fetching {url}: {e}")

    return None

def main():
    with open('data/resources.json') as f:
        data = json.load(f)

    updated = 0
    failed = 0

    for i, resource in enumerate(data['resources']):
        # Skip if already has thumbnail
        if resource.get('thumbnail'):
            continue

        url = resource.get('url', '')
        if not url.startswith('http'):
            continue

        print(f"[{i+1}] Fetching: {resource.get('title', '')[:50]}...")

        og_image = get_og_image(url)
        if og_image:
            resource['thumbnail'] = og_image
            updated += 1
            print(f"  ✓ Found: {og_image[:60]}...")
        else:
            failed += 1
            print(f"  ✗ No og:image found")

        # Rate limit
        time.sleep(0.5)

    # Save updated data
    with open('data/resources.json', 'w') as f:
        json.dump(data, f, indent=2)

    print(f"\n{'='*50}")
    print(f"Updated: {updated} thumbnails")
    print(f"Failed: {failed} resources")
    print(f"Total resources: {len(data['resources'])}")

if __name__ == '__main__':
    main()
