import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO, { serviceSchema } from '../components/SEO';
import { services } from '../data/services';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    if (headerRef.current) {
      const st = ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(headerRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' });
        },
        once: true,
      });
      triggers.push(st);
    }

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(card, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out', delay: (i % 3) * 0.1 });
        },
        once: true,
      });
      triggers.push(st);
    });

    return () => { triggers.forEach((st) => st.kill()); };
  }, []);

  const structuredData = services.map((s) =>
    serviceSchema(s.title, s.description, `https://nexuscreative.systems/services/${s.slug}`)
  );

  return (
    <>
      <SEO
        title="Services"
        description="Explore our six core capabilities: Custom Software, Hardware & IoT, Web Development, Brand Strategy, Video Production, and Digital Marketing."
        keywords="custom software development, hardware IoT, web development, brand strategy, video production, digital marketing, services"
        structuredData={{ '@context': 'https://schema.org', '@graph': structuredData }}
      />

      <div className="pt-32 lg:pt-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div ref={headerRef} className="mb-20 lg:mb-28" style={{ opacity: 0 }}>
            <span className="text-[#FFB800] text-xs font-medium tracking-[0.3em] uppercase mb-4 block">Our Services</span>
            <h1 className="font-display text-4xl lg:text-6xl xl:text-8xl font-bold text-white leading-none tracking-tight mb-6">
              The Execution<br/><span className="text-white/30">Matrix</span>
            </h1>
            <p className="text-white/40 text-base lg:text-lg max-w-xl leading-relaxed">
              Six core capabilities across two disciplines. Every service is delivered with the same standard: technical excellence meets creative impact.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-32 lg:pb-48">
            {services.map((service, i) => (
              <div
                key={service.slug}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="shimmer-border group relative bg-transparent border border-white/10 p-8 lg:p-10 hover:border-white/20 transition-all duration-500 flex flex-col"
                style={{ opacity: 0 }}
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="text-[#FFB800]/60 font-display text-sm font-medium">0{i + 1}</span>
                  <span className={`text-[10px] tracking-[0.2em] uppercase font-medium px-3 py-1 border ${
                    service.category === 'Engineer'
                      ? 'border-[#FFB800]/30 text-[#FFB800]/70'
                      : 'border-white/20 text-white/50'
                  }`}>
                    {service.category}
                  </span>
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-semibold text-white mb-4 group-hover:text-[#FFB800] transition-colors duration-500">
                  {service.shortTitle}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="text-[10px] tracking-wider uppercase text-white/30 border border-white/10 px-2.5 py-1">{tag}</span>
                  ))}
                </div>
                <Link
                  to={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-[#FFB800] text-xs tracking-[0.2em] uppercase hover:text-white transition-colors"
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
