import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import SEO from '../components/SEO';
import { blogPosts } from '../data/blog';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

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
        title="Blog"
        description="Insights on technology, branding, video production, digital marketing, and the future of hybrid creative-tech agencies."
        keywords="blog, technology insights, branding tips, digital marketing, web development, creative agency"
      />

      <div className="pt-32 lg:pt-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div ref={headerRef} className="mb-20 lg:mb-28" style={{ opacity: 0 }}>
            <span className="text-[#FFB800] text-xs font-medium tracking-[0.3em] uppercase mb-4 block">Insights</span>
            <h1 className="font-display text-4xl lg:text-6xl xl:text-8xl font-bold text-white leading-none tracking-tight mb-6">
              Knowledge<br/><span className="text-white/30">Base</span>
            </h1>
            <p className="text-white/40 text-base lg:text-lg max-w-xl leading-relaxed">
              Thoughts on technology, creativity, strategy, and building things that matter.
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32 lg:pb-48">
            {blogPosts.map((post, i) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="group flex flex-col"
                style={{ opacity: 0 }}
              >
                <div className="relative aspect-[16/10] overflow-hidden border border-white/10 mb-6 group-hover:border-[#FFB800]/30 transition-colors duration-500">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <span className="text-[#FFB800]/60 text-xs tracking-[0.2em] uppercase mb-3">
                  {post.category}
                </span>
                <h3 className="font-display text-xl lg:text-2xl font-semibold text-white mb-3 group-hover:text-[#FFB800] transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-white/30 text-xs">
                  <span>{post.datePublished}</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
