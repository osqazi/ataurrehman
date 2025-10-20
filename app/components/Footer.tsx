import Link from 'next/link';
import { Scale, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Scale className="h-6 w-6 text-primary-400" />
              <span className="text-lg font-bold">Ata-ur-Rehman & Co.</span>
            </div>
            <p className="text-gray-400 text-sm">
              Providing exceptional legal services with integrity, expertise, and dedication since 1995.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/team" className="hover:text-white transition-colors">Our Team</Link></li>
              <li><Link href="/cases" className="hover:text-white transition-colors">Notable Cases</Link></li>
              <li><Link href="/publications" className="hover:text-white transition-colors">Publications</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Corporate Advisory</li>
              <li>Litigation & Dispute</li>
              <li>Criminal Defense</li>
              <li>Family Law</li>
              <li>Real Estate</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+92-XXX-XXXXXXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@ataurrehmanlaw.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Main Office, City Center</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Ata-ur-Rehman & Co. All rights reserved.</p>
          <p>Deveoloped by: MetaLog Inc. &copy; - </p>
        </div>
      </div>
    </footer>
  );
}