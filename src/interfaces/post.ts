import { type Author } from "./author";

export type PostFormat = "markdown" | "html";

export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  tags: string[];
  /** How `content` should be rendered: parsed Markdown or a self-contained HTML document. */
  format: PostFormat;
  preview?: boolean;
};
