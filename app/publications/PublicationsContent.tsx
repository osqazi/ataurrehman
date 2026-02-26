"use client";
/**
 * PublicationsContent Component
 * 
 * Client-side wrapper for publications page interactivity.
 * This is separated from the main page to allow metadata export.
 */
import { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { FileText, Calendar, User, ExternalLink, BookOpen, Search } from 'lucide-react';
import { Publication, Author, categories } from '@/app/types/publication';
import Link from 'next/link';

// Publications data
const publications: Publication[] = [
  {
    id: 1,
    title: "INTERNATIONAL LAW, HOSTILE NON-STATE ENTITIES, THE SCOPE OF THE PRINCIPLE OF SELF DEFENCE AND PAKISTAN",
    author: "Obaid-ur-Rahman Khan",
    publishDate: "2011-01-03",
    journal: "LLM Dissertation (Revised for Book Publication)",
    category: "International Law, Use of Force, National Security, Law of Armed Conflict",
    abstract: "This paper examines the complex issue of self-defence against hostile non-state entities (HNS-Es) or terrorist organizations operating from within the territory of a sovereign host state, focusing on the principles of jus ad bellum.",
    link: "#",
    readTime: "90 min read",
    tags: ["International Law", "Self Defence (Article 51)", "Non-state Actors", "Sovereignty", "Armed Attack", "Pakistan", "Counter-Terrorism", "Jus ad Bellum"]
  },
];

// Authors data
const authors: Author[] = [
  {
    name: "Obaid-ur-Rahman Khan",
    role: "Senior Advocate High Court",
    publications: "1+ Articles",
    expertise: "International Law, Commercial Litigation, Arbitration"
  },
  {
    name: "Justice (Retd.) Ata-ur-Rahman",
    role: "Founder",
    publications: "Multiple Publications",
    expertise: "Corporate Law, Employment Law, Constitutional Law"
  },
  {
    name: "Mudassir Abbasi",
    role: "Senior Advocate High Court",
    publications: "Multiple Articles",
    expertise: "Criminal Defense, White Collar Crimes, Family Law"
  },
  {
    name: "Anwar Hussain",
    role: "Senior Advocate High Court",
    publications: "Multiple Articles",
    expertise: "Intellectual Property, Real Estate, Property Law"
  }
];

// Publication Card Component
const PublicationCard = ({ publication }: { publication: Publication }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group">
      <div className="flex flex-col h-full">
        {/* Category and Metadata */}
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700">
            {publication.category}
          </span>
          <span className="flex items-center text-sm text-gray-500">
            <BookOpen className="h-4 w-4 mr-1" />
            {publication.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
          {publication.title}
        </h3>

        {/* Author and Date */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <div className="flex items-center mr-4">
            <User className="h-4 w-4 mr-1" />
            {publication.author}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(publication.publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        {/* Journal */}
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-700">Published in: </span>
          <span className="text-sm text-primary-600 font-semibold">{publication.journal}</span>
        </div>

        {/* Abstract */}
        <p className="text-gray-700 leading-relaxed mb-4 flex-grow">
          {publication.abstract}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {publication.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Read More Link */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <Link
             href={`/publications/${publication.id}`}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors"
          >
            Read Full Article
            <ExternalLink className="h-4 w-4 ml-1" />
          </Link>
          <FileText className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

// Main PublicationsContent Component
export default function PublicationsContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredPublications: Publication[] = publications.filter((publication: Publication) => {
    const matchesCategory: boolean = selectedCategory === "All" || publication.category === selectedCategory;

    if (!searchTerm.trim()) {
      return matchesCategory;
    }

    const searchLower: string = searchTerm.toLowerCase();
    const matchesSearch: boolean =
      publication.title.toLowerCase().includes(searchLower) ||
      publication.abstract.toLowerCase().includes(searchLower) ||
      publication.author.toLowerCase().includes(searchLower) ||
      publication.journal.toLowerCase().includes(searchLower) ||
      publication.tags.some((tag: string) => tag.toLowerCase().includes(searchLower));

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />

      {/* Publications Header */}
      <section className="bg-primary-700 text-white">
        <div className="container-custom section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Legal Publications</h1>
            <p className="text-xl text-primary-100">
              Insights, Analysis, and Thought Leadership from Our Expert Litigators
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="section-padding bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search publications by title, author, or topic..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category: string) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Articles & Research
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our collection of published works covering diverse legal topics and emerging trends.
            </p>
          </div>

          {filteredPublications.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No publications found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPublications.map((publication: Publication) => (
                <PublicationCard key={publication.id} publication={publication} />
              ))}
            </div>
          )}

          {/* Results Count */}
          <div className="mt-8 text-center text-gray-600">
            Showing {filteredPublications.length} of {publications.length} publications
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </div>
        </div>
      </section>

      {/* Authors Spotlight */}
      {/* <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Contributing Authors
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the legal experts behind our publications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {authors.map((author: Author, index: number) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{author.name}</h3>
                <p className="text-primary-600 text-sm mb-2">{author.role}</p>
                <p className="text-sm text-gray-600 mb-3">{author.publications}</p>
                <p className="text-xs text-gray-500">{author.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with Legal Insights
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Subscribe to receive our latest publications and legal updates directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
