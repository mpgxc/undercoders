import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

const Header = () => {
  return (
    <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-tight leading-tight mb-20 mt-8 flex items-center">
      <Link href="/" className="hover:text-brand-dark transition-colors">
        <span className="text-brand-dark ">&gt;_</span>{" "}
        {SITE_NAME.toLowerCase()}
      </Link>
    </h2>
  );
};

export default Header;
