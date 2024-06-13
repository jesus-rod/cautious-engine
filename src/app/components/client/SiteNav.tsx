
'use client';

import Link from "next/link";
import {usePathname} from "next/navigation";

const siteRoutes = [
  {
    href: "/",
    label: "Upload",
  },
  {
    href: "/documents",
    label: "Documents",
  },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex gap-x-5 text-[16px] font-bold">
        {siteRoutes.map((siteRoute) => (
          <li key={siteRoute.href}>
            <Link
              href={siteRoute.href}
              className={`text-zinc-400 transition py-2 px-4 ${pathname === siteRoute.href ? "text-zinc-900" : ""
                }`}
            >
              {siteRoute.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
