# Undercoders

Blog sobre **desenvolvimento de software, arquitetura de sistemas, padrões de
projeto e inteligência artificial**.

Engenharia de software sem atalhos — foco nas decisões e nos trade-offs por trás
do código, não apenas no passo a passo.

Site estático gerado com **Next.js (App Router)**, **TypeScript**, **Tailwind
CSS** e conteúdo em **Markdown**.

## Como rodar

```bash
npm install
npm run dev
```

O blog fica disponível em [http://localhost:3000](http://localhost:3000).

Scripts:

- `npm run dev` — ambiente de desenvolvimento (Turbopack)
- `npm run build` — build de produção estático
- `npm run start` — sobe o build de produção

## Estrutura

```
_posts/                # publicações (.md ou .html)
public/assets/blog/    # capas e avatares
src/
├─ app/                # rotas (App Router) e componentes de UI
│  ├─ page.tsx         # home
│  ├─ posts/[slug]/    # página de uma publicação
│  └─ tags/[tag]/      # arquivo por tag
├─ interfaces/         # tipos (Post, Author)
└─ lib/                # leitura dos posts, tags e util de Markdown
```

## Escrevendo uma publicação

Cada arquivo em `_posts/` vira uma publicação. O nome do arquivo (sem extensão)
é o slug da URL.

### Post em Markdown (`.md`)

Adicione um arquivo com _front matter_:

```markdown
---
title: "Título da publicação"
excerpt: "Resumo curto que aparece nos cards e no SEO."
coverImage: "/assets/blog/meu-post/cover.svg"
date: "2026-07-16T12:00:00.000Z"
author:
  name: "mpgxc"
  picture: "/assets/blog/authors/mpgxc.svg"
ogImage:
  url: "/assets/blog/meu-post/cover.svg"
tags:
  - "Arquitetura de Sistemas"
  - "Padrões de Projeto"
---

Conteúdo em Markdown...
```

O campo `tags` alimenta as páginas de arquivo em `/tags/<tag>` automaticamente.

### Post em HTML rico (`.html`)

Para artigos visuais (diagramas SVG, layout próprio), crie um arquivo `.html`
com o mesmo _front matter_ no topo, seguido de um **documento HTML completo**.
Esses posts são renderizados em um _iframe_ isolado, preservando 100% do estilo
e das fontes originais sem interferir no CSS do blog. Veja
`_posts/como-eu-penso-arquitetura-e-design-backend.html` como referência.

### Rascunhos (draft)

Marque um post com `draft: true` no front matter para mantê-lo **oculto em
produção**:

```yaml
draft: true
```

- No `npm run dev` (e em qualquer build com `SHOW_DRAFTS=true`, útil para
  _preview deploys_ na Vercel) o rascunho aparece normalmente, com um selo
  **rascunho** nos cards e no topo do post.
- No `npm run build` de produção o post é excluído das listagens, das tags e das
  rotas — e acessá-lo diretamente retorna 404.

Publicar = remover a linha `draft: true`.

### Validação (CI)

`npm run validate:posts` checa o front matter de todos os posts: campos
obrigatórios, data válida, ao menos uma tag e a existência real das imagens
(capa, avatar e OG) em `public/`. A GitHub Action `Validar posts`
(`.github/workflows/validate-posts.yml`) roda essa checagem em todo PR que toca
`_posts/` ou `public/assets/`, barrando posts com metadados quebrados antes do
merge. Rode localmente antes de commitar:

```bash
npm run validate:posts
```

## Comentários (Giscus)

Cada post tem uma seção de comentários via
[Giscus](https://giscus.app) — comentários ficam armazenados como **GitHub
Discussions** do repositório, sem backend nem banco de dados. Cada post recebe
sua própria thread automaticamente (via `data-mapping="pathname"`).

Já vem **configurado** para o repositório `mpgxc/undercoders` (categoria
`General`) em `src/lib/constants.ts`. Requisitos, caso replique em outro repo:

1. Habilite **Discussions** no repositório (Settings → General → Features).
2. Instale o app [giscus](https://github.com/apps/giscus) no repositório.
3. Crie uma categoria de Discussions.
4. Em [giscus.app](https://giscus.app), gere o `repo-id` e o `category-id`.

Para apontar para outro repositório/categoria sem editar o código, sobrescreva
via variáveis de ambiente (veja `.env.example`), no `.env.local` ou na Vercel:

```
NEXT_PUBLIC_GISCUS_REPO_ID=...
NEXT_PUBLIC_GISCUS_CATEGORY_ID=...
NEXT_PUBLIC_GISCUS_CATEGORY=...
```

## Créditos

Estrutura inicial baseada no
[blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter)
do Next.js.
