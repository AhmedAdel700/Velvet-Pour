import Link from "next/link";
import { navLinks } from "../../../constants";
import Image from "next/image";
import logo from "@/app/assets/images/logo.png";

export default function Header() {
  return (
    <header>
      <Link href={"#home"} className="flex flex-center gap-2">
        <Image src={logo} alt="Logo" width={40} height={40} />
        <p>Velvet Pour</p>
      </Link>
      <nav>
        <ul>
          {navLinks.map((link) => (
            <li key={link.id} className="">
              <Link href={`#${link.id}`}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
