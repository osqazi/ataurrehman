/**
 * StructuredData Component
 *
 * Implements JSON-LD structured data for SEO optimization.
 * This helps Google display rich results including company logo,
 * sitelinks, and enhanced search listings.
 *
 * Schemas implemented:
 * - Organization (for company logo in search results)
 * - WebSite (for sitelinks search box)
 * - LegalService (primary business type)
 * - LocalBusiness (for local SEO)
 * - BreadcrumbList (for breadcrumb navigation in search)
 */

interface StructuredDataProps {
  type?: 'organization' | 'website' | 'legalService' | 'localBusiness' | 'breadcrumb' | 'all';
  additionalData?: Record<string, unknown>;
}

// Base organization data - used across multiple schemas
// Note: @type is not included here as it's set by each schema function
const organizationData = {
  name: "Ata-ur-Rahman & Co.",
  alternateName: "ARC Laws",
  url: "https://www.arclaws.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.arclaws.com/logo.png",
    width: 512,
    height: 512,
  },
  image: "https://www.arclaws.com/logo.png",
  description: "Leading legal services in Corporate Advisory, Litigation, Criminal Defense, and more. Serving clients with excellence since 1972.",
  foundingDate: "1972",
  founder: {
    "@type": "Person",
    name: "Justice (Retd.) Ata-ur-Rahman",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "206, Al Ameera Center, Near Passport Office, Shahrah-e-Liaquat, Saddar",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    postalCode: "74400",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 24.8607,
    longitude: 67.0011,
  },
  telephone: "+92-21-35685596",
  email: "info@arclaws.com",
  priceRange: "$$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/ata-ur-rahman-co",
  ],
};

// Organization schema - enables logo in search results
const OrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  ...organizationData,
});

// WebSite schema - enables sitelinks search box
const WebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ata-ur-Rahman & Co. - Legal Consultants & Advocates",
  alternateName: "ARC Laws",
  url: "https://www.arclaws.com",
  description: "Premier legal services in Karachi, Pakistan. Expert legal consultants and advocates with over 50 years of excellence.",
  publisher: {
    "@type": "Organization",
    name: "Ata-ur-Rahman & Co.",
    url: "https://www.arclaws.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.arclaws.com/logo.png",
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.arclaws.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  } as unknown as Record<string, unknown>,
});

// LegalService schema - primary business type for legal services
const LegalServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LegalService",
  ...organizationData,
  areaServed: {
    "@type": "Country",
    name: "Pakistan",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Legal Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Litigation & Dispute Resolution",
          description: "Comprehensive legal representation in civil and commercial disputes.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Corporate Advisory",
          description: "Expert legal advice for corporate matters and business transactions.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Criminal Defense",
          description: "Aggressive defense strategies to protect your rights and freedom.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Family Law",
          description: "Compassionate legal support for family matters and divorce proceedings.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Real Estate & Property",
          description: "Expert handling of property transactions, disputes, and real estate law.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Employment Law",
          description: "Legal advice on employment contracts, disputes, and labor laws.",
        },
      },
    ],
  },
});

// LocalBusiness schema - for local SEO optimization
const LocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  ...organizationData,
  servesCuisine: undefined, // Not applicable for legal services
  menu: undefined, // Not applicable
});

// BreadcrumbList schema - for breadcrumb navigation in search results
interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.item,
  })),
});

/**
 * Main StructuredData component
 * Renders appropriate JSON-LD script tag based on type
 */
export default function StructuredData({ 
  type = 'all', 
  additionalData 
}: StructuredDataProps) {
  let schema;

  switch (type) {
    case 'organization':
      schema = OrganizationSchema();
      break;
    case 'website':
      schema = WebSiteSchema();
      break;
    case 'legalService':
      schema = LegalServiceSchema();
      break;
    case 'localBusiness':
      schema = LocalBusinessSchema();
      break;
    case 'breadcrumb':
      // Breadcrumb requires items prop - return null if not provided
      if (additionalData?.items) {
        schema = BreadcrumbSchema({ items: additionalData.items as BreadcrumbItem[] });
      } else {
        schema = null;
      }
      break;
    case 'all':
    default:
      // Combine all schemas into a single script for comprehensive SEO
      schema = {
        "@graph": [
          OrganizationSchema(),
          WebSiteSchema(),
          LegalServiceSchema(),
          LocalBusinessSchema(),
        ],
      };
  }

  if (!schema) {
    return null;
  }

  // Merge additional data if provided
  const finalSchema = additionalData && type !== 'breadcrumb' 
    ? { ...schema, ...additionalData }
    : schema;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema) }}
    />
  );
}

// Export individual schema generators for use with generateMetadata
export {
  OrganizationSchema,
  WebSiteSchema,
  LegalServiceSchema,
  LocalBusinessSchema,
  BreadcrumbSchema,
};
