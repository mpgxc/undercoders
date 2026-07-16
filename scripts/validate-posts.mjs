#!/usr/bin/env node
/**
 * Valida o frontmatter de todos os posts em `_posts/`.
 *
 * Roda localmente (`npm run validate:posts`) e no CI (GitHub Action) a cada PR,
 * garantindo que nenhum post entre no ar com metadados quebrados: campos
 * obrigatórios presentes, data válida, tags, e imagens (capa/avatar/OG)
 * realmente existindo em `public/`.
 *
 * Sai com código 1 (falha) se qualquer post tiver problema.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const postsDir = path.join(root, "_posts");
const publicDir = path.join(root, "public");

const POST_FILE_RE = /\.(md|html)$/;

/** @type {{file: string, problems: string[]}[]} */
const report = [];
const slugs = new Map();

function publicFileExists(webPath) {
  if (typeof webPath !== "string" || !webPath.startsWith("/")) return false;
  return fs.existsSync(path.join(publicDir, webPath));
}

const files = fs.existsSync(postsDir)
  ? fs.readdirSync(postsDir).filter((f) => POST_FILE_RE.test(f))
  : [];

if (files.length === 0) {
  console.error("✗ Nenhum post encontrado em _posts/.");
  process.exit(1);
}

for (const file of files) {
  /** @type {string[]} */
  const problems = [];
  const slug = file.replace(POST_FILE_RE, "");

  // slug único (um .md e um .html com o mesmo nome colidiriam na rota)
  if (slugs.has(slug)) {
    problems.push(`slug duplicado: também usado por "${slugs.get(slug)}"`);
  } else {
    slugs.set(slug, file);
  }

  let data;
  try {
    ({ data } = matter(fs.readFileSync(path.join(postsDir, file), "utf8")));
  } catch (err) {
    report.push({ file, problems: [`frontmatter inválido: ${err.message}`] });
    continue;
  }

  const str = (v) => typeof v === "string" && v.trim().length > 0;

  if (!str(data.title)) problems.push("`title` ausente ou vazio");
  if (!str(data.excerpt)) problems.push("`excerpt` ausente ou vazio");

  if (!str(data.date)) {
    problems.push("`date` ausente ou vazio");
  } else if (Number.isNaN(Date.parse(data.date))) {
    problems.push(`\`date\` inválida: "${data.date}"`);
  }

  if (!data.author || typeof data.author !== "object") {
    problems.push("`author` ausente");
  } else {
    if (!str(data.author.name)) problems.push("`author.name` ausente");
    if (!str(data.author.picture)) {
      problems.push("`author.picture` ausente");
    } else if (!publicFileExists(data.author.picture)) {
      problems.push(`\`author.picture\` não existe: ${data.author.picture}`);
    }
  }

  if (!str(data.coverImage)) {
    problems.push("`coverImage` ausente");
  } else if (!publicFileExists(data.coverImage)) {
    problems.push(`\`coverImage\` não existe: ${data.coverImage}`);
  }

  if (!data.ogImage || !str(data.ogImage.url)) {
    problems.push("`ogImage.url` ausente");
  } else if (!publicFileExists(data.ogImage.url)) {
    problems.push(`\`ogImage.url\` não existe: ${data.ogImage.url}`);
  }

  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    problems.push("`tags` deve ser uma lista com ao menos 1 item");
  } else if (!data.tags.every(str)) {
    problems.push("`tags` contém item vazio ou não-string");
  }

  if ("draft" in data && typeof data.draft !== "boolean") {
    problems.push("`draft` deve ser booleano (true/false)");
  }

  if (problems.length) report.push({ file, problems });
}

if (report.length === 0) {
  console.log(`✓ ${files.length} post(s) validado(s) — frontmatter OK.`);
  process.exit(0);
}

console.error("✗ Problemas encontrados no frontmatter dos posts:\n");
for (const { file, problems } of report) {
  console.error(`  _posts/${file}`);
  for (const p of problems) console.error(`    - ${p}`);
  console.error("");
}
console.error(
  `${report.length} de ${files.length} post(s) com problemas. Corrija antes de publicar.`,
);
process.exit(1);
