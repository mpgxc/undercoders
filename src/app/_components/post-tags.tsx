import Link from "next/link";
import cn from "classnames";
import { tagToSlug } from "@/lib/api";

type Props = {
  tags: string[];
  className?: string;
};

export function PostTags({ tags, className }: Props) {
  if (!tags || tags.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/tags/${tagToSlug(tag)}`}
            className="inline-block rounded-full border border-brand/40 px-3 py-1 font-mono text-xs uppercase tracking-wide text-brand-dark transition-colors hover:bg-brand hover:text-white "
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default PostTags;
