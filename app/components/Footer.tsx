import Link from 'next/link';
import { Scale, Phone, Mail, MapPin } from 'lucide-react';

/**
 * Footer Component
 * 
 * Semantic HTML structure for SEO:
 * - Uses <footer> element for proper document structure
 * - Includes h2-h3 heading hierarchy for accessibility
 * - Contains important internal links for sitelinks optimization
 * - NAP (Name, Address, Phone) consistency for local SEO
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section - NAP for Local SEO */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Scale className="h-6 w-6 text-primary-400" aria-hidden="true" />
              <span className="text-lg font-bold">Ata-ur-Rehman & Co.</span>
            </div>
            <p className="text-gray-400 text-sm">
              Providing exceptional legal services with integrity, expertise, and dedication since 1972.
            </p>
          </div>

          {/* Quick Links - Important for sitelinks and internal linking */}
          <nav aria-label="Footer navigation">
            <h2 className="font-semibold mb-4 text-base">Quick Links</h2>
            <ul className="space-y-2 text-sm text-gray-400" role="list">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white transition-colors">Our Team</Link>
              </li>
              <li>
                <Link href="/cases" className="hover:text-white transition-colors">Notable Cases</Link>
              </li>
              <li>
                <Link href="/publications" className="hover:text-white transition-colors">Publications</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </nav>

          {/* Services Section - Keyword-rich for SEO */}
          <div>
            <h2 className="font-semibold mb-4 text-base">Practice Areas</h2>
            <ul className="space-y-2 text-sm text-gray-400" role="list">
              <li>Corporate Advisory</li>
              <li>Litigation & Dispute Resolution</li>
              <li>Criminal Defense</li>
              <li>Family Law & Divorce</li>
              <li>Real Estate & Property</li>
              <li>Employment Law</li>
              <li>Arbitration Services</li>
            </ul>
          </div>

          {/* Contact Info - NAP consistency for Local SEO */}
          <div>
            <h2 className="font-semibold mb-4 text-base">Contact Information</h2>
            <address className="space-y-2 text-sm text-gray-400 not-italic">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <a href="tel:+923002798986" className="hover:text-white transition-colors">
                  +92-300-2798986
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <a href="mailto:info@arclaws.com" className="hover:text-white transition-colors">
                  info@arclaws.com
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>
                  206, Al Ameera Center, Near Passport Office,<br />
                  Shahrah-e-Liaquat, Saddar,<br />
                  Karachi - Pakistan
                </span>
              </div>
            </address>
          </div>
        </div>

        {/* Copyright and Legal Links */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Ata-ur-Rahman & Co. All rights reserved.</p>
          <p className="mt-2">
            <a href="https://metalog.inc" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Developed by: MetaLog Inc.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}