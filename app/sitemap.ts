import { MetadataRoute } from 'next';

/**
 * Dynamic Sitemap Generator
 * 
 * Generates an XML sitemap for search engines to discover all pages.
 * This helps with:
 * - Faster indexing of all pages
 * - Priority signals for important pages
 * - Crawl frequency hints
 * - Sitelinks optimization
 */

const BASE_URL = 'https://www.arclaws.com';

// Static routes with their priority and change frequency
// Priority: 1.0 = highest, 0.1 = lowest
// Change frequency: how often content is expected to change
const staticRoutes = [
  {
    url: '',
    priority: 1.0,
    changeFrequency: 'daily' as const,
  },
  {
    url: '/services',
    priority: 0.9,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/team',
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/cases',
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/publications',
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/contact',
    priority: 0.9,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/shc-cases',
    priority: 0.7,
    changeFrequency: 'daily' as const,
  },
  {
    url: '/district-cases',
    priority: 0.7,
    changeFrequency: 'daily' as const,
  },
];

/**
 * Generates sitemap entries for dynamic team member pages
 * Team members have individual profile pages
 */
async function getTeamMemberRoutes(): Promise<{ url: string; priority: number; changeFrequency: 'monthly' | 'weekly' | 'daily' | 'yearly' | 'never' | 'hourly' | 'always' }[]> {
  try {
    // Import team data dynamically
    const teamData = await import('@/app/data/teamMembers.json');
    
    if (teamData?.teamMembers && Array.isArray(teamData.teamMembers)) {
      return teamData.teamMembers.map((member: { id: string | number }) => ({
        url: `/team/${member.id}`,
        priority: 0.7,
        changeFrequency: 'monthly' as const,
      }));
    }
  } catch (error) {
    // If team data is not available, return empty array
    console.warn('Team data not found for sitemap generation');
  }
  
  return [];
}

/**
 * Main sitemap export
 * Next.js automatically generates /sitemap.xml from this file
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get dynamic routes
  const teamMemberRoutes = await getTeamMemberRoutes();
  
  // Combine all routes
  const allRoutes = [...staticRoutes, ...teamMemberRoutes];
  
  // Generate sitemap entries with full URLs and dates
  return allRoutes.map((route) => ({
    url: `${BASE_URL}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
