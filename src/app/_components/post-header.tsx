import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTags } from "./post-tags";
import { DraftBadge } from "./draft-badge";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
  tags?: string[];
  draft?: boolean;
};

export function PostHeader({
  title,
  coverImage,
  date,
  author,
  tags,
  draft,
}: Props) {
  return (
    <>
      {draft && (
        <div className="text-center md:text-left mb-4">
          <DraftBadge />
        </div>
      )}
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
        {tags && tags.length > 0 && <PostTags tags={tags} className="mb-6" />}
      </div>
    </>
  );
}
