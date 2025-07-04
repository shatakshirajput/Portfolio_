import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1 }
    );
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false); // Auto-close mobile menu on desktop
        if (menuRef.current) {
          menuRef.current.style.display = 'none'; // hide if manually open
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Animate mobile menu open/close
  useEffect(() => {
    if (menuRef.current) {
      if (menuOpen) {
        gsap.fromTo(
          menuRef.current,
          { height: 0, opacity: 0 },
          {
            height: 'auto',
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
            display: 'block'
          }
        );
      } else {
        gsap.to(menuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            if (menuRef.current) menuRef.current.style.display = 'none';
          }
        });
      }
    }
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // close menu
    }
  };

  const openResume = () => {
    window.open('/ShatakshiRajputResume.pdf', '_blank');
    setMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="font-outfit font-bold text-xl text-gray-900">
          Shatakshi Rajput
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollTo('about')}
            className="text-gray-600 hover:text-apple-blue transition-colors font-inter"
          >
            About
          </button>
          <button
            onClick={() => scrollTo('projects')}
            className="text-gray-600 hover:text-apple-blue transition-colors font-inter"
          >
            Projects
          </button>
          <button
            onClick={openResume}
            className="bg-apple-blue text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors font-inter"
          >
            Resume
          </button>
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Animated with GSAP */}
      <div
        ref={menuRef}
        className="md:hidden bg-white border-t border-gray-200 shadow-md px-6 py-4 space-y-4 hidden"
      >
        <button
          onClick={() => scrollTo('about')}
          className="block w-full text-left text-gray-700 hover:text-apple-blue font-inter"
        >
          About
        </button>
        <button
          onClick={() => scrollTo('projects')}
          className="block w-full text-left text-gray-700 hover:text-apple-blue font-inter"
        >
          Projects
        </button>
        <button
          onClick={openResume}
          className="block w-full text-left bg-apple-blue text-white px-4 py-2 rounded-full font-inter hover:bg-blue-600"
        >
          Resume
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
