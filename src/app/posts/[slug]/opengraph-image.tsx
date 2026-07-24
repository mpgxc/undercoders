import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { SITE_NAME } from "@/lib/constants";

export const alt = SITE_NAME;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function Image(props: Props) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  return renderOgImage({
    title: post?.title ?? SITE_NAME,
    tags: post?.tags ?? [],
  });
}
