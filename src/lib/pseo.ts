import pseoData from "@/data/pseo-pages.json";
import { getCityFacts, getCityFactsFromArea, getCityKeyFromSlug } from "@/lib/city-facts";

export type PseoRecord = {
  index: string | null;
  title: string;
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  targetArea: string;
  pageType: string;
  searchIntent: string;
  volume: number | null;
  keywordDifficulty: number | null;
  cpc: number | null;
  priority: string | null;
  cta: string;
  section: string;
};

type PseoPayload = {
  sourcePath: string;
  sheetName: string;
  generatedAt: string;
  header: string[];
  records: PseoRecord[];
};

export type FaqItem = { question: string; answer: string };
export type InternalLink = { href: string; label: string };
export type BreadcrumbItem = { name: string; href: string };
export type ContentSection = { heading: string; level: 2 | 3; paragraphs: string[] };

const payload = pseoData as PseoPayload;

export const pages = payload.records;
export const siteName = "Get Pest Pros";
export const siteTagline =
  "Licensed pest control and wildlife removal across Canada. Same-day service, free estimates, and treatments safe for your family and pets.";
export const phoneDisplay = "1-888-459-2148";
export const phoneTel = "18884592148";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://getpestpros.com";

const PILLAR_PREFIX_MAP: Record<string, string> = {
  "pest-control": "/pest-control-services",
  "commercial-pest-control": "/commercial-pest-control",
  "bed-bug-treatment": "/bed-bug-treatment",
  "cockroach-control": "/cockroach-exterminator",
  "mice-control": "/mice-control",
  "rat-control": "/rat-control",
  "rodent-control": "/rodent-control",
  "ant-control": "/ant-control",
  "wasp-nest-removal": "/wasp-nest-removal",
  "mosquito-control": "/mosquito-control",
  "wildlife-removal": "/wildlife-removal",
  "raccoon-removal": "/raccoon-removal",
  "squirrel-removal": "/squirrel-removal",
  "skunk-removal": "/skunk-removal",
};

const SERVICE_LABELS: Record<string, string> = {
  "pest-control": "Pest Control",
  "commercial-pest-control": "Commercial Pest Control",
  "bed-bug-treatment": "Bed Bug Treatment",
  "cockroach-control": "Cockroach Extermination",
  "mice-control": "Mice Control",
  "rat-control": "Rat Control",
  "rodent-control": "Rodent Control",
  "ant-control": "Ant Control",
  "wasp-nest-removal": "Wasp Nest Removal",
  "mosquito-control": "Mosquito Control",
  "wildlife-removal": "Wildlife Removal",
  "raccoon-removal": "Raccoon Removal",
  "squirrel-removal": "Squirrel Removal",
  "skunk-removal": "Skunk Removal",
};

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

function pick<T>(slug: string, items: T[]): T {
  return items[hashSlug(slug) % items.length];
}

export function normalizeSlug(input: string) {
  return input.startsWith("/") ? input : `/${input}`;
}

export function getPageBySlug(input: string) {
  return pages.find((page) => page.slug === normalizeSlug(input));
}

export function getPageTypes() {
  return [...new Set(pages.map((p) => p.pageType).filter(Boolean))].sort();
}

export function getSections() {
  return [...new Set(pages.map((p) => p.section).filter(Boolean))].sort();
}

export function getPriorityPages() {
  return pages.filter((p) => /top priority|high/i.test(p.priority ?? "")).slice(0, 12);
}

export function getFeaturedPages() {
  return pages.slice(0, 12);
}

export function getPagesByType(type: string) {
  return pages.filter((p) => p.pageType === type);
}

export function getCities() {
  return [...new Set(pages.map((p) => p.targetArea).filter((a) => a && a !== "Canada (National)"))].sort();
}

export function getStats() {
  return {
    pageCount: pages.length,
    typeCount: getPageTypes().length,
    cityCount: getCities().length,
    highPriorityCount: getPriorityPages().length,
  };
}

export function isCityPage(page: PseoRecord) {
  return page.pageType === "City Service Page";
}

export function isPillarPage(page: PseoRecord) {
  return page.pageType === "Service Pillar";
}

