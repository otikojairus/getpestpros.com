import Image from "next/image";
import Link from "next/link";
import { HeroWave } from "@/components/HeroWave";
import { IconPhone } from "@/components/Icons";
import { IMAGES } from "@/lib/images";
import { phoneDisplay, phoneTel, siteTagline } from "@/lib/pseo";

const CITIES = ["Toronto", "Vancouver", "Calgary", "Ottawa", "Montreal", "Edmonton"];

export function HeroSection() {
  return (
    <section className="hero-editorial" aria-label="Introduction">
      <div className="hero-editorial-wrap">
        <div className="hero-editorial-content">
          <div className="hero-kicker-line">
            <span className="hero-kicker">Licensed · Canada-wide</span>
          </div>

          <h1 className="hero-editorial-title">
            When pests move in,
            <em> we move fast.</em>
          </h1>

          <p className="hero-editorial-lead">{siteTagline}</p>

          <div className="hero-editorial-actions">
            <a href={`tel:${phoneTel}`} className="page-button page-button--primary">
              <IconPhone />
              {phoneDisplay}
            </a>
            <Link href="/pest-control-services" className="page-button page-button--outline">
              What we treat
            </Link>
          </div>

          <p className="hero-city-label">Active in</p>
          <ul className="hero-city-list">
            {CITIES.map((city) => (
              <li key={city}>{city}</li>
            ))}
          </ul>
        </div>

        <div className="hero-editorial-media">
          <div className="hero-media-inner">
            <Image
              src={IMAGES.homeHero.src}
              alt={IMAGES.homeHero.alt}
              width={900}
              height={1100}
              priority
              sizes="(max-width: 768px) 100vw, 55vw"
              className="hero-media-img"
            />
          </div>
          <aside className="hero-media-badge" aria-label="Service highlights">
            <p className="hero-badge-row">
              <strong>24/7</strong> dispatch
            </p>
            <p className="hero-badge-row">
              <strong>Free</strong> estimates
            </p>
            <p className="hero-badge-row">
              <strong>Same-day</strong> in most areas
            </p>
          </aside>
        </div>
      </div>

      <HeroWave />
    </section>
  );
}
