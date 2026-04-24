import { Link } from 'react-router';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist. Explore our services or contact us for help."
      />
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <span className="font-display text-[8rem] lg:text-[12rem] font-bold text-[#FFB800]/10 leading-none mb-4">404</span>
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-white/40 text-center max-w-md mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/" className="flex items-center gap-2 px-8 py-4 bg-[#FFB800] text-black text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white transition-colors">
            Go Home
          </Link>
          <Link to="/services" className="flex items-center gap-2 px-8 py-4 border border-white/20 text-white text-xs font-medium tracking-[0.2em] uppercase hover:border-[#FFB800] hover:text-[#FFB800] transition-all">
            Explore Services
          </Link>
        </div>
      </div>
    </>
  );
}
