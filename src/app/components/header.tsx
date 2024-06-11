import Image from "next/image";
import Link from "next/link";
import SiteNav from "./client/site-nav";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-4 px-7 border-b">
      <Link href="/">
        <Image
          src="https://placehold.jp/3d4070/ffffff/50x50.png?text=SMART"
          alt="logo"
          width="50"
          height="50"
        />
      </Link>
      <SiteNav />
    </header>
  );
}