import { Outlet } from 'react-router';
import CustomCursor from './CustomCursor';
import Navigation from './Navigation';
import Footer from '../sections/Footer';

export default function Layout() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <main className="relative" style={{ zIndex: 2 }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
