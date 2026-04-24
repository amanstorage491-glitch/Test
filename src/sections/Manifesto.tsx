import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    // Line draw animation
    if (lineRef.current) {
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            lineRef.current,
            { scaleY: 0 },
            { scaleY: 1, duration: 1.5, ease: 'power3.inOut' }
          );
        },
        once: true,
      });
      triggers.push(st);
    }

    // Left content
    if (leftRef.current) {
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(
            leftRef.current,
            { x: -60, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.3 }
          );
        },
        once: true,
      });
      triggers.push(st);
    }

    // Right content
    if (rightRef.current) {
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(
            rightRef.current,
            { x: 60, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.5 }
          );
        },
        once: true,
      });
      triggers.push(st);
    }

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative min-h-screen flex items-center"
      style={{ zIndex: 2 }}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Engineer */}
        <div
          ref={leftRef}
          className="relative flex flex-col justify-center px-8 lg:px-20 py-24 lg:py-0"
          style={{ background: '#1A1A24', opacity: 0 }}
        >
          <div className="max-w-lg">
            <span className="text-[#FFB800] text-xs font-medium tracking-[0.3em] uppercase mb-6 block">
              Technical Execution
            </span>
            <h2 className="font-display text-5xl lg:text-7xl font-bold text-white leading-none tracking-tight mb-8">
              WE
              <br />
              ENGINEER
            </h2>
            <p className="text-white/50 text-base lg:text-lg leading-relaxed mb-8">
              Bespoke software architectures, hardware integrations, and scalable web platforms built with precision engineering and future-proof design patterns.
            </p>
            <ul className="space-y-3">
              {[
                'Custom Software Development',
                'Hardware & IoT Solutions',
                'Enterprise Web Platforms',
                'System Architecture & DevOps',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/40 text-sm">
                  <span className="w-1.5 h-1.5 bg-[#FFB800] rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center Divider Line */}
        <div
          ref={lineRef}
          className="hidden lg:block absolute left-1/2 top-[15%] bottom-[15%] w-px origin-top"
          style={{
            background: 'linear-gradient(to bottom, transparent, #FFB800, transparent)',
            transform: 'scaleY(0)',
          }}
        />

        {/* Right Side - Elevate */}
        <div
          ref={rightRef}
          className="relative flex flex-col justify-center px-8 lg:px-20 py-24 lg:py-0 bg-black"
          style={{ opacity: 0 }}
        >
          <div className="max-w-lg lg:ml-auto">
            <span className="text-[#FFB800] text-xs font-medium tracking-[0.3em] uppercase mb-6 block">
              Creative Growth
            </span>
            <h2 className="font-display text-5xl lg:text-7xl font-bold text-white leading-none tracking-tight mb-8">
              WE
              <br />
              ELEVATE
            </h2>
            <p className="text-white/50 text-base lg:text-lg leading-relaxed mb-8">
              Cinematic brand storytelling, digital growth strategies, and high-impact creative execution that transforms market presence.
            </p>
            <ul className="space-y-3">
              {[
                'Brand Strategy & Identity',
                'Cinematic Video Production',
                'Digital Marketing & SEO',
                'Creative Direction',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/40 text-sm">
                  <span className="w-1.5 h-1.5 bg-[#FFB800] rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
