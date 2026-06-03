import { mkdir, rm, writeFile, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { site, navigation, editorialPages } from "../src/site.mjs";
import { articles } from "../src/articles.mjs";
import { tools, toolsHub } from "../src/tools.mjs";
import { institutionalPages } from "../src/editorial.mjs";

const root = process.cwd();
const dist = path.join(root, "dist");
const imageDir = path.join(root, "public", "assets", "images");

const esc = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const wordCount = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

const canonical = (pathname) => `${site.domain}${pathname === "/" ? "" : pathname}`;

function pageShell({ title, description, pathname, body, image, schema = [], noindex = false }) {
  const url = canonical(pathname);
  const imageUrl = image ? `${site.domain}${image}` : `${site.domain}/assets/images/home-hero-camp-kitchen.webp`;
  const jsonLd = schema.map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`).join("\n");
  return `<!doctype html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  ${noindex ? '<meta name="robots" content="noindex, follow">' : ""}
  <link rel="canonical" href="${url}">
  <link rel="icon" href="/assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/styles.css">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(site.name)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${imageUrl}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${imageUrl}">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${site.adsensePublisher}" crossorigin="anonymous"></script>
  ${jsonLd}
</head>
<body>
  <a class="skip-link button" href="#main">Skip to content</a>
  ${header(pathname)}
  <main id="main">${body}</main>
  ${footer()}
</body>
</html>`;
}

function header(pathname) {
  const links = navigation
    .map((item) => `<a href="${item.href}" ${pathname === item.href ? 'aria-current="page"' : ""}>${esc(item.label)}</a>`)
    .join("");
  return `<header class="site-header">
  <div class="nav-shell">
    <a class="brand" href="/" aria-label="${esc(site.name)} home">
      <img class="brand-mark" src="/assets/icons/favicon.svg" alt="" width="42" height="42">
      <span class="brand-name">${esc(site.name)}</span>
    </a>
    <nav class="nav-links" aria-label="Main navigation">${links}</nav>
  </div>
</header>`;
}

function footer() {
  const links = [...editorialPages, { label: toolsHub.title, href: "/tools" }, ...tools.map((tool) => ({ label: tool.title, href: tool.path }))]
    .map((item) => `<a href="${item.href}">${esc(item.label)}</a>`)
    .join("");
  return `<footer class="site-footer">
  <div class="footer-inner">
    <div>
      <strong>${esc(site.name)}</strong>
      <p>${esc(site.tagline)} Content is published by the Editorial Team for informational purposes.</p>
    </div>
    <nav class="footer-links" aria-label="Editorial pages">${links}</nav>
  </div>
</footer>`;
}

function articleCard(article, large = false) {
  const href = article.path || `/${article.slug}`;
  return `<article class="article-card ${large ? "large" : ""}">
  <a href="${href}" aria-label="${esc(article.title)}"><img src="${article.image}" alt="${esc(article.alt)}" width="900" height="600" loading="${large ? "eager" : "lazy"}"></a>
  <div>
    <div class="kicker">${esc(article.category)}</div>
    <h3><a href="${href}">${esc(article.title)}</a></h3>
    <p>${esc(article.dek)}</p>
  </div>
</article>`;
}

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.domain}${item.url === "/" ? "" : item.url}`
    }))
  };
}

