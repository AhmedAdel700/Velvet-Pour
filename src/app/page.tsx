"use client";
import Hero from "./sections/Hero";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Header from "./sections/Header";
import Footer from "./sections/Footer";
gsap.registerPlugin(ScrollTrigger, SplitText);

function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Footer />
    </main>
  );
}

export default Home;
