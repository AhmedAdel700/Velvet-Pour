"use client";

import Image from "next/image";
import leftLeaf from "@/app/assets/images/hero-left-leaf.png";
import rightLeaf from "@/app/assets/images/hero-right-leaf.png";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useGSAP(() => {
    // === TEXT ANIMATIONS ===
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
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

    // === LEAVES ANIMATION ===
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".left-leaf", { y: -300 }, 0)
      .to(".right-leaf", { y: 300 }, 0);

    // === VIDEO SCROLL ANIMATION ===
    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    if (videoRef.current) {
      const video = videoRef.current;

      const animateVideo = () => {
        gsap.to(video, {
          scrollTrigger: {
            trigger: "video",
            start: startValue,
            end: endValue,
            scrub: true,
            pin: true,
            // markers: true, // Uncomment for debugging
          },
          currentTime: video.duration,
          ease: "none",
        });
      };

      if (video.readyState >= 1) {
        // Metadata already loaded
        animateVideo();
      } else {
        // Wait for metadata to load
        video.onloadedmetadata = animateVideo;
      }
    }
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

      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
        />
        {/* VERY VERY Important Use This To Convert The Vidoes To Become Frame By Fram And Smooth
        "F:\ffmpeg-8.0-full_build\ffmpeg-8.0-full_build\bin\ffmpeg.exe" -i "path\to\input.mp4" -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p "path\to\output.mp4"
        the "path\to\input.mp4" & "path\to\output.mp4" is the path of my vidoes (Where My Vidoes Located)
        */}
      </div>
    </>
  );
}
