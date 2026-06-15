import { site } from "./site.mjs";

export const institutionalPages = [
  {
    slug: "about",
    title: "About",
    description: "About Trail Gear Journal — an independent US camping and overlanding gear magazine, who publishes it, how it is funded, and the honesty standards behind every guide.",
    copy: `<p>${site.name} is an independent outdoor gear magazine focused on camping, overlanding, and practical camp systems for a US audience. Content is written and maintained by the ${site.name} Editorial Team. We do not publish invented author identities, fake professional credentials, or fabricated field claims.</p>
<h2 id="what-we-cover">What We Cover</h2>
<p>We publish four kinds of pages: buying guides that narrow a category down to the choices worth your attention, head-to-head comparisons that lay out the tradeoffs between two specific products, how-to and overlanding articles for setting up and organizing camp, and free planning calculators for common pre-trip questions such as tent size, water, pack weight, sleeping-bag warmth, and firewood. The audience we write for is the US camper deciding between real options at state parks, national-forest campgrounds, desert sites, humid eastern summers, and shoulder-season mountain weather.</p>
<h2 id="how-we-work">How We Research</h2>
<p>Our goal is to help readers choose gear more calmly: what works, what tradeoffs matter, and where specifications need context. We compare published manufacturer specifications, temperature ratings, weights, capacities, and current retailer pricing, alongside the patterns reported by verified owners. When a number can be tied to a manufacturer page, manual, or reputable retailer listing, we cite it; when it cannot be verified, we describe the difference qualitatively instead of guessing. We do not claim physical field testing we have not performed. The full method is documented in <a href="/how-we-test">How We Test</a>.</p>
<h2 id="how-we-are-funded">How We Are Funded</h2>
<p>${site.name} is supported by display advertising. We do not currently carry affiliate links, though we may add them in the future under the terms described in our <a href="/affiliate-disclosure">Affiliate Disclosure</a>. Advertising relationships never determine our editorial conclusions, and our buying advice is written to stand on its own. See also our <a href="/privacy-policy">Privacy Policy</a>.</p>
<h2 id="contact-about">Corrections and Contact</h2>
<p>We welcome factual corrections, especially manufacturer specification updates, discontinued products, and safety-related clarifications. Reach the Editorial Team at <a href="mailto:${site.email}">${site.email}</a>.</p>`
  },
  {
    slug: "contact",
    title: "Contact",
    description: "Contact the Trail Gear Journal Editorial Team for corrections, editorial questions, specification updates, and partnership inquiries.",
    copy: `<p>${site.name} is published by the ${site.name} Editorial Team. The best way to reach us is by email at <a href="mailto:${site.email}">${site.email}</a>. We read every message, though we cannot guarantee a reply to every inquiry.</p>
<h2 id="what-to-contact-about">What to Contact Us About</h2>
<ul>
<li><strong>Corrections:</strong> manufacturer specification updates, discontinued products, changed model names, and safety-related clarifications. Accuracy corrections are our highest priority.</li>
<li><strong>Editorial questions:</strong> how we reached a recommendation, what sources informed a comparison, or a request to cover a product or category.</li>
<li><strong>Partnership and advertising inquiries:</strong> please identify the company and the nature of the request.</li>
</ul>
<p>When reporting a correction, a link to the manufacturer page or retailer listing showing the correct information helps us verify and update the article quickly. We do not provide individual gear-purchasing consultations or medical, legal, or fire-safety advice; calculator results and guides are general planning information, not professional advice.</p>`
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "Privacy Policy for Trail Gear Journal — how advertising and affiliate cookies, third-party vendors, and email contact are handled, and how to opt out of personalized ads.",
    copy: `<p>${site.name} ("we", "us") is a static website operated for a US audience. This policy explains what limited information is processed when you visit the site and how third-party advertising and affiliate services may use cookies. It was last updated in June 2026.</p>
<h2 id="information-we-collect">Information We Collect Directly</h2>
<p>We do not require accounts, and we do not run forms that collect personal data on this site. If you email us at <a href="mailto:${site.email}">${site.email}</a>, we use your email address and message only to respond to you, and we do not sell that information.</p>
<h2 id="advertising-cookies">Advertising and Third-Party Cookies</h2>
<p>We use Google AdSense to display ads. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visits. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" rel="nofollow noopener" target="_blank">Google Ads Settings</a>. You can also opt out of a third-party vendor's use of cookies for personalized advertising at <a href="https://www.aboutads.info/choices" rel="nofollow noopener" target="_blank">aboutads.info/choices</a>. For more on how Google uses data, see <a href="https://policies.google.com/technologies/ads" rel="nofollow noopener" target="_blank">Google's advertising policies</a>.</p>
<h2 id="affiliate-links">Affiliate Links</h2>
<p>We do not currently carry affiliate links. If they are added in the future, clicking one may let the destination retailer set cookies to attribute a resulting purchase, and we may earn a commission at no extra cost to you. See our <a href="/affiliate-disclosure">Affiliate Disclosure</a> for the full policy.</p>
<h2 id="your-choices">Your Choices</h2>
<p>You can control or delete cookies through your browser settings and use the opt-out links above to limit personalized advertising. Depending on where you live, you may have rights under laws such as the California Consumer Privacy Act (CCPA) or the EU/UK GDPR; to exercise any such right, contact us by email.</p>
<h2 id="childrens-privacy">Children's Privacy</h2>
<p>This site is intended for a general adult audience and is not directed to children under 13. We do not knowingly collect personal information from children.</p>
<h2 id="changes">Changes to This Policy</h2>
<p>We may update this policy to reflect changes in our advertising or affiliate partners. Material changes will be reflected by an updated date at the top of this page.</p>`
  },
  {
    slug: "affiliate-disclosure",
    title: "Affiliate Disclosure",
    description: "Affiliate Disclosure for Trail Gear Journal — our participation in the Amazon Associates Program, how affiliate links are marked, and why they never change our editorial conclusions.",
    copy: `<p>This disclosure is provided in keeping with the US Federal Trade Commission's guidance on endorsements and testimonials (16 CFR Part 255). It was last updated in June 2026.</p>
<h2 id="current-status">Current Status</h2>
<p>${site.name} does not currently carry affiliate links and is not currently enrolled in a paid affiliate program. This page explains how affiliate links would be handled if and when they are added, so the policy is clear in advance.</p>
<h2 id="amazon-associates">Affiliate Programs We May Join</h2>
<p>${site.name} may in the future participate in affiliate programs, including the Amazon Services LLC Associates Program — an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com — and other retailer programs. If we join such a program, any required program statement (for Amazon, "As an Amazon Associate we earn from qualifying purchases") will appear here and on relevant pages.</p>
<h2 id="how-links-work">How Affiliate Links Would Work</h2>
<p>If an affiliate link is added, clicking it and making a qualifying purchase may earn us a small commission <strong>at no additional cost to you</strong> — the price you pay is the same. Affiliate links would be marked with <code>rel="nofollow sponsored"</code> and open in a new tab, in line with search-engine and advertising guidelines, and the page would carry a visible disclosure.</p>
<h2 id="editorial-independence">Editorial Independence</h2>
<p>Affiliate relationships do not and will not determine our editorial conclusions. Products are referenced for reader usefulness, comparison value, and relevance to the topic, and our advice is written to stand on its own even where no affiliate link is present. We do not invent product awards, star ratings, or hands-on claims. Prices and availability shown by retailers change frequently; confirm the current price on the retailer's page before buying.</p>
<p>Questions about this disclosure can be sent to <a href="mailto:${site.email}">${site.email}</a>.</p>`
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
