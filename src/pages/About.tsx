import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO, { organizationSchema } from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: '150+', label: 'Projects Delivered' },
  { number: '50+', label: 'Global Clients' },
  { number: '12', label: 'Countries Served' },
  { number: '98%', label: 'Client Retention' },
];

const values = [
  { title: 'Precision', desc: 'Every line of code, every pixel, every frame is crafted with intentional purpose.' },
  { title: 'Innovation', desc: 'We push boundaries while maintaining the discipline to ship what works.' },
  { title: 'Partnership', desc: 'We do not just deliver projects. We become an extension of your team.' },
  { title: 'Impact', desc: 'Everything we build is measured by the real business outcomes it creates.' },
];

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const animateOnScroll = (ref: React.RefObject<HTMLElement | null>, delay = 0) => {
      if (!ref.current) return;
      const st = ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(ref.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay });
        },
        once: true,
      });
      triggers.push(st);
    };

    animateOnScroll(heroRef, 0);
    animateOnScroll(statsRef, 0.2);
    animateOnScroll(storyRef, 0);
    animateOnScroll(valuesRef, 0);

    return () => { triggers.forEach((st) => st.kill()); };
  }, []);

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Nexus Creative Systems — a strategic execution partner combining custom software development, hardware solutions, web development, brand strategy, video production, and digital marketing."
        keywords="about nexus creative, technology agency, creative agency, hybrid agency, software company"
        structuredData={organizationSchema}
      />

      <div className="pt-32 lg:pt-40">
        {/* Hero */}
        <div ref={heroRef} className="max-w-7xl mx-auto px-6 lg:px-12 mb-24 lg:mb-32" style={{ opacity: 0 }}>
          <span className="text-[#FFB800] text-xs font-medium tracking-[0.3em] uppercase mb-6 block">About Us</span>
          <h1 className="font-display text-4xl lg:text-6xl xl:text-8xl font-bold text-white leading-none tracking-tight mb-8">
            We Are the<br/><span className="text-white/30">Bridge</span>
          </h1>
          <p className="text-white/50 text-lg lg:text-xl max-w-2xl leading-relaxed">
            Nexus Creative Systems exists because the world does not need another software shop or another creative agency. It needs a partner that can do both — exceptionally well.
          </p>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="border-y border-white/5" style={{ opacity: 0 }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {stats.map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <span className="font-display text-4xl lg:text-5xl font-bold text-[#FFB800] block mb-2">{stat.number}</span>
                  <span className="text-white/40 text-sm tracking-wider uppercase">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Story */}
        <div ref={storyRef} className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32" style={{ opacity: 0 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight mb-6">
                Born from a Simple Observation
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-6">
                We started Nexus Creative Systems after repeatedly witnessing the same problem: companies forced to manage multiple vendors for what should be a unified vision. Development teams building software without understanding the brand. Creative teams designing experiences that were technically impossible to implement.
              </p>
              <p className="text-white/50 text-base leading-relaxed mb-6">
                The result? Wasted budget, missed deadlines, and products that felt disjointed. We believed there was a better way.
              </p>
              <p className="text-white/50 text-base leading-relaxed">
                Today, we are a global team of engineers, designers, strategists, and creators who work as a single unit. We speak both languages — code and creativity — and we deliver work that proves it.
              </p>
            </div>
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight mb-6">
                How We Work
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-6">
                Our process is built on four principles that guide every engagement:
              </p>
              <div className="space-y-6">
                {[
                  { num: '01', title: 'Discovery First', desc: 'We never start building until we fully understand your business, audience, and objectives.' },
                  { num: '02', title: 'Unified Teams', desc: 'Our engineers and creatives work together from day one. No handoffs, no silos.' },
                  { num: '03', title: 'Measure Everything', desc: 'Every decision is backed by data. We track performance, iterate, and optimize.' },
                  { num: '04', title: 'Ship to Learn', desc: 'We believe in rapid prototyping and real-world testing. Perfect is the enemy of launched.' },
                ].map((item) => (
                  <div key={item.num} className="flex gap-4">
                    <span className="text-[#FFB800]/40 font-display text-lg font-medium shrink-0">{item.num}</span>
                    <div>
                      <h4 className="text-white font-medium mb-1">{item.title}</h4>
                      <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div ref={valuesRef} className="max-w-7xl mx-auto px-6 lg:px-12 pb-32 lg:pb-48" style={{ opacity: 0 }}>
          <span className="text-[#FFB800] text-xs font-medium tracking-[0.3em] uppercase mb-6 block">Our Values</span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-16">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {values.map((v, i) => (
              <div key={i} className="border border-white/10 p-8 lg:p-10 hover:border-[#FFB800]/30 transition-colors duration-500">
                <h3 className="font-display text-2xl font-semibold text-white mb-4">{v.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
