import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { Calendar, User, BookOpen, Clock, ArrowLeft, Share2, Bookmark, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Author {
  name: string;
  role: string;
  email: string;
  publications: string;
  expertise: string[];
}

interface Publication {
  id: number;
  title: string;
  author: string;
  publishDate: string;
  journal: string;
  category: string;
  abstract: string;
  content: string;
  link: string;
  readTime: string;
  tags: string[];
  authorDetails?: Author;
}

// Mock data - replace with your actual data source
const publicationsData: Publication[] = [
  {
    id: 1,
    title: "The Evolution of Corporate Governance in Pakistan: A Legal Perspective",
    author: "Justice Ata-ur-Rehman (Retd.)",
    publishDate: "2024-01-15",
    journal: "Pakistan Law Journal",
    category: "Corporate Law",
    abstract: "An in-depth analysis of corporate governance reforms and their impact on Pakistani businesses in the global market.",
    content: `
      <h2>Introduction</h2>
      <p>Corporate governance has undergone significant transformations in Pakistan over the past two decades. This article examines the evolution of corporate governance frameworks and their practical implementation in the Pakistani business landscape.</p>
      
      <h2>Historical Context</h2>
      <p>The journey of corporate governance in Pakistan began with the Companies Ordinance 1984, which laid the foundation for corporate structures and director responsibilities. However, the real transformation came with the Securities and Exchange Commission of Pakistan's (SECP) Corporate Governance Code of 2002.</p>
      
      <h2>Key Reforms and Their Impact</h2>
      <p>The 2017 Corporate Governance Regulations marked a significant milestone, introducing mandatory requirements for board composition, audit committees, and risk management frameworks. These reforms have substantially improved transparency and accountability in listed companies.</p>
      
      <h2>Challenges and Opportunities</h2>
      <p>Despite progress, challenges remain in implementation, particularly in family-owned businesses and small to medium enterprises. The article explores these challenges and proposes practical solutions for effective governance.</p>
      
      <h2>Conclusion</h2>
      <p>The evolution of corporate governance in Pakistan demonstrates a positive trajectory towards international standards, though continuous improvement and adaptation to local contexts remain essential for sustainable growth.</p>
    `,
    link: "#",
    readTime: "12 min read",
    tags: ["Corporate Governance", "Business Law", "Regulatory Compliance", "SECP", "Board Composition"],
    authorDetails: {
      name: "Justice Ata-ur-Rehman (Retd.)",
      role: "Founder",
      email: "justice.ata@arclaws.com",
      publications: "25+ Articles",
      expertise: ["Constitutional Law", "Civil Litigation", "Judicial Review", "Legal Scholarship", "Arbitration"]
    }
  },
  {
    id: 2,
    title: "Digital Evidence in Criminal Proceedings: Admissibility and Challenges",
    author: "Mudassir Abbasi",
    publishDate: "2023-11-20",
    journal: "Criminal Law Review",
    category: "Criminal Defense",
    abstract: "Exploring the legal framework for digital evidence admissibility in Pakistani courts and emerging challenges.",
    content: `
      <h2>Introduction to Digital Evidence</h2>
      <p>The digital age has transformed criminal investigations and proceedings worldwide. This article examines the admissibility of digital evidence in Pakistani courts under the Qanun-e-Shahadat Order 1984 and emerging jurisprudence.</p>
      
      <h2>Legal Framework</h2>
      <p>Analysis of Section 164-QSO and its application to digital evidence, including electronic documents, social media content, and digital communications.</p>
      
      <h2>Authentication Challenges</h2>
      <p>Discussion of the unique challenges in authenticating digital evidence, including chain of custody, hash values, and digital signatures.</p>
      
      <h2>Recent Case Law</h2>
      <p>Review of landmark judgments that have shaped the admissibility standards for digital evidence in Pakistan.</p>
      
      <h2>Future Directions</h2>
      <p>Recommendations for legislative reforms and judicial training to better handle digital evidence in criminal proceedings.</p>
    `,
    link: "#",
    readTime: "8 min read",
    tags: ["Digital Evidence", "Criminal Procedure", "Technology Law", "Authentication", "Qanun-e-Shahadat"],
    authorDetails: {
      name: "Mudassir Abbasi",
      role: "Senior Associate",
      email: "mudassir47@arclaws.com",
      publications: "22+ Articles",
      expertise: ["Commercial Law", "Banking & Finance", "Mergers & Acquisitions", "Constitutional Law", "Employment Law"]
    }
  }
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PublicationDetail({ params }: PageProps) {
  const { id } = await params;
  const publicationId = parseInt(id);
  
  const publication = publicationsData.find(pub => pub.id === publicationId);

  if (!publication) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Article Header */}
      <section className="relative bg-gradient-to-r from-primary-800 to-primary-900 text-white py-16">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/publications" 
              className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Publications
            </Link>
            
            <div className="flex items-center space-x-4 mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                {publication.category}
              </span>
              <span className="flex items-center text-white/80 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {publication.readTime}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {publication.title}
            </h1>
            
            <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-3xl">
              {publication.abstract}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-white">{publication.author}</p>
                  <p className="text-sm">{publication.authorDetails?.role}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(publication.publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>{publication.journal}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Author Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-10 w-10 text-primary-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">{publication.author}</h3>
                    <p className="text-primary-600 text-sm mb-2">{publication.authorDetails?.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{publication.authorDetails?.publications}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="h-4 w-4 mr-2 text-primary-600" />
                      <span>{publication.authorDetails?.publications}</span>
                    </div>
                    <a 
                      href={`mailto:${publication.authorDetails?.email}`}
                      className="block text-sm text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {publication.authorDetails?.email}
                    </a>
                  </div>
                  
                  {publication.authorDetails?.expertise && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">Expertise</h4>
                      <div className="flex flex-wrap gap-1">
                        {publication.authorDetails.expertise.slice(0, 3).map((skill, index) => (
                          <span 
                            key={index}
                            className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Article Actions */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Article Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors">
                      <Bookmark className="h-4 w-4" />
                      <span>Save Article</span>
                    </button>
                    <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <Share2 className="h-4 w-4" />
                      <span>Share Article</span>
                    </button>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Article Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {publication.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  {/* Article Featured Image */}
                  <div className="relative h-64 bg-gradient-to-br from-primary-500 to-primary-700">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileText className="h-16 w-16 text-white/80" />
                    </div>
                  </div>

                  {/* Article Body */}
                  <div className="p-8">
                    <article className="prose prose-lg max-w-none">
                      <div 
                        className="article-content"
                        dangerouslySetInnerHTML={{ __html: publication.content }}
                      />
                    </article>

                    {/* Citation */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-4">Recommended Citation</h4>
                      <div className="bg-gray-50 p-4 rounded-lg border">
                        <p className="text-sm text-gray-700 font-mono">
                          {publication.author}. "{publication.title}." {publication.journal}. {new Date(publication.publishDate).getFullYear()}.
                        </p>
                      </div>
                    </div>

                    {/* Related Articles CTA */}
                    <div className="mt-12 text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Explore More Publications</h3>
                      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Discover more insightful articles and legal research from our expert team.
                      </p>
                      <Link 
                        href="/publications"
                        className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <BookOpen className="h-5 w-5 mr-2" />
                        View All Publications
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Generate static params for SSG
export async function generateStaticParams() {
  return publicationsData.map((publication) => ({
    id: publication.id.toString(),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const publicationId = parseInt(id);
  const publication = publicationsData.find(pub => pub.id === publicationId);

  if (!publication) {
    return {
      title: 'Publication Not Found',
    };
  }

  return {
    title: `${publication.title} | Ata-ur-Rehman & Co.`,
    description: publication.abstract,
    openGraph: {
      title: publication.title,
      description: publication.abstract,
      type: 'article',
      publishedTime: publication.publishDate,
      authors: [publication.author],
    },
  };
}