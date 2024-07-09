'use client';
import {Moon, Sun} from 'lucide-react';
import {useSession} from "next-auth/react";
import {useTheme} from 'next-themes';
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useState} from 'react';
import LogoutButton from './LogoutButton';


const loggedOutRoutes = [
  {
    href: "/",
    label: "Sign up",
  },
  {
    href: "/signin",
    label: "Sign in",
  },
];

const loggedInRoutes = [
  {
    href: "/upload",
    label: "Upload",
  },
  {
    href: "/documents",
    label: "Documents",
  },
];

export default function SiteNav() {
  const pathname = usePathname();
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);


  const {data: session, status} = useSession()
  const isLoggedIn = session && status === "authenticated"

  const siteRoutes = isLoggedIn ? loggedInRoutes : loggedOutRoutes

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav>
      <ul className="flex gap-x-5 text-[16px] font-bold">
        {siteRoutes.map((siteRoute) => (
          <li key={siteRoute.href} className="flex items-end">
            <Link
              href={siteRoute.href}
              className={`text-zinc-400 dark:text-zinc-500 transition py-2 px-4 ${pathname === siteRoute.href
                ? "text-zinc-900 dark:text-zinc-100"
                : "hover:text-zinc-600 dark:hover:text-zinc-300"
                }`}
            >
              {siteRoute.label}
            </Link>
          </li>
        ))}
        {isLoggedIn && (
          <li className="flex items-end">
            <LogoutButton />
          </li>
        )}
        <li>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-zinc-600 dark:text-zinc-300"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />
            ) : (
              <div className="h-5 w-5" /> // Placeholder
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
}