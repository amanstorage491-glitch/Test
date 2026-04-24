import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We dive deep into your business, market, and technical requirements. Understanding the full landscape before writing a single line of code.',
  },
  {
    number: '02',
    title: 'Architecture',
    description:
      'We design the system blueprint—technical architecture, brand strategy, and creative direction aligned as one cohesive plan.',
  },
  {
    number: '03',
    title: 'Execution',
    description:
      'Our engineers and creatives work in parallel. Software is built, hardware is prototyped, brands are crafted simultaneously.',
  },
  {
    number: '04',
    title: 'Launch',
    description:
      'Deployment with precision. We ensure everything works at scale, looks exceptional, and delivers measurable growth from day one.',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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

    // Steps animation with connecting line
    stepsRef.current.forEach((step, i) => {
      if (!step) return;
      const st = ScrollTrigger.create({
        trigger: step,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            step,
            { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: 'power4.out' }
          );
        },
        once: true,
      });
      triggers.push(st);
    });

    // Progress line
    if (progressRef.current) {
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            gsap.set(progressRef.current, {
              scaleY: self.progress,
            });
          }
        },
      });
      triggers.push(st);
    }

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-32 lg:py-48 bg-black"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="mb-20 lg:mb-32" style={{ opacity: 0 }}>
          <span className="text-[#FFB800] text-xs font-medium tracking-[0.3em] uppercase mb-4 block">
            How We Work
          </span>
          <h2 className="font-display text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-none tracking-tight mb-6">
            The System
            <br />
            <span className="text-white/30">Architecture</span>
          </h2>
          <p className="text-white/40 text-base lg:text-lg max-w-xl leading-relaxed">
            A proven four-phase methodology that bridges technical precision and creative excellence.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Vertical Progress Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#FFB800] to-[#FFB800]/30 origin-top"
              style={{ height: '100%', transform: 'scaleY(0)' }}
            />
          </div>

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { stepsRef.current[i] = el; }}
                className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center ${
                  i % 2 === 1 ? 'lg:text-right' : ''
                }`}
                style={{ opacity: 0 }}
              >
                {/* Content */}
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`flex items-center gap-4 mb-6 ${i % 2 === 1 ? 'lg:justify-end' : ''}`}>
                    <span className="font-display text-6xl lg:text-8xl font-bold text-[#FFB800]/20 leading-none">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl lg:text-4xl font-semibold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-white/40 text-base leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>

                {/* Spacer for alternating layout */}
                <div className={i % 2 === 1 ? 'lg:order-1' : ''} />

                {/* Center dot */}
                <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-[#FFB800] rounded-full border-4 border-black" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
