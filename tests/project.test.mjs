import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { articles, authors } from "../data/news.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? filesUnder(entryPath) : [entryPath];
    }),
  );
  return files.flat();
}

test("uses standard cross-platform Next.js scripts", async () => {
  const packageJson = JSON.parse(await readFile(path.join(projectRoot, "package.json"), "utf8"));
  assert.equal(packageJson.scripts.dev, "next dev");
  assert.equal(packageJson.scripts.build, "next build --webpack");
  assert.equal(packageJson.scripts.start, "next start");
  assert.equal(packageJson.devDependencies.vinext, undefined);
  assert.equal(packageJson.devDependencies.typescript, undefined);
});

test("application source uses JavaScript and JSX without TypeScript files", async () => {
  const sourceDirectories = ["app", "components", "data", "lib"];
  const sourceFiles = (
    await Promise.all(sourceDirectories.map((directory) => filesUnder(path.join(projectRoot, directory))))
  ).flat();
  assert.equal(sourceFiles.some((file) => /\.tsx?$/.test(file)), false);
  assert.ok(sourceFiles.some((file) => file.endsWith(".jsx")));
  assert.ok(sourceFiles.some((file) => file.endsWith(".js")));
});

test("Tailwind CSS is enabled through PostCSS", async () => {
  const css = await readFile(path.join(projectRoot, "app/globals.css"), "utf8");
  const postcss = await readFile(path.join(projectRoot, "postcss.config.mjs"), "utf8");
  assert.match(css, /@import ["']tailwindcss["']/);
  assert.match(postcss, /@tailwindcss\/postcss/);
});

test("includes the requested publication data and long-form court article", () => {
  assert.equal(articles.length, 48);
  assert.equal(authors.length, 6);

  const courtArticle = articles[0];
  const articleWords = [
    courtArticle.title,
    courtArticle.summary,
    ...courtArticle.keyTakeaways,
    courtArticle.quote,
    ...courtArticle.sections.flatMap((section) => [section.heading, ...section.paragraphs]),
  ].join(" ").trim().split(/\s+/).length;
  const articleImages = 1 + courtArticle.sections.filter((section) => section.image).length;

  assert.equal(courtArticle.category, "courts");
  assert.ok(articleWords >= 1000, `expected at least 1000 words, received ${articleWords}`);
  assert.ok(articleImages >= 2);
});

test("home and article routes contain the required editorial modules", async () => {
  const home = await readFile(path.join(projectRoot, "app/page.jsx"), "utf8");
  const article = await readFile(path.join(projectRoot, "app/[category]/[slug]/page.jsx"), "utf8");

  assert.match(home, /46 image-led cards/);
  for (const moduleName of [
    "In this story",
    "Summary",
    "Key takeaways",
    "Follow the newsroom",
    "Latest news",
    "About the author",
  ]) {
    assert.match(article, new RegExp(moduleName));
  }
});
