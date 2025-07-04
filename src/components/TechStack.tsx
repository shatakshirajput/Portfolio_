import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress,
  SiJavascript, SiPython, SiTailwindcss,
  SiFirebase, SiSupabase, SiDjango, SiMysql, SiGit
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');

  const technologies = [
    { name: 'React.js', icon: <SiReact className="text-sky-500" />, category: 'Frontend' },
    { name: 'Node.js', icon: <SiNodedotjs className="text-green-600" />, category: 'Backend' },
    { name: 'MongoDB', icon: <SiMongodb className="text-green-500" />, category: 'Database' },
    { name: 'Express.js', icon: <SiExpress className="text-gray-800" />, category: 'Backend' },
    { name: 'JavaScript', icon: <SiJavascript className="text-yellow-500" />, category: 'Language' },
    { name: 'Python', icon: <SiPython className="text-blue-500" />, category: 'Language' },
    { name: 'TailwindCSS', icon: <SiTailwindcss className="text-cyan-400" />, category: 'Styling' },
    { name: 'Firebase', icon: <SiFirebase className="text-yellow-400" />, category: 'Cloud' },
    { name: 'Supabase', icon: <SiSupabase className="text-green-400" />, category: 'Cloud' },
    { name: 'Django', icon: <SiDjango className="text-green-800" />, category: 'Framework' },
    { name: 'MySQL', icon: <SiMysql className="text-blue-600" />, category: 'Database' },
    { name: 'Git', icon: <SiGit className="text-red-500" />, category: 'Tools' },
  ];

  const filteredTech = technologies.filter(
    (tech) =>
      tech.name.toLowerCase().includes(search.toLowerCase()) ||
      tech.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const cards = cardsRef.current?.children;
    if (cards) {
      gsap.fromTo(cards,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, [filteredTech.length]);

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-6">
            Tech Stack
          </h2>
          <p className="font-inter text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Technologies I use to build modern, scalable applications
          </p>
          <input
            type="text"
            placeholder="Search by name or category..."
            className="w-full max-w-md mx-auto block px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredTech.map((tech, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
            >
              <div className="text-center">
                <div
                  className="text-4xl sm:text-5xl mb-3 sm:mb-4 mx-auto p-3 rounded-full transition-transform duration-300 group-hover:rotate-6 group-hover:ring-2 group-hover:ring-primary/30"
                  aria-hidden
                >
                  {tech.icon}
                </div>
                <h3 className="font-inter font-semibold text-gray-900 mb-1 text-base sm:text-lg">
                  {tech.name}
                </h3>
                <p className="text-sm text-gray-500 font-inter">
                  {tech.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredTech.length === 0 && (
          <p className="text-center text-gray-500 font-inter mt-10">
            No technologies match your search.
          </p>
        )}
      </div>
    </section>
  );
};

export default TechStack;
