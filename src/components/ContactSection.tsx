import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Linkedin, Twitter, Send } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const formFields = formRef.current?.querySelectorAll('.form-field');
    const socialButtons = sectionRef.current?.querySelectorAll('.social-button');

    if (formFields) {
      gsap.fromTo(formFields, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    if (socialButtons) {
      gsap.fromTo(socialButtons, { opacity: 0, scale: 0.8 }, {
        opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, delay: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success("Message sent successfully! I'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/shatakshirajput', label: 'GitHub', color: 'hover:bg-gray-900' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/shatakshi-rajput/', label: 'LinkedIn', color: 'hover:bg-blue-600' },
    { icon: Twitter, href: 'https://twitter.com/shatakshirajput', label: 'Twitter', color: 'hover:bg-blue-500' },
    { icon: Mail, href: 'mailto:shatakshirajput02@gmail.com', label: 'Email', color: 'hover:bg-red-500' }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-4 sm:px-6 md:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-gray-900 mb-6">
            Let's Work Together
          </h2>
          <p className="font-inter text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="form-field">
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
              <input
                id="name" name="name" type="text" required
                value={formData.name} onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-2xl bg-apple-light-gray text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-apple-blue"
              />
            </div>

            <div className="form-field">
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
              <input
                id="email" name="email" type="email" required
                value={formData.email} onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-2xl bg-apple-light-gray text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-apple-blue"
              />
            </div>

            <div className="form-field">
              <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">Message</label>
              <textarea
                id="message" name="message" rows={6} required
                value={formData.message} onChange={handleInputChange}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 rounded-2xl bg-apple-light-gray text-gray-900 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-apple-blue"
              />
            </div>

            <button
              type="submit" disabled={isSubmitting}
              className="w-full bg-apple-blue text-white px-8 py-4 rounded-2xl font-medium flex justify-center items-center gap-2 transition duration-300 hover:bg-blue-600 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-between space-y-12">
            <div>
              <h3 className="font-outfit font-bold text-2xl text-gray-900 mb-4">Get In Touch</h3>
              <p className="font-inter text-gray-600 mb-6">
                I'm always open to discussing new opportunities or just chatting about dev life.
              </p>

              <div className="bg-apple-light-gray rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-6 h-6 text-apple-blue mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a href="mailto:shatakshirajput02@gmail.com" className="text-apple-blue hover:underline text-sm">
                      shatakshirajput02@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Connect with me</h4>
              <div className="flex gap-3 flex-wrap">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx} href={social.href} target="_blank" rel="noopener noreferrer"
                    className={`social-button p-3 bg-apple-light-gray rounded-2xl text-gray-700 ${social.color} hover:text-white transition transform hover:scale-110`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-apple-blue/10 to-purple-500/10 rounded-2xl p-6">
              <h4 className="font-outfit font-bold text-xl text-gray-900 mb-2">Ready to start a project?</h4>
              <p className="font-inter text-gray-600 mb-4">
                Let’s build something meaningful together. I’m excited to collaborate!
              </p>
              <a
                href="/ShatakshiRajputResume.pdf"
                download
                className="bg-white text-apple-blue px-6 py-3 rounded-full font-medium inline-block hover:bg-gray-50 transition"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
