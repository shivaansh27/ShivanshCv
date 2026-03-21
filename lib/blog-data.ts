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
    date: "Mar 2024",
    readTime: "8 min read",
    tags: ["SYSTEM DESIGN", "BACKEND", "ARCHITECTURE"],
    url: "https://sys-design12.hashnode.dev/how-url-shorteners-work-the-system-design-behind-tinyurl-and-bitly",
  },
  {
    id: "ai-integration-production",
    title: "Integrating AI into Real Products (Not Just Demos)",
    excerpt:
      "Lessons learned shipping AI features with Gemini and OpenAI — structured prompts, fallback strategies, validation guardrails, and why 'it works in the playground' is never enough.",
    date: "Feb 2026",
    readTime: "6 min read",
    tags: ["AI", "GEMINI", "PRODUCTION"],
    url: "https://github.com/shivaansh27",
  },
];
