import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { projectId, dataset, apiVersion } from './config'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: { _type: string; asset: { _ref: string } }) {
  return builder.image(source)
}

// GROQ queries
export const queries = {
  // Hero section content
  hero: `*[_type == "hero"][0] {
    tagline,
    title,
    titleAccent,
    description,
    primaryCta,
    secondaryCta,
    image
  }`,

  // About section content
  about: `*[_type == "about"][0] {
    subtitle,
    title,
    content,
    image,
    stats[] {
      number,
      label
    }
  }`,

  // Services
  services: `*[_type == "service"] | order(order asc) {
    _id,
    title,
    description,
    icon
  }`,

  // Testimonials
  testimonials: `*[_type == "testimonial"] | order(order asc) {
    _id,
    quote,
    name,
    role,
    company,
    avatar
  }`,

  // Site settings
  settings: `*[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    socialLinks[] {
      platform,
      url
    },
    contactEmail
  }`,
}
