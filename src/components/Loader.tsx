import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs
} from 'react-icons/si';

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [currentTech, setCurrentTech] = useState(0);
  const [progress, setProgress] = useState(0);

  const techStack = [
    { name: 'MongoDB', icon: <SiMongodb className="text-5xl text-green-600" />, color: '#47A248' },
    { name: 'Express.js', icon: <SiExpress className="text-5xl text-gray-900" />, color: '#000000' },
    { name: 'React.js', icon: <SiReact className="text-5xl text-sky-500" />, color: '#61DAFB' },
    { name: 'Node.js', icon: <SiNodedotjs className="text-5xl text-green-700" />, color: '#339933' }
  ];

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set(logoRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(progressRef.current, { width: '0%' });

    // Progress bar
    tl.to(progressRef.current, {
      width: '100%',
      duration: 6,
      ease: 'power2.out',
      onUpdate: function () {
        const progressValue = Math.round(this.progress() * 100);
        setProgress(progressValue);
      }
    });

    // Logo rotation
    const logoTl = gsap.timeline({ repeat: -1 });
    techStack.forEach((_, index) => {
      logoTl
        .to(logoRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          onStart: () => setCurrentTech(index)
        })
        .to(logoRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          delay: 1
        });
    });

    // Exit loader
    setTimeout(() => {
      logoTl.kill();
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 1,
        onComplete: onComplete
      });
    }, 6000);

    return () => {
      tl.kill();
      logoTl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
    >
      <div className="text-center mb-12">
        <div
          ref={logoRef}
          className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-2xl transition-transform duration-300"
          style={{ backgroundColor: `${techStack[currentTech]?.color}20` }}
        >
          {techStack[currentTech]?.icon}
        </div>
        <h2 className="text-2xl font-outfit font-semibold text-gray-800 mb-2">
          {techStack[currentTech]?.name}
        </h2>
      </div>

      <div className="w-80 mb-6">
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div
            ref={progressRef}
            className="bg-apple-blue h-1 rounded-full transition-all duration-100"
          />
        </div>
      </div>

      <p className="text-lg font-inter text-gray-600">
        Loading... {progress}%
      </p>
    </div>
  );
};

export default Loader;
