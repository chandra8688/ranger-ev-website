import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Chargers = lazy(() => import('./pages/Chargers'));
const Outlets = lazy(() => import('./pages/Outlets'));
const OutletDetail = lazy(() => import('./pages/OutletDetail'));
const Partner = lazy(() => import('./pages/Partner'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
            <Suspense fallback={<div style={{ height: '100vh', background: 'var(--clr-offwhite)' }}></div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/chargers" element={<Chargers />} />
                <Route path="/outlets" element={<Outlets />} />
                <Route path="/outlets/:id" element={<OutletDetail />} />
                <Route path="/partner" element={<Partner />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
