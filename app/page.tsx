
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ServiceCard from "@/app/components/ServiceCard";
import AnimatedDoor from "@/app/components/AnimatedDoor";
import Link from "next/link";
import {
  Scale,
  Shield,
  Users,
  Home as HomeIcon,
  Briefcase,
  Heart,
  Building,
  Award,
  Star,
  BookOpen,
  UserCheck,
  ShieldCheck,
  MapPin,
  Clock,
  Users as TeamIcon,
  Gavel,
} from "lucide-react";
import Image from "next/image";
import heroimg from "@/public/hero.png";

interface OfficeSection {
  id: number;
  image: string;
  title: string;
  content: string;
  icon: React.ReactNode;
}

interface AlternatingSectionProps {
  section: OfficeSection;
  index: number;
}



// Mock office images - replace these with your actual office images
const officeSections = [
  {
    id: 1,
    image: "/office1.webp",
    title: "Our Legacy",
    content: "The practice was established in 1972 in Karachi by Justice (Retd.) Ata-ur-Rahman under whose able guidance it blossomed into one of the most reputable chambers in the city. With over 50 years of excellence, we continue to uphold the highest standards of legal practice.",
    icon: <Award className="h-6 w-6" />
  },
  {
    id: 2,
    image: "/office2.webp",
    title: "Expert Leadership",
    content: "Justice (Retd.) Ata-ur-Rahman, remained an advocate of the High Court and an Advocate of the Supreme Court of Pakistan, after which he was elevated to the bench on 27.05.1998, till his retirement on 17.07.2005 as a Senior Puisne Judge of the High Court of Sindh at Karachi.",
    icon: <UserCheck className="h-6 w-6" />
  },
  {
    id: 3,
    image: "/office3.webp",
    title: "Modern Practice",
    content: "Mr. Obaid-ur-Rahman Khan, is an enrolled advocate of the Hon'ble Supreme Court of Pakistan. He has done his bachelors in English Literature from University of Karachi, after which he graduated with his LL.B. from Hamdard School of Law, Hamdard University with two gold medals.",
    icon: <BookOpen className="h-6 w-6" />
  },
  {
    id: 4,
    image: "/office4.webp",
    title: "Comprehensive Services",
    content: "We provide a comprehensive range of legal services dealing with matters in the District Courts, National Accountability Courts, Banking Courts, all Special Courts in Karachi, the High Courts of Pakistan, and the Hon'ble Supreme Court of Pakistan.",
    icon: <Gavel className="h-6 w-6" />
  },
  {
    id: 5,
    image: "/office5.webp",
    title: "Professional Team",
    content: "The practice has a total strength of 7 lawyers, 4 court clerks and a stenographer. Our team combines decades of experience with fresh perspectives to provide comprehensive legal solutions.",
    icon: <TeamIcon className="h-6 w-6" />
  },
  {
    id: 6,
    image: "/office6.webp",
    title: "Client Confidentiality",
    content: "We pride ourselves on maintaining the confidentiality of our clients which includes ultra high net worth individuals, former heads of state, members of parliament, multinational corporations, and financial institutions.",
    icon: <ShieldCheck className="h-6 w-6" />
  }
];

const services = [
  
  {
    icon: <Scale className="h-8 w-8" />,
    title: "Litigation & Dispute Resolution",
    description:
      "Comprehensive legal representation in civil and commercial disputes.",
  },
  {
    icon: <HomeIcon className="h-8 w-8" />,
    title: "Real Estate & Property",
    description:
      "Expert handling of property transactions, disputes, and real estate law.",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Criminal Defense",
    description:
      "Aggressive defense strategies to protect your rights and freedom.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Employment and Service Laws",
    description:
      "Legal advice on employment contracts, disputes, and labor laws.",
  },
  {
    icon: <Building className="h-8 w-8" />,
    title: "Service as Arbitration",
    description:
      "Neutral arbitration services for efficient dispute resolution.",
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Family Law & Divorce",
    description:
      "Compassionate legal support for family matters and divorce proceedings.",
  },  
];

