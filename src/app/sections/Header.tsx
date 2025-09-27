"use client";
import Link from "next/link";
import { navLinks } from "../../../constants";
import Image from "next/image";
import logo from "@/app/assets/images/logo.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";

export default function Header() {
  useGSAP(() => {
    const navTween = gsap.timeline({
      // why tween ? it means animation between
      scrollTrigger: {
        trigger: "header",
        start: "bottom top", // this means when the bottom of the nav reach to the top of the view port make the animation start
        scrub: true, // so so so important, it makes the animation smooth and makes it listen to the scroll
      },
    });

    navTween.fromTo(
      "header",
      {
        backgroundColor: "transparent",
      },
      {
        backgroundColor: "#00000050",
        backgroundFilter: "blur(10px)",
        duration: 1,
        ease: "power1.inOut",
      }
    );
  }, []);

  return (
    <header className="w-full z-50 fixed start-1/2 -translate-x-1/2">
      <nav className="flex justify-between items-center w-full z-50 container mx-auto px-4 py-4 md:py-6 flex-col md:flex-row gap-2 md:gap-0">
        <Link href={"#home"} className="flex-center gap-2">
          <Image src={logo} alt="Logo" width={50} height={50} />
          <p className="text-2xl md:text-3xl">Velvet Pour</p>
        </Link>

        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link href={`#${link.id}`}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
