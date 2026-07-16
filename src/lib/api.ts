import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

/** Posts are authored either as Markdown (.md) or as self-contained HTML documents (.html). */
const POST_FILE_RE = /\.(md|html)$/;

/**
 * Drafts (`draft: true` no frontmatter) aparecem no `next dev` e podem ser
 * forçados em qualquer build com `SHOW_DRAFTS=true` (útil em preview deploys),
 * mas ficam ocultos no build de produção padrão.
 */
export const INCLUDE_DRAFTS =
  process.env.NODE_ENV !== "production" ||
  process.env.SHOW_DRAFTS === "true" ||
  process.env.NEXT_PUBLIC_SHOW_DRAFTS === "true";

/** Um post está oculto quando é rascunho e o build atual não inclui drafts. */
export function isHiddenDraft(post: Pick<Post, "draft">): boolean {
  return Boolean(post.draft) && !INCLUDE_DRAFTS;
}

export function getPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => POST_FILE_RE.test(file));
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(POST_FILE_RE, "");

  const htmlPath = join(postsDirectory, `${realSlug}.html`);
  const isHtml = fs.existsSync(htmlPath);
  const fullPath = isHtml ? htmlPath : join(postsDirectory, `${realSlug}.md`);

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...data,
    slug: realSlug,
    content,
    tags: Array.isArray(data.tags) ? data.tags : [],
    draft: Boolean(data.draft),
    format: isHtml ? "html" : "markdown",
  } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // hide drafts in production builds
    .filter((post) => !isHiddenDraft(post))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

/** Normalizes a tag into a URL-safe slug (used for `/tags/[tag]` routes). */
export function tagToSlug(tag: string): string {
  return tag
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) tags.add(tag);
  }
  return Array.from(tags).sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export function getPostsByTag(tagSlug: string): Post[] {
  return getAllPosts().filter((post) =>
    post.tags.some((tag) => tagToSlug(tag) === tagSlug),
  );
}