function articleSchema(article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.dek,
    image: `${site.domain}${article.image}`,
    datePublished: article.date,
    dateModified: article.date,
    editor: { "@type": "Organization", name: "Editorial Team" },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.domain}/${article.slug}`
  };
}

function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a }
    }))
  };
}

function softwareApplicationSchema(tool) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    url: `${site.domain}${tool.path}`,
    description: tool.dek,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    creator: {
      "@type": "Organization",
      name: site.name
    }
  };
}

function itemListSchema(article) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: article.title,
    itemListElement: article.products.map((name, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name
    }))
  };
}

function reviewSchemas(article) {
  if (article.type !== "comparison") return [];
  return article.products.map((name) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "Product", name },
    author: { "@type": "Organization", name: "Editorial Team" },
    reviewBody: `${article.title} evaluates ${name} qualitatively for fit, tradeoffs, and camping use cases without assigning a score.`
  }));
}

function homePage() {
  const [lead, side, ...rest] = articles;
  const body = `<section class="hero">
  <div class="section-inner">
    <div class="hero-copy">
      <p class="eyebrow">US Camping Gear Magazine</p>
      <h1>Field-tested thinking for better nights outside.</h1>
      <p>${esc(site.tagline)} Buying guides, gear comparisons, and setup advice for campers who care about comfort, weight, weather, and value.</p>
      <div class="hero-actions">
        <a class="button" href="/buying-guides">Read Buying Guides</a>
        <a class="button secondary" href="/tools">Open Calculators</a>
      </div>
    </div>
    <div class="hero-image">
      <img src="/assets/images/home-hero-camp-kitchen.webp" alt="Premium outdoor camp kitchen at sunrise with tents and forest behind it" width="900" height="1100">
    </div>
  </div>
</section>
<section class="section light">
  <div class="section-inner">
    <div class="section-header">
      <h2>Latest Field Notes</h2>
      <p>Focused gear guidance for tents, sleep systems, camp kitchens, and beginner overlanding setups.</p>
    </div>
    <div class="grid featured">
      ${articleCard(lead, true)}
      ${articleCard(side)}
    </div>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <div class="section-header">
      <h2>Buying Guides</h2>
      <p>Long-tail guides written for real US campground decisions, not showroom fantasies.</p>
    </div>
    <div class="grid three">${articles.filter((a) => a.categorySlug === "buying-guides").map((a) => articleCard(a)).join("")}</div>
  </div>
</section>
<section class="section light">
  <div class="section-inner">
    <div class="section-header">
      <h2>Comparisons</h2>
      <p>Side-by-side gear choices for campers who want the tradeoffs before the checkout page.</p>
    </div>
    <div class="grid three">${articles.filter((a) => a.categorySlug === "comparisons").map((a) => articleCard(a)).join("")}</div>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <div class="section-header">
      <h2>Camping Calculators</h2>
      <p>Fast planning tools for common pre-trip questions: tent size, water, pack weight, sleeping bag warmth, and firewood.</p>
    </div>
    <div class="grid three">${tools.map((tool) => articleCard(tool)).join("")}</div>
  </div>
</section>
<section class="section light">
  <div class="section-inner">
    <div class="section-header">
      <h2>How-To & Overlanding</h2>
      <p>Systems for setting up camp, organizing gear, and building beginner-friendly mobile camp kits.</p>
    </div>
    <div class="grid three">${rest.filter((a) => a.categorySlug !== "buying-guides" && a.categorySlug !== "comparisons").map((a) => articleCard(a)).join("")}</div>
  </div>
</section>`;
  return pageShell({
    title: `${site.name} | Camping Gear Guides & Outdoor Magazine`,
    description: "Premium US camping gear magazine with buying guides, product comparisons, how-to articles, and planning tools.",
    pathname: "/",
    image: "/assets/images/home-hero-camp-kitchen.webp",
    body,
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: site.name,
        url: site.domain
      }
    ]
  });
}

function realAffiliates(article) {
  return (article.affiliateProducts || [])
    .map((product) => (typeof product === "string" ? { name: product, url: "" } : product))
    .filter((product) => product && product.name && product.url);
}

function affiliateBlock(article) {
  const items = realAffiliates(article);
  if (!items.length) return "";
  return `<aside class="notice">
  <strong>Affiliate disclosure:</strong> ${site.name} may earn from qualifying purchases through retailer links. We do not invent product awards, star ratings, or hands-on claims.
</aside>
${items
  .map(
    (product) => `<div class="product-box">
  <strong>${esc(product.name)}</strong>
  <a class="button" href="${esc(product.url)}" rel="nofollow sponsored" target="_blank">View at retailer</a>
</div>`
  )
  .join("")}`;
}

function articlePage(article) {
  const headings = article.sections.map(([heading]) => heading);
  const bodySections = article.sections
    .map(([heading, copy]) => `<h2 id="${slugify(heading)}">${esc(heading)}</h2><p>${esc(copy)}</p>`)
    .join("");
  const comparison = article.comparisonRows
    ? `<h2 id="spec-comparison">Spec Comparison</h2>
