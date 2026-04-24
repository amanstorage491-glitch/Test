import { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router';
import SEO, { articleSchema } from '../components/SEO';
import { getBlogPostBySlug, blogPosts } from '../data/blog';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || '');
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
          gsap.fromTo(section, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' });
        },
        once: true,
      });
      triggers.push(st);
    });
    return () => { triggers.forEach((st) => st.kill()); };
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const paragraphs = post.content.split('\n\n');

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={`${post.tags.join(', ')}, nexus creative blog`}
        url={`https://nexuscreative.systems/blog/${post.slug}`}
        image={post.coverImage}
        type="article"
        structuredData={articleSchema(
          post.title,
          post.excerpt,
          `https://nexuscreative.systems/blog/${post.slug}`,
          post.coverImage,
          post.datePublished,
          post.dateModified
        )}
      />

      <div className="pt-32 lg:pt-40" ref={contentRef}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <div className="animate-section flex items-center gap-4 mb-8" style={{ opacity: 0 }}>
            <Link to="/blog" className="text-white/30 text-xs tracking-[0.2em] uppercase hover:text-[#FFB800] transition-colors">
              Blog
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-[#FFB800] text-xs tracking-[0.2em] uppercase">{post.category}</span>
          </div>

          {/* Title */}
          <div className="animate-section mb-8" style={{ opacity: 0 }}>
            <h1 className="font-display text-3xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-white/40 text-sm">
              <span>{post.author}</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span>{post.datePublished}</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="animate-section relative aspect-video overflow-hidden border border-white/10 mb-16" style={{ opacity: 0 }}>
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="animate-section mb-16" style={{ opacity: 0 }}>
            {paragraphs.map((para, i) => {
              if (para.startsWith('**') && para.endsWith('**')) {
                return (
                  <h2 key={i} className="font-display text-2xl lg:text-3xl font-semibold text-white mt-12 mb-6">
                    {para.replace(/\*\*/g, '')}
                  </h2>
                );
              }
              if (para.startsWith('- ')) {
                const items = para.split('\n').filter((l) => l.startsWith('- ')).map((l) => l.replace('- ', ''));
                return (
                  <ul key={i} className="space-y-3 mb-6 ml-4">
                    {items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-white/50 text-sm">
                        <span className="w-1.5 h-1.5 bg-[#FFB800] rounded-full mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (para.match(/^\d+\.\s/)) {
                const items = para.split('\n').filter((l) => l.match(/^\d+\.\s/)).map((l) => l.replace(/^\d+\.\s/, ''));
                return (
                  <ol key={i} className="space-y-4 mb-6 ml-4">
                    {items.map((item, j) => (
                      <li key={j} className="flex gap-4 text-white/50 text-sm">
                        <span className="text-[#FFB800] font-display font-medium shrink-0">{j + 1}.</span>
                        {item}
                      </li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={i} className="text-white/50 text-base lg:text-lg leading-relaxed mb-6">
                  {para}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="animate-section mb-24" style={{ opacity: 0 }}>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs tracking-wider uppercase text-white/40 border border-white/10 px-3 py-1.5">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Posts */}
          {otherPosts.length > 0 && (
            <div className="animate-section mb-32 lg:mb-48" style={{ opacity: 0 }}>
              <h3 className="font-display text-2xl font-bold text-white mb-8">More Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherPosts.map((p) => (
                  <Link key={p.slug} to={`/blog/${p.slug}`} className="group">
                    <div className="relative aspect-video overflow-hidden border border-white/10 mb-4 group-hover:border-[#FFB800]/30 transition-colors">
                      <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <span className="text-[#FFB800]/60 text-xs tracking-[0.2em] uppercase block mb-2">{p.category}</span>
                    <h4 className="text-white font-medium text-sm group-hover:text-[#FFB800] transition-colors leading-snug">
                      {p.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
