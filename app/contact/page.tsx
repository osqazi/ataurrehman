import type { Metadata } from "next";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ContactForm from '@/app/components/ContactForm';
import { Phone, Mail, MapPin, Clock, Scale } from 'lucide-react';
import LocationMap from '../components/LocationMap';
import StructuredData from '../components/StructuredData';

// Contact page metadata - optimized for local SEO and contact intent
export const metadata: Metadata = {
  title: "Contact Us | Free Legal Consultation Karachi | Ata-ur-Rahman & Co.",
  description:
    "Get in touch with Karachi's leading law firm. Free consultation available. Call +92-21-35685596 or visit us at Al Ameera Center, Saddar, Karachi.",
  keywords: [
    "contact lawyer Karachi",
    "legal consultation Pakistan",
    "law firm contact",
    "free legal advice Karachi",
    "attorney contact",
    "lawyer phone number",
    "legal help Karachi",
  ].join(", "),
  openGraph: {
    title: "Contact Us | Free Legal Consultation",
    description: "Get in touch with Karachi's leading law firm. Free consultation available.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Contact Ata-ur-Rahman & Co.",
      },
    ],
  },
  alternates: {
    canonical: "https://www.arclaws.com/contact",
  },
};

export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Structured data for contact page with LocalBusiness schema */}
      <StructuredData type="localBusiness" />
      <Header />
      
      {/* Contact Header */}
      <section className="bg-primary-700 text-white">
        <div className="container-custom section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-primary-100">
              Ready to discuss your legal needs? Book a consultation with our expert team today.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Office Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Scale className="h-6 w-6 text-primary-600 mr-2" />
                  Office Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Main Office</p>
                      <p className="text-gray-600">206, Al Ameera Center, Near Passport Office</p>
                      <p className="text-gray-600">Shahrah-e-Iraq, Saddar</p>
                      <p className="text-gray-600">Karachi, Pakistan</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">+92-21-35685596</p>
                      <p className="text-gray-600">+92-21-35686689</p>
                    </div>
                  </div>
                  
                  {/* <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">info@ataurrehmanlaw.com</p>
                      <p className="text-gray-600">consult@ataurrehmanlaw.com</p>
                    </div>
                  </div> */}
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Office Hours</p>
                      <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Sat: 9:00 AM - 1:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              <LocationMap/>
              

              {/* Emergency Contact */}
              {/* <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-primary-900 mb-3">Emergency Legal Assistance</h3>
                <p className="text-primary-700 mb-4">
                  For urgent legal matters requiring immediate attention outside office hours.
                </p>
                <div className="bg-primary-100 rounded-lg p-4">
                  <p className="font-semibold text-primary-900">Emergency Hotline</p>
                  <p className="text-primary-700 text-lg font-bold">+92-XXX-EMERGENCY</p>
                  <p className="text-primary-600 text-sm mt-1">Available 24/7 for genuine emergencies</p>
                </div>
              </div> */}

              {/* Consultation Types
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Consultation Options</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Online Consultation</span>
                    <span className="text-primary-600 font-semibold">Free</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Phone Consultation</span>
                    <span className="text-primary-600 font-semibold">Free</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Office Consultation</span>
                    <span className="text-primary-600 font-semibold">Free</span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}