<table class="comparison-table">
  <thead><tr><th>Factor</th><th>${esc(article.products[0])}</th><th>${esc(article.products[1])}</th></tr></thead>
  <tbody>${article.comparisonRows.map((row) => `<tr><td>${esc(row[0])}</td><td>${esc(row[1])}</td><td>${esc(row[2])}</td></tr>`).join("")}</tbody>
</table>`
    : "";
  const sources = `<h2 id="source-notes">Source Notes</h2><ul>${article.sourceNotes.map((note) => `<li>${esc(note)}</li>`).join("")}</ul>`;
  const related = articles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3)
    .map((item) => `<li><a href="/${item.slug}">${esc(item.title)}</a></li>`)
    .join("");
  const ftcDisclosure = realAffiliates(article).length
    ? `<aside class="notice"><strong>FTC affiliate disclosure:</strong> As an Amazon Associate, ${site.name} earns from qualifying purchases at no extra cost to you. We don't invent product awards, star ratings, or hands-on claims.</aside>`
    : "";
  const body = `<section class="article-hero">
  <div class="article-shell">
    <div>
      <p class="article-meta">${esc(article.category)} · Updated June 2, 2026 · By Editorial Team</p>
      <h1>${esc(article.title)}</h1>
      <p>${esc(article.dek)}</p>
    </div>
    <img src="${article.image}" alt="${esc(article.alt)}" width="900" height="680">
  </div>
</section>
<section class="content">
  <div class="article-shell content-grid">
    <article class="article-body">
      ${ftcDisclosure}
      ${comparison}
      <p>Every recommendation here follows the ${esc(site.name)} <a href="/how-we-test">testing and evaluation process</a>.</p>
      ${bodySections}
      ${sources}
      <h2 id="faq">FAQ</h2>
      ${article.faqs.map(([q, a]) => `<details class="faq-box"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}
    </article>
    <aside class="sidebar" aria-label="Article sidebar">
      <div class="toc">
        <strong>In This Guide</strong>
        ${headings.map((heading) => `<a href="#${slugify(heading)}">${esc(heading)}</a>`).join("")}
        <a href="#faq">FAQ</a>
      </div>
      ${affiliateBlock(article)}
      <div class="sidebar-card">
        <strong>Related guides</strong>
        <ul>${related}</ul>
      </div>
    </aside>
  </div>
</section>`;
  return pageShell({
    title: `${article.title} | ${site.name}`,
    description: article.dek,
    pathname: `/${article.slug}`,
    image: article.image,
    body,
    schema: [
      articleSchema(article),
      breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: article.category, url: `/${article.categorySlug}` },
        { name: article.title, url: `/${article.slug}` }
      ]),
      faqSchema(article.faqs),
      ...(article.type === "comparison" ? [itemListSchema(article), ...reviewSchemas(article)] : [])
    ]
  });
}

function categoryPage(categorySlug, label) {
  const list = articles.filter((article) => article.categorySlug === categorySlug);
  const body = `<section class="section light">
  <div class="section-inner">
    <div class="section-header">
      <h1>${esc(label)}</h1>
      <p>Editorial gear coverage by the ${esc(site.name)} Editorial Team.</p>
    </div>
    <div class="grid three">${list.map((article) => articleCard(article)).join("")}</div>
  </div>
</section>`;
  return pageShell({
    title: `${label} | ${site.name}`,
    description: `${label} from ${site.name}, including US camping gear guides and comparisons.`,
    pathname: `/${categorySlug}`,
    body,
    schema: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: label, url: `/${categorySlug}` }])]
  });
}

function hubPage() {
  const body = `<section class="section light">
  <div class="section-inner">
    <div class="section-header">
      <h1>${esc(toolsHub.title)}</h1>
      <p>${esc(toolsHub.dek)} Each tool is an estimate for planning, not professional advice or a substitute for current local rules.</p>
    </div>
    <div class="grid three">${tools.map((tool) => articleCard(tool)).join("")}</div>
  </div>
