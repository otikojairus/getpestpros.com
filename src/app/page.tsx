import Link from "next/link";
import { CTABanner } from "@/components/CTA";
import { HeroSection } from "@/components/HeroSection";
import { TrustBadges } from "@/components/TrustBadges";
import {
  buildTrustPoints,
  getCities,
  getHomepageServices,
  getPageBySlug,
  siteName,
  siteTagline,
} from "@/lib/pseo";

export const metadata = {
  title: `${siteName} | Licensed Help Across Canada`,
  description: siteTagline,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const services = getHomepageServices();
  const cities = getCities().slice(0, 16);
  const trustPoints = buildTrustPoints(getPageBySlug("/pest-control-services")!);

  const citySlug = (area: string) => {
    const city = area.split(",")[0].trim().toLowerCase().replace(/\s+/g, "-");
    const page = getPageBySlug(`/pest-control-${city}`);
    return page?.slug ?? `/pest-control-${city}`;
  };

  return (
    <main className="page-shell">
      <HeroSection />

      <section className="container section-pad-sm">
        <TrustBadges points={trustPoints} />
      </section>

      <section className="container section-pad">
        <div className="section-intro">
          <h2 className="section-title text-3xl">How We Can Help</h2>
          <p className="muted">Residential, commercial, and emergency — one number across Canada.</p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <Link key={service.slug} href={service.slug} className="service-card">
              {service.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="container section-pad">
        <CTABanner
          headline="Need help right now?"
          subtext="Our emergency line is open 24/7. Same-day appointments available in most cities."
        />
      </section>

      <section className="container section-pad">
        <div className="card card-pad">
          <h2 className="section-title text-3xl">Cities We Serve</h2>
          <p className="muted section-lead">
            Local technicians in major markets — Toronto, Vancouver, Calgary, Ottawa, and beyond.
          </p>
          <div className="city-pills city-pills-spaced">
            {cities.map((city) => (
              <Link key={city} href={citySlug(city)} className="city-pill">
                {city.split(",")[0]}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container section-pad-bottom">
        <div className="why-band card-pad-lg">
          <h2 className="section-title text-3xl text-on-dark">Why Homeowners Choose {siteName}</h2>
          <div className="why-grid">
            {[
              {
                title: "Local Technicians",
                text: "Crews who know your neighbourhood, building type, and seasonal patterns.",
              },
              {
                title: "Upfront Pricing",
                text: "Free estimates with no hidden fees. You approve the plan before we start.",
              },
              {
                title: "Pet-Safe Treatments",
                text: "Health Canada-approved products applied with precision around your family.",
              },
              {
                title: "Guaranteed Results",
                text: "If pests return within our warranty window, we come back at no extra charge.",
              },
            ].map((item) => (
              <div key={item.title} className="why-card">
                <p className="why-card-title">{item.title}</p>
                <p className="why-card-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
