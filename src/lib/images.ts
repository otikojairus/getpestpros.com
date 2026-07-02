export type ImageSet = {
  hero: string;
  alt: string;
};

export const IMAGES = {
  homeHero: {
    src: "/images/hero-home.webp",
    alt: "Professional pest control technician inspecting a Canadian home",
  },
  pest: {
    hero: "/images/pest.webp",
    alt: "Licensed exterminator treating a residential property",
  },
  bedbug: {
    hero: "/images/bedbug.webp",
    alt: "Bedroom inspection for bed bug treatment",
  },
  rodent: {
    hero: "/images/rodent.webp",
    alt: "Rodent control and prevention in a home",
  },
  wasp: {
    hero: "/images/wasp.webp",
    alt: "Wasp nest removal from exterior of a building",
  },
  insect: {
    hero: "/images/insect.webp",
    alt: "Insect control treatment around a home",
  },
  wildlife: {
    hero: "/images/wildlife.webp",
    alt: "Humane wildlife removal from a residential property",
  },
  commercial: {
    hero: "/images/commercial.webp",
    alt: "Commercial pest management for business properties",
  },
  emergency: {
    hero: "/images/emergency.webp",
    alt: "Emergency pest control response team",
  },
  cockroach: {
    hero: "/images/cockroach.webp",
    alt: "Cockroach extermination in a kitchen area",
  },
  termite: {
    hero: "/images/termite.webp",
    alt: "Termite inspection of a wooden structure",
  },
  mosquito: {
    hero: "/images/mosquito.webp",
    alt: "Outdoor mosquito control treatment",
  },
} as const;

const SERVICE_ACCENTS: Record<string, string> = {
  pest: "#ff5c1a",
  bedbug: "#e63946",
  rodent: "#7c4dff",
  wasp: "#f4a100",
  wildlife: "#2a9d8f",
  commercial: "#1d4ed8",
  emergency: "#dc2626",
  insect: "#059669",
};

export function getPageImages(page: { primaryKeyword: string; pageType: string }): ImageSet {
  const kw = page.primaryKeyword.toLowerCase();

  if (page.pageType === "Emergency Landing") return { hero: IMAGES.emergency.hero, alt: IMAGES.emergency.alt };
  if (kw.includes("bed bug")) return { hero: IMAGES.bedbug.hero, alt: IMAGES.bedbug.alt };
  if (kw.includes("cockroach")) return { hero: IMAGES.cockroach.hero, alt: IMAGES.cockroach.alt };
  if (kw.includes("termite")) return { hero: IMAGES.termite.hero, alt: IMAGES.termite.alt };
  if (kw.includes("mosquito")) return { hero: IMAGES.mosquito.hero, alt: IMAGES.mosquito.alt };
  if (kw.includes("rodent") || kw.includes("mice") || kw.includes("rat") || kw.includes("mouse"))
    return { hero: IMAGES.rodent.hero, alt: IMAGES.rodent.alt };
  if (kw.includes("wasp")) return { hero: IMAGES.wasp.hero, alt: IMAGES.wasp.alt };
  if (kw.includes("ant") || kw.includes("spider") || kw.includes("silverfish"))
    return { hero: IMAGES.insect.hero, alt: IMAGES.insect.alt };
  if (
    kw.includes("raccoon") ||
    kw.includes("squirrel") ||
    kw.includes("skunk") ||
    kw.includes("bat") ||
    kw.includes("wildlife") ||
    kw.includes("bird")
  )
    return { hero: IMAGES.wildlife.hero, alt: IMAGES.wildlife.alt };
  if (kw.includes("commercial")) return { hero: IMAGES.commercial.hero, alt: IMAGES.commercial.alt };
  return { hero: IMAGES.pest.hero, alt: IMAGES.pest.alt };
}

export function getServiceAccent(icon: string): string {
  return SERVICE_ACCENTS[icon] ?? SERVICE_ACCENTS.pest;
}
