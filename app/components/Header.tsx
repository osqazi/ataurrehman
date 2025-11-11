"use client";
import { useState } from "react";
import Link from "next/link";
import { Scale, Menu, X } from "lucide-react";

import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic']
});


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
         {/* Logo */}
<Link href="/" className="flex items-center space-x-3">
  <Scale className="h-12 w-12 text-primary-700" />
  <div className="flex flex-col">
    <span className={`${playfair.className} text-2xl font-semibold text-gray-900 italic tracking-tight`}>
      <span className="text-4xl text-primary-700 font-bold italic mr-0.5">A</span>
      ta-ur-Rahman & Co.
    </span> 
    <span className={`${playfair.className} text-lg font-light text-gray-600 italic tracking-wide mt-1`}>
      Legal Consultants and Advocates
    </span>
  </div>
</Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Services
            </Link>
            <Link
              href="/team"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Our Team
            </Link>
            <Link
              href="/cases"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Notable Cases
            </Link>
            <Link
              href="/publications"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Publications
            </Link>
            <Link
              href="/shc-cases"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Case Status
            </Link>

            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                Services
              </Link>
              <Link
                href="/team"
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                Our Team
              </Link>
              <Link
                href="/cases"
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                Notable Cases
              </Link>
              <Link
                href="/publications"
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                Publications
              </Link>
              <Link
                href="/shc-cases"
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                Case Status
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
