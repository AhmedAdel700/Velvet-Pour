"use client";

import Image from "next/image";
import leftLeaf from "@/app/assets/images/hero-left-leaf.png";
import rightLeaf from "@/app/assets/images/hero-right-leaf.png";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "gsap/all";

export default function Hero() {
  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      // bec. its from this mean from y 100% to the original state of postion
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.05,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.05,
      delay: 1,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top", // top of the home pahe - top of the screen
          end: "bottom top", // bottom of the home page - top of the screen
          scrub: true,
        },
      })
      .to(".left-leaf", { y: -300 }, 0)
      .to(".right-leaf", { y: 300}, 0);
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>

        <Image src={leftLeaf} alt="left-leaf" className="left-leaf" />
        <Image src={rightLeaf} alt="right-leaf" className="right-leaf" />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p className="text-lg font-medium subtitle">
                Cool. Crisp. Classic.
              </p>
              <p className="subtitle">
                Sop The Spirit <br /> Of The Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <Link className="subtitle" href={"#cocktails"}>
                View cocktails
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
