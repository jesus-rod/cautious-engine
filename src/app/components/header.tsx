import Image from "next/image";
import Link from "next/link";
import SiteNav from "./client/SiteNav";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-4 px-7 border-b">
      <Link href="/">
        <Image
          src="https://placehold.jp/3d4070/ffffff/60x60.png?text=TOPICFY"
          alt="logo"
          width="60"
          height="60"
        />
      </Link>
      <SiteNav />
    </header>
  );
}