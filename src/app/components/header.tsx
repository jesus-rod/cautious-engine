import Image from "next/image";
import Link from "next/link";
import SiteNav from "./SiteNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 shadow-md flex justify-between items-center py-4 px-7 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white">
      <Link href="/upload">
        <Image
          priority
          quality={75}
          className="rounded"
          src="/intelligence.png"
          alt="logo"
          width="60"
          height="60"
        />
      </Link>
      <SiteNav />
    </header>
  );
}