import { useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Fintech Dashboard Platform',
    category: 'Custom Software',
    image: '/images/case-study-1.jpg',
    description: 'Real-time analytics platform processing 2M+ transactions daily for a leading fintech startup. Built with React, Node.js, and AWS infrastructure.',
    metrics: ['2M+ Daily Transactions', '40% Efficiency Gain', 'Series B Funded'],
    tags: ['React', 'Node.js', 'AWS', 'PostgreSQL'],
  },
  {
    title: 'Industrial IoT Gateway',
    category: 'Hardware & IoT',
    image: '/images/case-study-2.jpg',
    description: 'Custom IoT gateway connecting 500+ industrial sensors with cloud analytics infrastructure. Embedded firmware and real-time data pipeline.',
    metrics: ['500+ Sensors', '99.9% Uptime', '30% Cost Reduction'],
    tags: ['ESP32', 'MQTT', 'AWS IoT', 'C++'],
  },
  {
    title: 'Luxury Brand Campaign',
    category: 'Creative Production',
    image: '/images/case-study-3.jpg',
    description: 'Cinematic brand film and digital campaign that increased engagement by 340% for a luxury fashion house. Multi-platform distribution.',
    metrics: ['340% Engagement', '12M Views', 'Award Winning'],
    tags: ['Cinema 4D', 'Premiere', 'Social', 'Strategy'],
  },
  {
    title: 'E-Commerce Platform Rebuild',
    category: 'Web Development',
    image: '/images/case-study-1.jpg',
    description: 'Headless e-commerce platform with sub-second load times, increasing conversion rate by 65% for a direct-to-consumer brand.',
    metrics: ['65% Conversion Lift', '0.8s Load Time', '3x Revenue'],
    tags: ['Next.js', 'Shopify', 'Vercel', 'Stripe'],
  },
  {
    title: 'SaaS Product Launch',
    category: 'Custom Software',
    image: '/images/abstract-shapes.jpg',
    description: 'End-to-end SaaS product from concept to 10,000 users in 6 months. Including product strategy, full-stack development, and go-to-market.',
    metrics: ['10K Users', '6 Month Launch', '$2M ARR'],
    tags: ['React', 'Python', 'AWS', 'Stripe'],
  },
  {
    title: 'Brand Identity System',
    category: 'Brand Strategy',
    image: '/images/case-study-3.jpg',
    description: 'Complete brand overhaul for a Series A tech company. New identity, guidelines, website, and launch campaign delivered in 10 weeks.',
    metrics: ['200% Brand Awareness', '10 Week Delivery', 'Series A Funded'],
    tags: ['Figma', 'Strategy', 'Web', 'Campaign'],
  },
];

export default function Work() {
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

  return (
    <>
      <SEO
        title="Our Work"
        description="Explore our portfolio of projects spanning custom software, hardware & IoT, web development, brand strategy, video production, and digital marketing."
        keywords="portfolio, case studies, projects, software development, web development, branding, video production"
      />

      <div className="pt-32 lg:pt-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div ref={headerRef} className="mb-20 lg:mb-28" style={{ opacity: 0 }}>
            <span className="text-[#FFB800] text-xs font-medium tracking-[0.3em] uppercase mb-4 block">Portfolio</span>
            <h1 className="font-display text-4xl lg:text-6xl xl:text-8xl font-bold text-white leading-none tracking-tight mb-6">
              Proof of<br/><span className="text-white/30">Concept</span>
            </h1>
            <p className="text-white/40 text-base lg:text-lg max-w-xl leading-relaxed">
              Real projects for real clients. Each one represents the intersection of engineering precision and creative vision.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-32 lg:pb-48">
            {projects.map((project, i) => (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="group relative overflow-hidden border border-white/10 hover:border-[#FFB800]/30 transition-colors duration-700"
                style={{ opacity: 0 }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                </div>
                <div className="p-6 lg:p-8">
                  <span className="text-[#FFB800]/60 font-display text-sm block mb-2">0{i + 1}</span>
                  <span className="text-white/40 text-xs tracking-[0.2em] uppercase block mb-3">{project.category}</span>
                  <h3 className="font-display text-2xl lg:text-3xl font-semibold text-white mb-3 group-hover:text-[#FFB800] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.metrics.map((m) => (
                      <span key={m} className="text-[10px] tracking-wider uppercase text-[#FFB800]/70 border border-[#FFB800]/20 px-2.5 py-1">
                        {m}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] tracking-wider uppercase text-white/30 border border-white/10 px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
