import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import TeamCard from '@/app/components/TeamCard';

const teamMembers = [
  {
    name: "Justice (Retd.) Ata-ur-Rehman Khan",
    position: "Founder",
    bio: "Former Justice with over 35 years of distinguished service in the judiciary. Brings unparalleled expertise in constitutional law and civil litigation. Known for landmark judgments and legal scholarship.",
    email: "justice.ata@ataurrehmanlaw.com",
    phone: "+92-XXX-XXXXXXX",
    expertise: ["Constitutional Law", "Civil Litigation", "Judicial Review", "Legal Scholarship"]
  },
  {
    name: "Obaid-ur-Rehman Khan",
    position: "Senior Advocate High Court - Founder",
    bio: "Senior Advocate with 25+ years of experience in corporate law and commercial litigation. Recognized for strategic thinking and successful representation in high-profile corporate cases.",
    email: "obaid@ataurrehmanlaw.com",
    phone: "+92-XXX-XXXXXXX",
    expertise: ["Corporate Law", "Commercial Litigation", "M&A", "Contract Law"]
  },
  {
    name: "Mudassir Abbasi",
    position: "Senior Advocate High Court",
    bio: "Expert in criminal defense and family law with 20 years of courtroom experience. Known for meticulous case preparation and successful outcomes in complex criminal and family matters.",
    email: "mudassir@ataurrehmanlaw.com",
    phone: "+92-XXX-XXXXXXX",
    expertise: ["Criminal Defense", "Family Law", "Bail Applications", "Trial Practice"]
  },
  {
    name: "Munawwar Hussain",
    position: "Senior Advocate High Court",
    bio: "Specializes in real estate, property law, and intellectual property rights. Brings 18 years of expertise in property transactions, disputes, and IP protection strategies.",
    email: "anwar@ataurrehmanlaw.com",
    phone: "+92-XXX-XXXXXXX",
    expertise: ["Real Estate Law", "Property Disputes", "Intellectual Property", "Contract Law"]
  }
];

export default function Team() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Team Header */}
      <section className="bg-primary-700 text-white">
        <div className="container-custom section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Expert Team</h1>
            <p className="text-xl text-primary-100">
              Meet our distinguished team of legal experts with decades of combined experience and proven track records.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">25+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">5000+</div>
              <div className="text-gray-600">Cases Handled</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">4</div>
              <div className="text-gray-600">Expert Lawyers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}