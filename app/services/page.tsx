// import type { Metadata } from "next";
// import Header from '@/app/components/Header';
// import Footer from '@/app/components/Footer';
// import ServiceCard from '@/app/components/ServiceCard';
// import { Briefcase, Scale, Shield, Heart, Home, Award, Users, Building } from 'lucide-react';
// import StructuredData from '../components/StructuredData';

// // Services page metadata - optimized for legal service keywords
// export const metadata: Metadata = {
//   title: "Legal Services Karachi | Corporate, Litigation, Criminal & Family Law",
//   description:
//     "Comprehensive legal services in Karachi: Corporate Advisory, Litigation, Criminal Defense, Family Law, Real Estate, Employment Law & Arbitration. Expert representation.",
//   keywords: [
//     "legal services Karachi",
//     "corporate lawyer Pakistan",
//     "litigation attorney Sindh",
//     "criminal defense lawyer",
//     "family law attorney",
//     "real estate lawyer Karachi",
//     "employment law attorney",
//     "arbitration services Pakistan",
//     "legal consultant Karachi",
//   ].join(", "),
//   openGraph: {
//     title: "Legal Services | Ata-ur-Rahman & Co.",
//     description: "Comprehensive legal services in Corporate Law, Litigation, Criminal Defense, Family Law & more.",
//     images: [
//       {
//         url: "/logo.png",
//         width: 1200,
//         height: 630,
//         alt: "Ata-ur-Rahman & Co. Legal Services",
//       },
//     ],
//   },
//   alternates: {
//     canonical: "https://www.arclaws.com/services",
//   },
// };

// const allServices = [
//   {
//     icon: <Scale className="h-8 w-8" />,
//     title: "Litigation & Dispute Resolution",
//     description: "Comprehensive legal representation in civil, commercial, and constitutional disputes with proven success in high-stakes litigation.",
//     details: [
//       "Civil Litigation",
//       "Commercial Disputes",
//       "Constitutional Petitions",
//       "Election Disputes",
//       "Alternative Dispute Resolution",
//       "Rent Laws",
//       "Shipping and Admirality Disputes"
//     ]
//   },
  
//   {
//     icon: <Home className="h-8 w-8" />,
//     title: "Real Estate & Property",
//     description: "Expert handling of property transactions, title verification, development agreements, and real estate disputes.",
//     details: [
//       "Property Transactions",
//       "Title Verification",
//       "Development Agreements",
//       "Property Disputes",
//       "Land Acquisition",
//       "Registration of Title and ancillary documents"
//     ]
//   },
//   {
//     icon: <Shield className="h-8 w-8" />,
//     title: "Criminal Defense",
//     description: "Aggressive defense strategies to protect your rights, freedom, and reputation in criminal proceedings at all court levels.",
//     details: [
//       "Bail Applications",
//       "Trial Defense",
//       "Appellate Defense",
//       "White Collar Crimes",
//       "Criminal Appeals",
      
//     ]
//   },
//    {
//     icon: <Users className="h-8 w-8" />,
//     title: "Employment and Service Law",
//     description: "Legal advice on employment contracts, labor disputes, termination issues, and workplace policies.",
//     details: [
//       "Employment Contracts",
//       "Labour Disputes",
//       "Termination Issues",
//       "Workplace Policies",
//       "Employee Rights"
//     ]
//   },
//   {
//     icon: <Building className="h-8 w-8" />,
//     title: "Service as Arbitrator",
//     description: "Neutral arbitration services for efficient and confidential dispute resolution outside traditional court systems.",
//     details: [
//       "Commercial Arbitration",
//       "Construction Disputes",
//       "Partnership Disputes",
//       "Contract Arbitration"
//     ]
//   },
//   {
//     icon: <Heart className="h-8 w-8" />,
//     title: "Family Disputes",
//     description: "Compassionate legal support for family matters including divorce, child custody, maintenance, and inheritance disputes.",
//     details: [
//       "Divorce Proceedings",
//       "Child Custody & Guardianship",
//       "Maintenance & Alimony",
//       "Inheritance Disputes",
//       "Family Settlement Agreements",
//       "Administration of Estate and Successsion",
//       "Restitution of Conjugal Rights"
//     ]
//   },
   
  
// ];

// export default function Services() {
//   return (
//     <div className="min-h-screen">
//       {/* Structured data for services page */}
//       <StructuredData type="legalService" />
//       <Header />
      
//       {/* Services Header */}
//       <section className="bg-primary-700 text-white">
//         <div className="container-custom section-padding">
//           <div className="max-w-4xl mx-auto text-center">
//             <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Legal Services</h1>
//             <p className="text-xl text-primary-100">
//               Comprehensive legal solutions delivered with expertise, integrity, and dedication to client success.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* All Services */}
//       <section className="section-padding bg-gray-50">
//         <div className="container-custom">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {allServices.map((service, index) => (
//               <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
//                 <div className="flex items-start space-x-4">
//                   <div className="bg-primary-100 p-3 rounded-xl text-primary-600 flex-shrink-0">
//                     {service.icon}
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
//                     <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
//                     <ul className="space-y-2">
//                       {service.details.map((detail, idx) => (
//                         <li key={idx} className="flex items-center text-gray-700">
//                           <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
//                           {detail}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }

