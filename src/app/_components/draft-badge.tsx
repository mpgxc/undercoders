import cn from "classnames";

type Props = {
  className?: string;
};

/**
 * Selo de rascunho. Como drafts só são renderizados fora de produção, este selo
 * naturalmente aparece apenas em dev / preview — sinaliza que o post ainda não
 * está publicado.
 */
export function DraftBadge({ className }: Props) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border border-amber-500/50 bg-amber-50 px-3 py-1 font-mono text-xs uppercase tracking-wide text-amber-700",
        className,
      )}
    >
      rascunho
    </span>
  );
}

export default DraftBadge;
