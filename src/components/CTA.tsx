import { phoneDisplay, phoneTel } from "@/lib/pseo";
import { IconPhone } from "@/components/Icons";

export function CTABanner({ headline, subtext }: { headline: string; subtext?: string }) {
  return (
    <section className="cta-banner" aria-label="Call to action">
      <div className="cta-banner-inner">
        <div>
          <p className="cta-headline">{headline}</p>
          {subtext && <p className="cta-subtext">{subtext}</p>}
        </div>
        <a href={`tel:${phoneTel}`} className="page-button page-button--primary cta-call-btn">
          <IconPhone />
          Call {phoneDisplay}
        </a>
      </div>
    </section>
  );
}

export function StickyCallBar() {
  return (
    <div className="sticky-call-bar" role="complementary" aria-label="Quick call">
      <a href={`tel:${phoneTel}`} className="sticky-call-link">
        <IconPhone className="h-5 w-5" />
        <span>Call {phoneDisplay}</span>
      </a>
    </div>
  );
}
