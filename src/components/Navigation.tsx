import { useEffect, useRef, useState } from 'react';

const navLinks = [
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 lg:px-12 py-5">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-lg font-bold tracking-tight text-white hover:text-[#FFB800] transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            NEXUS<span className="text-[#FFB800]">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-xs font-medium tracking-widest uppercase text-white/60 hover:text-[#FFB800] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-[#FFB800]/40 text-xs font-medium tracking-widest uppercase text-[#FFB800] hover:bg-[#FFB800] hover:text-black transition-all duration-300"
          >
            Start Project
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-px bg-white transition-transform duration-300 ${
                menuOpen ? 'rotate-45 translate-y-1' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-white transition-opacity duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-white transition-transform duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-1' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-b border-white/5 transition-all duration-500 overflow-hidden ${
            menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-6 px-6 py-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-sm font-medium tracking-widest uppercase text-white/60 hover:text-[#FFB800] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleClick(e, '#contact')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#FFB800]/40 text-sm font-medium tracking-widest uppercase text-[#FFB800] hover:bg-[#FFB800] hover:text-black transition-all duration-300 mt-4"
            >
              Start Project
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
