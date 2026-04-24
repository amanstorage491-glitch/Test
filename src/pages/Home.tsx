import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO, { organizationSchema, websiteSchema } from '../components/SEO';
import EventHorizon from '../components/EventHorizon';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const nexusRef = useRef<HTMLHeadingElement>(null);
  const creativeRef = useRef<HTMLHeadingElement>(null);
  const systemsRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    if (nexusRef.current) {
      const letters = nexusRef.current.querySelectorAll('.letter');
      tl.fromTo(letters, { y: 120, opacity: 0, filter: 'blur(10px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.08, ease: 'power4.out' }, 0);
    }

    if (creativeRef.current) {
      const letters = creativeRef.current.querySelectorAll('.letter');
      tl.fromTo(letters, { y: 120, opacity: 0, filter: 'blur(10px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.06, ease: 'power4.out' }, 0.3);
    }

    if (systemsRef.current) {
      const letters = systemsRef.current.querySelectorAll('.letter');
      tl.fromTo(letters, { y: 120, opacity: 0, filter: 'blur(10px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.05, ease: 'power4.out' }, 0.5);
    }

    tl.fromTo(taglineRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 1.2);
    tl.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 1.5);

    return () => { tl.kill(); };
  }, []);

  const splitText = (text: string) => text.split('').map((char, i) => (
    <span key={i} className="letter inline-block" style={{ willChange: 'transform, opacity, filter' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <>
      <SEO
        title="Nexus Creative Systems"
        description="Strategic execution partner at the intersection of technology and creativity. Custom software, hardware solutions, web development, brand strategy, video production, and digital marketing."
        keywords="custom software development, web development, hardware IoT solutions, brand strategy, video production, digital marketing, creative agency, technology company"
        structuredData={{ '@context': 'https://schema.org', '@graph': [organizationSchema, websiteSchema] }}
      />

      <EventHorizon />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ zIndex: 1 }}>
        <div className="relative text-center px-4">
          <h1 ref={nexusRef} className="font-display font-bold text-white text-glow leading-none tracking-[-0.04em]" style={{ fontSize: 'clamp(4rem, 15vw, 14rem)' }}>
            {splitText('NEXUS')}
          </h1>
          <div className="flex flex-col items-center -mt-2 md:-mt-6">
            <h2 ref={creativeRef} className="font-display font-medium text-white/90 text-glow leading-none tracking-[-0.02em]" style={{ fontSize: 'clamp(1.8rem, 6vw, 5.5rem)' }}>
              {splitText('CREATIVE')}
            </h2>
            <h2 ref={systemsRef} className="font-display font-medium text-[#FFB800] text-glow leading-none tracking-[-0.02em] -mt-1 md:-mt-3" style={{ fontSize: 'clamp(1.8rem, 6vw, 5.5rem)' }}>
              {splitText('SYSTEMS')}
            </h2>
          </div>
          <p ref={taglineRef} className="mt-8 md:mt-12 text-white/50 text-sm md:text-base tracking-[0.3em] uppercase font-light" style={{ opacity: 0 }}>
            Where Technology Meets Vision
          </p>
          <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center" style={{ opacity: 0 }}>
            <Link to="/about" className="group flex items-center gap-3 px-8 py-4 border border-white/20 text-white text-xs font-medium tracking-[0.2em] uppercase hover:border-[#FFB800] hover:text-[#FFB800] transition-all duration-500">
              Explore Our World
              <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* Manifesto */}
      <section id="manifesto" className="relative min-h-screen flex items-center" style={{ zIndex: 2 }}>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <div className="relative flex flex-col justify-center px-8 lg:px-20 py-24 lg:py-0" style={{ background: '#1A1A24' }}>
            <div className="max-w-lg">
              <span className="text-[#FFB800] text-xs font-medium tracking-[0.3em] uppercase mb-6 block">Technical Execution</span>
              <h2 className="font-display text-5xl lg:text-7xl font-bold text-white leading-none tracking-tight mb-8">WE<br/>ENGINEER</h2>
              <p className="text-white/50 text-base lg:text-lg leading-relaxed mb-8">
                Bespoke software architectures, hardware integrations, and scalable web platforms built with precision engineering and future-proof design patterns.
              </p>
              <ul className="space-y-3">
                {['Custom Software Development', 'Hardware & IoT Solutions', 'Enterprise Web Platforms', 'System Architecture & DevOps'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/40 text-sm">
                    <span className="w-1.5 h-1.5 bg-[#FFB800] rounded-full" />{item}
                  </li>
                ))}
              </ul>
              <Link to="/services" className="inline-flex items-center gap-2 mt-8 text-[#FFB800] text-xs tracking-[0.2em] uppercase hover:text-white transition-colors">
                View All Services <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
            </div>
          </div>
          <div className="relative flex flex-col justify-center px-8 lg:px-20 py-24 lg:py-0 bg-black">
            <div className="max-w-lg lg:ml-auto">
              <span className="text-[#FFB800] text-xs font-medium tracking-[0.3em] uppercase mb-6 block">Creative Growth</span>
              <h2 className="font-display text-5xl lg:text-7xl font-bold text-white leading-none tracking-tight mb-8">WE<br/>ELEVATE</h2>
              <p className="text-white/50 text-base lg:text-lg leading-relaxed mb-8">
                Cinematic brand storytelling, digital growth strategies, and high-impact creative execution that transforms market presence.
              </p>
              <ul className="space-y-3">
                {['Brand Strategy & Identity', 'Cinematic Video Production', 'Digital Marketing & SEO', 'Creative Direction'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/40 text-sm">
                    <span className="w-1.5 h-1.5 bg-[#FFB800] rounded-full" />{item}
                  </li>
                ))}
              </ul>
              <Link to="/services" className="inline-flex items-center gap-2 mt-8 text-[#FFB800] text-xs tracking-[0.2em] uppercase hover:text-white transition-colors">
                View All Services <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="relative py-32 lg:py-48 bg-black" style={{ zIndex: 2 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-20 lg:mb-28">
            <span className="text-[#FFB800] text-xs font-medium tracking-[0.3em] uppercase mb-4 block">What We Do</span>
            <h2 className="font-display text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-none tracking-tight mb-6">
              The Execution<br/><span className="text-white/30">Matrix</span>
            </h2>
            <p className="text-white/40 text-base lg:text-lg max-w-xl leading-relaxed">
              Six core capabilities. Two integrated disciplines. One strategic partner for building and growing your digital presence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: '01', title: 'Custom Software', cat: 'Engineer', desc: 'Full-stack development of bespoke software solutions.', slug: 'software' },
              { id: '02', title: 'Hardware & IoT', cat: 'Engineer', desc: 'Embedded systems, IoT integrations, sensor networks.', slug: 'hardware' },
              { id: '03', title: 'Web Development', cat: 'Engineer', desc: 'High-performance websites, e-commerce, web apps.', slug: 'web' },
              { id: '04', title: 'Brand Promotion', cat: 'Elevate', desc: 'Strategic brand positioning and identity systems.', slug: 'brand' },
              { id: '05', title: 'Cinematic Editing', cat: 'Elevate', desc: 'High-end video production and motion design.', slug: 'video' },
              { id: '06', title: 'Digital Marketing', cat: 'Elevate', desc: 'Data-driven campaigns, SEO, social strategy.', slug: 'marketing' },
            ].map((s) => (
              <Link key={s.id} to={`/services/${s.slug}`} className="shimmer-border group relative bg-transparent border border-white/10 p-8 lg:p-10 hover:border-white/20 transition-all duration-500">
                <div className="flex items-start justify-between mb-8">
                  <span className="text-[#FFB800]/60 font-display text-sm font-medium">{s.id}</span>
                  <span className={`text-[10px] tracking-[0.2em] uppercase font-medium px-3 py-1 border ${s.cat === 'Engineer' ? 'border-[#FFB800]/30 text-[#FFB800]/70' : 'border-white/20 text-white/50'}`}>{s.cat}</span>
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-semibold text-white mb-4 group-hover:text-[#FFB800] transition-colors duration-500">{s.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg className="w-5 h-5 text-[#FFB800]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="relative py-32 lg:py-48 bg-black" style={{ zIndex: 2 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-20 lg:mb-28">
            <span className="text-[#FFB800] text-xs font-medium tracking-[0.3em] uppercase mb-4 block">Selected Work</span>
            <h2 className="font-display text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-none tracking-tight mb-6">
              Proof of<br/><span className="text-white/30">Concept</span>
            </h2>
            <p className="text-white/40 text-base lg:text-lg max-w-xl leading-relaxed">
              Real projects, real results. See how we engineer and elevate for our clients.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { title: 'Fintech Dashboard Platform', cat: 'Custom Software', img: '/images/case-study-1.jpg', metrics: ['2M+ Daily Transactions', '40% Efficiency Gain', 'Series B Funded'] },
              { title: 'Industrial IoT Gateway', cat: 'Hardware & IoT', img: '/images/case-study-2.jpg', metrics: ['500+ Sensors', '99.9% Uptime', '30% Cost Reduction'] },
              { title: 'Luxury Brand Campaign', cat: 'Creative Production', img: '/images/case-study-3.jpg', metrics: ['340% Engagement', '12M Views', 'Award Winning'] },
            ].map((study, i) => (
              <div key={i} className="group relative overflow-hidden border border-white/10 hover:border-[#FFB800]/30 transition-colors duration-700">
                <div className="relative aspect-video overflow-hidden">
                  <img src={study.img} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>
                <div className="p-6 lg:p-8">
                  <span className="text-[#FFB800]/60 font-display text-sm block mb-2">0{i + 1}</span>
                  <span className="text-white/40 text-xs tracking-[0.2em] uppercase block mb-3">{study.cat}</span>
                  <h3 className="font-display text-xl lg:text-2xl font-semibold text-white mb-3 group-hover:text-[#FFB800] transition-colors">{study.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {study.metrics.map((m) => (
                      <span key={m} className="text-[10px] tracking-wider uppercase text-[#FFB800]/70 border border-[#FFB800]/20 px-2.5 py-1">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/work" className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white text-xs font-medium tracking-[0.2em] uppercase hover:border-[#FFB800] hover:text-[#FFB800] transition-all duration-500">
              View All Work
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 lg:py-48 bg-black" style={{ zIndex: 2 }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-[#FFB800] text-xs font-medium tracking-[0.3em] uppercase mb-6 block">Start Building</span>
          <h2 className="font-display text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-none tracking-tight mb-8">
            Ready to<br/><span className="text-white/30">Engineer & Elevate?</span>
          </h2>
          <p className="text-white/40 text-base lg:text-lg max-w-xl mx-auto leading-relaxed mb-12">
            Let us discuss your project. We will craft a tailored solution that combines technical excellence with creative impact.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="group flex items-center gap-3 px-10 py-5 bg-[#FFB800] text-black text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white transition-colors duration-500">
              Start a Project
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
            <Link to="/services" className="flex items-center gap-3 px-10 py-5 border border-white/20 text-white text-xs font-medium tracking-[0.2em] uppercase hover:border-[#FFB800] hover:text-[#FFB800] transition-all duration-500">
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
