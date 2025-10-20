import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { Scale, Award, Calendar, User, Gavel } from 'lucide-react';

const notableCases = [
  {
    id: 1,
    caseName: "State vs. Muhammad Ali",
    year: 2023,
    court: "Supreme Court of Pakistan",
    judge: "Justice Qazi Faez Isa",
    category: "Criminal Defense",
    outcome: "Acquittal",
    description: "Successfully defended client in a high-profile murder case, establishing alibi through digital evidence and witness testimony.",
    significance: "Landmark ruling on admissibility of digital evidence in criminal cases."
  },
  {
    id: 2,
    caseName: "ABC Corporation vs. XYZ Industries",
    year: 2022,
    court: "Lahore High Court",
    judge: "Justice Ayesha Malik",
    category: "Corporate Litigation",
    outcome: "Favorable Settlement",
    description: "Represented ABC Corporation in a complex commercial dispute involving intellectual property rights and breach of contract.",
    significance: "Set precedent for IP protection in joint venture agreements."
  },
  {
    id: 3,
    caseName: "Shah vs. Shah",
    year: 2023,
    court: "Family Court Lahore",
    judge: "Justice Nasira Javed Iqbal",
    category: "Family Law",
    outcome: "Favorable Judgment",
    description: "Successfully handled complex divorce and child custody case involving international jurisdiction issues.",
    significance: "Clarified jurisdiction in transnational family disputes."
  },
  {
    id: 4,
    caseName: "Pakistan Real Estate Ltd vs. City Development Authority",
    year: 2021,
    court: "Islamabad High Court",
    judge: "Justice Athar Minallah",
    category: "Real Estate",
    outcome: "Writ Petition Allowed",
    description: "Challenged unconstitutional land acquisition by development authority, protecting client's property rights.",
    significance: "Strengthened constitutional protections for property owners."
  },
  {
    id: 5,
    caseName: "Tech Innovations vs. Software Giants Inc",
    year: 2023,
    court: "Intellectual Property Tribunal",
    judge: "Justice Ali Akbar Qureshi",
    category: "Intellectual Property",
    outcome: "Injunction Granted",
    description: "Successfully obtained injunction against software patent infringement, protecting client's innovative technology.",
    significance: "Expanded interpretation of software patent protection."
  },
  {
    id: 6,
    caseName: "Workers Union vs. Manufacturing Corp",
    year: 2022,
    court: "Labor Court Karachi",
    judge: "Justice Sajid Mahmood",
    category: "Employment Law",
    outcome: "Settlement Reached",
    description: "Mediated successful settlement between workers' union and manufacturing company, avoiding prolonged litigation.",
    significance: "Model case for alternative dispute resolution in labor disputes."
  },
  {
    id: 7,
    caseName: "International Trade Corp vs. Customs Department",
    year: 2023,
    court: "Customs Appellate Tribunal",
    judge: "Justice Rizwan Ahmed",
    category: "Corporate Advisory",
    outcome: "Appeal Allowed",
    description: "Successfully appealed against arbitrary customs duty imposition, saving client millions in unnecessary taxes.",
    significance: "Clarified customs valuation procedures for imported goods."
  },
  {
    id: 8,
    caseName: "Construction Ltd vs. Contractors Association",
    year: 2022,
    court: "Arbitration Council",
    judge: "Arbitrator Dr. Ahmed Hassan",
    category: "Arbitration",
    outcome: "Award in Favor",
    description: "Acted as lead counsel in construction dispute arbitration, securing favorable award for client.",
    significance: "Established standards for construction contract interpretation."
  },
  {
    id: 9,
    caseName: "Media House vs. Regulatory Authority",
    year: 2023,
    court: "Supreme Court of Pakistan",
    judge: "Justice Munib Akhtar",
    category: "Constitutional Law",
    outcome: "Fundamental Rights Protected",
    description: "Successfully challenged regulatory overreach affecting freedom of press and expression.",
    significance: "Strengthened constitutional protections for media freedom."
  },
  {
    id: 10,
    caseName: "Bank vs. Defaulting Entity",
    year: 2021,
    court: "Banking Court Lahore",
    judge: "Justice Tariq Saleem",
    category: "Banking Law",
    outcome: "Recovery Ordered",
    description: "Successfully represented banking institution in major loan recovery case involving complex financial instruments.",
    significance: "Set precedent for enforcement of banking covenants."
  }
];

type CaseItem = {
  id: number;
  caseName: string;
  year: number;
  court: string;
  judge: string;
  category: string;
  outcome: string;
  description: string;
  significance: string;
};

const CaseCard = ({ caseItem }: { caseItem: CaseItem }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{caseItem.caseName}</h3>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 text-primary-600" />
              <span>{caseItem.year}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Scale className="h-4 w-4 text-primary-600" />
              <span>{caseItem.court}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4 text-primary-600" />
              <span>Before {caseItem.judge}</span>
            </div>
          </div>
        </div>
        <div className="lg:ml-4 lg:text-right">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <Award className="h-4 w-4 mr-1" />
            {caseItem.outcome}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
          {caseItem.category}
        </span>
        <p className="text-gray-700 leading-relaxed">{caseItem.description}</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Gavel className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-blue-900 text-sm">Legal Significance:</p>
            <p className="text-blue-800 text-sm">{caseItem.significance}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function NotableCases() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Cases Header */}
      <section className="bg-primary-700 text-white">
        <div className="container-custom section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Notable Cases</h1>
            <p className="text-xl text-primary-100">
              A showcase of our successful legal representations and landmark achievements
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">1000+</div>
              <div className="text-gray-600">Cases Handled</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">25+</div>
              <div className="text-gray-600">Landmark Cases</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cases List */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Successful Case History
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our track record of successful litigation and legal victories across various practice areas.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {notableCases.map((caseItem) => (
              <CaseCard key={caseItem.id} caseItem={caseItem} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your Success Story?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Let our experienced legal team help you achieve favorable outcomes in your legal matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary bg-white text-primary-700 hover:bg-gray-100">
              Book Consultation
            </a>
            <a href="/team" className="btn-secondary border-white text-white hover:bg-white hover:text-primary-700">
              Meet Our Team
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}