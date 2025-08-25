export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  publishDate: string;
  tags: string[];
  category: string;
  type: 'article' | 'blog';
  trending?: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface AuthorInfo {
  name: string;
  bio: string;
  avatar: string;
  address: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}
