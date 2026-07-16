import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTags } from "./post-tags";
import { DraftBadge } from "./draft-badge";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
  tags?: string[];
  draft?: boolean;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  tags,
  draft,
}: Props) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {draft && <DraftBadge />}
        {tags && tags.length > 0 && <PostTags tags={tags} />}
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          href={`/posts/${slug}`}
          className="hover:text-brand-dark transition-colors"
        >
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  );
}
