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
 * `repoId` e `categoryId` NÃO são segredos — são identificadores públicos.
 * Obtenha-os em https://giscus.app após:
 *   1. habilitar Discussions no repositório (Settings → Features → Discussions);
 *   2. instalar o app https://github.com/apps/giscus no repositório;
 *   3. criar uma categoria de Discussions (ex.: "Comments", tipo Announcement).
 *
 * Defina-os como variáveis de ambiente (ex.: no painel da Vercel):
 *   NEXT_PUBLIC_GISCUS_REPO_ID
 *   NEXT_PUBLIC_GISCUS_CATEGORY_ID
 *
 * Enquanto não estiverem definidos, a seção de comentários simplesmente não é
 * renderizada — nada quebra.
 */
export const GISCUS = {
  repo: "mpgxc/undercoders" as `${string}/${string}`,
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? "",
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "Comments",
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? "",
};

export const isGiscusConfigured = () =>
  Boolean(GISCUS.repoId && GISCUS.categoryId);
