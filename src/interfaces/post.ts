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
  /** When true, the post is hidden in production builds (visible only in dev / preview). */
  draft?: boolean;
  preview?: boolean;
};
