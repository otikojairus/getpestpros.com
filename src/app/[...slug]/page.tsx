import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTABanner } from "@/components/CTA";
import { FAQSection } from "@/components/FAQSection";
import { InternalLinksSection } from "@/components/InternalLinksSection";
import { PageHero } from "@/components/PageHero";
import { TrustBadges } from "@/components/TrustBadges";
import { getPageImages } from "@/lib/images";
import {
  buildBreadcrumbs,
  buildContentSections,
  buildDescription,
  buildFaqs,
  buildH1,
  buildIntro,
  buildSchemas,
  buildTitleTag,
  buildTrustPoints,
  getInternalLinks,
  getLocationLabel,
  getPageBySlug,
  isCityPage,
  isPillarPage,
  pages,
  siteUrl,
} from "@/lib/pseo";

type Params = {
  slug?: string[];
};

export function generateStaticParams() {
  return pages.map((page) => ({
    slug: page.slug.replace(/^\//, "").split("/"),
  }));
}

async function resolveParams(params: Params | Promise<Params>) {
  return Promise.resolve(params);
}

export async function generateMetadata({ params }: { params: Params | Promise<Params> }): Promise<Metadata> {
  const resolved = await resolveParams(params);
  const slug = resolved.slug ?? [];
  const page = getPageBySlug(`/${slug.join("/")}`);

  if (!page) {
    return { title: "Page Not Found" };
  }

  const images = getPageImages(page);

  return {
    title: buildTitleTag(page),
    description: buildDescription(page),
    alternates: {
      canonical: new URL(page.slug, siteUrl).toString(),
    },
    openGraph: {
      title: buildTitleTag(page),
      description: buildDescription(page),
      url: new URL(page.slug, siteUrl).toString(),
      type: "website",
      images: [{ url: images.hero, alt: images.alt }],
    },
  };
}

export default async function PestPage({ params }: { params: Params | Promise<Params> }) {
  const resolved = await resolveParams(params);
  const slug = resolved.slug ?? [];
  const page = getPageBySlug(`/${slug.join("/")}`);

  if (!page) {
    notFound();
  }

  const h1 = buildH1(page);
  const intro = buildIntro(page);
  const faqs = buildFaqs(page);
  const sections = buildContentSections(page);
  const trustPoints = buildTrustPoints(page);
  const breadcrumbs = buildBreadcrumbs(page);
  const internalLinks = getInternalLinks(page);
  const schemas = buildSchemas(page);
  const images = getPageImages(page);
  const loc = getLocationLabel(page);

  const relatedTitle = isCityPage(page)
    ? `More Services in ${loc}`
    : isPillarPage(page)
      ? "Find Local Technicians"
      : "You May Also Need";

  return (
    <main className="page-shell">
      <PageHero
        page={page}
        h1={h1}
        intro={intro}
        imageSrc={images.hero}
        imageAlt={images.alt}
        breadcrumbs={breadcrumbs}
        trustPoints={trustPoints}
      />

      <section className="container section-pad-sm">
        <TrustBadges points={trustPoints} />
      </section>

      <section className="container section-pad-sm">
        <div className="card card-pad">
          {sections.map((section) => (
            <article key={section.heading} className="content-section">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className="container section-pad-sm">
        <CTABanner
          headline="Ready to get started?"
          subtext="Call now for a free estimate. Same-day appointments available in most areas."
        />
      </section>

      <section className="container section-pad-sm">
        <div className="card card-pad">
          <FAQSection faqs={faqs} />
        </div>
      </section>

      <section className="container section-pad-bottom">
        <div className="card card-pad">
          <InternalLinksSection links={internalLinks} title={relatedTitle} />
        </div>
      </section>

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
    </main>
  );
}
