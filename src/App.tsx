import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { CoreTechSection } from './sections/CoreTechSection';
import { InteractiveLabSection } from './sections/InteractiveLabSection';
import { UserStoriesSection } from './sections/UserStoriesSection';
import { CTAFooterSection } from './sections/CTAFooterSection';
import { AgentsBroadcastPage } from './pages/AgentsBroadcastPage';
import { SoulGamePage } from './pages/SoulGamePage';
import { BackgroundMusic } from './components/BackgroundMusic';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  useEffect(() => {
    gsap.defaults({ ease: 'power3.out' });
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen" style={{ background: '#050510' }}>
      <BackgroundMusic />
      <Navbar />
      <main>
        <HeroSection />
        <CoreTechSection />
        <InteractiveLabSection />
        <UserStoriesSection />
        <CTAFooterSection />
      </main>
    </div>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/agents" element={<AgentsBroadcastPage />} />
      <Route path="/soul-game" element={<SoulGamePage />} />
    </Routes>
  );
}

export default App;
