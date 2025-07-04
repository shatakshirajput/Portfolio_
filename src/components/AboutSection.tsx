import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, GraduationCap, Award, MapPin } from 'lucide-react';
import Globe3D from './Globe3D';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [projectCount, setProjectCount] = useState(0);
  const [experienceCount, setExperienceCount] = useState(0);

  useEffect(() => {
    const cards = cardsRef.current?.children;
    if (cards) {
      gsap.fromTo(cards,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to({ value: 0 }, {
          value: 5,
          duration: 2,
          onUpdate: function () {
            setProjectCount(Math.round(this.targets()[0].value));
          }
        });

        gsap.to({ value: 0 }, {
          value: 1,
          duration: 2,
          onUpdate: function () {
            setExperienceCount(Math.round(this.targets()[0].value));
          }
        });
      }
    });
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-16 sm:py-24 px-4 sm:px-6 bg-apple-light-gray">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-6">
            About Me
          </h2>
          <p className="font-inter text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Passionate Full Stack Developer with expertise in MERN stack, AI integration, 
            and building scalable web applications that solve real-world problems.
          </p>
        </div>

        <div ref={cardsRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Education Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-apple-blue/10 rounded-2xl mb-6">
              <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-apple-blue" />
            </div>
            <h3 className="font-outfit font-bold text-lg sm:text-xl text-gray-900 mb-4">Education</h3>
            <div className="space-y-3">
              <div>
                <p className="font-inter font-semibold text-gray-900">B.Tech CSE - AIML</p>
                <p className="text-sm text-gray-600">NIET • 83.8%</p>
              </div>
              <div>
                <p className="font-inter text-gray-700 text-sm">Class 12: 83%</p>
                <p className="font-inter text-gray-700 text-sm">Class 10: 92.2%</p>
              </div>
            </div>
          </div>

          {/* Location & Globe Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-green-500/10 rounded-2xl mb-6">
              <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <h3 className="font-outfit font-bold text-lg sm:text-xl text-gray-900 mb-4 text-center">Location</h3>
            <div className="relative w-full h-40 sm:h-52 lg:h-64">
              <Globe3D />
            </div>
            <p className="font-inter text-gray-900 font-semibold text-center mt-4 text-sm sm:text-base">
              📍 Ghaziabad, India
            </p>
          </div>

          {/* Achievements Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-purple-500/10 rounded-2xl mb-6">
              <Award className="w-7 h-7 sm:w-8 sm:h-8 text-purple-500" />
            </div>
            <h3 className="font-outfit font-bold text-lg sm:text-xl text-gray-900 mb-4">Achievements</h3>
            <div className="space-y-4">
              <div className="text-center">
                <p className="font-outfit font-bold text-2xl sm:text-3xl text-apple-blue">{projectCount}+</p>
                <p className="text-sm text-gray-600">Projects Built</p>
              </div>
              <div className="text-center">
                <p className="font-outfit font-bold text-2xl sm:text-3xl text-purple-500">{experienceCount}+</p>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>
              <p className="text-sm text-gray-700 text-center">Full Stack + AI Specialization</p>
            </div>
          </div>

          {/* Resume Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-orange-500/10 rounded-2xl mb-6">
              <Download className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500" />
            </div>
            <h3 className="font-outfit font-bold text-lg sm:text-xl text-gray-900 mb-4">Resume</h3>
            <div className="text-center">
              <div className="bg-apple-light-gray rounded-2xl p-4 mb-4">
                <div className="w-14 h-20 sm:w-16 sm:h-20 bg-white rounded-lg mx-auto flex items-center justify-center shadow-sm">
                  <span className="text-xl sm:text-2xl">📄</span>
                </div>
              </div>
              <button
                onClick={() => window.open('/ShatakshiRajputResume.pdf', '_blank')}
                className="bg-apple-blue text-white px-6 py-3 rounded-full font-inter font-medium hover:bg-blue-600 transition-colors duration-200 w-full text-sm sm:text-base"
              >
                View Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
