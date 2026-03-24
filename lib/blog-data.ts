export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  url: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: "how-url-shorteners-work",
    title: "How URL Shorteners Work: The System Design Behind TinyURL and Bitly",
    excerpt:
      "A deep dive into the system design, architecture, and algorithms behind URL shortening services like TinyURL and Bitly, exploring base62 encoding, database choices, and scaling strategies.",
    date: "Mar 2026",
    readTime: "8 min read",
    tags: ["SYSTEM DESIGN", "BACKEND", "ARCHITECTURE"],
    url: "https://sys-design12.hashnode.dev/how-url-shorteners-work-the-system-design-behind-tinyurl-and-bitly",
  },
  {
    id: "caching-explained-real-examples",
    title: "Caching Explained with Real Examples: The Secret Behind Fast Systems",
    excerpt:
      "A deep dive into caching strategies, including Cache-Aside, Write-Through, and Write-Back, explaining how real-world systems use Redis and CDNs to achieve high performance.",
    date: "MAR 2026",
    readTime: "6 min read",
    tags: ["SYSTEM DESIGN", "CACHING", "REDIS"],
    url: "https://sys-design12.hashnode.dev/caching-explained-with-real-examples-the-secret-behind-fast-systems",
  },
];
