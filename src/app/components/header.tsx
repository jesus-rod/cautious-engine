import Image from "next/image";
import Link from "next/link";
import SiteNav from "./client/SiteNav";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-4 px-7 border-b">
      <Link href="/">
        <Image
          className="rounded"
          src="https://placehold.jp/444444/ffffff/60x60.png?text=TOPIC!"
          alt="logo"
          width="60"
          height="60"
        />
      </Link>
      <SiteNav />
    </header>
  );
}