export function getLocationLabel(page: PseoRecord): string {
  if (page.targetArea === "Canada (National)") return "Canada";
  return page.targetArea.replace(/,.*/, "").trim();
}

export function getServiceLabel(page: PseoRecord): string {
  const prefix = getServicePrefix(page.slug);
  if (prefix && SERVICE_LABELS[prefix]) return SERVICE_LABELS[prefix];
  const kw = page.primaryKeyword;
  return kw.charAt(0).toUpperCase() + kw.slice(1);
}

export function getLinkAnchor(page: PseoRecord): string {
  if (isCityPage(page)) return getLocationLabel(page);
  return getFriendlyNavLabel(page);
}

/** Unique footer/nav label per slug — no SEO keyword phrases */
const FOOTER_LABELS: Record<string, string> = {
  "/best-pest-control": "Top-rated help",
  "/commercial-pest-control-services": "Offices & warehouses",
  "/commercial-pest-control-companies": "Compare providers",
  "/bed-bug-heat-treatment": "Heat treatment",
  "/commercial-bed-bug-treatment": "Business bed bugs",
  "/cockroach-exterminator": "Cockroaches",
  "/mice-control": "Mice",
  "/rat-control": "Rats",
  "/spider-control": "Spiders",
  "/mosquito-control": "Mosquitoes",
  "/silverfish-control": "Silverfish",
  "/termite-control": "Termites",
  "/raccoon-removal": "Raccoons",
  "/squirrel-removal": "Squirrels",
  "/skunk-removal": "Skunks",
  "/bat-removal": "Bats",
  "/bird-control": "Birds",
  "/pest-control-near-me": "Search your area",
  "/exterminator-near-me": "Crew near you",
  "/pest-control-services-near-me": "Browse nearby",
  "/rodent-control-near-me": "Rodents nearby",
  "/bed-bug-exterminator-near-me": "Bed bugs nearby",
  "/raccoon-removal-near-me": "Wildlife nearby",
  "/commercial-pest-control-cost": "Business rates",
  "/best-commercial-pest-control-company": "How to choose",
  "/bed-bug-treatment-cost": "Treatment rates",
  "/wasp-nest-removal-cost": "Outdoor nest rates",
  "/emergency-pest-control": "24/7 emergency",
  "/same-day-exterminator": "Same-day dispatch",
};

export function getFooterLabel(page: PseoRecord): string {
  if (FOOTER_LABELS[page.slug]) return FOOTER_LABELS[page.slug];
  if (isCityPage(page)) return getLocationLabel(page);
  return getFriendlyNavLabel(page);
}

