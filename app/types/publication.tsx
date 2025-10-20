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