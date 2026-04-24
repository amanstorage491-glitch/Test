import EventHorizon from '../components/EventHorizon';
import CustomCursor from '../components/CustomCursor';
import SmoothScroll from '../components/SmoothScroll';
import Navigation from '../components/Navigation';
import Hero from '../sections/Hero';
import Manifesto from '../sections/Manifesto';
import Services from '../sections/Services';
import CaseStudies from '../sections/CaseStudies';
import Process from '../sections/Process';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      {/* 3D WebGL Background - Fixed behind everything */}
      <EventHorizon />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      {/* Page Content */}
      <main className="relative">
        <Hero />
        <Manifesto />
        <Services />
        <CaseStudies />
        <Process />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
