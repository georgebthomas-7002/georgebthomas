import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/coaching/thank-you'],
    },
    sitemap: 'https://www.georgebthomas.com/sitemap.xml',
  }
}
