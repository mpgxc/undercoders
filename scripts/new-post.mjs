#!/usr/bin/env node
/**
 * Scaffold de uma nova publicação.
 *
 *   npm run new:post -- "Meu título aqui"
 *   npm run new:post -- "Meu título" --tags "Arquitetura de Sistemas, IA"
 *   npm run new:post -- "Meu título" --publish        # não cria como rascunho
 *
 * Sem título nos argumentos, o script pergunta interativamente.
 *
 * Gera:
 *   _posts/<slug>.md                          (frontmatter preenchido + corpo)
 *   public/assets/blog/<slug>/cover.svg       (capa SVG on-brand com o título)
 *
 * Por padrão o post nasce como rascunho (draft: true) — publique removendo essa
 * linha (ou use --publish para já criar publicado).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const postsDir = path.join(root, "_posts");
const assetsDir = path.join(root, "public", "assets", "blog");

// Mantém em sincronia com src/lib/constants.ts
const AUTHOR = { name: "mpgxc", picture: "/assets/blog/authors/mpgxc.svg" };
const DEFAULT_TAG = "Desenvolvimento de Software";

function slugify(str) {
  return str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Quebra o título em até 3 linhas de ~18 caracteres para caber na capa. */
function wrapTitle(title, maxChars = 18, maxLines = 3) {
  const words = title.split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] += "…";
    return kept;
  }
  return lines;
}

function coverSvg(title, tags) {
  const lines = wrapTitle(title);
  const startY = 300 - (lines.length - 1) * 34;
  const titleTspans = lines
    .map((line, i) => {
      const fill = i === lines.length - 1 && lines.length > 1 ? "#94a3b8" : "#f8fafc";
      return `  <text x="76" y="${startY + i * 68}" font-family="Inter, system-ui, sans-serif" font-size="58" font-weight="800" fill="${fill}">${escapeXml(line)}</text>`;
    })
    .join("\n");
  const tagsLine = tags.join(" · ");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1300" height="630" viewBox="0 0 1300 630" role="img" aria-label="${escapeXml(title)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0f172a"/>
      <stop offset="1" stop-color="#020617"/>
    </linearGradient>
  </defs>
  <rect width="1300" height="630" fill="url(#bg)"/>
  <text x="80" y="150" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="24" fill="#34d399">&gt;_ undercoders</text>
${titleTspans}
  <rect x="80" y="470" width="120" height="4" fill="#10b981"/>
  <text x="80" y="540" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="22" fill="#64748b">${escapeXml(tagsLine)}</text>
</svg>
`;
}

function parseArgs(argv) {
  const args = { _: [], tags: [], publish: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--publish") args.publish = true;
    else if (a === "--draft") args.publish = false;
    else if (a === "--tags") args.tags = (argv[++i] ?? "").split(",").map((t) => t.trim()).filter(Boolean);
    else args._.push(a);
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  let title = args._.join(" ").trim();
  let tags = args.tags;

  if (!title || tags.length === 0) {
    const rl = readline.createInterface({ input, output });
    if (!title) title = (await rl.question("Título do post: ")).trim();
    if (tags.length === 0) {
      const raw = await rl.question(`Tags (separadas por vírgula) [${DEFAULT_TAG}]: `);
      tags = raw.trim() ? raw.split(",").map((t) => t.trim()).filter(Boolean) : [DEFAULT_TAG];
    }
    rl.close();
  }

  if (!title) {
    console.error("✗ Título é obrigatório.");
    process.exit(1);
  }
  if (tags.length === 0) tags = [DEFAULT_TAG];

  const slug = slugify(title);
  if (!slug) {
    console.error("✗ Não foi possível gerar um slug a partir do título.");
    process.exit(1);
  }

  const mdPath = path.join(postsDir, `${slug}.md`);
  const htmlPath = path.join(postsDir, `${slug}.html`);
  if (fs.existsSync(mdPath) || fs.existsSync(htmlPath)) {
    console.error(`✗ Já existe um post com o slug "${slug}".`);
    process.exit(1);
  }

  const date = new Date().toISOString();
  const coverPath = `/assets/blog/${slug}/cover.svg`;
  const tagsYaml = tags.map((t) => `  - ${JSON.stringify(t)}`).join("\n");
  const draftLine = args.publish ? "" : "draft: true\n";

  const frontmatter = `---
title: ${JSON.stringify(title)}
excerpt: "TODO: escreva um resumo de 1–2 frases (aparece nos cards e no SEO)."
coverImage: "${coverPath}"
date: "${date}"
author:
  name: ${JSON.stringify(AUTHOR.name)}
  picture: "${AUTHOR.picture}"
ogImage:
  url: "${coverPath}"
tags:
${tagsYaml}
${draftLine}---

Comece a escrever aqui.

## Um subtítulo

Conteúdo em Markdown.
`;

  // capa
  const coverDir = path.join(assetsDir, slug);
  fs.mkdirSync(coverDir, { recursive: true });
  fs.writeFileSync(path.join(coverDir, "cover.svg"), coverSvg(title, tags));

  // post
  fs.writeFileSync(mdPath, frontmatter);

  console.log(`\n✓ Post criado${args.publish ? "" : " como rascunho"}:`);
  console.log(`  _posts/${slug}.md`);
  console.log(`  public/assets/blog/${slug}/cover.svg`);
  console.log(`\nPróximos passos:`);
  console.log(`  1. Edite o conteúdo e o excerpt em _posts/${slug}.md`);
  if (!args.publish) console.log(`  2. Publique removendo a linha "draft: true"`);
  console.log(`  ${args.publish ? "2" : "3"}. Valide: npm run validate:posts`);
  console.log(`  ${args.publish ? "3" : "4"}. Veja no navegador: npm run dev → /posts/${slug}\n`);
}

main();
