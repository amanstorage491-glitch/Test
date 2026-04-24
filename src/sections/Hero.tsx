import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nexusRef = useRef<HTMLHeadingElement>(null);
  const creativeRef = useRef<HTMLHeadingElement>(null);
  const systemsRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Animate NEXUS letters
    if (nexusRef.current) {
      const letters = nexusRef.current.querySelectorAll('.letter');
      tl.fromTo(
        letters,
        { y: 120, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.08,
          ease: 'power4.out',
        },
        0
      );
    }

    // Animate CREATIVE letters
    if (creativeRef.current) {
      const letters = creativeRef.current.querySelectorAll('.letter');
      tl.fromTo(
        letters,
        { y: 120, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.06,
          ease: 'power4.out',
        },
        0.3
      );
    }

    // Animate SYSTEMS letters
    if (systemsRef.current) {
      const letters = systemsRef.current.querySelectorAll('.letter');
      tl.fromTo(
        letters,
        { y: 120, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.05,
          ease: 'power4.out',
        },
        0.5
      );
    }

    // Tagline fade in
    tl.fromTo(
      taglineRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      1.2
    );

    // CTA fade in
    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      1.5
    );

    return () => {
      tl.kill();
    };
  }, []);

  const splitText = (text: string) =>
    text.split('').map((char, i) => (
      <span key={i} className="letter inline-block" style={{ willChange: 'transform, opacity, filter' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Hero Text Content */}
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

        <p
          ref={taglineRef}
          className="mt-8 md:mt-12 text-white/50 text-sm md:text-base tracking-[0.3em] uppercase font-light"
          style={{ opacity: 0 }}
        >
          Where Technology Meets Vision
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center" style={{ opacity: 0 }}>
          <a
            href="#manifesto"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#manifesto')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center gap-3 px-8 py-4 border border-white/20 text-white text-xs font-medium tracking-[0.2em] uppercase hover:border-[#FFB800] hover:text-[#FFB800] transition-all duration-500"
          >
            Explore Our World
            <svg
              className="w-4 h-4 group-hover:translate-y-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