</section>`;
  return pageShell({
    title: `${toolsHub.title} | ${site.name}`,
    description: toolsHub.dek,
    pathname: "/tools",
    image: toolsHub.image,
    body,
    schema: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: toolsHub.title, url: "/tools" }])]
  });
}

function adSlot(label = "Advertisement") {
  return `<aside class="notice" aria-label="${esc(label)}">
  <span class="kicker">${esc(label)}</span>
  <ins class="adsbygoogle ad-slot" style="display:block" data-ad-client="${site.adsensePublisher}" data-ad-slot="0000000000" data-ad-format="auto" data-full-width-responsive="true"></ins>
</aside>`;
}

function relatedLinkLabel(href) {
  const article = articles.find((item) => `/${item.slug}` === href);
  if (article) return article.title;
  const tool = tools.find((item) => item.path === href);
  if (tool) return tool.title;
  if (href === "/tools") return toolsHub.title;
  const nav = navigation.find((item) => item.href === href);
  return nav?.label || href.replaceAll("/", " ").trim();
}

function renderToolInputs(tool) {
  return tool.inputs
    .map((input) => {
      if (input.type === "select") {
        return `<div class="calc-row">
          <label for="${esc(input.id)}">${esc(input.label)}</label>
          <select id="${esc(input.id)}" name="${esc(input.id)}">${input.options.map(([value, label]) => `<option value="${esc(value)}">${esc(label)}</option>`).join("")}</select>
        </div>`;
      }
      return `<div class="calc-row">
        <label for="${esc(input.id)}">${esc(input.label)}</label>
        <input id="${esc(input.id)}" name="${esc(input.id)}" type="${esc(input.type)}" min="${esc(input.min)}" step="${esc(input.step)}" value="${esc(input.value)}">
      </div>`;
    })
    .join("");
}

function toolPage(tool) {
  const body = `<section class="article-hero">
  <div class="article-shell">
    <div>
      <p class="article-meta">Trail Gear Journal Editorial Team — Reviewed ${esc(tool.reviewed)} · <a href="/how-we-test">How we test</a></p>
      <h1>${esc(tool.title)}</h1>
      <p>${esc(tool.dek)}</p>
    </div>
    <img src="${tool.image}" alt="${esc(tool.alt)}" width="900" height="680">
  </div>
