import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Menu from "@/components/Menu";
import Story from "@/components/Story";
import Gallery from "@/components/Gallery";
import Events from "@/components/Events";
import Reserve from "@/components/Reserve";
import Visit from "@/components/Visit";

export default function Home() {
  return (
    <>
      <Intro />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Menu />
        <Story />
        <Gallery />
        <Events />
        <Reserve />
      </main>
      <Visit />
    </>
  );
}
