import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import CursorEffect from "@/components/CursorEffect";

export default function Home() {
  return (
    <>
      <CursorEffect />
      <Header />
      <main>
        <Hero />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