</section>
<section class="content">
  <div class="article-shell calc-layout">
    <div class="calc-panel">
      <form class="calculator" data-calculator="${esc(tool.scriptId)}">
        ${renderToolInputs(tool)}
      </form>
    </div>
    <aside class="calc-panel">
      <p class="eyebrow">${esc(tool.resultLabel)}</p>
      <div class="result-total" data-result-main>Calculating</div>
      <p data-result-note>Adjust the inputs to update the estimate.</p>
      <p><a class="text-button" href="/tools">Back to all calculators</a></p>
    </aside>
    <article class="article-body" id="calculator-guide">
      <aside class="notice"><strong>Planning disclaimer:</strong> Calculator results are estimates for outdoor trip planning. They are not professional advice, medical guidance, fire-safety clearance, or a substitute for current campground, public-land, weather, and manufacturer instructions.</aside>
      <h2>What This Calculator Does</h2>
      <p>${esc(tool.dek)} It is built for quick planning before you buy gear, load a vehicle, pack a backpack, or leave for a campground where small mistakes can become expensive or uncomfortable. The result should be treated as a range-aware starting point, then checked against your actual gear, local rules, weather, and group needs.</p>
      <h2>How This Calculator Works</h2>
      <p>${esc(tool.formula)}</p>
      ${tool.howItWorks.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
      ${adSlot("Advertisement")}
      <h2>Planning Factors</h2>
      <table class="comparison-table">
        <thead><tr><th>Factor</th><th>Planning Range</th><th>Why It Matters</th></tr></thead>
        <tbody>${tool.planningFactors.map((row) => `<tr><td>${esc(row[0])}</td><td>${esc(row[1])}</td><td>${esc(row[2])}</td></tr>`).join("")}</tbody>
      </table>
      <h2>Field Tips</h2>
      <ul>${tool.tips.map((tip) => `<li>${esc(tip)}</li>`).join("")}</ul>
      <h2>Common Mistakes</h2>
      <ul>${tool.mistakes.map((mistake) => `<li>${esc(mistake)}</li>`).join("")}</ul>
      <h2>When to Recalculate</h2>
      <p>Run the numbers again whenever the trip changes in a meaningful way: one more person joins, the forecast gets hotter or colder, the campground rules change, a resupply point becomes uncertain, or you swap a major piece of gear. Outdoor planning is rarely a one-and-done decision. A quick recalculation before packing can catch mismatches that are easy to miss when you are focused on reservations, food, driving time, and weather windows.</p>
      <p>For the cleanest estimate, use the calculator once during early planning and again after your gear is staged. The first pass helps with shopping and route decisions. The second pass catches real-world details: extra layers, water containers, fuel, bulky pads, damp-weather backups, and group items that were not obvious at the start.</p>
      <h2>Related Planning Guides</h2>
      <p>Use this tool alongside the broader ${esc(site.name)} planning library. Good estimates work best when paired with gear judgment, campsite organization, and current trip conditions.</p>
      <ul>
        <li><a href="/tools">${esc(toolsHub.title)}</a></li>
        ${tool.related.map((href) => `<li><a href="${href}">${esc(relatedLinkLabel(href))}</a></li>`).join("")}
      </ul>
      <h2>FAQ</h2>
      ${tool.faqs.map(([q, a]) => `<details class="faq-box"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}
    </article>
  </div>
</section>
<script src="/assets/scripts/gear-calculator.js" defer></script>`;
  return pageShell({
    title: tool.metaTitle,
    description: tool.metaDescription,
    pathname: tool.path,
    image: tool.image,
    body,
    schema: [
      softwareApplicationSchema(tool),
      breadcrumbSchema([{ name: "Home", url: "/" }, { name: toolsHub.title, url: "/tools" }, { name: tool.title, url: tool.path }]),
      faqSchema(tool.faqs)
    ]
  });
}

function editorialPage(slug, title, copy, description) {
  const body = `<section class="section light">
  <div class="article-shell">
    <div class="section-header">
      <h1>${esc(title)}</h1>
      <p>${esc(site.name)} editorial and policy information.</p>
    </div>
    <article class="article-body">${copy}</article>
  </div>
</section>`;
  return pageShell({
    title: `${title} | ${site.name}`,
    description: description || `${title} for ${site.name}.`,
    pathname: `/${slug}`,
    body,
    schema: [breadcrumbSchema([{ name: "Home", url: "/" }, { name: title, url: `/${slug}` }])]
  });
}

async function writePage(pathname, html) {
  const dir = path.join(dist, pathname === "/" ? "" : pathname);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), html);
}

async function copyPublicAssets() {
  await mkdir(path.join(dist, "assets", "images"), { recursive: true });
  await mkdir(path.join(dist, "assets", "icons"), { recursive: true });
  await mkdir(path.join(dist, "assets", "scripts"), { recursive: true });
  await copyFile(path.join(root, "src", "styles.css"), path.join(dist, "styles.css"));
  for (const file of ["favicon.svg"]) {
    const src = path.join(root, "public", "assets", "icons", file);
    if (existsSync(src)) await copyFile(src, path.join(dist, "assets", "icons", file));
  }
  for (const file of ["gear-calculator.js"]) {
    const src = path.join(root, "public", "assets", "scripts", file);
    if (existsSync(src)) await copyFile(src, path.join(dist, "assets", "scripts", file));
  }
  for (const article of articles) {
    const file = path.basename(article.image);
    const src = path.join(imageDir, file);
    if (existsSync(src)) await copyFile(src, path.join(dist, "assets", "images", file));
  }
  for (const tool of tools) {
    const file = path.basename(tool.image);
    const src = path.join(imageDir, file);
    if (existsSync(src)) await copyFile(src, path.join(dist, "assets", "images", file));
  }
  const hero = path.join(imageDir, "home-hero-camp-kitchen.webp");
  if (existsSync(hero)) await copyFile(hero, path.join(dist, "assets", "images", "home-hero-camp-kitchen.webp"));
}

