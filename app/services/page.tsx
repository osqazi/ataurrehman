import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ServiceCard from '@/app/components/ServiceCard';
import { Briefcase, Scale, Shield, Heart, Home, Award, Users, Building } from 'lucide-react';

const allServices = [
  {
    icon: <Briefcase className="h-8 w-8" />,
    title: "Corporate Advisory",
    description: "Expert guidance on corporate governance, compliance, M&A, joint ventures, and business transactions. We help businesses navigate complex legal landscapes.",
    details: [
      "Corporate Governance & Compliance",
      "Mergers & Acquisitions",
      "Joint Ventures & Partnerships",
      "Contract Drafting & Review",
      "Regulatory Compliance"
    ]
  },
  {
    icon: <Scale className="h-8 w-8" />,
    title: "Litigation & Dispute Resolution",
    description: "Comprehensive legal representation in civil, commercial, and constitutional disputes with proven success in high-stakes litigation.",
    details: [
      "Civil Litigation",
      "Commercial Disputes",
      "Constitutional Petitions",
      "Appellate Practice",
      "Alternative Dispute Resolution"
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
      "Criminal Appeals"
    ]
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Family Law & Divorce",
    description: "Compassionate legal support for family matters including divorce, child custody, maintenance, and inheritance disputes.",
    details: [
      "Divorce Proceedings",
      "Child Custody & Guardianship",
      "Maintenance & Alimony",
      "Inheritance Disputes",
      "Family Settlement Agreements"
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
      "Land Acquisition"
    ]
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Intellectual Property",
    description: "Comprehensive protection and enforcement of trademarks, copyrights, patents, and trade secrets.",
    details: [
      "Trademark Registration",
      "Copyright Protection",
      "Patent Law",
      "IP Litigation",
      "Brand Protection"
    ]
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Employment Law",
    description: "Legal advice on employment contracts, labor disputes, termination issues, and workplace policies.",
    details: [
      "Employment Contracts",
      "Labor Disputes",
      "Termination Issues",
      "Workplace Policies",
      "Employee Rights"
    ]
  },
  {
    icon: <Building className="h-8 w-8" />,
    title: "Arbitrator",
    description: "Neutral arbitration services for efficient and confidential dispute resolution outside traditional court systems.",
    details: [
      "Commercial Arbitration",
      "Construction Disputes",
      "Partnership Disputes",
      "Contract Arbitration",
      "International Arbitration"
    ]
  }
];

export default function Services() {
  return (
    <div className="min-h-screen">
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