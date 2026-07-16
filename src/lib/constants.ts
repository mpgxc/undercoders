export const SITE_NAME = "Undercoders";

export const SITE_TAGLINE = "Engenharia de software sem atalhos.";

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

export const HOME_OG_IMAGE_URL = "/assets/og-default.svg";

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
