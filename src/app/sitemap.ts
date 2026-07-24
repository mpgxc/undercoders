import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags, tagToSlug } from "@/lib/api";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const tagEntries: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: `${SITE_URL}/tags/${tagToSlug(tag)}`,
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: posts[0] ? new Date(posts[0].date) : new Date(0),
      changeFrequency: "daily",
      priority: 1,
    },
    ...postEntries,
    ...tagEntries,
  ];
}
