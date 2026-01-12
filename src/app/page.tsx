import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorEffect from "@/components/CursorEffect";
import NavigationSidebar from "@/components/NavigationSidebar";
import ConnectCard from "@/components/ConnectCard";
import { navigationLinks } from "@/data/navigationLinks";

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

      {/* Sticky Sidebar - Desktop Only */}
      <NavigationSidebar links={navigationLinks} />
      <ConnectCard />
    </>
  );
}
