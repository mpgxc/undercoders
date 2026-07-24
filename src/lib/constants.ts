export const SITE_NAME = "Undercoders";

export const SITE_TAGLINE = "Engenharia de software sem atalhos.";

/**
 * URL canônica do site (sem barra final). Usada para gerar URLs absolutas em
 * Open Graph, sitemap, robots e RSS — essenciais para o link preview funcionar.
 *
 * Resolve automaticamente:
 *   1. NEXT_PUBLIC_SITE_URL          (domínio custom, se você definir)
 *   2. VERCEL_PROJECT_PRODUCTION_URL (domínio de produção da Vercel, no build)
 *   3. http://localhost:3000         (fallback em dev)
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/+$/, "");

export const SITE_DESCRIPTION =
  "Blog sobre desenvolvimento de software, arquitetura de sistemas, padrões de projeto e inteligência artificial.";

export const SITE_TOPICS = [
  "Desenvolvimento de Software",
  "Arquitetura de Sistemas",
  "Padrões de Projeto",
  "Inteligência Artificial",
];

export const AUTHOR_NAME = "mpgxc";

export const GITHUB_URL = "https://github.com/mpgxc/undercoders";

/**
 * Configuração do Giscus (comentários via GitHub Discussions).
 *
 * `repoId` e `categoryId` NÃO são segredos — são identificadores públicos
 * (aparecem no próprio widget em qualquer site). Os valores abaixo já vêm
 * configurados para o repositório mpgxc/undercoders, gerados em
 * https://giscus.app. Para apontar para outro repositório/categoria, sobrescreva
 * via variáveis de ambiente (ex.: no painel da Vercel):
 *   NEXT_PUBLIC_GISCUS_REPO_ID
 *   NEXT_PUBLIC_GISCUS_CATEGORY_ID
 *   NEXT_PUBLIC_GISCUS_CATEGORY  (opcional — nome da categoria)
 */
export const GISCUS = {
  repo: "mpgxc/undercoders" as `${string}/${string}`,
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? "R_kgDOTadENg",
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "General",
  categoryId:
    process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? "DIC_kwDOTadENs4DBVbH",
};

export const isGiscusConfigured = () =>
  Boolean(GISCUS.repoId && GISCUS.categoryId);
