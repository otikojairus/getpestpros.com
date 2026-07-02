import Image from "next/image";
import Link from "next/link";
import { HeroWave } from "@/components/HeroWave";
import { CTABanner } from "@/components/CTA";
import { IconPhone } from "@/components/Icons";
import { IMAGES } from "@/lib/images";
import { phoneDisplay, phoneTel } from "@/lib/pseo";

export default function NotFound() {
  return (
    <main className="page-shell">
      <section className="hero-editorial hero-editorial--page hero-editorial--compact" aria-label="Page not found">
        <div className="hero-editorial-wrap hero-editorial-wrap--compact">
          <div className="hero-editorial-content">
            <div className="hero-kicker-line">
              <span className="hero-kicker">404</span>
            </div>

            <h1 className="hero-editorial-title hero-editorial-title--page">
              Page not found — <em>but we can still help.</em>
            </h1>

            <p className="hero-editorial-lead hero-editorial-lead--page">
              The page you are looking for does not exist. If you have a pest problem, our licensed technicians are
              available across Canada.
            </p>

            <div className="hero-editorial-actions">
              <a href={`tel:${phoneTel}`} className="page-button page-button--primary">
                <IconPhone />
                Call {phoneDisplay}
              </a>
              <Link href="/" className="page-button page-button--outline">
                Back to Home
              </Link>
            </div>
          </div>

          <div className="hero-editorial-media">
            <div className="hero-media-inner">
              <Image
                src={IMAGES.pest.hero}
                alt={IMAGES.pest.alt}
                width={900}
                height={1100}
                sizes="(max-width: 768px) 100vw, 55vw"
                className="hero-media-img"
              />
            </div>
          </div>
        </div>

        <HeroWave />
      </section>

      <section className="container section-pad-sm">
        <CTABanner headline="Need an exterminator now?" subtext="We are available 24/7 for emergency pest control." />
      </section>
    </main>
  );
}
