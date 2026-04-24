import { useEffect, useRef, useState } from 'react';
import SEO, { faqSchema } from '../components/SEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'What makes Nexus Creative Systems different from other agencies?',
    answer: 'We are a hybrid agency that combines deep technical engineering with high-end creative execution under one roof. Most agencies specialize in one or the other, forcing clients to manage multiple vendors. We deliver both disciplines with the same standard of excellence, ensuring alignment, speed, and superior outcomes.',
  },
  {
    question: 'How much does a typical project cost?',
    answer: 'Project costs vary significantly based on scope, complexity, and timeline. A brand identity project typically starts at $15,000, while custom software development engagements range from $30,000 to $200,000+. We provide detailed proposals after our discovery phase, with no hidden fees.',
  },
  {
    question: 'What is your typical project timeline?',
    answer: 'Brand identity projects take 6-10 weeks. Custom software MVPs take 8-12 weeks. Web development projects range from 4-12 weeks depending on complexity. Video production timelines vary from 2-8 weeks. We provide detailed timelines during the proposal phase and stick to them.',
  },
  {
    question: 'Do you work with startups or only enterprise clients?',
    answer: 'We work with both. Startups benefit from our ability to deliver multiple disciplines quickly and cohesively. Enterprise clients value our strategic approach and scalable solutions. We tailor our engagement model to your stage and budget.',
  },
  {
    question: 'Can you handle ongoing maintenance and support?',
    answer: 'Yes. We offer retainer-based maintenance packages for software, websites, and digital marketing. This includes bug fixes, performance monitoring, security updates, content updates, and ongoing optimization.',
  },
  {
    question: 'Do you work remotely or require in-person meetings?',
    answer: 'We are a remote-first company with team members across multiple time zones. All our processes are designed for remote collaboration. While we can accommodate in-person meetings in select cities, video calls are our standard and work exceptionally well.',
  },
  {
    question: 'What industries do you specialize in?',
    answer: 'We have deep experience in technology, fintech, e-commerce, healthcare, professional services, and consumer brands. Our cross-industry expertise means we bring fresh perspectives and proven strategies to every engagement.',
  },
  {
    question: 'How do you measure the success of a project?',
    answer: 'We define success metrics during the discovery phase. For software, this includes performance benchmarks, user adoption, and system uptime. For creative work, this includes engagement rates, brand sentiment, and conversion metrics. For marketing, this includes ROI, cost per acquisition, and traffic growth.',
  },
  {
    question: 'What is your payment structure?',
    answer: 'Most projects follow a milestone-based payment structure: 40% upfront, 30% at midpoint, and 30% upon delivery. For retainer engagements, we invoice monthly. Enterprise clients can negotiate custom terms.',
  },
  {
    question: 'Do you sign NDAs?',
    answer: 'Absolutely. We routinely sign NDAs before any detailed discussions about proprietary technology, business strategies, or unreleased products. Confidentiality is built into our standard operating procedures.',
  },
];

export default function FAQ() {
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(item, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power4.out', delay: i * 0.05 });
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
        title="FAQ"
        description="Find answers to frequently asked questions about Nexus Creative Systems services, pricing, timelines, and working process."
        keywords="FAQ, frequently asked questions, pricing, timeline, process, nexus creative"
        structuredData={faqSchema(faqs)}
      />

      <div className="pt-32 lg:pt-40">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div ref={headerRef} className="mb-16 lg:mb-24" style={{ opacity: 0 }}>
            <span className="text-[#FFB800] text-xs font-medium tracking-[0.3em] uppercase mb-4 block">FAQ</span>
            <h1 className="font-display text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-none tracking-tight mb-6">
              Common<br/><span className="text-white/30">Questions</span>
            </h1>
            <p className="text-white/40 text-base lg:text-lg max-w-xl leading-relaxed">
              Everything you need to know about working with us. Can not find your answer? Contact us directly.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4 pb-32 lg:pb-48">
            {faqs.map((faq, i) => (
              <div
                key={i}
                ref={(el) => { itemsRef.current[i] = el; }}
                className="border border-white/10 overflow-hidden"
                style={{ opacity: 0 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 lg:p-8 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-white font-medium text-sm lg:text-base pr-4">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-[#FFB800] shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{ maxHeight: openIndex === i ? '300px' : '0', opacity: openIndex === i ? 1 : 0 }}
                >
                  <p className="text-white/50 text-sm leading-relaxed px-6 lg:px-8 pb-6 lg:pb-8">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
