"use client";
import { useState } from "react";
import Link from "next/link";
import { Scale, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">
              Ata-ur-Rehman & Co. Advocates
            </span>
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
              href="/cases"
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
