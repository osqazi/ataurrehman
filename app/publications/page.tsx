import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { FileText, Calendar, User, ExternalLink, BookOpen, Search } from 'lucide-react';
import type { Metadata } from "next";
import { Publication, Author } from '@/app/types/publication';
import Link from 'next/link';
import StructuredData from '../components/StructuredData';
import PublicationsContent from './PublicationsContent';

// Publications page metadata - optimized for legal thought leadership
export const metadata: Metadata = {
  title: "Legal Publications | Expert Insights & Analysis Karachi",
  description:
    "Read expert legal analysis and insights from our team. Publications on Corporate Law, International Law, Criminal Defense, Arbitration & more by leading advocates.",
  keywords: [
    "legal publications Pakistan",
    "law journal articles",
    "legal analysis Karachi",
    "corporate law articles",
    "international law Pakistan",
    "legal insights",
    "law firm blog",
    "legal thought leadership",
  ].join(", "),
  openGraph: {
    title: "Legal Publications | Expert Insights & Analysis",
    description: "Read expert legal analysis and insights from our team of leading advocates.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Ata-ur-Rahman & Co. Publications",
      },
    ],
  },
  alternates: {
    canonical: "https://www.arclaws.com/publications",
  },
};

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
  }
];

const categories: string[] = [
  "All",
  "Corporate Law",
  "Criminal Defense",
  "Arbitration",
  "Intellectual Property",
  "Family Law",
  "Real Estate",
  "Employment Law",
  "Litigation",
  "Legal Technology"
];

interface PublicationCardProps {
  publication: Publication;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication }) => {
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
          {publication.tags.map((tag: string, index: number) => (
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

const authors: Author[] = [
  {
    name: "Justice Ata-ur-Rehman (Retd.)",
    role: "Founder",
    publications: "--- Articles",
    expertise: "Corporate Law, Employment Law, Legal Technology"
  },
  {
    name: "Obaid-ur-Rehman",
    role: "Senior Advocate High Court",
    publications: "01 Article(s)",
    expertise: "Arbitration, International Law, Commercial Litigation"
  },
  {
    name: "Mudassir Abbasi",
    role: "Senior Advocate High Court",
    publications: "--- Articles",
    expertise: "Criminal Defense, Family Law, White Collar Crime"
  },
  {
    name: "Anwar Hussain",
    role: "Senior Advocate High Court",
    publications: "--- Articles",
    expertise: "Intellectual Property, Real Estate, Property Law"
  }
];

// Main Publications page component (Server Component)
// Client-side interactivity is handled by PublicationsContent
export default function Publications() {
  return (
    <div className="min-h-screen">
      {/* Structured data for publications page */}
      <StructuredData type="organization" />
      <PublicationsContent />
    </div>
  );
}