import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import YouTubeFeed from "@/components/YouTubeFeed";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import MobileExplore from "@/components/MobileExplore";

export default function Home() {
  return (
    <div className="container">
      <Header />
      <div className="main-grid">
        <main>
          <Hero />
          <YouTubeFeed />
          <Projects />
          <MobileExplore />
        </main>
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}
