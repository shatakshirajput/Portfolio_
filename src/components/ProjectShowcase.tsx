import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: 'Wandrovia',
      description: 'Travel listing & booking web app with comprehensive property management, secure user authentication, and interactive map integration.',
      image: '/Screenshot 2025-07-03 213641.png',
      technologies: ['MongoDB', 'EJS', 'TailwindCSS', 'Mapbox'],
      highlights: ['MVC Pattern', 'Cloud Storage', 'Responsive UI', 'Real-time Booking'],
      github: 'https://github.com/shatakshirajput/wandrovia',
      live: 'https://wandrovia.onrender.com/'
    },
    {
      title: 'IntriAI',
      description: 'AI-powered SaaS platform that redesigns any room photo based on user-selected room type and design style, with credit-based usage and Stripe payment integration.',
      image: '/Screenshot 2025-07-03 222311.png',
      technologies: ['Next.js', 'Firebase', 'Replicate API', 'Clerk', 'NeonDB', 'Drizzle ORM', 'Stripe'],
      highlights: ['AI Image Redesign', 'Room Type Selection', 'SaaS Credit System', 'Stripe Payments'],
      github: '#',
      live: 'https://intriai.vercel.app/'
    },
    {
      title: 'GitHub Clone - DevSync',
      description: 'A version control system platform inspired by GitHub, supporting repository creation, commits, branches, and collaboration tools using the MERN stack.',
      image: '/Screenshot 2025-07-03 225126.png',
      technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
      highlights: ['Repo Management', 'Commit History', 'Branching', 'Collaborator Access'],
      github: '#',
      live: '#'
    }
  ];

  useEffect(() => {
    const projectCards = sectionRef.current?.querySelectorAll('.project-card');

    projectCards?.forEach((card, index) => {
      const isEven = index % 2 === 0;

      gsap.fromTo(card.querySelector('.project-image'),
        { x: isEven ? -100 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(card.querySelector('.project-content'),
        { x: isEven ? 100 : -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-6">
            Featured Projects
          </h2>
          <p className="font-inter text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Real-world applications showcasing full-stack development and problem-solving skills
          </p>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`project-card grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Project Image */}
              <div className={`project-image ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative group cursor-pointer">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 sm:h-72 md:h-80 lg:h-[22rem] object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/90 p-3 rounded-full hover:bg-white transition-colors duration-200"
                      >
                        <Github className="w-6 h-6 text-gray-900" />
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/90 p-3 rounded-full hover:bg-white transition-colors duration-200"
                      >
                        <ExternalLink className="w-6 h-6 text-gray-900" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className={`project-content ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <h3 className="font-outfit font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-4">
                  {project.title}
                </h3>
                <p className="font-inter text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Project Highlights */}
                <div className="mb-6">
                  <h4 className="font-inter font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-2 h-2 bg-apple-blue rounded-full mr-3"></div>
                        <span className="font-inter text-gray-700 text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-apple-light-gray text-gray-700 px-3 py-1 rounded-full text-sm font-inter"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-inter font-medium hover:bg-gray-800 transition-colors duration-200"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-apple-blue text-white px-6 py-3 rounded-full font-inter font-medium hover:bg-blue-600 transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