import type { Metadata } from "next";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import StructuredData from '../components/StructuredData';
import { Briefcase, Scale, Shield, Heart, Home, Award, Users, Building, ArrowRight, ChevronRight } from 'lucide-react';

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
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Ata-ur-Rahman & Co. Legal Services" }],
  },
  alternates: { canonical: "https://www.arclaws.com/services" },
};

const allServices = [
  {
    icon: Scale,
    number: "01",
    title: "Litigation & Dispute Resolution",
    tagline: "Courtroom Excellence",
    description: "Comprehensive legal representation in civil, commercial, and constitutional disputes with proven success in high-stakes litigation.",
    details: [
      "Civil Litigation",
      "Commercial Disputes",
      "Constitutional Petitions",
      "Election Disputes",
      "Alternative Dispute Resolution",
      "Rent Laws",
      "Shipping and Admiralty Disputes",
    ],
  },
  {
    icon: Home,
    number: "02",
    title: "Real Estate & Property",
    tagline: "Protecting Your Assets",
    description: "Expert handling of property transactions, title verification, development agreements, and real estate disputes.",
    details: [
      "Property Transactions",
      "Title Verification",
      "Development Agreements",
      "Property Disputes",
      "Land Acquisition",
      "Registration of Title & Ancillary Documents",
    ],
  },
  {
    icon: Shield,
    number: "03",
    title: "Criminal Defense",
    tagline: "Your Freedom Matters",
    description: "Aggressive defense strategies to protect your rights, freedom, and reputation in criminal proceedings at all court levels.",
    details: [
      "Bail Applications",
      "Trial Defense",
      "Appellate Defense",
      "White Collar Crimes",
      "Criminal Appeals",
    ],
  },
  {
    icon: Users,
    number: "04",
    title: "Employment & Service Law",
    tagline: "Workplace Justice",
    description: "Legal advice on employment contracts, labor disputes, termination issues, and workplace policies.",
    details: [
      "Employment Contracts",
      "Labour Disputes",
      "Termination Issues",
      "Workplace Policies",
      "Employee Rights",
    ],
  },
  {
    icon: Building,
    number: "05",
    title: "Service as Arbitrator",
    tagline: "Neutral & Efficient",
    description: "Neutral arbitration services for efficient and confidential dispute resolution outside traditional court systems.",
    details: [
      "Commercial Arbitration",
      "Construction Disputes",
      "Partnership Disputes",
      "Contract Arbitration",
    ],
  },
  {
    icon: Heart,
    number: "06",
    title: "Family Disputes",
    tagline: "Compassionate Counsel",
    description: "Compassionate legal support for family matters including divorce, child custody, maintenance, and inheritance disputes.",
    details: [
      "Divorce Proceedings",
      "Child Custody & Guardianship",
      "Maintenance & Alimony",
      "Inheritance Disputes",
      "Family Settlement Agreements",
      "Administration of Estate & Succession",
      "Restitution of Conjugal Rights",
    ],
  },
];

