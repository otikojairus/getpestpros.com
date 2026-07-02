import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroWave } from "@/components/HeroWave";
import { IconPhone } from "@/components/Icons";
import type { BreadcrumbItem, PseoRecord } from "@/lib/pseo";
import { getLocationLabel, isCityPage, phoneTel } from "@/lib/pseo";

type TrustPoint = { label: string; detail: string };

type PageHeroProps = {
  page: PseoRecord;
  h1: string;
  intro: string;
  imageSrc: string;
  imageAlt: string;
  breadcrumbs: BreadcrumbItem[];
  trustPoints: TrustPoint[];
};

function getKicker(page: PseoRecord): string {
  if (isCityPage(page)) return getLocationLabel(page);
  switch (page.pageType) {
    case "Emergency Landing":
      return "24/7 emergency";
    case "Cost Guide":
      return "Pricing guide";
    case "Near Me Page":
      return "Find local help";
    default:
      return "Licensed · Canada-wide";
  }
}

export function PageHero({ page, h1, intro, imageSrc, imageAlt, breadcrumbs, trustPoints }: PageHeroProps) {
  const kicker = getKicker(page);
  const isEmergency = page.pageType === "Emergency Landing";
  const badgeRows = trustPoints.slice(0, 3);

  return (
    <section className="hero-editorial hero-editorial--page" aria-label="Page introduction">
      <div className="hero-editorial-top">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      <div className="hero-editorial-wrap">
        <div className="hero-editorial-content">
          <div className="hero-kicker-line">
            <span className="hero-kicker">{kicker}</span>
          </div>

          <div className="hero-page-pills">
            {isEmergency && <span className="page-pill page-pill--emergency">24/7 Emergency</span>}
            <span className="page-pill">Licensed &amp; Insured</span>
            <span className="page-pill">Free Estimates</span>
          </div>

          <h1 className="hero-editorial-title hero-editorial-title--page">{h1}</h1>
          <p className="hero-editorial-lead hero-editorial-lead--page">{intro}</p>

          <div className="hero-editorial-actions">
            <a href={`tel:${phoneTel}`} className="page-button page-button--primary">
              <IconPhone />
              {page.cta}
            </a>
            <Link href="/pest-control-services" className="page-button page-button--outline">
              All Services
            </Link>
          </div>
        </div>

        <div className="hero-editorial-media">
          <div className="hero-media-inner">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={900}
              height={1100}
              priority
              sizes="(max-width: 768px) 100vw, 55vw"
              className="hero-media-img"
            />
          </div>
          <aside className="hero-media-badge" aria-label="Service highlights">
            {badgeRows.map((point) => (
              <p key={point.label} className="hero-badge-row">
                <strong>{point.label}</strong>
                <span className="hero-badge-detail"> — {point.detail}</span>
              </p>
            ))}
          </aside>
        </div>
      </div>

      <HeroWave />
    </section>
  );
}
