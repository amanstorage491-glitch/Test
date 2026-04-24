import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    title: 'Custom Software',
    category: 'Engineer',
    description:
      'Full-stack development of bespoke software solutions, from enterprise applications to microservices architectures.',
    tags: ['React', 'Node.js', 'Python', 'Cloud'],
  },
  {
    id: '02',
    title: 'Hardware & IoT',
    category: 'Engineer',
    description:
      'Embedded systems, IoT integrations, sensor networks, and hardware-software bridging solutions.',
    tags: ['Embedded', 'IoT', 'Raspberry Pi', 'Arduino'],
  },
  {
    id: '03',
    title: 'Web Development',
    category: 'Engineer',
    description:
      'High-performance websites, e-commerce platforms, and web applications with cutting-edge technologies.',
    tags: ['Next.js', 'Three.js', 'Shopify', 'Headless'],
  },
  {
    id: '04',
    title: 'Brand Promotion',
    category: 'Elevate',
    description:
      'Strategic brand positioning, identity systems, and market penetration strategies for growth.',
    tags: ['Strategy', 'Identity', 'Positioning', 'Launch'],
  },
  {
    id: '05',
    title: 'Cinematic Editing',
    category: 'Elevate',
    description:
      'High-end video production, post-production, color grading, and motion design for brands.',
    tags: ['Premiere', 'After Effects', 'Color', 'Motion'],
  },
  {
    id: '06',
    title: 'Digital Marketing',
    category: 'Elevate',
    description:
      'Data-driven marketing campaigns, SEO, social strategy, and conversion optimization.',
    tags: ['SEO', 'PPC', 'Social', 'Analytics'],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    // Title animation
    if (titleRef.current) {
      const st = ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            titleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
          );
        },
        once: true,
      });
      triggers.push(st);
    }

    // Cards stagger animation
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 88%',
        onEnter: () => {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power4.out',
              delay: (i % 3) * 0.1,
            }
          );
        },
        once: true,
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 lg:py-48 bg-black"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="mb-20 lg:mb-28" style={{ opacity: 0 }}>
          <span className="text-[#FFB800] text-xs font-medium tracking-[0.3em] uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="font-display text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-none tracking-tight mb-6">
            The Execution
            <br />
            <span className="text-white/30">Matrix</span>
          </h2>
          <p className="text-white/40 text-base lg:text-lg max-w-xl leading-relaxed">
            Six core capabilities. Two integrated disciplines. One strategic partner for building and growing your digital presence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="shimmer-border group relative bg-transparent border border-white/10 p-8 lg:p-10 hover:border-white/20 transition-all duration-500"
              style={{ opacity: 0 }}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-8">
                <span className="text-[#FFB800]/60 font-display text-sm font-medium">
                  {service.id}
                </span>
                <span
                  className={`text-[10px] tracking-[0.2em] uppercase font-medium px-3 py-1 border ${
                    service.category === 'Engineer'
                      ? 'border-[#FFB800]/30 text-[#FFB800]/70'
                      : 'border-white/20 text-white/50'
                  }`}
                >
                  {service.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl lg:text-3xl font-semibold text-white mb-4 group-hover:text-[#FFB800] transition-colors duration-500">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                {service.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-wider uppercase text-white/30 border border-white/10 px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg
                  className="w-5 h-5 text-[#FFB800]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