export default function Services() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');

        .services-page {
          font-family: 'Jost', sans-serif;
        }

        /* ── Hero ── */
        .hero-section {
          position: relative;
          background: #0f1923;
          overflow: hidden;
          padding: 100px 0 80px;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse 80% 60% at 60% 40%, rgba(139,107,68,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 10% 80%, rgba(139,107,68,0.1) 0%, transparent 60%);
        }

        .hero-watermark {
          font-family: 'Cormorant Garamond', serif;
          position: absolute;
          font-size: clamp(100px, 18vw, 220px);
          font-weight: 700;
          color: rgba(255,255,255,0.03);
          letter-spacing: -0.03em;
          line-height: 1;
          right: -2%;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          white-space: nowrap;
          user-select: none;
        }

        .hero-inner {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 24px;
        }

        .hero-eyebrow::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: #c9a96e;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(44px, 7vw, 80px);
          font-weight: 300;
          color: #f5f0e8;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: 0 0 8px;
        }

        .hero-title em {
          font-style: italic;
          color: #c9a96e;
        }

        .hero-divider {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, #c9a96e, transparent);
          margin: 28px 0;
        }

        .hero-subtitle {
          font-size: 16px;
          font-weight: 300;
          color: rgba(245,240,232,0.6);
          max-width: 540px;
          line-height: 1.7;
          letter-spacing: 0.02em;
        }

        /* ── Services Grid ── */
        .services-section {
          background: #f7f4ef;
          padding: 80px 0 100px;
          position: relative;
        }

        .services-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c9a96e 30%, #c9a96e 70%, transparent);
          opacity: 0.4;
        }

        .services-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
          background: rgba(180,160,130,0.2);
          border: 1px solid rgba(180,160,130,0.2);
        }

        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr; }
        }

        .service-card {
          background: #faf8f5;
          padding: 44px 40px;
          position: relative;
          overflow: hidden;
          transition: background 0.4s ease;
          cursor: default;
        }

        .service-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #c9a96e, #8b6f44);
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .service-card:hover {
          background: #fff;
        }

        .service-card:hover::after {
          width: 100%;
        }

        .service-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .service-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.2em;
          color: #c9a96e;
        }

        .service-icon-wrap {
          width: 52px;
          height: 52px;
          border: 1px solid rgba(180,150,100,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8b6f44;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .service-card:hover .service-icon-wrap {
          background: #0f1923;
          border-color: #0f1923;
          color: #c9a96e;
        }

        .service-tagline {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 10px;
        }

        .service-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 700;
          color: #0f1923;
          line-height: 1.15;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        }

        .service-description {
          font-size: 14px;
          font-weight: 400;
          color: #5a4e40;
          line-height: 1.8;
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(180,150,100,0.25);
        }

        .service-details-heading {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #0f1923;
          margin-bottom: 12px;
          opacity: 0.5;
        }

        .service-details {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .service-detail-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          font-weight: 500;
          color: #2c2218;
          padding: 9px 0;
          border-bottom: 1px solid rgba(180,150,100,0.15);
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
        }

        .service-detail-item:last-child {
          border-bottom: none;
        }

        .service-card:hover .service-detail-item {
          color: #0f1923;
          padding-left: 4px;
        }

        .detail-arrow {
          width: 16px;
          height: 16px;
          border: 1px solid rgba(201,169,110,0.5);
          border-radius: 50%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9a96e;
          transition: all 0.2s ease;
        }

        .service-card:hover .detail-arrow {
          background: #c9a96e;
          border-color: #c9a96e;
          color: #fff;
        }

        /* ── CTA Banner ── */
        .cta-section {
          background: #0f1923;
          padding: 70px 0;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 80% at 80% 50%, rgba(139,107,68,0.15) 0%, transparent 70%);
        }

        .cta-inner {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }

        .cta-text h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 300;
          color: #f5f0e8;
          margin: 0 0 8px;
          letter-spacing: -0.01em;
        }

        .cta-text h2 em {
          font-style: italic;
          color: #c9a96e;
        }

        .cta-text p {
          font-size: 15px;
          font-weight: 300;
          color: rgba(245,240,232,0.55);
          margin: 0;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: transparent;
          border: 1px solid #c9a96e;
          color: #c9a96e;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 16px 32px;
          text-decoration: none;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .cta-btn:hover {
          background: #c9a96e;
          color: #0f1923;
        }

        .cta-btn svg {
          transition: transform 0.3s ease;
        }

        .cta-btn:hover svg {
          transform: translateX(4px);
        }

        /* ── Stats bar ── */
        .stats-bar {
          background: #1a1208;
          padding: 36px 0;
          border-top: 1px solid rgba(201,169,110,0.2);
          border-bottom: 1px solid rgba(201,169,110,0.2);
        }

        .stats-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-around;
          gap: 20px;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 300;
          color: #c9a96e;
          line-height: 1;
          display: block;
        }

        .stat-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.4);
          display: block;
          margin-top: 6px;
        }
      `}</style>

      <div className="services-page min-h-screen">
        <StructuredData type="legalService" />
        <Header />

        {/* ── Hero ── */}
        <section className="hero-section">
          <div className="hero-watermark">LAW</div>
          <div className="hero-inner">
            <span className="hero-eyebrow">Ata-ur-Rahman &amp; Co.</span>
            <h1 className="hero-title">
              Our Areas of<br />
              <em>Legal Practice</em>
            </h1>
            <div className="hero-divider" />
            <p className="hero-subtitle">
              Comprehensive legal solutions delivered with expertise, integrity, and unwavering dedication to every client's success.
            </p>
          </div>
        </section>

        {/* ── Stats ── */}
        <div className="stats-bar">
          <div className="stats-inner">
            {[
              { n: "25+", l: "Years of Practice" },
              { n: "6", l: "Areas of Law" },
              { n: "500+", l: "Cases Handled" },
              { n: "3", l: "Courts of Practice" },
            ].map((s) => (
              <div className="stat-item" key={s.l}>
                <span className="stat-number">{s.n}</span>
                <span className="stat-label">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Services Grid ── */}
        <section className="services-section">
          <div className="services-container">
            <div className="services-grid">
              {allServices.map((service) => {
                const Icon = service.icon;
                return (
                  <div className="service-card" key={service.number}>
                    <div className="service-card-top">
                      <span className="service-number">{service.number}</span>
                      <div className="service-icon-wrap">
                        <Icon size={20} />
                      </div>
                    </div>

                    <p className="service-tagline">{service.tagline}</p>
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>

                    <p className="service-details-heading">Areas Covered</p>
                    <ul className="service-details">
                      {service.details.map((detail, idx) => (
                        <li className="service-detail-item" key={idx}>
                          <span className="detail-arrow">
                            <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                              <path d="M1 3.5h5M3.5 1l2.5 2.5L3.5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section">
          <div className="cta-inner">
            <div className="cta-text">
              <h2>Need <em>Legal Counsel?</em></h2>
              <p>Schedule a consultation with our experienced attorneys today.</p>
            </div>
            <a href="/contact" className="cta-btn">
              Contact Us <ArrowRight size={14} />
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}