// Alternating Section Component
const AlternatingSection = ({ section, index }: AlternatingSectionProps) => {
  const isEven = index % 2 === 0;
  
  return (
    <section className={`section-padding ${isEven ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="container-custom">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
          isEven ? '' : 'lg:grid-flow-dense'
        }`}>
          {/* Image Column */}
          <div className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] relative">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className={`${isEven ? 'lg:order-2' : 'lg:order-1 lg:pr-8'}`}>
            <div className="flex items-center mb-6">
              <div className="bg-primary-100 p-3 rounded-lg text-primary-600 mr-4">
                {section.icon}
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {section.content}
            </p>
            
            {/* Additional details for specific sections */}
            {section.id === 2 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 text-sm">
                  <strong>Notable Achievements:</strong> Author of numerous landmark judgments 
                  that are highly revered and cited. Now practices as an Arbitrator, Commissioner and Umpire.
                </p>
              </div>
            )}
            
            {section.id === 3 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 text-sm">
                  <strong>Education:</strong> Masters of Law from London School of Economics and Political Science. 
                  Completed pupilage from chambers of Mr. Khalid Anwer, Senior Advocate Supreme Court.
                </p>
              </div>
            )}
            
            {section.id === 5 && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-primary-50 rounded-lg">
                  <div className="text-xl font-bold text-primary-700">7</div>
                  <div className="text-sm text-gray-600">Lawyers</div>
                </div>
                <div className="text-center p-3 bg-primary-50 rounded-lg">
                  <div className="text-xl font-bold text-primary-700">4</div>
                  <div className="text-sm text-gray-600">Court Clerks</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <AnimatedDoor />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-900 text-white min-h-[400px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroimg}
            alt="Law firm hero background"
            fill
            className="object-fill"
            priority
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="container-custom section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              SERVICE WITH INTEGRITY
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white">
              Premier legal services with over 50 years of trusted expertise
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-primary bg-white text-primary-700 hover:bg-gray-100"
              >
                Book Consultation
              </Link>
              <Link
                href="/services"
                className="btn-secondary border-white text-white hover:bg-white hover:text-primary-700"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Firm Overview Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Ata-ur-Rahman & Co.
            </h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 leading-relaxed">
              Ata-ur-Rahman & Co. is a chamber with a robust commercial, corporate, 
              civil and criminal litigation practice. We provide comprehensive legal 
              services to Pakistan's leading industrial and commercial groups, 
              handling matters across all levels of judiciary with unparalleled expertise.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center p-6 bg-primary-50 rounded-xl">
              <div className="text-3xl font-bold text-primary-700 mb-2">1972</div>
              <div className="text-gray-600">Established</div>
            </div>
            <div className="text-center p-6 bg-primary-50 rounded-xl">
              <div className="text-3xl font-bold text-primary-700 mb-2">50+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center p-6 bg-primary-50 rounded-xl">
              <div className="text-3xl font-bold text-primary-700 mb-2">9</div>
              <div className="text-gray-600">Expert Lawyers</div>
            </div>
            <div className="text-center p-6 bg-primary-50 rounded-xl">
              <div className="text-3xl font-bold text-primary-700 mb-2">4</div>
              <div className="text-gray-600">Court Clerks</div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternating Picture & Content Sections */}
      {officeSections.map((section, index) => (
        <AlternatingSection 
          key={section.id} 
          section={section} 
          index={index} 
        />
      ))}

      {/* Services Preview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Legal Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive legal solutions tailored to meet your unique needs
              with expertise and dedication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Ata-ur-Rahman & Co.?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Award className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Expert Team</h3>
                    <p className="text-gray-600">
                      Former judges and senior advocates with decades of
                      experience.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Scale className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Proven Track Record
                    </h3>
                    <p className="text-gray-600">
                      Thousands of successful cases and satisfied clients.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Users className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Client-Focused</h3>
                    <p className="text-gray-600">
                      Personalized attention and strategic legal solutions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Star className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Established Legacy</h3>
                    <p className="text-gray-600">
                      Serving clients with excellence since 1972 with unwavering commitment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="relative rounded-lg h-80 overflow-hidden">
                <Image
                  src="/office.png"
                  alt="Law firm office interior"
                  fill
                  className="object-fill"
                  priority
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}