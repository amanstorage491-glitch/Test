import { useEffect, useRef, useState } from 'react';
import SEO, { organizationSchema } from '../components/SEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!contentRef.current) return;
    const triggers: ScrollTrigger[] = [];
    const sections = contentRef.current.querySelectorAll('.animate-section');
    sections.forEach((section) => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(section, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out' });
        },
        once: true,
      });
      triggers.push(st);
    });
    return () => { triggers.forEach((st) => st.kill()); };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', company: '', projectType: '', message: '' });
    }, 3000);
  };

  return (
    <>
      <SEO
        title="Contact"
        description="Ready to engineer and elevate? Get in touch with Nexus Creative Systems to discuss your project."
        keywords="contact nexus creative, start project, get quote, hire agency, software development quote"
        structuredData={organizationSchema}
      />

      <div className="pt-32 lg:pt-40" ref={contentRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 pb-32 lg:pb-48">
            {/* Left - Info */}
            <div className="animate-section" style={{ opacity: 0 }}>
              <span className="text-[#FFB800] text-xs font-medium tracking-[0.3em] uppercase mb-4 block">Start a Project</span>
              <h1 className="font-display text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-none tracking-tight mb-8">
                Initiate<br/><span className="text-white/30">Project</span>
              </h1>
              <p className="text-white/40 text-base lg:text-lg leading-relaxed mb-12 max-w-md">
                Ready to build something exceptional? Tell us about your project and we will craft a tailored solution that engineers success and elevates your brand.
              </p>

              <div className="space-y-8 mb-12">
                <div>
                  <span className="text-white/30 text-xs tracking-[0.2em] uppercase block mb-2">Email</span>
                  <a href="mailto:hello@nexuscreative.systems" className="text-white hover:text-[#FFB800] transition-colors text-lg">
                    hello@nexuscreative.systems
                  </a>
                </div>
                <div>
                  <span className="text-white/30 text-xs tracking-[0.2em] uppercase block mb-2">Location</span>
                  <p className="text-white text-lg">Global Operations, Remote First</p>
                </div>
                <div>
                  <span className="text-white/30 text-xs tracking-[0.2em] uppercase block mb-2">Availability</span>
                  <p className="text-white text-lg">Currently accepting new projects</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white/30 text-xs tracking-[0.2em] uppercase">Typical Response Time</h4>
                <p className="text-white/50 text-sm">We respond to all inquiries within 24 hours during business days.</p>
              </div>
            </div>

            {/* Right - Form */}
            <div className="animate-section" style={{ opacity: 0 }}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-[#FFB800] flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-[#FFB800]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white mb-2">Message Received</h3>
                  <p className="text-white/50">We will be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-white/30 text-xs tracking-[0.2em] uppercase block mb-3">Name *</label>
                      <input type="text" required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-[#FFB800] transition-colors placeholder:text-white/20" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="text-white/30 text-xs tracking-[0.2em] uppercase block mb-3">Email *</label>
                      <input type="email" required value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-[#FFB800] transition-colors placeholder:text-white/20" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-white/30 text-xs tracking-[0.2em] uppercase block mb-3">Company</label>
                      <input type="text" value={formState.company} onChange={(e) => setFormState({ ...formState, company: e.target.value })} className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-[#FFB800] transition-colors placeholder:text-white/20" placeholder="Company name" />
                    </div>
                    <div>
                      <label className="text-white/30 text-xs tracking-[0.2em] uppercase block mb-3">Project Type</label>
                      <select value={formState.projectType} onChange={(e) => setFormState({ ...formState, projectType: e.target.value })} className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-[#FFB800] transition-colors appearance-none cursor-pointer" style={{ background: 'transparent' }}>
                        <option value="" className="bg-black">Select type</option>
                        <option value="software" className="bg-black">Custom Software</option>
                        <option value="hardware" className="bg-black">Hardware / IoT</option>
                        <option value="web" className="bg-black">Web Development</option>
                        <option value="brand" className="bg-black">Brand & Creative</option>
                        <option value="marketing" className="bg-black">Digital Marketing</option>
                        <option value="other" className="bg-black">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-white/30 text-xs tracking-[0.2em] uppercase block mb-3">Project Details</label>
                    <textarea rows={4} value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-[#FFB800] transition-colors resize-none placeholder:text-white/20" placeholder="Tell us about your project..." />
                  </div>
                  <button type="submit" className="group flex items-center gap-4 px-10 py-5 bg-[#FFB800] text-black text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white transition-colors duration-500 mt-8">
                    Submit Inquiry
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
