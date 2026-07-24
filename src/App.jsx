import Navbar from "./components/layout/Navbar";
import Hero from "./components/Hero/Hero";
import OurVision from "./components/sections/OurVision";
import WhyChoose from "./components/sections/WhyChoose";
import Services from "./components/sections/Services";
import Portfolio from "./components/sections/Portfolio";
import Process from "./components/sections/Process";
import FAQ from "./components/sections/FAQ";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";
import AtmosphericBackground from "./components/common/AtmosphericBackground";
import useLenis from "./hooks/useLenis";

function App() {
  useLenis();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-black selection:bg-black selection:text-white">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {/* Living Multi-Layer Atmospheric Background */}
      <AtmosphericBackground />

      <Navbar />
      <main id="main">
        <Hero />
        <OurVision />
        <WhyChoose />
        <Services />
        <Portfolio />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
