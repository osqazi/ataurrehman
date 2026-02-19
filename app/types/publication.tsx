export interface Publication {
  id: number;
  title: string;
  author: string;
  publishDate: string;
  journal: string;
  category: string;
  abstract: string;
  link: string;
  readTime: string;
  tags: string[];
}

export interface Author {
  name: string;
  role: string;
  publications: string;
  expertise: string;
}

// Publication categories for filtering
export const categories = [
  "All",
  "International Law",
  "Corporate Law",
  "Criminal Defense",
  "Arbitration",
  "Intellectual Property",
  "Family Law",
  "Real Estate",
  "Employment Law",
  "Litigation",
  "Legal Technology",
  "Constitutional Law",
  "Service Matters",
  "Election Disputes",
  "Rent Disputes",
];