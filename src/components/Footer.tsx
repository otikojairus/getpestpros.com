import Link from "next/link";
import { Logo } from "@/components/Logo";
import {
  getAllCostGuides,
  getAllNearMePages,
  getAllPillarPages,
  getFooterLabel,
  getHomepageServices,
  getPageBySlug,
  phoneDisplay,
  phoneTel,
  siteName,
} from "@/lib/pseo";

const POPULAR_CITIES = [
  { slug: "/pest-control-toronto", label: "Toronto" },
  { slug: "/pest-control-vancouver", label: "Vancouver" },
  { slug: "/pest-control-calgary", label: "Calgary" },
  { slug: "/pest-control-ottawa", label: "Ottawa" },
  { slug: "/pest-control-mississauga", label: "Mississauga" },
  { slug: "/pest-control-hamilton", label: "Hamilton" },
  { slug: "/wasp-nest-removal-montreal", label: "Montreal" },
  { slug: "/pest-control-winnipeg", label: "Winnipeg" },
];

export function Footer() {
  const services = getHomepageServices();
  const pillars = getAllPillarPages().filter((p) => !services.some((s) => s.slug === p.slug));
  const nearMe = getAllNearMePages();
  const costGuides = getAllCostGuides();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="footer-logo-link">
            <Logo size={42} variant="light" />
          </Link>
          <p className="footer-desc">
            Licensed help and wildlife removal across Canada. Same-day service, free estimates, and treatments
            safe for your family and pets.
          </p>
          <a href={`tel:${phoneTel}`} className="footer-phone">
            {phoneDisplay}
          </a>
        </div>

        <div>
          <p className="footer-heading">Services</p>
          <ul className="footer-links">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={s.slug}>{s.label}</Link>
              </li>
            ))}
            {pillars.map((p) => (
              <li key={p.slug}>
                <Link href={p.slug}>{getFooterLabel(p)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="footer-heading">Quick Links</p>
          <ul className="footer-links">
            <li>
              <Link href="/emergency-pest-control">{getFooterLabel(getPageBySlug("/emergency-pest-control")!)}</Link>
            </li>
            <li>
              <Link href="/same-day-exterminator">{getFooterLabel(getPageBySlug("/same-day-exterminator")!)}</Link>
            </li>
            {nearMe.map((p) => (
              <li key={p.slug}>
                <Link href={p.slug}>{getFooterLabel(p)}</Link>
              </li>
            ))}
            {costGuides.map((p) => (
              <li key={p.slug}>
                <Link href={p.slug}>{getFooterLabel(p)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="footer-heading">Popular Cities</p>
          <ul className="footer-links">
            {POPULAR_CITIES.map(({ slug, label }) => (
              <li key={slug}>
                <Link href={slug}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
        </p>
        <p>Licensed &amp; insured professionals serving Canada.</p>
      </div>
    </footer>
  );
}
