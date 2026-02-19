
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Ata-ur-Rahman & Co.  - Legal Consultants & Advocates",
//   description: "Leading legal services in Corporate Advisory, Litigation, Criminal Defense, and more.",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         {children}
//       </body>
//     </html>
//   );
// }

import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import StructuredData from "./components/StructuredData";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

// Font optimization for Core Web Vitals
// Preloading fonts reduces LCP and improves perceived performance
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap", // Prevents FOIT (Flash of Invisible Text)
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Base URL for canonical URLs - update for production
const BASE_URL = "https://www.arclaws.com";

// Global metadata configuration
// Using Metadata API for optimal SEO and social sharing
export const metadata: Metadata = {
  // Title configuration with template for child pages
  title: {
    default: "Ata-ur-Rahman & Co. | Legal Consultants & Advocates Karachi",
    template: "%s | ARC Laws – Legal Experts",
  },
  
  // Meta description - optimized for search click-through (max 155 chars)
  description:
    "Leading legal services in Karachi since 1972. Expert advocates in Corporate Advisory, Litigation, Criminal Defense, Family Law & Real Estate. Free consultation.",
  
  // Canonical URL configuration
  metadataBase: new URL(BASE_URL),
  
  // Keywords for additional SEO context
  keywords: [
    "lawyer Karachi",
    "legal consultant Pakistan",
    "advocate Sindh",
    "corporate lawyer",
    "litigation attorney",
    "criminal defense lawyer",
    "family law attorney",
    "property lawyer Karachi",
    "ARC Laws",
    "Ata-ur-Rahman",
  ].join(", "),
  
  // Author and publisher information
  authors: [{ name: "Ata-ur-Rahman & Co." }],
  
  // OpenGraph metadata for social sharing
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: BASE_URL,
    siteName: "Ata-ur-Rahman & Co.",
    title: "Ata-ur-Rahman & Co. | Legal Consultants & Advocates",
    description:
      "Premier legal services in Karachi with over 50 years of excellence. Expert representation in litigation, corporate law, and more.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Ata-ur-Rahman & Co. Logo",
      },
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Ata-ur-Rahman & Co. | Legal Consultants & Advocates",
    description:
      "Leading legal services in Karachi since 1972. Expert advocates in Corporate Advisory, Litigation, Criminal Defense & more.",
    images: ["/logo.png"],
  },
  
  // Robots configuration for search engine crawling
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Icon configuration for logo display in search results
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    shortcut: "/favicon.ico",
  },

  // Manifest for PWA support
  manifest: `${BASE_URL}/site.webmanifest`,
};

// Viewport configuration for mobile optimization and Core Web Vitals
// Separated from metadata as per Next.js 15 requirements
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#1e3a5f",
};

// Layout component with structured data injection
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Structured data for rich search results and logo display */}
        <StructuredData type="all" />
      </head>
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