/** Short customer-facing label — never the full SEO keyword phrase */
export function getFriendlyNavLabel(page: PseoRecord): string {
  const prefix = getServicePrefix(page.slug);
  const short: Record<string, string> = {
    "pest-control": "Home protection",
    "commercial-pest-control": "Business programs",
    "bed-bug-treatment": "Bed bugs",
    "cockroach-control": "Cockroaches",
    "mice-control": "Mice",
    "rat-control": "Rats",
    "rodent-control": "Rodents",
    "ant-control": "Ants",
    "wasp-nest-removal": "Wasps",
    "mosquito-control": "Mosquitoes",
    "wildlife-removal": "Wildlife",
    "raccoon-removal": "Raccoons",
    "squirrel-removal": "Squirrels",
    "skunk-removal": "Skunks",
  };
  if (prefix && short[prefix]) return short[prefix];
  if (page.pageType === "Emergency Landing") return "24/7 emergency";
  if (page.pageType === "Near Me Page") return FOOTER_LABELS[page.slug] ?? "Local lookup";
  if (page.pageType === "Cost Guide") return FOOTER_LABELS[page.slug] ?? "Rate guide";
  if (FOOTER_LABELS[page.slug]) return FOOTER_LABELS[page.slug];
  const bare = page.slug.replace(/^\//, "").replace(/-/g, " ");
  return bare.charAt(0).toUpperCase() + bare.slice(1);
}

export function getServicePrefix(slug: string): string | null {
  const cityKey = getCityKeyFromSlug(slug);
  if (!cityKey) return null;
  const bare = slug.replace(/^\//, "");
  return bare.replace(new RegExp(`-${cityKey}$`), "");
}

export function getPillarForPage(page: PseoRecord): PseoRecord | undefined {
  const prefix = getServicePrefix(page.slug);
  if (!prefix) return undefined;
  const pillarSlug = PILLAR_PREFIX_MAP[prefix];
  return pillarSlug ? getPageBySlug(pillarSlug) : undefined;
}

export function getCityPagesForPillar(page: PseoRecord): PseoRecord[] {
  const bare = page.slug.replace(/^\//, "");
  const prefixes = Object.entries(PILLAR_PREFIX_MAP)
    .filter(([, pillar]) => pillar === page.slug)
    .map(([prefix]) => prefix);
  if (!prefixes.length) {
    const fallback = bare.replace(/-services$/, "").replace(/-companies$/, "");
    prefixes.push(fallback);
  }
  return pages.filter((p) => {
    if (p.pageType !== "City Service Page") return false;
    const pfx = getServicePrefix(p.slug);
    return pfx != null && prefixes.includes(pfx);
  });
}

export function getPagesInCity(targetArea: string): PseoRecord[] {
  return pages.filter((p) => p.targetArea === targetArea && p.slug !== "/");
}

export function getAllPillarPages(): PseoRecord[] {
  return pages.filter((p) => p.pageType === "Service Pillar");
}

export function getAllNearMePages(): PseoRecord[] {
  return pages.filter((p) => p.pageType === "Near Me Page");
}

export function getAllCostGuides(): PseoRecord[] {
  return pages.filter((p) => p.pageType === "Cost Guide");
}

export function getInternalLinks(page: PseoRecord): InternalLink[] {
  const links: InternalLink[] = [];
  const seen = new Set<string>([page.slug]);

  const add = (p: PseoRecord | undefined, label?: string) => {
    if (!p || seen.has(p.slug)) return;
    seen.add(p.slug);
    links.push({ href: p.slug, label: label ?? getLinkAnchor(p) });
  };

  if (isCityPage(page)) {
    const pillar = getPillarForPage(page);
    if (pillar) add(pillar, getLinkAnchor(pillar));
    getPagesInCity(page.targetArea)
      .filter((p) => p.slug !== page.slug)
      .forEach((p) => add(p, getFriendlyNavLabel(p)));
    add(getPageBySlug("/emergency-pest-control"), "24/7 emergency");
  } else if (isPillarPage(page)) {
    getCityPagesForPillar(page).forEach((p) => add(p));
    const siblings = getAllPillarPages().filter((p) => p.slug !== page.slug);
    const offset = hashSlug(page.slug) % Math.max(1, siblings.length - 4);
    siblings.slice(offset, offset + 4).forEach((p) => add(p));
  } else if (page.pageType === "Emergency Landing") {
    add(getPageBySlug("/same-day-exterminator"), "Same-day dispatch");
    add(getPageBySlug("/pest-control-services"), "Home protection");
    getCities()
      .slice(hashSlug(page.slug) % 5, hashSlug(page.slug) % 5 + 5)
      .forEach((city) => {
        const cityPage = pages.find((p) => p.targetArea === city && getServicePrefix(p.slug) === "pest-control");
        add(cityPage);
      });
  } else if (page.pageType === "Cost Guide") {
    const kw = page.primaryKeyword.toLowerCase();
    const pillar = pages.find(
      (p) =>
        p.pageType === "Service Pillar" &&
        (kw.includes(p.primaryKeyword.split(" ")[0]) || p.primaryKeyword.split(" ")[0].includes(kw.split(" ")[0])),
    );
    add(pillar ?? getPageBySlug("/pest-control-services"));
    getCities()
      .slice(hashSlug(page.slug) % 8, hashSlug(page.slug) % 8 + 4)
      .forEach((city) => {
        const cityPage = pages.find((p) => p.targetArea === city && p.slug.includes("pest-control"));
        add(cityPage);
      });
  } else if (page.pageType === "Near Me Page") {
    add(getPageBySlug("/pest-control-services"), "Home protection");
    add(getPageBySlug("/emergency-pest-control"), "24/7 emergency");
    getCities()
      .slice(0, 5)
      .forEach((city) => {
        const cityPage = pages.find((p) => p.targetArea === city && getServicePrefix(p.slug) === "pest-control");
        add(cityPage);
      });
  } else {
    getPriorityPages()
      .filter((p) => p.slug !== page.slug)
      .slice(0, 6)
      .forEach((p) => add(p));
  }

  if (links.length < 3) {
    pages
      .filter((p) => p.pageType === "Service Pillar" && !seen.has(p.slug))
      .slice(0, 3 - links.length)
      .forEach((p) => add(p));
  }

  return links;
}

export function buildH1(page: PseoRecord): string {
  const loc = getLocationLabel(page);
  const cityFacts = getCityFacts(page.slug) ?? getCityFactsFromArea(page.targetArea);

  if (isCityPage(page) && cityFacts) {
    return pick(page.slug, [
      `Licensed Local Exterminators in ${cityFacts.name}`,
      `Trusted Pest Help for ${cityFacts.name} Homeowners`,
      `Serving ${cityFacts.name}, ${cityFacts.province}`,
    ]);
  }

  if (page.pageType === "Emergency Landing") {
    return pick(page.slug, [
      "24/7 Emergency Help Across Canada",
      "Need Someone Now? We Are on Call",
    ]);
  }

  if (page.pageType === "Cost Guide") {
    return pick(page.slug, [
      "Honest Pricing for Canadian Homeowners",
      "What Should You Expect to Pay?",
    ]);
  }

  if (page.pageType === "Near Me Page") {
    return pick(page.slug, [
      "Find a Local Exterminator Near You",
      "Licensed Help Close to Home",
    ]);
  }

  return pick(page.slug, [
    `Professional Exterminators Across ${loc}`,
    `Licensed Pest Help in ${loc}`,
  ]);
}

export function buildTitleTag(page: PseoRecord): string {
  const loc = getLocationLabel(page);
  const withLoc =
    page.targetArea === "Canada (National)"
      ? "Licensed Exterminators Canada"
      : `Exterminators ${loc}`;
  const candidates = [`${withLoc} | ${siteName}`, `${withLoc} — Call Now | ${siteName}`];
  let title = candidates.find((t) => t.length >= 50 && t.length <= 60) ?? candidates[0];
  if (title.length > 60) title = title.slice(0, 57) + "...";
  if (title.length < 50 && candidates[1].length <= 60) title = candidates[1];
  return title;
}

export function buildDescription(page: PseoRecord): string {
  const loc = page.targetArea === "Canada (National)" ? "across Canada" : `in ${getLocationLabel(page)}`;

  const variants = [
    `Licensed exterminators ${loc} — same-day availability, pet-safe treatments, and free estimates. Call ${phoneDisplay} today.`,
    `Need help ${loc}? Fast response, upfront pricing, and guaranteed results. Speak with a local pro — ${phoneDisplay}.`,
    `Protect your home ${loc}. Licensed technicians, no hidden fees, satisfaction guaranteed. Call ${phoneDisplay}.`,
  ];

  let desc = pick(page.slug, variants);
  if (desc.length > 160) desc = desc.slice(0, 157) + "...";
  if (desc.length < 150) desc = desc.replace(/\.$/, "") + ". Free quote available.";
  return desc.slice(0, 160);
}

export function buildIntro(page: PseoRecord): string {
  const loc = getLocationLabel(page);
  const cityFacts = getCityFacts(page.slug) ?? getCityFactsFromArea(page.targetArea);

  if (isCityPage(page) && cityFacts) {
    const intros = [
      `When unwanted guests show up in ${cityFacts.name}, you want a team that actually knows the area — not a distant call centre. We serve homeowners and businesses from ${cityFacts.neighbourhoods.slice(0, 2).join(" to ")}, with technicians who understand how ${cityFacts.climate}. With ${cityFacts.population} and landmarks like ${cityFacts.landmark} nearby, ${cityFacts.pestNote}. We respond fast, walk you through every step before we treat, and stand behind our work with a satisfaction guarantee. Whether it is a wasp nest by the back door or rodents in the walls, one call to ${phoneDisplay} puts a licensed local exterminator on your doorstep — often the same day.`,
      `Life in ${cityFacts.name} comes with its own pest challenges. From ${cityFacts.neighbourhoods[0]} to ${cityFacts.neighbourhoods[2]}, residents trust us because we pair neighbourhood knowledge with professional-grade treatments. The local climate — ${cityFacts.climate} — means pest pressure shifts season to season, and with ${cityFacts.population}, no two homes face the same risk. Our crew knows that ${cityFacts.pestNote}. You get a free estimate, honest pricing, and treatments safe for kids and pets. Tell us what you are seeing at ${phoneDisplay} and we will build a plan around your home, your schedule, and your budget.`,
      `${cityFacts.name} homeowners deserve better than cookie-cutter solutions. Our local crew covers ${cityFacts.neighbourhoods.join(", ")}, understanding the housing styles, green spaces, and seasonal patterns that draw pests in. Near ${cityFacts.landmark}, ${cityFacts.pestNote}. With ${cityFacts.population} in the area, we have seen it all — from attic wildlife to kitchen invaders. Every visit starts with a thorough inspection, a clear explanation of what we found, and a written quote before any work begins. Reach us at ${phoneDisplay} for same-day availability in most ${cityFacts.name} neighbourhoods.`,
    ];
    return pick(page.slug, intros);
  }

  if (page.pageType === "Emergency Landing") {
    return pick(page.slug, [
      `Pests do not keep office hours — and neither do we. Our emergency team is on call around the clock, with technicians ready for urgent infestations, stinging insects near entryways, and wildlife that has made its way indoors. When you dial ${phoneDisplay}, you reach a real person who dispatches the nearest licensed exterminator to your door, often within hours. We handle last-minute bed bug discoveries before guests arrive, wasp nests by the front step, and the scratching sound in your walls at midnight. No phone tree, no "we will call you back Monday." Just fast, professional help when it matters most.`,
      `Some problems cannot wait until morning. Our 24/7 dispatch line connects you with licensed technicians across Canada who carry the equipment to handle most emergencies on the first visit. Whether a raccoon is in the attic, a hornet nest is blocking your doorway, or you have discovered an active infestation the night before travel, we are ready. Call ${phoneDisplay} any time — nights, weekends, and holidays included — and we will prioritize your safety and peace of mind.`,
    ]);
  }

  if (page.pageType === "Cost Guide") {
    return pick(page.slug, [
      `Before you commit, you deserve straight answers on pricing — not a vague range that balloons on the invoice. This guide explains what Canadian homeowners and businesses typically pay, what drives costs up or down, and how to tell a fair quote from an inflated one. Severity, property size, treatment method, and whether you need a single visit or ongoing prevention all affect the final number. We provide written estimates with every line item explained before work starts. Use this page to set realistic expectations, then call ${phoneDisplay} for a quote built around your specific situation.`,
    ]);
  }

  if (page.pageType === "Near Me Page") {
    return pick(page.slug, [
      `Looking for a trusted exterminator close to home? We connect you with licensed technicians in your area — not a national hotline that routes you through three transfers. Our local crews know the building types, seasonal pest patterns, and regulations in your community. Same-day and next-day appointments are available in most regions, and every visit includes a free estimate with transparent pricing. Tell us your postal code when you call ${phoneDisplay} and we will confirm the nearest available technician and estimated arrival time.`,
    ]);
  }

  return pick(page.slug, [
    `Tired of DIY traps that never quite solve the problem? Our licensed team helps homeowners and property managers across ${loc} get lasting relief — treating ants, rodents, bed bugs, wasps, wildlife, and more with methods that are effective and safe for families and pets. Every visit starts with a thorough inspection so we address the source, not just the symptoms. You receive a clear plan, upfront pricing, and a guarantee: if the problem returns within our warranty window, so do we. Schedule your free estimate at ${phoneDisplay}.`,
    `Infestations spread quickly and rarely fix themselves. We built our program for people who want results without the runaround — licensed exterminators, pet-safe products, and same-day availability across ${loc}. Each job begins with identifying the species, entry points, and nesting sites, then applying targeted treatments that hit the root cause. No pressure, no vague timelines. Call ${phoneDisplay} to book a free inspection and find out how soon we can be there.`,
    `Your home should feel safe, not like you are sharing it with uninvited guests. Across ${loc}, our technicians combine professional-grade treatments with plain-language advice so you know exactly what is happening at every step. We inspect attics, basements, kitchens, and exterior perimeters, seal entry points where practical, and follow up to confirm the issue is resolved. Transparent pricing, satisfaction guaranteed. Reach us at ${phoneDisplay} to get started.`,
  ]);
}

export function buildFaqs(page: PseoRecord): FaqItem[] {
  const loc = getLocationLabel(page);
  const cityFacts = getCityFacts(page.slug) ?? getCityFactsFromArea(page.targetArea);

  const base: FaqItem[] = [
    {
      question: pick(page.slug, ["How much does a treatment typically cost?", "What should I expect to pay?"]),
      answer: pick(page.slug, [
        `Most residential jobs in ${loc} run between $150 and $500, depending on severity and property size. We provide a written estimate before any work begins — no surprises when the invoice arrives.`,
        `A single visit for a minor issue often starts around $175. Larger properties or commercial sites are quoted individually after an on-site inspection. Call ${phoneDisplay} for a number specific to your home.`,
      ]),
    },
    {
      question: "Are your treatments safe for children and pets?",
      answer: pick(page.slug, [
        "Yes. We use Health Canada-approved products applied only where pests travel — not where your family spends time. We give you clear re-entry times and offer low-toxicity alternatives on request.",
        "Absolutely. Our technicians select the lowest-toxicity option that will solve the problem. You receive specific guidance on when it is safe for kids and pets to return to treated areas.",
      ]),
    },
    {
      question: "How quickly can someone come out?",
      answer: pick(page.slug, [
        `Same-day and next-day appointments are available across most of ${loc}. Emergency calls to ${phoneDisplay} go straight to dispatch — often a technician is on the way within a few hours.`,
        `Most customers in ${loc} are scheduled within 24 hours. For urgent situations — stinging insects, wildlife indoors, or active infestations — call ${phoneDisplay} and we will prioritize your visit.`,
      ]),
    },
  ];

  if (isCityPage(page) && cityFacts) {
    base.push({
      question: `Do you cover all areas of ${cityFacts.name}?`,
      answer: `Yes — including ${cityFacts.neighbourhoods.join(", ")} and surrounding communities. Our ${cityFacts.name} technicians understand local building types near ${cityFacts.landmark} and adjust their approach accordingly.`,
    });
  }

  if (page.pageType === "Cost Guide") {
    base.push({
      question: "What factors affect the final price?",
      answer:
        "Infestation severity, square footage, treatment method (heat, chemical, exclusion), and whether follow-up visits are needed all play a role. Commercial properties and multi-unit buildings are quoted after an on-site assessment. We always provide a line-item breakdown before you approve.",
    });
  }

  if (page.pageType === "Emergency Landing") {
    base.push({
      question: "What counts as a pest emergency?",
      answer:
        "Stinging insects near doorways, wildlife loose inside your home, bed bugs discovered before guests arrive, or rodents chewing wiring in walls all qualify. If you are unsure, call — we will help you decide whether immediate dispatch is needed.",
    });
  }

  return base.slice(0, Math.max(3, base.length));
}

export function buildContentSections(page: PseoRecord): ContentSection[] {
  const loc = getLocationLabel(page);
  const cityFacts = getCityFacts(page.slug) ?? getCityFactsFromArea(page.targetArea);
  const sections: ContentSection[] = [];

  sections.push({
    heading: "What to Expect When You Call",
    level: 2,
    paragraphs: [
      `When you reach us at ${phoneDisplay}, a dispatcher asks what you are seeing — the type of pest, where you noticed activity, and how long it has been going on. We book a licensed technician at a time that works for you, often the same day. They arrive in a marked vehicle, inspect your property, and explain the plan before starting any work.`,
      `You receive a written estimate with transparent pricing. After treatment, we share prevention tips tailored to your property and follow up to confirm the issue is resolved. If anything returns within our guarantee window, we come back at no extra charge.`,
    ],
  });

  sections.push({
    heading: "Our Treatment Process",
    level: 2,
    paragraphs: [
      `Every job starts with identifying the species and how they are getting in. We check attics, basements, crawl spaces, kitchens, and exterior perimeters — wherever pests hide and travel. Then we apply the right approach: baits, barriers, traps, heat treatment, or exclusion work depending on what we find.`,
      `We do not spray and disappear. Each visit includes sealing entry points where practical, removing nests or harbourage, and setting up monitoring to confirm the problem is truly gone. Our products are chosen for maximum impact on pests and minimum impact on your household.`,
    ],
  });

  if (isCityPage(page) && cityFacts) {
    sections.push({
      heading: `Serving ${cityFacts.name} and Surrounding Neighbourhoods`,
      level: 2,
      paragraphs: [
        `${cityFacts.name} has pest challenges you will not find in a generic manual. The local climate — ${cityFacts.climate} — and neighbourhoods like ${cityFacts.neighbourhoods.join(" and ")} each have different housing stock and landscaping that attract different invaders. Near ${cityFacts.landmark}, ${cityFacts.pestNote}.`,
        `Our technicians live and work in the ${cityFacts.name} area. They know which species spike each season, which building materials pests exploit, and which prevention steps actually work here. That local knowledge means faster diagnoses, fewer repeat visits, and results that last.`,
      ],
    });
  }

  if (isPillarPage(page)) {
    sections.push({
      heading: "Where We Operate",
      level: 2,
      paragraphs: [
        `We serve major cities and surrounding communities nationwide — Toronto, Vancouver, Calgary, Edmonton, Ottawa, Montreal, and dozens of mid-size markets. Each region has a local crew that knows the area, backed by consistent training and quality standards.`,
        `Not sure if we cover your community? Call ${phoneDisplay} and we will confirm availability and estimated arrival time. Same-day and next-day appointments are available in most regions.`,
      ],
    });
    sections.push({
      heading: "Residential and Commercial Programs",
      level: 2,
      paragraphs: [
        `Homeowners receive thorough single-visit or seasonal plans tailored to their property. Businesses — restaurants, warehouses, property managers, and offices — get scheduled service with documentation for health inspections and tenant compliance.`,
        `Whether you need a one-time nest removal or a year-round prevention program, we scale to your needs and budget. Commercial accounts include emergency callback priority and a dedicated point of contact.`,
      ],
    });
    sections.push({
      heading: "Why Professional Treatment Beats DIY",
      level: 2,
      paragraphs: [
        `Store-bought sprays and traps often push pests deeper into walls without eliminating the colony. Professionals identify species correctly, target nesting sites, and use products not available to the public — applied with training that keeps your family safe.`,
        `The cost of a professional visit is almost always less than replacing contaminated food, repairing chewed wiring, or treating a problem that has spread to multiple rooms. We focus on solving it right the first time.`,
      ],
    });
    sections.push({
      heading: "Seasonal Pest Patterns in Canada",
      level: 2,
      paragraphs: [
        `Spring brings ant swarms and awakening rodents. Summer peaks for wasps, mosquitoes, and wildlife young leaving dens. Fall drives mice and rats indoors as temperatures drop. Winter does not mean pests disappear — heated buildings sustain cockroaches, bed bugs, and attic wildlife year-round.`,
        `We recommend quarterly inspections for properties with a history of problems. Catching an issue early costs far less than treating a full-blown infestation.`,
      ],
    });
  }

  if (page.pageType === "Emergency Landing") {
    sections.push({
      heading: "When to Call Right Away",
      level: 2,
      paragraphs: [
        `Some situations cannot wait. Stinging insects nesting by your front door, a bat or raccoon loose in the living area, bed bugs found the night before guests arrive, or rodents chewing wiring inside walls all need immediate attention.`,
        `Our emergency line at ${phoneDisplay} connects you directly with dispatch. We prioritize safety threats and active infestations, and our trucks carry the equipment to resolve most emergencies on the first visit.`,
      ],
    });
    sections.push({
      heading: "What Happens After You Call",
      level: 2,
      paragraphs: [
        `A dispatcher confirms your location, asks a few quick questions about the situation, and routes the nearest available technician. You receive an estimated arrival window and the technician's contact information.`,
        `On arrival, we assess the immediate risk, contain the problem, and explain any follow-up steps. You get a written quote before additional work beyond the emergency response begins.`,
      ],
    });
  }

  if (page.pageType === "Cost Guide") {
    sections.push({
      heading: "Understanding Your Quote",
      level: 2,
      paragraphs: [
        `A fair quote breaks down labour, products, follow-up visits, and any exclusion or repair work. Be wary of flat rates with no inspection — every property is different, and pricing should reflect what we actually find on site.`,
        `We never start work without your approval. If the scope changes after inspection, we explain why and update the estimate before proceeding.`,
      ],
    });
  }

  sections.push({
    heading: "Keeping Pests Away After Treatment",
    level: 2,
    paragraphs: [
      `A few habits make a big difference: seal cracks around pipes and foundations, store food in airtight containers, keep bins tightly closed, and trim vegetation away from exterior walls.`,
      `We leave you with a customized prevention checklist after every visit. Ask about seasonal maintenance plans — quarterly inspections that catch problems before they spread.`,
    ],
  });

  return sections;
}

export function buildTrustPoints(_page: PseoRecord) {
  return [
    { icon: "shield" as const, label: "Licensed & Insured", detail: "Fully certified technicians" },
    { icon: "clock" as const, label: "Same-Day Service", detail: "Fast response across Canada" },
    { icon: "check" as const, label: "Satisfaction Guaranteed", detail: "We return if pests come back" },
    { icon: "leaf" as const, label: "Pet-Safe Options", detail: "Family-friendly treatments" },
  ];
}

export function buildBreadcrumbs(page: PseoRecord): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [{ name: "Home", href: "/" }];
  const pillar = getPillarForPage(page);
  const loc = getLocationLabel(page);

  if (isCityPage(page) && pillar) {
    crumbs.push({ name: "Services", href: pillar.slug });
    crumbs.push({ name: loc, href: page.slug });
  } else if (page.pageType === "Emergency Landing") {
    crumbs.push({ name: "Emergency", href: page.slug });
  } else if (page.pageType === "Cost Guide") {
    crumbs.push({ name: "Pricing", href: "/commercial-pest-control-cost" });
    crumbs.push({ name: getFriendlyNavLabel(page), href: page.slug });
  } else if (page.pageType === "Near Me Page") {
    crumbs.push({ name: "Local help", href: page.slug });
  } else {
    crumbs.push({ name: getFriendlyNavLabel(page), href: page.slug });
  }

  return crumbs;
}

export function buildSchemas(page: PseoRecord) {
  const url = new URL(page.slug, siteUrl).toString();
  const breadcrumbs = buildBreadcrumbs(page);
  const faqs = buildFaqs(page);
  const loc = getLocationLabel(page);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: new URL(crumb.href, siteUrl).toString(),
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const schemas: Record<string, unknown>[] = [breadcrumbSchema, faqSchema];

  if (isCityPage(page)) {
    const cityFacts = getCityFacts(page.slug) ?? getCityFactsFromArea(page.targetArea);
    schemas.push({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: siteName,
      description: buildDescription(page),
      url: siteUrl,
      telephone: `+1-${phoneDisplay}`,
      areaServed: { "@type": "City", name: cityFacts?.name ?? page.targetArea },
      priceRange: "$$",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    });
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${siteName} — ${loc}`,
      description: buildIntro(page).slice(0, 200),
      provider: { "@type": "LocalBusiness", name: siteName, telephone: `+1-${phoneDisplay}` },
      areaServed: cityFacts?.name ?? page.targetArea,
      url,
    });
  }

  return schemas;
}

export function getHomepageServices() {
  return [
    { slug: "/pest-control-services", label: "Home protection", icon: "pest" as const },
    { slug: "/bed-bug-treatment", label: "Bed bugs", icon: "bedbug" as const },
    { slug: "/rodent-control", label: "Rodents", icon: "rodent" as const },
    { slug: "/wasp-nest-removal", label: "Wasps", icon: "wasp" as const },
    { slug: "/wildlife-removal", label: "Wildlife", icon: "wildlife" as const },
    { slug: "/commercial-pest-control", label: "Business programs", icon: "commercial" as const },
    { slug: "/emergency-pest-control", label: "24/7 emergency", icon: "emergency" as const },
    { slug: "/ant-control", label: "Ants", icon: "insect" as const },
  ];
}
