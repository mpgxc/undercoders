import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllTags, getPostsByTag, tagToSlug } from "@/lib/api";
import { SITE_NAME } from "@/lib/constants";

type Params = {
  params: Promise<{
    tag: string;
  }>;
};

function tagLabel(tagSlug: string): string | undefined {
  return getAllTags().find((tag) => tagToSlug(tag) === tagSlug);
}

export default async function TagPage(props: Params) {
  const { tag } = await props.params;
  const label = tagLabel(tag);
  const posts = getPostsByTag(tag);

  if (!label || posts.length === 0) {
    return notFound();
  }

  return (
    <main>
      <Container>
        <Header />
        <div className="mb-12">
          <p className="font-mono text-sm uppercase tracking-widest text-brand-dark ">
            Tag
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mt-2">
            {label}
          </h1>
          <p className="mt-4 text-lg text-neutral-500 ">
            {posts.length} {posts.length === 1 ? "publicação" : "publicações"}
            {" · "}
            <Link href="/" className="hover:text-brand-dark ">
              voltar para a home
            </Link>
          </p>
        </div>
        <MoreStories posts={posts} heading="Publicações" />
      </Container>
    </main>
  );
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const { tag } = await props.params;
  const label = tagLabel(tag);

  if (!label) {
    return {};
  }

  return {
    title: label,
    description: `Publicações sobre ${label} no ${SITE_NAME}.`,
  };
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tagToSlug(tag) }));
}
