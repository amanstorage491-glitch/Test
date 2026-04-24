import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    id: '01',
    title: 'Fintech Dashboard Platform',
    category: 'Custom Software',
    image: '/images/case-study-1.jpg',
    description: 'Real-time analytics platform processing 2M+ transactions daily for a leading fintech startup.',
    metrics: ['2M+ Daily Transactions', '40% Efficiency Gain', 'Series B Funded'],
  },
  {
    id: '02',
    title: 'Industrial IoT Gateway',
    category: 'Hardware & IoT',
    image: '/images/case-study-2.jpg',
    description: 'Custom IoT gateway connecting 500+ industrial sensors with cloud analytics infrastructure.',
    metrics: ['500+ Sensors', '99.9% Uptime', '30% Cost Reduction'],
  },
  {
    id: '03',
    title: 'Luxury Brand Campaign',
    category: 'Creative Production',
    image: '/images/case-study-3.jpg',
    description: 'Cinematic brand film and digital campaign that increased engagement by 340% for a luxury fashion house.',
    metrics: ['340% Engagement', '12M Views', 'Award Winning'],
  },
];

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const triggers: ScrollTrigger[] = [];

    // Header animation
    if (headerRef.current) {
      const st = ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            headerRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
          );
        },
        once: true,
      });
      triggers.push(st);
    }

    // Cards entrance
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(
            card,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power4.out',
              delay: i * 0.15,
            }
          );
        },
        once: true,
      });
      triggers.push(st);
    });

    // Horizontal scroll for desktop
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const scrollWidth = track.scrollWidth - window.innerWidth + 200;

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top 10%',
        end: () => `+=${scrollWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          gsap.set(track, {
            x: -scrollWidth * self.progress,
          });
        },
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((st) => st.kill());
      mm.revert();
    };
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-32 lg:py-0 lg:min-h-screen bg-black overflow-hidden"
      style={{ zIndex: 2 }}
    >
      {/* Section Header */}
      <div ref={headerRef} className="lg:absolute lg:top-16 lg:left-12 px-6 lg:px-0 mb-12 lg:mb-0" style={{ opacity: 0 }}>
        <span className="text-[#FFB800] text-xs font-medium tracking-[0.3em] uppercase mb-4 block">
          Selected Work
        </span>
        <h2 className="font-display text-4xl lg:text-6xl font-bold text-white leading-none tracking-tight">
          Proof of
          <br />
          <span className="text-white/30">Concept</span>
        </h2>
      </div>

      {/* Horizontal Track */}
      <div
        ref={trackRef}
        className="horizontal-scroll-container lg:flex-nowrap px-6 lg:px-0 lg:pl-12 lg:pt-48 lg:pb-24"
      >
        {/* Spacer for header on desktop */}
        <div className="hidden lg:block min-w-[400px] xl:min-w-[500px] shrink-0" />

        {caseStudies.map((study, i) => (
          <div
            key={study.id}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="group flex-shrink-0 w-full lg:w-[70vw] xl:w-[60vw] relative"
            style={{ opacity: 0 }}
          >
            <div className="relative overflow-hidden border border-white/10 hover:border-[#FFB800]/30 transition-colors duration-700">
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* View Case overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-24 h-24 rounded-full border border-[#FFB800] flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <span className="text-[#FFB800] text-xs font-medium tracking-wider uppercase">
                      View
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[#FFB800]/60 font-display text-sm">
                    {study.id}
                  </span>
                  <span className="text-white/40 text-xs tracking-[0.2em] uppercase">
                    {study.category}
                  </span>
                </div>

                <h3 className="font-display text-2xl lg:text-4xl font-semibold text-white mb-3 group-hover:text-[#FFB800] transition-colors duration-500">
                  {study.title}
                </h3>

                <p className="text-white/50 text-sm lg:text-base max-w-lg mb-6 hidden lg:block">
                  {study.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {study.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="text-[10px] lg:text-xs tracking-wider uppercase text-[#FFB800]/70 border border-[#FFB800]/20 px-3 py-1.5"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* End spacer */}
        <div className="hidden lg:block min-w-[100px] shrink-0" />
      </div>
    </section>
  );
}
