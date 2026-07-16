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

## Comentários (Giscus)

Cada post tem uma seção de comentários via
[Giscus](https://giscus.app) — comentários ficam armazenados como **GitHub
Discussions** do repositório, sem backend nem banco de dados. Cada post recebe
sua própria thread automaticamente (via `data-mapping="pathname"`).

Para ativar:

1. Habilite **Discussions** no repositório (Settings → General → Features).
2. Instale o app [giscus](https://github.com/apps/giscus) no repositório.
3. Crie uma categoria de Discussions (ex.: `Comments`, tipo _Announcement_).
4. Em [giscus.app](https://giscus.app), informe o repositório e a categoria e
   copie o `repo-id` e o `category-id` gerados.
5. Defina as variáveis de ambiente (veja `.env.example`) — no `.env.local` ou no
   painel da Vercel:

   ```
   NEXT_PUBLIC_GISCUS_REPO_ID=...
   NEXT_PUBLIC_GISCUS_CATEGORY_ID=...
   ```

Enquanto essas variáveis não estiverem definidas, a seção de comentários
simplesmente não é renderizada — nada quebra.

## Créditos

Estrutura inicial baseada no
[blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter)
do Next.js.
