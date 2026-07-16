"use client";

import { useEffect, useRef } from "react";
import { GISCUS, isGiscusConfigured } from "@/lib/constants";

/**
 * Seção de comentários via Giscus (GitHub Discussions).
 *
 * Cada post recebe sua própria thread automaticamente através do
 * `data-mapping="pathname"`, que associa a Discussion à URL do post.
 * Renderiza apenas quando `repoId`/`categoryId` estão configurados.
 */
export function Comments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isGiscusConfigured()) return;

    const container = ref.current;
    if (!container) return;
    // Evita duplicar o widget em re-renders / navegação client-side.
    if (container.querySelector("iframe.giscus-frame")) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", GISCUS.repo);
    script.setAttribute("data-repo-id", GISCUS.repoId);
    script.setAttribute("data-category", GISCUS.category);
    script.setAttribute("data-category-id", GISCUS.categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "1");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "pt");
    script.setAttribute("data-loading", "lazy");

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  if (!isGiscusConfigured()) return null;

  return (
    <section className="max-w-2xl mx-auto mt-20" aria-label="Comentários">
      <h2 className="font-mono text-sm uppercase tracking-widest text-brand-dark mb-6">
        Comentários
      </h2>
      <div ref={ref} className="giscus" />
    </section>
  );
}

export default Comments;