function redirects() {
  const lines = [...new Set([
    "/index.html / 301!",
    "/gear-weight-calculator /tools/backpack-weight-calculator 301!",
    "/gear-weight-calculator.html /tools/backpack-weight-calculator 301!",
    ...articles.map((a) => `/${a.slug}.html /${a.slug} 301!`),
    ...navigation.map((n) => `${n.href}.html ${n.href} 301!`),
    ...editorialPages.map((p) => `${p.href}.html ${p.href} 301!`),
    "/tools.html /tools 301!",
    ...tools.map((tool) => `${tool.path}.html ${tool.path} 301!`)
  ])];
  return lines.join("\n") + "\n";
}

function robots() {
  return `User-agent: *
Allow: /
Disallow: /*?q=*
Disallow: /*?s=*

Sitemap: ${site.domain}/sitemap.xml
`;
}

function sitemap() {
  const urls = [...new Set([
    "/",
    ...articles.map((a) => `/${a.slug}`),
    ...navigation.map((n) => n.href),
    ...editorialPages.map((p) => p.href),
    "/tools",
    ...tools.map((tool) => tool.path),
    "/404"
  ])];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .filter((url) => url !== "/404")
  .map((url) => `  <url><loc>${canonical(url)}</loc><lastmod>2026-06-02</lastmod></url>`)
  .join("\n")}
</urlset>
`;
}

function adsTxt() {
  return "google.com, pub-3733223915347669, DIRECT, f08c47fec0942fa0\n";
}

function headers() {
  return `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
`;
}

async function main() {
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  await copyPublicAssets();
  await writePage("/", homePage());
  await writePage("/buying-guides", categoryPage("buying-guides", "Buying Guides"));
  await writePage("/comparisons", categoryPage("comparisons", "Comparisons"));
  await writePage("/how-to", categoryPage("how-to", "How-To"));
  await writePage("/overlanding", categoryPage("overlanding", "Overlanding"));
  await writePage("/tools", hubPage());
  for (const article of articles) await writePage(`/${article.slug}`, articlePage(article));
  for (const tool of tools) await writePage(tool.path, toolPage(tool));
  for (const page of institutionalPages) {
    await writePage(`/${page.slug}`, editorialPage(page.slug, page.title, page.copy, page.description));
  }
  await writePage("/404", pageShell({ title: `Page Not Found | ${site.name}`, description: "The requested page could not be found.", pathname: "/404", noindex: true, body: `<section class="section light"><div class="section-inner"><h1>Page Not Found</h1><p>The trail marker moved. Head back to the <a href="/">home page</a>.</p></div></section>` }));
  await writeFile(path.join(dist, "_redirects"), redirects());
  await writeFile(path.join(dist, "_headers"), headers());
  await writeFile(path.join(dist, "robots.txt"), robots());
  await writeFile(path.join(dist, "sitemap.xml"), sitemap());
  await writeFile(path.join(dist, "ads.txt"), adsTxt());
  const counts = [
    ...articles.map((article) => {
      const html = articlePage(article);
      return { slug: article.slug, words: wordCount(html) };
    }),
    ...tools.map((tool) => {
      const html = toolPage(tool);
      return { slug: tool.path, words: wordCount(html) };
    })
  ];
  const tooShort = counts.filter((item) => item.words < 800);
  if (tooShort.length) {
    console.error("Articles below 800 words:", tooShort);
    process.exitCode = 1;
  } else {
    console.log("Built Trail Gear Journal");
    console.table(counts);
  }
}

main();
