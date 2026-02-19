import type { Metadata } from "next";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ServiceCard from '@/app/components/ServiceCard';
import { Briefcase, Scale, Shield, Heart, Home, Award, Users, Building } from 'lucide-react';
import StructuredData from '../components/StructuredData';

// Services page metadata - optimized for legal service keywords
export const metadata: Metadata = {
  title: "Legal Services Karachi | Corporate, Litigation, Criminal & Family Law",
  description:
    "Comprehensive legal services in Karachi: Corporate Advisory, Litigation, Criminal Defense, Family Law, Real Estate, Employment Law & Arbitration. Expert representation.",
  keywords: [
    "legal services Karachi",
    "corporate lawyer Pakistan",
    "litigation attorney Sindh",
    "criminal defense lawyer",
    "family law attorney",
    "real estate lawyer Karachi",
    "employment law attorney",
    "arbitration services Pakistan",
    "legal consultant Karachi",
  ].join(", "),
  openGraph: {
    title: "Legal Services | Ata-ur-Rahman & Co.",
    description: "Comprehensive legal services in Corporate Law, Litigation, Criminal Defense, Family Law & more.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Ata-ur-Rahman & Co. Legal Services",
      },
    ],
  },
  alternates: {
    canonical: "https://www.arclaws.com/services",
  },
};

const allServices = [
  {
    icon: <Scale className="h-8 w-8" />,
    title: "Litigation & Dispute Resolution",
    description: "Comprehensive legal representation in civil, commercial, and constitutional disputes with proven success in high-stakes litigation.",
    details: [
      "Civil Litigation",
      "Commercial Disputes",
      "Constitutional Petitions",
      "Election Disputes",
      "Alternative Dispute Resolution",
      "Rent Laws",
      "Shipping and Admirality Disputes"
    ]
  },
  
  {
    icon: <Home className="h-8 w-8" />,
    title: "Real Estate & Property",
    description: "Expert handling of property transactions, title verification, development agreements, and real estate disputes.",
    details: [
      "Property Transactions",
      "Title Verification",
      "Development Agreements",
      "Property Disputes",
      "Land Acquisition",
      "Registration of Title and ancillary documents"
    ]
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Criminal Defense",
    description: "Aggressive defense strategies to protect your rights, freedom, and reputation in criminal proceedings at all court levels.",
    details: [
      "Bail Applications",
      "Trial Defense",
      "Appellate Defense",
      "White Collar Crimes",
      "Criminal Appeals",
      
    ]
  },
   {
    icon: <Users className="h-8 w-8" />,
    title: "Employment and Service Law",
    description: "Legal advice on employment contracts, labor disputes, termination issues, and workplace policies.",
    details: [
      "Employment Contracts",
      "Labour Disputes",
      "Termination Issues",
      "Workplace Policies",
      "Employee Rights"
    ]
  },
  {
    icon: <Building className="h-8 w-8" />,
    title: "Service as Arbitrator",
    description: "Neutral arbitration services for efficient and confidential dispute resolution outside traditional court systems.",
    details: [
      "Commercial Arbitration",
      "Construction Disputes",
      "Partnership Disputes",
      "Contract Arbitration"
    ]
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Family Disputes",
    description: "Compassionate legal support for family matters including divorce, child custody, maintenance, and inheritance disputes.",
    details: [
      "Divorce Proceedings",
      "Child Custody & Guardianship",
      "Maintenance & Alimony",
      "Inheritance Disputes",
      "Family Settlement Agreements",
      "Administration of Estate and Successsion",
      "Restitution of Conjugal Rights"
    ]
  },
   
  
];

export default function Services() {
  return (
    <div className="min-h-screen">
      {/* Structured data for services page */}
      <StructuredData type="legalService" />
      <Header />
      
      {/* Services Header */}
      <section className="bg-primary-700 text-white">
        <div className="container-custom section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Legal Services</h1>
            <p className="text-xl text-primary-100">
              Comprehensive legal solutions delivered with expertise, integrity, and dedication to client success.
            </p>
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {allServices.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-xl text-primary-600 flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                    <ul className="space-y-2">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}