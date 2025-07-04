import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  SiReact,
  SiMongodb,
  SiExpress,
  SiNodedotjs
} from 'react-icons/si';
import Lottie from 'lottie-react';
import devAnimation from '../assets/lottie/dev-avtar/Animation - 1751469977994.json';

const HeroSection = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const capsuleRef = useRef(null);
  const blobRef = useRef(null);
  const [currentRole, setCurrentRole] = useState(0);

  const roles = [
    "Real-time App Builder",
    "AI + Web Developer",
    "DBMS Enthusiast",
    "MERN Stack Developer",
    "Open Source Contributor",
  ];

  const techIcons = [
    { icon: <SiReact className="text-sky-500 text-xl sm:text-2xl" />, delay: 0 },
    { icon: <SiMongodb className="text-green-600 text-xl sm:text-2xl" />, delay: 0.5 },
    { icon: <SiExpress className="text-gray-900 text-xl sm:text-2xl" />, delay: 1 },
    { icon: <SiNodedotjs className="text-green-700 text-xl sm:text-2xl" />, delay: 1.5 }
  ];

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(textRef.current?.children || [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    )
      .fromTo(capsuleRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6 },
        "-=0.5"
      )
      .fromTo(blobRef.current,
        { opacity: 0, scale: 0.5, rotation: -180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1 },
        "-=0.8"
      );

    const roleInterval = setInterval(() => {
      gsap.to(capsuleRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        onComplete: () => {
          setCurrentRole(prev => (prev + 1) % roles.length);
          gsap.to(capsuleRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3
          });
        }
      });
    }, 3000);

    gsap.to(blobRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    return () => {
      clearInterval(roleInterval);
      tl.kill();
    };
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
        {/* Left - Text */}
        <div ref={textRef} className="order-2 lg:order-1 text-center lg:text-left">
          <p className="text-apple-gray font-inter mb-2 sm:mb-4 text-base sm:text-lg">Hi, I'm</p>
          <h1 className="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-4 sm:mb-6 leading-tight">
            Shatakshi<br />Rajput
          </h1>
          <h2 className="font-outfit font-semibold text-2xl sm:text-3xl lg:text-4xl text-apple-blue mb-6 sm:mb-8 tracking-tight">
            Full Stack Developer
          </h2>

          <div
            ref={capsuleRef}
            className="bg-apple-light-gray rounded-full px-6 py-3 mb-10 inline-block"
          >
            <span className="font-inter text-gray-700 font-medium text-sm sm:text-base">
              {roles[currentRole]}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button
              onClick={() => scrollTo('projects')}
              className="bg-apple-blue text-white px-6 py-3 rounded-full font-inter font-medium hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="border-2 border-apple-blue text-apple-blue px-6 py-3 rounded-full font-inter font-medium hover:bg-apple-blue hover:text-white transition-all duration-300 text-sm sm:text-base"
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* Center - Lottie Avatar */}
        <div className="order-1 lg:order-2 flex justify-center">
          <div className="w-60 h-60 sm:w-72 sm:h-72">
            <Lottie animationData={devAnimation} loop />
          </div>
        </div>

        {/* Right - Floating Blob */}
        <div className="order-3 flex justify-center lg:justify-end">
          <div
            ref={blobRef}
            className="relative w-48 h-48 sm:w-64 sm:h-64"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-apple-blue/30 to-purple-500/30 rounded-full blur-xl" />
            <div className="relative w-full h-full bg-gradient-to-br from-apple-blue/20 to-purple-500/20 rounded-full flex items-center justify-center">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {techIcons.map((tech, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse-slow"
                    style={{ animationDelay: `${tech.delay}s` }}
                  >
                    {tech.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
