import { MetadataRoute } from 'next';

/**
 * Robots.txt Generator
 * 
 * Instructs search engine crawlers on how to index the site.
 * This file is automatically served at /robots.txt by Next.js
 * 
 * Key directives:
 * - Allow: Pages that should be indexed
 * - Disallow: Pages that should not be indexed
 * - Sitemap: Location of XML sitemap
 * - Crawl-delay: Rate limiting for crawlers (optional)
 */

const BASE_URL = 'https://www.arclaws.com';

export default function robots(): MetadataRoute.Robots {
  return {
    // Allow all search engines to crawl the site
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/services',
          '/team',
          '/cases',
          '/publications',
          '/contact',
          '/shc-cases',
          '/district-cases',
        ],
        // Disallow admin, API routes, and private areas
        disallow: [
          '/api/',
          '/_next/',
          '/static/',
          '/*.json$',
          '/*.xml$',
          '/*.txt$',
        ],
      },
      // Specific rules for Google bots
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/services',
          '/team',
          '/cases',
          '/publications',
          '/contact',
        ],
        // Allow Google to use all optimization features
        disallow: [
          '/api/',
          '/_next/',
        ],
      },
      // Specific rules for Bing
      {
        userAgent: 'bingbot',
        allow: [
          '/',
          '/services',
          '/team',
          '/cases',
          '/publications',
          '/contact',
        ],
        disallow: [
          '/api/',
          '/_next/',
        ],
      },
    ],
    // Sitemap location for faster discovery
    sitemap: `${BASE_URL}/sitemap.xml`,
    // Host directive (optional, helps with canonical domain)
    host: BASE_URL,
  };
}
