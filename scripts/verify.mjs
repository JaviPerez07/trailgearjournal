import { readFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { site, navigation, editorialPages } from "../src/site.mjs";
import { articles } from "../src/articles.mjs";
import { tools, toolsHub } from "../src/tools.mjs";

const root = process.cwd();
const dist = path.join(root, "dist");
const failures = [];

const fail = (message) => failures.push(message);
const read = (file) => readFile(path.join(dist, file), "utf8");

async function walk(dir) {
  const entries = await readdir(dir);
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const info = await stat(full);
    if (info.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

const words = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

function routeFromFile(file) {
  const relDir = path.relative(dist, path.dirname(file)).replaceAll(path.sep, "/");
  return relDir === "." || relDir === "" ? "/" : `/${relDir}`;
}

async function verify() {
  if (!existsSync(dist)) fail("dist/ does not exist. Run npm run build first.");
  const htmlFiles = (await walk(dist)).filter((file) => file.endsWith(".html"));
  const paths = new Set(htmlFiles.map(routeFromFile));

  for (const article of articles) {
    const route = `/${article.slug}`;
    const html = await read(`${article.slug}/index.html`);
    if (words(html) < 800) fail(`${article.slug} is below 800 words of unique content.`);
    if (!html.includes(`rel="canonical" href="${site.domain}${route}"`)) fail(`${article.slug} canonical is missing or wrong.`);
    if (!html.includes("By Editorial Team")) fail(`${article.slug} missing Editorial Team byline.`);
    if (html.match(/Dr\.|PhD|M\.D\.|engineer author|certified guide/gi)) fail(`${article.slug} may contain invented credential language.`);
    const affiliates = (article.affiliateProducts || [])
      .map((product) => (typeof product === "string" ? { name: product, url: "" } : product))
      .filter((product) => product && product.name && product.url);
    if (affiliates.length && !html.includes('rel="nofollow sponsored"')) {
      fail(`${article.slug} has affiliate products with URLs but no rel="nofollow sponsored" link rendered.`);
    }
    if (!existsSync(path.join(root, "public", article.image))) fail(`${article.slug} source image missing: ${article.image}`);
    const jsonBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    for (const block of jsonBlocks) {
      try {
        JSON.parse(block[1]);
      } catch {
        fail(`${article.slug} has invalid JSON-LD.`);
      }
    }
  }

  for (const tool of tools) {
    if (!existsSync(path.join(root, "public", tool.image))) fail(`${tool.slug} source image missing: ${tool.image}`);
    const file = `${tool.path.replace(/^\//, "")}/index.html`;
    const html = await read(file);
    if (words(html) < 800) fail(`${tool.slug} is below 800 words of unique content.`);
    if (!html.includes(`rel="canonical" href="${site.domain}${tool.path}"`)) fail(`${tool.slug} canonical is missing or wrong.`);
    if (html.includes(".html")) fail(`${tool.slug} contains .html in rendered markup.`);
    if (!html.includes("Trail Gear Journal Editorial Team")) fail(`${tool.slug} missing calculator byline.`);
    if (!html.includes('href="/how-we-test"')) fail(`${tool.slug} missing How we test link.`);
    if (!html.includes("pagead2.googlesyndication.com/pagead/js/adsbygoogle.js")) fail(`${tool.slug} missing AdSense head script.`);
    if (!html.includes("<ins class=\"adsbygoogle ad-slot\"")) fail(`${tool.slug} missing in-article ad slot.`);
    if (!html.includes('"@type":"SoftwareApplication"')) fail(`${tool.slug} missing SoftwareApplication schema.`);
    if (!html.includes('"@type":"BreadcrumbList"')) fail(`${tool.slug} missing BreadcrumbList schema.`);
    if (!html.includes('"@type":"FAQPage"')) fail(`${tool.slug} missing FAQPage schema.`);
    const jsonBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    for (const block of jsonBlocks) {
      try {
        JSON.parse(block[1]);
      } catch {
        fail(`${tool.slug} has invalid JSON-LD.`);
      }
    }
  }

  const ads = await read("ads.txt");
  if (ads.trim() !== "google.com, pub-3733223915347669, DIRECT, f08c47fec0942fa0") fail("ads.txt content is wrong.");

  const redirects = await read("_redirects");
  if (!redirects.includes("301!")) fail("_redirects missing forced 301 rules.");
  if (redirects.match(/\s200!?/)) fail("_redirects contains a 200 rule.");

  const robots = await read("robots.txt");
  if (!robots.includes(`Sitemap: ${site.domain}/sitemap.xml`)) fail("robots.txt missing sitemap.");

  const sitemap = await read("sitemap.xml");
  const home = await read("index.html");
  const toolsHubHtml = await read("tools/index.html");
  if (!home.includes("Camping Calculators")) fail("Home missing Camping Calculators section.");
  if (!toolsHubHtml.includes(toolsHub.title)) fail("Tools hub missing title.");
  for (const tool of tools) {
    if (!sitemap.includes(`${site.domain}${tool.path}`)) fail(`Sitemap missing ${tool.path}.`);
    if (!home.includes(`href="${tool.path}"`)) fail(`Home missing card link to ${tool.path}.`);
    if (!toolsHubHtml.includes(`href="${tool.path}"`)) fail(`Tools hub missing card link to ${tool.path}.`);
    if (!home.includes(`href="${tool.path}"`)) fail(`Nav on home missing ${tool.path}.`);
    if (!home.includes(tool.title)) fail(`Home missing ${tool.title}.`);
  }

  for (const file of htmlFiles) {
    const rel = path.relative(dist, file);
    const html = await read(rel);
    const route = routeFromFile(file);
    const noindex = html.includes('name="robots" content="noindex, follow"');
    if (noindex && route !== "/404") fail(`${route} contains noindex.`);
    if (!noindex && !html.includes("pagead2.googlesyndication.com/pagead/js/adsbygoogle.js")) fail(`${route} missing AdSense script.`);
    if (html.match(/rel="canonical" href="[^"]*\.html"/)) fail(`${route} canonical contains .html.`);
    for (const href of [...html.matchAll(/href="(\/[^"#?]+)"/g)].map((match) => match[1])) {
      if (href.startsWith("/assets/")) continue;
      if (href.match(/\.(css|js|txt|xml|svg|webp)$/)) continue;
      if (!paths.has(href) && href !== "/") fail(`${route} links to missing route ${href}.`);
    }
  }

  const expectedRoutes = [
    "/",
    ...articles.map((article) => `/${article.slug}`),
    ...navigation.map((item) => item.href),
    ...editorialPages.map((item) => item.href),
    "/tools",
    ...tools.map((tool) => tool.path),
    "/404"
  ];
  for (const route of expectedRoutes) {
    if (!paths.has(route)) fail(`Missing built route ${route}.`);
  }

  if (failures.length) {
    console.error("Verification failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log("Verification passed.");
  console.log(`${htmlFiles.length} HTML files checked.`);
  console.log(`${articles.length} long-form articles checked.`);
}

verify();
