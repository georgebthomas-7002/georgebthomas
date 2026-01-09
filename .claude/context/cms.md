# CMS Context

## Sanity Config
- **Project ID:** lw5fs0o8
- **Dataset:** production
- **API Version:** 2024-01-01

## Schemas

### hero
- tagline (string)
- title (string)
- titleAccent (string)
- description (text)
- primaryCTA, secondaryCTA (object: text, link)
- image (image with alt)

### about
- title, subtitle (string)
- description (text, rich)
- image (image with alt)
- stats (array: label, value)

### service
- title, description (string)
- icon (string - icon name)
- features (array of strings)
- order (number)

### testimonial
- quote (text)
- author, role, company (string)
- image (image)
- featured (boolean)

### siteSettings
- siteName, tagline (string)
- logo, favicon (image)
- socialLinks (array: platform, url)
- contactEmail, contactPhone (string)

## CORS Origins
- http://localhost:3000
- https://georgebthomas.vercel.app
