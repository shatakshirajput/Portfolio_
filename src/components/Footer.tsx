import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(footerRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="bg-gray-900 text-white py-12 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div>
            <h3 className="font-outfit font-bold text-2xl mb-4">Shatakshi Rajput</h3>
            <p className="font-inter text-gray-300">
              Full Stack Developer passionate about creating innovative web solutions 
              and exploring the intersection of AI and web development.
            </p>
          </div>

          <div>
            <h4 className="font-inter font-semibold text-lg mb-4">Quick Links</h4>
            <div className="space-y-2">
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="block font-inter text-gray-300 hover:text-white transition-colors duration-200"
              >
                About
              </button>
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="block font-inter text-gray-300 hover:text-white transition-colors duration-200"
              >
                Projects
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="block font-inter text-gray-300 hover:text-white transition-colors duration-200"
              >
                Contact
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-inter font-semibold text-lg mb-4">Contact Info</h4>
            <div className="space-y-2">
              <a 
                href="mailto:shatakshirajput02@gmail.com"
                className="block font-inter text-gray-300 hover:text-white transition-colors duration-200"
              >
                shatakshirajput02@gmail.com
              </a>
              <p className="font-inter text-gray-300">Ghaziabad, India</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-inter text-gray-300 text-center sm:text-left">
              © 2025 Shatakshi Rajput. All rights reserved.
            </p>
            
            <button
              onClick={scrollToTop}
              className="bg-apple-blue text-white px-6 py-2 rounded-full font-inter font-medium hover:bg-blue-600 transition-colors duration-200"
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
