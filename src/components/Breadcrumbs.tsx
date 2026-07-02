import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/pseo";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {items.map((item, i) => (
          <li key={item.href}>
            {i < items.length - 1 ? (
              <>
                <Link href={item.href}>{item.name}</Link>
                <span className="breadcrumb-sep" aria-hidden="true">
                  /
                </span>
              </>
            ) : (
              <span aria-current="page">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
