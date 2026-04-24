import { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO, { serviceSchema } from '../components/SEO';
import { getServiceBySlug, services } from '../data/services';

gsap.registerPlugin(ScrollTrigger);

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || '');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const triggers: ScrollTrigger[] = [];
    const sections = contentRef.current.querySelectorAll('.animate-section');
    sections.forEach((section) => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(section, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out' });
        },
        once: true,
      });
      triggers.push(st);
    });
    return () => { triggers.forEach((st) => st.kill()); };
  }, [slug]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <SEO
        title={service.title}
        description={service.longDescription}
        keywords={`${service.tags.join(', ')}, nexus creative, ${service.title.toLowerCase()}`}
        url={`https://nexuscreative.systems/services/${service.slug}`}
        structuredData={serviceSchema(service.title, service.longDescription, `https://nexuscreative.systems/services/${service.slug}`)}
      />

      <div className="pt-32 lg:pt-40" ref={contentRef}>
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 animate-section" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-6">
            <Link to="/services" className="text-white/30 text-xs tracking-[0.2em] uppercase hover:text-[#FFB800] transition-colors">
              Services
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-[#FFB800] text-xs tracking-[0.2em] uppercase">{service.category}</span>
          </div>
          <h1 className="font-display text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-none tracking-tight mb-8">
            {service.title}
          </h1>
          <p className="text-white/50 text-lg lg:text-xl max-w-2xl leading-relaxed mb-12">
            {service.longDescription}
          </p>
          <div className="relative aspect-video overflow-hidden border border-white/10 mb-16">
            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>

        {/* Features */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 animate-section mb-24 lg:mb-32" style={{ opacity: 0 }}>
          <span className="text-[#FFB800] text-xs font-medium tracking-[0.3em] uppercase mb-6 block">What You Get</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-4 border border-white/10 p-6 hover:border-[#FFB800]/30 transition-colors">
                <span className="text-[#FFB800] font-display text-lg font-medium shrink-0">0{i + 1}</span>
                <span className="text-white/60 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 animate-section mb-24 lg:mb-32" style={{ opacity: 0 }}>
          <span className="text-[#FFB800] text-xs font-medium tracking-[0.3em] uppercase mb-6 block">Technology Stack</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight mb-12">
            Tools & Technologies
          </h2>
          <div className="flex flex-wrap gap-3">
            {service.technologies.map((tech) => (
              <span key={tech} className="text-sm text-white/60 border border-white/10 px-4 py-2 hover:border-[#FFB800]/30 hover:text-[#FFB800] transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 animate-section mb-24 lg:mb-32" style={{ opacity: 0 }}>
          <span className="text-[#FFB800] text-xs font-medium tracking-[0.3em] uppercase mb-6 block">Our Process</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight mb-12">
            How We Deliver
          </h2>
          <div className="space-y-8">
            {service.process.map((step, i) => {
              const [title, desc] = step.split(' — ');
              return (
                <div key={i} className="flex gap-6 lg:gap-8 items-start">
                  <span className="font-display text-3xl lg:text-4xl font-bold text-[#FFB800]/20 shrink-0 w-16">0{i + 1}</span>
                  <div>
                    <h4 className="text-white font-medium text-lg mb-1">{title}</h4>
                    <p className="text-white/40 text-sm">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 animate-section mb-24 lg:mb-32" style={{ opacity: 0 }}>
          <span className="text-[#FFB800] text-xs font-medium tracking-[0.3em] uppercase mb-6 block">Common Questions</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight mb-12">
            Frequently Asked
          </h2>
          <div className="space-y-6">
            {service.faq.map((item, i) => (
              <div key={i} className="border border-white/10 p-6 lg:p-8">
                <h4 className="text-white font-medium mb-3">{item.question}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Services */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 animate-section mb-32 lg:mb-48" style={{ opacity: 0 }}>
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-8">
            Related Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.slice(0, 3).map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="group border border-white/10 p-6 hover:border-[#FFB800]/30 transition-colors"
              >
                <span className={`text-[10px] tracking-[0.2em] uppercase font-medium px-2 py-1 border mb-4 inline-block ${
                  s.category === 'Engineer' ? 'border-[#FFB800]/30 text-[#FFB800]/70' : 'border-white/20 text-white/50'
                }`}>
                  {s.category}
                </span>
                <h3 className="font-display text-xl font-semibold text-white group-hover:text-[#FFB800] transition-colors">
                  {s.shortTitle}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center pb-32 lg:pb-48 animate-section" style={{ opacity: 0 }}>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            Ready to <span className="text-[#FFB800]">{service.category === 'Engineer' ? 'Build' : 'Elevate'}</span>?
          </h2>
          <p className="text-white/40 text-base lg:text-lg max-w-xl mx-auto leading-relaxed mb-10">
            Let us discuss how {service.title.toLowerCase()} can transform your business.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-3 px-10 py-5 bg-[#FFB800] text-black text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white transition-colors duration-500">
            Start a Project
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </Link>
        </div>
      </div>
    </>
  );
}
