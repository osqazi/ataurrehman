// import Header from "@/app/components/Header";
// import Footer from "@/app/components/Footer";
// import ServiceCard from "@/app/components/ServiceCard";
// import Link from "next/link";
// import {
//   Scale,
//   Shield,
//   Users,
//   Home as HomeIcon,
//   Briefcase,
//   Heart,
//   Building,
//   Award,
// } from "lucide-react";
// import Image from "next/image";
// import heroimg from "@/public/hero.jpg";
// import officimg from "@/public/office.jpg";

// const services = [
//   {
//     icon: <Briefcase className="h-8 w-8" />,
//     title: "Corporate Advisory",
//     description:
//       "Expert guidance on corporate governance, compliance, and business transactions.",
//   },
//   {
//     icon: <Scale className="h-8 w-8" />,
//     title: "Litigation & Dispute Resolution",
//     description:
//       "Comprehensive legal representation in civil and commercial disputes.",
//   },
//   {
//     icon: <Shield className="h-8 w-8" />,
//     title: "Criminal Defense",
//     description:
//       "Aggressive defense strategies to protect your rights and freedom.",
//   },
//   {
//     icon: <Heart className="h-8 w-8" />,
//     title: "Family Law & Divorce",
//     description:
//       "Compassionate legal support for family matters and divorce proceedings.",
//   },
//   {
//     icon: <HomeIcon className="h-8 w-8" />,
//     title: "Real Estate & Property",
//     description:
//       "Expert handling of property transactions, disputes, and real estate law.",
//   },
//   {
//     icon: <Award className="h-8 w-8" />,
//     title: "Intellectual Property",
//     description:
//       "Protection and enforcement of your intellectual property rights.",
//   },
//   {
//     icon: <Users className="h-8 w-8" />,
//     title: "Employment Law",
//     description:
//       "Legal advice on employment contracts, disputes, and labor laws.",
//   },
//   {
//     icon: <Building className="h-8 w-8" />,
//     title: "Arbitrator",
//     description:
//       "Neutral arbitration services for efficient dispute resolution.",
//   },
// ];

// export default function Home() {
//   return (
//     <div className="min-h-screen">
//       <Header />

//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-r from-primary-700 to-primary-900 text-white min-h-[400px] flex items-center">
//         {/* Background Image */}
//         <div className="absolute inset-0 z-0">
//           <Image
//             src={heroimg}
//             alt="Law firm hero background"
//             fill
//             className="object-fill"
//             priority
//           />
//           {/* Overlay to ensure text readability */}
//           <div className="absolute inset-0 bg-black/40"></div>
//         </div>

//         {/* Content */}
//         <div className="container-custom section-padding relative z-10">
//           <div className="max-w-4xl mx-auto text-center">
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               Justice. Integrity. Excellence.
//             </h1>
//             <p className="text-xl md:text-2xl mb-8 text-white">
//               Premier legal services with over 25 years of trusted expertise
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link
//                 href="/contact"
//                 className="btn-primary bg-white text-primary-700 hover:bg-gray-100"
//               >
//                 Book Consultation
//               </Link>
//               <Link
//                 href="/services"
//                 className="btn-secondary border-white text-white hover:bg-white hover:text-primary-700"
//               >
//                 Our Services
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Services Preview */}
//       <section className="section-padding bg-gray-50">
//         <div className="container-custom">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Our Legal Services
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Comprehensive legal solutions tailored to meet your unique needs
//               with expertise and dedication.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {services.slice(0, 4).map((service, index) => (
//               <ServiceCard key={index} {...service} />
//             ))}
//           </div>

//           <div className="text-center mt-12">
//             <Link href="/services" className="btn-primary">
//               View All Services
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section className="section-padding">
//         <div className="container-custom">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//                 Why Choose Ata-ur-Rehman & Co.?
//               </h2>
//               <div className="space-y-4">
//                 <div className="flex items-start space-x-4">
//                   <div className="bg-primary-100 p-2 rounded-lg">
//                     <Award className="h-6 w-6 text-primary-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg">Expert Team</h3>
//                     <p className="text-gray-600">
//                       Former judges and senior advocates with decades of
//                       experience.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-4">
//                   <div className="bg-primary-100 p-2 rounded-lg">
//                     <Scale className="h-6 w-6 text-primary-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg">
//                       Proven Track Record
//                     </h3>
//                     <p className="text-gray-600">
//                       Thousands of successful cases and satisfied clients.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-4">
//                   <div className="bg-primary-100 p-2 rounded-lg">
//                     <Users className="h-6 w-6 text-primary-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg">Client-Focused</h3>
//                     <p className="text-gray-600">
//                       Personalized attention and strategic legal solutions.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gray-100 rounded-2xl p-3">
//   {/* Image Container */}
//   <div className="relative rounded-lg h-64 overflow-hidden">
//     <Image
//       src={officimg}
//       alt="Law firm office interior"
//       fill
//       className="object-cover"
//       priority
//     />
//     {/* Optional overlay for better text readability if needed */}
//     <div className="absolute inset-0 bg-black/20"></div>
//   </div>
// </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }

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
} from "lucide-react";
import Image from "next/image";
import heroimg from "@/public/hero.jpg";
import officimg from "@/public/office.jpg";

const services = [
  {
    icon: <Briefcase className="h-8 w-8" />,
    title: "Corporate Advisory",
    description:
      "Expert guidance on corporate governance, compliance, and business transactions.",
  },
  {
    icon: <Scale className="h-8 w-8" />,
    title: "Litigation & Dispute Resolution",
    description:
      "Comprehensive legal representation in civil and commercial disputes.",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Criminal Defense",
    description:
      "Aggressive defense strategies to protect your rights and freedom.",
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Family Law & Divorce",
    description:
      "Compassionate legal support for family matters and divorce proceedings.",
  },
  {
    icon: <HomeIcon className="h-8 w-8" />,
    title: "Real Estate & Property",
    description:
      "Expert handling of property transactions, disputes, and real estate law.",
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Intellectual Property",
    description:
      "Protection and enforcement of your intellectual property rights.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Employment Law",
    description:
      "Legal advice on employment contracts, disputes, and labor laws.",
  },
  {
    icon: <Building className="h-8 w-8" />,
    title: "Arbitrator",
    description:
      "Neutral arbitration services for efficient dispute resolution.",
  },
];

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
              Justice. Integrity. Excellence.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white">
              Premier legal services with over 25 years of trusted expertise
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

      {/* Rest of your existing content remains the same */}
      {/* Services Preview */}
      <section className="section-padding bg-gray-50">
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
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Ata-ur-Rehman & Co.?
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
              </div>
            </div>

            <div className="bg-gray-100 rounded-2xl p-3">
              <div className="relative rounded-lg h-64 overflow-hidden">
                <Image
                  src={officimg}
                  alt="Law firm office interior"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}