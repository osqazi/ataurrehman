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
    id: 1, // Assigned a new ID
    title: "INTERNATIONAL LAW, HOSTILE NON-STATE ENTITIES, THE SCOPE OF THE PRINCIPLE OF SELF DEFENCE AND PAKISTAN",
    author: "Obaid-ur-Rahman Khan",
    publishDate: "2011-01-03",
    journal: "LLM Dissertation (Revised for Book Publication)",
    category: "International Law, Use of Force, National Security, Law of Armed Conflict",
    abstract: "This paper examines the complex issue of self-defence against hostile non-state entities (HNS-Es) or terrorist organizations operating from within the territory of a sovereign host state, focusing on the principles of jus ad bellum. The central question addressed is whether a victim state can lawfully infringe upon the host state's sovereignty to conduct military action when the HNS-Es are not attributable to the host state. The article contends that a distinction must be drawn between different types of host states. The author argues that a host state which has the will to expel the non-state actors but is unable to do so for reasons other than military or political weakness, should have its territorial sovereignty respected. However, the territory of a completely failed state may be infringed for self-defence purposes due to its political failure. The paper advocates for why Pakistan's sovereignty, specifically, should not be infringed or violated in the context of counter-terrorism efforts on its north-western frontier.",
    content: `
      <h2>PREFACE AND ACKNOWLEDGEMENT</h2>
      <p>It has been a whole year and a half since I completed my dissertation on the subject Hostile non-state entities: the scope of employing the principles of self defence against terrorist organizations operating in a parasitic form in a sovereign state as part of my LLM course in the subject of International Law of Armed Conflict and Use of Force at the London School of Economics and Political Science. And it has been six months since Mr. Kamran Noorani graciously consented to publishing the same as a book. Since then I have added and subtracted substantially from my original work and the new shape that my thoughts and research have now taken, is in light of the developments on Pakistans north western frontier. Now is the time, I think, that the international community should be presented with a case of why Pakistans territory, and in turn its sovereignty, should not be infringed and violated. I want to take this opportunity to thank all those who have been an inspiration in my life and played a vital role in helping me achieve whatever I have today. First and foremost I am grateful to my parents, Sheba Ansari and Ata-ur-Rahman, to whom I dedicate this work with love, for their immeasurable sacrifice and unwavering faith and support for me in all my endeavours. Mr. Khalid Anwer, Senior Advocate of the Supreme Court of Pakistan, for literally teaching me how to read, write and think. I would also like to thank Sir Justice Christopher Greenwood for guiding, and more importantly tolerating, an over-zealous graduate student in his International Law of Armed Conflict class at the L.S.E.. Lastly I would like to thank my wife Rafeah, for still smiling at me every time she sees me even after our ten months apart.</p>
      <p>Obaid-ur-Rahman Khan<br>3.1.2011<br>Karachi</p>
      <p>Fix reason firmly in her seat, and call to her tribunal every fact, every opinion. Question with boldness even the existence of a God; because if there be one, He must more approve the homage of reason, than that of blind folded fear.</p>
      
      <h2>Introduction</h2>
      <p>It is the fear in man which has led to so many times his near extinction. And it is the fear of fear which has led him to the legislation of laws and rules deterring him from acting in any manner which is unreasonable and against the norms of humanity. Legislation, either in the forms of religious edicts, socially acceptable behaviour or by parliaments in countries and nations all over the world, all indicate the necessity of self control and the injection of reason in the actions of men and governments alike. Principles of international law are based on similar foundations of reason and good sense which prevails to quite an extent between majority of the nations. Two wars and more than 7 million deaths later, the citizens of the world realized the need to exercise self restraint and felt the need to impose upon themselves laws and their accompanying punishments to prevent unnecessary loss of life and property. The ultimate sources of reason and morality were employed and it was in that spirit that the Charter of the United Nations was promulgated in the year 1945 and in it Article 2(4) was encapsulated laying down the basis of the international law of armed conflict. It reads as follows: Article 2 (4) All members shall refrain in their international relations from the threat or use of force against the territorial integrity or political independence of any State, or in any other manner inconsistent with the Purposes of the United Nations. With such noble beginnings mankind started down the path of a new age after the Second World War. But with the descent of the Iron Curtain and the rise of Communism, the world was many times at the edge of war and annihilation. Man had realised that the wars of people will be more terrible than the wars of kings. As ideas evolved so did the technique and the practice of war. It moved from battlefields, into cities and towns, through borders and boundaries and into backyards and alleys. The opponent changed from being another kingdom, to a state, into a government and then an idea. An idea that martyrdom is a worthy contribution for the attainment of an ethereal objective. Today the opponent is no longer associated with any particular region, race or culture or even a state. It has attained an almost omnipotent presence which is not limited to any boundary or locality. Non-state actors today co-ordinate, plan, strategize and launch attacks from anywhere in the world. From the caves in Kandahar, to the madarsas in Multan, alleged terrorist organizations under the noses of unassuming (and sometimes not so unassuming) host states carry out operations in other countries all over the world. The result is a clash of a number of principles of International law and questions are asked: Are the acts of the non-state entities enough to qualify as armed acts which would then further qualify to be responded by acts of self defence? Can the victim state/country claim the right of self defence in such a situation based on customary international law or on the basis of what is provided in the United Nations Charter? What is the scope of this right of self defence, if any at all in cases where the host state has no involvement whatsoever with the terrorists/non-state actors operating in its territory? What forms of self defence measures (if any) can possibly be taken against such an armed act considering that the non-state entity is based in another country? And more generally, is the infringement of a states territory and its sovereignty a lawful and equally justifiable act, even it is for the purpose of destroying terrorist hideouts especially since the State itself is helpless or has not been able to expunge the terrorists due to reasons other than its military or political weakness? This paper proposes to advocate the point that there needs to be a distinction drawn between the various kinds of host states where the non-state actors/entities/ terrorists reside in a parasitic form. It will be contended that the host state which has the will, but for a number of reasons, other than its military, political or economic weakness, is not able to expel the non-state actors, necessitates a different response as compared to a host state which is a failed state. While the first states territory cannot be and should not be infringed to carry out an act of self defence in the form of a preventive strike, or otherwise, the latters territory due to its political failure can be infringed for the same purpose. Before forging any further in this exercise, it is important to note that this paper will be focused only on the jus ad bellum as opposed to the jus in bello. The question of applying the rules and principles involved in the latter will apply only after the questions framed above (and hoped to be answered in the following pages) are answered.</p>
    `,
    link: '#',
    readTime: "90 min read",
    tags: ["International Law", "Self Defence (Article 51)", "Non-state Actors", "Sovereignty", "Armed Attack", "Pakistan", "Counter-Terrorism", "Jus ad Bellum"],
    authorDetails: {
      name: "Obaid-ur-Rahman Khan",
      role: "Principal Litigator",
      email: "obaid@arclaws.com",
      publications: "Published dissertation on ‘International Law, Hostile Non-State Entities, The Scope of the Principle of Self Defense and Pakistan’",
      expertise: ["Commercial Litigation", "Corporate Litigation", "Civil Litigation", "Criminal Litigation", "Constitutional Matters", "International Law"]
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