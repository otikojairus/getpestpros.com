import Link from "next/link";
import type { InternalLink } from "@/lib/pseo";

export function InternalLinksSection({ links, title }: { links: InternalLink[]; title: string }) {
  if (!links.length) return null;

  return (
    <section className="related-section" aria-labelledby="related-heading">
      <h2 id="related-heading" className="section-title text-3xl">
        {title}
      </h2>
      <div className="related-grid">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="related-card">
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
