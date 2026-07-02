import Link from "next/link";
import { Logo } from "@/components/Logo";
import { IconPhone } from "@/components/Icons";
import { phoneDisplay, phoneTel } from "@/lib/pseo";

const NAV_LINKS = [
  { href: "/pest-control-services", label: "Services" },
  { href: "/emergency-pest-control", label: "Emergency" },
  { href: "/commercial-pest-control", label: "Commercial" },
  { href: "/pest-control-near-me", label: "Near Me" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="site-logo">
          <Logo size={38} />
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <a href={`tel:${phoneTel}`} className="header-cta">
          <IconPhone className="h-4 w-4" />
          <span>{phoneDisplay}</span>
        </a>
      </div>
    </header>
  );
}
