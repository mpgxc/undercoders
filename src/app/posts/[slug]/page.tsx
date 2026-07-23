import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, isHiddenDraft } from "@/lib/api";
import { SITE_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { PostTags } from "@/app/_components/post-tags";
import { DraftBadge } from "@/app/_components/draft-badge";
import { RichPostFrame } from "@/app/_components/rich-post-frame";
import { Comments } from "@/app/_components/comments";
import DateFormatter from "@/app/_components/date-formatter";

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  // Drafts 404 in production; they render normally in dev / preview.
  if (!post || isHiddenDraft(post)) {
    return notFound();
  }

  // Rich HTML posts are self-contained documents — render them full-bleed in an
  // isolated frame instead of running them through the Markdown pipeline.
  if (post.format === "html") {
    return (
      <main>
        <Alert preview={post.preview} />
        <Container>
          <Header />
          <article className="mb-24">
            <div className="mb-8 max-w-5xl">
              {post.draft && <DraftBadge className="mb-4" />}
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-lg text-neutral-500 ">
                <span>{post.author?.name}</span>
                <span aria-hidden>·</span>
                <DateFormatter dateString={post.date} />
              </div>
              <PostTags tags={post.tags} className="mt-5" />
            </div>
          </article>
        </Container>
        <div className="mx-auto max-w-7xl px-5 mb-16">
          <RichPostFrame html={post.content} title={post.title} />
        </div>
        <Container>
          <div className="mb-32">
            <Comments />
          </div>
        </Container>
      </main>
    );
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <Alert preview={post.preview} />
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            tags={post.tags}
            draft={post.draft}
          />
          <PostBody content={content} />
        </article>
        <Comments />
      </Container>
    </main>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  return {
    // The root layout applies the `%s | Undercoders` template, so return the
    // bare post title here to avoid duplicating the site name.
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ${SITE_NAME}`,
      description: post.excerpt,
      images: [post.ogImage?.url ?? post.coverImage],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
