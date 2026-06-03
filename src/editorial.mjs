import { site } from "./site.mjs";

export const institutionalPages = [
  {
    slug: "about",
    title: "About",
    copy: `<p>${site.name} is an independent outdoor gear magazine focused on camping, overlanding, and practical camp systems for a US audience. Content is written and maintained by the Editorial Team. We do not publish invented author identities, fake professional credentials, or fabricated field claims.</p><p>Our goal is to help readers choose gear more calmly: what works, what tradeoffs matter, and where specifications need context. We favor clear buying criteria, current manufacturer data where available, and qualitative guidance when exact data cannot be verified.</p>`
  },
  {
    slug: "contact",
    title: "Contact",
    copy: `<p>For corrections, editorial questions, and partnership inquiries, contact the Editorial Team at <a href="mailto:${site.email}">${site.email}</a>.</p><p>We welcome factual corrections, especially manufacturer specification updates, discontinued products, and safety-related clarifications.</p>`
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    copy: `<p>${site.name} is a static website. We may use third-party advertising and affiliate services, including Google AdSense and Amazon Associates links when approved. These services may use cookies, device identifiers, and similar technologies according to their own policies.</p><p>We do not sell personal information directly. If you contact us by email, we use your email address only to respond to your message unless a longer relationship is established by mutual agreement.</p>`
  },
  {
    slug: "affiliate-disclosure",
    title: "Affiliate Disclosure",
    copy: `<p>${site.name} may participate in affiliate programs, including the Amazon Services LLC Associates Program. Where affiliate links appear, we may earn from qualifying purchases at no extra cost to you.</p><p>Affiliate relationships do not determine editorial conclusions. Product references are selected for reader usefulness, comparison value, and relevance to the article topic.</p>`
  },
  {
    slug: "how-we-test",
    title: "How We Test",
    description: "How the Trail Gear Journal Editorial Team evaluates camping and overlanding gear, sources specs, and decides what to recommend.",
    copy: `<h2 id="how-we-evaluate">How the Editorial Team Evaluates Gear</h2><p>The Editorial Team approaches every guide as a real packing and campsite decision, not a single-spec contest. We look at the job the gear must do, the failure points that create trip frustration, and the tradeoffs a US camper is likely to face across state parks, national forest campgrounds, desert sites, humid eastern summers, and shoulder-season mountain weather. Exact specs are used only when they can be tied to manufacturer pages, manuals, or reputable retailer listings. When we cannot verify a number, we describe the difference qualitatively instead of guessing.</p><p>Each guide is built to help you narrow the field before checking current prices, availability, return policies, and compatibility with your existing kit. The buying advice should stand on its own even when no affiliate link is present. That keeps the article useful for readers and keeps editorial judgment separate from monetization.</p><h2 id="before-you-buy">Before You Buy</h2><p>Confirm current model names, sizing, safety instructions, and included accessories before purchasing. Outdoor gear changes quietly: a brand can update fabric, ignition hardware, valve compatibility, pole geometry, insulation fill, or bundled parts without changing the broad product story. For camping gear, also check whether the item fits your vehicle, storage bin, cookware, sleeping pad, fuel plan, or campsite rules. A product that looks best online can become the wrong buy if it is too bulky to pack, too slow to set up, difficult to clean, or poorly matched to the weather you actually camp in.</p><h2 id="corrections">Corrections and Updates</h2><p>We welcome factual corrections, especially manufacturer specification updates, discontinued products, and safety-related clarifications. Material updates are reviewed by the Editorial Team, carry a current date, preserve a neutral tone, and avoid promotional claims that cannot be supported.</p>`
  },
  {
    slug: "editorial-policy",
    title: "Editorial Policy",
    copy: `<p>All articles are published by the ${site.name} Editorial Team. We do not invent named experts, credentials, lab tests, star ratings, or hands-on experiences. When exact product data is cited, it should come from manufacturer pages, manuals, or reputable retailer specifications. When exact data cannot be verified, we use qualitative language instead of guessing.</p><p>Corrections are reviewed by the Editorial Team. Material updates should include a current date, preserve neutral tone, and avoid promotional claims that cannot be supported.</p>`
  }
];
