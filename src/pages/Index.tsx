
import { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import TechStack from '../components/TechStack';
import ProjectShowcase from '../components/ProjectShowcase';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Prevent scrolling during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-white">
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      
      {!isLoading && (
        <>
          <Navbar />
          <HeroSection />
          <TechStack />
          <ProjectShowcase />
          <AboutSection />
          <ContactSection />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
